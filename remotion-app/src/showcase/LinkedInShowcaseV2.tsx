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
  Audio,
} from 'remotion';

// ============================================================================
// CONFIGURATION - V2 (1080x1080 format)
// ============================================================================

// Audio ducking configuration
// Segments where background music should fade out (but not completely)
const AUDIO_DUCK_SEGMENTS = [
  // UVCW-Social has SFX (full video: 600 frames)
  { startFrame: 1440, endFrame: 2040, fadeFrames: 15 },
  // Tutorial-PEB-PRO has cloned voice - duck music but keep it playing
  { startFrame: 3270, endFrame: 3580, fadeFrames: 20 },
];

// Videos to mute (keep only background music)
const MUTED_VIDEOS = [
  '01-HelloWorld.mp4',
  '08-EvalFlow.mp4',
];

// 16:9 videos that need letterbox treatment
const WIDESCREEN_VIDEOS = [
  '01-HelloWorld.mp4',
  '02-ImageShowcase.mp4',
  '04-LowerThirds.mp4',
  '05-AnimatedStats.mp4',
  'UVCW-ArticleVideo-9653.mp4',
  '09-Tutorial-PEB-August.mp4',
  '10-Tutorial-PEB-PRO.mp4',
];
// Note: 07-UVCW-Ultimate-Social.mp4 is 1:1, no letterbox needed

const CHAPTERS = [
  {
    id: 'intro',
    title: 'INTRO',
    startFrame: 0,
    duration: 150, // 5s
  },
  {
    id: 'basics',
    title: 'Les Bases',
    emoji: '🎬',
    startFrame: 150,
    duration: 240, // 8s
    clips: [
      { file: '01-HelloWorld.mp4', label: 'Animations Spring', duration: 150 },
    ],
  },
  {
    id: 'visuals',
    title: 'Effets Visuels',
    emoji: '✨',
    startFrame: 390,
    duration: 390, // 13s
    clips: [
      { file: '02-ImageShowcase.mp4', label: 'Ken Burns Effect', duration: 180 },
      { file: '03-WordByWord.mp4', label: 'Texte Style TikTok', duration: 150 },
    ],
  },
  {
    id: 'branding',
    title: 'Branding Pro',
    emoji: '💼',
    startFrame: 780,
    duration: 330, // 11s
    clips: [
      { file: '04-LowerThirds.mp4', label: 'Bandeaux Broadcast', duration: 150 },
      { file: '05-AnimatedStats.mp4', label: 'Infographies Animées', duration: 150 },
    ],
  },
  {
    id: 'uvcw',
    title: 'JSON → Vidéo',
    emoji: '🚀',
    startFrame: 1110,
    duration: 930, // 31s (extended UVCW-Social)
    clips: [
      { file: 'UVCW-ArticleVideo-9653.mp4', label: 'Template Article', duration: 180 },
      { file: '07-UVCW-Ultimate-Social.mp4', label: 'Format Social + SFX', duration: 600 },
    ],
  },
  {
    id: 'docs',
    title: 'Doc → Vidéo',
    emoji: '📚',
    startFrame: 2040,
    duration: 610, // ~20s (extended)
    clips: [
      { file: '08-EvalFlow.mp4', label: 'Workflow Animé', duration: 400 },
    ],
  },
  {
    id: 'avatar',
    title: 'Avatar IA',
    emoji: '🤖',
    startFrame: 2650,
    duration: 930, // 31s
    clips: [
      { file: '09-Tutorial-PEB-August.mp4', label: 'HeyGen + ElevenLabs', duration: 280 },
      { file: '10-Tutorial-PEB-PRO.mp4', label: 'Mon Avatar IA (au saut du lit)', duration: 310 },
    ],
  },
  {
    id: 'chat',
    title: 'Claude Code',
    emoji: '💬',
    startFrame: 3580,
    duration: 240, // 8s
  },
  {
    id: 'outro',
    title: 'OUTRO',
    startFrame: 3820,
    duration: 270, // 9s
  },
];

