from typing import Any, Dict, Optional

from fastapi import HTTPException, status


class HTTPExceptionBadRequest(HTTPException):
    """
    Every fail response should raise this exception

    Example::

        raise HTTPExceptionBadRequest(
            # TODO: error code is not fully implemented yet. this is for future use
            error_code="AuthenticationError.INVALID_TOKEN",
            error_message="Invalid data",
        )
    """

    def __init__(
        self,
        code: str,
        message: str,
        headers: Optional[Dict[str, Any]] = None,
    ) -> None:
        assert isinstance(code, str), f"code must be str, not {type(code)}. ({code=})"
        assert isinstance(message, str), (
            "message must be str, " f"not {type(message)}. ({message=})"
        )

        super().__init__(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail={
                "code": code,
                "message": message,
            },
            headers=headers,
        )
        self.__code = code
        self.__message = message

    @property
    def code(self) -> str:
        """
        The error code of the response

        Returns
        -------
        str
            The error code of the response
        """
        return self.__code

    @property
    def message(self) -> str:
        """
        The error message of the response

        Returns
        -------
        str
            The error message of the response
        """
        return self.__message


class InvalidLoggingConfigFileError(Exception):
    """Raised when the logging config file is invalid."""

    ...
