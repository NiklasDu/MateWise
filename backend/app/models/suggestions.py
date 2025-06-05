# Sammelt alle Vorschläge für neue Skills, die die Nutzer vorgeschlagen haben. 
# Der Admin muss diese bestätigen, bevor diese in die richtige Skills Tabelle kommen.

from sqlalchemy import Column, Integer, String
from app.database import Base

# Eigenschaften der Suggestions Tabelle
class Suggestions(Base):
    __tablename__ = "suggestions"

    id = Column(Integer, primary_key=True, index=True)
    category = Column(String)
    new_skill_name = Column(String)