const TOTAL_DURATION = 4090; // ~136s = 2m16s

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

// Calculate background music volume based on ducking segments
const getBackgroundMusicVolume = (frame: number): number => {
  const baseVolume = 0.15;
  const duckVolume = 0.03;

  // Keep music playing throughout - no complete muting
  // Music continues until the end of the video

  for (const segment of AUDIO_DUCK_SEGMENTS) {
    const { startFrame, endFrame, fadeFrames } = segment;

    // Fade out before segment
    if (frame >= startFrame - fadeFrames && frame < startFrame) {
      return interpolate(
        frame,
        [startFrame - fadeFrames, startFrame],
        [baseVolume, duckVolume]
      );
    }

    // During segment (ducked)
    if (frame >= startFrame && frame <= endFrame) {
      return duckVolume;
    }

    // Fade in after segment
    if (frame > endFrame && frame <= endFrame + fadeFrames) {
      return interpolate(
        frame,
        [endFrame, endFrame + fadeFrames],
        [duckVolume, baseVolume]
      );
    }
  }

  return baseVolume;
};

// Check if video should be muted
const shouldMuteVideo = (videoFile: string): boolean => {
  return MUTED_VIDEOS.includes(videoFile);
};

// Check if video is widescreen (needs letterbox)
const isWidescreen = (videoFile: string): boolean => {
  return WIDESCREEN_VIDEOS.includes(videoFile);
};

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
  const particles = Array.from({ length: 25 }, (_, i) => ({
    id: i,
    x: (i * 137.5) % 100,
    y: (i * 89.3) % 100,
    size: 2 + (i % 4),
    speed: 0.4 + (i % 3) * 0.25,
    opacity: 0.08 + (i % 5) * 0.04,
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
        height: 6,
        background: 'rgba(255, 255, 255, 0.1)',
      }}
    >
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

      <div
        style={{
          position: 'absolute',
          left: `${progress}%`,
          top: -3,
          width: 4,
          height: 12,
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
            fontSize: 100,
            marginBottom: 15,
            transform: `translateY(${(1 - slideIn) * 40}px)`,
            opacity: slideIn,
          }}
        >
          {emoji}
        </div>
        <div
          style={{
            fontSize: 20,
            color: '#6366f1',
            fontWeight: 600,
            letterSpacing: 3,
            marginBottom: 8,
            opacity: slideIn,
          }}
        >
          CHAPITRE {number}
        </div>
        <div
          style={{
            fontSize: 56,
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
              fontSize: 22,
              color: 'rgba(255, 255, 255, 0.6)',
              marginTop: 15,
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

// Video frame with letterbox support for 16:9 content
const VideoFrame: React.FC<{
  videoSrc: string;
  label: string;
  highlight?: string;
  sublabel?: string;
  fadeOutAudio?: number; // Frames before end to start fade out
  durationInFrames?: number; // Total duration for fade calculation
  fullscreen?: boolean; // Show video fullscreen without padding
}> = ({ videoSrc, label, highlight, sublabel, fadeOutAudio, durationInFrames, fullscreen }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrySpring = spring({ frame, fps, config: { damping: 15 } });
  const labelSpring = spring({ frame: frame - 10, fps, config: { damping: 12 } });

  const needsLetterbox = isWidescreen(videoSrc);
  const isMuted = shouldMuteVideo(videoSrc);

  // Calculate video volume with optional fade out
  let videoVolume = isMuted ? 0 : 1;
  if (fadeOutAudio && durationInFrames && !isMuted) {
    const fadeStart = durationInFrames - fadeOutAudio;
    if (frame >= fadeStart) {
      videoVolume = interpolate(frame, [fadeStart, durationInFrames], [1, 0], {
        extrapolateRight: 'clamp',
      });
    }
  }

  // Fullscreen mode - video takes the whole screen
  if (fullscreen) {
    return (
      <AbsoluteFill style={{ background: '#000' }}>
        <Video
          src={staticFile(`montage_linkedin/${videoSrc}`)}
          volume={videoVolume}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
        {/* Label at bottom */}
        {label && (
          <div
            style={{
              position: 'absolute',
              bottom: 40,
              left: '50%',
              transform: `translateX(-50%) translateY(${(1 - labelSpring) * 20}px)`,
              opacity: labelSpring,
              textAlign: 'center',
            }}
          >
            <div
              style={{
                background: 'rgba(0, 0, 0, 0.7)',
                backdropFilter: 'blur(10px)',
                padding: '10px 28px',
                borderRadius: 30,
                fontSize: 22,
                fontWeight: 700,
                color: 'white',
              }}
            >
              {label}
            </div>
            {sublabel && (
              <div
                style={{
                  marginTop: 8,
                  fontSize: 16,
                  color: 'rgba(255, 255, 255, 0.8)',
                }}
              >
                {sublabel}
              </div>
            )}
          </div>
        )}
        {highlight && (
          <div
            style={{
              position: 'absolute',
              top: 30,
              right: 30,
              background: '#10b981',
              padding: '8px 16px',
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 600,
              color: 'white',
              transform: `scale(${spring({ frame: frame - 15, fps })})`,
            }}
          >
            {highlight}
          </div>
        )}
      </AbsoluteFill>
    );
  }

  return (
    <AbsoluteFill>
      {/* Video container */}
      <div
        style={{
          position: 'absolute',
          top: '4%',
          left: '4%',
          right: '4%',
          bottom: '18%',
          borderRadius: 20,
          overflow: 'hidden',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)',
          transform: `scale(${0.92 + entrySpring * 0.08})`,
          opacity: entrySpring,
          background: '#000',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Video
          src={staticFile(`montage_linkedin/${videoSrc}`)}
          volume={videoVolume}
          style={{
            width: needsLetterbox ? '100%' : '100%',
            height: needsLetterbox ? 'auto' : '100%',
            maxHeight: '100%',
            objectFit: needsLetterbox ? 'contain' : 'cover',
          }}
        />

        {/* Gradient overlay at bottom */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 100,
            background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
          }}
        />
      </div>

      {/* Label badge */}
      <div
        style={{
          position: 'absolute',
          bottom: '20%',
          left: '50%',
          transform: `translateX(-50%) translateY(${(1 - labelSpring) * 25}px)`,
          opacity: labelSpring,
          textAlign: 'center',
        }}
      >
        <div
          style={{
            background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
            padding: '12px 32px',
            borderRadius: 40,
            fontSize: 26,
            fontWeight: 700,
            color: 'white',
            boxShadow: '0 8px 25px rgba(99, 102, 241, 0.4)',
          }}
        >
          {label}
        </div>
        {sublabel && (
          <div
            style={{
              marginTop: 10,
              fontSize: 18,
              color: 'rgba(255, 255, 255, 0.7)',
              fontStyle: 'italic',
            }}
          >
            {sublabel}
          </div>
        )}
      </div>

      {/* Highlight bubble */}
      {highlight && (
        <div
          style={{
            position: 'absolute',
            top: '8%',
            right: '8%',
            background: '#10b981',
            padding: '10px 20px',
            borderRadius: 10,
            fontSize: 16,
            fontWeight: 600,
            color: 'white',
            transform: `scale(${spring({ frame: frame - 15, fps })})`,
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
  "titre": "Réforme...",
  "matiere": "Insertion",
  "couleur": "#E34F57",
  "photo_url": "https://..."
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
      <div style={{ display: 'flex', gap: 50, alignItems: 'center' }}>
        {/* JSON Code */}
        <div
          style={{
            background: '#1e1e1e',
            borderRadius: 14,
            padding: 30,
            fontFamily: 'monospace',
            fontSize: 20,
            boxShadow: '0 15px 40px rgba(0, 0, 0, 0.5)',
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
                  transform: `translateX(${(1 - lineSpring) * 25}px)`,
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
            fontSize: 60,
            color: '#6366f1',
            transform: `scale(${spring({ frame: frame - 25, fps })})`,
          }}
        >
          →
        </div>

        {/* Result */}
        <div
          style={{
            transform: `scale(${spring({ frame: frame - 35, fps })})`,
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: 80, marginBottom: 15 }}>🎬</div>
          <div
            style={{
              fontSize: 28,
              fontWeight: 700,
              color: 'white',
            }}
          >
            Vidéo Auto
          </div>
          <div
            style={{
              fontSize: 18,
              color: '#10b981',
              marginTop: 8,
            }}
          >
            46 matières
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// SFX Explanation overlay
const SfxExplanation: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const appearSpring = spring({ frame: frame - 60, fps, config: { damping: 12 } });

  return (
    <div
      style={{
        position: 'absolute',
        bottom: '25%',
        left: '50%',
        transform: `translateX(-50%) scale(${appearSpring})`,
        opacity: appearSpring,
        background: 'rgba(16, 185, 129, 0.95)',
        padding: '12px 24px',
        borderRadius: 12,
        textAlign: 'center',
        boxShadow: '0 10px 30px rgba(16, 185, 129, 0.3)',
      }}
    >
      <div style={{ fontSize: 18, fontWeight: 700, color: 'white' }}>
        🔊 Test : Ajout de sons SFX
      </div>
      <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)', marginTop: 4 }}>
        Whoosh, pops, transitions sonores
      </div>
    </div>
  );
};

// Skills.sh highlight
const SkillsHighlight: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const skills = [
    { name: 'remotion', icon: '🎬', desc: 'Vidéo React' },
    { name: 'elevenlabs', icon: '🎙️', desc: 'Voix IA' },
    { name: 'heygen', icon: '🤖', desc: 'Avatar IA' },
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
            fontSize: 22,
            color: '#6366f1',
            fontWeight: 600,
            letterSpacing: 2,
            marginBottom: 20,
            opacity: spring({ frame, fps }),
          }}
        >
          GRÂCE AUX SKILLS
        </div>

        <div
          style={{
            fontSize: 40,
            fontWeight: 800,
            color: 'white',
            marginBottom: 40,
            opacity: spring({ frame: frame - 5, fps }),
          }}
        >
          skills.sh
        </div>

        <div style={{ display: 'flex', gap: 25 }}>
          {skills.map((skill, i) => (
            <div
              key={skill.name}
              style={{
                background: 'rgba(99, 102, 241, 0.1)',
                border: '2px solid rgba(99, 102, 241, 0.3)',
                borderRadius: 16,
                padding: '20px 28px',
                transform: `scale(${spring({
                  frame: frame - 10 - i * 6,
                  fps,
                  config: { damping: 12 },
                })})`,
              }}
            >
              <div style={{ fontSize: 48, marginBottom: 10 }}>{skill.icon}</div>
              <div
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  color: 'white',
                  marginBottom: 5,
                }}
              >
                {skill.name}
              </div>
              <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)' }}>
                {skill.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// AI Avatar explanation
const AiAvatarExplanation: React.FC<{ isPersonal?: boolean }> = ({ isPersonal }) => {
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
          maxWidth: 800,
          padding: 40,
        }}
      >
        {isPersonal ? (
          <>
            <div style={{ fontSize: 80, marginBottom: 20 }}>🤖</div>
            <div
              style={{
                fontSize: 38,
                fontWeight: 800,
                color: 'white',
                marginBottom: 15,
              }}
            >
              Ce n'est PAS moi qui parle !
            </div>
            <div
              style={{
                fontSize: 24,
                color: 'rgba(255, 255, 255, 0.8)',
                marginBottom: 20,
                lineHeight: 1.5,
              }}
            >
              C'est une <span style={{ color: '#6366f1', fontWeight: 700 }}>IA HeyGen</span> qui
              anime mon avatar + une voix clonée par <span style={{ color: '#10b981', fontWeight: 700 }}>ElevenLabs</span>
            </div>
            <div
              style={{
                fontSize: 22,
                color: '#fbbf24',
                fontStyle: 'italic',
                marginTop: 20,
              }}
            >
              "Avatar créé il y a 1 an... au saut du lit 😅"
            </div>
            <div
              style={{
                marginTop: 25,
                padding: '10px 20px',
                background: 'rgba(99, 102, 241, 0.2)',
                borderRadius: 10,
                fontSize: 16,
                color: 'rgba(255, 255, 255, 0.7)',
              }}
            >
              Script → ElevenLabs → HeyGen → Remotion = Magie ✨
            </div>
          </>
        ) : (
          <>
            <div style={{ fontSize: 70, marginBottom: 15 }}>🎙️ + 🤖</div>
            <div
              style={{
                fontSize: 36,
                fontWeight: 800,
                color: 'white',
                marginBottom: 15,
              }}
            >
              ElevenLabs + HeyGen
            </div>
            <div style={{ fontSize: 22, color: 'rgba(255,255,255,0.7)' }}>
              Voix clonée • Avatar synchronisé
            </div>
          </>
        )}
      </div>
    </AbsoluteFill>
  );
};

// Doc to Video explanation
const DocExplanation: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const spring1 = spring({ frame, fps, config: { damping: 12 } });
  const spring2 = spring({ frame: frame - 15, fps, config: { damping: 12 } });

  return (
    <AbsoluteFill
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        background: 'rgba(0, 0, 0, 0.85)',
      }}
    >
      <div style={{ textAlign: 'center', transform: `scale(${spring1})`, padding: 40 }}>
        <div style={{ fontSize: 90, marginBottom: 25 }}>📄 → 🎬</div>
        <div
          style={{
            fontSize: 44,
            fontWeight: 800,
            color: 'white',
            marginBottom: 25,
          }}
        >
          Documentation → Vidéo
        </div>
        <div
          style={{
            fontSize: 28,
            color: 'rgba(255, 255, 255, 0.85)',
            maxWidth: 850,
            lineHeight: 1.6,
            opacity: spring2,
          }}
        >
          Sur base d'une simple documentation technique d'une app développée précédemment,
          <span style={{ color: '#6366f1', fontWeight: 700 }}> Claude Code </span>
          génère automatiquement un workflow animé
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Chat Exchange - Shows conversation with Claude Code
const ChatExchange: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const messages = [
    { role: 'user', text: "Remplace la vidéo UVCW par celle-ci et mets-la en plein écran", delay: 0 },
    { role: 'claude', text: "C'est fait ! J'ai mis la vidéo en fullscreen et mis à jour les timings.", delay: 30 },
    { role: 'user', text: "Ajoute une slide qui montre nos échanges style chat", delay: 60 },
    { role: 'claude', text: "J'ai créé le composant ChatExchange avec une animation de messages.", delay: 90 },
    { role: 'user', text: "La musique doit aller jusqu'au bout", delay: 120 },
    { role: 'claude', text: "Musique de fond prolongée jusqu'à la fin de la vidéo ✓", delay: 150 },
  ];

  return (
    <AbsoluteFill
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
      }}
    >
      {/* Header */}
      <div
        style={{
          position: 'absolute',
          top: 40,
          left: '50%',
          transform: 'translateX(-50%)',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            fontSize: 28,
            fontWeight: 800,
            color: 'white',
            opacity: spring({ frame, fps }),
          }}
        >
          🤖 Comment j'ai créé tout ça ?
        </div>
        <div
          style={{
            fontSize: 18,
            color: '#6366f1',
            marginTop: 8,
            opacity: spring({ frame: frame - 10, fps }),
          }}
        >
          En discutant avec Claude Code
        </div>
      </div>

      {/* Chat container */}
      <div
        style={{
          width: 800,
          maxHeight: 700,
          marginTop: 60,
          display: 'flex',
          flexDirection: 'column',
          gap: 15,
        }}
      >
        {messages.map((msg, i) => {
          const msgSpring = spring({
            frame: frame - msg.delay,
            fps,
            config: { damping: 12 },
          });
          const isUser = msg.role === 'user';

          return (
            <div
              key={i}
              style={{
                display: 'flex',
                justifyContent: isUser ? 'flex-end' : 'flex-start',
                transform: `translateY(${(1 - msgSpring) * 30}px)`,
                opacity: msgSpring,
              }}
            >
              <div
                style={{
                  maxWidth: '75%',
                  padding: '14px 20px',
                  borderRadius: isUser ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                  background: isUser
                    ? 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)'
                    : 'rgba(255, 255, 255, 0.1)',
                  border: isUser ? 'none' : '1px solid rgba(255, 255, 255, 0.2)',
                }}
              >
                <div
                  style={{
                    fontSize: 11,
                    color: isUser ? 'rgba(255,255,255,0.7)' : '#6366f1',
                    marginBottom: 6,
                    fontWeight: 600,
                  }}
                >
                  {isUser ? '👤 Moi' : '🤖 Claude Code'}
                </div>
                <div
                  style={{
                    fontSize: 16,
                    color: 'white',
                    lineHeight: 1.4,
                  }}
                >
                  {msg.text}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer note */}
      <div
        style={{
          position: 'absolute',
          bottom: 40,
          fontSize: 20,
          color: 'rgba(255, 255, 255, 0.6)',
          textAlign: 'center',
          opacity: spring({ frame: frame - 180, fps }),
        }}
      >
        <span style={{ color: '#10b981', fontWeight: 700 }}>0 ligne de code</span> écrite manuellement
      </div>
    </AbsoluteFill>
  );
};

// INTRO Scene - Simplified with tool logos
const IntroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const tools = [
    { name: 'Claude Code', icon: '🤖', color: '#6366f1' },
    { name: 'Skills.sh', icon: '⚡', color: '#f59e0b' },
    { name: 'Remotion', icon: '🎬', color: '#10b981' },
    { name: 'ElevenLabs', icon: '🎙️', color: '#8b5cf6' },
    { name: 'HeyGen', icon: '👤', color: '#ec4899' },
  ];

  return (
    <AbsoluteFill
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        {/* Main tools display */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 20,
            justifyContent: 'center',
            maxWidth: 900,
          }}
        >
          {tools.map((tool, i) => {
            const toolSpring = spring({
              frame: frame - i * 8,
              fps,
              config: { damping: 12 },
            });

            return (
              <div
                key={tool.name}
                style={{
                  background: `linear-gradient(135deg, ${tool.color}20 0%, ${tool.color}10 100%)`,
                  border: `2px solid ${tool.color}50`,
                  borderRadius: 16,
                  padding: '20px 30px',
                  transform: `scale(${toolSpring}) translateY(${(1 - toolSpring) * 30}px)`,
                  opacity: toolSpring,
                }}
              >
                <div style={{ fontSize: 50, marginBottom: 8 }}>{tool.icon}</div>
                <div
                  style={{
                    fontSize: 20,
                    fontWeight: 700,
                    color: 'white',
                  }}
                >
                  {tool.name}
                </div>
              </div>
            );
          })}
        </div>

        {/* Tagline */}
        <div
          style={{
            marginTop: 50,
            fontSize: 28,
            color: 'rgba(255, 255, 255, 0.6)',
            transform: `translateY(${(1 - spring({ frame: frame - 50, fps })) * 20}px)`,
            opacity: spring({ frame: frame - 50, fps }),
          }}
        >
          = Création vidéo automatisée 🚀
        </div>
      </div>
    </AbsoluteFill>
  );
};

