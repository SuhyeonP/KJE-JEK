import logging.config
import os
from pathlib import Path
from typing import Any, Dict, Final, Tuple

import yaml

from modak.common.custom_exceptions import InvalidLoggingConfigFileError
from modak.common.paths import MODAK_DIR
from modak.common.settings import settings


class AppRootLoggingMeta(type):
    """
    Metaclass for AppRootLogging
    """

    APP_ROOT_LOGGER_NAME: Final = "modak"
    APP_ROOT_LOGGER_LEVEL_ENV_VAR_NAME: Final = "LOG_LEVEL"

    LOGGING_CONFIG_FILE_PATH: Final = MODAK_DIR / "logging_config.yaml"

    FILE_HANDLER_DEFAULT_FILENAME: Final = "modak.log"

    FILE_HANDLER_LOG_DIR: Final = (
        MODAK_DIR / "logs" if not settings.FILE_HANDLER_LOG_DIR else Path("/var/log")
    )

    __sealed: bool = False

    def __new__(metacls, cls_name: str, bases: Tuple[type], attrs: Dict[str, Any]):
        """
        Create a new class.
        """
        cls = super().__new__(metacls, cls_name, bases, attrs)

        if not metacls.__sealed:
            cls._load_logging_config()
            metacls.seal()

        return cls

    def _load_logging_config(cls) -> None:
        """Load logging config from the config file."""
        cls._validate_file_handler_log_dir()

        with open(cls.LOGGING_CONFIG_FILE_PATH, "r") as f:
            logging_config: Dict[str, Any] = yaml.safe_load(f)

        cls._validate_logging_config(logging_config)
        cls._override_filename_of_file_handlers(
            logging_config=logging_config,
            default_filename=cls.FILE_HANDLER_DEFAULT_FILENAME,
        )

        logging.config.dictConfig(logging_config)

        cls._validate_app_root_logger(cls.app_root_logger)
        cls._override_app_root_logger_level_from_env()
    
    def _validate_file_handler_log_dir(cls) -> None:
        """Validate the file handler log dir."""
        if not cls.FILE_HANDLER_LOG_DIR.exists():
            cls.FILE_HANDLER_LOG_DIR.mkdir(parents=True)

    def _validate_logging_config(cls, logging_config: Dict[str, Any]) -> None:
        """Validate the logging config to check if the logging config file is valid."""
        assert isinstance(logging_config, dict), "The logging_config must be a dict."

        KEY_LOGGERS = "loggers"
        KEY_HANDLERS = "handlers"

        REQUIRED_KEYS = [KEY_LOGGERS, KEY_HANDLERS]

        # Check if the logging config file has the required keys.
        for required_key in REQUIRED_KEYS:
            if required_key not in logging_config:
                raise InvalidLoggingConfigFileError(
                    f"The logging config must contain the key: {required_key}",
                )

        # Check if the logging config file has the app root logger, `makina-runway`.
        if cls.APP_ROOT_LOGGER_NAME not in logging_config[KEY_LOGGERS]:
            raise InvalidLoggingConfigFileError(
                f"The logging config must contain the logger: {cls.APP_ROOT_LOGGER_NAME}",
            )

    def _override_app_root_logger_level_from_env(cls) -> None:
        """Override the app root logger level from the env if it is set."""
        level_from_env: str = os.environ.get(
            cls.APP_ROOT_LOGGER_LEVEL_ENV_VAR_NAME,
        )
        if level_from_env:
            cls.app_root_logger.setLevel(  # pylint: disable=maybe-no-member
                level_from_env,
            )

    def _override_filename_of_file_handlers(
        cls,
        logging_config: Dict[str, Any],
        default_filename: str,
    ) -> None:
        """Override the filename of the file handler to use the absolute path."""
        KEY_HANDLERS = "handlers"
        FILE_HANDLER_CLASSES = (
            "logging.handlers.RotatingFileHandler",
            "logging.handlers.TimedRotatingFileHandler",
            "logging.handlers.WatchedFileHandler",
        )

        if KEY_HANDLERS not in logging_config:
            return

        handlers_ = logging_config[KEY_HANDLERS]

        file_handler_names = (
            handler_name
            for handler_name, handler_config in handlers_.items()
            if handler_config.get("class") in FILE_HANDLER_CLASSES
        )
        for handler_name in file_handler_names:
            filename = handlers_[handler_name].get("filename", default_filename)
            handlers_[handler_name]["filename"] = cls.FILE_HANDLER_LOG_DIR / filename

        logging_config[KEY_HANDLERS] = handlers_

    @staticmethod
    def _validate_app_root_logger(app_root_logger: logging.Logger) -> None:
        """Validate the app root logger config."""
        if not app_root_logger.hasHandlers():
            raise InvalidLoggingConfigFileError(
                "The app root logger must have at least one handler.",
            )
        if app_root_logger.propagate is True:
            raise InvalidLoggingConfigFileError(
                "The app root logger must not propagate.",
            )

    @property
    def app_root_logger(cls) -> logging.Logger:
        """Return the pseudo-root logger."""
        return logging.getLogger(cls.APP_ROOT_LOGGER_NAME)

    @classmethod
    def seal(metacls) -> None:
        """Seal the class."""
        metacls.__sealed = True


class AppRootLogging(metaclass=AppRootLoggingMeta):
    """The pseudo-root logger."""

    ...


app_root_logger = AppRootLogging.app_root_logger


class LoggingMixin(AppRootLogging):
    """A mixin class to add logging interface.

    Example::

        class MyClass(LoggingMixin, AnotherParentClass):

            def my_method(self) -> None:
                self.logger.debug("debug message")
    """

    @property
    def logger(self) -> logging.Logger:
        """Return the app root logger."""
        return app_root_logger.getChild(self.__class__.__qualname__)


def module_logger(module_name: str) -> logging.Logger:
    """Return the module-level logger, which is child of the app root logger.

    Parameters
    ----------
    module_name : str
        The module name. It is used to create the logger name.

    Returns
    -------
    logging.Logger
        The module-level logger, which is child of the app root logger.
        The logger name is `module_name`.
    """
    return app_root_logger.getChild(module_name)
