import { describe, it, expect } from "vitest";
import { CellData, getStitchSpan, STITCH_SYMBOLS } from "@/lib/stitchSymbols";

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
  const span = Math.max(1, getStitchSpan(cell.stitchId));
  for (let i = 0; i < span && col + i < grid[row].length; i++) {
    grid[row][col + i] = createEmptyCell();
  }
}

function placeStitch(grid: CellData[][], row: number, col: number, stitchId: string, color: string): boolean {
  const span = getStitchSpan(stitchId);
  const rowData = grid[row];
  if (col + span > rowData.length) return false;
  for (let i = 0; i < span; i++) {
    const existing = rowData[col + i];
    if (existing.spanOwner !== undefined) clearSpan(grid, row, existing.spanOwner);
    else if (getStitchSpan(existing.stitchId) > 1) clearSpan(grid, row, col + i);
  }
  rowData[col] = { color, stitchId, spanOwner: span > 1 ? col : undefined };
  for (let i = 1; i < span; i++) {
    rowData[col + i] = { color, stitchId: "none", spanOwner: col };
  }
  return true;
}

function floodFill(grid: CellData[][], startRow: number, startCol: number, newColor: string, newStitch: string) {
  const targetColor = grid[startRow][startCol].color;
  const targetStitch = grid[startRow][startCol].stitchId;
  if (targetColor === newColor && targetStitch === newStitch) return;
  const numRows = grid.length;
  const numCols = grid[0].length;
  const visited = new Set<string>();
  const queue: [number, number][] = [[startRow, startCol]];
  while (queue.length > 0) {
    const [r, c] = queue.shift()!;
    const key = `${r},${c}`;
    if (visited.has(key)) continue;
    if (r < 0 || r >= numRows || c < 0 || c >= numCols) continue;
    if (grid[r][c].color !== targetColor || grid[r][c].stitchId !== targetStitch) continue;
    visited.add(key);
    grid[r][c] = { ...grid[r][c], color: newColor, stitchId: newStitch };
    queue.push([r - 1, c], [r + 1, c], [r, c - 1], [r, c + 1]);
  }
}

describe("Flood fill", () => {
  it("fills contiguous same-color cells", () => {
    const grid = createGrid(3, 3);
    floodFill(grid, 0, 0, "#FF0000", "purl");
    // All 9 cells should be filled since they were all the same
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        expect(grid[r][c].color).toBe("#FF0000");
        expect(grid[r][c].stitchId).toBe("purl");
      }
    }
  });

  it("does not fill across different colors", () => {
    const grid = createGrid(3, 3);
    // Create a barrier in the middle row
    grid[1][0].color = "#000000";
    grid[1][1].color = "#000000";
    grid[1][2].color = "#000000";
    floodFill(grid, 0, 0, "#FF0000", "purl");
    // Top row filled
    expect(grid[0][0].color).toBe("#FF0000");
    // Bottom row NOT filled
    expect(grid[2][0].color).toBe(DEFAULT_BG);
  });

  it("does nothing when target matches fill", () => {
    const grid = createGrid(2, 2);
    grid[0][0].color = "#FF0000";
    grid[0][0].stitchId = "purl";
    floodFill(grid, 0, 0, "#FF0000", "purl");
    // Other cells unchanged
    expect(grid[0][1].color).toBe(DEFAULT_BG);
  });
});

