import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '../app')))

# Tests für die Message-Router (API)
import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

# Kein GET /messages/ Endpunkt vorhanden, daher Test entfernt oder anpassen, wenn sinnvoll.
# def test_get_messages_unauthenticated():
#     """Testet, dass nicht authentifizierte Requests keine Nachrichten abrufen können."""
#     response = client.get("/messages/")
#     assert response.status_code in (401, 403)
