import { BrandInfo } from './types';

export const brands: BrandInfo[] = [
  {
    id: 'bang-olufsen',
    name: 'Bang & Olufsen',
    taglineKey: 'brand.boTagline',
    descriptionKey: 'home.boDescription',
  },
  {
    id: 'devialet',
    name: 'Devialet',
    taglineKey: 'brand.devialetTagline',
    descriptionKey: 'home.devialetDescription',
  },
  {
    id: 'loewe',
    name: 'Loewe',
    taglineKey: 'brand.loeweTagline',
    descriptionKey: 'home.loeweDescription',
  },
];

export function getBrand(id: string): BrandInfo | undefined {
  return brands.find((b) => b.id === id);
}
