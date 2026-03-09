import React from "react";

export interface StitchIconProps {
  size?: number;
  color?: string;
  /** For multi-cell stitches: total pixel width. If not set, uses size. */
  width?: number;
}

export type StitchRenderer = React.FC<StitchIconProps>;

const svgWrap = (w: number, h: number, vbW: number, vbH: number, children: React.ReactNode) => (
  <svg width={w} height={h} viewBox={`0 0 ${vbW} ${vbH}`} fill="none" xmlns="http://www.w3.org/2000/svg">
    {children}
  </svg>
);

// --- BASIC (24x24 viewBox) ---

const KnitIcon: StitchRenderer = () => null;

const PurlIcon: StitchRenderer = ({ size = 24, color = "currentColor" }) =>
  svgWrap(size, size, 24, 24, <circle cx="12" cy="12" r="5" fill={color} />);

const YarnOverIcon: StitchRenderer = ({ size = 24, color = "currentColor" }) =>
  svgWrap(size, size, 24, 24, <circle cx="12" cy="12" r="6" stroke={color} strokeWidth="2.5" />);

const BobbleIcon: StitchRenderer = ({ size = 24, color = "currentColor" }) =>
  svgWrap(size, size, 24, 24, (
    <>
      <circle cx="12" cy="10" r="4" fill={color} />
      <circle cx="8" cy="14" r="3" fill={color} />
      <circle cx="16" cy="14" r="3" fill={color} />
    </>
  ));

const SeedIcon: StitchRenderer = ({ size = 24, color = "currentColor" }) =>
  svgWrap(size, size, 24, 24, (
    <>
      <circle cx="8" cy="8" r="2.5" fill={color} />
      <circle cx="16" cy="16" r="2.5" fill={color} />
      <line x1="8" y1="16" x2="16" y2="8" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </>
  ));

// --- TEXTURE (24x24) ---

const PopcornIcon: StitchRenderer = ({ size = 24, color = "currentColor" }) =>
  svgWrap(size, size, 24, 24, (
    <>
      <path d="M6 16 C6 8, 12 4, 12 4 C12 4, 18 8, 18 16" stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <circle cx="12" cy="11" r="4" fill={color} />
    </>
  ));

const NuppIcon: StitchRenderer = ({ size = 24, color = "currentColor" }) =>
  svgWrap(size, size, 24, 24, (
    <>
      <ellipse cx="12" cy="12" rx="6" ry="4" stroke={color} strokeWidth="2" fill="none" />
      <circle cx="12" cy="12" r="2" fill={color} />
    </>
  ));

const TrinityIcon: StitchRenderer = ({ size = 24, color = "currentColor" }) =>
  svgWrap(size, size, 24, 24, (
    <>
      <circle cx="12" cy="8" r="3" fill={color} />
      <circle cx="7" cy="15" r="3" fill={color} />
      <circle cx="17" cy="15" r="3" fill={color} />
    </>
  ));

// --- LACE (24x24) ---

const Yo2Icon: StitchRenderer = ({ size = 24, color = "currentColor" }) =>
  svgWrap(size, size, 24, 24, (
    <>
      <circle cx="8" cy="12" r="5" stroke={color} strokeWidth="2" fill="none" />
      <circle cx="16" cy="12" r="5" stroke={color} strokeWidth="2" fill="none" />
    </>
  ));

const Sk2pIcon: StitchRenderer = ({ size = 24, color = "currentColor" }) =>
  svgWrap(size, size, 24, 24, (
    <>
      <path d="M4 20 L12 4 L20 20" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <line x1="8" y1="12" x2="16" y2="12" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </>
  ));

const EyeletIcon: StitchRenderer = ({ size = 24, color = "currentColor" }) =>
  svgWrap(size, size, 24, 24, (
    <>
      <circle cx="12" cy="12" r="7" stroke={color} strokeWidth="2" fill="none" />
      <circle cx="12" cy="12" r="3" stroke={color} strokeWidth="1.5" fill="none" />
    </>
  ));

const GatheredIcon: StitchRenderer = ({ size = 24, color = "currentColor" }) =>
  svgWrap(size, size, 24, 24, (
    <>
      <path d="M4 4 L12 20" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M12 4 L12 20" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M20 4 L12 20" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    </>
  ));

// --- COLORWORK (24x24) ---

const McIcon: StitchRenderer = ({ size = 24, color = "currentColor" }) =>
  svgWrap(size, size, 24, 24, (
    <text x="12" y="16" textAnchor="middle" fontSize="13" fontWeight="600" fontFamily="sans-serif" fill={color}>M</text>
  ));

const CcIcon: StitchRenderer = ({ size = 24, color = "currentColor" }) =>
  svgWrap(size, size, 24, 24, (
    <text x="12" y="16" textAnchor="middle" fontSize="13" fontWeight="600" fontFamily="sans-serif" fill={color}>C</text>
  ));

const Cc2Icon: StitchRenderer = ({ size = 24, color = "currentColor" }) =>
  svgWrap(size, size, 24, 24, (
    <>
      <text x="10" y="16" textAnchor="middle" fontSize="12" fontWeight="600" fontFamily="sans-serif" fill={color}>C</text>
      <text x="18" y="20" textAnchor="middle" fontSize="8" fontWeight="600" fontFamily="sans-serif" fill={color}>2</text>
    </>
  ));

// --- SLIP (24x24) ---

const SlWyifIcon: StitchRenderer = ({ size = 24, color = "currentColor" }) =>
  svgWrap(size, size, 24, 24, (
    <path d="M7 4 L12 20 L17 4" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  ));

const SlWyibIcon: StitchRenderer = ({ size = 24, color = "currentColor" }) =>
  svgWrap(size, size, 24, 24, (
    <>
      <path d="M7 4 L12 20 L17 4" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <line x1="5" y1="21" x2="19" y2="21" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    </>
  ));

