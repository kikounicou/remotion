import React from 'react';
import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Video,
  staticFile,
  Easing,
  Audio,
} from 'remotion';

// ============================================================================
// CONFIGURATION
// ============================================================================

const CHAPTERS = [
  {
    id: 'intro',
    title: 'INTRO',
    startFrame: 0,
    duration: 180, // 6s
  },
  {
    id: 'basics',
    title: 'Les Bases',
    emoji: '🎬',
    startFrame: 180,
    duration: 270, // 9s - HelloWorld (5s) + transition
    clips: [
      { file: '01-HelloWorld.mp4', label: 'Animations Spring', duration: 150 },
    ],
  },
  {
    id: 'visuals',
    title: 'Effets Visuels',
    emoji: '✨',
    startFrame: 450,
    duration: 420, // 14s - Ken Burns + WordByWord
    clips: [
      { file: '02-ImageShowcase.mp4', label: 'Ken Burns Effect', duration: 180 },
      { file: '03-WordByWord.mp4', label: 'Texte Style TikTok', duration: 150 },
    ],
  },
  {
    id: 'branding',
    title: 'Branding Pro',
    emoji: '💼',
    startFrame: 870,
    duration: 360, // 12s - LowerThirds + Stats
    clips: [
      { file: '04-LowerThirds.mp4', label: 'Bandeaux Broadcast', duration: 180 },
      { file: '05-AnimatedStats.mp4', label: 'Infographies Animées', duration: 150 },
    ],
  },
  {
    id: 'uvcw',
    title: 'JSON → Vidéo',
    emoji: '🚀',
    startFrame: 1230,
    duration: 540, // 18s - UVCW demos
    clips: [
      { file: '06-UVCW-Ultimate-PanLeft.mp4', label: 'Template Article', duration: 270 },
      { file: '07-UVCW-Ultimate-Social.mp4', label: 'Format Social', duration: 180 },
    ],
  },
  {
    id: 'docs',
    title: 'Doc → Vidéo',
    emoji: '📚',
    startFrame: 1770,
    duration: 330, // 11s - EvalFlow
    clips: [
      { file: '08-EvalFlow.mp4', label: 'Workflow Animé', duration: 270 },
    ],
  },
  {
    id: 'avatar',
    title: 'Avatar IA',
    emoji: '🤖',
    startFrame: 2100,
    duration: 900, // 30s - Both tutorials
    clips: [
      { file: '09-Tutorial-PEB-August.mp4', label: 'HeyGen + ElevenLabs', duration: 420 },
      { file: '10-Tutorial-PEB-PRO.mp4', label: 'Mon Avatar Perso', duration: 420 },
    ],
  },
  {
    id: 'outro',
    title: 'OUTRO',
    startFrame: 3000,
    duration: 180, // 6s
  },
];

const TOTAL_DURATION = 3180; // ~106s = 1m46s

// ============================================================================
// COMPONENTS
// ============================================================================

