from modak.common.enum import StrEnum, auto


class CommentOrderByColumn(StrEnum):
    """Comment column"""

    id = auto()
    author = auto()
    created_at = auto()
    updated_at = auto()
