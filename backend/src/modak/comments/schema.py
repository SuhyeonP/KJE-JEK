from datetime import datetime
from typing import List

from pydantic import BaseModel, validator

from modak.comments.enums import CommentOrderByColumn
from modak.common.logger import module_logger

logger = module_logger(__name__)


class BaseModelORMTrue(BaseModel):
    """Base model which orm_mode is True."""

    class Config:
        orm_mode = True


class CommentCreateIn(BaseModel):
    """Comment create input model."""

    author: str
    content: str


class CommentListIn(BaseModel):
    """Comment list input model."""

    page: int = 1
    page_size: int = 10
    order_by: str = CommentOrderByColumn.created_at
    asc: bool = False


class CommentData(BaseModelORMTrue):
    """Comment data model."""

    id: int
    author: str
    content: str
    emoji: str
    created_at: str

    @validator("created_at", pre=True, always=True)
    def convert_created_at(cls, v):
        """Convert created_at to string."""

        logger.info(f"Convert created_at to string: {v}")

        if isinstance(v, datetime):
            return v.strftime("%Y/%-m/%-d %H:%M UTC")
        elif isinstance(v, str):
            datetime.strptime(v, "%Y/%m/%d %H:%M UTC")
            return v


class CommentDataList(BaseModelORMTrue):
    """Comment data list model."""

    comments: List[CommentData]


class CommentCreateOut(CommentData):
    """Comment create output model."""

    ...


class CommentListOut(CommentDataList):
    """Comment list output model."""

    ...


class CommentDeleteOut(BaseModelORMTrue):
    """Comment delete output model."""

    id: int