// Animated background gradient
const AnimatedBackground: React.FC = () => {
  const frame = useCurrentFrame();
  const hue1 = interpolate(frame, [0, TOTAL_DURATION], [220, 280]);
  const hue2 = interpolate(frame, [0, TOTAL_DURATION], [260, 320]);

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg,
          hsl(${hue1}, 60%, 8%) 0%,
          hsl(${hue2}, 50%, 12%) 50%,
          hsl(${hue1 + 20}, 40%, 6%) 100%)`,
      }}
    />
  );
};

// Floating particles
const Particles: React.FC = () => {
  const frame = useCurrentFrame();
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: (i * 137.5) % 100,
    y: (i * 89.3) % 100,
    size: 2 + (i % 4),
    speed: 0.5 + (i % 3) * 0.3,
    opacity: 0.1 + (i % 5) * 0.05,
  }));

  return (
    <AbsoluteFill style={{ overflow: 'hidden' }}>
      {particles.map((p) => {
        const yOffset = (frame * p.speed) % 120;
        return (
          <div
            key={p.id}
            style={{
              position: 'absolute',
              left: `${p.x}%`,
              top: `${p.y - yOffset}%`,
              width: p.size,
              height: p.size,
              borderRadius: '50%',
              background: `rgba(99, 102, 241, ${p.opacity})`,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

// Progress bar at the bottom
const ProgressBar: React.FC = () => {
  const frame = useCurrentFrame();
  const progress = (frame / TOTAL_DURATION) * 100;

  // Find current chapter
  const currentChapter = CHAPTERS.find(
    (ch) => frame >= ch.startFrame && frame < ch.startFrame + ch.duration
  );

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 8,
        background: 'rgba(255, 255, 255, 0.1)',
      }}
    >
      {/* Chapter segments */}
      {CHAPTERS.map((ch, i) => {
        const left = (ch.startFrame / TOTAL_DURATION) * 100;
        const width = (ch.duration / TOTAL_DURATION) * 100;
        const isActive = currentChapter?.id === ch.id;

        return (
          <div
            key={ch.id}
            style={{
              position: 'absolute',
              left: `${left}%`,
              width: `${width}%`,
              height: '100%',
              background: isActive ? '#6366f1' : 'rgba(99, 102, 241, 0.3)',
              borderRight: i < CHAPTERS.length - 1 ? '2px solid rgba(0,0,0,0.5)' : 'none',
            }}
          />
        );
      })}

      {/* Progress indicator */}
      <div
        style={{
          position: 'absolute',
          left: `${progress}%`,
          top: -4,
          width: 4,
          height: 16,
          background: 'white',
          borderRadius: 2,
          transform: 'translateX(-50%)',
        }}
      />
    </div>
  );
};

// Chapter title card
const ChapterCard: React.FC<{
  number: number;
  title: string;
  emoji: string;
  subtitle?: string;
}> = ({ number, title, emoji, subtitle }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scaleSpring = spring({ frame, fps, config: { damping: 12 } });
  const slideIn = spring({ frame: frame - 5, fps, config: { damping: 15 } });

  return (
    <AbsoluteFill
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        background: 'rgba(0, 0, 0, 0.7)',
        backdropFilter: 'blur(20px)',
      }}
    >
      <div
        style={{
          textAlign: 'center',
          transform: `scale(${scaleSpring})`,
        }}
      >
        <div
          style={{
            fontSize: 120,
            marginBottom: 20,
            transform: `translateY(${(1 - slideIn) * 50}px)`,
            opacity: slideIn,
          }}
        >
          {emoji}
        </div>
        <div
          style={{
            fontSize: 24,
            color: '#6366f1',
            fontWeight: 600,
            letterSpacing: 4,
            marginBottom: 10,
            opacity: slideIn,
          }}
        >
          CHAPITRE {number}
        </div>
        <div
          style={{
            fontSize: 72,
            fontWeight: 800,
            color: 'white',
            opacity: slideIn,
          }}
        >
          {title}
        </div>
        {subtitle && (
          <div
            style={{
              fontSize: 28,
              color: 'rgba(255, 255, 255, 0.6)',
              marginTop: 20,
              opacity: slideIn,
            }}
          >
            {subtitle}
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};

// Video frame with overlay label
const VideoFrame: React.FC<{
  videoSrc: string;
  label: string;
  highlight?: string;
}> = ({ videoSrc, label, highlight }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrySpring = spring({ frame, fps, config: { damping: 15 } });
  const labelSpring = spring({ frame: frame - 15, fps, config: { damping: 12 } });

  return (
    <AbsoluteFill>
      {/* Video container with frame */}
      <div
        style={{
          position: 'absolute',
          top: '5%',
          left: '5%',
          right: '5%',
          bottom: '15%',
          borderRadius: 24,
          overflow: 'hidden',
          boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5)',
          transform: `scale(${0.9 + entrySpring * 0.1})`,
          opacity: entrySpring,
        }}
      >
        <Video
          src={staticFile(`montage_linkedin/${videoSrc}`)}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />

        {/* Gradient overlay at bottom */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 150,
            background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
          }}
        />
      </div>

      {/* Label badge */}
      <div
        style={{
          position: 'absolute',
          bottom: '18%',
          left: '50%',
          transform: `translateX(-50%) translateY(${(1 - labelSpring) * 30}px)`,
          opacity: labelSpring,
        }}
      >
        <div
          style={{
            background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
            padding: '16px 40px',
            borderRadius: 50,
            fontSize: 32,
            fontWeight: 700,
            color: 'white',
            boxShadow: '0 10px 30px rgba(99, 102, 241, 0.4)',
          }}
        >
          {label}
        </div>
      </div>

      {/* Highlight bubble */}
      {highlight && (
        <div
          style={{
            position: 'absolute',
            top: '10%',
            right: '8%',
            background: '#10b981',
            padding: '12px 24px',
            borderRadius: 12,
            fontSize: 20,
            fontWeight: 600,
            color: 'white',
            transform: `scale(${spring({ frame: frame - 20, fps })})`,
          }}
        >
          {highlight}
        </div>
      )}
    </AbsoluteFill>
  );
};

// JSON Animation for UVCW chapter
const JsonAnimation: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const jsonSnippet = `{
  "titre": "Réforme du chômage...",
  "matiere": "Insertion",
  "couleur": "#E34F57",
  "photo_url": "https://...",
  "contenu": "L'adoption..."
}`;

  const lines = jsonSnippet.split('\n');

  return (
    <AbsoluteFill
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        background: 'rgba(0, 0, 0, 0.85)',
      }}
    >
      <div style={{ display: 'flex', gap: 80, alignItems: 'center' }}>
        {/* JSON Code */}
        <div
          style={{
            background: '#1e1e1e',
            borderRadius: 16,
            padding: 40,
            fontFamily: 'monospace',
            fontSize: 24,
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
          }}
        >
          {lines.map((line, i) => {
            const lineSpring = spring({
              frame: frame - i * 4,
              fps,
              config: { damping: 15 },
            });

            return (
              <div
                key={i}
                style={{
                  opacity: lineSpring,
                  transform: `translateX(${(1 - lineSpring) * 30}px)`,
                  color: line.includes(':') ? '#9cdcfe' : '#d4d4d4',
                }}
              >
                {line.includes(':') ? (
                  <>
                    <span style={{ color: '#9cdcfe' }}>
                      {line.split(':')[0]}:
                    </span>
                    <span style={{ color: '#ce9178' }}>
                      {line.split(':').slice(1).join(':')}
                    </span>
                  </>
                ) : (
                  <span style={{ color: '#d4d4d4' }}>{line}</span>
                )}
              </div>
            );
          })}
        </div>

        {/* Arrow */}
        <div
          style={{
            fontSize: 80,
            color: '#6366f1',
            transform: `scale(${spring({ frame: frame - 30, fps })})`,
          }}
        >
          →
        </div>

        {/* Result */}
        <div
          style={{
            transform: `scale(${spring({ frame: frame - 40, fps })})`,
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: 100, marginBottom: 20 }}>🎬</div>
          <div
            style={{
              fontSize: 36,
              fontWeight: 700,
              color: 'white',
            }}
          >
            Vidéo Automatique
          </div>
          <div
            style={{
              fontSize: 24,
              color: '#10b981',
              marginTop: 10,
            }}
          >
            46 matières • Couleurs • Pictos
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Skills.sh highlight
const SkillsHighlight: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const skills = [
    { name: 'remotion', icon: '🎬', desc: 'Best practices vidéo' },
    { name: 'elevenlabs', icon: '🎙️', desc: 'Voix IA naturelles' },
    { name: 'heygen', icon: '🤖', desc: 'Avatars vidéo IA' },
  ];

  return (
    <AbsoluteFill
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        background: 'rgba(0, 0, 0, 0.9)',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <div
          style={{
            fontSize: 28,
            color: '#6366f1',
            fontWeight: 600,
            letterSpacing: 3,
            marginBottom: 30,
            opacity: spring({ frame, fps }),
          }}
        >
          GRÂCE AUX SKILLS
        </div>

        <div
          style={{
            fontSize: 48,
            fontWeight: 800,
            color: 'white',
            marginBottom: 60,
            opacity: spring({ frame: frame - 5, fps }),
          }}
        >
          skills.sh
        </div>

        <div style={{ display: 'flex', gap: 40 }}>
          {skills.map((skill, i) => (
            <div
              key={skill.name}
              style={{
                background: 'rgba(99, 102, 241, 0.1)',
                border: '2px solid rgba(99, 102, 241, 0.3)',
                borderRadius: 20,
                padding: '30px 40px',
                transform: `scale(${spring({
                  frame: frame - 10 - i * 8,
                  fps,
                  config: { damping: 12 },
                })})`,
              }}
            >
              <div style={{ fontSize: 60, marginBottom: 15 }}>{skill.icon}</div>
              <div
                style={{
                  fontSize: 24,
                  fontWeight: 700,
                  color: 'white',
                  marginBottom: 8,
                }}
              >
                {skill.name}
              </div>
              <div style={{ fontSize: 18, color: 'rgba(255,255,255,0.6)' }}>
                {skill.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Funny avatar reveal
const AvatarReveal: React.FC<{ isPersonal?: boolean }> = ({ isPersonal }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const revealSpring = spring({ frame, fps, config: { damping: 12 } });

  return (
    <AbsoluteFill
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        background: 'rgba(0, 0, 0, 0.85)',
      }}
    >
      <div
        style={{
          textAlign: 'center',
          transform: `scale(${revealSpring})`,
        }}
      >
        {isPersonal ? (
          <>
            <div style={{ fontSize: 100, marginBottom: 20 }}>😴 → 🤖</div>
            <div
              style={{
                fontSize: 48,
                fontWeight: 800,
                color: 'white',
                marginBottom: 20,
              }}
            >
              Mon Avatar Personnel
            </div>
            <div
              style={{
                fontSize: 28,
                color: '#fbbf24',
                fontStyle: 'italic',
              }}
            >
              "Créé il y a 1 an... au saut du lit"
            </div>
            <div
              style={{
                fontSize: 80,
                marginTop: 20,
                transform: `rotate(${interpolate(frame, [0, 60], [0, 10])}deg)`,
              }}
            >
              😅
            </div>
          </>
        ) : (
          <>
            <div style={{ fontSize: 80, marginBottom: 20 }}>🎙️ + 🤖</div>
            <div
              style={{
                fontSize: 48,
                fontWeight: 800,
                color: 'white',
                marginBottom: 20,
              }}
            >
              ElevenLabs + HeyGen
            </div>
            <div style={{ fontSize: 28, color: 'rgba(255,255,255,0.6)' }}>
              Voix clonée • Avatar synchronisé
            </div>
          </>
        )}
      </div>
    </AbsoluteFill>
  );
};

// INTRO Scene
const IntroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 15 } });
  const subtitleSpring = spring({ frame: frame - 15, fps, config: { damping: 12 } });
  const statsSpring = spring({ frame: frame - 40, fps, config: { damping: 10 } });

  return (
    <AbsoluteFill
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {/* Main title */}
      <div style={{ textAlign: 'center' }}>
        <div
          style={{
            fontSize: 120,
            fontWeight: 900,
            color: 'white',
            lineHeight: 1.1,
            transform: `scale(${titleSpring})`,
          }}
        >
          <span style={{ color: '#6366f1' }}>1</span> journée
          <br />
          <span style={{ color: '#6366f1' }}>1</span> IA
          <br />
          <span style={{ color: '#6366f1' }}>10</span> vidéos
        </div>

        <div
          style={{
            marginTop: 50,
            fontSize: 36,
            color: 'rgba(255, 255, 255, 0.7)',
            transform: `translateY(${(1 - subtitleSpring) * 30}px)`,
            opacity: subtitleSpring,
          }}
        >
          Remotion + Claude Code + Skills
        </div>

        {/* Animated badges */}
        <div
          style={{
            marginTop: 50,
            display: 'flex',
            gap: 20,
            justifyContent: 'center',
            transform: `scale(${statsSpring})`,
            opacity: statsSpring,
          }}
        >
          {['🎬 Remotion', '🤖 Claude Code', '⚡ skills.sh'].map((badge, i) => (
            <div
              key={badge}
              style={{
                background: 'rgba(99, 102, 241, 0.2)',
                border: '1px solid rgba(99, 102, 241, 0.4)',
                padding: '12px 24px',
                borderRadius: 50,
                fontSize: 20,
                color: 'white',
                transform: `scale(${spring({
                  frame: frame - 50 - i * 5,
                  fps,
                })})`,
              }}
            >
              {badge}
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// OUTRO Scene
const OutroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const mainSpring = spring({ frame, fps, config: { damping: 12 } });

  const stats = [
    { value: '10', label: 'vidéos générées' },
    { value: '1', label: 'journée de travail' },
    { value: '3', label: 'skills utilisés' },
    { value: '∞', label: 'possibilités' },
  ];

  return (
    <AbsoluteFill
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <div
          style={{
            fontSize: 60,
            fontWeight: 800,
            color: 'white',
            marginBottom: 50,
            transform: `scale(${mainSpring})`,
          }}
        >
          Et ce n'est que le début...
        </div>

        {/* Stats grid */}
        <div
          style={{
            display: 'flex',
            gap: 40,
            marginBottom: 60,
          }}
        >
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              style={{
                textAlign: 'center',
                transform: `scale(${spring({
                  frame: frame - 10 - i * 5,
                  fps,
                })})`,
              }}
            >
              <div
                style={{
                  fontSize: 72,
                  fontWeight: 900,
                  color: '#6366f1',
                }}
              >
                {stat.value}
              </div>
              <div style={{ fontSize: 18, color: 'rgba(255,255,255,0.6)' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div
          style={{
            transform: `scale(${spring({ frame: frame - 40, fps })})`,
          }}
        >
          <div
            style={{
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
              padding: '20px 50px',
              borderRadius: 60,
              fontSize: 28,
              fontWeight: 700,
              color: 'white',
              display: 'inline-block',
            }}
          >
            🚀 Essayez skills.sh + Claude Code
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ============================================================================
// MAIN COMPOSITION
// ============================================================================

export const LinkedInShowcase: React.FC = () => {
  return (
    <AbsoluteFill style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
      <AnimatedBackground />
      <Particles />

      {/* ===== INTRO ===== */}
      <Sequence from={0} durationInFrames={180}>
        <IntroScene />
      </Sequence>

      {/* ===== CHAPTER 1: BASICS ===== */}
      <Sequence from={180} durationInFrames={60}>
        <ChapterCard number={1} title="Les Bases" emoji="🎬" subtitle="Animations Spring & Interpolation" />
      </Sequence>
      <Sequence from={240} durationInFrames={210}>
        <VideoFrame videoSrc="01-HelloWorld.mp4" label="Animations Spring" highlight="useCurrentFrame()" />
      </Sequence>

      {/* ===== CHAPTER 2: VISUALS ===== */}
      <Sequence from={450} durationInFrames={60}>
        <ChapterCard number={2} title="Effets Visuels" emoji="✨" subtitle="Ken Burns & Texte Animé" />
      </Sequence>
      <Sequence from={510} durationInFrames={180}>
        <VideoFrame videoSrc="02-ImageShowcase.mp4" label="Ken Burns Effect" highlight="Zoom & Pan" />
      </Sequence>
      <Sequence from={690} durationInFrames={180}>
        <VideoFrame videoSrc="03-WordByWord.mp4" label="Texte Style TikTok" />
      </Sequence>

      {/* ===== CHAPTER 3: BRANDING ===== */}
      <Sequence from={870} durationInFrames={60}>
        <ChapterCard number={3} title="Branding Pro" emoji="💼" subtitle="Templates Broadcast" />
      </Sequence>
      <Sequence from={930} durationInFrames={150}>
        <VideoFrame videoSrc="04-LowerThirds.mp4" label="Bandeaux Broadcast" />
      </Sequence>
      <Sequence from={1080} durationInFrames={150}>
        <VideoFrame videoSrc="05-AnimatedStats.mp4" label="Infographies Animées" highlight="Data Viz" />
      </Sequence>

      {/* ===== CHAPTER 4: UVCW / JSON → VIDEO ===== */}
      <Sequence from={1230} durationInFrames={60}>
        <ChapterCard number={4} title="JSON → Vidéo" emoji="🚀" subtitle="Automatisation Totale" />
      </Sequence>
      <Sequence from={1290} durationInFrames={120}>
        <JsonAnimation />
      </Sequence>
      <Sequence from={1410} durationInFrames={180}>
        <VideoFrame videoSrc="06-UVCW-Ultimate-PanLeft.mp4" label="Template Article UVCW" highlight="46 matières" />
      </Sequence>
      <Sequence from={1590} durationInFrames={180}>
        <VideoFrame videoSrc="07-UVCW-Ultimate-Social.mp4" label="Format Social 1:1" />
      </Sequence>

      {/* ===== CHAPTER 5: DOCS → VIDEO ===== */}
      <Sequence from={1770} durationInFrames={60}>
        <ChapterCard number={5} title="Doc → Vidéo" emoji="📚" subtitle="Documentation Technique Animée" />
      </Sequence>
      <Sequence from={1830} durationInFrames={270}>
        <VideoFrame videoSrc="08-EvalFlow.mp4" label="Workflow Animé" highlight="Auto-généré" />
      </Sequence>

      {/* ===== CHAPTER 6: AVATAR IA ===== */}
      <Sequence from={2100} durationInFrames={60}>
        <ChapterCard number={6} title="Avatar IA" emoji="🤖" subtitle="La Cerise sur le Gâteau" />
      </Sequence>
      <Sequence from={2160} durationInFrames={90}>
        <SkillsHighlight />
      </Sequence>
      <Sequence from={2250} durationInFrames={60}>
        <AvatarReveal />
      </Sequence>
      <Sequence from={2310} durationInFrames={300}>
        <VideoFrame videoSrc="09-Tutorial-PEB-August.mp4" label="Avatar August" highlight="HeyGen" />
      </Sequence>
      <Sequence from={2610} durationInFrames={60}>
        <AvatarReveal isPersonal />
      </Sequence>
      <Sequence from={2670} durationInFrames={330}>
        <VideoFrame videoSrc="10-Tutorial-PEB-PRO.mp4" label="Mon Avatar Perso 😅" highlight="Au saut du lit" />
      </Sequence>

      {/* ===== OUTRO ===== */}
      <Sequence from={3000} durationInFrames={180}>
        <OutroScene />
      </Sequence>

      {/* Progress bar always visible */}
      <ProgressBar />

      {/* Background music */}
      <Audio
        src={staticFile('sounds/music/corporate/professional.mp3')}
        volume={0.12}
      />
    </AbsoluteFill>
  );
};

export const LINKEDIN_SHOWCASE_DURATION = TOTAL_DURATION;
