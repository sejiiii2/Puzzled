import { useState } from 'react';

// Generates an SVG path for an interlocking puzzle piece
// Each side can be 'out' (tab protrudes), 'in' (notch cut in), or 'flat'
function puzzlePath(w, h, { top = 'flat', right = 'out', bottom = 'in', left = 'flat' } = {}) {
  const TAB_SIZE = 0.28; // tab width as fraction of side length
  const TAB_DEPTH = 0.22; // tab depth as fraction of opposite dimension

  // Draw horizontal tab centered on a side
  // dir: 'out' = protrudes away from piece center, 'in' = indents into piece
  // y: the y-coordinate of the side (0 for top, h for bottom)
  // direction of protrusion: negative y (up) for top, positive y (down) for bottom
  const hTab = (y, dir, facingUp) => {
    const mx = w / 2;
    const tabW = w * TAB_SIZE;
    const depthSign = facingUp ? -1 : 1; // top tab goes up (negative y), bottom goes down
    const dirSign = dir === 'out' ? 1 : -1;
    const depth = depthSign * dirSign * h * TAB_DEPTH;
    return (
      `L ${mx - tabW},${y} ` +
      `C ${mx - tabW},${y + depth} ${mx + tabW},${y + depth} ${mx + tabW},${y} `
    );
  };

  // Draw vertical tab centered on a side
  // x: x-coordinate of the side (0 for left, w for right)
  // facingRight: true for right side, false for left side
  const vTab = (x, dir, facingRight) => {
    const my = h / 2;
    const tabH = h * TAB_SIZE;
    const depthSign = facingRight ? 1 : -1; // right tab goes right (+x), left goes left (-x)
    const dirSign = dir === 'out' ? 1 : -1;
    const depth = depthSign * dirSign * w * TAB_DEPTH;
    return (
      `L ${x},${my - tabH} ` +
      `C ${x + depth},${my - tabH} ${x + depth},${my + tabH} ${x},${my + tabH} `
    );
  };

  let d = `M 0,0 `;

  // Top: left → right (y=0, protrudes up = facingUp:true)
  if (top === 'flat') {
    d += `L ${w},0 `;
  } else {
    d += `L ${w / 2 - w * TAB_SIZE},0 `;
    d += hTab(0, top, true);
    d += `L ${w},0 `;
  }

  // Right: top → bottom (x=w, protrudes right = facingRight:true)
  if (right === 'flat') {
    d += `L ${w},${h} `;
  } else {
    d += `L ${w},${h / 2 - h * TAB_SIZE} `;
    d += vTab(w, right, true);
    d += `L ${w},${h} `;
  }

  // Bottom: right → left (y=h, protrudes down = facingUp:false)
  if (bottom === 'flat') {
    d += `L 0,${h} `;
  } else {
    d += `L ${w / 2 + w * TAB_SIZE},${h} `;
    d += `C ${w / 2 + w * TAB_SIZE},${h + (bottom === 'out' ? 1 : -1) * h * TAB_DEPTH} ` +
         `${w / 2 - w * TAB_SIZE},${h + (bottom === 'out' ? 1 : -1) * h * TAB_DEPTH} ` +
         `${w / 2 - w * TAB_SIZE},${h} `;
    d += `L 0,${h} `;
  }

  // Left: bottom → top (x=0, protrudes left = facingRight:false)
  if (left === 'flat') {
    d += `L 0,0`;
  } else {
    d += `L 0,${h / 2 + h * TAB_SIZE} `;
    d += `C ${(left === 'out' ? -1 : 1) * w * TAB_DEPTH},${h / 2 + h * TAB_SIZE} ` +
         `${(left === 'out' ? -1 : 1) * w * TAB_DEPTH},${h / 2 - h * TAB_SIZE} ` +
         `0,${h / 2 - h * TAB_SIZE} `;
    d += `L 0,0`;
  }

  return d + ' Z';
}

// Interlocking configs for a 3-column grid
// Row 0: pieces 0,1,2 — flat top
// Row 1: pieces 3,4,5 — must match row 0 bottoms
// Row 2: pieces 6,7,8 — must match row 1 bottoms
const PIECE_CONFIGS = [
  // Row 0 (flat top)
  { top: 'flat', right: 'out',  bottom: 'out', left: 'flat' }, // 0: top-left
  { top: 'flat', right: 'out',  bottom: 'in',  left: 'in'   }, // 1: top-mid
  { top: 'flat', right: 'flat', bottom: 'out', left: 'in'   }, // 2: top-right
  // Row 1 (tops match row 0 bottoms)
  { top: 'in',   right: 'out',  bottom: 'in',  left: 'flat' }, // 3: mid-left
  { top: 'out',  right: 'in',   bottom: 'out', left: 'in'   }, // 4: mid-mid
  { top: 'in',   right: 'flat', bottom: 'in',  left: 'out'  }, // 5: mid-right
  // Row 2 (flat bottom)
  { top: 'out',  right: 'out',  bottom: 'flat', left: 'flat' }, // 6: bot-left
  { top: 'in',   right: 'out',  bottom: 'flat', left: 'in'  }, // 7: bot-mid
  { top: 'out',  right: 'flat', bottom: 'flat', left: 'in'  }, // 8: bot-right
  // Extra pieces if > 9
  { top: 'flat', right: 'in',   bottom: 'out', left: 'flat' }, // 9
];

