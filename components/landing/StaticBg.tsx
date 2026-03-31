"use client";

/**
 * StaticBg — replaces CursorParallaxBackground.
 * Clean, static, no cursor tracking or spring animations.
 * Just a rich atmospheric dark gradient + subtle grid texture.
 */
export function StaticBg() {
  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 bg-black"
      aria-hidden
    >
      {/* Deep maroon radial at bottom — warmth without movement */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_140%_55%_at_50%_108%,rgba(128,0,0,0.32),transparent_52%)]" />

      {/* Gold top-left ambient */}
      <div className="absolute -left-[15%] -top-[10%] h-[min(80vw,560px)] w-[min(80vw,560px)] rounded-full bg-[radial-gradient(circle_at_35%_35%,rgba(255,215,0,0.09),transparent_65%)] blur-3xl" />

      {/* Maroon bottom-right ambient */}
      <div className="absolute -bottom-[5%] -right-[12%] h-[min(70vw,500px)] w-[min(70vw,500px)] rounded-full bg-[radial-gradient(circle_at_65%_65%,rgba(128,0,0,0.28),transparent_60%)] blur-3xl" />

      {/* Static cyber grid */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
        }}
      />

      {/* Top vignette */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black to-transparent" />

      {/* Bottom vignette */}
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black to-transparent" />
    </div>
  );
}
