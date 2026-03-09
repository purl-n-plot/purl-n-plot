import { describe, it, expect } from "vitest";
import { CellData, getStitchSpan } from "@/lib/stitchSymbols";

const DEFAULT_BG = "#F5F0EB";

function createEmptyCell(): CellData {
  return { color: DEFAULT_BG, stitchId: "knit" };
}

function createGrid(rows: number, cols: number): CellData[][] {
  return Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => createEmptyCell())
  );
}

function clearSpan(grid: CellData[][], row: number, col: number) {
  const cell = grid[row][col];
  const span = getStitchSpan(cell.stitchId);
  for (let i = 0; i < span && col + i < grid[row].length; i++) {
    grid[row][col + i] = createEmptyCell();
  }
}

function placeStitch(
  grid: CellData[][],
  row: number,
  col: number,
  stitchId: string,
  color: string
): boolean {
  const span = getStitchSpan(stitchId);
  const rowData = grid[row];
  if (col + span > rowData.length) return false;
  for (let i = 0; i < span; i++) {
    const existing = rowData[col + i];
    if (existing.spanOwner !== undefined) {
      clearSpan(grid, row, existing.spanOwner);
    } else if (getStitchSpan(existing.stitchId) > 1) {
      clearSpan(grid, row, col + i);
    }
  }
  rowData[col] = { color, stitchId, spanOwner: span > 1 ? col : undefined };
  for (let i = 1; i < span; i++) {
    rowData[col + i] = { color, stitchId: "none", spanOwner: col };
  }
  return true;
}

describe("Grid logic", () => {
  it("creates grid with correct dimensions", () => {
    const grid = createGrid(5, 10);
    expect(grid.length).toBe(5);
    expect(grid[0].length).toBe(10);
  });

  it("creates empty cells with default values", () => {
    const grid = createGrid(1, 1);
    expect(grid[0][0]).toEqual({ color: DEFAULT_BG, stitchId: "knit" });
  });

  it("places a single-cell stitch", () => {
    const grid = createGrid(1, 5);
    const ok = placeStitch(grid, 0, 2, "purl", "#FF0000");
    expect(ok).toBe(true);
    expect(grid[0][2].stitchId).toBe("purl");
    expect(grid[0][2].color).toBe("#FF0000");
  });

  it("places a multi-cell cable stitch", () => {
    const grid = createGrid(1, 10);
    const ok = placeStitch(grid, 0, 1, "c4f", "#00FF00");
    expect(ok).toBe(true);
    expect(grid[0][1].stitchId).toBe("c4f");
    expect(grid[0][1].spanOwner).toBe(1);
    expect(grid[0][2].spanOwner).toBe(1);
    expect(grid[0][3].spanOwner).toBe(1);
    expect(grid[0][4].spanOwner).toBe(1);
  });

  it("rejects placement when cable exceeds grid width", () => {
    const grid = createGrid(1, 3);
    const ok = placeStitch(grid, 0, 1, "c4f", "#000");
    expect(ok).toBe(false);
  });

  it("clears overlapping stitches when placing a cable", () => {
    const grid = createGrid(1, 10);
    placeStitch(grid, 0, 2, "purl", "#AAA");
    placeStitch(grid, 0, 3, "knit", "#BBB");
    placeStitch(grid, 0, 1, "c4f", "#CCC");
    // The purl at col 2 and knit at col 3 should be gone
    expect(grid[0][2].stitchId).toBe("none");
    expect(grid[0][2].spanOwner).toBe(1);
    expect(grid[0][3].spanOwner).toBe(1);
  });

  it("clearSpan resets all cells of a multi-cell stitch", () => {
    const grid = createGrid(1, 10);
    placeStitch(grid, 0, 0, "c6f", "#000");
    clearSpan(grid, 0, 0);
    for (let i = 0; i < 6; i++) {
      expect(grid[0][i]).toEqual(createEmptyCell());
    }
  });
});
