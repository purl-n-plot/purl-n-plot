import { useState, useEffect, useRef } from "react";
import { Save, FolderOpen, Trash2, Download, Upload, Image, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CellData } from "@/lib/stitchSymbols";
import { Guidelines } from "@/components/PatternGrid";
import { PatternNotesData, EMPTY_NOTES } from "@/components/PatternNotes";
import { toast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";

interface SavedPattern {
  name: string;
  rows: number;
  cols: number;
  grid: CellData[][];
  savedAt: number;
  notes?: PatternNotesData;
  guidelines?: Guidelines;
}

interface PatternFile {
  app: "purlandplot";
  version: 1;
  name: string;
  rows: number;
  cols: number;
  grid: CellData[][];
  exportedAt: number;
  notes?: PatternNotesData;
  guidelines?: Guidelines;
}

const STORAGE_KEY = "purlandplot-patterns";

function loadPatterns(): SavedPattern[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function savePatterns(patterns: SavedPattern[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(patterns));
}

interface PatternStorageProps {
  grid: CellData[][];
  rows: number;
  cols: number;
  onLoad: (grid: CellData[][], rows: number, cols: number, notes?: PatternNotesData, guidelines?: Guidelines) => void;
  onExportPNG: () => void;
  onExportPDF: () => void;
  patternNotes: PatternNotesData;
  patternName: string;
  onPatternNameChange: (name: string) => void;
  guidelines: Guidelines;
}

const PatternStorage = ({ grid, rows, cols, onLoad, onExportPNG, onExportPDF, patternNotes, patternName, onPatternNameChange, guidelines }: PatternStorageProps) => {
  const [patterns, setPatterns] = useState<SavedPattern[]>(loadPatterns);
  const [showList, setShowList] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setPatterns(loadPatterns());
  }, []);

  const handleSave = () => {
    const saveName = patternName.trim() || `Pattern ${patterns.length + 1}`;
    const existing = patterns.findIndex((p) => p.name === saveName);
    const entry: SavedPattern = { name: saveName, rows, cols, grid, savedAt: Date.now(), notes: patternNotes, guidelines };

    let updated: SavedPattern[];
    if (existing >= 0) {
      updated = [...patterns];
      updated[existing] = entry;
    } else {
      updated = [entry, ...patterns];
    }
    savePatterns(updated);
    setPatterns(updated);
    onPatternNameChange("");
    toast({ title: "Pattern saved", description: `"${saveName}" saved locally.` });
  };

  const handleLoad = (pattern: SavedPattern) => {
    onLoad(pattern.grid, pattern.rows, pattern.cols, pattern.notes, pattern.guidelines);
    onPatternNameChange(pattern.name);
    setShowList(false);
    toast({ title: "Pattern loaded", description: `"${pattern.name}" loaded.` });
  };

  const handleDelete = (idx: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = patterns.filter((_, i) => i !== idx);
    savePatterns(updated);
    setPatterns(updated);
  };

  const handleExportFile = () => {
    const exportName = patternName.trim() || "pattern";
    const file: PatternFile = {
      app: "purlandplot",
      version: 1,
      name: exportName,
      rows,
      cols,
      grid,
      exportedAt: Date.now(),
      notes: patternNotes,
      guidelines,
    };
    const blob = new Blob([JSON.stringify(file, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${exportName.replace(/[^a-zA-Z0-9_-]/g, "_")}.purlandplot.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast({ title: "Pattern exported", description: `"${exportName}" saved as file.` });
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result as string);
        if (data.app !== "purlandplot" || !data.grid || !data.rows || !data.cols) {
          toast({ title: "Invalid file", description: "This doesn't look like a Purl & Plot pattern file.", variant: "destructive" });
          return;
        }
        const pf = data as PatternFile;
        onLoad(pf.grid, pf.rows, pf.cols, pf.notes, pf.guidelines);
        onPatternNameChange(pf.name || "");
        toast({ title: "Pattern imported", description: `"${pf.name}" loaded from file.` });
      } catch {
        toast({ title: "Import failed", description: "Could not read the file.", variant: "destructive" });
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  const formatDate = (ts: number) =>
    new Date(ts).toLocaleDateString(undefined, { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>
        Save & Export
      </h3>

      {/* Pattern name — shared across save, export file, and PDF */}
      <div className="space-y-1.5">
        <p className="text-[11px] text-muted-foreground font-medium uppercase tracking-wider">Pattern Name</p>
        <Input
          placeholder="e.g. Cozy Cable Sweater"
          value={patternName}
          onChange={(e) => onPatternNameChange(e.target.value)}
          className="h-8 text-xs"
          onKeyDown={(e) => e.key === "Enter" && handleSave()}
        />
      </div>

      {/* Export as image/PDF */}
      <div className="space-y-1.5">
        <p className="text-[11px] text-muted-foreground font-medium uppercase tracking-wider">Export Chart</p>
        <div className="flex gap-1.5">
          <Button variant="outline" className="flex-1 gap-2 text-xs h-9" onClick={onExportPNG}>
            <Image size={14} />
            PNG
          </Button>
          <Button variant="outline" className="flex-1 gap-2 text-xs h-9" onClick={onExportPDF}>
            <FileText size={14} />
            PDF
          </Button>
        </div>
      </div>

      <Separator />

      {/* Export / Import as file */}
      <div className="space-y-1.5">
        <p className="text-[11px] text-muted-foreground font-medium uppercase tracking-wider">Pattern File</p>
        <div className="flex gap-1.5">
          <Button variant="outline" className="flex-1 gap-2 text-xs h-9" onClick={handleExportFile}>
            <Download size={14} />
            Save File
          </Button>
          <Button variant="outline" className="flex-1 gap-2 text-xs h-9" onClick={() => fileInputRef.current?.click()}>
            <Upload size={14} />
            Open File
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".json,.purlandplot.json"
            className="hidden"
            onChange={handleImportFile}
          />
        </div>
      </div>

      <Separator />

      {/* Quick save to browser */}
      <div className="space-y-1.5">
        <p className="text-[11px] text-muted-foreground font-medium uppercase tracking-wider">Browser Storage</p>
        <div className="flex gap-1.5">
          <Button variant="outline" className="flex-1 gap-2 text-xs h-9" onClick={handleSave}>
            <Save size={14} />
            Save
          </Button>
          <Button
            variant="outline"
            className="flex-1 gap-2 text-xs h-9"
            onClick={() => setShowList(!showList)}
          >
            <FolderOpen size={14} />
            Load ({patterns.length})
          </Button>
        </div>

        {showList && (
          <div className="space-y-1 max-h-48 overflow-y-auto">
            {patterns.length === 0 ? (
              <p className="text-xs text-muted-foreground text-center py-2">No saved patterns yet</p>
            ) : (
              patterns.map((p, i) => (
                <button
                  key={`${p.name}-${p.savedAt}`}
                  className="w-full flex items-center justify-between rounded-md border border-border bg-card px-2 py-1.5 text-left hover:bg-muted transition-colors"
                  onClick={() => handleLoad(p)}
                >
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-foreground truncate">{p.name}</p>
                    <p className="text-[10px] text-muted-foreground">
                      {p.rows}×{p.cols} · {formatDate(p.savedAt)}
                    </p>
                  </div>
                  <button
                    className="shrink-0 ml-2 p-1 rounded hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
                    onClick={(e) => handleDelete(i, e)}
                    title="Delete pattern"
                  >
                    <Trash2 size={12} />
                  </button>
                </button>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PatternStorage;
