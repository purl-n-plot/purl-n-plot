import { Check, Pipette, Plus, X, Heart, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";

export const YARN_COLORS = [
  // Neutrals
  { name: "Snow", value: "#F5F0EB", group: "neutral" },
  { name: "Cream", value: "#EDE6D6", group: "neutral" },
  { name: "Oatmeal", value: "#D5CBBA", group: "neutral" },
  { name: "Taupe", value: "#A89888", group: "neutral" },
  { name: "Charcoal", value: "#3A3A3A", group: "neutral" },
  { name: "Black", value: "#1A1A1A", group: "neutral" },
  // Warms
  { name: "Blush", value: "#D9A69A", group: "warm" },
  { name: "Coral", value: "#E07858", group: "warm" },
  { name: "Terracotta", value: "#C4603A", group: "warm" },
  { name: "Rust", value: "#A0522D", group: "warm" },
  { name: "Mustard", value: "#D4A934", group: "warm" },
  { name: "Copper", value: "#B87333", group: "warm" },
  // Cools
  { name: "Sage", value: "#8DB48E", group: "cool" },
  { name: "Forest", value: "#4A7C59", group: "cool" },
  { name: "Teal", value: "#4A8B8B", group: "cool" },
  { name: "Sky", value: "#6AABCC", group: "cool" },
  { name: "Slate", value: "#5E7080", group: "cool" },
  { name: "Navy", value: "#2E3F5C", group: "cool" },
  // Purples
  { name: "Berry", value: "#8B3A5E", group: "purple" },
  { name: "Grape", value: "#5B2C6F", group: "purple" },
  { name: "Boysenberry", value: "#7B2D5F", group: "purple" },
  { name: "Mauve", value: "#B48EAD", group: "purple" },
  { name: "Lavender", value: "#9B8EC4", group: "purple" },
  { name: "Dusty Rose", value: "#C9A0A0", group: "purple" },
  // Brights
  { name: "Cherry", value: "#DE3163", group: "bright" },
  { name: "Tangerine", value: "#FF6F3C", group: "bright" },
  { name: "Sunshine", value: "#FFD700", group: "bright" },
  { name: "Lime", value: "#7EC850", group: "bright" },
  { name: "Electric Blue", value: "#2196F3", group: "bright" },
  { name: "Violet", value: "#8B5CF6", group: "bright" },
  // Pastels
  { name: "Baby Pink", value: "#F8C8DC", group: "pastel" },
  { name: "Peach", value: "#FDDCB5", group: "pastel" },
  { name: "Buttercup", value: "#FFF3B0", group: "pastel" },
  { name: "Mint", value: "#B8E8C0", group: "pastel" },
  { name: "Powder Blue", value: "#B3D9F2", group: "pastel" },
  { name: "Lilac", value: "#D4B8E0", group: "pastel" },
  // Muted
  { name: "Dusty Pink", value: "#C9917A", group: "muted" },
  { name: "Driftwood", value: "#967969", group: "muted" },
  { name: "Olive", value: "#8A8B52", group: "muted" },
  { name: "Seafoam", value: "#78A29B", group: "muted" },
  { name: "Storm", value: "#7A8B99", group: "muted" },
  { name: "Thistle", value: "#9C8AA5", group: "muted" },
  // Earth
  { name: "Sand", value: "#C2B280", group: "earth" },
  { name: "Clay", value: "#B66A50", group: "earth" },
  { name: "Moss", value: "#6B7F3A", group: "earth" },
  { name: "Bark", value: "#5C4033", group: "earth" },
  { name: "Umber", value: "#8B6914", group: "earth" },
  { name: "Stone", value: "#8A8478", group: "earth" },
  // Jewel
  { name: "Ruby", value: "#9B111E", group: "jewel" },
  { name: "Emerald", value: "#046307", group: "jewel" },
  { name: "Sapphire", value: "#0F52BA", group: "jewel" },
  { name: "Amethyst", value: "#6C3BAA", group: "jewel" },
  { name: "Topaz", value: "#C98A1A", group: "jewel" },
  { name: "Garnet", value: "#733635", group: "jewel" },
  // Spring
  { name: "Daffodil", value: "#F0E060", group: "spring" },
  { name: "Tulip Pink", value: "#F0A0B0", group: "spring" },
  { name: "Fresh Grass", value: "#7CBF6A", group: "spring" },
  { name: "Robin Egg", value: "#7EC8D8", group: "spring" },
  { name: "Wisteria", value: "#BFA0D8", group: "spring" },
  { name: "Clover", value: "#5CB85C", group: "spring" },
  // Summer
  { name: "Tropical Coral", value: "#FF6B6B", group: "summer" },
  { name: "Ocean", value: "#0099CC", group: "summer" },
  { name: "Mango", value: "#FF8243", group: "summer" },
  { name: "Palm Green", value: "#3DA35D", group: "summer" },
  { name: "Hibiscus", value: "#E8368F", group: "summer" },
  { name: "Watermelon", value: "#FC6C85", group: "summer" },
  // Autumn
  { name: "Maple", value: "#C84B20", group: "autumn" },
  { name: "Pumpkin", value: "#E87830", group: "autumn" },
  { name: "Cinnamon", value: "#D2691E", group: "autumn" },
  { name: "Cranberry", value: "#8B1A30", group: "autumn" },
  { name: "Chestnut", value: "#7B3F00", group: "autumn" },
  { name: "Acorn", value: "#6B4226", group: "autumn" },
  // Winter
  { name: "Ice Blue", value: "#C0DCF0", group: "winter" },
  { name: "Frost", value: "#E8EFF5", group: "winter" },
  { name: "Evergreen", value: "#2D5040", group: "winter" },
  { name: "Holly", value: "#A01830", group: "winter" },
  { name: "Pewter", value: "#8E9AAF", group: "winter" },
  { name: "Midnight", value: "#1A2040", group: "winter" },
];

const SAVED_COLORS_KEY = "purlandplot-saved-colors";

function loadSavedColors(): string[] {
  try {
    const stored = localStorage.getItem(SAVED_COLORS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function persistColors(colors: string[]) {
  localStorage.setItem(SAVED_COLORS_KEY, JSON.stringify(colors));
}

function isLight(hex: string): boolean {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 150;
}

interface ColorPaletteProps {
  selectedColor: string;
  onColorSelect: (color: string) => void;
}

function ColorSwatch({
  color,
  selected,
  onClick,
  name,
  onRemove,
}: {
  color: string;
  selected: boolean;
  onClick: () => void;
  name: string;
  onRemove?: () => void;
}) {
  return (
    <div className="relative group">
      <button
        className="w-9 h-9 rounded-lg border-2 transition-all duration-100 hover:scale-110 hover:shadow-md flex items-center justify-center"
        style={{
          backgroundColor: color,
          borderColor: selected ? "hsl(var(--foreground))" : "transparent",
          boxShadow: selected ? "0 0 0 1.5px hsl(var(--background)), 0 0 0 3px hsl(var(--foreground))" : undefined,
        }}
        onClick={onClick}
        title={name}
      >
        {selected && (
          <Check size={14} color={isLight(color) ? "#3A3A3A" : "#F5F0EB"} strokeWidth={3} />
        )}
      </button>
      {onRemove && (
        <button
          className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
          onClick={(e) => { e.stopPropagation(); onRemove(); }}
          title="Remove"
        >
          <X size={10} />
        </button>
      )}
    </div>
  );
}

const FAVORITES = [
  "#FFFFFF", "#F5F0EB", "#C0C0C0", "#808080", "#3A3A3A", "#1A1A1A",
  "#CC3333", "#E8A040", "#2B7A4B", "#3366AA", "#7744AA", "#C06080",
];

const ColorPalette = ({ selectedColor, onColorSelect }: ColorPaletteProps) => {
  const [openGroups, setOpenGroups] = useState<Set<string>>(new Set(["favorites"]));
  const inputRef = useRef<HTMLInputElement>(null);
  const [savedColors, setSavedColors] = useState<string[]>(loadSavedColors);
  const [pickerColor, setPickerColor] = useState(selectedColor);

  useEffect(() => {
    persistColors(savedColors);
  }, [savedColors]);

  useEffect(() => {
    setPickerColor(selectedColor);
  }, [selectedColor]);

  const handlePickerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const c = e.target.value;
    setPickerColor(c);
    onColorSelect(c);
  };

  const isPreset = YARN_COLORS.some((c) => c.value.toUpperCase() === selectedColor.toUpperCase());
  const isSaved = savedColors.includes(selectedColor.toUpperCase());
  const canSave = !isPreset && !isSaved;

  const handleSaveColor = () => {
    const normalized = selectedColor.toUpperCase();
    if (canSave) {
      setSavedColors((prev) => [...prev, normalized]);
    }
  };

  const handleRemoveSaved = (color: string) => {
    setSavedColors((prev) => prev.filter((c) => c !== color));
  };

  const toggleGroup = (id: string) => {
    setOpenGroups((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const groups = [
    { id: "favorites", label: "Basics", colors: FAVORITES.map((hex) => YARN_COLORS.find((c) => c.value === hex) ?? { name: hex, value: hex, group: "custom" }) },
    { id: "neutral", label: "Neutrals", colors: YARN_COLORS.filter((c) => c.group === "neutral") },
    { id: "warm", label: "Warm", colors: YARN_COLORS.filter((c) => c.group === "warm") },
    { id: "cool", label: "Cool", colors: YARN_COLORS.filter((c) => c.group === "cool") },
    { id: "purple", label: "Purple", colors: YARN_COLORS.filter((c) => c.group === "purple") },
    { id: "bright", label: "Brights", colors: YARN_COLORS.filter((c) => c.group === "bright") },
    { id: "pastel", label: "Pastels", colors: YARN_COLORS.filter((c) => c.group === "pastel") },
    { id: "muted", label: "Muted", colors: YARN_COLORS.filter((c) => c.group === "muted") },
    { id: "earth", label: "Earth", colors: YARN_COLORS.filter((c) => c.group === "earth") },
    { id: "jewel", label: "Jewel", colors: YARN_COLORS.filter((c) => c.group === "jewel") },
    { id: "spring", label: "Spring", colors: YARN_COLORS.filter((c) => c.group === "spring") },
    { id: "summer", label: "Summer", colors: YARN_COLORS.filter((c) => c.group === "summer") },
    { id: "autumn", label: "Autumn", colors: YARN_COLORS.filter((c) => c.group === "autumn") },
    { id: "winter", label: "Winter", colors: YARN_COLORS.filter((c) => c.group === "winter") },
  ];

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-foreground" style={{ fontFamily: "'Playfair Display', serif" }}>
        Yarn Colors
      </h3>

      {/* Palette selector — multi-select toggle */}
      <div className="flex flex-wrap gap-1.5">
        {groups.map((g) => (
          <button
            key={g.id}
            onClick={() => toggleGroup(g.id)}
            className={`text-xs px-3 py-1.5 rounded-full border transition-colors font-medium ${
              openGroups.has(g.id)
                ? "bg-foreground text-background border-foreground"
                : "bg-muted/50 text-foreground/80 border-border hover:bg-muted"
            }`}
          >
            {g.label}
          </button>
        ))}
      </div>

      {/* Color swatches — show all open groups */}
      <div className="space-y-1.5">
        {groups
          .filter((g) => openGroups.has(g.id))
          .map((g) => (
            <div key={g.id} className="flex flex-wrap gap-1.5">
              {g.colors.map((color) => (
                <ColorSwatch
                  key={color.value}
                  color={color.value}
                  selected={selectedColor === color.value}
                  onClick={() => onColorSelect(color.value)}
                  name={color.name}
                />
              ))}
            </div>
          ))}
      </div>

      {/* My Colors */}
      {savedColors.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center gap-1.5">
            <Heart size={12} className="text-foreground/60" />
            <span className="text-xs font-medium text-foreground/60 uppercase tracking-wider">My Colors</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {savedColors.map((color) => (
              <ColorSwatch
                key={color}
                color={color}
                selected={selectedColor.toUpperCase() === color}
                onClick={() => onColorSelect(color)}
                name={color}
                onRemove={() => handleRemoveSaved(color)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Active color + picker */}
      <div className="flex items-center gap-2 rounded-lg bg-muted/50 p-2">
        <div className="relative">
          <button
            className="w-9 h-9 rounded-lg border border-border shadow-sm overflow-hidden flex items-center justify-center"
            style={{ backgroundColor: selectedColor }}
            onClick={() => inputRef.current?.click()}
            title="Pick custom color"
          >
            <Pipette
              size={14}
              color={isLight(selectedColor) ? "#3A3A3A" : "#F5F0EB"}
              className="drop-shadow-[0_0_2px_rgba(255,255,255,0.5)]"
            />
          </button>
          <input
            ref={inputRef}
            type="color"
            value={pickerColor}
            onChange={handlePickerChange}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
        </div>
        <div className="flex-1 min-w-0">
          <span className="text-xs font-mono text-foreground uppercase block">
            {selectedColor}
          </span>
          <span className="text-[11px] text-muted-foreground">
            {YARN_COLORS.find((c) => c.value === selectedColor)?.name
              ?? savedColors.includes(selectedColor.toUpperCase()) ? "Saved" : "Custom"}
          </span>
        </div>
        {canSave && (
          <Button
            variant="ghost"
            size="sm"
            className="h-7 px-2 text-xs gap-1 shrink-0"
            onClick={handleSaveColor}
          >
            <Plus size={12} />
            Save
          </Button>
        )}
      </div>
    </div>
  );
};

export default ColorPalette;
