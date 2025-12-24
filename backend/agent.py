import os
import httpx
from dotenv import load_dotenv

load_dotenv()

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
MODEL_NAME = os.getenv("MODEL_NAME", "gpt-4o-mini")

SYSTEM_PROMPT = (
    "You are Mukul Assistant, an AI inspired by Iron Man JARVIS. "
    "You help with coding, projects, learning, and automation."
)

async def run_agent(message: str):
    if not OPENAI_API_KEY:
        return "❌ OpenAI API key missing. backend/.env file check karo."

    url = "https://api.openai.com/v1/chat/completions"
    headers = {
        "Authorization": f"Bearer {OPENAI_API_KEY}",
        "Content-Type": "application/json"
    }

    payload = {
        "model": MODEL_NAME,
        "messages": [
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": message}
        ],
        "temperature": 0.4
    }

    async with httpx.AsyncClient(timeout=30) as client:
        r = await client.post(url, headers=headers, json=payload)
        if r.status_code != 200:
            return f"❌ OpenAI error: {r.text}"

        data = r.json()
        return data["choices"][0]["message"]["content"]
