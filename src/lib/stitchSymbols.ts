export interface StitchSymbol {
  id: string;
  name: string;
  symbol: string;
  description: string;
  category: string;
  /** Number of grid cells this stitch spans horizontally. Defaults to 1. */
  span: number;
}

export const STITCH_SYMBOLS: StitchSymbol[] = [
  // Basic (span 1) — includes slips and tbl
  { id: "knit", name: "Knit", symbol: " ", description: "Knit stitch (empty square)", category: "Basic", span: 1 },
  { id: "purl", name: "Purl", symbol: "–", description: "Purl stitch", category: "Basic", span: 1 },
  { id: "yo", name: "Yarn Over", symbol: "O", description: "Yarn over (increase)", category: "Basic", span: 1 },
  { id: "none", name: "No Stitch", symbol: "▧", description: "No stitch (gray placeholder for shaping)", category: "Basic", span: 1 },
  { id: "sl-wyif", name: "Sl wyif", symbol: "V̄", description: "Slip with yarn in front", category: "Basic", span: 1 },
  { id: "sl-wyib", name: "Sl wyib", symbol: "V̬", description: "Slip with yarn in back", category: "Basic", span: 1 },
  { id: "ktbl", name: "K1tbl", symbol: "Ω", description: "Knit through back loop", category: "Basic", span: 1 },
  { id: "ptbl", name: "P1tbl", symbol: "Ω̣", description: "Purl through back loop", category: "Basic", span: 1 },

  // Increases (span 1)
  { id: "m1l", name: "M1L", symbol: "ML", description: "Make 1 left (left-leaning increase)", category: "Increase", span: 1 },
  { id: "m1r", name: "M1R", symbol: "MR", description: "Make 1 right (right-leaning increase)", category: "Increase", span: 1 },
  { id: "kfb", name: "KFB", symbol: "KFB", description: "Knit front and back (increase)", category: "Increase", span: 1 },
  { id: "pfb", name: "PFB", symbol: "PFB", description: "Purl front and back (increase)", category: "Increase", span: 1 },
  { id: "m1lp", name: "M1LP", symbol: "MLP", description: "Make 1 left purl", category: "Increase", span: 1 },
  { id: "m1rp", name: "M1RP", symbol: "MRP", description: "Make 1 right purl", category: "Increase", span: 1 },

  // Decreases (span 1)
  { id: "k2tog", name: "K2tog", symbol: "⟋", description: "Knit 2 together (right-leaning decrease)", category: "Decrease", span: 1 },
  { id: "ssk", name: "SSK", symbol: "⟍", description: "Slip slip knit (left-leaning decrease)", category: "Decrease", span: 1 },
  { id: "p2tog", name: "P2tog", symbol: "⟋̣", description: "Purl 2 together", category: "Decrease", span: 1 },
  { id: "s2kp", name: "S2KP", symbol: "⋀", description: "Slip 2, knit 1, pass slipped stitches over (centered double decrease)", category: "Decrease", span: 1 },
  { id: "sk2p", name: "SK2P", symbol: "⋏", description: "Slip 1, knit 2 together, pass slipped stitch over", category: "Decrease", span: 1 },
  { id: "k3tog", name: "K3tog", symbol: "⫻", description: "Knit 3 together (double decrease)", category: "Decrease", span: 1 },
  { id: "sssk", name: "SSSK", symbol: "⫽", description: "Slip slip slip knit (left-leaning double decrease)", category: "Decrease", span: 1 },
  { id: "cdd", name: "CDD", symbol: "△", description: "Central double decrease", category: "Decrease", span: 1 },
  

  // Texture (span 1)
  { id: "bobble", name: "Bobble", symbol: "●", description: "Bobble stitch", category: "Texture", span: 1 },
  { id: "popcorn", name: "Popcorn", symbol: "◆", description: "Popcorn stitch (5-st cluster)", category: "Texture", span: 1 },
  { id: "nupp", name: "Nupp", symbol: "◇", description: "Nupp (small raised bump)", category: "Texture", span: 1 },
  { id: "trinity", name: "Trinity", symbol: "⊛", description: "Trinity / bramble stitch", category: "Texture", span: 1 },
  
  
  { id: "yo2", name: "Double YO", symbol: "OO", description: "Double yarn over (creates larger hole)", category: "Texture", span: 1 },

  // Cables (multi-cell spans)
  { id: "c2f", name: "C2F", symbol: "⤬", description: "1/1 Left Cross: slip 1 to CN front, K1, K1 from CN", category: "Cable", span: 2 },
  { id: "c2b", name: "C2B", symbol: "⤫", description: "1/1 Right Cross: slip 1 to CN back, K1, K1 from CN", category: "Cable", span: 2 },
  { id: "t2f", name: "T2F", symbol: "⧸", description: "1/1 Left Twist: slip 1 to CN front, P1, K1 from CN", category: "Cable", span: 2 },
  { id: "t2b", name: "T2B", symbol: "⧹", description: "1/1 Right Twist: slip 1 to CN back, K1, P1 from CN", category: "Cable", span: 2 },
  { id: "c3f", name: "C3F", symbol: "⤬₃", description: "1/2 Left Cross: slip 1 to CN front, K2, K1 from CN", category: "Cable", span: 3 },
  { id: "c3b", name: "C3B", symbol: "⤫₃", description: "2/1 Right Cross: slip 2 to CN back, K1, K2 from CN", category: "Cable", span: 3 },
  { id: "t3f", name: "T3F", symbol: "⧸₃", description: "1/2 Left Purl Cross: slip 1 to CN front, P2, K1 from CN", category: "Cable", span: 3 },
  { id: "t3b", name: "T3B", symbol: "⧹₃", description: "2/1 Right Purl Cross: slip 2 to CN back, K1, P2 from CN", category: "Cable", span: 3 },
  { id: "c4f", name: "C4F", symbol: "╲╱", description: "2/2 Left Cross: slip 2 to CN front, K2, K2 from CN", category: "Cable", span: 4 },
  { id: "c4b", name: "C4B", symbol: "╱╲", description: "2/2 Right Cross: slip 2 to CN back, K2, K2 from CN", category: "Cable", span: 4 },
  { id: "c4fp", name: "C4FP", symbol: "╲╱̣", description: "2/2 Left Purl Cross: slip 2 to CN front, P2, K2 from CN", category: "Cable", span: 4 },
  { id: "c4bp", name: "C4BP", symbol: "╱╲̣", description: "2/2 Right Purl Cross: slip 2 to CN back, K2, P2 from CN", category: "Cable", span: 4 },
  { id: "c6f", name: "C6F", symbol: "⟋⟍", description: "3/3 Left Cross: slip 3 to CN front, K3, K3 from CN", category: "Cable", span: 6 },
  { id: "c6b", name: "C6B", symbol: "⟍⟋", description: "3/3 Right Cross: slip 3 to CN back, K3, K3 from CN", category: "Cable", span: 6 },

  // Colorwork (span 1)
  { id: "mc", name: "MC", symbol: "M", description: "Main color marker", category: "Colorwork", span: 1 },
  { id: "cc", name: "CC", symbol: "C", description: "Contrast color marker", category: "Colorwork", span: 1 },
  { id: "cc2", name: "CC2", symbol: "C₂", description: "Contrast color 2 marker", category: "Colorwork", span: 1 },

  // Brioche — basic (span 1)
  { id: "brk", name: "BRK", symbol: "⊓", description: "Brioche knit (RS: brk, WS: brp)", category: "Brioche", span: 1 },
  { id: "brp", name: "BRP", symbol: "⊔", description: "Brioche purl (RS: brp, WS: brk)", category: "Brioche", span: 1 },
  { id: "sl1yo", name: "Sl1yo", symbol: "‖", description: "YF slip 1, yarn over (brioche setup)", category: "Brioche", span: 1 },
  { id: "sl1yo-plus", name: "Sl1yo+", symbol: "‖·", description: "YF slip 1, yarn over plus (enhanced setup)", category: "Brioche", span: 1 },
  { id: "sl2yo", name: "Sl2yo", symbol: "‖‖", description: "YF slip 1, double yarn over", category: "Brioche", span: 1 },
  { id: "brk-tbl", name: "BRK tbl", symbol: "Ω̃", description: "Brioche knit through back loop", category: "Brioche", span: 1 },

  // Brioche — decreases (span 1)
  { id: "brk2tog", name: "BRK2tog", symbol: "⟋̃", description: "Brioche knit 2 together (RS: brk2tog, WS: brp2tog)", category: "Brioche", span: 1 },
  { id: "brssk", name: "BRSSK", symbol: "⟍̃", description: "Brioche SSK (RS: brssk, WS: brssp)", category: "Brioche", span: 1 },
  { id: "brk3tog", name: "BRK3tog", symbol: "⟋̃₃", description: "Brioche knit 3 together (RS: brk3tog, WS: brp3tog)", category: "Brioche", span: 1 },
  { id: "brsssk", name: "BRSSSK", symbol: "⟍̃₃", description: "Brioche SSSK (RS: brsssk, WS: brsssp)", category: "Brioche", span: 1 },
  { id: "brcdd", name: "BRCDD", symbol: "⋀̃", description: "Brioche central double decrease (RS: brcdd, WS: brcdd purl)", category: "Brioche", span: 1 },
  { id: "brcdd-p", name: "BRCDD purl", symbol: "⋀̃·", description: "Brioche CDD purl (RS: brcdd purl, WS: brcdd)", category: "Brioche", span: 1 },
  { id: "brp2tog", name: "BRP2tog", symbol: "⟋̤", description: "Brioche purl 2 together (RS: brp2tog, WS: brk2tog)", category: "Brioche", span: 1 },
  { id: "brssp", name: "BRSSP", symbol: "⟍̤", description: "Brioche SSP (RS: brssp, WS: brssk)", category: "Brioche", span: 1 },
  { id: "brp3tog", name: "BRP3tog", symbol: "⟋̤₃", description: "Brioche purl 3 together (RS: brp3tog, WS: brk3tog)", category: "Brioche", span: 1 },
  { id: "brsssp", name: "BRSSSP", symbol: "⟍̤₃", description: "Brioche SSSP (RS: brsssp, WS: brsssk)", category: "Brioche", span: 1 },

  // Brioche — increases (span 1)
  { id: "brkyobrk", name: "BRKyoBRK", symbol: "⊓⊓", description: "Brioche knit, yarn over, brioche knit (1-to-3 increase)", category: "Brioche", span: 1 },
  { id: "br4st-inc", name: "BR 4st inc", symbol: "⊓⊓⊓⊓", description: "Brioche 4-stitch increase", category: "Brioche", span: 1 },
];

