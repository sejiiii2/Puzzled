import { useState } from 'react';
import { COMMUNITY } from '../data/projects';
import { getToolById } from '../data/tools';

export default function Community({ savedToolIds = [], onSaveTool }) {
  const [selectedEntry, setSelectedEntry] = useState(null);

  if (selectedEntry) {
    return (
      <CommunityDetail
        entry={selectedEntry}
        savedToolIds={savedToolIds}
        onSaveTool={onSaveTool}
        onBack={() => setSelectedEntry(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-pure-white">
      <div className="max-w-[1200px] mx-auto px-6 py-14">
        <div className="mb-12 max-w-xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-dim-grey mb-3">
            Community
          </p>
          <h1
            className="text-washed-black mb-3"
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 500,
              fontSize: 'clamp(32px, 4vw, 48px)',
              lineHeight: 1.1,
              letterSpacing: '-0.5px',
            }}
          >
            See how others build their toolkit.
          </h1>
          <p className="text-sm text-dim-grey leading-relaxed">
            Browse how researchers with similar projects approached their AI toolkit. No rankings — just real patterns.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {COMMUNITY.map(entry => (
            <CommunityCard
              key={entry.id}
              entry={entry}
              onClick={() => setSelectedEntry(entry)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function CommunityCard({ entry, onClick }) {
  const unlocked = entry.pieces.filter(p => p.status === 'unlocked');
  const tools = unlocked.map(p => getToolById(p.toolId)).filter(Boolean);

  return (
    <button
      onClick={onClick}
      className="text-left bg-pure-white rounded-card p-6 flex flex-col gap-4 hover:shadow-elevated transition-all group"
      style={{ boxShadow: 'rgba(0,0,0,0.06) 0px 0px 0px 1px inset' }}
    >
      {/* Activated tool logos */}
      <div className="flex gap-2 flex-wrap">
        {tools.map(tool => (
          <div
            key={tool.id}
            className="w-9 h-9 rounded-logo flex items-center justify-center text-lg"
            style={{ background: tool.brandColor + '20' }}
            title={tool.name}
          >
            {tool.logo}
          </div>
        ))}
        {entry.pieces.filter(p => p.status === 'locked').length > 0 && (
          <div className="w-9 h-9 rounded-logo flex items-center justify-center bg-beige">
            <span className="text-xs text-silver-mist font-semibold">
              +{entry.pieces.filter(p => p.status === 'locked').length}
            </span>
          </div>
        )}
      </div>

      <div>
        <h3 className="text-sm font-semibold text-washed-black mb-1 group-hover:underline underline-offset-2">
          {entry.projectName}
        </h3>
        <p className="text-xs text-dim-grey leading-relaxed line-clamp-2">
          {entry.projectDescription}
        </p>
      </div>

      <div className="flex flex-wrap gap-1.5 mt-auto">
        {tools.map(tool => (
          <span
            key={tool.id}
            className="text-xs font-medium text-dim-grey bg-beige px-2.5 py-1 rounded-tag"
          >
            {tool.name}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-beige">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-beige flex items-center justify-center text-xs font-semibold text-dim-grey">
            {entry.userName[0]}
          </div>
          <span className="text-xs text-silver-mist">{entry.userName}</span>
        </div>
        <span className="text-xs text-dim-grey group-hover:text-washed-black transition-colors">
          View puzzle →
        </span>
      </div>
    </button>
  );
}

// ─── Detail view ────────────────────────────────────────────────────────────

function CommunityDetail({ entry, savedToolIds, onSaveTool, onBack }) {
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [justSaved, setJustSaved] = useState(null);

  const unlockedCount = entry.pieces.filter(p => p.status === 'unlocked').length;

  const handleSave = (toolId) => {
    onSaveTool?.(toolId);
    setJustSaved(toolId);
    setTimeout(() => setJustSaved(null), 2000);
  };

  return (
    <div className="min-h-screen bg-pure-white">
      <div className="max-w-[900px] mx-auto px-6 py-14">

        {/* Back */}
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-sm text-dim-grey hover:text-washed-black transition-colors mb-10"
        >
          ← Back to community
        </button>

        {/* Header */}
        <div className="flex items-start justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-7 h-7 rounded-full bg-beige flex items-center justify-center text-xs font-semibold text-dim-grey">
                {entry.userName[0]}
              </div>
              <span className="text-sm text-dim-grey">{entry.userName}</span>
              <span className="text-concrete">·</span>
              <span className="text-xs text-silver-mist">Read only</span>
            </div>
            <h1
              className="text-washed-black mb-2"
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 500,
                fontSize: 'clamp(24px, 3vw, 36px)',
                lineHeight: 1.1,
                letterSpacing: '-0.3px',
              }}
            >
              {entry.projectName}
            </h1>
            <p className="text-sm text-dim-grey max-w-lg leading-relaxed">
              {entry.projectDescription}
            </p>
          </div>

          <div className="shrink-0 text-right hidden md:block">
            <div className="text-2xl font-semibold text-washed-black">{unlockedCount}</div>
            <div className="text-xs text-dim-grey mt-0.5">tools tried</div>
          </div>
        </div>

        {/* Two-column layout */}
        <div className="flex gap-8 items-start">
          {/* Puzzle grid (read-only) */}
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold uppercase tracking-widest text-dim-grey mb-5">
              Their puzzle
            </p>
            <div
              className="bg-pearl rounded-card p-8"
              style={{ boxShadow: 'rgba(0,0,0,0.06) 0px 0px 0px 1px inset' }}
            >
              <div className="grid grid-cols-3 gap-3" style={{ maxWidth: 400 }}>
                {entry.pieces.map((piece) => {
                  const tool = getToolById(piece.toolId);
                  if (!tool) return null;
                  const isUnlocked = piece.status === 'unlocked';
                  const isSelected = selectedPiece?.toolId === piece.toolId;

                  return (
                    <button
                      key={piece.toolId}
                      onClick={() => isUnlocked ? setSelectedPiece(isSelected ? null : piece) : null}
                      disabled={!isUnlocked}
                      className={`aspect-square rounded-2xl flex flex-col items-center justify-center gap-1.5 transition-all ${
                        isUnlocked
                          ? 'cursor-pointer hover:scale-105 active:scale-95'
                          : 'cursor-default opacity-60'
                      } ${isSelected ? 'ring-2 ring-washed-black ring-offset-2' : ''}`}
                      style={{
                        background: isUnlocked
                          ? (tool.brandColor || '#ffba09') + '25'
                          : '#f0f0ec',
                        border: isUnlocked ? 'none' : '1.5px solid #d4d4d0',
                      }}
                      title={isUnlocked ? `View ${tool.name} reflection` : `${tool.name} — not tried`}
                    >
                      <span
                        className="text-2xl"
                        style={{
                          filter: isUnlocked ? 'none' : 'grayscale(100%)',
                          opacity: isUnlocked ? 1 : 0.35,
                        }}
                      >
                        {tool.logo}
                      </span>
                      <span
                        className="text-xs font-semibold"
                        style={{ color: isUnlocked ? '#1a1a1a' : '#b3b3b3', fontSize: 10 }}
                      >
                        {tool.name}
                      </span>
                      {isUnlocked && (
                        <span
                          className="text-xs font-bold uppercase tracking-wide px-2 py-0.5 rounded-full"
                          style={{ fontSize: 8, background: '#1a1a1a', color: '#fff' }}
                        >
                          DONE
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
              <p className="text-xs text-silver-mist mt-5">
                Click an activated piece to see their reflection
              </p>
            </div>
          </div>

          {/* Reflection panel */}
          <div className="w-72 shrink-0">
            {selectedPiece ? (
              <ReflectionPanel
                piece={selectedPiece}
                savedToolIds={savedToolIds}
                justSaved={justSaved}
                onSave={handleSave}
                onClose={() => setSelectedPiece(null)}
              />
            ) : (
              <div
                className="bg-pearl rounded-card p-6 text-center"
                style={{ borderRadius: 20 }}
              >
                <div className="text-3xl mb-3 opacity-40">🧩</div>
                <p className="text-sm text-dim-grey leading-relaxed">
                  Select an activated piece to read {entry.userName.split(' ')[0]}'s reflection.
                </p>
              </div>
            )}

            {/* Saved toast */}
            {justSaved && (
              <div className="mt-3 flex items-center gap-2 bg-washed-black text-white px-4 py-2.5 rounded-button text-xs font-medium animate-fade-in">
                <span className="text-energy-gold">✦</span>
                Saved to your suggestions
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ReflectionPanel({ piece, savedToolIds, justSaved, onSave, onClose }) {
  const tool = getToolById(piece.toolId);
  const r = piece.reflection;
  if (!tool || !r) return null;

  const isSaved = savedToolIds.includes(piece.toolId);

  return (
    <div
      className="bg-pure-white rounded-card p-6"
      style={{ boxShadow: 'rgba(0,0,0,0.06) 0px 0px 0px 1px inset', borderRadius: 20 }}
    >
      {/* Tool header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-logo flex items-center justify-center text-xl"
            style={{ background: tool.brandColor + '20' }}
          >
            {tool.logo}
          </div>
          <div>
            <p className="text-sm font-semibold text-washed-black">{tool.name}</p>
            <p className="text-xs text-dim-grey">{tool.category}</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="w-6 h-6 flex items-center justify-center rounded-full text-silver-mist hover:text-washed-black hover:bg-beige transition-all text-sm"
        >
          ✕
        </button>
      </div>

      {/* Scores */}
      <div className="space-y-3 mb-5">
        <div className="flex items-center justify-between">
          <span className="text-xs text-dim-grey font-medium">Benefit</span>
          <DotScale value={r.benefitScore} color="#0ea5e9" />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-dim-grey font-medium">Friction</span>
          <DotScale value={r.frictionScore} color="#ff4d4d" />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-dim-grey font-medium">Use again?</span>
          <ReuseBadge value={r.reuse} />
        </div>
      </div>

      {/* Note */}
      {r.note && (
        <div className="bg-pearl rounded-xl p-4 mb-5" style={{ borderRadius: 14 }}>
          <p className="text-sm text-washed-black italic leading-relaxed">
            "{r.note}"
          </p>
        </div>
      )}

      {/* Save button */}
      <button
        onClick={() => !isSaved && onSave(piece.toolId)}
        disabled={isSaved}
        className={`w-full py-2.5 px-4 rounded-button text-sm font-semibold transition-all ${
          isSaved
            ? 'bg-beige text-dim-grey cursor-default'
            : 'bg-energy-gold hover:bg-deep-amber text-ink-black'
        }`}
      >
        {isSaved ? '✓ Saved to your list' : 'Want to try this →'}
      </button>
    </div>
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
  const s = { Yes: ['#00c45415', '#00c454'], Maybe: ['#ffba0915', '#d48f00'], No: ['#ff4d4d15', '#ff4d4d'] }[value] || ['#f0f0ec', '#6d6868'];
  return (
    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-tag" style={{ background: s[0], color: s[1] }}>
      {value}
    </span>
  );
}
