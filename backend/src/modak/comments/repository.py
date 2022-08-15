from contextlib import AbstractContextManager
from typing import Callable
from .enums import CommentOrderByColumn

from sqlalchemy.orm import Session

from modak.common.logger import LoggingMixin
from modak.database.database import Database
from modak.comments.model import Comment


class CommentDB(LoggingMixin):
    """Manage comments in database"""

    def __init__(
        self,
        session_factory: Callable[
            ...,
            AbstractContextManager[Session],
        ] = Database().session,  # pylint: disable=unsubscriptable-object
    ) -> None:
        self.session_factory = session_factory

    def get_all_with_pagination(
        self,
        page: int,
        page_size: int,
        order_by: str = CommentOrderByColumn.created_at,
        asc: bool = False,
    ) -> list:
        """Get all comments with pagination."""

        with self.session_factory() as session:
            return (
                session.query(Comment)
                .order_by(
                    getattr(Comment, order_by).asc()
                    if asc
                    else getattr(Comment, order_by).desc()
                )
                .offset((page - 1) * page_size)
                .limit(page_size)
                .all()
            )

    def add(self, comment: Comment) -> Comment:
        """Add a comment."""

        with self.session_factory() as session:
            session.add(comment)
            session.commit()
            session.refresh(comment)

            return comment

    def get(self, id: int) -> Comment:
        """Get a comment."""

        with self.session_factory() as session:
            return session.query(Comment).get(id)

    def delete(self, id: int) -> None:
        """Delete a comment."""

        with self.session_factory() as session:
            session.query(Comment).filter_by(id=id).delete()
            session.commit()
