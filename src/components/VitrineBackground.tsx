export function VitrineBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden>
      <div
        className="absolute inset-0 opacity-[0.4]"
        style={{
          background:
            "radial-gradient(ellipse 100% 70% at 50% -20%, rgba(34,211,238,0.28) 0%, transparent 55%), radial-gradient(ellipse 55% 45% at 100% 10%, rgba(168,85,247,0.22) 0%, transparent 50%), radial-gradient(ellipse 40% 35% at 0% 80%, rgba(59,130,246,0.12) 0%, transparent 45%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#030712_75%)]" />
    </div>
  );
}