// --- TBL (24x24) ---
// K1tbl: circular loop with two tails (left + right)
const KtblIcon: StitchRenderer = ({ size = 24, color = "currentColor" }) =>
  svgWrap(size, size, 24, 24, (
    <>
      <circle cx="12" cy="10" r="5.5" stroke={color} strokeWidth="2.5" fill="none" />
      <line x1="9" y1="14" x2="5.5" y2="20" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="15" y1="14" x2="18.5" y2="20" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    </>
  ));

// P1tbl: same loop with purl dot inside
const PtblIcon: StitchRenderer = ({ size = 24, color = "currentColor" }) =>
  svgWrap(size, size, 24, 24, (
    <>
      <circle cx="12" cy="10" r="5.5" stroke={color} strokeWidth="2.5" fill="none" />
      <line x1="9" y1="14" x2="5.5" y2="20" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="15" y1="14" x2="18.5" y2="20" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="12" cy="10" r="2.2" fill={color} />
    </>
  ));

// --- DECREASES (24x24) ---

const K2togIcon: StitchRenderer = ({ size = 24, color = "currentColor" }) =>
  svgWrap(size, size, 24, 24, <path d="M6 20 L18 4" stroke={color} strokeWidth="2.5" strokeLinecap="round" />);

const SskIcon: StitchRenderer = ({ size = 24, color = "currentColor" }) =>
  svgWrap(size, size, 24, 24, <path d="M18 20 L6 4" stroke={color} strokeWidth="2.5" strokeLinecap="round" />);

const P2togIcon: StitchRenderer = ({ size = 24, color = "currentColor" }) =>
  svgWrap(size, size, 24, 24, (
    <>
      <path d="M6 20 L18 4" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="12" cy="19" r="2" fill={color} />
    </>
  ));

const S2kpIcon: StitchRenderer = ({ size = 24, color = "currentColor" }) =>
  svgWrap(size, size, 24, 24,
    <path d="M4 20 L12 4 L20 20" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  );

const K3togIcon: StitchRenderer = ({ size = 24, color = "currentColor" }) =>
  svgWrap(size, size, 24, 24, (
    <>
      <path d="M4 20 L12 4" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M20 20 L12 4" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    </>
  ));

const SsskIcon: StitchRenderer = ({ size = 24, color = "currentColor" }) =>
  svgWrap(size, size, 24, 24, (
    <>
      <path d="M4 20 L12 4" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M20 20 L12 4" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="4" y1="20" x2="20" y2="20" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </>
  ));

const CddIcon: StitchRenderer = ({ size = 24, color = "currentColor" }) =>
  svgWrap(size, size, 24, 24, (
    <>
      <path d="M4 20 L12 4 L20 20" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <line x1="12" y1="4" x2="12" y2="20" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </>
  ));

// --- INCREASES (24x24) ---
// Letter-based markers per AllFreeKnitting standard

const M1lIcon: StitchRenderer = ({ size = 24, color = "currentColor" }) =>
  svgWrap(size, size, 24, 24, (
    <text x="12" y="16.5" textAnchor="middle" fontSize="11" fontWeight="700" fontFamily="sans-serif" fill={color}>ML</text>
  ));

const M1rIcon: StitchRenderer = ({ size = 24, color = "currentColor" }) =>
  svgWrap(size, size, 24, 24, (
    <text x="12" y="16.5" textAnchor="middle" fontSize="11" fontWeight="700" fontFamily="sans-serif" fill={color}>MR</text>
  ));

// KFB: letter-based marker for clarity
const KfbIcon: StitchRenderer = ({ size = 24, color = "currentColor" }) =>
  svgWrap(size, size, 24, 24, (
    <text x="12" y="16.5" textAnchor="middle" fontSize="10" fontWeight="700" fontFamily="sans-serif" fill={color}>KFB</text>
  ));

// PFB: letter-based marker
const PfbIcon: StitchRenderer = ({ size = 24, color = "currentColor" }) =>
  svgWrap(size, size, 24, 24, (
    <text x="12" y="16.5" textAnchor="middle" fontSize="10" fontWeight="700" fontFamily="sans-serif" fill={color}>PFB</text>
  ));

const M1lpIcon: StitchRenderer = ({ size = 24, color = "currentColor" }) =>
  svgWrap(size, size, 24, 24, (
    <text x="12" y="16" textAnchor="middle" fontSize="8.5" fontWeight="700" fontFamily="sans-serif" fill={color}>MLP</text>
  ));

const M1rpIcon: StitchRenderer = ({ size = 24, color = "currentColor" }) =>
  svgWrap(size, size, 24, 24, (
    <text x="12" y="16" textAnchor="middle" fontSize="8.5" fontWeight="700" fontFamily="sans-serif" fill={color}>MRP</text>
  ));

// --- CABLES ---
// Standard knitting chart cable symbols: thick bars with outline (stroke) and white fill,
// crossing in an elongated X. The "front/over" strand is drawn on top.
// ViewBox uses span*24 width x 24 height.

/**
 * Generic cable icon builder.
 * Draws two groups of diagonal bars crossing. The "over" group is rendered last (on top).
 * Each bar is a thick line with a white/light fill center and dark outline.
 */
