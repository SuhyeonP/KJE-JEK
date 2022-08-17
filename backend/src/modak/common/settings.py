from typing import Optional

from dotenv import load_dotenv
from pydantic import BaseSettings, validator

from .enum import StrEnum, auto
from .paths import ENVS


class RunningEnv(StrEnum):
    """The running environment."""

    LOCAL = auto()
    DEV = auto()
    PROD = auto()


class BaseSettingsWithConfig(BaseSettings):
    """Base settings with config."""

    class Config:
        """Config."""

        case_sensitive = True
        env_file_encoding = "utf-8"


class CommonSettings(BaseSettingsWithConfig):
    """The common settings."""

    RUNNING_ENV: RunningEnv = RunningEnv.LOCAL
    FILE_HANDLER_LOG_DIR: Optional[str]


class DatabaseSettings(BaseSettingsWithConfig):
    """The database settings."""

    DB_PROTOCOL: str = "postgresql"
    DB_USER: str = "postgres"
    DB_PASSWORD: str = "postgres"
    DB_HOST: str = "localhost"
    DB_PORT: int = 5432
    DB_NAME: str = "modak"
    DB_URL: Optional[str] = None

    @validator("DB_URL", pre=True)
    def generate_db_url(cls, db_url: Optional[str], values: dict) -> str:
        """Generate the DB URL."""
        if db_url is None:
            db_url = "{protocol}://{user}:{password}@{host}:{port}/{db_name}".format(
                protocol=values["DB_PROTOCOL"],
                user=values["DB_USER"],
                password=values["DB_PASSWORD"],
                host=values["DB_HOST"],
                port=values["DB_PORT"],
                db_name=values["DB_NAME"],
            )

        return db_url


class Settings(CommonSettings, DatabaseSettings):
    """The settings."""

    ...


def load_envs() -> Settings:
    """Load the envs."""
    env_filepaths = [
        ENVS / "common.env",
        ENVS / "database.env",
    ]
    for env_filepath in env_filepaths:
        load_dotenv(env_filepath)

    return Settings()


settings = load_envs()
