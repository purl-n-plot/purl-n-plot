import { describe, it, expect } from "vitest";
import {
  STITCH_SYMBOLS,
  STITCH_CATEGORIES,
  getStitchSpan,
  CellData,
} from "@/lib/stitchSymbols";

describe("stitchSymbols", () => {
  it("should have unique stitch IDs", () => {
    const ids = STITCH_SYMBOLS.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("should have valid categories", () => {
    expect(STITCH_CATEGORIES.length).toBeGreaterThan(0);
    STITCH_SYMBOLS.forEach((s) => {
      expect(STITCH_CATEGORIES).toContain(s.category);
    });
  });

  it("getStitchSpan returns correct span for known stitches", () => {
    expect(getStitchSpan("knit")).toBe(1);
    expect(getStitchSpan("purl")).toBe(1);
    expect(getStitchSpan("c2f")).toBe(2);
    expect(getStitchSpan("c4f")).toBe(4);
    expect(getStitchSpan("c6f")).toBe(6);
  });

  it("getStitchSpan returns 1 for unknown stitch", () => {
    expect(getStitchSpan("nonexistent")).toBe(1);
  });

  it("all cable stitches have span > 1", () => {
    const cables = STITCH_SYMBOLS.filter((s) => s.category === "Cable");
    expect(cables.length).toBeGreaterThan(0);
    cables.forEach((c) => {
      expect(c.span).toBeGreaterThan(1);
    });
  });

  it("all non-cable stitches have span 1", () => {
    const nonCables = STITCH_SYMBOLS.filter((s) => s.category !== "Cable");
    nonCables.forEach((s) => {
      expect(s.span).toBe(1);
    });
  });
});
