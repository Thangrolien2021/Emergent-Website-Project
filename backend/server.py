import os
import asyncio
import logging
from datetime import datetime, timezone
from pathlib import Path
from typing import Optional

import resend
from dotenv import load_dotenv
from fastapi import FastAPI, APIRouter, HTTPException
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, EmailStr, Field
from starlette.middleware.cors import CORSMiddleware

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / ".env")

# ── DB
mongo_url = os.environ["MONGO_URL"]
db_name   = os.environ["DB_NAME"]
client    = AsyncIOMotorClient(mongo_url)
db        = client[db_name]

# ── Resend
RESEND_API_KEY  = os.environ.get("RESEND_API_KEY", "")
SENDER_EMAIL    = os.environ.get("SENDER_EMAIL", "JulianTees <onboarding@resend.dev>")
RECIPIENT_EMAIL = os.environ.get("RECIPIENT_EMAIL", "juliantees2026@gmail.com")
if RESEND_API_KEY:
    resend.api_key = RESEND_API_KEY

# ── Logging
logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(name)s :: %(message)s")
logger = logging.getLogger("juliantees")

app = FastAPI(title="JulianTees API")
api = APIRouter(prefix="/api")


class ContactIn(BaseModel):
    name: str = Field(..., min_length=1, max_length=120)
    email: EmailStr
    subject: Optional[str] = ""
    message: str = Field(..., min_length=1, max_length=4000)


class NewsletterIn(BaseModel):
    email: EmailStr


def _format_html(payload: ContactIn) -> str:
    safe_msg = payload.message.replace("\n", "<br/>")
    return f"""
    <table width="100%" style="font-family:Arial,sans-serif;background:#0a0a0a;color:#f5f5f0;padding:24px;">
      <tr><td>
        <h2 style="color:#E63946;margin:0 0 16px 0;letter-spacing:2px;">JulianTees — New contact form</h2>
        <p style="margin:0 0 8px 0;"><b>Name:</b> {payload.name}</p>
        <p style="margin:0 0 8px 0;"><b>Email:</b> {payload.email}</p>
        <p style="margin:0 0 8px 0;"><b>Subject:</b> {payload.subject or "(none)"}</p>
        <hr style="border:none;border-top:1px solid #2a2a2a;margin:16px 0"/>
        <p style="margin:0;line-height:1.6">{safe_msg}</p>
        <hr style="border:none;border-top:1px solid #2a2a2a;margin:16px 0"/>
        <p style="font-size:11px;color:#888;">Sent automatically from juliantees.com</p>
      </td></tr>
    </table>
    """


@api.get("/")
async def root():
    return {"service": "juliantees-api", "ok": True}


@api.get("/health")
async def health():
    return {"status": "healthy", "ts": datetime.now(timezone.utc).isoformat()}


@api.post("/contact")
async def contact(payload: ContactIn):
    # Always store the message
    doc = payload.model_dump()
    doc["created_at"] = datetime.now(timezone.utc).isoformat()
    await db.contact_messages.insert_one(doc)

    if not RESEND_API_KEY:
        logger.warning("RESEND_API_KEY not set — message saved but email not sent.")
        return {
            "status": "success",
            "message": "Message received. (Email delivery disabled — set RESEND_API_KEY in backend/.env to enable.)",
            "stored": True,
            "emailed": False,
        }

    params = {
        "from": SENDER_EMAIL,
        "to": [RECIPIENT_EMAIL],
        "reply_to": payload.email,
        "subject": f"[JulianTees Contact] {payload.subject or payload.name}",
        "html": _format_html(payload),
    }
    try:
        sent = await asyncio.to_thread(resend.Emails.send, params)
        return {"status": "success", "message": "Thanks — we'll be in touch.", "stored": True, "emailed": True, "id": sent.get("id")}
    except Exception as e:
        logger.exception("Resend failure")
        # message is still stored, just no email
        raise HTTPException(status_code=502, detail=f"Could not send email: {e}")


@api.post("/newsletter")
async def newsletter(payload: NewsletterIn):
    doc = {"email": payload.email, "created_at": datetime.now(timezone.utc).isoformat()}
    await db.newsletter_subs.update_one({"email": payload.email}, {"$set": doc}, upsert=True)
    return {"status": "success", "message": "Subscribed."}


app.include_router(api)

app.add_middleware(
    CORSMiddleware,
    allow_origins=os.environ.get("CORS_ORIGINS", "*").split(","),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
async def shutdown():
    client.close()
