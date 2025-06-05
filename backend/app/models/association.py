# Gibt die Struktur der Verbindungstabellen vor.

from sqlalchemy import Table, Column, Integer, ForeignKey
from app.database import Base

# Zurzeit nicht verwendet!
user_skills = Table(
    "user_skills",
    Base.metadata,
    Column("user_id", Integer, ForeignKey("users.id"), primary_key=True),
    Column("skill_id", Integer, ForeignKey("skills.id"), primary_key=True)
)

# Stellt alle Skills dar, die ein Nutzer lernen möchte und verbindet sie somit mit einer UserID
user_skills_learn = Table(
    "user_skills_learn",
    Base.metadata,
    Column("user_id", Integer, ForeignKey("users.id"), primary_key=True),
    Column("skill_id", Integer, ForeignKey("skills.id"), primary_key=True)
)

# Stellt alle Skills dar, die ein Nutzer jemand anderem beibringen möchte. 
user_skills_teach = Table(
    "user_skills_teach",
    Base.metadata,
    Column("user_id", Integer, ForeignKey("users.id"), primary_key=True),
    Column("skill_id", Integer, ForeignKey("skills.id"), primary_key=True)
)