function CableIcon({
  size = 24,
  color = "currentColor",
  width,
  span,
  isFront,
  isSimpleTwist = false,
}: StitchIconProps & { span: number; isFront: boolean; isSimpleTwist?: boolean }) {
  const w = width || size;
  const vbW = span * 24;
  const vbH = 24;
  const halfSpan = span / 2;
  const barWidth = 4.5; // thickness of each strand bar
  const outlineWidth = 1.8;
  const pad = 3;

  // For simple twists (T2F/T2B), just one strand crossing
  if (isSimpleTwist) {
    return svgWrap(w, size, vbW, vbH, (
      <>
        {/* Single diagonal bar */}
        <line
          x1={isFront ? pad : vbW - pad} y1={vbH - pad}
          x2={isFront ? vbW - pad : pad} y2={pad}
          stroke={color} strokeWidth={barWidth} strokeLinecap="round"
        />
      </>
    ));
  }

  // Generate strand positions for each half
  const strands: { x1: number; x2: number }[] = [];
  const cellW = vbW / span;
  for (let i = 0; i < halfSpan; i++) {
    strands.push({
      x1: cellW * i + cellW / 2,      // bottom position (left half)
      x2: cellW * (i + halfSpan) + cellW / 2, // top position (right half)
    });
  }

  // Left-to-right strands (bottom-left to top-right)
  const lrStrands = strands.map(s => ({
    x1: s.x1, y1: vbH - pad,
    x2: s.x2, y2: pad,
  }));

  // Right-to-left strands (bottom-right to top-left)
  const rlStrands = strands.map(s => ({
    x1: vbW - s.x1, y1: vbH - pad,
    x2: vbW - s.x2, y2: pad,
  }));

  // "Front" cross = left stitches go over right = LR strands on top
  // "Back" cross = right stitches go over left = RL strands on top
  const underStrands = isFront ? rlStrands : lrStrands;
  const overStrands = isFront ? lrStrands : rlStrands;

  return svgWrap(w, size, vbW, vbH, (
    <>
      {/* Under strands: draw with a gap at center by clipping */}
      {underStrands.map((s, i) => (
        <g key={`under-${i}`}>
          {/* White knockout behind under strand for clean gap */}
          <line x1={s.x1} y1={s.y1} x2={s.x2} y2={s.y2}
            stroke="white" strokeWidth={barWidth + outlineWidth * 2 + 2} strokeLinecap="round" />
          {/* Under strand: two segments with gap at crossing */}
          <line x1={s.x1} y1={s.y1}
            x2={(s.x1 + s.x2) / 2 + (isFront ? 2 : -2)} y2={(s.y1 + s.y2) / 2 + 0.5}
            stroke={color} strokeWidth={barWidth} strokeLinecap="round" />
          <line x1={(s.x1 + s.x2) / 2 + (isFront ? -2 : 2)} y1={(s.y1 + s.y2) / 2 - 0.5}
            x2={s.x2} y2={s.y2}
            stroke={color} strokeWidth={barWidth} strokeLinecap="round" />
        </g>
      ))}
      {/* Over strands: continuous, drawn on top */}
      {overStrands.map((s, i) => (
        <g key={`over-${i}`}>
          {/* White border/outline effect */}
          <line x1={s.x1} y1={s.y1} x2={s.x2} y2={s.y2}
            stroke="white" strokeWidth={barWidth + outlineWidth * 2} strokeLinecap="round" />
          {/* The dark strand itself */}
          <line x1={s.x1} y1={s.y1} x2={s.x2} y2={s.y2}
            stroke={color} strokeWidth={barWidth} strokeLinecap="round" />
        </g>
      ))}
    </>
  ));
}

const C2fIcon: StitchRenderer = (props) => <CableIcon {...props} span={2} isFront={true} />;
const C2bIcon: StitchRenderer = (props) => <CableIcon {...props} span={2} isFront={false} />;
const T2fIcon: StitchRenderer = (props) => <CableIcon {...props} span={2} isFront={true} isSimpleTwist />;
const T2bIcon: StitchRenderer = (props) => <CableIcon {...props} span={2} isFront={false} isSimpleTwist />;
const C3fIcon: StitchRenderer = (props) => <CableIcon {...props} span={3} isFront={true} />;
const C3bIcon: StitchRenderer = (props) => <CableIcon {...props} span={3} isFront={false} />;
const T3fIcon: StitchRenderer = (props) => <CableIcon {...props} span={3} isFront={true} isSimpleTwist />;
const T3bIcon: StitchRenderer = (props) => <CableIcon {...props} span={3} isFront={false} isSimpleTwist />;
const C4fIcon: StitchRenderer = (props) => <CableIcon {...props} span={4} isFront={true} />;
const C4bIcon: StitchRenderer = (props) => <CableIcon {...props} span={4} isFront={false} />;
const C4fpIcon: StitchRenderer = (props) => <CableIcon {...props} span={4} isFront={true} isSimpleTwist />;
const C4bpIcon: StitchRenderer = (props) => <CableIcon {...props} span={4} isFront={false} isSimpleTwist />;
const C6fIcon: StitchRenderer = (props) => <CableIcon {...props} span={6} isFront={true} />;
const C6bIcon: StitchRenderer = (props) => <CableIcon {...props} span={6} isFront={false} />;

export const NO_STITCH_COLOR = "#C8C4BE";

const NoneIcon: StitchRenderer = ({ size = 24 }) =>
  svgWrap(size, size, 24, 24, (
    <>
      <line x1="4" y1="4" x2="20" y2="20" stroke="#9E9A94" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="4" y1="20" x2="20" y2="4" stroke="#9E9A94" strokeWidth="1.5" strokeLinecap="round" />
    </>
  ));

// --- BRIOCHE (24x24) ---
// Based on standard brioche knitting chart symbols

// BRK: Open arch/dome (∩ shape)
const BrkIcon: StitchRenderer = ({ size = 24, color = "currentColor" }) =>
  svgWrap(size, size, 24, 24, (
    <path d="M5 20 C5 8, 12 4, 12 4 C12 4, 19 8, 19 20" stroke={color} strokeWidth="2.5" strokeLinecap="round" fill="none" />
  ));

// BRP: Arch with filled dot (purl indicator)
const BrpIcon: StitchRenderer = ({ size = 24, color = "currentColor" }) =>
  svgWrap(size, size, 24, 24, (
    <>
      <path d="M5 20 C5 8, 12 4, 12 4 C12 4, 19 8, 19 20" stroke={color} strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <circle cx="12" cy="13" r="2.5" fill={color} />
    </>
  ));