// OUTRO Scene - GitHub Repo
const OutroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const mainSpring = spring({ frame, fps, config: { damping: 12 } });
  const repoSpring = spring({ frame: frame - 10, fps, config: { damping: 15 } });
  const urlSpring = spring({ frame: frame - 30, fps, config: { damping: 12 } });

  return (
    <AbsoluteFill
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        {/* GitHub Icon */}
        <div
          style={{
            fontSize: 80,
            marginBottom: 25,
            transform: `scale(${mainSpring})`,
          }}
        >
          📂
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: 36,
            fontWeight: 800,
            color: 'white',
            marginBottom: 30,
            transform: `scale(${mainSpring})`,
          }}
        >
          Code source disponible
        </div>

        {/* Fake GitHub Repo Card */}
        <div
          style={{
            background: '#0d1117',
            border: '1px solid #30363d',
            borderRadius: 12,
            padding: '25px 35px',
            maxWidth: 500,
            textAlign: 'left',
            transform: `scale(${repoSpring}) translateY(${(1 - repoSpring) * 20}px)`,
            opacity: repoSpring,
            boxShadow: '0 15px 40px rgba(0, 0, 0, 0.4)',
          }}
        >
          {/* Repo header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 15 }}>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 20,
              }}
            >
              👤
            </div>
            <div>
              <div style={{ fontSize: 14, color: '#8b949e' }}>kikounicou</div>
              <div style={{ fontSize: 22, fontWeight: 700, color: '#58a6ff' }}>remotion</div>
            </div>
          </div>

          {/* Description */}
          <div style={{ fontSize: 16, color: '#c9d1d9', marginBottom: 15, lineHeight: 1.4 }}>
            Projet Remotion + Claude Code + Skills.sh
          </div>

          {/* Tags */}
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {['TypeScript', 'React', 'Remotion', 'AI'].map((tag) => (
              <div
                key={tag}
                style={{
                  background: '#21262d',
                  padding: '4px 12px',
                  borderRadius: 20,
                  fontSize: 12,
                  color: '#8b949e',
                }}
              >
                {tag}
              </div>
            ))}
          </div>
        </div>

        {/* URL */}
        <div
          style={{
            marginTop: 30,
            fontSize: 20,
            color: '#58a6ff',
            fontFamily: 'monospace',
            transform: `translateY(${(1 - urlSpring) * 15}px)`,
            opacity: urlSpring,
          }}
        >
          github.com/kikounicou/remotion
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Dynamic background music with volume ducking
const BackgroundMusic: React.FC = () => {
  const frame = useCurrentFrame();
  const volume = getBackgroundMusicVolume(frame);

  return (
    <Audio
      src={staticFile('sounds/music/corporate/professional.mp3')}
      volume={volume}
    />
  );
};

