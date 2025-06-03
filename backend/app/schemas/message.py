from pydantic import BaseModel
from typing import List

class MessageCreate(BaseModel):
    receiver_id: int
    content: str
