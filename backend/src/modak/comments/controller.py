from fastapi import APIRouter, Depends

from modak.comments.schema import (
    CommentCreateIn,
    CommentCreateOut,
    CommentDeleteOut,
    CommentListIn,
    CommentListOut,
)
from modak.comments.service import CommentService
from modak.common.logger import module_logger

router = APIRouter(prefix="/comments", tags=["comments"])

logger = module_logger(__name__)


@router.get("", response_model=CommentListOut)
async def get_comments(
    comment_list_in: CommentListIn = Depends(),
    comment_service: CommentService = Depends(),
) -> CommentListOut:
    """Get all comments with pagination."""

    comments = comment_service.get_all_with_pagination(
        page=comment_list_in.page,
        page_size=comment_list_in.page_size,
        order_by=comment_list_in.order_by,
        asc=comment_list_in.asc,
    )

    return CommentListOut.from_orm(comments)


@router.post("", response_model=CommentCreateOut)
async def create_comment(
    comment_create_in: CommentCreateIn,
    comment_service: CommentService = Depends(),
) -> CommentCreateOut:
    """Create a comment."""

    comment_created = comment_service.create(comment_create_in=comment_create_in)

    return CommentCreateOut.from_orm(comment_created)


@router.delete("/{comment_id}", response_model=CommentDeleteOut)
async def delete_comment(
    comment_id: int,
    comment_service: CommentService = Depends(),
) -> CommentDeleteOut:
    """Delete a comment."""

    comment_service.delete(id=comment_id)

    return CommentDeleteOut(id=comment_id)
