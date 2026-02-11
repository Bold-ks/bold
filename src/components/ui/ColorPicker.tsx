'use client';

import { useState } from 'react';
import { ProductColor } from '@/data/types';

export function ColorPicker({ colors }: { colors: ProductColor[] }) {
  const [selected, setSelected] = useState(0);

  return (
    <div className="flex items-center gap-3">
      {colors.map((color, i) => (
        <button
          key={color.name}
          onClick={() => setSelected(i)}
          title={color.name}
          className={`w-8 h-8 rounded-full border-2 transition-all ${
            selected === i ? 'border-black scale-110' : 'border-warm-200'
          }`}
          style={{ backgroundColor: color.hex }}
        />
      ))}
      <span className="text-xs text-warm-500 ml-2">{colors[selected]?.name}</span>
    </div>
  );
}
