import { useState } from 'react';
import PuzzlePiece from '../components/PuzzlePiece';
import ToolDrawer from '../components/ToolDrawer';
import ReflectionModal from '../components/ReflectionModal';
import { getToolById } from '../data/tools';

// Config for pieces arranged in a horizontal row — only left/right interlock, top/bottom flat
function getRowConfig(posInRow, rowLength) {
  return {
    top: 'flat',
    bottom: 'flat',
    left: posInRow === 0 ? 'flat' : 'in',
    right: posInRow === rowLength - 1 ? 'flat' : 'out',
  };
}

export default function PuzzleBoard({ project, onProjectUpdate, onNavigate }) {
  const [selectedToolId, setSelectedToolId] = useState(null);
  const [reflectingToolId, setReflectingToolId] = useState(null);
  const [justActivated, setJustActivated] = useState(null);

  // Build a map for quick piece lookup by toolId
  const pieceMap = Object.fromEntries(project.pieces.map(p => [p.toolId, p]));

  const unlockedCount = project.pieces.filter(p => p.status === 'unlocked').length;
  const totalCount = project.pieces.length;

  const selectedPiece = pieceMap[selectedToolId];
  const selectedTool = selectedToolId ? getToolById(selectedToolId) : null;
  const reflectingTool = reflectingToolId ? getToolById(reflectingToolId) : null;

  // Normalise to step rows — if the project has steps, use them; otherwise one row of all pieces
  const steps = project.steps ?? [
    { id: 'all', name: 'Recommended tools', icon: '🧩', toolIds: project.pieces.map(p => p.toolId) },
  ];

  const handleReflectionSubmit = (reflection) => {
    const updatedPieces = project.pieces.map(p =>
      p.toolId === reflectingToolId ? { ...p, status: 'unlocked', reflection } : p
    );
    onProjectUpdate({ ...project, pieces: updatedPieces });
    setJustActivated(reflectingToolId);
    setReflectingToolId(null);
    setSelectedToolId(null);
    setTimeout(() => setJustActivated(null), 800);
  };

  return (
    <div className="min-h-screen bg-pure-white">
      <div className="max-w-[1200px] mx-auto px-6 py-10">

        {/* Project header */}
        <div className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-dim-grey mb-2">
            Active project
          </p>
          <h1
            className="text-washed-black mb-3"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 'clamp(28px,4vw,40px)', letterSpacing: '-0.5px', lineHeight: 1.1 }}
          >
            {project.name}
          </h1>
          <p className="text-sm text-dim-grey max-w-xl leading-relaxed">{project.description}</p>
        </div>

        {/* Two-column layout */}
        <div className="flex gap-10 items-start">

          {/* Puzzle board — main column */}
          <div className="flex-1 min-w-0">
            {/* Progress bar */}
            <div className="flex items-center gap-3 mb-7">
              <span className="text-sm font-medium text-washed-black">
                {unlockedCount} of {totalCount} pieces unlocked
              </span>
              <div className="flex-1 h-1.5 bg-beige rounded-full overflow-hidden">
                <div
                  className="h-full bg-energy-gold rounded-full transition-all duration-500"
                  style={{ width: `${totalCount ? (unlockedCount / totalCount) * 100 : 0}%` }}
                />
              </div>
              <span className="text-sm text-dim-grey">
                {totalCount ? Math.round((unlockedCount / totalCount) * 100) : 0}%
              </span>
            </div>

            {/* Step rows */}
            <div
              className="bg-pearl rounded-card"
              style={{
                boxShadow: 'rgba(0,0,0,0.06) 0px 0px 0px 1px inset',
                padding: '32px 32px 32px 24px',
                overflow: 'visible',
              }}
            >
              {steps.map((step, stepIdx) => {
                const toolIds = step.toolIds.filter(id => pieceMap[id]); // only include tools that exist in pieces
                if (toolIds.length === 0) return null;

                return (
                  <div
                    key={step.id}
                    className="flex items-center gap-0"
                    style={{ marginBottom: stepIdx < steps.length - 1 ? 28 : 0 }}
                  >
                    {/* Step label */}
                    <div
                      className="shrink-0 flex items-center gap-2.5 pr-6"
                      style={{ width: 180 }}
                    >
                      <span className="text-base leading-none">{step.icon}</span>
                      <div>
                        <p className="text-xs font-semibold text-washed-black leading-tight">
                          {step.name}
                        </p>
                        <p className="text-xs text-dim-grey mt-0.5">
                          {toolIds.filter(id => pieceMap[id]?.status === 'unlocked').length}/{toolIds.length} done
                        </p>
                      </div>
                    </div>

                    {/* Divider */}
                    <div
                      className="shrink-0 self-stretch w-px mr-6"
                      style={{ background: '#d4d4d0' }}
                    />

                    {/* Pieces */}
                    <div
                      className="flex items-center"
                      style={{ gap: 0, overflow: 'visible' }}
                    >
                      {toolIds.map((toolId, pieceIdx) => {
                        const tool = getToolById(toolId);
                        const piece = pieceMap[toolId];
                        if (!tool || !piece) return null;
                        return (
                          <PuzzlePiece
                            key={toolId}
                            tool={tool}
                            status={piece.status}
                            config={getRowConfig(pieceIdx, toolIds.length)}
                            onClick={() => setSelectedToolId(toolId)}
                            justActivated={justActivated === toolId}
                          />
                        );
                      })}
                    </div>
                  </div>
                );
              })}

              {steps.length === 0 && (
                <p className="text-dim-grey text-sm py-8 text-center">No tools added yet.</p>
              )}
            </div>

            {/* Snap toast */}
            {justActivated && (
              <div
                className="mt-4 inline-flex items-center gap-2.5 bg-washed-black text-white px-5 py-3 rounded-button text-sm font-medium animate-fade-in"
              >
                <span className="text-energy-gold">✦</span>
                Piece snapped in — nice work.
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="w-64 shrink-0 space-y-4">
            {/* Progress stats */}
            <div
              className="bg-pure-white rounded-card p-6"
              style={{ boxShadow: 'rgba(0,0,0,0.06) 0px 0px 0px 1px inset' }}
            >
              <p className="text-xs font-semibold uppercase tracking-widest text-dim-grey mb-4">
                Your progress
              </p>
              <div className="space-y-3.5">
                <StatRow label="Pieces unlocked" value={`${unlockedCount} / ${totalCount}`} accent />
                {unlockedCount > 0 && (
                  <>
                    <StatRow label="Avg benefit"  value={avgScore(project.pieces, 'benefitScore')} />
                    <StatRow label="Avg friction" value={avgScore(project.pieces, 'frictionScore')} />
                    <StatRow label="Would reuse"  value={reuseRate(project.pieces)} />
                  </>
                )}
              </div>

              {/* Per-step mini progress */}
              {steps.length > 1 && (
                <div className="mt-5 pt-5 border-t border-beige space-y-2.5">
                  {steps.map(step => {
                    const toolIds = step.toolIds.filter(id => pieceMap[id]);
                    const done = toolIds.filter(id => pieceMap[id]?.status === 'unlocked').length;
                    const pct = toolIds.length ? (done / toolIds.length) * 100 : 0;
                    return (
                      <div key={step.id} className="flex items-center gap-2">
                        <span className="text-sm leading-none shrink-0">{step.icon}</span>
                        <div className="flex-1 h-1 bg-beige rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{ width: `${pct}%`, background: pct === 100 ? '#ffba09' : '#1a1a1a' }}
                          />
                        </div>
                        <span className="text-xs text-dim-grey shrink-0 w-8 text-right">{done}/{toolIds.length}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* How it works */}
            <div className="bg-pearl rounded-card p-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-dim-grey mb-4">
                How it works
              </p>
              <ol className="space-y-3">
                {[
                  { n: '1', text: 'Click a piece to see why the tool fits.' },
                  { n: '2', text: 'Try it with the starter challenge.' },
                  { n: '3', text: 'Reflect and snap the piece in.' },
                ].map(({ n, text }) => (
                  <li key={n} className="flex gap-3">
                    <span className="w-5 h-5 rounded-full bg-concrete text-washed-black text-xs font-semibold flex items-center justify-center shrink-0 mt-0.5">
                      {n}
                    </span>
                    <p className="text-xs text-dim-grey leading-relaxed">{text}</p>
                  </li>
                ))}
              </ol>
            </div>

            <button
              onClick={() => onNavigate('dashboard')}
              className="w-full py-3 px-5 rounded-button text-sm font-medium text-washed-black border border-concrete hover:border-washed-black hover:bg-beige transition-all flex items-center justify-between"
            >
              <span>View your dashboard</span>
              <span className="text-dim-grey">→</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tool drawer */}
      {selectedTool && (
        <ToolDrawer
          tool={selectedTool}
          piece={selectedPiece}
          onClose={() => setSelectedToolId(null)}
          onStartReflection={() => {
            setReflectingToolId(selectedToolId);
            setSelectedToolId(null);
          }}
        />
      )}

      {/* Reflection modal */}
      {reflectingTool && (
        <ReflectionModal
          tool={reflectingTool}
          onClose={() => setReflectingToolId(null)}
          onSubmit={handleReflectionSubmit}
        />
      )}
    </div>
  );
}

function StatRow({ label, value, accent }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-dim-grey">{label}</span>
      <span className={`text-sm font-semibold ${accent ? 'text-energy-gold' : 'text-washed-black'}`}>
        {value}
      </span>
    </div>
  );
}

function avgScore(pieces, field) {
  const reflected = pieces.filter(p => p.reflection?.[field]);
  if (!reflected.length) return '—';
  const avg = reflected.reduce((sum, p) => sum + p.reflection[field], 0) / reflected.length;
  return avg.toFixed(1);
}

function reuseRate(pieces) {
  const reflected = pieces.filter(p => p.reflection?.reuse);
  if (!reflected.length) return '—';
  const yes = reflected.filter(p => p.reflection.reuse === 'Yes').length;
  return `${Math.round((yes / reflected.length) * 100)}%`;
}
