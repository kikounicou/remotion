import {
  AbsoluteFill,
  OffthreadVideo,
  Audio,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
  spring,
} from 'remotion';
import React from 'react';

// =============================================================================
// CONFIGURATION - Timestamps from Nicolas transcription
// =============================================================================
const TOTAL_DURATION = 33.21;

const scenes = [
  {
    id: 1,
    start: 0,
    end: 6.44,
    title: "2021",
    subtitle: "Bâtiments Quasi Zéro Énergie",
    bgColor1: "#0f4c3a",
    bgColor2: "#1a2f4e",
    avatarPosition: { x: 85, y: 75, scale: 0.85 }, // Far bottom right corner
    keywords: [
      { text: "2021", start: 1.22, end: 2.22, size: 180, y: 25, color: "#4ade80" },
      { text: "WALLONIE", start: 3.76, end: 4.16, size: 60, y: 45, color: "#fff" },
      { text: "QUASI ZÉRO ÉNERGIE", start: 4.84, end: 6.44, size: 50, y: 60, color: "#22d3ee" },
    ],
  },
  {
    id: 2,
    start: 7.02,
    end: 14.28,
    title: "PEB",
    subtitle: "Performance Énergétique",
    bgColor1: "#1e3a5f",
    bgColor2: "#0c1929",
    avatarPosition: { x: 12, y: 75, scale: 0.8 }, // Far bottom left corner
    keywords: [
      { text: "PEB", start: 7.24, end: 8.10, size: 200, y: 30, color: "#60a5fa" },
      { text: "CONSTRUCTION", start: 11.62, end: 12.14, size: 45, y: 50, color: "#fff" },
      { text: "RÉNOVATION", start: 12.74, end: 13.12, size: 45, y: 62, color: "#fff" },
      { text: "DEPUIS 2008", start: 13.54, end: 14.28, size: 70, y: 78, color: "#fbbf24" },
    ],
  },
  {
    id: 3,
    start: 14.92,
    end: 19.76,
    title: "Objectifs",
    subtitle: "Environnement & Économies",
    bgColor1: "#14532d",
    bgColor2: "#1c1917",
    avatarPosition: { x: 88, y: 50, scale: 0.75 }, // Far right center
    keywords: [
      { text: "CO₂", start: 17.24, end: 17.90, size: 160, y: 35, color: "#ef4444", crossed: true },
      { text: "FACTURES", start: 18.90, end: 19.76, size: 80, y: 65, color: "#4ade80" },
    ],
  },
  {
    id: 4,
    start: 20.32,
    end: 28.46,
    title: "Normes",
    subtitle: "Les Exigences Techniques",
    bgColor1: "#78350f",
    bgColor2: "#1c1917",
    avatarPosition: { x: 12, y: 50, scale: 0.7 }, // Far left center
    keywords: [
      { text: "K35", start: 21.66, end: 22.50, size: 140, y: 20, color: "#fb923c" },
      { text: "VENTILATION", start: 23.00, end: 23.90, size: 55, y: 40, color: "#fff" },
      { text: "FAISABILITÉ", start: 24.84, end: 25.44, size: 45, y: 55, color: "#a3a3a3" },
      { text: "BORNES DE RECHARGE", start: 26.88, end: 28.46, size: 50, y: 75, color: "#38bdf8" },
    ],
  },
  {
    id: 5,
    start: 28.46,
    end: 33.21,
    title: "uvcw.be",
    subtitle: "Votre Guide Complet",
    bgColor1: "#581c87",
    bgColor2: "#1e1b4b",
    avatarPosition: { x: 50, y: 80, scale: 0.9 }, // Bottom center, lower
    keywords: [
      { text: "GUIDE COMPLET", start: 29.56, end: 30.20, size: 60, y: 20, color: "#fff" },
      { text: "uvcw.be", start: 30.74, end: 32.88, size: 120, y: 40, color: "#fbbf24" },
    ],
  },
];

// =============================================================================
// ANIMATED PARTICLES
// =============================================================================
const Particles: React.FC<{ color: string; count?: number }> = ({ color, count = 30 }) => {
  const frame = useCurrentFrame();

  const particles = React.useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      x: (i * 37) % 100,
      y: (i * 53) % 100,
      size: 2 + (i % 4) * 2,
      speed: 0.2 + (i % 5) * 0.1,
      delay: i * 10,
    }));
  }, [count]);

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      {particles.map((p, i) => {
        const y = (p.y + (frame + p.delay) * p.speed * 0.1) % 120 - 10;
        const opacity = 0.1 + Math.sin((frame + p.delay) * 0.03) * 0.1;
        const x = p.x + Math.sin((frame + p.delay) * 0.02) * 3;

        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: `${x}%`,
              top: `${y}%`,
              width: p.size,
              height: p.size,
              borderRadius: '50%',
              backgroundColor: color,
              opacity,
            }}
          />
        );
      })}
    </div>
  );
};

