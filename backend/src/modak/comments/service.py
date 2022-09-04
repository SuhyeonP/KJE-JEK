from modak.comments.enums import CommentOrderByColumn
from modak.comments.model import Comment
from modak.comments.repository import CommentDB
from modak.comments.schema import CommentCreateIn, CommentData, CommentDataList
from modak.common.logger import LoggingMixin
from modak.common.utils import Emoji, random_emoji


class CommentService(LoggingMixin):
    """Manage service logics on comments."""

    EMOJI_BLACKLIST = [
        "\U0001F51E",  # no one under eighteen (🔞)
    ]

    def __init__(self) -> None:
        self._comment_db = CommentDB()

    def get_all_with_pagination(
        self,
        page: int,
        page_size: int,
        order_by: str = CommentOrderByColumn.created_at,
        asc: bool = False,
    ) -> CommentDataList:
        """Get all comments with pagination."""

        comments = self._comment_db.get_all_with_pagination(
            page=page,
            page_size=page_size,
            order_by=order_by,
            asc=asc,
        )
        total_items = self._comment_db.count_all()

        return CommentDataList(comments=comments, total_items=total_items)

    def create(self, comment_create_in: CommentCreateIn) -> CommentData:
        """Create a comment."""

        emoji: Emoji = random_emoji()

        comment = Comment(
            author=comment_create_in.author,
            content=comment_create_in.content,
            emoji=emoji.value,
        )
        comment_created = self._comment_db.add(comment=comment)

        return CommentData.from_orm(comment_created)

    def delete(self, id: int) -> None:
        """Delete a comment."""

        self._comment_db.delete(id=id)