// Sl1yo: Two vertical parallel lines
const Sl1yoIcon: StitchRenderer = ({ size = 24, color = "currentColor" }) =>
  svgWrap(size, size, 24, 24, (
    <>
      <line x1="9" y1="4" x2="9" y2="20" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="15" y1="4" x2="15" y2="20" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    </>
  ));

// Sl1yo plus: Two vertical lines with dot
const Sl1yoPlusIcon: StitchRenderer = ({ size = 24, color = "currentColor" }) =>
  svgWrap(size, size, 24, 24, (
    <>
      <line x1="8" y1="4" x2="8" y2="20" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="16" y1="4" x2="16" y2="20" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="16" cy="12" r="2" fill={color} />
    </>
  ));

// Sl2yo: Two vertical lines spaced wider
const Sl2yoIcon: StitchRenderer = ({ size = 24, color = "currentColor" }) =>
  svgWrap(size, size, 24, 24, (
    <>
      <line x1="6" y1="4" x2="6" y2="20" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="18" y1="4" x2="18" y2="20" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    </>
  ));

// BRK tbl: Loop/omega shape
const BrkTblIcon: StitchRenderer = ({ size = 24, color = "currentColor" }) =>
  svgWrap(size, size, 24, 24, (
    <>
      <path d="M5 4 L5 12 C5 18, 12 20, 12 20 C12 20, 19 18, 19 12 L19 4" stroke={color} strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <circle cx="12" cy="10" r="3" stroke={color} strokeWidth="2" fill="none" />
    </>
  ));

// BRK2tog: Left-leaning diagonal with small hook at top
const Brk2togIcon: StitchRenderer = ({ size = 24, color = "currentColor" }) =>
  svgWrap(size, size, 24, 24, (
    <>
      <line x1="6" y1="20" x2="16" y2="4" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M16 4 C16 4, 18 5, 18 8" stroke={color} strokeWidth="2.5" strokeLinecap="round" fill="none" />
    </>
  ));

// BRSSK: Right-leaning diagonal with hook
const BrsskIcon: StitchRenderer = ({ size = 24, color = "currentColor" }) =>
  svgWrap(size, size, 24, 24, (
    <>
      <line x1="18" y1="20" x2="8" y2="4" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M8 4 C8 4, 6 5, 6 8" stroke={color} strokeWidth="2.5" strokeLinecap="round" fill="none" />
    </>
  ));

// BRK3tog: Two left-leaning lines converging
const Brk3togIcon: StitchRenderer = ({ size = 24, color = "currentColor" }) =>
  svgWrap(size, size, 24, 24, (
    <>
      <line x1="4" y1="20" x2="14" y2="4" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="12" y1="20" x2="16" y2="4" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M15 4 C15 4, 18 5, 19 8" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none" />
    </>
  ));

// BRSSSK: Two right-leaning lines converging
const BrssskIcon: StitchRenderer = ({ size = 24, color = "currentColor" }) =>
  svgWrap(size, size, 24, 24, (
    <>
      <line x1="20" y1="20" x2="10" y2="4" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="12" y1="20" x2="8" y2="4" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M9 4 C9 4, 6 5, 5 8" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none" />
    </>
  ));

// BRCDD: Two diagonals meeting at center top (∧ with hooks)
const BrcddIcon: StitchRenderer = ({ size = 24, color = "currentColor" }) =>
  svgWrap(size, size, 24, 24, (
    <>
      <line x1="4" y1="20" x2="12" y2="5" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="20" y1="20" x2="12" y2="5" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    </>
  ));

// BRCDD purl: Same as BRCDD but with filled dot
const BrcddPIcon: StitchRenderer = ({ size = 24, color = "currentColor" }) =>
  svgWrap(size, size, 24, 24, (
    <>
      <line x1="4" y1="20" x2="12" y2="5" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="20" y1="20" x2="12" y2="5" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="12" cy="5" r="2.5" fill={color} />
    </>
  ));

// BRP2tog: Left-leaning with filled square indicator
const Brp2togIcon: StitchRenderer = ({ size = 24, color = "currentColor" }) =>
  svgWrap(size, size, 24, 24, (
    <>
      <rect x="2" y="2" width="20" height="20" rx="2" stroke={color} strokeWidth="1.5" fill="none" />
      <line x1="6" y1="20" x2="16" y2="4" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M16 4 C16 4, 18 5, 18 8" stroke={color} strokeWidth="2.5" strokeLinecap="round" fill="none" />
    </>
  ));

// BRSSP: Right-leaning with box
const BrsspIcon: StitchRenderer = ({ size = 24, color = "currentColor" }) =>
  svgWrap(size, size, 24, 24, (
    <>
      <rect x="2" y="2" width="20" height="20" rx="2" stroke={color} strokeWidth="1.5" fill="none" />
      <line x1="18" y1="20" x2="8" y2="4" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M8 4 C8 4, 6 5, 6 8" stroke={color} strokeWidth="2.5" strokeLinecap="round" fill="none" />
    </>
  ));

// BRP3tog: Triple left-leaning with box
const Brp3togIcon: StitchRenderer = ({ size = 24, color = "currentColor" }) =>
  svgWrap(size, size, 24, 24, (
    <>
      <rect x="2" y="2" width="20" height="20" rx="2" stroke={color} strokeWidth="1.5" fill="none" />
      <line x1="4" y1="20" x2="14" y2="4" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="12" y1="20" x2="16" y2="4" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M15 4 C15 4, 18 5, 19 8" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none" />
    </>
  ));

// BRSSSP: Triple right-leaning with box
const BrssspIcon: StitchRenderer = ({ size = 24, color = "currentColor" }) =>
  svgWrap(size, size, 24, 24, (
    <>
      <rect x="2" y="2" width="20" height="20" rx="2" stroke={color} strokeWidth="1.5" fill="none" />
      <line x1="20" y1="20" x2="10" y2="4" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="12" y1="20" x2="8" y2="4" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M9 4 C9 4, 6 5, 5 8" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none" />
    </>
  ));

