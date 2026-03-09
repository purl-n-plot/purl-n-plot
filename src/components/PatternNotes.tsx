import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { StickyNote } from "lucide-react";

export interface PatternNotesData {
  yarnWeight: string;
  yarnBrand: string;
  colorway: string;
  needleSize: string;
  gauge: string;
  finishedSize: string;
  notes: string;
}

export const EMPTY_NOTES: PatternNotesData = {
  yarnWeight: "",
  yarnBrand: "",
  colorway: "",
  needleSize: "",
  gauge: "",
  finishedSize: "",
  notes: "",
};

const STORAGE_KEY = "purlandplot-notes";

export function loadNotes(): PatternNotesData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? { ...EMPTY_NOTES, ...JSON.parse(raw) } : { ...EMPTY_NOTES };
  } catch {
    return { ...EMPTY_NOTES };
  }
}

export function persistNotes(notes: PatternNotesData) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

/** Returns true if any field has content */
export function hasNotes(n: PatternNotesData): boolean {
  return Object.values(n).some((v) => v.trim() !== "");
}

interface PatternNotesProps {
  value: PatternNotesData;
  onChange: (notes: PatternNotesData) => void;
}

const Field = ({
  label,
  placeholder,
  value,
  onChange,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
}) => (
  <div className="space-y-1">
    <Label className="text-[11px] text-muted-foreground uppercase tracking-wider font-medium">{label}</Label>
    <Input
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="h-8 text-xs"
    />
  </div>
);

const PatternNotes = ({ value, onChange }: PatternNotesProps) => {
  const [open, setOpen] = useState(false);

  const update = (field: keyof PatternNotesData, val: string) => {
    const next = { ...value, [field]: val };
    onChange(next);
    persistNotes(next);
  };

  const filledCount = Object.values(value).filter((v) => v.trim() !== "").length;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full gap-2 text-xs h-9 justify-start">
          <StickyNote size={14} />
          <span className="truncate flex-1 text-left">
            {filledCount > 0 ? `Pattern Notes (${filledCount})` : "Pattern Notes"}
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle style={{ fontFamily: "'Playfair Display', serif" }}>Pattern Notes</DialogTitle>
        </DialogHeader>
        <div className="space-y-3 max-h-[65vh] overflow-y-auto pr-1">
          <div className="grid grid-cols-2 gap-3">
            <Field
              label="Yarn Weight"
              placeholder="e.g. DK, Worsted"
              value={value.yarnWeight}
              onChange={(v) => update("yarnWeight", v)}
            />
            <Field
              label="Needle Size"
              placeholder="e.g. US 7 / 4.5mm"
              value={value.needleSize}
              onChange={(v) => update("needleSize", v)}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field
              label="Yarn Brand"
              placeholder="e.g. Malabrigo Rios"
              value={value.yarnBrand}
              onChange={(v) => update("yarnBrand", v)}
            />
            <Field
              label="Colorway"
              placeholder="e.g. Archangel"
              value={value.colorway}
              onChange={(v) => update("colorway", v)}
            />
          </div>
          <Field
            label="Gauge"
            placeholder="e.g. 20 sts × 28 rows = 4in"
            value={value.gauge}
            onChange={(v) => update("gauge", v)}
          />
          <Field
            label="Finished Measurements"
            placeholder="e.g. 40in chest, 26in length"
            value={value.finishedSize}
            onChange={(v) => update("finishedSize", v)}
          />
          <div className="space-y-1">
            <Label className="text-[11px] text-muted-foreground uppercase tracking-wider font-medium">Notes</Label>
            <Textarea
              placeholder="Special instructions, modifications, stitch markers…"
              value={value.notes}
              onChange={(e) => update("notes", e.target.value)}
              className="text-xs min-h-[80px] resize-y"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PatternNotes;
