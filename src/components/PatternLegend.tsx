import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { CellData, STITCH_SYMBOLS } from "@/lib/stitchSymbols";
import { STITCH_ICON_MAP } from "@/components/StitchIcons";

interface PatternLegendProps {
  grid: CellData[][];
}

const PatternLegend = ({ grid }: PatternLegendProps) => {
  const { t } = useTranslation();
  const usedStitches = useMemo(() => {
    const ownerIds = new Set<string>();
    grid.forEach((row) =>
      row.forEach((cell) => {
        if (cell.stitchId !== "none" && cell.stitchId !== "knit") {
          ownerIds.add(cell.stitchId);
        }
      })
    );
    return STITCH_SYMBOLS.filter((s) => ownerIds.has(s.id));
  }, [grid]);

  if (usedStitches.length === 0) return null;

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-semibold text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>
        {t("legend.legend")}
      </h3>
      <div className="rounded-lg border border-border bg-card p-3 space-y-1.5">
        {usedStitches.map((stitch) => {
          const IconComponent = STITCH_ICON_MAP[stitch.id];
          return (
            <div key={stitch.id} className="flex items-center gap-2.5 py-1">
              <span className="flex items-center justify-center w-7 h-7 shrink-0">
                {IconComponent ? (
                  <IconComponent size={20} color="hsl(var(--foreground))" />
                ) : (
                  <span className="text-sm font-bold text-foreground">{stitch.symbol}</span>
                )}
              </span>
              <div className="min-w-0">
                <span className="text-sm font-medium text-foreground">{stitch.name}</span>
                <span className="text-xs text-foreground/60 ml-2">{stitch.description}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PatternLegend;
