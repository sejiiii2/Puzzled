import { PROJECTS } from '../data/projects';
import { getToolById } from '../data/tools';

export default function Dashboard({ projects, savedToolIds = [], onNavigate, onSelectProject }) {
  const allReflections = projects.flatMap(proj =>
    proj.pieces.filter(p => p.status === 'unlocked' && p.reflection).map(p => ({
      ...p.reflection,
      toolId: p.toolId,
      projectName: proj.name,
    }))
  );

  const totalUnlocked = projects.reduce(
    (sum, proj) => sum + proj.pieces.filter(p => p.status === 'unlocked').length, 0
  );

  const avgBenefit = avg(allReflections.map(r => r.benefitScore));
  const avgFriction = avg(allReflections.map(r => r.frictionScore));
  const reuseRate = allReflections.length
    ? Math.round((allReflections.filter(r => r.reuse === 'Yes').length / allReflections.length) * 100)
    : null;

  // Suggestions: saved from community first, then locked tools from projects
  const triedToolIds = new Set(allReflections.map(r => r.toolId));
  const fromCommunity = savedToolIds.filter(id => !triedToolIds.has(id));
  const fromProjects = projects
    .flatMap(proj => proj.pieces.filter(p => p.status === 'locked').map(p => p.toolId))
    .filter((id, i, arr) => !triedToolIds.has(id) && !fromCommunity.includes(id) && arr.indexOf(id) === i);
  const allSuggestionIds = [...fromCommunity, ...fromProjects];
  const similarSuggestions = allSuggestionIds
    .slice(0, 4)
    .map(id => getToolById(id))
    .filter(Boolean)
    .map(tool => ({ tool, fromCommunity: fromCommunity.includes(tool.id) }));

  return (
    <div className="min-h-screen bg-pure-white">
      <div className="max-w-[900px] mx-auto px-6 py-14">
        {/* Hero */}
        <div className="mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-dim-grey mb-3">
            Dashboard
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
            Your AI toolkit, earned piece by piece.
          </h1>
          <p className="text-dim-grey text-sm max-w-md">
            {totalUnlocked > 0
              ? `You've unlocked ${totalUnlocked} piece${totalUnlocked > 1 ? 's' : ''} across ${projects.length} project${projects.length > 1 ? 's' : ''}. Keep going.`
              : 'Start your first puzzle to begin building your toolkit.'}
          </p>
        </div>

        {/* Metric tiles */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <MetricCard
            icon="🧩"
            iconBg="#ffba0920"
            value={totalUnlocked}
            label="Pieces Unlocked"
            sub="across all projects"
          />
          <MetricCard
            icon="⭐"
            iconBg="#0ea5e920"
            value={avgBenefit !== null ? avgBenefit.toFixed(1) : '—'}
            label="Avg Benefit"
            sub="out of 5"
          />
          <MetricCard
            icon="⚡"
            iconBg="#ff4d4d20"
            value={avgFriction !== null ? avgFriction.toFixed(1) : '—'}
            label="Avg Friction"
            sub="out of 5"
          />
          <MetricCard
            icon="🔄"
            iconBg="#00c45420"
            value={reuseRate !== null ? `${reuseRate}%` : '—'}
            label="Reuse Rate"
            sub="would use again"
          />
        </div>

        {/* Your toolkit table */}
        {allReflections.length > 0 && (
          <div
            className="mb-12 bg-pure-white rounded-card overflow-hidden"
            style={{ boxShadow: 'rgba(0,0,0,0.06) 0px 0px 0px 1px inset' }}
          >
            <div className="px-8 py-5 border-b border-beige">
              <h2 className="font-ui text-base font-semibold text-washed-black">Your toolkit</h2>
            </div>
            <div className="divide-y divide-beige">
              {allReflections.map((r, i) => {
                const tool = getToolById(r.toolId);
                if (!tool) return null;
                return (
                  <ToolRow key={`${r.toolId}-${i}`} tool={tool} reflection={r} />
                );
              })}
            </div>
          </div>
        )}

        {/* Projects grid */}
        <div className="mb-12">
          <h2 className="font-ui text-base font-semibold text-washed-black mb-5">Your projects</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {projects.map(proj => (
              <ProjectCard
                key={proj.id}
                project={proj}
                onClick={() => {
                  onSelectProject(proj.id);
                  onNavigate('board');
                }}
              />
            ))}
          </div>
        </div>

        {/* Similar tools */}
        {similarSuggestions.length > 0 && (
          <div>
            <h2 className="font-ui text-base font-semibold text-washed-black mb-5">
              Similar tools you could try
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              {similarSuggestions.map(({ tool, fromCommunity: fc }) => (
                <SuggestionCard key={tool.id} tool={tool} fromCommunity={fc} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function MetricCard({ icon, iconBg, value, label, sub }) {
  return (
    <div
      className="bg-pure-white rounded-card p-6"
      style={{ boxShadow: 'rgba(0,0,0,0.06) 0px 0px 0px 1px inset' }}
    >
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center text-xl mb-4"
        style={{ background: iconBg }}
      >
        {icon}
      </div>
      <div className="text-3xl font-semibold text-washed-black leading-none mb-1">{value}</div>
      <div className="text-xs font-semibold uppercase tracking-wider text-dim-grey mt-2">{label}</div>
      <div className="text-xs text-silver-mist mt-0.5">{sub}</div>
    </div>
  );
}

function ToolRow({ tool, reflection }) {
  return (
    <div className="flex items-center gap-4 px-8 py-4">
      {/* Tool */}
      <div className="flex items-center gap-3 w-40 shrink-0">
        <div
          className="w-8 h-8 rounded-logo flex items-center justify-center text-base"
          style={{ background: tool.brandColor + '20' }}
        >
          {tool.logo}
        </div>
        <div>
          <div className="text-sm font-medium text-washed-black">{tool.name}</div>
          <div className="text-xs text-dim-grey">{tool.category}</div>
        </div>
      </div>

      {/* Benefit */}
      <div className="flex gap-1 items-center">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-full"
            style={{ background: i < reflection.benefitScore ? '#0ea5e9' : '#d4d4d0' }}
          />
        ))}
      </div>

      {/* Friction */}
      <div className="flex gap-1 items-center">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-full"
            style={{ background: i < reflection.frictionScore ? '#ff4d4d' : '#d4d4d0' }}
          />
        ))}
      </div>

      {/* Reuse */}
      <ReuseBadge value={reflection.reuse} />

      {/* Note */}
      {reflection.note && (
        <p className="text-xs text-dim-grey italic flex-1 truncate hidden md:block">
          "{reflection.note}"
        </p>
      )}
    </div>
  );
}

function ReuseBadge({ value }) {
  const styles = {
    Yes: { bg: '#00c45415', text: '#00c454' },
    Maybe: { bg: '#ffba0915', text: '#d48f00' },
    No: { bg: '#ff4d4d15', text: '#ff4d4d' },
  };
  const s = styles[value] || styles.Maybe;
  return (
    <span
      className="text-xs font-semibold px-2.5 py-0.5 rounded-tag"
      style={{ background: s.bg, color: s.text }}
    >
      {value}
    </span>
  );
}

function ProjectCard({ project, onClick }) {
  const unlocked = project.pieces.filter(p => p.status === 'unlocked').length;
  const total = project.pieces.length;

  return (
    <button
      onClick={onClick}
      className="text-left bg-pure-white rounded-card p-6 hover:shadow-elevated transition-shadow group"
      style={{ boxShadow: 'rgba(0,0,0,0.06) 0px 0px 0px 1px inset' }}
    >
      {/* Mini puzzle thumbnail */}
      <div className="flex gap-1.5 mb-5">
        {project.pieces.slice(0, 6).map((p, i) => {
          const tool = getToolById(p.toolId);
          return (
            <div
              key={i}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-sm"
              style={{
                background: p.status === 'unlocked'
                  ? (tool?.brandColor || '#ffba09') + '30'
                  : '#f0f0ec',
                border: p.status === 'unlocked' ? 'none' : '1px solid #d4d4d0',
              }}
            >
              <span style={{ opacity: p.status === 'unlocked' ? 1 : 0.4, filter: p.status === 'unlocked' ? 'none' : 'grayscale(100%)', fontSize: 14 }}>
                {tool?.logo}
              </span>
            </div>
          );
        })}
      </div>

      <h3 className="text-sm font-semibold text-washed-black mb-1 group-hover:underline">
        {project.name}
      </h3>
      <p className="text-xs text-dim-grey mb-4 line-clamp-2">{project.description}</p>

      <div className="flex items-center gap-2">
        <div className="flex-1 h-1 bg-beige rounded-full overflow-hidden">
          <div
            className="h-full bg-energy-gold rounded-full"
            style={{ width: `${(unlocked / total) * 100}%` }}
          />
        </div>
        <span className="text-xs text-dim-grey shrink-0">{unlocked}/{total}</span>
      </div>
    </button>
  );
}

function SuggestionCard({ tool, fromCommunity }) {
  return (
    <div
      className="bg-pure-white rounded-card p-5"
      style={{ boxShadow: 'rgba(0,0,0,0.06) 0px 0px 0px 1px inset' }}
    >
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-logo flex items-center justify-center text-lg shrink-0"
            style={{ background: tool.brandColor + '20' }}
          >
            {tool.logo}
          </div>
          <div>
            <div className="text-sm font-semibold text-washed-black">{tool.name}</div>
            <div className="text-xs text-dim-grey">{tool.category}</div>
          </div>
        </div>
        {fromCommunity && (
          <span className="text-xs font-medium text-dim-grey bg-beige px-2 py-0.5 rounded-tag shrink-0 mt-0.5">
            community pick
          </span>
        )}
      </div>
      <p className="text-xs text-dim-grey leading-relaxed line-clamp-2">{tool.description}</p>
      <a
        href={tool.url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 text-xs font-medium text-washed-black hover:underline inline-block"
      >
        Visit {tool.name} →
      </a>
    </div>
  );
}

function avg(arr) {
  const filtered = arr.filter(Boolean);
  if (!filtered.length) return null;
  return filtered.reduce((a, b) => a + b, 0) / filtered.length;
}
