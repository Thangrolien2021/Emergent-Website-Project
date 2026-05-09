"""Backend API tests for JulianTees: health, contact, newsletter."""
import os
import uuid
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://tees-optimize-launch.preview.emergentagent.com").rstrip("/")
API = f"{BASE_URL}/api"


@pytest.fixture
def client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# Health
class TestHealth:
    def test_health_ok(self, client):
        r = client.get(f"{API}/health", timeout=15)
        assert r.status_code == 200
        data = r.json()
        assert data.get("status") == "healthy"
        assert "ts" in data


# Contact endpoint
class TestContact:
    def test_contact_valid_returns_success_emailed_false(self, client):
        payload = {
            "name": "TEST_User",
            "email": f"test_{uuid.uuid4().hex[:8]}@example.com",
            "subject": "TEST subject",
            "message": "Hello, this is a test message.",
        }
        r = client.post(f"{API}/contact", json=payload, timeout=15)
        assert r.status_code == 200, r.text
        data = r.json()
        assert data.get("status") == "success"
        assert data.get("stored") is True
        # RESEND_API_KEY is empty, so emailed must be False
        assert data.get("emailed") is False

    def test_contact_missing_message_returns_422(self, client):
        payload = {
            "name": "TEST_User",
            "email": "valid@example.com",
            "subject": "no message",
        }
        r = client.post(f"{API}/contact", json=payload, timeout=15)
        assert r.status_code == 422

    def test_contact_invalid_email_returns_422(self, client):
        payload = {
            "name": "TEST_User",
            "email": "not-an-email",
            "subject": "bad email",
            "message": "Some content",
        }
        r = client.post(f"{API}/contact", json=payload, timeout=15)
        assert r.status_code == 422

    def test_contact_empty_name_returns_422(self, client):
        payload = {
            "name": "",
            "email": "valid@example.com",
            "message": "hello",
        }
        r = client.post(f"{API}/contact", json=payload, timeout=15)
        assert r.status_code == 422


# Newsletter endpoint
class TestNewsletter:
    def test_newsletter_valid(self, client):
        email = f"test_{uuid.uuid4().hex[:8]}@example.com"
        r = client.post(f"{API}/newsletter", json={"email": email}, timeout=15)
        assert r.status_code == 200, r.text
        data = r.json()
        assert data.get("status") == "success"

    def test_newsletter_idempotent(self, client):
        email = f"test_idem_{uuid.uuid4().hex[:8]}@example.com"
        r1 = client.post(f"{API}/newsletter", json={"email": email}, timeout=15)
        r2 = client.post(f"{API}/newsletter", json={"email": email}, timeout=15)
        assert r1.status_code == 200
        assert r2.status_code == 200
        assert r1.json().get("status") == "success"
        assert r2.json().get("status") == "success"

    def test_newsletter_invalid_email_returns_422(self, client):
        r = client.post(f"{API}/newsletter", json={"email": "not-an-email"}, timeout=15)
        assert r.status_code == 422
