import { describe, it, expect } from "vitest";
import en from "@/i18n/locales/en.json";

describe("i18n translations", () => {
  it("has all top-level sections", () => {
    expect(Object.keys(en)).toEqual(
      expect.arrayContaining(["app", "tools", "grid", "stitches", "colors", "storage", "notes", "legend", "help", "toasts", "validation"])
    );
  });

  it("has app title and welcome", () => {
    expect(en.app.title).toBe("Purl & Plot");
    expect(en.app.welcome).toContain("Welcome");
    expect(en.app.startDesigning).toBeTruthy();
  });

  it("has all toolbar tool keys", () => {
    const toolKeys = ["paint", "fill", "eraser", "select", "mirrorH", "mirrorV", "undo", "redo", "copy", "paste", "tile", "applyShaping", "zoomIn", "zoomOut", "lightMode", "darkMode"];
    toolKeys.forEach((key) => {
      expect(en.tools).toHaveProperty(key);
    });
  });

  it("has all help tip keys with descriptions", () => {
    const tipKeys = ["colorsStitches", "drawingTools", "patternRepeat", "saveExport", "patternNotes", "stitchCount", "applyShaping", "darkMode"];
    tipKeys.forEach((key) => {
      expect(en.help.tips).toHaveProperty(key);
      expect(en.help.tips).toHaveProperty(`${key}Desc`);
    });
  });

  it("has all shortcut description keys", () => {
    const shortcutKeys = ["click", "drag", "shiftDrag", "copy", "paste", "undo", "redo", "escape", "brushKey", "eraserKey", "fillKey", "selectKey", "tileKey"];
    shortcutKeys.forEach((key) => {
      expect(en.help.shortcuts).toHaveProperty(key);
    });
  });

  it("has grid control keys", () => {
    expect(en.grid.gridSize).toBeTruthy();
    expect(en.grid.columns).toBeTruthy();
    expect(en.grid.rows).toBeTruthy();
    expect(en.grid.clearGrid).toBeTruthy();
  });

  it("has no empty string values in top-level sections", () => {
    function checkNoEmpty(obj: Record<string, unknown>, path: string) {
      for (const [key, val] of Object.entries(obj)) {
        if (typeof val === "string") {
          expect(val.length, `${path}.${key} should not be empty`).toBeGreaterThan(0);
        } else if (typeof val === "object" && val !== null) {
          checkNoEmpty(val as Record<string, unknown>, `${path}.${key}`);
        }
      }
    }
    checkNoEmpty(en as unknown as Record<string, unknown>, "en");
  });
});
