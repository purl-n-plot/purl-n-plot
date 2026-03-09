import { describe, it, expect } from "vitest";
import { CellData, getStitchSpan, getStitchNetChange } from "@/lib/stitchSymbols";

const DEFAULT_BG = "#F5F0EB";

function createEmptyCell(): CellData {
  return { color: DEFAULT_BG, stitchId: "knit" };
}

function createGrid(rows: number, cols: number): CellData[][] {
  return Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => createEmptyCell())
  );
}

function placeStitch(grid: CellData[][], row: number, col: number, stitchId: string, color: string): boolean {
  const span = getStitchSpan(stitchId);
  const rowData = grid[row];
  if (col + span > rowData.length) return false;
  rowData[col] = { color, stitchId, spanOwner: span > 1 ? col : undefined };
  for (let i = 1; i < span; i++) {
    rowData[col + i] = { color, stitchId: "none", spanOwner: col };
  }
  return true;
}

/**
 * Mirrors the applyShaping logic from Index.tsx for testing.
 */
function applyShaping(grid: CellData[][]): { result: CellData[][]; totalCols: number } {
  const numRows = grid.length;
  if (numRows === 0) return { result: grid, totalCols: 0 };

  const rowInfo = grid.map((row) => {
    const activeCells: CellData[] = [];
    const oldColToActive = new Map<number, number>();
    let netChange = 0;
    let colIdx = 0;

    while (colIdx < row.length) {
      const cell = row[colIdx];
      if (cell.spanOwner !== undefined && cell.spanOwner !== colIdx) {
        colIdx++;
        continue;
      }
      const span = Math.max(1, getStitchSpan(cell.stitchId));
      netChange += getStitchNetChange(cell.stitchId);

      if (cell.stitchId !== "none") {
        for (let s = 0; s < span && colIdx + s < row.length; s++) {
          oldColToActive.set(colIdx + s, activeCells.length);
          activeCells.push({ ...row[colIdx + s] });
        }
      }
      colIdx += span;
    }
    return { activeCells, oldColToActive, netChange, cellCount: activeCells.length };
  });

  const expectedCounts = new Array(numRows);
  expectedCounts[numRows - 1] = rowInfo[numRows - 1].cellCount;
  let maxWidth = expectedCounts[numRows - 1];

  for (let i = numRows - 2; i >= 0; i--) {
    expectedCounts[i] = expectedCounts[i + 1] + rowInfo[i + 1].netChange;
    maxWidth = Math.max(maxWidth, expectedCounts[i]);
  }

  const currentCols = grid[0]?.length ?? 0;
  const totalCols = Math.max(currentCols, maxWidth);
  const noStitch = (): CellData => ({ color: DEFAULT_BG, stitchId: "none" });

  const result = grid.map((_, rowIdx) => {
    const { activeCells, oldColToActive } = rowInfo[rowIdx];
    const expected = expectedCounts[rowIdx];
    const fillerCount = Math.max(0, expected - activeCells.length);
    const fillerLeft = Math.floor(fillerCount / 2);
    const fillerRight = fillerCount - fillerLeft;

    const contentCells: CellData[] = [];
    for (let i = 0; i < fillerLeft; i++) contentCells.push({ color: DEFAULT_BG, stitchId: "knit" });

    const activeOffset = fillerLeft;
    for (let i = 0; i < activeCells.length; i++) {
      const cell = { ...activeCells[i] };
      if (cell.spanOwner !== undefined) {
        const ownerActiveIdx = oldColToActive.get(cell.spanOwner);
        cell.spanOwner = ownerActiveIdx !== undefined ? ownerActiveIdx + activeOffset : activeOffset + i;
      }
      contentCells.push(cell);
    }

    for (let i = 0; i < fillerRight; i++) contentCells.push({ color: DEFAULT_BG, stitchId: "knit" });

    const noStitchPadding = totalCols - contentCells.length;
    const padLeft = Math.floor(Math.max(0, noStitchPadding) / 2);
    const padRight = Math.max(0, noStitchPadding) - padLeft;

    const newRow: CellData[] = [];
    for (let i = 0; i < padLeft; i++) newRow.push(noStitch());
    for (let i = 0; i < contentCells.length; i++) {
      const cell = { ...contentCells[i] };
      if (cell.spanOwner !== undefined) cell.spanOwner += padLeft;
      newRow.push(cell);
    }
    for (let i = 0; i < padRight; i++) newRow.push(noStitch());

    return newRow;
  });

  return { result, totalCols };
}