// BRKyoBRK: Two arches side by side (1-to-3 increase)
const BrkyobrkIcon: StitchRenderer = ({ size = 24, color = "currentColor" }) =>
  svgWrap(size, size, 24, 24, (
    <>
      <path d="M2 20 C2 10, 8 6, 8 6 C8 6, 14 10, 14 20" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M10 20 C10 10, 16 6, 16 6 C16 6, 22 10, 22 20" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none" />
    </>
  ));

// BR 4st inc: Four small arches
const Br4stIncIcon: StitchRenderer = ({ size = 24, color = "currentColor" }) =>
  svgWrap(size, size, 24, 24, (
    <>
      <path d="M1 20 C1 12, 4 8, 4 8 C4 8, 7 12, 7 20" stroke={color} strokeWidth="1.8" strokeLinecap="round" fill="none" />
      <path d="M6 20 C6 12, 9 8, 9 8 C9 8, 12 12, 12 20" stroke={color} strokeWidth="1.8" strokeLinecap="round" fill="none" />
      <path d="M11 20 C11 12, 14 8, 14 8 C14 8, 17 12, 17 20" stroke={color} strokeWidth="1.8" strokeLinecap="round" fill="none" />
      <path d="M16 20 C16 12, 19 8, 19 8 C19 8, 22 12, 22 20" stroke={color} strokeWidth="1.8" strokeLinecap="round" fill="none" />
    </>
  ));

// Registry
export const STITCH_ICON_MAP: Record<string, StitchRenderer> = {
  none: NoneIcon,
  knit: KnitIcon,
  purl: PurlIcon,
  yo: YarnOverIcon,
  bobble: BobbleIcon,
  seed: SeedIcon,
  popcorn: PopcornIcon,
  nupp: NuppIcon,
  trinity: TrinityIcon,
  "sl-wyif": SlWyifIcon,
  "sl-wyib": SlWyibIcon,
  ktbl: KtblIcon,
  ptbl: PtblIcon,
  k2tog: K2togIcon,
  ssk: SskIcon,
  p2tog: P2togIcon,
  s2kp: S2kpIcon,
  k3tog: K3togIcon,
  sssk: SsskIcon,
  cdd: CddIcon,
  m1l: M1lIcon,
  m1r: M1rIcon,
  kfb: KfbIcon,
  pfb: PfbIcon,
  m1lp: M1lpIcon,
  m1rp: M1rpIcon,
  c2f: C2fIcon,
  c2b: C2bIcon,
  t2f: T2fIcon,
  t2b: T2bIcon,
  c3f: C3fIcon,
  c3b: C3bIcon,
  t3f: T3fIcon,
  t3b: T3bIcon,
  c4f: C4fIcon,
  c4b: C4bIcon,
  c4fp: C4fpIcon,
  c4bp: C4bpIcon,
  c6f: C6fIcon,
  c6b: C6bIcon,
  yo2: Yo2Icon,
  sk2p: Sk2pIcon,
  eyelet: EyeletIcon,
  gathered: GatheredIcon,
  mc: McIcon,
  cc: CcIcon,
  cc2: Cc2Icon,
  brk: BrkIcon,
  brp: BrpIcon,
  sl1yo: Sl1yoIcon,
  "sl1yo-plus": Sl1yoPlusIcon,
  sl2yo: Sl2yoIcon,
  "brk-tbl": BrkTblIcon,
  brk2tog: Brk2togIcon,
  brssk: BrsskIcon,
  brk3tog: Brk3togIcon,
  brsssk: BrssskIcon,
  brcdd: BrcddIcon,
  "brcdd-p": BrcddPIcon,
  brp2tog: Brp2togIcon,
  brssp: BrsspIcon,
  brp3tog: Brp3togIcon,
  brsssp: BrssspIcon,
  brkyobrk: BrkyobrkIcon,
  "br4st-inc": Br4stIncIcon,
};

