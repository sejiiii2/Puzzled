import { useState } from 'react';

export default function ReflectionModal({ tool, onClose, onSubmit }) {
  const [step, setStep] = useState(0);
  const [benefitScore, setBenefitScore] = useState(null);
  const [frictionScore, setFrictionScore] = useState(null);
  const [reuse, setReuse] = useState(null);
  const [note, setNote] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!benefitScore || !frictionScore || !reuse) return;
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 400));
    onSubmit({ benefitScore, frictionScore, reuse, note: note.trim() || null });
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4 animate-fade-in">
        <div
          className="w-full max-w-lg bg-pure-white rounded-card p-8 relative"
          style={{ boxShadow: 'rgba(0,0,0,0.08) 0px 24px 64px 0px', borderRadius: 24 }}
        >
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center rounded-full text-dim-grey hover:bg-beige transition-all"
          >
            ✕
          </button>

          {/* Tool header */}
          <div className="flex items-center gap-3 mb-8">
            <div
              className="w-10 h-10 rounded-logo flex items-center justify-center text-xl"
              style={{ background: tool.brandColor + '20' }}
            >
              {tool.logo}
            </div>
            <div>
              <p className="text-xs text-dim-grey font-medium uppercase tracking-wide mb-0.5">Reflection</p>
              <p className="text-base font-semibold text-washed-black">{tool.name}</p>
            </div>
          </div>

          <div className="space-y-8">
            {/* Q1: Benefit score */}
            <div>
              <p className="text-sm font-semibold text-washed-black mb-4">
                How much did {tool.name} benefit your work?
              </p>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map(n => (
                  <button
                    key={n}
                    onClick={() => setBenefitScore(n)}
                    className={`flex-1 py-3 rounded-input text-sm font-semibold transition-all ${
                      benefitScore === n
                        ? 'bg-washed-black text-white'
                        : 'bg-beige text-dim-grey hover:bg-concrete'
                    }`}
                  >
                    {n}
                  </button>
                ))}
              </div>
              <div className="flex justify-between mt-1.5 px-0.5">
                <span className="text-xs text-silver-mist">Not much</span>
                <span className="text-xs text-silver-mist">A lot</span>
              </div>
            </div>

            {/* Q2: Friction score */}
            <div>
              <p className="text-sm font-semibold text-washed-black mb-4">
                How much friction did you run into?
              </p>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map(n => (
                  <button
                    key={n}
                    onClick={() => setFrictionScore(n)}
                    className={`flex-1 py-3 rounded-input text-sm font-semibold transition-all ${
                      frictionScore === n
                        ? 'bg-washed-black text-white'
                        : 'bg-beige text-dim-grey hover:bg-concrete'
                    }`}
                  >
                    {n}
                  </button>
                ))}
              </div>
              <div className="flex justify-between mt-1.5 px-0.5">
                <span className="text-xs text-silver-mist">Very smooth</span>
                <span className="text-xs text-silver-mist">Very hard</span>
              </div>
            </div>

            {/* Q3: Reuse */}
            <div>
              <p className="text-sm font-semibold text-washed-black mb-4">
                Would you use {tool.name} again for this kind of work?
              </p>
              <div className="flex gap-2">
                {['Yes', 'Maybe', 'No'].map(opt => (
                  <button
                    key={opt}
                    onClick={() => setReuse(opt)}
                    className={`flex-1 py-3 rounded-button text-sm font-semibold transition-all border ${
                      reuse === opt
                        ? opt === 'Yes'
                          ? 'bg-valid-green text-white border-valid-green'
                          : opt === 'No'
                          ? 'bg-coral-red text-white border-coral-red'
                          : 'bg-energy-gold text-ink-black border-energy-gold'
                        : 'bg-transparent text-dim-grey border-concrete hover:border-washed-black hover:text-washed-black'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Optional note */}
            <div>
              <label className="text-sm font-medium text-dim-grey block mb-2">
                One sentence note <span className="font-normal">(optional)</span>
              </label>
              <input
                type="text"
                value={note}
                onChange={e => setNote(e.target.value)}
                placeholder="What stood out?"
                maxLength={120}
                className="w-full bg-beige border border-concrete rounded-input px-4 py-3 text-sm text-washed-black placeholder-silver-mist focus:outline-none focus:border-washed-black transition-colors"
              />
            </div>
          </div>

          {/* Submit */}
          <div className="mt-8 flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-3 px-6 rounded-button text-sm font-medium text-washed-black border border-concrete hover:border-washed-black hover:bg-beige transition-all"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={!benefitScore || !frictionScore || !reuse || submitting}
              className="flex-2 flex-grow py-3 px-8 rounded-button text-sm font-semibold text-ink-black bg-energy-gold hover:bg-deep-amber disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              {submitting ? 'Snapping in…' : 'Snap it in ✦'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
