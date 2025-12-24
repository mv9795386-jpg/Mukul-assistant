export default function JarvisBackground() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
      }}
    >
      {/* grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(to right, var(--line) 1px, transparent 1px), linear-gradient(to bottom, var(--line) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          opacity: 0.25,
          maskImage:
            "radial-gradient(500px 400px at 50% 35%, black 40%, transparent 75%)",
        }}
      />

      {/* center ring */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: 520,
          height: 520,
          transform: "translate(-50%, -50%)",
          borderRadius: "50%",
          border: "1px solid var(--line)",
          boxShadow: "0 0 60px rgba(90,220,255,.15) inset",
        }}
      />
    </div>
  );
}
