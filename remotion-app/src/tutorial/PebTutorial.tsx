import {
  AbsoluteFill,
  OffthreadVideo,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
  spring,
} from 'remotion';

// Scene configuration with visuals - yPos is percentage from top
const scenes = [
  {
    id: 1,
    start: 0,
    end: 5.66,
    visual: "building",
    gradient: ["#1a5f2a", "#0d3d1a"],
    keywords: [
      { text: "2021", start: 1.2, end: 2.08, size: "huge", yPos: 30 },
      { text: "Wallonie", start: 3.22, end: 3.56, size: "medium", yPos: 50 },
      { text: "Quasi Zéro Énergie", start: 4.02, end: 5.66, size: "large", yPos: 70 },
    ],
  },
  {
    id: 2,
    start: 6.02,
    end: 11.56,
    visual: "document",
    gradient: ["#1a3a5c", "#0d1f33"],
    keywords: [
      { text: "PEB", start: 6.2, end: 6.76, size: "huge", yPos: 25 },
      { text: "Construction", start: 9.42, end: 9.84, size: "medium", yPos: 50 },
      { text: "Rénovation", start: 10.3, end: 10.6, size: "medium", yPos: 65 },
      { text: "2008", start: 10.88, end: 11.56, size: "large", yPos: 80 },
    ],
  },
  {
    id: 3,
    start: 11.96,
    end: 16.34,
    visual: "eco",
    gradient: ["#2d5a27", "#1a3518"],
    keywords: [
      { text: "CO₂", start: 13.84, end: 14.74, size: "huge", color: "#ff6b6b", yPos: 35 },
      { text: "Factures", start: 15.54, end: 16.34, size: "large", color: "#4ecdc4", yPos: 65 },
    ],
  },
  {
    id: 4,
    start: 16.92,
    end: 23.66,
    visual: "tech",
    gradient: ["#5c3d1a", "#332211"],
    keywords: [
      { text: "K35", start: 17.96, end: 18.62, size: "huge", yPos: 20 },
      { text: "Ventilation", start: 18.98, end: 19.84, size: "large", yPos: 40 },
      { text: "Faisabilité", start: 20.68, end: 21.24, size: "medium", yPos: 60 },
      { text: "Bornes de recharge", start: 22.52, end: 23.66, size: "large", color: "#3498db", yPos: 80 },
    ],
  },
  {
    id: 5,
    start: 24.28,
    end: 27.54,
    visual: "cta",
    gradient: ["#5c1a5c", "#331133"],
    keywords: [
      { text: "Guide complet", start: 24.28, end: 25.38, size: "large", yPos: 35 },
      { text: "uvcw.be", start: 25.38, end: 27.24, size: "huge", color: "#f39c12", yPos: 60 },
    ],
  },
];

// Animated background shapes
const FloatingShapes: React.FC<{ color: string }> = ({ color }) => {
  const frame = useCurrentFrame();

  const shapes = [
    { x: 80, y: 20, size: 120, speed: 0.3, delay: 0 },
    { x: 20, y: 70, size: 80, speed: 0.5, delay: 10 },
    { x: 60, y: 50, size: 60, speed: 0.4, delay: 20 },
    { x: 90, y: 80, size: 100, speed: 0.35, delay: 5 },
  ];

  return (
    <>
      {shapes.map((shape, i) => {
        const y = shape.y + Math.sin((frame + shape.delay) * shape.speed * 0.1) * 5;
        const opacity = 0.1 + Math.sin((frame + shape.delay) * 0.05) * 0.05;
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: `${shape.x}%`,
              top: `${y}%`,
              width: shape.size,
              height: shape.size,
              borderRadius: '50%',
              background: `radial-gradient(circle, ${color}40, transparent)`,
              opacity,
              transform: 'translate(-50%, -50%)',
            }}
          />
        );
      })}
    </>
  );
};