const W = 148;
const H = 148;
const PAD = 36; // padding for protruding tabs

export default function PuzzlePiece({ tool, status, config: configProp, index = 0, onClick, justActivated }) {
  const [hovered, setHovered] = useState(false);
  const config = configProp ?? PIECE_CONFIGS[index % PIECE_CONFIGS.length];

  const viewW = W + PAD * 2;
  const viewH = H + PAD * 2;
  const path = puzzlePath(W, H, config);

  const isUnlocked = status === 'unlocked';

  const fillColor = isUnlocked
    ? (tool.brandColor || '#ffba09')
    : hovered ? '#e0ddd7' : '#f0f0ec';

  const strokeColor = isUnlocked ? 'none' : hovered ? '#1a1a1a' : '#d4d4d0';
  const strokeWidth = isUnlocked ? 0 : 1.5;

  return (
    <button
      className={`relative focus:outline-none ${justActivated ? 'animate-snap-in' : ''}`}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      title={tool.name}
      style={{
        width: W,
        height: H,
        background: 'none',
        border: 'none',
        padding: 0,
        cursor: 'pointer',
        position: 'relative',
        overflow: 'visible',
        zIndex: hovered ? 2 : 1,
      }}
    >
      <svg
        width={viewW}
        height={viewH}
        viewBox={`0 0 ${viewW} ${viewH}`}
        xmlns="http://www.w3.org/2000/svg"
        style={{
          position: 'absolute',
          left: -PAD,
          top: -PAD,
          overflow: 'visible',
          pointerEvents: 'none',
        }}
      >
        <defs>
          <filter id={`glow-${tool.id}`} x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="6" floodColor="rgba(0,0,0,0.12)" />
          </filter>
          <clipPath id={`clip-${tool.id}`}>
            <path d={path} transform={`translate(${PAD},${PAD})`} />
          </clipPath>
        </defs>

        <g transform={`translate(${PAD},${PAD})`}>
          {/* Piece fill */}
          <path
            d={path}
            fill={fillColor}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            style={{
              transition: 'fill 0.35s ease, stroke 0.15s ease',
              filter: isUnlocked ? `url(#glow-${tool.id})` : 'none',
            }}
          />

          {/* Logo */}
          <text
            x={W / 2}
            y={H / 2 - 8}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize={32}
            style={{
              opacity: isUnlocked ? 1 : 0.38,
              filter: isUnlocked ? 'none' : 'grayscale(100%)',
              transition: 'opacity 0.3s ease',
              userSelect: 'none',
            }}
          >
            {tool.logo}
          </text>

          {/* Name */}
          <text
            x={W / 2}
            y={H / 2 + 22}
            textAnchor="middle"
            dominantBaseline="middle"
            fontFamily="Inter, sans-serif"
            fontSize={11}
            fontWeight={600}
            fill={isUnlocked ? 'rgba(255,255,255,0.9)' : '#6d6868'}
            style={{ transition: 'fill 0.3s ease', userSelect: 'none' }}
          >
            {tool.name}
          </text>

          {/* Badge */}
          <g transform={`translate(${W / 2}, ${H - 18})`}>
            <rect
              x={-22}
              y={-10}
              width={44}
              height={20}
              rx={10}
              fill={isUnlocked ? '#000000' : '#e8e5df'}
              style={{ transition: 'fill 0.3s ease' }}
            />
            <text
              x={0}
              y={0}
              textAnchor="middle"
              dominantBaseline="middle"
              fontFamily="Inter, sans-serif"
              fontSize={9}
              fontWeight={700}
              letterSpacing={0.8}
              fill={isUnlocked ? '#ffffff' : '#6d6868'}
              style={{ userSelect: 'none', textTransform: 'uppercase' }}
            >
              {isUnlocked ? 'DONE' : hovered ? 'TRY →' : 'TRY'}
            </text>
          </g>
        </g>
      </svg>
    </button>
  );
}