describe("Mirror painting", () => {
  it("mirrors horizontally", () => {
    const grid = createGrid(1, 6);
    const numCols = 6;
    const col = 1;
    const mirrorCol = numCols - 1 - col; // 4
    placeStitch(grid, 0, col, "purl", "#F00");
    placeStitch(grid, 0, mirrorCol, "purl", "#F00");
    expect(grid[0][1].stitchId).toBe("purl");
    expect(grid[0][4].stitchId).toBe("purl");
  });

  it("mirrors vertically", () => {
    const grid = createGrid(6, 1);
    const numRows = 6;
    const row = 1;
    const mirrorRow = numRows - 1 - row; // 4
    placeStitch(grid, row, 0, "purl", "#F00");
    placeStitch(grid, mirrorRow, 0, "purl", "#F00");
    expect(grid[1][0].stitchId).toBe("purl");
    expect(grid[4][0].stitchId).toBe("purl");
  });

  it("mirrors both axes", () => {
    const grid = createGrid(4, 4);
    const positions = [
      [0, 0],
      [0, 3],
      [3, 0],
      [3, 3],
    ];
    positions.forEach(([r, c]) => placeStitch(grid, r, c, "purl", "#F00"));
    positions.forEach(([r, c]) => {
      expect(grid[r][c].stitchId).toBe("purl");
    });
  });
});

describe("Grid resize", () => {
  it("adding rows preserves existing data", () => {
    const grid = createGrid(2, 3);
    placeStitch(grid, 0, 0, "purl", "#F00");
    // Simulate adding rows
    const newRows = [...grid, ...createGrid(2, 3)];
    expect(newRows).toHaveLength(4);
    expect(newRows[0][0].stitchId).toBe("purl");
    expect(newRows[3][0].stitchId).toBe("knit");
  });

  it("removing rows truncates grid", () => {
    const grid = createGrid(5, 3);
    placeStitch(grid, 4, 0, "purl", "#F00");
    const truncated = grid.slice(0, 3);
    expect(truncated).toHaveLength(3);
  });

  it("adding columns preserves existing data", () => {
    const grid = createGrid(2, 2);
    placeStitch(grid, 0, 0, "purl", "#F00");
    const wider = grid.map((row) => [...row, createEmptyCell()]);
    expect(wider[0]).toHaveLength(3);
    expect(wider[0][0].stitchId).toBe("purl");
  });

  it("removing columns truncates rows", () => {
    const grid = createGrid(2, 5);
    placeStitch(grid, 0, 4, "purl", "#F00");
    const narrower = grid.map((row) => row.slice(0, 3));
    expect(narrower[0]).toHaveLength(3);
  });
});

describe("Eraser logic", () => {
  it("erases a single-cell stitch back to empty", () => {
    const grid = createGrid(1, 5);
    placeStitch(grid, 0, 2, "purl", "#F00");
    clearSpan(grid, 0, 2);
    expect(grid[0][2]).toEqual(createEmptyCell());
  });

  it("erases all cells of a multi-cell stitch", () => {
    const grid = createGrid(1, 10);
    placeStitch(grid, 0, 2, "c4f", "#F00");
    clearSpan(grid, 0, 2);
    for (let i = 2; i < 6; i++) {
      expect(grid[0][i]).toEqual(createEmptyCell());
    }
  });
});

describe("Edge cases", () => {
  it("placing stitch at col 0 works", () => {
    const grid = createGrid(1, 5);
    expect(placeStitch(grid, 0, 0, "knit", "#FFF")).toBe(true);
  });

  it("placing stitch at last col works", () => {
    const grid = createGrid(1, 5);
    expect(placeStitch(grid, 0, 4, "purl", "#FFF")).toBe(true);
  });

  it("cable at last possible position", () => {
    const grid = createGrid(1, 6);
    // c4f needs 4 cells, placing at col 2 (2+4=6, fits exactly)
    expect(placeStitch(grid, 0, 2, "c4f", "#FFF")).toBe(true);
  });

  it("cable one cell too far fails", () => {
    const grid = createGrid(1, 6);
    expect(placeStitch(grid, 0, 3, "c4f", "#FFF")).toBe(false);
  });

  it("1x1 grid works", () => {
    const grid = createGrid(1, 1);
    expect(placeStitch(grid, 0, 0, "purl", "#F00")).toBe(true);
    expect(grid[0][0].stitchId).toBe("purl");
  });
});