// Huge animated keyword - positioned in a vertical stack
const BigKeyword: React.FC<{
  text: string;
  startTime: number;
  endTime: number;
  size: string;
  color?: string;
  yPosition: number; // Percentage from top
}> = ({ text, startTime, endTime, size, color = '#ffffff', yPosition }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const currentTime = frame / fps;

  if (currentTime < startTime - 0.2) return null;

  const isActive = currentTime >= startTime && currentTime <= endTime;
  const hasAppeared = currentTime >= startTime;

  // Spring animation for entry
  const entryProgress = spring({
    frame: frame - Math.floor(startTime * fps),
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  // Pulse when active
  const pulse = isActive ? 1 + Math.sin(frame * 0.3) * 0.02 : 1;

  // Size mapping
  const fontSize = size === 'huge' ? 120 : size === 'large' ? 70 : 45;

  const scale = entryProgress * pulse;
  const opacity = hasAppeared ? interpolate(entryProgress, [0, 1], [0, 1]) : 0;

  // Glow effect when active
  const glowIntensity = isActive ? 30 : 0;

  return (
    <div
      style={{
        position: 'absolute',
        top: `${yPosition}%`,
        left: '50%',
        transform: `translate(-50%, -50%) scale(${scale})`,
        opacity,
        fontSize,
        fontWeight: 900,
        color: color,
        textShadow: `
          0 0 ${glowIntensity}px ${color},
          0 0 ${glowIntensity * 2}px ${color}40,
          0 4px 20px rgba(0,0,0,0.5)
        `,
        letterSpacing: size === 'huge' ? -3 : -1,
        textTransform: 'uppercase',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        whiteSpace: 'nowrap',
      }}
    >
      {text}
    </div>
  );
};

// Visual illustrations for each scene
const SceneVisual: React.FC<{ visual: string; progress: number }> = ({ visual, progress }) => {
  const opacity = interpolate(progress, [0, 0.3], [0, 0.3], { extrapolateRight: 'clamp' });
  const scale = interpolate(progress, [0, 1], [1.1, 1], { extrapolateRight: 'clamp' });

  // Different SVG illustrations based on visual type
  const renderVisual = () => {
    switch (visual) {
      case 'building':
        return (
          <svg viewBox="0 0 200 200" style={{ width: '100%', height: '100%', opacity: 0.15 }}>
            {/* Modern building */}
            <rect x="40" y="60" width="120" height="130" fill="currentColor" rx="4" />
            <rect x="50" y="70" width="20" height="25" fill="#1a1a2e" rx="2" />
            <rect x="80" y="70" width="20" height="25" fill="#1a1a2e" rx="2" />
            <rect x="110" y="70" width="20" height="25" fill="#1a1a2e" rx="2" />
            <rect x="50" y="105" width="20" height="25" fill="#1a1a2e" rx="2" />
            <rect x="80" y="105" width="20" height="25" fill="#1a1a2e" rx="2" />
            <rect x="110" y="105" width="20" height="25" fill="#1a1a2e" rx="2" />
            <rect x="50" y="140" width="20" height="25" fill="#1a1a2e" rx="2" />
            <rect x="80" y="140" width="20" height="25" fill="#1a1a2e" rx="2" />
            <rect x="110" y="140" width="20" height="25" fill="#1a1a2e" rx="2" />
            {/* Solar panels on roof */}
            <polygon points="100,30 170,60 30,60" fill="currentColor" />
            <rect x="45" y="42" width="30" height="15" fill="#4CAF50" rx="2" transform="rotate(-15 60 50)" />
            <rect x="85" y="35" width="30" height="15" fill="#4CAF50" rx="2" transform="rotate(-15 100 43)" />
            <rect x="125" y="42" width="30" height="15" fill="#4CAF50" rx="2" transform="rotate(-15 140 50)" />
          </svg>
        );

      case 'document':
        return (
          <svg viewBox="0 0 200 200" style={{ width: '100%', height: '100%', opacity: 0.15 }}>
            {/* Document with checkmarks */}
            <rect x="40" y="30" width="120" height="150" fill="currentColor" rx="8" />
            <rect x="55" y="50" width="90" height="8" fill="#1a1a2e" rx="2" />
            <rect x="55" y="70" width="70" height="6" fill="#1a1a2e" rx="2" />
            <rect x="55" y="90" width="80" height="6" fill="#1a1a2e" rx="2" />
            <circle cx="60" cy="120" r="12" fill="#4CAF50" />
            <path d="M54 120 L58 124 L66 114" stroke="#fff" strokeWidth="3" fill="none" />
            <rect x="80" y="115" width="60" height="6" fill="#1a1a2e" rx="2" />
            <circle cx="60" cy="150" r="12" fill="#4CAF50" />
            <path d="M54 150 L58 154 L66 144" stroke="#fff" strokeWidth="3" fill="none" />
            <rect x="80" y="145" width="50" height="6" fill="#1a1a2e" rx="2" />
          </svg>
        );

      case 'eco':
        return (
          <svg viewBox="0 0 200 200" style={{ width: '100%', height: '100%', opacity: 0.15 }}>
            {/* Leaf / eco symbol */}
            <path
              d="M100 180 C100 180 40 140 40 80 C40 40 80 20 100 20 C120 20 160 40 160 80 C160 140 100 180 100 180"
              fill="currentColor"
            />
            <path
              d="M100 180 L100 60 M100 90 L70 70 M100 120 L130 95"
              stroke="#1a1a2e"
              strokeWidth="6"
              fill="none"
            />
            {/* CO2 crossed out */}
            <circle cx="150" cy="150" r="35" fill="#ff6b6b" opacity="0.5" />
            <text x="150" y="155" textAnchor="middle" fontSize="16" fill="#fff" fontWeight="bold">CO₂</text>
            <line x1="125" y1="175" x2="175" y2="125" stroke="#fff" strokeWidth="4" />
          </svg>
        );

      case 'tech':
        return (
          <svg viewBox="0 0 200 200" style={{ width: '100%', height: '100%', opacity: 0.15 }}>
            {/* House with tech elements */}
            <polygon points="100,20 180,80 180,180 20,180 20,80" fill="currentColor" />
            <polygon points="100,20 180,80 20,80" fill="currentColor" />
            {/* Insulation waves */}
            <path d="M40 100 Q50 90 60 100 T80 100 T100 100 T120 100 T140 100 T160 100" stroke="#FF9800" strokeWidth="4" fill="none" />
            <path d="M40 120 Q50 110 60 120 T80 120 T100 120 T120 120 T140 120 T160 120" stroke="#FF9800" strokeWidth="4" fill="none" />
            {/* EV charger */}
            <rect x="140" y="130" width="30" height="45" fill="#3498db" rx="4" />
            <circle cx="155" cy="145" r="8" fill="#fff" />
            <rect x="152" y="155" width="6" height="15" fill="#fff" rx="2" />
          </svg>
        );

      case 'cta':
        return (
          <svg viewBox="0 0 200 200" style={{ width: '100%', height: '100%', opacity: 0.2 }}>
            {/* Arrow / Click */}
            <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="4" />
            <circle cx="100" cy="100" r="45" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="10 5" />
            <polygon points="100,70 130,110 110,110 110,140 90,140 90,110 70,110" fill="currentColor" />
          </svg>
        );

      default:
        return null;
    }
  };

  return (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: '80%',
        height: '80%',
        transform: `translate(-50%, -50%) scale(${scale})`,
        color: '#ffffff',
        opacity,
      }}
    >
      {renderVisual()}
    </div>
  );
};

