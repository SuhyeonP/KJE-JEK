import logging
from enum import auto
from typing import Any, Dict, Final, List, Optional

from fastapi import status
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from starlette.exceptions import HTTPException as StarletteHTTPException
from starlette.requests import Request as StarletteRequest

from modak.common.enum import StrEnum
from modak.common.response_fail import NotFoundError

logger = logging.getLogger(__name__)


class RequestParameterType(StrEnum):
    """Enum for request parameter types"""

    query = auto()
    path = auto()
    body = auto()


class RequestError(BaseModel):
    """Error Model for Pydantic.ValidationError"""

    param_type: RequestParameterType
    param_name: Optional[str]
    error_type: str
    message: str


def parse_request_validation_error(exc: RequestValidationError) -> List[RequestError]:
    """
    Parse RequestValidationError and return a list of RequestError

    Parameters
    ----------
    exc : fastapi.exceptions.RequestValidationError
        The exception object
        RequestValidationError inherits from pydantic.ValidationError
        Ref: https://pydantic-docs.helpmanual.io/usage/models/#error-handling

    Returns
    -------
    List[RequestError]
        A list of RequestError
    """
    return [
        RequestError(
            param_type=e["loc"][0],
            param_name=e["loc"][1] if len(e["loc"]) > 1 else None,
            error_type=e["type"],
            message=e["msg"],
        )
        for e in exc.errors()
    ]


async def validation_exception_handler(
    request: StarletteRequest,
    exc: RequestValidationError,
):
    """
    Exception handler for RequestValidationError
    RequestValidationError is raised when client request is invalid
    RequestValidationError inherits from ValidationError,
    which is originally raised by pydantic

    Parameters
    ----------
    request : starlette.requests.Request
        The request object
    exc : fastapi.exceptions.RequestValidationError
        The exception object
        RequestValidationError inherits from pydantic.ValidationError
        Ref: https://pydantic-docs.helpmanual.io/usage/models/#error-handling

    Example of exc.errors()::

        [
            {
                "loc": (
                    "path",
                    "path_param"
                ),
                "msg": "value is not a valid integer",
                "type": "type_error.integer"
            },
            {
                "loc": (
                    "query",
                    "query_param"
                ),
                "msg": "field required",
                "type": "value_error.missing"
            },
            {
                "loc": (
                    "body",
                    "str_field"
                ),
                "msg": "field required",
                "type": "value_error.missing"
            },
            {
                "loc": (
                    "body",
                    "list_field"
                ),
                "msg": "field required",
                "type": "value_error.missing"
            },
            {# if root valiator is used
                "loc": (
                    "body",
                    "__root__"
                ),
                "msg": "index_column_lower_bound must be less than index_column_upper_bound",
                "type": "value_error"
            }
        ]

    Example of Return::

        {
            "status": "fail",
            "data": {
                "path": {"path_param": "value is not a valid integer"},
                "query": {"query_param": "field required"},
                "body": {
                    "str_field": "field required",
                    "list_field": "field required",
                    "__root__": "index_column_lower_bound must be less than index_column_upper_bound"
                },
            },
        }

    """
    _ = request

    logger.debug(exc.json())

    CORNER_CASES: Final = {
        # request body data may not be json decodable
        "value_error.jsondecode": "Data is not json decodable.",
    }

    errors = parse_request_validation_error(exc)

    content: Dict[str, Any] = {
        RequestParameterType.path: {},
        RequestParameterType.query: {},
        RequestParameterType.body: {},
    }
    for e in errors:
        # If param_name is not None,
        # it means the error is related to the very parameter
        if e.param_name and e.error_type not in CORNER_CASES:
            content[e.param_type].update({e.param_name: e.message})

        # If param_name is None,
        # it means the error is not related to the level of parameters
        # but to the level of parameter type ("path", "query", or "body")
        elif e.error_type in CORNER_CASES:
            content[e.param_type] = CORNER_CASES[e.error_type]
        else:
            content[e.param_type] = e.message

    return JSONResponse(
        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        content=content,
    )


async def http_exception_handler(
    request: StarletteRequest,
    exc: StarletteHTTPException,
):
    """
    Exception handler for StarletteHTTPException

    Parameters
    ----------
    request : starlette.requests.Request
        The request object
    exc : starlette.exceptions.HTTPException
        The exception object
    """
    _ = request

    def log_str(exc: StarletteHTTPException) -> str:
        return f"{type(exc).__module__}.{type(exc).__name__}: {exc.__repr__()}"

    # If the endpoint is not found, 404 error is raised by fastapi
    if exc.status_code == status.HTTP_404_NOT_FOUND:
        logger.debug(log_str(exc))
        return JSONResponse(
            status_code=NotFoundError.INVALID_ENDPOINT.status_code,  # pylint: disable=maybe-no-member
            content=NotFoundError.INVALID_ENDPOINT.detail,  # pylint: disable=maybe-no-member
        )

    # If the method is not allowed in the endpoint, 405 error is raised by fastapi
    if exc.status_code == status.HTTP_405_METHOD_NOT_ALLOWED:
        logger.debug(log_str(exc))
        return JSONResponse(
            status_code=NotFoundError.METHOD_NOT_ALLOWED.status_code,  # pylint: disable=maybe-no-member
            content=NotFoundError.METHOD_NOT_ALLOWED.detail,  # pylint: disable=maybe-no-member
        )

    return JSONResponse(
        status_code=exc.status_code,
        content=exc.detail,
    )