export const STITCH_CATEGORIES = [...new Set(STITCH_SYMBOLS.map((s) => s.category))];

/** Get span for a stitch id */
export function getStitchSpan(stitchId: string): number {
  return STITCH_SYMBOLS.find((s) => s.id === stitchId)?.span ?? 1;
}

/**
 * Net stitch change produced by a stitch.
 * Decreases consume more stitches than they produce (negative).
 * Increases produce more stitches than they consume (positive).
 * Cables and normal stitches are net zero.
 */
export function getStitchNetChange(stitchId: string): number {
  // Double decreases: consume 3, produce 1 → net -2
  if (["s2kp", "sk2p", "k3tog", "sssk", "cdd", "brk3tog", "brsssk", "brp3tog", "brsssp", "brcdd", "brcdd-p"].includes(stitchId)) return -2;
  // Single decreases: consume 2, produce 1 → net -1
  if (["k2tog", "ssk", "p2tog", "brk2tog", "brssk", "brp2tog", "brssp"].includes(stitchId)) return -1;
  // Increases: produce 1 extra stitch → net +1
  if (["yo", "yo2", "m1l", "m1r", "kfb", "pfb", "m1lp", "m1rp"].includes(stitchId)) return +1;
  // Brioche increases
  if (stitchId === "brkyobrk") return +2;
  if (stitchId === "br4st-inc") return +3;
  // No stitch placeholder
  if (stitchId === "none") return 0;
  // Everything else (knit, purl, cables, slips, etc.): net 0
  return 0;
}

export interface CellData {
  color: string;
  stitchId: string;
  /** If this cell is part of a multi-cell stitch, this points to the starting column index */
  spanOwner?: number;
}
