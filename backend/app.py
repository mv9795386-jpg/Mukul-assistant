from fastapi import FastAPI
from agent import run_agent

app = FastAPI(title="Mukul Assistant Backend")

@app.get("/")
def root():
    return {"message": "Mukul Assistant backend running"}

@app.post("/chat")
async def chat(data: dict):
    user_msg = data.get("message", "")
    reply = await run_agent(user_msg)
    return {"reply": reply}
