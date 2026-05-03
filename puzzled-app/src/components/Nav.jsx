export default function Nav({ currentPage, onNavigate, projectName }) {
  return (
    <nav
      className="sticky top-0 z-50 bg-pure-white"
      style={{ boxShadow: 'rgba(0,0,0,0.04) 0px 0px 0px 1px' }}
    >
      <div className="max-w-[1200px] mx-auto px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => onNavigate('landing')}
          className="font-display text-washed-black font-medium text-xl tracking-tight hover:opacity-70 transition-opacity"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Puzzled
        </button>

        {/* Center nav links */}
        <div className="hidden md:flex items-center gap-6">
          {[
            { label: 'Board', page: 'board' },
            { label: 'Dashboard', page: 'dashboard' },
            { label: 'Community', page: 'community' },
          ].map(({ label, page }) => (
            <button
              key={page}
              onClick={() => onNavigate(page)}
              className={`font-ui text-sm font-medium transition-colors ${
                currentPage === page
                  ? 'text-washed-black'
                  : 'text-dim-grey hover:text-washed-black'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {projectName && (
            <span
              className="hidden md:inline-flex items-center gap-1.5 text-xs font-medium text-dim-grey bg-beige px-3 py-1.5 rounded-tag"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-energy-gold inline-block" />
              {projectName}
            </span>
          )}
          <button
            onClick={() => onNavigate('dashboard')}
            className="text-sm font-medium text-washed-black underline-offset-2 hover:underline transition-all"
          >
            Dashboard →
          </button>
        </div>
      </div>
    </nav>
  );
}
