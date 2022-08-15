from datetime import datetime

from sqlalchemy import (
    Column,
    DateTime,
    Integer,
    String,
)

from modak.database.base import Base


class Comment(Base):
    __tablename__ = "comments"

    id: int = Column(Integer, primary_key=True)
    author: str = Column(String(50), nullable=False)
    content: str = Column(String(length=255), nullable=False)
    emoji: str = Column(String(length=2), nullable=False)
    created_at: datetime = Column(DateTime, default=datetime.utcnow)
    updated_at: datetime = Column(DateTime, default=datetime.utcnow)
