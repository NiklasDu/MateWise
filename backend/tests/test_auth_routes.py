import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '../app')))

# Tests für die Authentifizierungs-Router (API)
import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_login_wrong_credentials():
    """Testet, dass ein Login mit falschen Daten fehlschlägt."""
    response = client.post("/users/login", json={
        "email": "notexist@example.com",
        "password": "wrongpass"
    })
    assert response.status_code in (400, 401, 403, 404)
