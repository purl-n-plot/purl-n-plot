import { STITCH_SYMBOLS, STITCH_CATEGORIES, StitchSymbol } from "@/lib/stitchSymbols";
import { STITCH_ICON_MAP } from "@/components/StitchIcons";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface StitchPaletteProps {
  selectedStitch: string;
  onStitchSelect: (stitchId: string) => void;
}

const StitchPalette = ({ selectedStitch, onStitchSelect }: StitchPaletteProps) => {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState("Basic");

  const filtered = STITCH_SYMBOLS.filter((s) => s.category === activeCategory);

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>
        {t("stitches.stitchSymbols")}
      </h3>

      <div className="flex flex-wrap gap-1.5">
        {STITCH_CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              activeCategory === cat
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-foreground/80 hover:bg-muted/80"
            }`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-2">
        {filtered.map((stitch: StitchSymbol) => {
          const IconComponent = STITCH_ICON_MAP[stitch.id];
          return (
            <button
              key={stitch.id}
              className={`flex flex-col items-center justify-center rounded-lg border p-2.5 text-xs transition-all duration-150 hover:scale-105 ${
                selectedStitch === stitch.id
                  ? "border-primary bg-primary/10 ring-1 ring-primary"
                  : "border-border bg-card hover:bg-muted"
              }`}
              onClick={() => onStitchSelect(stitch.id)}
              title={stitch.description}
            >
              <span className="flex items-center justify-center min-h-[1.5rem]">
                {stitch.id === "none" ? (
                  <span className="w-6 h-6 rounded-sm flex items-center justify-center" style={{ backgroundColor: "#C8C4BE" }}>
                    <IconComponent size={16} />
                  </span>
                ) : stitch.id === "knit" ? (
                  <span className="w-6 h-6 rounded-sm border border-border bg-muted" />
                ) : IconComponent ? (
                  <IconComponent
                    size={22}
                    color="hsl(var(--foreground))"
                    width={stitch.span > 1 ? 22 * stitch.span * 0.6 : undefined}
                  />
                ) : (
                  <span className="text-base font-bold text-foreground">{stitch.symbol}</span>
                )}
              </span>
              <span className="mt-1.5 text-[11px] text-foreground/80 truncate w-full text-center">
                {stitch.name}
                {stitch.span > 1 && (
                  <span className="ml-0.5 text-[9px] opacity-60">({stitch.span}w)</span>
                )}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default StitchPalette;
