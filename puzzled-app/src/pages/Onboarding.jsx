import { useState } from 'react';
import { TOOLS } from '../data/tools';
import { PROJECTS } from '../data/projects';

const LEARNING_AREAS = [
  'Literature review & research',
  'Writing & editing',
  'Data analysis',
  'Coding & automation',
  'Presentation & visuals',
  'Note-taking & organization',
];

const BUDGET_OPTIONS = [
  { label: 'Free only', desc: 'I can only use free tools' },
  { label: 'Freemium', desc: 'Free with some paid features is fine' },
  { label: 'Paid', desc: 'I have a budget for tools' },
];

const EXISTING_TOOLS = TOOLS.map(t => ({ id: t.id, name: t.name, logo: t.logo }));

export default function Onboarding({ onComplete }) {
  const [step, setStep] = useState(0);
  const [existingTools, setExistingTools] = useState([]);
  const [learningArea, setLearningArea] = useState('');
  const [budget, setBudget] = useState('');
  const [projectName, setProjectName] = useState('');
  const [projectDesc, setProjectDesc] = useState('');

  const canAdvance = [
    true, // step 0: tools (optional)
    !!learningArea,
    !!budget,
    !!projectName.trim(),
  ][step];

  const handleNext = () => {
    if (step < 3) {
      setStep(s => s + 1);
    } else {
      // Build a project with recommended tools
      const newProject = {
        id: 'project-new-' + Date.now(),
        name: projectName.trim(),
        description: projectDesc.trim() || 'My research project.',
        pieces: PROJECTS[0].pieces.map(p => ({
          ...p,
          status: 'locked',
          reflection: null,
        })),
      };
      onComplete(newProject);
    }
  };

  const toggleTool = (id) => {
    setExistingTools(prev =>
      prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-pearl flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">
        {/* Progress bars */}
        <div className="flex gap-1.5 mb-10">
          {[0, 1, 2, 3].map(i => (
            <div
              key={i}
              className="flex-1 h-0.5 rounded-full transition-all duration-300"
              style={{ background: i <= step ? '#1a1a1a' : '#f0f0ec' }}
            />
          ))}
        </div>

        {/* Card */}
        <div
          className="bg-pure-white rounded-card p-10"
          style={{ boxShadow: 'rgba(0,0,0,0.06) 0px 0px 0px 1px inset' }}
        >
          {step === 0 && (
            <StepTools selected={existingTools} onToggle={toggleTool} />
          )}
          {step === 1 && (
            <StepLearning selected={learningArea} onSelect={setLearningArea} />
          )}
          {step === 2 && (
            <StepBudget selected={budget} onSelect={setBudget} />
          )}
          {step === 3 && (
            <StepProject
              name={projectName}
              desc={projectDesc}
              onNameChange={setProjectName}
              onDescChange={setProjectDesc}
            />
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-10 pt-6 border-t border-beige">
            <button
              onClick={() => step > 0 ? setStep(s => s - 1) : null}
              className={`text-sm font-medium text-dim-grey hover:text-washed-black transition-colors ${step === 0 ? 'invisible' : ''}`}
            >
              ← Back
            </button>

            <div className="flex items-center gap-3">
              {step === 0 && (
                <button
                  onClick={handleNext}
                  className="text-sm font-medium text-dim-grey hover:text-washed-black transition-colors"
                >
                  Skip
                </button>
              )}
              <button
                onClick={handleNext}
                disabled={!canAdvance}
                className="py-2.5 px-6 rounded-button bg-energy-gold hover:bg-deep-amber disabled:opacity-40 disabled:cursor-not-allowed text-ink-black text-sm font-semibold transition-colors"
              >
                {step === 3 ? 'Build my puzzle →' : 'Next →'}
              </button>
            </div>
          </div>
        </div>

        {/* Step label */}
        <p className="text-center text-xs text-silver-mist mt-4">
          Step {step + 1} of 4
        </p>
      </div>
    </div>
  );
}

function StepTools({ selected, onToggle }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-widest text-dim-grey mb-2">Step 1</p>
      <h2
        className="text-washed-black mb-2"
        style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 32, lineHeight: 1.1 }}
      >
        Which tools do you already use?
      </h2>
      <p className="text-sm text-dim-grey mb-8">Select all that apply — we'll skip what you know.</p>

      <div className="grid grid-cols-2 gap-2">
        {EXISTING_TOOLS.map(({ id, name, logo }) => (
          <button
            key={id}
            onClick={() => onToggle(id)}
            className={`flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${
              selected.includes(id)
                ? 'border-washed-black bg-beige'
                : 'border-concrete hover:border-dim-grey'
            }`}
          >
            <span className="text-xl">{logo}</span>
            <span className="text-sm font-medium text-washed-black">{name}</span>
            {selected.includes(id) && (
              <span className="ml-auto text-washed-black text-sm">✓</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

function StepLearning({ selected, onSelect }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-widest text-dim-grey mb-2">Step 2</p>
      <h2
        className="text-washed-black mb-2"
        style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 32, lineHeight: 1.1 }}
      >
        What do you want to get better at?
      </h2>
      <p className="text-sm text-dim-grey mb-8">Choose the area where AI could help most.</p>

      <div className="space-y-2">
        {LEARNING_AREAS.map(area => (
          <button
            key={area}
            onClick={() => onSelect(area)}
            className={`w-full flex items-center justify-between p-4 rounded-xl border text-left transition-all ${
              selected === area
                ? 'border-washed-black bg-beige'
                : 'border-concrete hover:border-dim-grey'
            }`}
          >
            <span className="text-sm font-medium text-washed-black">{area}</span>
            {selected === area && <span className="text-sm text-washed-black">✓</span>}
          </button>
        ))}
      </div>
    </div>
  );
}

function StepBudget({ selected, onSelect }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-widest text-dim-grey mb-2">Step 3</p>
      <h2
        className="text-washed-black mb-2"
        style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 32, lineHeight: 1.1 }}
      >
        What's your budget?
      </h2>
      <p className="text-sm text-dim-grey mb-8">We'll match tools to what works for you financially.</p>

      <div className="space-y-3">
        {BUDGET_OPTIONS.map(({ label, desc }) => (
          <button
            key={label}
            onClick={() => onSelect(label)}
            className={`w-full flex items-start justify-between p-5 rounded-xl border text-left transition-all ${
              selected === label
                ? 'border-washed-black bg-beige'
                : 'border-concrete hover:border-dim-grey'
            }`}
          >
            <div>
              <div className="text-sm font-semibold text-washed-black">{label}</div>
              <div className="text-xs text-dim-grey mt-0.5">{desc}</div>
            </div>
            {selected === label && <span className="text-sm text-washed-black mt-0.5">✓</span>}
          </button>
        ))}
      </div>
    </div>
  );
}

function StepProject({ name, desc, onNameChange, onDescChange }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-widest text-dim-grey mb-2">Step 4</p>
      <h2
        className="text-washed-black mb-2"
        style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 32, lineHeight: 1.1 }}
      >
        Tell me about your project.
      </h2>
      <p className="text-sm text-dim-grey mb-8">The more specific you are, the better the match.</p>

      <div className="space-y-4">
        <div>
          <label className="text-xs font-semibold uppercase tracking-widest text-dim-grey block mb-2">
            Project name
          </label>
          <input
            type="text"
            value={name}
            onChange={e => onNameChange(e.target.value)}
            placeholder="e.g. Master's thesis on civic tech adoption"
            className="w-full bg-beige border border-concrete rounded-input px-4 py-3 text-sm text-washed-black placeholder-silver-mist focus:outline-none focus:border-washed-black transition-colors"
          />
        </div>
        <div>
          <label className="text-xs font-semibold uppercase tracking-widest text-dim-grey block mb-2">
            Brief description <span className="font-normal normal-case">(optional)</span>
          </label>
          <textarea
            value={desc}
            onChange={e => onDescChange(e.target.value)}
            placeholder="What are you trying to accomplish? What methods are you using?"
            rows={3}
            className="w-full bg-beige border border-concrete rounded-input px-4 py-3 text-sm text-washed-black placeholder-silver-mist focus:outline-none focus:border-washed-black transition-colors resize-none"
          />
        </div>

        {/* Preview metrics */}
        <div
          className="p-4 rounded-xl bg-pearl"
          style={{ borderRadius: 16 }}
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-dim-grey mb-3">
            What we'll track for you
          </p>
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: '🧩', label: 'Pieces unlocked' },
              { icon: '⭐', label: 'Avg benefit score' },
              { icon: '🔄', label: 'Tool reuse rate' },
              { icon: '⚡', label: 'Friction score' },
            ].map(({ icon, label }) => (
              <div key={label} className="flex items-center gap-2">
                <span className="text-sm">{icon}</span>
                <span className="text-xs text-dim-grey">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
