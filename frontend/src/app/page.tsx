import JarvisBackground from "@/components/JarvisBackground";
import ChatPanel from "@/components/ChatPanel";

export default function Page() {
  return (
    <main
      style={{
        position: "relative",
        height: "100vh",
        display: "grid",
        placeItems: "center",
      }}
    >
      <JarvisBackground />
      <ChatPanel />
    </main>
  );
}
