import { useState, useRef } from 'react';
import { getToolById, TOOLS } from '../data/tools';
import { generateBreakdown, getAlternativeTools } from '../data/breakdown';

const STEP_TEMPLATES = [
  { id: 'lit-review',     name: 'Literature review',        icon: '📚' },
  { id: 'data-collection',name: 'Data collection',          icon: '🗂️' },
  { id: 'analysis',       name: 'Analysis & synthesis',     icon: '🔍' },
  { id: 'writing',        name: 'Writing & drafting',       icon: '✍️' },
  { id: 'editing',        name: 'Editing & polish',         icon: '✨' },
  { id: 'coding',         name: 'Coding & scripts',         icon: '💻' },
  { id: 'organization',   name: 'Notes & organization',     icon: '📝' },
  { id: 'presentation',   name: 'Presentation & visuals',   icon: '🎨' },
];

export default function ProjectBreakdown({ project, onConfirm, onBack }) {
  const [seed, setSeed] = useState(0);
  const [steps, setSteps] = useState(() =>
    generateBreakdown(project.name, project.description, 0)
  );
  const [swapMenu, setSwapMenu] = useState(null); // { stepIndex, toolIndex }
  const [addingStep, setAddingStep] = useState(false);
  const [regenerating, setRegenerating] = useState(false);
  const swapRef = useRef(null);

  const handleRegenerate = async () => {
    setRegenerating(true);
    await new Promise(r => setTimeout(r, 600));
    const newSeed = seed + 1;
    setSeed(newSeed);
    setSteps(generateBreakdown(project.name, project.description, newSeed));
    setRegenerating(false);
  };

  const handleRemoveStep = (index) => {
    setSteps(prev => prev.filter((_, i) => i !== index));
  };

  const handleSwapTool = (stepIndex, toolIndex, newToolId) => {
    setSteps(prev => prev.map((step, i) => {
      if (i !== stepIndex) return step;
      const newTools = [...step.tools];
      newTools[toolIndex] = newToolId;
      return { ...step, tools: newTools };
    }));
    setSwapMenu(null);
  };

  const handleRemoveTool = (stepIndex, toolIndex) => {
    setSteps(prev => prev.map((step, i) => {
      if (i !== stepIndex) return step;
      const newTools = step.tools.filter((_, ti) => ti !== toolIndex);
      return { ...step, tools: newTools };
    }));
  };

  const handleAddStep = (templateId) => {
    const template = STEP_TEMPLATES.find(t => t.id === templateId);
    if (!template) return;
    const existing = steps.find(s => s.id === templateId);
    if (existing) return;
    const newStep = generateBreakdown('', '', seed).find(s => s.id === templateId) || {
      id: template.id,
      name: template.name,
      description: '',
      icon: template.icon,
      tools: ['claude'],
    };
    setSteps(prev => [...prev, newStep]);
    setAddingStep(false);
  };

  const handleConfirm = () => {
    const toolIds = [...new Set(steps.flatMap(s => s.tools))];
    const pieces = toolIds.map(toolId => ({ toolId, status: 'locked', reflection: null }));
    const projectSteps = steps.map(s => ({
      id: s.id,
      name: s.name,
      icon: s.icon,
      toolIds: s.tools,
    }));
    onConfirm({ ...project, steps: projectSteps, pieces });
  };

  const availableToAdd = STEP_TEMPLATES.filter(t => !steps.find(s => s.id === t.id));

  return (
    <div className="min-h-screen bg-pearl" onClick={() => swapMenu && setSwapMenu(null)}>
      <div className="max-w-[680px] mx-auto px-6 py-14">

        {/* Header */}
        <div className="mb-10">
          <button
            onClick={onBack}
            className="text-sm text-dim-grey hover:text-washed-black transition-colors mb-6 flex items-center gap-1.5"
          >
            ← Back
          </button>
          <p className="text-xs font-semibold uppercase tracking-widest text-dim-grey mb-3">
            Project breakdown
          </p>
          <h1
            className="text-washed-black mb-3"
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 500,
              fontSize: 'clamp(28px, 4vw, 40px)',
              lineHeight: 1.1,
              letterSpacing: '-0.5px',
            }}
          >
            Here's your project plan.
          </h1>
          <p className="text-sm text-dim-grey leading-relaxed max-w-md">
            We've mapped your project into key steps and matched AI tools to each one.
            Edit anything — this becomes your puzzle.
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-3 mb-6">
          {steps.map((step, stepIndex) => (
            <StepCard
              key={step.id + stepIndex}
              step={step}
              stepIndex={stepIndex}
              swapMenu={swapMenu}
              onRemoveStep={() => handleRemoveStep(stepIndex)}
              onSwapOpen={(toolIndex) => setSwapMenu({ stepIndex, toolIndex })}
              onSwapTool={(toolIndex, newId) => handleSwapTool(stepIndex, toolIndex, newId)}
              onRemoveTool={(toolIndex) => handleRemoveTool(stepIndex, toolIndex)}
              onCloseSwap={() => setSwapMenu(null)}
            />
          ))}
        </div>

        {/* Add step */}
        {availableToAdd.length > 0 && (
          <div className="mb-8">
            {!addingStep ? (
              <button
                onClick={() => setAddingStep(true)}
                className="flex items-center gap-2 text-sm font-medium text-dim-grey hover:text-washed-black transition-colors py-2"
              >
                <span
                  className="w-6 h-6 rounded-full border-2 border-dashed border-concrete flex items-center justify-center text-base leading-none hover:border-washed-black transition-colors"
                >
                  +
                </span>
                Add a step
              </button>
            ) : (
              <div
                className="bg-pure-white rounded-card p-4 mt-2"
                style={{ boxShadow: 'rgba(0,0,0,0.06) 0px 0px 0px 1px inset', borderRadius: 16 }}
              >
                <p className="text-xs font-semibold text-dim-grey uppercase tracking-wide mb-3">
                  Choose a step to add
                </p>
                <div className="flex flex-wrap gap-2">
                  {availableToAdd.map(t => (
                    <button
                      key={t.id}
                      onClick={() => handleAddStep(t.id)}
                      className="flex items-center gap-2 px-3 py-2 rounded-button border border-concrete text-sm font-medium text-washed-black hover:border-washed-black hover:bg-beige transition-all"
                    >
                      <span>{t.icon}</span>
                      {t.name}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setAddingStep(false)}
                  className="mt-3 text-xs text-dim-grey hover:text-washed-black transition-colors"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        )}

        {/* Footer actions */}
        <div className="flex items-center justify-between pt-6 border-t border-concrete">
          <button
            onClick={handleRegenerate}
            disabled={regenerating}
            className="flex items-center gap-2 text-sm font-medium text-dim-grey hover:text-washed-black disabled:opacity-40 transition-colors"
          >
            <span
              style={{
                display: 'inline-block',
                animation: regenerating ? 'spin 0.6s linear infinite' : 'none',
              }}
            >
              ↺
            </span>
            Try again
          </button>

          <button
            onClick={handleConfirm}
            disabled={steps.length === 0}
            className="py-3 px-7 rounded-button bg-energy-gold hover:bg-deep-amber disabled:opacity-40 text-ink-black text-sm font-semibold transition-colors"
          >
            Looks good → Build my puzzle
          </button>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

function StepCard({ step, stepIndex, swapMenu, onRemoveStep, onSwapOpen, onSwapTool, onRemoveTool, onCloseSwap }) {
  return (
    <div
      className="bg-pure-white rounded-card px-6 py-5 group"
      style={{ boxShadow: 'rgba(0,0,0,0.06) 0px 0px 0px 1px inset', borderRadius: 20 }}
    >
      <div className="flex items-start gap-4">
        {/* Step icon + number */}
        <div className="flex items-center gap-2.5 pt-0.5 shrink-0">
          <span
            className="w-5 h-5 rounded-full bg-beige text-washed-black text-xs font-semibold flex items-center justify-center"
          >
            {stepIndex + 1}
          </span>
          <span className="text-xl leading-none">{step.icon}</span>
        </div>

        {/* Step info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <p className="text-sm font-semibold text-washed-black">{step.name}</p>
          </div>
          {step.description && (
            <p className="text-xs text-dim-grey mb-3">{step.description}</p>
          )}

          {/* Tool chips */}
          <div className="flex flex-wrap gap-2">
            {step.tools.map((toolId, toolIndex) => {
              const tool = getToolById(toolId);
              if (!tool) return null;
              const isSwapOpen = swapMenu?.stepIndex === stepIndex && swapMenu?.toolIndex === toolIndex;

              return (
                <div key={toolId + toolIndex} className="relative" onClick={e => e.stopPropagation()}>
                  <ToolChip
                    tool={tool}
                    onSwap={() => isSwapOpen ? onCloseSwap() : onSwapOpen(toolIndex)}
                    onRemove={() => onRemoveTool(toolIndex)}
                    isSwapOpen={isSwapOpen}
                  />

                  {/* Swap dropdown */}
                  {isSwapOpen && (
                    <SwapDropdown
                      currentToolId={toolId}
                      stepId={step.id}
                      allCurrentTools={step.tools}
                      onSelect={(newId) => onSwapTool(toolIndex, newId)}
                      onClose={onCloseSwap}
                    />
                  )}
                </div>
              );
            })}

            {/* Add tool to step */}
            {step.tools.length < 3 && (
              <AddToolButton
                stepId={step.id}
                currentTools={step.tools}
                onAdd={(toolId) => onSwapTool(step.tools.length, toolId)}
              />
            )}
          </div>
        </div>

        {/* Remove step */}
        <button
          onClick={onRemoveStep}
          className="opacity-0 group-hover:opacity-100 w-6 h-6 flex items-center justify-center rounded-full text-silver-mist hover:text-washed-black hover:bg-beige transition-all text-sm shrink-0 mt-0.5"
          title="Remove this step"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

function ToolChip({ tool, onSwap, onRemove, isSwapOpen }) {
  return (
    <div
      className={`group/chip flex items-center gap-1.5 pl-2 pr-1 py-1 rounded-button border transition-all cursor-pointer ${
        isSwapOpen
          ? 'border-washed-black bg-beige'
          : 'border-concrete bg-beige hover:border-washed-black'
      }`}
      style={{ fontSize: 13 }}
    >
      <span className="text-base leading-none">{tool.logo}</span>
      <span className="font-medium text-washed-black">{tool.name}</span>

      <button
        onClick={onSwap}
        className="text-dim-grey hover:text-washed-black transition-colors px-1 py-0.5 rounded text-xs"
        title="Swap tool"
      >
        ⇄
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); onRemove(); }}
        className="text-silver-mist hover:text-coral-red transition-colors px-0.5 text-xs"
        title="Remove tool"
      >
        ✕
      </button>
    </div>
  );
}

function SwapDropdown({ currentToolId, stepId, allCurrentTools, onSelect, onClose }) {
  const alternatives = getAlternativeTools(stepId, allCurrentTools);
  const top5 = alternatives.slice(0, 5).map(id => getToolById(id)).filter(Boolean);

  return (
    <div
      className="absolute top-full left-0 mt-1.5 z-20 bg-pure-white rounded-card shadow-elevated py-1.5 min-w-[200px]"
      style={{ boxShadow: 'rgba(0,0,0,0.12) 0px 8px 24px 0px', borderRadius: 16 }}
    >
      <p className="text-xs font-semibold text-dim-grey uppercase tracking-wide px-4 pt-2 pb-2">
        Swap for
      </p>
      {top5.map(tool => (
        <button
          key={tool.id}
          onClick={() => onSelect(tool.id)}
          className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-beige transition-colors text-left"
        >
          <span className="text-lg leading-none">{tool.logo}</span>
          <div>
            <div className="text-sm font-medium text-washed-black">{tool.name}</div>
            <div className="text-xs text-dim-grey">{tool.category}</div>
          </div>
        </button>
      ))}
      {top5.length === 0 && (
        <p className="text-sm text-dim-grey px-4 py-3">No other tools available</p>
      )}
    </div>
  );
}

function AddToolButton({ stepId, currentTools, onAdd }) {
  const [open, setOpen] = useState(false);
  const alternatives = getAlternativeTools(stepId, currentTools);
  const options = alternatives.slice(0, 5).map(id => getToolById(id)).filter(Boolean);

  return (
    <div className="relative" onClick={e => e.stopPropagation()}>
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-1 px-2.5 py-1 rounded-button border-2 border-dashed border-concrete text-dim-grey hover:border-washed-black hover:text-washed-black transition-all text-xs font-medium"
      >
        + tool
      </button>
      {open && (
        <div
          className="absolute top-full left-0 mt-1.5 z-20 bg-pure-white rounded-card shadow-elevated py-1.5 min-w-[200px]"
          style={{ boxShadow: 'rgba(0,0,0,0.12) 0px 8px 24px 0px', borderRadius: 16 }}
        >
          {options.map(tool => (
            <button
              key={tool.id}
              onClick={() => { onAdd(tool.id); setOpen(false); }}
              className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-beige transition-colors text-left"
            >
              <span className="text-lg leading-none">{tool.logo}</span>
              <div>
                <div className="text-sm font-medium text-washed-black">{tool.name}</div>
                <div className="text-xs text-dim-grey">{tool.category}</div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
