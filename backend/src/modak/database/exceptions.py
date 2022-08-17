#
#  MAKINAROCKS CONFIDENTIAL
#  ________________________
#
#  [2017] - [2022] MakinaRocks Co., Ltd.
#  All Rights Reserved.
#
#  NOTICE:  All information contained herein is, and remains
#  the property of MakinaRocks Co., Ltd. and its suppliers, if any.
#  The intellectual and technical concepts contained herein are
#  proprietary to MakinaRocks Co., Ltd. and its suppliers and may be
#  covered by U.S. and Foreign Patents, patents in process, and
#  are protected by trade secret or copyright law. Dissemination
#  of this information or reproduction of this material is
#  strictly forbidden unless prior written permission is obtained
#  from MakinaRocks Co., Ltd.
#

# pylint: disable=no-name-in-module
from asyncpg.exceptions import ForeignKeyViolationError
from psycopg2.errors import ForeignKeyViolation, NotNullViolation, UniqueViolation
from sqlalchemy.dialects.postgresql.asyncpg import AsyncAdapt_asyncpg_dbapi

FOREIGN_KEY_VIOLATION_ERRORS = (
    ForeignKeyViolation,
    ForeignKeyViolationError,
    AsyncAdapt_asyncpg_dbapi.IntegrityError,
)
UNIQUE_VIOLATION_ERRORS = (UniqueViolation,)
NOT_NULL_VIOLATION_ERRORS = (NotNullViolation,)