// For canvas export: draw stitch symbol onto a canvas context
// totalWidth = width in pixels for multi-cell stitches
export function drawStitchOnCanvas(
  ctx: CanvasRenderingContext2D,
  stitchId: string,
  x: number,
  y: number,
  cellSize: number,
  color: string,
  totalWidth?: number
) {
  const s = cellSize;
  const w = totalWidth || s;
  const cx = x + w / 2;
  const cy = y + s / 2;
  const pad = s * 0.15;

  ctx.save();
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = Math.max(1, s * 0.1);
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  switch (stitchId) {
    case "knit":
      break;
    case "none": {
      // Draw X pattern for no-stitch
      const nsPad = s * 0.15;
      ctx.strokeStyle = "#9E9A94";
      ctx.lineWidth = Math.max(1, s * 0.07);
      ctx.beginPath();
      ctx.moveTo(x + nsPad, y + nsPad);
      ctx.lineTo(x + w - nsPad, y + s - nsPad);
      ctx.moveTo(x + nsPad, y + s - nsPad);
      ctx.lineTo(x + w - nsPad, y + nsPad);
      ctx.stroke();
      break;
    }
    case "purl":
      ctx.beginPath();
      ctx.arc(cx, cy, s * 0.2, 0, Math.PI * 2);
      ctx.fill();
      break;
    case "yo":
      ctx.beginPath();
      ctx.arc(cx, cy, s * 0.25, 0, Math.PI * 2);
      ctx.stroke();
      break;
    case "bobble":
      ctx.beginPath(); ctx.arc(cx, cy - s * 0.08, s * 0.16, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(cx - s * 0.16, cy + s * 0.08, s * 0.12, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(cx + s * 0.16, cy + s * 0.08, s * 0.12, 0, Math.PI * 2); ctx.fill();
      break;
    case "seed":
      ctx.beginPath(); ctx.arc(cx - s * 0.16, cy - s * 0.16, s * 0.1, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(cx + s * 0.16, cy + s * 0.16, s * 0.1, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.moveTo(cx - s * 0.16, cy + s * 0.16); ctx.lineTo(cx + s * 0.16, cy - s * 0.16); ctx.stroke();
      break;
    case "sl-wyif":
      ctx.beginPath();
      ctx.moveTo(x + pad, y + pad); ctx.lineTo(cx, y + s - pad); ctx.lineTo(x + w - pad, y + pad);
      ctx.stroke();
      break;
    case "sl-wyib":
      ctx.beginPath();
      ctx.moveTo(x + pad, y + pad); ctx.lineTo(cx, y + s - pad); ctx.lineTo(x + w - pad, y + pad);
      ctx.stroke();
      ctx.beginPath(); ctx.moveTo(x + pad * 0.5, y + s - pad * 0.6); ctx.lineTo(x + w - pad * 0.5, y + s - pad * 0.6); ctx.stroke();
      break;
    case "k2tog":
      ctx.beginPath(); ctx.moveTo(x + pad, y + s - pad); ctx.lineTo(x + w - pad, y + pad); ctx.stroke();
      break;
    case "ssk":
      ctx.beginPath(); ctx.moveTo(x + w - pad, y + s - pad); ctx.lineTo(x + pad, y + pad); ctx.stroke();
      break;
    case "p2tog":
      ctx.beginPath(); ctx.moveTo(x + pad, y + s - pad); ctx.lineTo(x + w - pad, y + pad); ctx.stroke();
      ctx.beginPath(); ctx.arc(cx, y + s - pad, s * 0.08, 0, Math.PI * 2); ctx.fill();
      break;
    case "s2kp":
      ctx.beginPath(); ctx.moveTo(x + pad, y + s - pad); ctx.lineTo(cx, y + pad); ctx.lineTo(x + w - pad, y + s - pad); ctx.stroke();
      break;
    case "k3tog":
      ctx.beginPath(); ctx.moveTo(x + pad, y + s - pad); ctx.lineTo(cx, y + pad); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(x + w - pad, y + s - pad); ctx.lineTo(cx, y + pad); ctx.stroke();
      break;
    case "sssk":
      ctx.beginPath(); ctx.moveTo(x + pad, y + s - pad); ctx.lineTo(cx, y + pad); ctx.moveTo(x + w - pad, y + s - pad); ctx.lineTo(cx, y + pad); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(x + pad, y + s - pad); ctx.lineTo(x + w - pad, y + s - pad); ctx.stroke();
      break;
    case "cdd":
      ctx.beginPath(); ctx.moveTo(x + pad, y + s - pad); ctx.lineTo(cx, y + pad); ctx.lineTo(x + w - pad, y + s - pad); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(cx, y + pad); ctx.lineTo(cx, y + s - pad); ctx.stroke();
      break;
    case "m1l":
      ctx.font = `bold ${Math.max(8, s * 0.42)}px sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("ML", cx, cy);
      break;
    case "m1r":
      ctx.font = `bold ${Math.max(8, s * 0.42)}px sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("MR", cx, cy);
      break;
    case "kfb":
      ctx.font = `bold ${Math.max(7, s * 0.35)}px sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("KFB", cx, cy);
      break;
    case "pfb":
      ctx.font = `bold ${Math.max(7, s * 0.35)}px sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("PFB", cx, cy);
      break;
    case "m1lp":
      ctx.font = `bold ${Math.max(7, s * 0.32)}px sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("MLP", cx, cy);
      break;
    case "m1rp":
      ctx.font = `bold ${Math.max(7, s * 0.32)}px sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("MRP", cx, cy);
      break;
    case "ktbl": {
      // Circular loop + two tails (left/right)
      const loopY = cy - s * 0.08;
      const loopR = s * 0.22;
      ctx.beginPath(); ctx.arc(cx, loopY, loopR, 0, Math.PI * 2); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(cx - loopR * 0.55, loopY + loopR * 0.72); ctx.lineTo(x + pad * 0.6, y + s - pad); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(cx + loopR * 0.55, loopY + loopR * 0.72); ctx.lineTo(x + w - pad * 0.6, y + s - pad); ctx.stroke();
      break;
    }
    case "ptbl": {
      // Circular loop + two tails + purl dot
      const loopY = cy - s * 0.08;
      const loopR = s * 0.22;
      ctx.beginPath(); ctx.arc(cx, loopY, loopR, 0, Math.PI * 2); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(cx - loopR * 0.55, loopY + loopR * 0.72); ctx.lineTo(x + pad * 0.6, y + s - pad); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(cx + loopR * 0.55, loopY + loopR * 0.72); ctx.lineTo(x + w - pad * 0.6, y + s - pad); ctx.stroke();
      ctx.beginPath(); ctx.arc(cx, loopY, s * 0.08, 0, Math.PI * 2); ctx.fill();
      break;
    }
    // Texture stitches
    case "trinity": {
      ctx.beginPath(); ctx.arc(cx, cy - s * 0.15, s * 0.12, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(cx - s * 0.2, cy + s * 0.12, s * 0.12, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(cx + s * 0.2, cy + s * 0.12, s * 0.12, 0, Math.PI * 2); ctx.fill();
      break;
    }
    // Lace stitches
    case "yo2": {
      ctx.beginPath(); ctx.arc(cx - s * 0.16, cy, s * 0.2, 0, Math.PI * 2); ctx.stroke();
      ctx.beginPath(); ctx.arc(cx + s * 0.16, cy, s * 0.2, 0, Math.PI * 2); ctx.stroke();
      break;
    }
    case "sk2p": {
      ctx.beginPath(); ctx.moveTo(x + pad, y + s - pad); ctx.lineTo(cx, y + pad); ctx.lineTo(x + w - pad, y + s - pad); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(cx - s * 0.16, cy); ctx.lineTo(cx + s * 0.16, cy); ctx.stroke();
      break;
    }
    case "eyelet": {
      ctx.beginPath(); ctx.arc(cx, cy, s * 0.28, 0, Math.PI * 2); ctx.stroke();
      ctx.beginPath(); ctx.arc(cx, cy, s * 0.12, 0, Math.PI * 2); ctx.stroke();
      break;
    }
    case "gathered": {
      ctx.beginPath(); ctx.moveTo(x + pad, y + pad); ctx.lineTo(cx, y + s - pad); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(cx, y + pad); ctx.lineTo(cx, y + s - pad); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(x + w - pad, y + pad); ctx.lineTo(cx, y + s - pad); ctx.stroke();
      break;
    }
    // Colorwork markers (letter-based, subtle)
    case "mc": {
      ctx.font = `${Math.max(8, s * 0.45)}px sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("M", cx, cy);
      break;
    }
    case "cc": {
      ctx.font = `${Math.max(8, s * 0.45)}px sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("C", cx, cy);
      break;
    }
    case "cc2": {
      ctx.font = `${Math.max(8, s * 0.4)}px sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("C₂", cx, cy);
      break;
    }
    // Cables: elongated X with thick bars, white outline on under strands, over strands on top
    case "c2f":
    case "c2b":
    case "t2f":
    case "t2b":
    case "c3f":
    case "c3b":
    case "t3f":
    case "t3b":
    case "c4f":
    case "c4b":
    case "c4fp":
    case "c4bp":
    case "c6f":
    case "c6b": {
      const isFront = stitchId.endsWith("f") || stitchId.endsWith("fp");
      const isSimpleTwist = stitchId.startsWith("t") || stitchId.endsWith("fp") || stitchId.endsWith("bp");
      const span = stitchId.includes("6") ? 6 : stitchId.includes("4") ? 4 : stitchId.includes("3") ? 3 : 2;
      const halfSpan = span / 2;
      const cellW = w / span;
      const barW = Math.max(2, s * 0.2);
      const outW = Math.max(1, s * 0.08);

      if (isSimpleTwist) {
        ctx.beginPath();
        ctx.moveTo(isFront ? x + pad : x + w - pad, y + s - pad);
        ctx.lineTo(isFront ? x + w - pad : x + pad, y + pad);
        ctx.stroke();
      } else {
        // Build strand arrays
        const lrStrands: { x1: number; y1: number; x2: number; y2: number }[] = [];
        const rlStrands: { x1: number; y1: number; x2: number; y2: number }[] = [];
        for (let i = 0; i < halfSpan; i++) {
          const lx = x + cellW * i + cellW / 2;
          const rx = x + cellW * (i + halfSpan) + cellW / 2;
          lrStrands.push({ x1: lx, y1: y + s - pad, x2: rx, y2: y + pad });
          rlStrands.push({ x1: x + w - (lx - x), y1: y + s - pad, x2: x + w - (rx - x), y2: y + pad });
        }
        const underStrands = isFront ? rlStrands : lrStrands;
        const overStrands = isFront ? lrStrands : rlStrands;

        // Draw under strands with gap at center
        for (const st of underStrands) {
          const mx = (st.x1 + st.x2) / 2;
          const my2 = (st.y1 + st.y2) / 2;
          const gapOff = isFront ? 2 * (w / 48) : -2 * (w / 48);
          // White knockout
          ctx.strokeStyle = "white";
          ctx.lineWidth = barW + outW * 2 + 1;
          ctx.beginPath(); ctx.moveTo(st.x1, st.y1); ctx.lineTo(st.x2, st.y2); ctx.stroke();
          // Two segments with gap
          ctx.strokeStyle = color;
          ctx.lineWidth = barW;
          ctx.beginPath(); ctx.moveTo(st.x1, st.y1); ctx.lineTo(mx + gapOff, my2 + 0.5); ctx.stroke();
          ctx.beginPath(); ctx.moveTo(mx - gapOff, my2 - 0.5); ctx.lineTo(st.x2, st.y2); ctx.stroke();
        }
        // Draw over strands on top
        for (const st of overStrands) {
          ctx.strokeStyle = "white";
          ctx.lineWidth = barW + outW * 2;
          ctx.beginPath(); ctx.moveTo(st.x1, st.y1); ctx.lineTo(st.x2, st.y2); ctx.stroke();
          ctx.strokeStyle = color;
          ctx.lineWidth = barW;
          ctx.beginPath(); ctx.moveTo(st.x1, st.y1); ctx.lineTo(st.x2, st.y2); ctx.stroke();
        }
      }
      break;
    }
    // Brioche stitches
    case "brk": {
      // Open arch
      ctx.beginPath();
      ctx.moveTo(x + pad, y + s - pad);
      ctx.quadraticCurveTo(cx, y + pad, x + w - pad, y + s - pad);
      ctx.stroke();
      break;
    }
    case "brp": {
      // Arch with dot
      ctx.beginPath();
      ctx.moveTo(x + pad, y + s - pad);
      ctx.quadraticCurveTo(cx, y + pad, x + w - pad, y + s - pad);
      ctx.stroke();
      ctx.beginPath(); ctx.arc(cx, cy + s * 0.05, s * 0.1, 0, Math.PI * 2); ctx.fill();
      break;
    }
    case "sl1yo": {
      // Two vertical parallel lines
      const lx = cx - s * 0.12;
      const rx = cx + s * 0.12;
      ctx.beginPath(); ctx.moveTo(lx, y + pad); ctx.lineTo(lx, y + s - pad); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(rx, y + pad); ctx.lineTo(rx, y + s - pad); ctx.stroke();
      break;
    }
    case "sl1yo-plus": {
      const lx2 = cx - s * 0.15;
      const rx2 = cx + s * 0.15;
      ctx.beginPath(); ctx.moveTo(lx2, y + pad); ctx.lineTo(lx2, y + s - pad); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(rx2, y + pad); ctx.lineTo(rx2, y + s - pad); ctx.stroke();
      ctx.beginPath(); ctx.arc(rx2, cy, s * 0.08, 0, Math.PI * 2); ctx.fill();
      break;
    }
    case "sl2yo": {
      const lx3 = cx - s * 0.25;
      const rx3 = cx + s * 0.25;
      ctx.beginPath(); ctx.moveTo(lx3, y + pad); ctx.lineTo(lx3, y + s - pad); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(rx3, y + pad); ctx.lineTo(rx3, y + s - pad); ctx.stroke();
      break;
    }
    case "brk-tbl": {
      // Arch with loop
      ctx.beginPath();
      ctx.moveTo(x + pad, y + s - pad);
      ctx.quadraticCurveTo(cx, y + pad + s * 0.15, x + w - pad, y + s - pad);
      ctx.stroke();
      ctx.beginPath(); ctx.arc(cx, y + pad + s * 0.15, s * 0.12, 0, Math.PI * 2); ctx.stroke();
      break;
    }
    case "brk2tog": {
      ctx.beginPath(); ctx.moveTo(x + pad, y + s - pad); ctx.lineTo(x + w - pad * 2, y + pad); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(x + w - pad * 2, y + pad); ctx.quadraticCurveTo(x + w - pad, y + pad, x + w - pad, y + pad + s * 0.15); ctx.stroke();
      break;
    }
    case "brssk": {
      ctx.beginPath(); ctx.moveTo(x + w - pad, y + s - pad); ctx.lineTo(x + pad * 2, y + pad); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(x + pad * 2, y + pad); ctx.quadraticCurveTo(x + pad, y + pad, x + pad, y + pad + s * 0.15); ctx.stroke();
      break;
    }
    case "brk3tog": {
      ctx.beginPath(); ctx.moveTo(x + pad, y + s - pad); ctx.lineTo(x + w - pad * 2, y + pad); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(cx - s * 0.05, y + s - pad); ctx.lineTo(x + w - pad, y + pad); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(x + w - pad, y + pad); ctx.quadraticCurveTo(x + w, y + pad, x + w, y + pad + s * 0.15); ctx.stroke();
      break;
    }
    case "brsssk": {
      ctx.beginPath(); ctx.moveTo(x + w - pad, y + s - pad); ctx.lineTo(x + pad * 2, y + pad); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(cx + s * 0.05, y + s - pad); ctx.lineTo(x + pad, y + pad); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(x + pad, y + pad); ctx.quadraticCurveTo(x, y + pad, x, y + pad + s * 0.15); ctx.stroke();
      break;
    }
    case "brcdd": {
      ctx.beginPath(); ctx.moveTo(x + pad, y + s - pad); ctx.lineTo(cx, y + pad); ctx.lineTo(x + w - pad, y + s - pad); ctx.stroke();
      break;
    }
    case "brcdd-p": {
      ctx.beginPath(); ctx.moveTo(x + pad, y + s - pad); ctx.lineTo(cx, y + pad); ctx.lineTo(x + w - pad, y + s - pad); ctx.stroke();
      ctx.beginPath(); ctx.arc(cx, y + pad, s * 0.1, 0, Math.PI * 2); ctx.fill();
      break;
    }
    case "brp2tog": {
      ctx.strokeRect(x + 1, y + 1, w - 2, s - 2);
      ctx.beginPath(); ctx.moveTo(x + pad, y + s - pad); ctx.lineTo(x + w - pad * 2, y + pad); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(x + w - pad * 2, y + pad); ctx.quadraticCurveTo(x + w - pad, y + pad, x + w - pad, y + pad + s * 0.15); ctx.stroke();
      break;
    }
    case "brssp": {
      ctx.strokeRect(x + 1, y + 1, w - 2, s - 2);
      ctx.beginPath(); ctx.moveTo(x + w - pad, y + s - pad); ctx.lineTo(x + pad * 2, y + pad); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(x + pad * 2, y + pad); ctx.quadraticCurveTo(x + pad, y + pad, x + pad, y + pad + s * 0.15); ctx.stroke();
      break;
    }
    case "brp3tog": {
      ctx.strokeRect(x + 1, y + 1, w - 2, s - 2);
      ctx.beginPath(); ctx.moveTo(x + pad, y + s - pad); ctx.lineTo(x + w - pad * 2, y + pad); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(cx - s * 0.05, y + s - pad); ctx.lineTo(x + w - pad, y + pad); ctx.stroke();
      break;
    }
    case "brsssp": {
      ctx.strokeRect(x + 1, y + 1, w - 2, s - 2);
      ctx.beginPath(); ctx.moveTo(x + w - pad, y + s - pad); ctx.lineTo(x + pad * 2, y + pad); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(cx + s * 0.05, y + s - pad); ctx.lineTo(x + pad, y + pad); ctx.stroke();
      break;
    }
    case "brkyobrk": {
      // Two small arches
      const aw = w * 0.45;
      ctx.beginPath();
      ctx.moveTo(x + pad, y + s - pad);
      ctx.quadraticCurveTo(x + aw / 2 + pad, y + pad, x + aw, y + s - pad);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(x + w - aw, y + s - pad);
      ctx.quadraticCurveTo(x + w - aw / 2 - pad, y + pad, x + w - pad, y + s - pad);
      ctx.stroke();
      break;
    }
    case "br4st-inc": {
      // Four small arches
      const qw = w / 4;
      for (let i = 0; i < 4; i++) {
        const ax = x + qw * i;
        ctx.beginPath();
        ctx.moveTo(ax + 1, y + s - pad);
        ctx.quadraticCurveTo(ax + qw / 2, y + pad, ax + qw - 1, y + s - pad);
        ctx.stroke();
      }
      break;
    }
  }
  ctx.restore();
}
