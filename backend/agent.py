"""
Mukul Assistant – AI Agent
AI plug-in ready (OpenAI / Ollama later)
"""

async def run_agent(message: str):
    message = message.lower().strip()

    if "hello" in message or "hi" in message:
        return "Hello Mukul 👋 Main aapka Assistant hoon. Batao kya kaam hai?"

    if "project" in message:
        return "Main project banana, code likhna aur test karna janta hoon."

    if "help" in message:
        return (
            "Main ye kaam kar sakta hoon:\n"
            "- Web / App project banana\n"
            "- Code likhna\n"
            "- Testing\n"
            "- Aage chalke video editing & automation\n"
        )

    return f"Samjha 👍 Aapne bola: {message}\n(Real AI next stage me add hoga)"