function countActive(row: CellData[]): number {
  let count = 0;
  for (const cell of row) {
    if (cell.stitchId !== "none") count++;
  }
  return count;
}

describe("Apply Shaping", () => {
  it("does nothing on a uniform grid", () => {
    const grid = createGrid(3, 6);
    const { result } = applyShaping(grid);
    expect(result.length).toBe(3);
    // All rows should still have 6 knit stitches, no none cells
    for (const row of result) {
      expect(row.length).toBe(6);
      expect(row.every((c) => c.stitchId === "knit")).toBe(true);
    }
  });

  it("adds no-stitch padding for decrease rows", () => {
    // 3 rows of 6 cols. Bottom row has a k2tog (decrease -1)
    const grid = createGrid(3, 6);
    placeStitch(grid, 2, 0, "k2tog", "#FFF"); // bottom row, net -1

    const { result } = applyShaping(grid);
    // Bottom row output = 6 + (-1) = 5, so row above (index 1) expects 5 active
    // Row 1 had 6 active, so no filler needed, but it keeps 6
    // Row 0 expects row 1's output: 6 + 0 = 6
    // The top row should have active stitches, middle row active, bottom row active
    for (const row of result) {
      expect(row.length).toBe(6);
    }
    // Bottom row should still have k2tog
    const bottomActive = result[2].filter((c) => c.stitchId !== "none");
    expect(bottomActive.some((c) => c.stitchId === "k2tog")).toBe(true);
  });

  it("expands grid and fills knit for increase rows", () => {
    // 3 rows of 4 cols. Bottom row has a YO (increase +1)
    const grid = createGrid(3, 4);
    placeStitch(grid, 2, 1, "yo", "#FFF"); // net +1

    const { result, totalCols } = applyShaping(grid);
    // Bottom row: 4 active, net +1 → row 1 expects 5 active
    // Row 1 had 4 active → needs 1 filler knit
    expect(totalCols).toBeGreaterThanOrEqual(5);
    const row1Active = countActive(result[1]);
    expect(row1Active).toBe(5);
  });

  it("preserves stitches after shaping", () => {
    const grid = createGrid(2, 6);
    placeStitch(grid, 0, 2, "purl", "#FF0000");
    placeStitch(grid, 1, 0, "yo", "#FFF");

    const { result } = applyShaping(grid);
    // The purl stitch should still exist in the top row
    const hasPurl = result[0].some((c) => c.stitchId === "purl" && c.color === "#FF0000");
    expect(hasPurl).toBe(true);
  });

  it("handles mixed increases and decreases", () => {
    // 3 rows, 6 cols
    // Bottom row: has YO (+1) → output 7
    // Middle row: should have 7 active, has k2tog (-1) → output 6
    // Top row: should have 6 active
    const grid = createGrid(3, 6);
    placeStitch(grid, 2, 0, "yo", "#FFF");   // bottom: net +1
    placeStitch(grid, 1, 0, "k2tog", "#FFF"); // middle: net -1

    const { result, totalCols } = applyShaping(grid);
    expect(totalCols).toBeGreaterThanOrEqual(7);

    // Middle row should have 7 active (6 original + 1 filler from increase below)
    const midActive = countActive(result[1]);
    expect(midActive).toBe(7);

    // Top row: middle has 7 active, net -1 → expects 6
    const topActive = countActive(result[0]);
    expect(topActive).toBe(6);
  });

  it("no-stitch cells from previous shaping are stripped", () => {
    const grid = createGrid(2, 6);
    // Manually place no-stitch cells (simulating prior shaping)
    grid[0][0] = { color: DEFAULT_BG, stitchId: "none" };
    grid[0][5] = { color: DEFAULT_BG, stitchId: "none" };

    const { result } = applyShaping(grid);
    // The none cells should be treated as padding, active count based on non-none
    const topActive = countActive(result[0]);
    // Row 0 had 4 active originally, row 1 has 6 active with net 0 → expects 6
    expect(topActive).toBe(6);
  });
});
