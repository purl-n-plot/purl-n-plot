import ColorPalette from "@/components/ColorPalette";
import StitchPalette from "@/components/StitchPalette";
import GridControls from "@/components/GridControls";
import PatternStorage from "@/components/PatternStorage";
import PatternLegend from "@/components/PatternLegend";
import PatternNotes, { PatternNotesData } from "@/components/PatternNotes";
import { CellData } from "@/lib/stitchSymbols";
import { Guidelines } from "@/components/PatternGrid";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sidebar,
  SidebarContent,
} from "@/components/ui/sidebar";

interface AppSidebarProps {
  selectedColor: string;
  onColorSelect: (color: string) => void;
  selectedStitch: string;
  onStitchSelect: (stitch: string) => void;
  rows: number;
  cols: number;
  onRowsChange: (rows: number) => void;
  onColsChange: (cols: number) => void;
  onClear: () => void;
  grid: CellData[][];
  onLoad: (grid: CellData[][], rows: number, cols: number, notes?: PatternNotesData, guidelines?: Guidelines) => void;
  onExportPNG: () => void;
  onExportPDF: () => void;
  patternNotes: PatternNotesData;
  onPatternNotesChange: (notes: PatternNotesData) => void;
  patternName: string;
  onPatternNameChange: (name: string) => void;
  guidelines: Guidelines;
}

const AppSidebar = ({
  selectedColor,
  onColorSelect,
  selectedStitch,
  onStitchSelect,
  rows,
  cols,
  onRowsChange,
  onColsChange,
  onClear,
  grid,
  onLoad,
  onExportPNG,
  onExportPDF,
  patternNotes,
  onPatternNotesChange,
  patternName,
  onPatternNameChange,
  guidelines,
}: AppSidebarProps) => {
  return (
    <Sidebar className="border-r border-border">
      <SidebarContent className="p-0">
        <ScrollArea className="h-[calc(100vh-3.5rem)]">
          <div className="space-y-6 p-5">
            <ColorPalette selectedColor={selectedColor} onColorSelect={onColorSelect} />
            <StitchPalette selectedStitch={selectedStitch} onStitchSelect={onStitchSelect} />
            <GridControls
              rows={rows}
              cols={cols}
              onRowsChange={onRowsChange}
              onColsChange={onColsChange}
              onClear={onClear}
            />
            <PatternStorage
              grid={grid}
              rows={rows}
              cols={cols}
              onLoad={onLoad}
              onExportPNG={onExportPNG}
              onExportPDF={onExportPDF}
              patternNotes={patternNotes}
              patternName={patternName}
              onPatternNameChange={onPatternNameChange}
              guidelines={guidelines}
            />
            <PatternNotes value={patternNotes} onChange={onPatternNotesChange} />
            <PatternLegend grid={grid} />
          </div>
        </ScrollArea>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
