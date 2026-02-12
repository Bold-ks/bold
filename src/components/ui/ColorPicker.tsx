'use client';

import { useState } from 'react';
import { ProductColor } from '@/data/types';

interface ColorPickerProps {
  colors: ProductColor[];
  selectedIndex?: number;
  onSelect?: (index: number) => void;
}

export function ColorPicker({ colors, selectedIndex, onSelect }: ColorPickerProps) {
  const [internalSelected, setInternalSelected] = useState(0);
  const selected = selectedIndex ?? internalSelected;
  const handleSelect = onSelect ?? setInternalSelected;

  return (
    <div className="flex items-center gap-3">
      {colors.map((color, i) => (
        <button
          key={color.name}
          onClick={() => handleSelect(i)}
          title={color.name}
          className={`w-8 h-8 rounded-full border-2 transition-all ${
            selected === i ? 'border-white scale-110 ring-2 ring-white' : 'border-warm-200'
          }`}
          style={{ backgroundColor: color.hex }}
        />
      ))}
      <span className="text-xs text-warm-500 ml-2">{colors[selected]?.name}</span>
    </div>
  );
}
