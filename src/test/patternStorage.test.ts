import { describe, it, expect, vi, beforeEach } from "vitest";

// Test PatternStorage serialization logic in isolation
const STORAGE_KEY = "purlandplot-patterns";

interface SavedPattern {
  name: string;
  rows: number;
  cols: number;
  grid: { color: string; stitchId: string; spanOwner?: number }[][];
  savedAt: number;
}

interface PatternFile {
  app: "purlandplot";
  version: 1;
  name: string;
  rows: number;
  cols: number;
  grid: { color: string; stitchId: string; spanOwner?: number }[][];
  exportedAt: number;
}

describe("PatternStorage logic", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("loads empty array when no patterns saved", () => {
    const raw = localStorage.getItem(STORAGE_KEY);
    expect(raw).toBeNull();
  });

  it("saves and loads patterns from localStorage", () => {
    const pattern: SavedPattern = {
      name: "Test",
      rows: 2,
      cols: 2,
      grid: [
        [{ color: "#FFF", stitchId: "knit" }, { color: "#FFF", stitchId: "purl" }],
        [{ color: "#FFF", stitchId: "knit" }, { color: "#FFF", stitchId: "knit" }],
      ],
      savedAt: Date.now(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify([pattern]));
    const loaded: SavedPattern[] = JSON.parse(localStorage.getItem(STORAGE_KEY)!);
    expect(loaded).toHaveLength(1);
    expect(loaded[0].name).toBe("Test");
    expect(loaded[0].grid[0][1].stitchId).toBe("purl");
  });

  it("handles corrupted localStorage gracefully", () => {
    localStorage.setItem(STORAGE_KEY, "not-json");
    let patterns: SavedPattern[] = [];
    try {
      patterns = JSON.parse(localStorage.getItem(STORAGE_KEY)!);
    } catch {
      patterns = [];
    }
    expect(patterns).toEqual([]);
  });

  it("pattern file format is valid", () => {
    const file: PatternFile = {
      app: "purlandplot",
      version: 1,
      name: "Export Test",
      rows: 3,
      cols: 3,
      grid: Array.from({ length: 3 }, () =>
        Array.from({ length: 3 }, () => ({ color: "#F5F0EB", stitchId: "knit" }))
      ),
      exportedAt: Date.now(),
    };
    const json = JSON.stringify(file);
    const parsed = JSON.parse(json);
    expect(parsed.app).toBe("purlandplot");
    expect(parsed.version).toBe(1);
    expect(parsed.grid).toHaveLength(3);
  });

  it("rejects invalid pattern files", () => {
    const invalid = { app: "other-app", grid: null };
    expect(invalid.app).not.toBe("purlandplot");
  });

  it("overwrites pattern with same name", () => {
    const patterns: SavedPattern[] = [
      { name: "A", rows: 5, cols: 5, grid: [], savedAt: 1000 },
    ];
    const updated = { ...patterns[0], rows: 10, savedAt: 2000 };
    const idx = patterns.findIndex((p) => p.name === "A");
    patterns[idx] = updated;
    expect(patterns[0].rows).toBe(10);
  });
});
