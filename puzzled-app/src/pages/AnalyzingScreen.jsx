import { useEffect, useState } from 'react';

// Four interlocking puzzle piece paths, each ~60x60, designed to snap together into a 2x2
const PIECE_PATHS = {
  // top-left: right tab out, bottom tab out
  tl: 'M0,0 L40,0 L40,24 C50,24 50,36 40,36 L40,60 L24,60 C24,70 36,70 36,60 L0,60 Z',
  // top-right: left notch, bottom tab out
  tr: 'M0,0 L60,0 L60,60 L36,60 C36,70 24,70 24,60 L0,60 L0,36 C10,36 10,24 0,24 Z',
  // bottom-left: top notch, right tab out
  bl: 'M0,0 L24,0 C24,-10 36,-10 36,0 L60,0 L60,24 C70,24 70,36 60,36 L60,60 L0,60 Z',
  // bottom-right: top notch, left notch
  br: 'M0,0 L60,0 L60,60 L0,60 L0,36 C-10,36 -10,24 0,24 L0,0 M36,0 C36,-10 24,-10 24,0',
};

export default function AnalyzingScreen({ projectName, onDone }) {
  const [phase, setPhase] = useState('flying'); // flying → assembling → done

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('assembling'), 800);
    const t2 = setTimeout(() => setPhase('done'), 1800);
    const t3 = setTimeout(() => onDone(), 2600);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onDone]);

  return (
    <div className="min-h-screen bg-pearl flex flex-col items-center justify-center gap-10">
      {/* Puzzle animation */}
      <div className="relative w-32 h-32" style={{ perspective: 400 }}>
        <PuzzleAssembly phase={phase} />
      </div>

      {/* Text */}
      <div className="text-center space-y-2">
        <p
          className="text-washed-black"
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 500,
            fontSize: 28,
            letterSpacing: '-0.3px',
          }}
        >
          Analyzing your project
        </p>
        {projectName && (
          <p className="text-sm text-dim-grey">"{projectName}"</p>
        )}
      </div>

      {/* Progress dots */}
      <ProgressDots phase={phase} />
    </div>
  );
}

function PuzzleAssembly({ phase }) {
  // Each piece starts offset and flies toward the center
  const pieces = [
    {
      key: 'tl',
      color: '#D97757',
      // translate offsets for each phase
      fly: 'translate(-48px, -48px) scale(0.7)',
      assemble: 'translate(-1px, -1px) scale(1)',
      done: 'translate(-1px, -1px) scale(1)',
      path: 'M0,0 L30,0 L30,18 C37,18 37,27 30,27 L30,44 L18,44 C18,52 27,52 27,44 L0,44 Z',
      vbox: '0 0 40 52',
    },
    {
      key: 'tr',
      color: '#7C3AED',
      fly: 'translate(48px, -48px) scale(0.7)',
      assemble: 'translate(44px, -1px) scale(1)',
      done: 'translate(44px, -1px) scale(1)',
      path: 'M0,0 L44,0 L44,44 L27,44 C27,52 18,52 18,44 L0,44 L0,27 C7,27 7,18 0,18 Z',
      vbox: '0 0 44 52',
    },
    {
      key: 'bl',
      color: '#4285F4',
      fly: 'translate(-48px, 48px) scale(0.7)',
      assemble: 'translate(-1px, 44px) scale(1)',
      done: 'translate(-1px, 44px) scale(1)',
      path: 'M0,0 L18,0 C18,-8 27,-8 27,0 L44,0 L44,18 C52,18 52,27 44,27 L44,44 L0,44 Z',
      vbox: '0 -8 52 52',
    },
    {
      key: 'br',
      color: '#15C39A',
      fly: 'translate(48px, 48px) scale(0.7)',
      assemble: 'translate(44px, 44px) scale(1)',
      done: 'translate(44px, 44px) scale(1)',
      path: 'M0,0 L44,0 L44,44 L0,44 L0,27 C-8,27 -8,18 0,18 Z M27,0 C27,-8 18,-8 18,0',
      vbox: '-8 -8 52 52',
    },
  ];

  const getTransform = (piece) => {
    if (phase === 'flying') return piece.fly;
    return piece.assemble;
  };

  return (
    <div className="relative w-32 h-32">
      {pieces.map((piece) => (
        <div
          key={piece.key}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            transform: getTransform(piece),
            transition: phase === 'flying'
              ? 'none'
              : 'transform 0.5s cubic-bezier(0.19,1,0.22,1)',
            opacity: phase === 'done' ? 1 : phase === 'assembling' ? 1 : 0.85,
          }}
        >
          <svg
            width={52}
            height={60}
            viewBox={piece.vbox}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d={piece.path}
              fill={phase === 'done' ? piece.color : piece.color + 'bb'}
              style={{ transition: 'fill 0.3s ease' }}
            />
          </svg>
        </div>
      ))}

      {/* Gold flash on done */}
      {phase === 'done' && (
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ animation: 'fadeOut 0.6s ease 0.3s forwards', opacity: 1 }}
        >
          <span style={{ fontSize: 20, opacity: 0.9 }}>✦</span>
        </div>
      )}

      <style>{`
        @keyframes fadeOut {
          0% { opacity: 1; transform: scale(1); }
          100% { opacity: 0; transform: scale(2); }
        }
      `}</style>
    </div>
  );
}

function ProgressDots({ phase }) {
  const steps = [
    { label: 'Reading your project', done: phase !== 'flying' },
    { label: 'Matching AI tools', done: phase === 'done' },
    { label: 'Building your plan', done: false },
  ];

  return (
    <div className="space-y-2.5">
      {steps.map(({ label, done }, i) => {
        const active = (phase === 'flying' && i === 0) ||
                       (phase === 'assembling' && i === 1) ||
                       (phase === 'done' && i === 2);
        return (
          <div key={label} className="flex items-center gap-3">
            <div
              className="w-4 h-4 rounded-full flex items-center justify-center shrink-0"
              style={{
                background: done ? '#1a1a1a' : active ? '#ffba09' : '#d4d4d0',
                transition: 'background 0.3s ease',
              }}
            >
              {done && (
                <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                  <path d="M1 3L3 5L7 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
              {active && !done && (
                <div
                  className="w-1.5 h-1.5 rounded-full bg-ink-black"
                  style={{ animation: 'pulse 1s ease infinite' }}
                />
              )}
            </div>
            <span
              className="text-sm"
              style={{
                color: done ? '#1a1a1a' : active ? '#1a1a1a' : '#b3b3b3',
                fontWeight: active || done ? 500 : 400,
                transition: 'color 0.3s ease',
              }}
            >
              {label}
            </span>
          </div>
        );
      })}

      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.4); opacity: 0.7; }
        }
      `}</style>
    </div>
  );
}
