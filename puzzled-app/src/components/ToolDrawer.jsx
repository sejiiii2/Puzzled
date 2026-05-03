import { useEffect } from 'react';

export default function ToolDrawer({ tool, piece, onClose, onStartReflection }) {
  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  if (!tool) return null;

  const isUnlocked = piece?.status === 'unlocked';

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/30 z-40 animate-fade-in"
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-pure-white flex flex-col animate-slide-in-right"
        style={{ boxShadow: 'rgba(0,0,0,0.12) -4px 0px 24px 0px', borderRadius: '24px 0 0 24px' }}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-8 pb-6 border-b border-beige">
          <div className="flex items-center gap-4">
            <div
              className="w-14 h-14 rounded-logo flex items-center justify-center text-3xl"
              style={{ background: tool.brandColor + '20' }}
            >
              {tool.logo}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h2 className="font-ui text-lg font-semibold text-washed-black">{tool.name}</h2>
                <span
                  className="text-xs font-semibold uppercase tracking-wide px-2 py-0.5 rounded-tag"
                  style={
                    isUnlocked
                      ? { background: '#1a1a1a', color: '#fff' }
                      : { background: '#f0f0ec', color: '#6d6868' }
                  }
                >
                  {isUnlocked ? 'Done' : 'Try'}
                </span>
              </div>
              <p className="text-xs text-dim-grey font-medium uppercase tracking-wide">
                {tool.category} · {tool.pricing}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full text-dim-grey hover:text-washed-black hover:bg-beige transition-all text-lg"
          >
            ✕
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto p-8 space-y-6">
          {/* Description */}
          <div>
            <p className="text-sm text-washed-black leading-relaxed">{tool.description}</p>
          </div>

          {/* Why it fits */}
          <div className="bg-pearl rounded-card p-6" style={{ borderRadius: 16 }}>
            <p className="text-xs font-semibold uppercase tracking-widest text-dim-grey mb-3">
              Why it fits your project
            </p>
            <p className="text-sm text-washed-black leading-relaxed">{tool.whyItFits}</p>
          </div>

          {/* Starter challenge */}
          <div
            className="p-6 rounded-card border"
            style={{ borderRadius: 16, border: '1.5px solid #d4d4d0' }}
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-dim-grey mb-3">
              Starter challenge
            </p>
            <p className="text-sm text-washed-black leading-relaxed">{tool.starterChallenge}</p>
          </div>

          {/* Reflection (if done) */}
          {isUnlocked && piece?.reflection && (
            <div
              className="p-6 rounded-card"
              style={{ borderRadius: 16, background: tool.brandColor + '12' }}
            >
              <p className="text-xs font-semibold uppercase tracking-widest text-dim-grey mb-4">
                Your reflection
              </p>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-dim-grey">Benefit</span>
                  <DotScale value={piece.reflection.benefitScore} color="#0ea5e9" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-dim-grey">Friction</span>
                  <DotScale value={piece.reflection.frictionScore} color="#ff4d4d" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-dim-grey">Use again?</span>
                  <ReuseBadge value={piece.reflection.reuse} />
                </div>
                {piece.reflection.note && (
                  <p className="text-sm text-washed-black italic mt-2 pt-3 border-t border-concrete">
                    "{piece.reflection.note}"
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="p-8 pt-4 space-y-3 border-t border-beige">
          <a
            href={tool.url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-button font-ui text-sm font-semibold text-ink-black bg-energy-gold hover:bg-deep-amber transition-colors"
          >
            Try {tool.name} ↗
          </a>
          {!isUnlocked && (
            <button
              onClick={onStartReflection}
              className="w-full flex items-center justify-center py-3 px-6 rounded-button font-ui text-sm font-medium text-washed-black border border-washed-black hover:bg-beige transition-colors"
            >
              I've tried it — reflect
            </button>
          )}
        </div>
      </div>
    </>
  );
}

function DotScale({ value, color }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="w-2.5 h-2.5 rounded-full"
          style={{ background: i < value ? color : '#d4d4d0' }}
        />
      ))}
    </div>
  );
}

function ReuseBadge({ value }) {
  const styles = {
    Yes: { bg: '#00c45420', text: '#00c454', label: 'Yes' },
    Maybe: { bg: '#ffba0920', text: '#d48f00', label: 'Maybe' },
    No: { bg: '#ff4d4d20', text: '#ff4d4d', label: 'No' },
  };
  const s = styles[value] || styles.Maybe;
  return (
    <span
      className="text-xs font-semibold px-2.5 py-0.5 rounded-tag"
      style={{ background: s.bg, color: s.text }}
    >
      {s.label}
    </span>
  );
}
