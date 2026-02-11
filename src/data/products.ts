import { Product } from './types';

export const products: Product[] = [
  // ========== BANG & OLUFSEN - SPEAKERS ==========
  {
    id: 'bo-beolab-8',
    slug: 'beolab-8',
    brand: 'bang-olufsen',
    name: 'Beolab 8',
    category: 'speakers',
    subcategory: 'home',
    description: {
      sq: 'Altoparlant i fuqishëm për shtëpi me dizajn elegant dhe tingull të jashtëzakonshëm',
      en: 'Powerful home speaker with elegant design and extraordinary sound',
    },
    price: 3490,
    colors: [
      { name: 'Black Anthracite', hex: '#2d2d2d' },
      { name: 'Natural Aluminium', hex: '#c0c0c0' },
    ],
    specs: { 'Fuqia': '320W', 'Lidhja': 'Wi-Fi, Bluetooth', 'Përmasat': '26.5 x 16.2 x 16.2 cm' },
    featured: true,
  },
  {
    id: 'bo-beolab-28',
    slug: 'beolab-28',
    brand: 'bang-olufsen',
    name: 'Beolab 28',
    category: 'speakers',
    subcategory: 'home',
    description: {
      sq: 'Altoparlant wireless me dizajn skulptural dhe tingull imersiv',
      en: 'Wireless speaker with sculptural design and immersive sound',
    },
    price: 9250,
    colors: [
      { name: 'Black Anthracite', hex: '#2d2d2d' },
      { name: 'Gold Tone', hex: '#c5a35a' },
      { name: 'Silver', hex: '#c0c0c0' },
    ],
    specs: { 'Fuqia': '520W', 'Lidhja': 'Wi-Fi, Bluetooth 5.1', 'Përmasat': '120 x 17.4 cm' },
    featured: true,
  },
  {
    id: 'bo-beolab-50',
    slug: 'beolab-50',
    brand: 'bang-olufsen',
    name: 'Beolab 50',
    category: 'speakers',
    subcategory: 'home',
    description: {
      sq: 'Altoparlanti më i avancuar nga Bang & Olufsen me teknologji akustike Beam Width Control',
      en: 'The most advanced Bang & Olufsen speaker with Beam Width Control acoustic technology',
    },
    price: null,
    colors: [
      { name: 'Black Anthracite', hex: '#2d2d2d' },
      { name: 'Natural Aluminium', hex: '#c0c0c0' },
    ],
    specs: { 'Fuqia': '2100W', 'Drajverët': '7', 'Përmasat': '107.5 x 39.5 cm' },
    featured: true,
  },
  {
    id: 'bo-beosound-a5',
    slug: 'beosound-a5',
    brand: 'bang-olufsen',
    name: 'Beosound A5',
    category: 'speakers',
    subcategory: 'portable',
    description: {
      sq: 'Altoparlant portativ premium me bateri të gjatë dhe tingull të pasur',
      en: 'Premium portable speaker with long battery and rich sound',
    },
    price: 1199,
    colors: [
      { name: 'Nordic Weave', hex: '#8b7d6b' },
      { name: 'Dark Oak', hex: '#3e2723' },
      { name: 'Black Anthracite', hex: '#2d2d2d' },
    ],
    specs: { 'Bateria': '12 orë', 'Fuqia': '280W', 'IP': 'IP65' },
  },
  {
    id: 'bo-beosound-2',
    slug: 'beosound-2',
    brand: 'bang-olufsen',
    name: 'Beosound 2',
    category: 'speakers',
    subcategory: 'home',
    description: {
      sq: 'Altoparlant shtëpie me dizajn konik ikonik dhe tingull 360°',
      en: 'Home speaker with iconic conical design and 360° sound',
    },
    price: 3250,
    colors: [
      { name: 'Black Anthracite', hex: '#2d2d2d' },
      { name: 'Natural Aluminium', hex: '#c0c0c0' },
      { name: 'Gold Tone', hex: '#c5a35a' },
    ],
    specs: { 'Fuqia': '420W', 'Lidhja': 'Wi-Fi, Bluetooth, AirPlay 2' },
  },
  {
    id: 'bo-beosound-level',
    slug: 'beosound-level',
    brand: 'bang-olufsen',
    name: 'Beosound Level',
    category: 'speakers',
    subcategory: 'portable',
    description: {
      sq: 'Altoparlant portativ me dizajn modular dhe materiale të qëndrueshme',
      en: 'Portable speaker with modular design and sustainable materials',
    },
    price: 1699,
    colors: [
      { name: 'Gold Tone', hex: '#c5a35a' },
      { name: 'Black Anthracite', hex: '#2d2d2d' },
      { name: 'Natural', hex: '#d4c5a9' },
    ],
    specs: { 'Bateria': '16 orë', 'Fuqia': '124W', 'Lidhja': 'Wi-Fi, Bluetooth 5.1' },
  },
  {
    id: 'bo-beosound-explore',
    slug: 'beosound-explore',
    brand: 'bang-olufsen',
    name: 'Beosound Explore',
    category: 'speakers',
    subcategory: 'outdoor',
    description: {
      sq: 'Altoparlant i fortë për aventura në natyrë',
      en: 'Rugged speaker for outdoor adventures',
    },
    price: 249,
    colors: [
      { name: 'Black Anthracite', hex: '#2d2d2d' },
      { name: 'Green', hex: '#2e5339' },
      { name: 'Grey Mist', hex: '#9e9e9e' },
    ],
    specs: { 'Bateria': '27 orë', 'IP': 'IP67', 'Pesha': '631g' },
  },
  // ========== BANG & OLUFSEN - HEADPHONES ==========
  {
    id: 'bo-beoplay-h100',
    slug: 'beoplay-h100',
    brand: 'bang-olufsen',
    name: 'Beoplay H100',
    category: 'headphones',
    description: {
      sq: 'Dëgjueset flagship me anulim aktiv të zhurmës dhe materiale premium',
      en: 'Flagship headphones with active noise cancellation and premium materials',
    },
    price: 1199,
    colors: [
      { name: 'Black Anthracite', hex: '#2d2d2d' },
      { name: 'Hourglass Sand', hex: '#c5b79e' },
      { name: 'Infinite Blue', hex: '#1a3a5c' },
    ],
    specs: { 'Bateria': '40 orë', 'ANC': 'Adaptive', 'Drajveri': '40mm Titanium' },
    featured: true,
  },
  {
    id: 'bo-beoplay-hx',
    slug: 'beoplay-hx',
    brand: 'bang-olufsen',
    name: 'Beoplay HX',
    category: 'headphones',
    description: {
      sq: 'Dëgjuese wireless me komoditet superior dhe ANC',
      en: 'Wireless headphones with superior comfort and ANC',
    },
    price: 499,
    colors: [
      { name: 'Black Anthracite', hex: '#2d2d2d' },
      { name: 'Sand', hex: '#c5b79e' },
      { name: 'Timber', hex: '#4a3728' },
    ],
    specs: { 'Bateria': '35 orë', 'ANC': 'Adaptive', 'Drajveri': '40mm' },
  },
  {
    id: 'bo-beoplay-ex',
    slug: 'beoplay-ex',
    brand: 'bang-olufsen',
    name: 'Beoplay EX',
    category: 'headphones',
    description: {
      sq: 'Kufje wireless premium me dizajn unik dhe ANC',
      en: 'Premium wireless earbuds with unique design and ANC',
    },
    price: 399,
    colors: [
      { name: 'Black Anthracite', hex: '#2d2d2d' },
      { name: 'Gold Tone', hex: '#c5a35a' },
      { name: 'Sand', hex: '#c5b79e' },
    ],
    specs: { 'Bateria': '6+20 orë', 'ANC': 'Adaptive', 'IP': 'IP57' },
  },
  {
    id: 'bo-beoplay-eq',
    slug: 'beoplay-eq',
    brand: 'bang-olufsen',
    name: 'Beoplay EQ',
    category: 'headphones',
    description: {
      sq: 'Kufje adaptive me tingull audiofil',
      en: 'Adaptive earbuds with audiophile sound',
    },
    price: 349,
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'Sand', hex: '#c5b79e' },
    ],
    specs: { 'Bateria': '6+20 orë', 'ANC': 'Adaptive', 'Codec': 'aptX Adaptive' },
  },
  // ========== BANG & OLUFSEN - TV ==========
  {
    id: 'bo-beovision-contour',
    slug: 'beovision-contour',
    brand: 'bang-olufsen',
    name: 'Beovision Contour',
    category: 'tv',
    description: {
      sq: 'TV OLED me dizajn të integruar dhe tingull të fuqishëm',
      en: 'OLED TV with integrated design and powerful sound',
    },
    price: 7990,
    colors: [
      { name: 'Black Anthracite', hex: '#2d2d2d' },
      { name: 'Light Oak', hex: '#c5a35a' },
    ],
    specs: { 'Ekrani': '48" / 55" OLED', 'Rezolucioni': '4K', 'Zëri': '3.1 kanale, 240W' },
    featured: true,
  },
  {
    id: 'bo-beovision-theatre',
    slug: 'beovision-theatre',
    brand: 'bang-olufsen',
    name: 'Beovision Theatre',
    category: 'tv',
    description: {
      sq: 'TV OLED premium me soundbar të integruar Dolby Atmos',
      en: 'Premium OLED TV with integrated Dolby Atmos soundbar',
    },
    price: null,
    colors: [
      { name: 'Black Anthracite', hex: '#2d2d2d' },
      { name: 'Aluminium', hex: '#c0c0c0' },
    ],
    specs: { 'Ekrani': '55" / 65" / 77" OLED', 'Rezolucioni': '4K', 'Zëri': 'Dolby Atmos, 12 drajverë' },
  },
  // ========== BANG & OLUFSEN - SOUNDBAR ==========
  {
    id: 'bo-beosound-stage',
    slug: 'beosound-stage',
    brand: 'bang-olufsen',
    name: 'Beosound Stage',
    category: 'soundbar',
    description: {
      sq: 'Soundbar premium me dizajn elegant dhe Dolby Atmos',
      en: 'Premium soundbar with elegant design and Dolby Atmos',
    },
    price: 1999,
    colors: [
      { name: 'Natural Aluminium', hex: '#c0c0c0' },
      { name: 'Smoked Oak', hex: '#5d4037' },
      { name: 'Black Anthracite', hex: '#2d2d2d' },
    ],
    specs: { 'Fuqia': '660W', 'Kanalet': '11 drajverë', 'Dolby Atmos': 'Po' },
  },
  {
    id: 'bo-beosound-theatre',
    slug: 'beosound-theatre',
    brand: 'bang-olufsen',
    name: 'Beosound Theatre',
    category: 'soundbar',
    description: {
      sq: 'Soundbar e avancuar për përvojë kinematografike në shtëpi',
      en: 'Advanced soundbar for cinematic home experience',
    },
    price: 6990,
    colors: [
      { name: 'Black Anthracite', hex: '#2d2d2d' },
      { name: 'Aluminium', hex: '#c0c0c0' },
    ],
    specs: { 'Fuqia': '800W', 'Kanalet': '12 drajverë', 'Dolby Atmos': 'Po' },
  },

  // ========== DEVIALET - SPEAKERS ==========
  {
    id: 'dev-phantom-i-108',
    slug: 'phantom-i-108db',
    brand: 'devialet',
    name: 'Phantom I - 108 dB',
    category: 'speakers',
    subcategory: 'phantom-i',
    description: {
      sq: 'Altoparlanti më i fuqishëm i Devialet me 108 dB tingull të pastër',
      en: 'Devialet\'s most powerful speaker with 108 dB pure sound',
    },
    price: 3200,
    colors: [
      { name: 'Iconic White', hex: '#f5f5f5' },
      { name: 'Matte Black', hex: '#1a1a1a' },
      { name: 'Gold', hex: '#c5a35a' },
    ],
    specs: { 'Fuqia': '1100W', 'SPL': '108 dB', 'Frekuenca': '14 Hz - 27 kHz' },
    featured: true,
  },
  {
    id: 'dev-phantom-i-103',
    slug: 'phantom-i-103db',
    brand: 'devialet',
    name: 'Phantom I - 103 dB',
    category: 'speakers',
    subcategory: 'phantom-i',
    description: {
      sq: 'Altoparlant kompakt me fuqi të jashtëzakonshme',
      en: 'Compact speaker with extraordinary power',
    },
    price: 2200,
    colors: [
      { name: 'Iconic White', hex: '#f5f5f5' },
      { name: 'Matte Black', hex: '#1a1a1a' },
    ],
    specs: { 'Fuqia': '500W', 'SPL': '103 dB', 'Frekuenca': '16 Hz - 25 kHz' },
  },
  {
    id: 'dev-phantom-ii-98',
    slug: 'phantom-ii-98db',
    brand: 'devialet',
    name: 'Phantom II - 98 dB',
    category: 'speakers',
    subcategory: 'phantom-ii',
    description: {
      sq: 'Altoparlant kompakt me performancë audiofil',
      en: 'Compact speaker with audiophile performance',
    },
    price: 1400,
    colors: [
      { name: 'Iconic White', hex: '#f5f5f5' },
      { name: 'Matte Black', hex: '#1a1a1a' },
    ],
    specs: { 'Fuqia': '400W', 'SPL': '98 dB', 'Frekuenca': '18 Hz - 21 kHz' },
  },
  {
    id: 'dev-phantom-ii-95',
    slug: 'phantom-ii-95db',
    brand: 'devialet',
    name: 'Phantom II - 95 dB',
    category: 'speakers',
    subcategory: 'phantom-ii',
    description: {
      sq: 'Hyrja perfekte në botën Devialet',
      en: 'The perfect entry into the Devialet world',
    },
    price: 1100,
    colors: [
      { name: 'Iconic White', hex: '#f5f5f5' },
      { name: 'Matte Black', hex: '#1a1a1a' },
    ],
    specs: { 'Fuqia': '300W', 'SPL': '95 dB', 'Frekuenca': '18 Hz - 21 kHz' },
  },
  {
    id: 'dev-mania',
    slug: 'devialet-mania',
    brand: 'devialet',
    name: 'Devialet Mania',
    category: 'speakers',
    subcategory: 'portable',
    description: {
      sq: 'Altoparlant portativ me tingull 360° dhe dizajn ikonik',
      en: 'Portable speaker with 360° sound and iconic design',
    },
    price: 890,
    colors: [
      { name: 'Black', hex: '#1a1a1a' },
      { name: 'Light Grey', hex: '#d4d4d4' },
      { name: 'Opéra de Paris', hex: '#c5a35a' },
    ],
    specs: { 'Bateria': '10 orë', 'Fuqia': '2x 8W', 'IP': 'IPX4' },
  },
  // ========== DEVIALET - SOUNDBAR ==========
  {
    id: 'dev-dione',
    slug: 'devialet-dione',
    brand: 'devialet',
    name: 'Devialet Dione',
    category: 'soundbar',
    description: {
      sq: 'Soundbar premium me Dolby Atmos 5.1.2 dhe dizajn skulptural',
      en: 'Premium soundbar with Dolby Atmos 5.1.2 and sculptural design',
    },
    price: 2490,
    colors: [
      { name: 'Matte Black', hex: '#1a1a1a' },
      { name: 'Iconic White', hex: '#f5f5f5' },
    ],
    specs: { 'Fuqia': '950W', 'Kanalet': '5.1.2', 'Dolby Atmos': 'Po' },
    featured: true,
  },
  // ========== DEVIALET - HEADPHONES ==========
  {
    id: 'dev-gemini-ii',
    slug: 'devialet-gemini-ii',
    brand: 'devialet',
    name: 'Devialet Gemini II',
    category: 'headphones',
    description: {
      sq: 'Kufje wireless me ANC adaptiv dhe tingull Devialet',
      en: 'Wireless earbuds with adaptive ANC and Devialet sound',
    },
    price: 399,
    colors: [
      { name: 'Matte Black', hex: '#1a1a1a' },
      { name: 'Iconic White', hex: '#f5f5f5' },
    ],
    specs: { 'Bateria': '8+32 orë', 'ANC': 'Adaptive', 'IP': 'IPX4' },
  },

  // ========== LOEWE - TV ==========
  {
    id: 'loewe-we-see-32',
    slug: 'loewe-we-see-32',
    brand: 'loewe',
    name: 'Loewe we.SEE 32',
    category: 'tv',
    subcategory: 'we-see',
    description: {
      sq: 'TV kompakt me dizajn elegant për çdo dhomë',
      en: 'Compact TV with elegant design for any room',
    },
    price: 899,
    colors: [
      { name: 'Storm Grey', hex: '#6b6b6b' },
      { name: 'Coral Red', hex: '#e74c3c' },
      { name: 'Aqua Blue', hex: '#5dade2' },
    ],
    specs: { 'Ekrani': '32" Full HD', 'Smart TV': 'Po', 'Zëri': '40W' },
  },
  {
    id: 'loewe-we-see-43',
    slug: 'loewe-we-see-43',
    brand: 'loewe',
    name: 'Loewe we.SEE 43',
    category: 'tv',
    subcategory: 'we-see',
    description: {
      sq: 'TV 4K me ngjyra të gjalla dhe dizajn modern',
      en: '4K TV with vivid colors and modern design',
    },
    price: 1199,
    colors: [
      { name: 'Storm Grey', hex: '#6b6b6b' },
      { name: 'Coral Red', hex: '#e74c3c' },
      { name: 'Aqua Blue', hex: '#5dade2' },
    ],
    specs: { 'Ekrani': '43" 4K UHD', 'Smart TV': 'Po', 'Zëri': '40W' },
  },
  {
    id: 'loewe-we-see-50',
    slug: 'loewe-we-see-50',
    brand: 'loewe',
    name: 'Loewe we.SEE 50',
    category: 'tv',
    subcategory: 'we-see',
    description: {
      sq: 'TV 4K i madh me tingull të integruar premium',
      en: 'Large 4K TV with integrated premium sound',
    },
    price: 1499,
    colors: [
      { name: 'Storm Grey', hex: '#6b6b6b' },
      { name: 'Coral Red', hex: '#e74c3c' },
      { name: 'Aqua Blue', hex: '#5dade2' },
    ],
    specs: { 'Ekrani': '50" 4K UHD', 'Smart TV': 'Po', 'Zëri': '40W' },
  },
  {
    id: 'loewe-we-see-55',
    slug: 'loewe-we-see-55',
    brand: 'loewe',
    name: 'Loewe we.SEE 55',
    category: 'tv',
    subcategory: 'we-see',
    description: {
      sq: 'TV 4K 55 inç me dizajn skandinav',
      en: '55 inch 4K TV with Scandinavian design',
    },
    price: 1699,
    colors: [
      { name: 'Storm Grey', hex: '#6b6b6b' },
      { name: 'Coral Red', hex: '#e74c3c' },
    ],
    specs: { 'Ekrani': '55" 4K UHD', 'Smart TV': 'Po', 'Zëri': '40W' },
  },
  {
    id: 'loewe-inspire-55',
    slug: 'loewe-inspire-55',
    brand: 'loewe',
    name: 'Loewe INSPIRE dr+ 55',
    category: 'tv',
    subcategory: 'inspire',
    description: {
      sq: 'TV OLED premium me teknologji avancuar',
      en: 'Premium OLED TV with advanced technology',
    },
    price: 2999,
    colors: [
      { name: 'Dark Grey', hex: '#3d3d3d' },
    ],
    specs: { 'Ekrani': '55" OLED', 'Rezolucioni': '4K', 'HDR': 'Dolby Vision' },
    featured: true,
  },
  {
    id: 'loewe-inspire-65',
    slug: 'loewe-inspire-65',
    brand: 'loewe',
    name: 'Loewe INSPIRE dr+ 65',
    category: 'tv',
    subcategory: 'inspire',
    description: {
      sq: 'TV OLED 65 inç për përvojë kinematografike',
      en: '65 inch OLED TV for cinematic experience',
    },
    price: 3999,
    colors: [
      { name: 'Dark Grey', hex: '#3d3d3d' },
    ],
    specs: { 'Ekrani': '65" OLED', 'Rezolucioni': '4K', 'HDR': 'Dolby Vision' },
  },
  {
    id: 'loewe-stellar-55',
    slug: 'loewe-stellar-55',
    brand: 'loewe',
    name: 'Loewe STELLAR 55',
    category: 'tv',
    subcategory: 'stellar',
    description: {
      sq: 'TV OLED me dizajn ultra-slim dhe tingull i integruar',
      en: 'OLED TV with ultra-slim design and integrated sound',
    },
    price: 3499,
    colors: [
      { name: 'Graphite Grey', hex: '#4a4a4a' },
    ],
    specs: { 'Ekrani': '55" OLED', 'Rezolucioni': '4K', 'Zëri': '60W' },
  },
  {
    id: 'loewe-stellar-65',
    slug: 'loewe-stellar-65',
    brand: 'loewe',
    name: 'Loewe STELLAR 65',
    category: 'tv',
    subcategory: 'stellar',
    description: {
      sq: 'TV OLED premium 65 inç me performancë superiore',
      en: '65 inch premium OLED TV with superior performance',
    },
    price: 4499,
    colors: [
      { name: 'Graphite Grey', hex: '#4a4a4a' },
    ],
    specs: { 'Ekrani': '65" OLED', 'Rezolucioni': '4K', 'Zëri': '80W' },
  },
  {
    id: 'loewe-iconic-55',
    slug: 'loewe-iconic-55',
    brand: 'loewe',
    name: 'Loewe ICONIC 55',
    category: 'tv',
    subcategory: 'iconic',
    description: {
      sq: 'TV OLED flagship me dizajn ikonik dhe performancë pa kompromis',
      en: 'Flagship OLED TV with iconic design and uncompromised performance',
    },
    price: null,
    colors: [
      { name: 'Graphite Grey', hex: '#4a4a4a' },
    ],
    specs: { 'Ekrani': '55" OLED', 'Rezolucioni': '4K', 'Zëri': '80W, Dolby Atmos' },
  },
  {
    id: 'loewe-iconic-65',
    slug: 'loewe-iconic-65',
    brand: 'loewe',
    name: 'Loewe ICONIC 65',
    category: 'tv',
    subcategory: 'iconic',
    description: {
      sq: 'TV OLED flagship 65 inç - kulmi i teknologjisë Loewe',
      en: '65 inch flagship OLED TV - the pinnacle of Loewe technology',
    },
    price: null,
    colors: [
      { name: 'Graphite Grey', hex: '#4a4a4a' },
    ],
    specs: { 'Ekrani': '65" OLED', 'Rezolucioni': '4K', 'Zëri': '80W, Dolby Atmos' },
  },
  {
    id: 'loewe-we-beam',
    slug: 'loewe-we-beam',
    brand: 'loewe',
    name: 'Loewe we.BEAM',
    category: 'tv',
    subcategory: 'we-beam',
    description: {
      sq: 'Projektor portativ me rezolucion Full HD dhe Android TV',
      en: 'Portable projector with Full HD resolution and Android TV',
    },
    price: 799,
    colors: [
      { name: 'Storm Grey', hex: '#6b6b6b' },
    ],
    specs: { 'Rezolucioni': 'Full HD', 'Ndriçimi': '300 ANSI lumens', 'Smart TV': 'Android TV' },
  },
  // ========== LOEWE - AUDIO ==========
  {
    id: 'loewe-klang-bar-i',
    slug: 'loewe-klang-bar-i',
    brand: 'loewe',
    name: 'Loewe klang bar i',
    category: 'audio',
    subcategory: 'soundbars',
    description: {
      sq: 'Soundbar premium me Dolby Atmos dhe dizajn minimalist',
      en: 'Premium soundbar with Dolby Atmos and minimalist design',
    },
    price: 1499,
    colors: [
      { name: 'Basalt Grey', hex: '#5a5a5a' },
    ],
    specs: { 'Fuqia': '260W', 'Kanalet': '5.1', 'Dolby Atmos': 'Po' },
  },
  {
    id: 'loewe-klang-bar-5',
    slug: 'loewe-klang-bar-5',
    brand: 'loewe',
    name: 'Loewe klang bar5 mr',
    category: 'audio',
    subcategory: 'soundbars',
    description: {
      sq: 'Soundbar me funksion multiroom dhe Bluetooth',
      en: 'Soundbar with multiroom capability and Bluetooth',
    },
    price: 999,
    colors: [
      { name: 'Basalt Grey', hex: '#5a5a5a' },
    ],
    specs: { 'Fuqia': '180W', 'Lidhja': 'Bluetooth, Wi-Fi', 'Multiroom': 'Po' },
  },
  {
    id: 'loewe-klang-sub-5',
    slug: 'loewe-klang-sub-5',
    brand: 'loewe',
    name: 'Loewe klang sub5',
    category: 'audio',
    subcategory: 'soundbars',
    description: {
      sq: 'Subwoofer wireless për sistemin Loewe',
      en: 'Wireless subwoofer for the Loewe system',
    },
    price: 799,
    colors: [
      { name: 'Basalt Grey', hex: '#5a5a5a' },
    ],
    specs: { 'Fuqia': '300W', 'Lidhja': 'Wireless', 'Drajveri': '8"' },
  },
  {
    id: 'loewe-klang-mr1',
    slug: 'loewe-klang-mr1',
    brand: 'loewe',
    name: 'Loewe klang mr1',
    category: 'audio',
    subcategory: 'multiroom',
    description: {
      sq: 'Altoparlant multiroom kompakt',
      en: 'Compact multiroom speaker',
    },
    price: 449,
    colors: [
      { name: 'Basalt Grey', hex: '#5a5a5a' },
      { name: 'Light Grey', hex: '#d4d4d4' },
    ],
    specs: { 'Fuqia': '50W', 'Lidhja': 'Wi-Fi, Bluetooth', 'Multiroom': 'Po' },
  },
  {
    id: 'loewe-klang-mr3',
    slug: 'loewe-klang-mr3',
    brand: 'loewe',
    name: 'Loewe klang mr3',
    category: 'audio',
    subcategory: 'multiroom',
    description: {
      sq: 'Altoparlant multiroom me tingull të pasur',
      en: 'Multiroom speaker with rich sound',
    },
    price: 699,
    colors: [
      { name: 'Basalt Grey', hex: '#5a5a5a' },
      { name: 'Light Grey', hex: '#d4d4d4' },
    ],
    specs: { 'Fuqia': '150W', 'Lidhja': 'Wi-Fi, Bluetooth', 'Multiroom': 'Po' },
  },
  {
    id: 'loewe-klang-mr5',
    slug: 'loewe-klang-mr5',
    brand: 'loewe',
    name: 'Loewe klang mr5',
    category: 'audio',
    subcategory: 'multiroom',
    description: {
      sq: 'Altoparlant multiroom premium me tingull të fuqishëm',
      en: 'Premium multiroom speaker with powerful sound',
    },
    price: 999,
    colors: [
      { name: 'Basalt Grey', hex: '#5a5a5a' },
    ],
    specs: { 'Fuqia': '300W', 'Lidhja': 'Wi-Fi, Bluetooth', 'Multiroom': 'Po' },
  },
  {
    id: 'loewe-radio',
    slug: 'loewe-radio',
    brand: 'loewe',
    name: 'Loewe radio',
    category: 'audio',
    subcategory: 'radio',
    description: {
      sq: 'Radio DAB+ me dizajn retro-modern',
      en: 'DAB+ radio with retro-modern design',
    },
    price: 349,
    colors: [
      { name: 'Basalt Grey', hex: '#5a5a5a' },
      { name: 'Light Grey', hex: '#d4d4d4' },
    ],
    specs: { 'Radio': 'DAB+, FM', 'Lidhja': 'Bluetooth', 'Zëri': '20W' },
  },
];

export function getProductsByBrand(brand: string): Product[] {
  return products.filter((p) => p.brand === brand);
}

export function getProductsByCategory(brand: string, category: string): Product[] {
  return products.filter((p) => p.brand === brand && p.category === category);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}
