export default function Landing({ onNavigate }) {
  return (
    <div className="min-h-screen bg-pure-white">
      {/* Hero */}
      <div className="max-w-[1200px] mx-auto px-6 pt-24 pb-20">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left: Copy */}
          <div>
            <div className="inline-flex items-center gap-2 bg-beige px-3 py-1.5 rounded-tag text-xs font-semibold text-dim-grey uppercase tracking-wide mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-energy-gold" />
              For graduate students & researchers
            </div>

            <h1
              className="text-washed-black mb-6"
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 500,
                fontSize: 'clamp(40px, 5vw, 56px)',
                lineHeight: 1.09,
                letterSpacing: '-1px',
              }}
            >
              Find the AI tools that actually fit your project.
            </h1>

            <p className="text-dim-grey text-base leading-relaxed mb-10 max-w-md">
              Too many AI tools, no way to know which one fits right now.
              Puzzled matches tools to your specific project — then makes building your toolkit feel visual and earned.
            </p>

            <div className="flex gap-3 flex-wrap">
              <button
                onClick={() => onNavigate('onboarding')}
                className="py-3 px-7 rounded-button bg-energy-gold hover:bg-deep-amber text-ink-black text-sm font-semibold transition-colors"
              >
                Start your puzzle →
              </button>
              <button
                onClick={() => onNavigate('board')}
                className="py-3 px-7 rounded-button border border-washed-black text-washed-black text-sm font-medium hover:bg-beige transition-colors"
              >
                See an example
              </button>
            </div>

            {/* Stats row */}
            <div className="flex gap-8 mt-14 pt-8 border-t border-beige">
              {[
                { n: '10+', label: 'curated AI tools' },
                { n: '3 min', label: 'onboarding' },
                { n: '∞', label: 'reflections' },
              ].map(({ n, label }) => (
                <div key={label}>
                  <div className="text-xl font-semibold text-washed-black">{n}</div>
                  <div className="text-xs text-dim-grey mt-0.5">{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Puzzle preview mockup */}
          <div className="hidden md:flex items-center justify-center">
            <PuzzlePreview />
          </div>
        </div>
      </div>

      {/* Feature strip */}
      <div className="bg-pearl border-t border-b border-concrete">
        <div className="max-w-[1200px] mx-auto px-6 py-16 grid md:grid-cols-3 gap-10">
          {[
            {
              icon: '🧩',
              title: 'Match, don\'t browse',
              desc: 'Answer 4 questions about your project and get a personalized puzzle of the tools most likely to help — not a generic list.',
            },
            {
              icon: '🔬',
              title: 'Try with purpose',
              desc: 'Each piece comes with a starter challenge designed for your project type. No open-ended exploration — just a clear first step.',
            },
            {
              icon: '✦',
              title: 'Earn your toolkit',
              desc: 'Reflect after trying. Score benefit and friction. Snap the piece in. Your toolkit is built from real experience, not wishful thinking.',
            },
          ].map(({ icon, title, desc }) => (
            <div key={title}>
              <div className="text-2xl mb-4">{icon}</div>
              <h3 className="font-ui text-base font-semibold text-washed-black mb-2">{title}</h3>
              <p className="text-sm text-dim-grey leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA bottom */}
      <div className="max-w-[1200px] mx-auto px-6 py-24 text-center">
        <h2
          className="text-washed-black mb-4"
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 500,
            fontSize: 40,
            letterSpacing: '-0.5px',
            lineHeight: 1.1,
          }}
        >
          Your toolkit, earned piece by piece.
        </h2>
        <p className="text-dim-grey text-sm mb-8 max-w-sm mx-auto">
          Start with your current project and build from there.
        </p>
        <button
          onClick={() => onNavigate('onboarding')}
          className="py-3 px-8 rounded-button bg-energy-gold hover:bg-deep-amber text-ink-black text-sm font-semibold transition-colors"
        >
          Build my puzzle →
        </button>
      </div>
    </div>
  );
}

function PuzzlePreview() {
  const colors = ['#D97757', '#10A37F', '#4285F4', '#7C3AED', '#1FB8CD', '#6366F1'];
  const logos = ['🟠', '🟢', '📓', '🔬', '🔵', '⚡'];
  const statuses = ['unlocked', 'unlocked', 'unlocked', 'locked', 'locked', 'locked'];

  return (
    <div className="relative">
      <div
        className="bg-pearl rounded-card p-8 w-80"
        style={{ boxShadow: 'rgba(0,0,0,0.06) 0px 0px 0px 1px inset' }}
      >
        {/* mini progress */}
        <div className="flex items-center gap-2 mb-6">
          <span className="text-xs text-dim-grey font-medium">3 of 6 pieces</span>
          <div className="flex-1 h-1 bg-concrete rounded-full overflow-hidden">
            <div className="h-full w-1/2 bg-energy-gold rounded-full" />
          </div>
        </div>

        {/* Fake puzzle grid */}
        <div className="grid grid-cols-3 gap-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="aspect-square rounded-xl flex flex-col items-center justify-center gap-1 text-lg transition-all"
              style={{
                background: statuses[i] === 'unlocked' ? colors[i] + '30' : '#f0f0ec',
                border: statuses[i] === 'unlocked' ? `2px solid ${colors[i]}40` : '1.5px solid #d4d4d0',
              }}
            >
              <span style={{ opacity: statuses[i] === 'unlocked' ? 1 : 0.35, filter: statuses[i] === 'unlocked' ? 'none' : 'grayscale(100%)' }}>
                {logos[i]}
              </span>
              <span
                className="text-xs font-bold uppercase tracking-wide"
                style={{
                  fontSize: 9,
                  color: statuses[i] === 'unlocked' ? '#fff' : '#6d6868',
                  background: statuses[i] === 'unlocked' ? colors[i] : 'transparent',
                  padding: '1px 6px',
                  borderRadius: 9999,
                }}
              >
                {statuses[i] === 'unlocked' ? 'Done' : 'Try'}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-4 text-center">
          <span className="text-xs text-dim-grey">Master's thesis: civic tech adoption</span>
        </div>
      </div>
    </div>
  );
}
