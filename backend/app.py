from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from agent import run_agent

app = FastAPI(title="Mukul Assistant Backend")

# CORS (frontend connect ke liye)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # dev only
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "Mukul Assistant backend running"}

@app.post("/chat")
async def chat(data: dict):
    user_msg = data.get("message", "")
    reply = await run_agent(user_msg)
    return {"reply": reply}