// ============================================================================
// MAIN COMPOSITION
// ============================================================================

export const LinkedInShowcaseV2: React.FC = () => {
  return (
    <AbsoluteFill style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
      <AnimatedBackground />
      <Particles />

      {/* ===== INTRO ===== */}
      <Sequence from={0} durationInFrames={150}>
        <IntroScene />
      </Sequence>

      {/* ===== CHAPTER 1: BASICS ===== */}
      <Sequence from={150} durationInFrames={50}>
        <ChapterCard number={1} title="Les Bases" emoji="🎬" subtitle="Animations Spring" />
      </Sequence>
      <Sequence from={200} durationInFrames={190}>
        <VideoFrame videoSrc="01-HelloWorld.mp4" label="Animations Spring" highlight="useCurrentFrame()" />
      </Sequence>

      {/* ===== CHAPTER 2: VISUALS ===== */}
      <Sequence from={390} durationInFrames={50}>
        <ChapterCard number={2} title="Effets Visuels" emoji="✨" subtitle="Ken Burns & Texte" />
      </Sequence>
      <Sequence from={440} durationInFrames={170}>
        <VideoFrame videoSrc="02-ImageShowcase.mp4" label="Ken Burns Effect" highlight="Zoom & Pan" />
      </Sequence>
      <Sequence from={610} durationInFrames={170}>
        <VideoFrame videoSrc="03-WordByWord.mp4" label="Texte Style TikTok" />
      </Sequence>

      {/* ===== CHAPTER 3: BRANDING ===== */}
      <Sequence from={780} durationInFrames={50}>
        <ChapterCard number={3} title="Branding Pro" emoji="💼" subtitle="Templates Broadcast" />
      </Sequence>
      <Sequence from={830} durationInFrames={140}>
        <VideoFrame videoSrc="04-LowerThirds.mp4" label="Bandeaux Broadcast" />
      </Sequence>
      <Sequence from={970} durationInFrames={140}>
        <VideoFrame videoSrc="05-AnimatedStats.mp4" label="Infographies" highlight="Data Viz" />
      </Sequence>

      {/* ===== CHAPTER 4: UVCW / JSON → VIDEO ===== */}
      <Sequence from={1110} durationInFrames={50}>
        <ChapterCard number={4} title="JSON → Vidéo" emoji="🚀" subtitle="Automatisation" />
      </Sequence>
      <Sequence from={1160} durationInFrames={100}>
        <JsonAnimation />
      </Sequence>
      <Sequence from={1260} durationInFrames={180}>
        <VideoFrame videoSrc="UVCW-ArticleVideo-9653.mp4" label="Template UVCW" highlight="46 matières" fullscreen />
      </Sequence>
      <Sequence from={1440} durationInFrames={600}>
        <VideoFrame
          videoSrc="07-UVCW-Ultimate-Social.mp4"
          label="Format Social 1:1"
          sublabel="Test : ajout de sons SFX (whoosh, transitions)"
          fullscreen
        />
      </Sequence>

      {/* ===== CHAPTER 5: DOCS → VIDEO ===== */}
      <Sequence from={2040} durationInFrames={50}>
        <ChapterCard number={5} title="Doc → Vidéo" emoji="📚" subtitle="Auto-génération" />
      </Sequence>
      <Sequence from={2090} durationInFrames={160}>
        <DocExplanation />
      </Sequence>
      <Sequence from={2250} durationInFrames={400}>
        <VideoFrame
          videoSrc="08-EvalFlow.mp4"
          label="Workflow Animé"
          highlight="Auto-généré"
          sublabel="Basé sur documentation technique existante"
          fullscreen
        />
      </Sequence>

      {/* ===== CHAPTER 6: AVATAR IA ===== */}
      <Sequence from={2650} durationInFrames={50}>
        <ChapterCard number={6} title="Avatar IA" emoji="🤖" subtitle="La Cerise" />
      </Sequence>
      <Sequence from={2700} durationInFrames={80}>
        <SkillsHighlight />
      </Sequence>
      <Sequence from={2780} durationInFrames={60}>
        <AiAvatarExplanation />
      </Sequence>
      <Sequence from={2840} durationInFrames={280}>
        <VideoFrame videoSrc="09-Tutorial-PEB-August.mp4" label="Avatar August" highlight="HeyGen" />
      </Sequence>
      <Sequence from={3120} durationInFrames={150}>
        <AiAvatarExplanation isPersonal />
      </Sequence>
      <Sequence from={3270} durationInFrames={310}>
        <VideoFrame
          videoSrc="10-Tutorial-PEB-PRO.mp4"
          label="Mon Avatar IA (au saut du lit)"
          highlight="100% généré"
          sublabel="Ce n'est PAS moi qui parle !"
          fadeOutAudio={60}
          durationInFrames={310}
        />
      </Sequence>

      {/* ===== CHAT EXCHANGE - How I built this ===== */}
      <Sequence from={3580} durationInFrames={240}>
        <ChatExchange />
      </Sequence>

      {/* ===== OUTRO ===== */}
      <Sequence from={3820} durationInFrames={270}>
        <OutroScene />
      </Sequence>

      {/* Progress bar always visible */}
      <ProgressBar />

      {/* Background music with dynamic ducking */}
      <BackgroundMusic />
    </AbsoluteFill>
  );
};

export const LINKEDIN_SHOWCASE_V2_DURATION = TOTAL_DURATION;
