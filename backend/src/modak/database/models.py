# Import all the models, so that Base has them before being imported by Alembic
# Refs): https://stackoverflow.com/a/29218728
from modak.comments.model import *  # noqa: F401,F403
