from tools import create_file, read_file, scaffold_web

async def run_agent(message: str):
    msg = message.lower()

    if msg.startswith("file banao"):
        return create_file("demo.txt", "Hello from Mukul Assistant")

    if "web project" in msg:
        return scaffold_web("mukul_web")

    if "help" in msg:
        return (
            "Commands:\n"
            "- file banao\n"
            "- web project banao\n"
        )

    return "Command samajh nahi aaya. 'help' likho."
