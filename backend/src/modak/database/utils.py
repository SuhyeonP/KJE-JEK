from sqlalchemy.dialects.postgresql.asyncpg import AsyncAdapt_asyncpg_dbapi
from sqlalchemy.exc import IntegrityError, PendingRollbackError
from sqlalchemy.orm import Session
from sqlalchemy.orm.exc import MultipleResultsFound, NoResultFound

from modak.common.logger import LoggingMixin, module_logger
from modak.common.response_fail import DBIntegrityError, ResourceError
from modak.database.exceptions import (
    FOREIGN_KEY_VIOLATION_ERRORS,
    NOT_NULL_VIOLATION_ERRORS,
    UNIQUE_VIOLATION_ERRORS,
)

logger = module_logger(__name__)


class DBExceptionHandlerBase(LoggingMixin):
    """
    Base class for DBExceptionHandler
    """

    def _handle_exception(
        self,
        e_type,
        e_val,
        traceback,
    ):  # pylint: disable=unused-argument
        """Exit handler for the context manager."""

        assert issubclass(e_type, Exception)

        if e_type is NoResultFound:
            self.logger.exception(f"NoResultFound: {e_val=}")
            raise ResourceError.NOT_FOUND

        if e_type is MultipleResultsFound:
            self.logger.exception(f"MultipleResultsFound: {e_val=}")
            raise ResourceError.MULTIPLE_RESOURCES_FOUND

        if e_type is IntegrityError:
            self.logger.exception(f"IntegrityError: {e_val=}, {type(e_val.orig)=}")
            if type(e_val.orig) in FOREIGN_KEY_VIOLATION_ERRORS:
                raise DBIntegrityError.FOREIGN_KEY_VIOLATION
            if type(e_val.orig) in UNIQUE_VIOLATION_ERRORS:
                raise DBIntegrityError.UNIQUE_VIOLATION
            if type(e_val.orig) in NOT_NULL_VIOLATION_ERRORS:
                raise DBIntegrityError.NOT_NULL_VIOLATION
            if isinstance(e_val.orig, AsyncAdapt_asyncpg_dbapi.IntegrityError):
                if e_val.orig.pgcode == "23503":
                    raise DBIntegrityError.FOREIGN_KEY_VIOLATION
            raise DBIntegrityError.UNKNOWN_ERROR

        if e_type is AttributeError:
            # UnknownError: e_type=<class 'AttributeError'>
            self.logger.exception(f"AttributeError: {e_type=} {e_val=}")
            raise DBIntegrityError.ATTRIBUTE_ERROR

        if e_type is PendingRollbackError:
            self.logger.exception(
                "You need to session.rollback() "
                "before session.commit() or session.flush(). "
                "Original exception was: (%s) %s",
                e_type,
                e_val,
            )
            self.logger.exception(f"PendingRollbackError: {e_val}")
            return

        self.logger.exception(f"UnknownError: {e_type=} {e_val=}")
        raise e_val


class DBExceptionHandler(DBExceptionHandlerBase):
    """Handle exceptions in context manager or async context manager"""

    def __init__(self, session: Session):
        self.session = session

    def __enter__(self):
        return None

    def __exit__(self, e_type, e_val, traceback):
        if e_type is None:
            self.session.close()
            return

        self._rollback_and_close_session()
        self._handle_exception(e_type, e_val, traceback)

    def _rollback_and_close_session(self):
        try:
            self.session.rollback()
        except Exception:  # pylint: disable=broad-except
            self.logger.exception("Unknown error while rolling back the session.")
        finally:
            self.session.close()
