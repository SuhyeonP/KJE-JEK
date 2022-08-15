#
#  MAKINAROCKS CONFIDENTIAL
#  ________________________
#
#  [2017] - [2022] MakinaRocks Co., Ltd.
#  All Rights Reserved.
#
#  NOTICE:  All information contained herein is, and remains
#  the property of MakinaRocks Co., Ltd. and its suppliers, if any.
#  The intellectual and technical concepts contained herein are
#  proprietary to MakinaRocks Co., Ltd. and its suppliers and may be
#  covered by U.S. and Foreign Patents, patents in process, and
#  are protected by trade secret or copyright law. Dissemination
#  of this information or reproduction of this material is
#  strictly forbidden unless prior written permission is obtained
#  from MakinaRocks Co., Ltd.
#
from contextlib import (
    AbstractContextManager,
    contextmanager,
)
from time import time
from typing import Callable

from sqlalchemy import create_engine, orm
from sqlalchemy.orm import Session

from modak.database.base import Base
from modak.database.models import *  # noqa: F401,F403
from modak.common.logger import LoggingMixin
from modak.common.settings import settings
from modak.common.singleton import singleton
from modak.database.utils import (
    DBExceptionHandler,
)



@singleton
class Database(LoggingMixin):
    """Database"""

    def __init__(
        self,
        db_url: str = str(settings.DB_URL),
    ) -> None:
        self.logger.info("Initialize database: %s", db_url)
        self._engine = create_engine(db_url, pool_pre_ping=True)

        self._session_factory = orm.scoped_session(
            orm.sessionmaker(
                autocommit=False,
                autoflush=False,
                bind=self._engine,
            ),
        )

    def create_database(self) -> None:
        """
        create all tables
        """
        self.logger.debug("Create database.")

        start_time = time()
        Base.metadata.create_all(bind=self._engine)
        end_time = time()

        self.logger.info(f"Database created. ({end_time - start_time}s elapsed)")

    @contextmanager
    def session(self) -> Callable[..., AbstractContextManager[Session]]:
        """
        create database session with contextmanager to do some CRUD things
        """
        session: Session = self._session_factory()

        with DBExceptionHandler(session):
            yield session
