from enum import Enum, auto

_ = auto  # To make it importable


class StrEnum(str, Enum):
    """
    Mixin class for using auto()
    """

    @staticmethod
    def _generate_next_value_(name, start, count, last_values):
        """
        Ref: https://docs.python.org/3/library/enum.html#supported-sunder-names
        Used by auto to get an appropriate value for an enum member
        """
        _ = start, count, last_values

        return name

    def __repr__(self):
        return self.name

    def __str__(self):
        return self.name

    @classmethod
    def has_value(cls, value: str) -> bool:
        """Check if the value is in the enum

        Parameters
        ----------
        value : str
            The value to check

        Returns
        -------
        bool
            True if the value is in the enum, False otherwise

        Examples
        --------
        >>> from runway.common.enum import StrEnum
        >>> class MyEnum(StrEnum):
        ...     A = auto()
        ...     B = auto()
        ...     C = auto()
        ...
        >>> MyEnum.has_value('A')
        True
        """
        return value in cls._value2member_map_  # pylint: disable=maybe-no-member
