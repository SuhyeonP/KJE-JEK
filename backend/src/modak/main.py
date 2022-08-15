import sys
from typing import Final

from fastapi import FastAPI
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from starlette.exceptions import HTTPException as StarletteHTTPException

from modak.comments import controller as comments_controller
from modak.common.custom_exception_handlers import (
    http_exception_handler,
    validation_exception_handler,
)
from modak.common.logger import module_logger
from modak.database.database import Database

logger = module_logger(__name__)


API_VERSION_1: Final = "/v1"


def create_app() -> FastAPI:
    """Create and do initial configuration of fastapi app"""

    db = Database()
    try:
        db.create_database()
    except Exception as e:  # pylint: disable=broad-except
        logger.exception("db.create_database failed", exc_info=e)
        sys.exit(1)

    app_ = FastAPI()

    # Add CORS middleware
    # TODO : add CORS configuration for production, '*' is too broad and dangerous
    app_.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # Add routers
    sub_routers = [
        comments_controller.router,
    ]
    for router in sub_routers:
        app_.include_router(router, prefix=API_VERSION_1)

    # Override exception handlers
    app_.add_exception_handler(RequestValidationError, validation_exception_handler)
    app_.add_exception_handler(StarletteHTTPException, http_exception_handler)

    return app_


app = create_app()