// =============================================================================
// ANIMATED GRID BACKGROUND
// =============================================================================
const GridBackground: React.FC<{ color: string }> = ({ color }) => {
  const frame = useCurrentFrame();
  const offset = frame * 0.5;

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        opacity: 0.05,
        backgroundImage: `
          linear-gradient(${color} 1px, transparent 1px),
          linear-gradient(90deg, ${color} 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px',
        backgroundPosition: `${offset}px ${offset}px`,
      }}
    />
  );
};

// =============================================================================
// ANIMATED KEYWORD WITH EFFECTS
// =============================================================================
const AnimatedKeyword: React.FC<{
  text: string;
  startTime: number;
  endTime: number;
  fontSize: number;
  yPercent: number;
  color: string;
  crossed?: boolean;
}> = ({ text, startTime, endTime, fontSize, yPercent, color, crossed }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const currentTime = frame / fps;

  if (currentTime < startTime - 0.3) return null;

  const isActive = currentTime >= startTime && currentTime <= endTime;
  const hasAppeared = currentTime >= startTime;

  // Spring entry
  const entryProgress = spring({
    frame: frame - Math.floor(startTime * fps),
    fps,
    config: { damping: 15, stiffness: 120 },
  });

  // Glow pulse
  const glowPulse = isActive ? 20 + Math.sin(frame * 0.2) * 10 : 0;

  // Scale bounce
  const scale = entryProgress * (isActive ? 1 + Math.sin(frame * 0.15) * 0.02 : 1);

  const opacity = hasAppeared ? Math.min(entryProgress, 1) : 0;

  // Crossed out animation for CO2
  const crossProgress = crossed && hasAppeared
    ? interpolate(currentTime, [startTime + 0.3, startTime + 0.6], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
    : 0;

  return (
    <div
      style={{
        position: 'absolute',
        top: `${yPercent}%`,
        left: '50%',
        transform: `translate(-50%, -50%) scale(${scale})`,
        opacity,
        fontSize,
        fontWeight: 900,
        color,
        textShadow: `
          0 0 ${glowPulse}px ${color},
          0 0 ${glowPulse * 2}px ${color}60,
          0 4px 30px rgba(0,0,0,0.8)
        `,
        letterSpacing: fontSize > 100 ? -5 : -2,
        fontFamily: "'Inter', system-ui, sans-serif",
        whiteSpace: 'nowrap',
        textAlign: 'center',
      }}
    >
      {text}
      {crossed && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '-10%',
            width: `${crossProgress * 120}%`,
            height: 8,
            backgroundColor: '#fff',
            transform: 'translateY(-50%) rotate(-10deg)',
            borderRadius: 4,
          }}
        />
      )}
    </div>
  );
};

// =============================================================================
// SCENE BACKGROUND WITH ANIMATED GRADIENT
// =============================================================================
const SceneBackground: React.FC<{
  color1: string;
  color2: string;
  progress: number;
}> = ({ color1, color2, progress }) => {
  const frame = useCurrentFrame();

  // Animated gradient angle
  const angle = 135 + Math.sin(frame * 0.01) * 15;

  // Ken Burns zoom effect
  const zoom = 1 + progress * 0.05;

  return (
    <div
      style={{
        position: 'absolute',
        inset: -50,
        background: `linear-gradient(${angle}deg, ${color1}, ${color2})`,
        transform: `scale(${zoom})`,
      }}
    />
  );
};

// =============================================================================
// AVATAR FRAME (PIP Style)
// =============================================================================
const AvatarFrame: React.FC<{
  x: number;
  y: number;
  scale: number;
  sceneProgress: number;
}> = ({ x, y, scale, sceneProgress }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Smooth position interpolation
  const smoothX = x;
  const smoothY = y;

  // Subtle floating animation
  const floatY = Math.sin(frame * 0.05) * 5;

  // Frame glow
  const glowIntensity = 10 + Math.sin(frame * 0.1) * 5;

  return (
    <div
      style={{
        position: 'absolute',
        left: `${smoothX}%`,
        top: `${smoothY + floatY * 0.1}%`,
        transform: `translate(-50%, -50%) scale(${scale})`,
        width: 500,
        height: 500,
        borderRadius: 20,
        overflow: 'hidden',
        boxShadow: `
          0 0 ${glowIntensity}px rgba(255,255,255,0.3),
          0 20px 60px rgba(0,0,0,0.5),
          inset 0 0 0 3px rgba(255,255,255,0.1)
        `,
        zIndex: 100,
      }}
    >
      <OffthreadVideo
        src={staticFile('tutorial/avatars/nicolas-peb-complete.mp4')}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center top',
        }}
      />
      {/* Vignette overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle, transparent 50%, rgba(0,0,0,0.3) 100%)',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
};

// =============================================================================
// SCENE COMPONENT
// =============================================================================
const Scene: React.FC<{
  scene: typeof scenes[0];
  isActive: boolean;
}> = ({ scene, isActive }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const currentTime = frame / fps;

  // Scene progress
  const sceneProgress = interpolate(
    currentTime,
    [scene.start, scene.end],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // Entry/exit
  const entryProgress = interpolate(
    currentTime,
    [scene.start - 0.3, scene.start + 0.3],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) }
  );

  const exitProgress = interpolate(
    currentTime,
    [scene.end - 0.3, scene.end],
    [1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const opacity = Math.min(entryProgress, exitProgress);
  const scale = 0.95 + entryProgress * 0.05;

  if (currentTime < scene.start - 0.5 || currentTime > scene.end + 0.3) return null;

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        opacity,
        transform: `scale(${scale})`,
      }}
    >
      {/* Animated background */}
      <SceneBackground
        color1={scene.bgColor1}
        color2={scene.bgColor2}
        progress={sceneProgress}
      />

      {/* Grid */}
      <GridBackground color="#ffffff" />

      {/* Particles */}
      <Particles color="#ffffff" count={25} />

      {/* Keywords */}
      {scene.keywords.map((kw, i) => (
        <AnimatedKeyword
          key={i}
          text={kw.text}
          startTime={kw.start}
          endTime={kw.end}
          fontSize={kw.size}
          yPercent={kw.y}
          color={kw.color}
          crossed={kw.crossed}
        />
      ))}

      {/* Avatar */}
      <AvatarFrame
        x={scene.avatarPosition.x}
        y={scene.avatarPosition.y}
        scale={scene.avatarPosition.scale}
        sceneProgress={sceneProgress}
      />
    </div>
  );
};

// =============================================================================
// PROGRESS BAR
// =============================================================================
const ProgressBar: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const progress = frame / durationInFrames;

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 4,
        backgroundColor: 'rgba(255,255,255,0.1)',
        zIndex: 200,
      }}
    >
      <div
        style={{
          height: '100%',
          width: `${progress * 100}%`,
          background: 'linear-gradient(90deg, #4ade80, #22d3ee, #a78bfa)',
          boxShadow: '0 0 20px rgba(74, 222, 128, 0.5)',
        }}
      />
    </div>
  );
};

// =============================================================================
// BRANDING
// =============================================================================
const Branding: React.FC = () => {
  const frame = useCurrentFrame();
  const pulse = 0.8 + Math.sin(frame * 0.05) * 0.1;

  return (
    <div
      style={{
        position: 'absolute',
        top: 30,
        left: 30,
        display: 'flex',
        alignItems: 'center',
        gap: 15,
        zIndex: 200,
      }}
    >
      <div
        style={{
          width: 50,
          height: 50,
          borderRadius: 12,
          background: 'linear-gradient(135deg, #4ade80, #22d3ee)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 900,
          fontSize: 20,
          color: '#000',
          transform: `scale(${pulse})`,
          boxShadow: '0 4px 20px rgba(74, 222, 128, 0.3)',
        }}
      >
        PEB
      </div>
      <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14, fontWeight: 500 }}>
        WALLONIE 2025
      </div>
    </div>
  );
};

// =============================================================================
// MAIN COMPONENT
// =============================================================================
export const PebTutorialPro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const currentTime = frame / fps;

  const activeScene = scenes.find(
    (s) => currentTime >= s.start - 0.3 && currentTime <= s.end + 0.3
  );

  return (
    <AbsoluteFill style={{ backgroundColor: '#0a0a0f' }}>
      {/* Background music - low volume to not overpower voice */}
      <Audio
        src={staticFile('sounds/music/corporate/professional.mp3')}
        volume={0.15}
      />

      {/* Render all scenes */}
      {scenes.map((scene) => (
        <Scene
          key={scene.id}
          scene={scene}
          isActive={activeScene?.id === scene.id}
        />
      ))}

      {/* Branding */}
      <Branding />

      {/* Progress bar */}
      <ProgressBar />

      {/* UVCW watermark */}
      <div
        style={{
          position: 'absolute',
          bottom: 20,
          right: 30,
          color: 'rgba(255,255,255,0.3)',
          fontSize: 12,
          fontWeight: 500,
          letterSpacing: 2,
          zIndex: 200,
        }}
      >
        UVCW.BE
      </div>
    </AbsoluteFill>
  );
};
