from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from agent import run_agent

app = FastAPI(title="Mukul Assistant Backend")

# CORS (frontend connect ke liye)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # production me specific domain rakhna
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Health check (Render / monitoring)
@app.get("/")
def root():
    return {"status": "ok", "message": "Mukul Assistant backend running"}

class ChatRequest(BaseModel):
    message: str

@app.post("/chat")
async def chat(req: ChatRequest):
    reply = await run_agent(req.message)
    return {"reply": reply}
