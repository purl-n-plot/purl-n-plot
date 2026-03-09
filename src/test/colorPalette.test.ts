import { describe, it, expect, vi, beforeEach } from "vitest";
import { YARN_COLORS } from "@/components/ColorPalette";

describe("ColorPalette data", () => {
  it("has unique color values", () => {
    const values = YARN_COLORS.map((c) => c.value);
    expect(new Set(values).size).toBe(values.length);
  });

  it("has unique color names", () => {
    const names = YARN_COLORS.map((c) => c.name);
    expect(new Set(names).size).toBe(names.length);
  });

  it("all colors are valid hex codes", () => {
    YARN_COLORS.forEach((c) => {
      expect(c.value).toMatch(/^#[0-9A-Fa-f]{6}$/);
    });
  });

  it("every color has a group", () => {
    YARN_COLORS.forEach((c) => {
      expect(c.group).toBeTruthy();
    });
  });

  it("has at least 30 colors for variety", () => {
    expect(YARN_COLORS.length).toBeGreaterThanOrEqual(30);
  });

  it("groups cover expected categories", () => {
    const groups = new Set(YARN_COLORS.map((c) => c.group));
    expect(groups).toContain("neutral");
    expect(groups).toContain("warm");
    expect(groups).toContain("cool");
  });
});