// Scene transition
const SceneContent: React.FC<{
  scene: typeof scenes[0];
  isActive: boolean;
}> = ({ scene, isActive }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const currentTime = frame / fps;

  // Calculate scene progress
  const sceneProgress = interpolate(
    currentTime,
    [scene.start, scene.end],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // Entry animation
  const entryProgress = interpolate(
    currentTime,
    [scene.start, scene.start + 0.5],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) }
  );

  // Exit animation
  const exitProgress = interpolate(
    currentTime,
    [scene.end - 0.3, scene.end],
    [1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const opacity = Math.min(entryProgress, exitProgress);

  if (currentTime < scene.start - 0.5 || currentTime > scene.end + 0.5) return null;

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity,
        background: `linear-gradient(135deg, ${scene.gradient[0]}, ${scene.gradient[1]})`,
      }}
    >
      {/* Floating shapes */}
      <FloatingShapes color={scene.gradient[0]} />

      {/* Visual illustration */}
      <SceneVisual visual={scene.visual} progress={sceneProgress} />

      {/* Keywords */}
      {scene.keywords.map((kw, i) => (
        <BigKeyword
          key={i}
          text={kw.text}
          startTime={kw.start}
          endTime={kw.end}
          size={kw.size}
          color={kw.color}
          yPosition={kw.yPos}
        />
      ))}
    </div>
  );
};

// Progress bar (subtle)
const ProgressBar: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const progress = frame / durationInFrames;

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 0,
        left: '40%',
        right: 0,
        height: 4,
        backgroundColor: 'rgba(255,255,255,0.1)',
      }}
    >
      <div
        style={{
          height: '100%',
          width: `${progress * 100}%`,
          backgroundColor: 'rgba(255,255,255,0.5)',
        }}
      />
    </div>
  );
};

// Main component
export const PebTutorial: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const currentTime = frame / fps;

  // Find active scene
  const activeScene = scenes.find(
    (s) => currentTime >= s.start - 0.5 && currentTime <= s.end + 0.5
  );

  return (
    <AbsoluteFill style={{ backgroundColor: '#0a0a14' }}>
      {/* Left side - Avatar video (40%) */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: '40%',
          height: '100%',
          overflow: 'hidden',
          zIndex: 10,
        }}
      >
        {/* Dark overlay to tone down the green */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(to bottom, rgba(10,10,20,0.3), rgba(10,10,20,0.5))',
            zIndex: 2,
            pointerEvents: 'none',
          }}
        />
        <OffthreadVideo
          src={staticFile('tutorial/avatars/august-peb-complete.mp4')}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
        {/* Gradient fade to right panel */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: -50,
            width: 200,
            height: '100%',
            background: 'linear-gradient(to right, transparent 0%, rgba(10,10,20,0.8) 50%, #0a0a14 100%)',
            zIndex: 5,
          }}
        />
      </div>

      {/* Right side - Dynamic content (60%) */}
      <div
        style={{
          position: 'absolute',
          right: 0,
          top: 0,
          width: '60%',
          height: '100%',
          overflow: 'hidden',
        }}
      >
        {scenes.map((scene) => (
          <SceneContent
            key={scene.id}
            scene={scene}
            isActive={activeScene?.id === scene.id}
          />
        ))}
      </div>

      {/* Progress bar */}
      <ProgressBar />

      {/* UVCW branding (subtle) */}
      <div
        style={{
          position: 'absolute',
          bottom: 20,
          left: 20,
          color: 'rgba(255,255,255,0.4)',
          fontSize: 12,
          fontFamily: 'system-ui',
          zIndex: 20,
        }}
      >
        UVCW • PEB Wallonie
      </div>
    </AbsoluteFill>
  );
};
