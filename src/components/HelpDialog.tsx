import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { HelpCircle, X, Mouse, Keyboard, Palette, Grid3X3, Save, StickyNote, Pencil, Eraser, PaintBucket, FlipHorizontal2, ZoomIn, Sun, BarChart3, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const WELCOME_KEY = "purlandplot-welcome-seen";

const tipIcons = [Palette, Pencil, Grid3X3, Save, StickyNote, BarChart3, Wand2, Sun];
const tipKeys = [
  "colorsStitches", "drawingTools", "patternRepeat", "saveExport",
  "patternNotes", "stitchCount", "applyShaping", "darkMode",
];

const shortcutEntries = [
  { keys: "Click", descKey: "click" },
  { keys: "Drag", descKey: "drag" },
  { keys: "Shift + Drag", descKey: "shiftDrag" },
  { keys: "Ctrl/⌘ + C", descKey: "copy" },
  { keys: "Ctrl/⌘ + V", descKey: "paste" },
  { keys: "Ctrl/⌘ + Z", descKey: "undo" },
  { keys: "Ctrl/⌘ + Shift + Z / Ctrl + Y", descKey: "redo" },
  { keys: "Escape", descKey: "escape" },
  { keys: "B", descKey: "brushKey" },
  { keys: "E", descKey: "eraserKey" },
  { keys: "F", descKey: "fillKey" },
  { keys: "S", descKey: "selectKey" },
  { keys: "T", descKey: "tileKey" },
];

function HelpContent() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <h4 className="text-sm font-semibold text-foreground">{t("help.gettingStarted")}</h4>
        <div className="grid gap-3 sm:grid-cols-2">
          {tipKeys.map((key, i) => {
            const Icon = tipIcons[i];
            return (
              <div key={key} className="flex gap-3 rounded-lg border border-border bg-muted/30 p-3">
                <Icon size={18} className="text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-foreground">{t(`help.tips.${key}`)}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{t(`help.tips.${key}Desc`)}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="space-y-3">
        <h4 className="text-sm font-semibold text-foreground">{t("help.keyboardShortcuts")}</h4>
        <div className="rounded-lg border border-border overflow-hidden">
          {shortcutEntries.map((s, i) => (
            <div
              key={s.keys}
              className={`flex items-center justify-between px-3 py-2 text-sm ${
                i % 2 === 0 ? "bg-muted/20" : "bg-card"
              }`}
            >
              <kbd className="font-mono text-xs bg-muted px-2 py-0.5 rounded text-foreground">{s.keys}</kbd>
              <span className="text-muted-foreground text-xs">{t(`help.shortcuts.${s.descKey}`)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function WelcomeDialog() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(WELCOME_KEY)) {
      setOpen(true);
      localStorage.setItem(WELCOME_KEY, "1");
    }
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-lg max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg" style={{ fontFamily: "'Playfair Display', serif" }}>
            {t("app.welcome")}
          </DialogTitle>
        </DialogHeader>
        <HelpContent />
        <Button className="w-full mt-2" onClick={() => setOpen(false)}>
          {t("app.startDesigning")}
        </Button>
      </DialogContent>
    </Dialog>
  );
}

export function HelpButton() {
  const { t } = useTranslation();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="h-8 w-8" title={t("help.title")}>
          <HelpCircle size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg" style={{ fontFamily: "'Playfair Display', serif" }}>
            {t("help.title")}
          </DialogTitle>
        </DialogHeader>
        <HelpContent />
      </DialogContent>
    </Dialog>
  );
}
