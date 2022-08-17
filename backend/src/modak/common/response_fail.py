import json
from typing import Any, Dict, Tuple

from modak.common.custom_exceptions import HTTPExceptionBadRequest
from modak.common.paths import DOCS


class ResponseFailMeta(type):
    """
    Metaclass for ResponseFail
    """

    def __init__(cls, cls_name: str, bases: Tuple[type], attrs: Dict[str, Any]):
        """
        Initialize ResponseFail class, which is an instance of ResponseFailMeta

        Parameters
        ----------
        cls : ResponseFailMeta
            The instance of ResponseFailMeta, which is a class object.
            ex: <class 'ResponseFail'>, <class 'AuthenticationError'> ...
        cls_name : str
            name of the class, `cls`
            ex: 'ResponseFail', 'AuthenticationError' ...
        bases : Tuple[type]
            parent classes of the class, `cls`
            in the case of 'ResponseFail' class defined below,
            bases is (HTTPExceptionBadRequest,)
        attrs : Dict[str, Any]
            a class namespace dictionary, which contains all the class attributes.
        """
        super().__init__(cls_name, bases, attrs)

        if attrs.get("__ignore_me__", False):
            return

        base = bases[0] if bases else HTTPExceptionBadRequest

        cls._member_map_ = {}

        members = cls._filter_members(attrs)
        for member_name, member_value in members.items():
            http_exception_instance = base(
                code=f"{cls_name}.{member_name}",
                message=member_value,
            )

            setattr(cls, member_name, http_exception_instance)
            cls._member_map_[member_name] = http_exception_instance

    def __iter__(cls):
        """
        Returns members in definition order.
        """
        if not hasattr(cls, "_member_map_"):  # True if __ignore_me__ is True
            raise TypeError(f"{cls.__name__} is not iterable")
        return iter(cls._member_map_.items())

    @staticmethod
    def _filter_members(attrs: Dict[str, Any]):
        return {key: value for key, value in attrs.items() if not key.startswith("_")}


class ResponseFail(HTTPExceptionBadRequest, metaclass=ResponseFailMeta):
    """
    Declaration class for HTTPExceptionBadRequest.
    We can declare the error code and message of the response gracefully,
    using this class.
    """

    __sync_file__ = DOCS / "response_fail.json"
    __ignore_me__ = True

    @classmethod
    def spec(cls) -> Dict[str, Any]:
        """
        Returns the specification of the fail response of the subclasses.

        Example Return::

            {
                "AuthenticationError": {
                    "INVALID_TOKEN": {
                        "code": "AuthenticationError.INVALID_TOKEN",
                        "message": "Token is invalid."
                    },
                    ...
            },
            {
                "ResourceError": {
                    "NOT_FOUND": {
                        "code": "ResourceError.NOT_FOUND",
                        "message": "Resource not found"
                    },
                    ...
            }

        Returns
        -------
        Dict[str, Dict[str, Dict[str, str]]]
            The specification of the fail response of the subclasses.
        """
        spec = {}

        for sub_class in cls.__subclasses__():
            spec[sub_class.__name__] = {
                member_name: {
                    "code": member_value.code,
                    "message": member_value.message,
                }
                for member_name, member_value in sub_class
            }

        return spec

    @classmethod
    def sync_to_file(cls) -> None:
        """
        Syncs the specification of the fail response to a file
        """
        with open(cls.__sync_file__, "wt") as f:
            f.write(json.dumps(cls.spec(), indent=2))
            f.write("\n")


class DBIntegrityError(ResponseFail):
    """
    Declare all database integrity errors here.
    """

    UNKNOWN_ERROR = "Unknown DB Integrity error."
    FOREIGN_KEY_VIOLATION = "Insert or update on table violates foreign key constraint."
    UNIQUE_VIOLATION = "Duplicate key value violates unique constraint."
    NOT_NULL_VIOLATION = "Null value violates not-null constraint."
    ATTRIBUTE_ERROR = "There is no such attribute."


class ResourceError(ResponseFail):
    """
    Declare all resource errors here.
    """

    NOT_FOUND = "Resource is not found."
    MULTIPLE_RESOURCES_FOUND = "Multiple resources found."
    DUPLICATED = "Resource already exists."
    ALLOWED_LIMIT_EXCEEDED = "Allowed resource limit exceeded."


class NotFoundError(ResponseFail):
    """
    Declare all not found errors here.
    """

    INVALID_ENDPOINT = "Endpoint is invalid."
    METHOD_NOT_ALLOWED = "Method is not allowed."
