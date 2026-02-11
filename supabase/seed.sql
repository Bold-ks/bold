-- Bold Kosova Seed Data
-- Migrated from TypeScript data files

-- ========== BANG & OLUFSEN - SPEAKERS ==========
INSERT INTO products (slug, brand, name, description_sq, description_en, category_sq, category_en, subcategory_sq, subcategory_en, base_price, is_contact_only, is_featured, sort_order)
VALUES
('beolab-8', 'bang-olufsen', 'Beolab 8', 'Altoparlant i fuqishëm për shtëpi me dizajn elegant dhe tingull të jashtëzakonshëm', 'Powerful home speaker with elegant design and extraordinary sound', 'altoparlantë', 'speakers', 'shtëpi', 'home', 3490, false, true, 1),
('beolab-28', 'bang-olufsen', 'Beolab 28', 'Altoparlant wireless me dizajn skulptural dhe tingull imersiv', 'Wireless speaker with sculptural design and immersive sound', 'altoparlantë', 'speakers', 'shtëpi', 'home', 9250, false, true, 2),
('beolab-50', 'bang-olufsen', 'Beolab 50', 'Altoparlanti më i avancuar nga Bang & Olufsen me teknologji akustike Beam Width Control', 'The most advanced Bang & Olufsen speaker with Beam Width Control acoustic technology', 'altoparlantë', 'speakers', 'shtëpi', 'home', NULL, true, true, 3),
('beosound-a5', 'bang-olufsen', 'Beosound A5', 'Altoparlant portativ premium me bateri të gjatë dhe tingull të pasur', 'Premium portable speaker with long battery and rich sound', 'altoparlantë', 'speakers', 'portativ', 'portable', 1199, false, false, 4),
('beosound-2', 'bang-olufsen', 'Beosound 2', 'Altoparlant shtëpie me dizajn konik ikonik dhe tingull 360°', 'Home speaker with iconic conical design and 360° sound', 'altoparlantë', 'speakers', 'shtëpi', 'home', 3250, false, false, 5),
('beosound-level', 'bang-olufsen', 'Beosound Level', 'Altoparlant portativ me dizajn modular dhe materiale të qëndrueshme', 'Portable speaker with modular design and sustainable materials', 'altoparlantë', 'speakers', 'portativ', 'portable', 1699, false, false, 6),
('beosound-explore', 'bang-olufsen', 'Beosound Explore', 'Altoparlant i fortë për aventura në natyrë', 'Rugged speaker for outdoor adventures', 'altoparlantë', 'speakers', 'outdoor', 'outdoor', 249, false, false, 7),

-- B&O Headphones
('beoplay-h100', 'bang-olufsen', 'Beoplay H100', 'Dëgjueset flagship me anulim aktiv të zhurmës dhe materiale premium', 'Flagship headphones with active noise cancellation and premium materials', 'kufje', 'headphones', NULL, NULL, 1199, false, true, 8),
('beoplay-hx', 'bang-olufsen', 'Beoplay HX', 'Dëgjuese wireless me komoditet superior dhe ANC', 'Wireless headphones with superior comfort and ANC', 'kufje', 'headphones', NULL, NULL, 499, false, false, 9),
('beoplay-ex', 'bang-olufsen', 'Beoplay EX', 'Kufje wireless premium me dizajn unik dhe ANC', 'Premium wireless earbuds with unique design and ANC', 'kufje', 'headphones', NULL, NULL, 399, false, false, 10),
('beoplay-eq', 'bang-olufsen', 'Beoplay EQ', 'Kufje adaptive me tingull audiofil', 'Adaptive earbuds with audiophile sound', 'kufje', 'headphones', NULL, NULL, 349, false, false, 11),

-- B&O TV
('beovision-contour', 'bang-olufsen', 'Beovision Contour', 'TV OLED me dizajn të integruar dhe tingull të fuqishëm', 'OLED TV with integrated design and powerful sound', 'televizorë', 'tv', NULL, NULL, 7990, false, true, 12),
('beovision-theatre', 'bang-olufsen', 'Beovision Theatre', 'TV OLED premium me soundbar të integruar Dolby Atmos', 'Premium OLED TV with integrated Dolby Atmos soundbar', 'televizorë', 'tv', NULL, NULL, NULL, true, false, 13),

-- B&O Soundbar
('beosound-stage', 'bang-olufsen', 'Beosound Stage', 'Soundbar premium me dizajn elegant dhe Dolby Atmos', 'Premium soundbar with elegant design and Dolby Atmos', 'soundbar', 'soundbar', NULL, NULL, 1999, false, false, 14),
('beosound-theatre', 'bang-olufsen', 'Beosound Theatre', 'Soundbar e avancuar për përvojë kinematografike në shtëpi', 'Advanced soundbar for cinematic home experience', 'soundbar', 'soundbar', NULL, NULL, 6990, false, false, 15),

-- ========== DEVIALET ==========
('phantom-i-108db', 'devialet', 'Phantom I - 108 dB', 'Altoparlanti më i fuqishëm i Devialet me 108 dB tingull të pastër', 'Devialet''s most powerful speaker with 108 dB pure sound', 'altoparlantë', 'speakers', 'phantom-i', 'phantom-i', 3200, false, true, 1),
('phantom-i-103db', 'devialet', 'Phantom I - 103 dB', 'Altoparlant kompakt me fuqi të jashtëzakonshme', 'Compact speaker with extraordinary power', 'altoparlantë', 'speakers', 'phantom-i', 'phantom-i', 2200, false, false, 2),
('phantom-ii-98db', 'devialet', 'Phantom II - 98 dB', 'Altoparlant kompakt me performancë audiofil', 'Compact speaker with audiophile performance', 'altoparlantë', 'speakers', 'phantom-ii', 'phantom-ii', 1400, false, false, 3),
('phantom-ii-95db', 'devialet', 'Phantom II - 95 dB', 'Hyrja perfekte në botën Devialet', 'The perfect entry into the Devialet world', 'altoparlantë', 'speakers', 'phantom-ii', 'phantom-ii', 1100, false, false, 4),
('devialet-mania', 'devialet', 'Devialet Mania', 'Altoparlant portativ me tingull 360° dhe dizajn ikonik', 'Portable speaker with 360° sound and iconic design', 'altoparlantë', 'speakers', 'portativ', 'portable', 890, false, false, 5),
('devialet-dione', 'devialet', 'Devialet Dione', 'Soundbar premium me Dolby Atmos 5.1.2 dhe dizajn skulptural', 'Premium soundbar with Dolby Atmos 5.1.2 and sculptural design', 'soundbar', 'soundbar', NULL, NULL, 2490, false, true, 6),
('devialet-gemini-ii', 'devialet', 'Devialet Gemini II', 'Kufje wireless me ANC adaptiv dhe tingull Devialet', 'Wireless earbuds with adaptive ANC and Devialet sound', 'kufje', 'headphones', NULL, NULL, 399, false, false, 7),

-- ========== LOEWE - TV ==========
('loewe-we-see-32', 'loewe', 'Loewe we.SEE 32', 'TV kompakt me dizajn elegant për çdo dhomë', 'Compact TV with elegant design for any room', 'televizorë', 'tv', 'we-see', 'we-see', 899, false, false, 1),
('loewe-we-see-43', 'loewe', 'Loewe we.SEE 43', 'TV 4K me ngjyra të gjalla dhe dizajn modern', '4K TV with vivid colors and modern design', 'televizorë', 'tv', 'we-see', 'we-see', 1199, false, false, 2),
('loewe-we-see-50', 'loewe', 'Loewe we.SEE 50', 'TV 4K i madh me tingull të integruar premium', 'Large 4K TV with integrated premium sound', 'televizorë', 'tv', 'we-see', 'we-see', 1499, false, false, 3),
('loewe-we-see-55', 'loewe', 'Loewe we.SEE 55', 'TV 4K 55 inç me dizajn skandinav', '55 inch 4K TV with Scandinavian design', 'televizorë', 'tv', 'we-see', 'we-see', 1699, false, false, 4),
('loewe-inspire-55', 'loewe', 'Loewe INSPIRE dr+ 55', 'TV OLED premium me teknologji avancuar', 'Premium OLED TV with advanced technology', 'televizorë', 'tv', 'inspire', 'inspire', 2999, false, true, 5),
('loewe-inspire-65', 'loewe', 'Loewe INSPIRE dr+ 65', 'TV OLED 65 inç për përvojë kinematografike', '65 inch OLED TV for cinematic experience', 'televizorë', 'tv', 'inspire', 'inspire', 3999, false, false, 6),
('loewe-stellar-55', 'loewe', 'Loewe STELLAR 55', 'TV OLED me dizajn ultra-slim dhe tingull i integruar', 'OLED TV with ultra-slim design and integrated sound', 'televizorë', 'tv', 'stellar', 'stellar', 3499, false, false, 7),
('loewe-stellar-65', 'loewe', 'Loewe STELLAR 65', 'TV OLED premium 65 inç me performancë superiore', '65 inch premium OLED TV with superior performance', 'televizorë', 'tv', 'stellar', 'stellar', 4499, false, false, 8),
('loewe-iconic-55', 'loewe', 'Loewe ICONIC 55', 'TV OLED flagship me dizajn ikonik dhe performancë pa kompromis', 'Flagship OLED TV with iconic design and uncompromised performance', 'televizorë', 'tv', 'iconic', 'iconic', NULL, true, false, 9),
('loewe-iconic-65', 'loewe', 'Loewe ICONIC 65', 'TV OLED flagship 65 inç - kulmi i teknologjisë Loewe', '65 inch flagship OLED TV - the pinnacle of Loewe technology', 'televizorë', 'tv', 'iconic', 'iconic', NULL, true, false, 10),
('loewe-we-beam', 'loewe', 'Loewe we.BEAM', 'Projektor portativ me rezolucion Full HD dhe Android TV', 'Portable projector with Full HD resolution and Android TV', 'televizorë', 'tv', 'we-beam', 'we-beam', 799, false, false, 11),

-- Loewe Audio
('loewe-klang-bar-i', 'loewe', 'Loewe klang bar i', 'Soundbar premium me Dolby Atmos dhe dizajn minimalist', 'Premium soundbar with Dolby Atmos and minimalist design', 'audio', 'audio', 'soundbars', 'soundbars', 1499, false, false, 12),
('loewe-klang-bar-5', 'loewe', 'Loewe klang bar5 mr', 'Soundbar me funksion multiroom dhe Bluetooth', 'Soundbar with multiroom capability and Bluetooth', 'audio', 'audio', 'soundbars', 'soundbars', 999, false, false, 13),
('loewe-klang-sub-5', 'loewe', 'Loewe klang sub5', 'Subwoofer wireless për sistemin Loewe', 'Wireless subwoofer for the Loewe system', 'audio', 'audio', 'soundbars', 'soundbars', 799, false, false, 14),
('loewe-klang-mr1', 'loewe', 'Loewe klang mr1', 'Altoparlant multiroom kompakt', 'Compact multiroom speaker', 'audio', 'audio', 'multiroom', 'multiroom', 449, false, false, 15),
('loewe-klang-mr3', 'loewe', 'Loewe klang mr3', 'Altoparlant multiroom me tingull të pasur', 'Multiroom speaker with rich sound', 'audio', 'audio', 'multiroom', 'multiroom', 699, false, false, 16),
('loewe-klang-mr5', 'loewe', 'Loewe klang mr5', 'Altoparlant multiroom premium me tingull të fuqishëm', 'Premium multiroom speaker with powerful sound', 'audio', 'audio', 'multiroom', 'multiroom', 999, false, false, 17),
('loewe-radio', 'loewe', 'Loewe radio', 'Radio DAB+ me dizajn retro-modern', 'DAB+ radio with retro-modern design', 'audio', 'audio', 'radio', 'radio', 349, false, false, 18);

-- ========== PRODUCT VARIANTS (colors) ==========
-- B&O Beolab 8
INSERT INTO product_variants (product_id, color_name, color_hex, sort_order)
SELECT p.id, v.color_name, v.color_hex, v.sort_order
FROM products p
CROSS JOIN (VALUES
  ('Black Anthracite', '#2d2d2d', 0),
  ('Natural Aluminium', '#c0c0c0', 1)
) AS v(color_name, color_hex, sort_order)
WHERE p.slug = 'beolab-8';

-- B&O Beolab 28
INSERT INTO product_variants (product_id, color_name, color_hex, sort_order)
SELECT p.id, v.color_name, v.color_hex, v.sort_order
FROM products p
CROSS JOIN (VALUES
  ('Black Anthracite', '#2d2d2d', 0),
  ('Gold Tone', '#c5a35a', 1),
  ('Silver', '#c0c0c0', 2)
) AS v(color_name, color_hex, sort_order)
WHERE p.slug = 'beolab-28';

-- B&O Beolab 50
INSERT INTO product_variants (product_id, color_name, color_hex, sort_order)
SELECT p.id, v.color_name, v.color_hex, v.sort_order
FROM products p
CROSS JOIN (VALUES
  ('Black Anthracite', '#2d2d2d', 0),
  ('Natural Aluminium', '#c0c0c0', 1)
) AS v(color_name, color_hex, sort_order)
WHERE p.slug = 'beolab-50';

-- B&O Beosound A5
INSERT INTO product_variants (product_id, color_name, color_hex, sort_order)
SELECT p.id, v.color_name, v.color_hex, v.sort_order
FROM products p
CROSS JOIN (VALUES
  ('Nordic Weave', '#8b7d6b', 0),
  ('Dark Oak', '#3e2723', 1),
  ('Black Anthracite', '#2d2d2d', 2)
) AS v(color_name, color_hex, sort_order)
WHERE p.slug = 'beosound-a5';

-- B&O Beosound 2
INSERT INTO product_variants (product_id, color_name, color_hex, sort_order)
SELECT p.id, v.color_name, v.color_hex, v.sort_order
FROM products p
CROSS JOIN (VALUES
  ('Black Anthracite', '#2d2d2d', 0),
  ('Natural Aluminium', '#c0c0c0', 1),
  ('Gold Tone', '#c5a35a', 2)
) AS v(color_name, color_hex, sort_order)
WHERE p.slug = 'beosound-2';

-- B&O Beosound Level
INSERT INTO product_variants (product_id, color_name, color_hex, sort_order)
SELECT p.id, v.color_name, v.color_hex, v.sort_order
FROM products p
CROSS JOIN (VALUES
  ('Gold Tone', '#c5a35a', 0),
  ('Black Anthracite', '#2d2d2d', 1),
  ('Natural', '#d4c5a9', 2)
) AS v(color_name, color_hex, sort_order)
WHERE p.slug = 'beosound-level';

-- B&O Beosound Explore
INSERT INTO product_variants (product_id, color_name, color_hex, sort_order)
SELECT p.id, v.color_name, v.color_hex, v.sort_order
FROM products p
CROSS JOIN (VALUES
  ('Black Anthracite', '#2d2d2d', 0),
  ('Green', '#2e5339', 1),
  ('Grey Mist', '#9e9e9e', 2)
) AS v(color_name, color_hex, sort_order)
WHERE p.slug = 'beosound-explore';

-- B&O Beoplay H100
INSERT INTO product_variants (product_id, color_name, color_hex, sort_order)
SELECT p.id, v.color_name, v.color_hex, v.sort_order
FROM products p
CROSS JOIN (VALUES
  ('Black Anthracite', '#2d2d2d', 0),
  ('Hourglass Sand', '#c5b79e', 1),
  ('Infinite Blue', '#1a3a5c', 2)
) AS v(color_name, color_hex, sort_order)
WHERE p.slug = 'beoplay-h100';

-- B&O Beoplay HX
INSERT INTO product_variants (product_id, color_name, color_hex, sort_order)
SELECT p.id, v.color_name, v.color_hex, v.sort_order
FROM products p
CROSS JOIN (VALUES
  ('Black Anthracite', '#2d2d2d', 0),
  ('Sand', '#c5b79e', 1),
  ('Timber', '#4a3728', 2)
) AS v(color_name, color_hex, sort_order)
WHERE p.slug = 'beoplay-hx';

-- B&O Beoplay EX
INSERT INTO product_variants (product_id, color_name, color_hex, sort_order)
SELECT p.id, v.color_name, v.color_hex, v.sort_order
FROM products p
CROSS JOIN (VALUES
  ('Black Anthracite', '#2d2d2d', 0),
  ('Gold Tone', '#c5a35a', 1),
  ('Sand', '#c5b79e', 2)
) AS v(color_name, color_hex, sort_order)
WHERE p.slug = 'beoplay-ex';

-- B&O Beoplay EQ
INSERT INTO product_variants (product_id, color_name, color_hex, sort_order)
SELECT p.id, v.color_name, v.color_hex, v.sort_order
FROM products p
CROSS JOIN (VALUES
  ('Black', '#000000', 0),
  ('Sand', '#c5b79e', 1)
) AS v(color_name, color_hex, sort_order)
WHERE p.slug = 'beoplay-eq';

-- B&O Beovision Contour
INSERT INTO product_variants (product_id, color_name, color_hex, sort_order)
SELECT p.id, v.color_name, v.color_hex, v.sort_order
FROM products p
CROSS JOIN (VALUES
  ('Black Anthracite', '#2d2d2d', 0),
  ('Light Oak', '#c5a35a', 1)
) AS v(color_name, color_hex, sort_order)
WHERE p.slug = 'beovision-contour';

-- B&O Beovision Theatre
INSERT INTO product_variants (product_id, color_name, color_hex, sort_order)
SELECT p.id, v.color_name, v.color_hex, v.sort_order
FROM products p
CROSS JOIN (VALUES
  ('Black Anthracite', '#2d2d2d', 0),
  ('Aluminium', '#c0c0c0', 1)
) AS v(color_name, color_hex, sort_order)
WHERE p.slug = 'beovision-theatre';

-- B&O Beosound Stage
INSERT INTO product_variants (product_id, color_name, color_hex, sort_order)
SELECT p.id, v.color_name, v.color_hex, v.sort_order
FROM products p
CROSS JOIN (VALUES
  ('Natural Aluminium', '#c0c0c0', 0),
  ('Smoked Oak', '#5d4037', 1),
  ('Black Anthracite', '#2d2d2d', 2)
) AS v(color_name, color_hex, sort_order)
WHERE p.slug = 'beosound-stage';

-- B&O Beosound Theatre
INSERT INTO product_variants (product_id, color_name, color_hex, sort_order)
SELECT p.id, v.color_name, v.color_hex, v.sort_order
FROM products p
CROSS JOIN (VALUES
  ('Black Anthracite', '#2d2d2d', 0),
  ('Aluminium', '#c0c0c0', 1)
) AS v(color_name, color_hex, sort_order)
WHERE p.slug = 'beosound-theatre';

-- Devialet Phantom I 108
INSERT INTO product_variants (product_id, color_name, color_hex, sort_order)
SELECT p.id, v.color_name, v.color_hex, v.sort_order
FROM products p
CROSS JOIN (VALUES
  ('Iconic White', '#f5f5f5', 0),
  ('Matte Black', '#1a1a1a', 1),
  ('Gold', '#c5a35a', 2)
) AS v(color_name, color_hex, sort_order)
WHERE p.slug = 'phantom-i-108db';

-- Devialet Phantom I 103
INSERT INTO product_variants (product_id, color_name, color_hex, sort_order)
SELECT p.id, v.color_name, v.color_hex, v.sort_order
FROM products p
CROSS JOIN (VALUES
  ('Iconic White', '#f5f5f5', 0),
  ('Matte Black', '#1a1a1a', 1)
) AS v(color_name, color_hex, sort_order)
WHERE p.slug = 'phantom-i-103db';

-- Devialet Phantom II 98
INSERT INTO product_variants (product_id, color_name, color_hex, sort_order)
SELECT p.id, v.color_name, v.color_hex, v.sort_order
FROM products p
CROSS JOIN (VALUES
  ('Iconic White', '#f5f5f5', 0),
  ('Matte Black', '#1a1a1a', 1)
) AS v(color_name, color_hex, sort_order)
WHERE p.slug = 'phantom-ii-98db';

-- Devialet Phantom II 95
INSERT INTO product_variants (product_id, color_name, color_hex, sort_order)
SELECT p.id, v.color_name, v.color_hex, v.sort_order
FROM products p
CROSS JOIN (VALUES
  ('Iconic White', '#f5f5f5', 0),
  ('Matte Black', '#1a1a1a', 1)
) AS v(color_name, color_hex, sort_order)
WHERE p.slug = 'phantom-ii-95db';

-- Devialet Mania
INSERT INTO product_variants (product_id, color_name, color_hex, sort_order)
SELECT p.id, v.color_name, v.color_hex, v.sort_order
FROM products p
CROSS JOIN (VALUES
  ('Black', '#1a1a1a', 0),
  ('Light Grey', '#d4d4d4', 1),
  ('Opéra de Paris', '#c5a35a', 2)
) AS v(color_name, color_hex, sort_order)
WHERE p.slug = 'devialet-mania';

-- Devialet Dione
INSERT INTO product_variants (product_id, color_name, color_hex, sort_order)
SELECT p.id, v.color_name, v.color_hex, v.sort_order
FROM products p
CROSS JOIN (VALUES
  ('Matte Black', '#1a1a1a', 0),
  ('Iconic White', '#f5f5f5', 1)
) AS v(color_name, color_hex, sort_order)
WHERE p.slug = 'devialet-dione';

-- Devialet Gemini II
INSERT INTO product_variants (product_id, color_name, color_hex, sort_order)
SELECT p.id, v.color_name, v.color_hex, v.sort_order
FROM products p
CROSS JOIN (VALUES
  ('Matte Black', '#1a1a1a', 0),
  ('Iconic White', '#f5f5f5', 1)
) AS v(color_name, color_hex, sort_order)
WHERE p.slug = 'devialet-gemini-ii';

-- Loewe we.SEE 32
INSERT INTO product_variants (product_id, color_name, color_hex, sort_order)
SELECT p.id, v.color_name, v.color_hex, v.sort_order
FROM products p
CROSS JOIN (VALUES
  ('Storm Grey', '#6b6b6b', 0),
  ('Coral Red', '#e74c3c', 1),
  ('Aqua Blue', '#5dade2', 2)
) AS v(color_name, color_hex, sort_order)
WHERE p.slug = 'loewe-we-see-32';

-- Loewe we.SEE 43
INSERT INTO product_variants (product_id, color_name, color_hex, sort_order)
SELECT p.id, v.color_name, v.color_hex, v.sort_order
FROM products p
CROSS JOIN (VALUES
  ('Storm Grey', '#6b6b6b', 0),
  ('Coral Red', '#e74c3c', 1),
  ('Aqua Blue', '#5dade2', 2)
) AS v(color_name, color_hex, sort_order)
WHERE p.slug = 'loewe-we-see-43';

-- Loewe we.SEE 50
INSERT INTO product_variants (product_id, color_name, color_hex, sort_order)
SELECT p.id, v.color_name, v.color_hex, v.sort_order
FROM products p
CROSS JOIN (VALUES
  ('Storm Grey', '#6b6b6b', 0),
  ('Coral Red', '#e74c3c', 1),
  ('Aqua Blue', '#5dade2', 2)
) AS v(color_name, color_hex, sort_order)
WHERE p.slug = 'loewe-we-see-50';

-- Loewe we.SEE 55
INSERT INTO product_variants (product_id, color_name, color_hex, sort_order)
SELECT p.id, v.color_name, v.color_hex, v.sort_order
FROM products p
CROSS JOIN (VALUES
  ('Storm Grey', '#6b6b6b', 0),
  ('Coral Red', '#e74c3c', 1)
) AS v(color_name, color_hex, sort_order)
WHERE p.slug = 'loewe-we-see-55';

-- Loewe INSPIRE 55
INSERT INTO product_variants (product_id, color_name, color_hex, sort_order)
SELECT p.id, v.color_name, v.color_hex, v.sort_order
FROM products p
CROSS JOIN (VALUES
  ('Dark Grey', '#3d3d3d', 0)
) AS v(color_name, color_hex, sort_order)
WHERE p.slug = 'loewe-inspire-55';

-- Loewe INSPIRE 65
INSERT INTO product_variants (product_id, color_name, color_hex, sort_order)
SELECT p.id, v.color_name, v.color_hex, v.sort_order
FROM products p
CROSS JOIN (VALUES
  ('Dark Grey', '#3d3d3d', 0)
) AS v(color_name, color_hex, sort_order)
WHERE p.slug = 'loewe-inspire-65';

-- Loewe STELLAR 55
INSERT INTO product_variants (product_id, color_name, color_hex, sort_order)
SELECT p.id, v.color_name, v.color_hex, v.sort_order
FROM products p
CROSS JOIN (VALUES
  ('Graphite Grey', '#4a4a4a', 0)
) AS v(color_name, color_hex, sort_order)
WHERE p.slug = 'loewe-stellar-55';

-- Loewe STELLAR 65
INSERT INTO product_variants (product_id, color_name, color_hex, sort_order)
SELECT p.id, v.color_name, v.color_hex, v.sort_order
FROM products p
CROSS JOIN (VALUES
  ('Graphite Grey', '#4a4a4a', 0)
) AS v(color_name, color_hex, sort_order)
WHERE p.slug = 'loewe-stellar-65';

-- Loewe ICONIC 55
INSERT INTO product_variants (product_id, color_name, color_hex, sort_order)
SELECT p.id, v.color_name, v.color_hex, v.sort_order
FROM products p
CROSS JOIN (VALUES
  ('Graphite Grey', '#4a4a4a', 0)
) AS v(color_name, color_hex, sort_order)
WHERE p.slug = 'loewe-iconic-55';

-- Loewe ICONIC 65
INSERT INTO product_variants (product_id, color_name, color_hex, sort_order)
SELECT p.id, v.color_name, v.color_hex, v.sort_order
FROM products p
CROSS JOIN (VALUES
  ('Graphite Grey', '#4a4a4a', 0)
) AS v(color_name, color_hex, sort_order)
WHERE p.slug = 'loewe-iconic-65';

-- Loewe we.BEAM
INSERT INTO product_variants (product_id, color_name, color_hex, sort_order)
SELECT p.id, v.color_name, v.color_hex, v.sort_order
FROM products p
CROSS JOIN (VALUES
  ('Storm Grey', '#6b6b6b', 0)
) AS v(color_name, color_hex, sort_order)
WHERE p.slug = 'loewe-we-beam';

-- Loewe klang bar i
INSERT INTO product_variants (product_id, color_name, color_hex, sort_order)
SELECT p.id, v.color_name, v.color_hex, v.sort_order
FROM products p
CROSS JOIN (VALUES
  ('Basalt Grey', '#5a5a5a', 0)
) AS v(color_name, color_hex, sort_order)
WHERE p.slug = 'loewe-klang-bar-i';

-- Loewe klang bar5 mr
INSERT INTO product_variants (product_id, color_name, color_hex, sort_order)
SELECT p.id, v.color_name, v.color_hex, v.sort_order
FROM products p
CROSS JOIN (VALUES
  ('Basalt Grey', '#5a5a5a', 0)
) AS v(color_name, color_hex, sort_order)
WHERE p.slug = 'loewe-klang-bar-5';

-- Loewe klang sub5
INSERT INTO product_variants (product_id, color_name, color_hex, sort_order)
SELECT p.id, v.color_name, v.color_hex, v.sort_order
FROM products p
CROSS JOIN (VALUES
  ('Basalt Grey', '#5a5a5a', 0)
) AS v(color_name, color_hex, sort_order)
WHERE p.slug = 'loewe-klang-sub-5';

-- Loewe klang mr1
INSERT INTO product_variants (product_id, color_name, color_hex, sort_order)
SELECT p.id, v.color_name, v.color_hex, v.sort_order
FROM products p
CROSS JOIN (VALUES
  ('Basalt Grey', '#5a5a5a', 0),
  ('Light Grey', '#d4d4d4', 1)
) AS v(color_name, color_hex, sort_order)
WHERE p.slug = 'loewe-klang-mr1';

-- Loewe klang mr3
INSERT INTO product_variants (product_id, color_name, color_hex, sort_order)
SELECT p.id, v.color_name, v.color_hex, v.sort_order
FROM products p
CROSS JOIN (VALUES
  ('Basalt Grey', '#5a5a5a', 0),
  ('Light Grey', '#d4d4d4', 1)
) AS v(color_name, color_hex, sort_order)
WHERE p.slug = 'loewe-klang-mr3';

-- Loewe klang mr5
INSERT INTO product_variants (product_id, color_name, color_hex, sort_order)
SELECT p.id, v.color_name, v.color_hex, v.sort_order
FROM products p
CROSS JOIN (VALUES
  ('Basalt Grey', '#5a5a5a', 0)
) AS v(color_name, color_hex, sort_order)
WHERE p.slug = 'loewe-klang-mr5';

-- Loewe radio
INSERT INTO product_variants (product_id, color_name, color_hex, sort_order)
SELECT p.id, v.color_name, v.color_hex, v.sort_order
FROM products p
CROSS JOIN (VALUES
  ('Basalt Grey', '#5a5a5a', 0),
  ('Light Grey', '#d4d4d4', 1)
) AS v(color_name, color_hex, sort_order)
WHERE p.slug = 'loewe-radio';

-- ========== PRODUCT SPECS ==========
-- We'll use the Albanian spec keys from the original data and provide English translations

-- Beolab 8
INSERT INTO product_specs (product_id, spec_key_sq, spec_key_en, spec_value_sq, spec_value_en, sort_order)
SELECT p.id, s.key_sq, s.key_en, s.val_sq, s.val_en, s.so
FROM products p
CROSS JOIN (VALUES
  ('Fuqia', 'Power', '320W', '320W', 0),
  ('Lidhja', 'Connectivity', 'Wi-Fi, Bluetooth', 'Wi-Fi, Bluetooth', 1),
  ('Përmasat', 'Dimensions', '26.5 x 16.2 x 16.2 cm', '26.5 x 16.2 x 16.2 cm', 2)
) AS s(key_sq, key_en, val_sq, val_en, so)
WHERE p.slug = 'beolab-8';

-- Beolab 28
INSERT INTO product_specs (product_id, spec_key_sq, spec_key_en, spec_value_sq, spec_value_en, sort_order)
SELECT p.id, s.key_sq, s.key_en, s.val_sq, s.val_en, s.so
FROM products p
CROSS JOIN (VALUES
  ('Fuqia', 'Power', '520W', '520W', 0),
  ('Lidhja', 'Connectivity', 'Wi-Fi, Bluetooth 5.1', 'Wi-Fi, Bluetooth 5.1', 1),
  ('Përmasat', 'Dimensions', '120 x 17.4 cm', '120 x 17.4 cm', 2)
) AS s(key_sq, key_en, val_sq, val_en, so)
WHERE p.slug = 'beolab-28';

-- Beolab 50
INSERT INTO product_specs (product_id, spec_key_sq, spec_key_en, spec_value_sq, spec_value_en, sort_order)
SELECT p.id, s.key_sq, s.key_en, s.val_sq, s.val_en, s.so
FROM products p
CROSS JOIN (VALUES
  ('Fuqia', 'Power', '2100W', '2100W', 0),
  ('Drajverët', 'Drivers', '7', '7', 1),
  ('Përmasat', 'Dimensions', '107.5 x 39.5 cm', '107.5 x 39.5 cm', 2)
) AS s(key_sq, key_en, val_sq, val_en, so)
WHERE p.slug = 'beolab-50';

-- Beosound A5
INSERT INTO product_specs (product_id, spec_key_sq, spec_key_en, spec_value_sq, spec_value_en, sort_order)
SELECT p.id, s.key_sq, s.key_en, s.val_sq, s.val_en, s.so
FROM products p
CROSS JOIN (VALUES
  ('Bateria', 'Battery', '12 orë', '12 hours', 0),
  ('Fuqia', 'Power', '280W', '280W', 1),
  ('IP', 'IP Rating', 'IP65', 'IP65', 2)
) AS s(key_sq, key_en, val_sq, val_en, so)
WHERE p.slug = 'beosound-a5';

-- Beosound 2
INSERT INTO product_specs (product_id, spec_key_sq, spec_key_en, spec_value_sq, spec_value_en, sort_order)
SELECT p.id, s.key_sq, s.key_en, s.val_sq, s.val_en, s.so
FROM products p
CROSS JOIN (VALUES
  ('Fuqia', 'Power', '420W', '420W', 0),
  ('Lidhja', 'Connectivity', 'Wi-Fi, Bluetooth, AirPlay 2', 'Wi-Fi, Bluetooth, AirPlay 2', 1)
) AS s(key_sq, key_en, val_sq, val_en, so)
WHERE p.slug = 'beosound-2';

-- Beosound Level
INSERT INTO product_specs (product_id, spec_key_sq, spec_key_en, spec_value_sq, spec_value_en, sort_order)
SELECT p.id, s.key_sq, s.key_en, s.val_sq, s.val_en, s.so
FROM products p
CROSS JOIN (VALUES
  ('Bateria', 'Battery', '16 orë', '16 hours', 0),
  ('Fuqia', 'Power', '124W', '124W', 1),
  ('Lidhja', 'Connectivity', 'Wi-Fi, Bluetooth 5.1', 'Wi-Fi, Bluetooth 5.1', 2)
) AS s(key_sq, key_en, val_sq, val_en, so)
WHERE p.slug = 'beosound-level';

-- Beosound Explore
INSERT INTO product_specs (product_id, spec_key_sq, spec_key_en, spec_value_sq, spec_value_en, sort_order)
SELECT p.id, s.key_sq, s.key_en, s.val_sq, s.val_en, s.so
FROM products p
CROSS JOIN (VALUES
  ('Bateria', 'Battery', '27 orë', '27 hours', 0),
  ('IP', 'IP Rating', 'IP67', 'IP67', 1),
  ('Pesha', 'Weight', '631g', '631g', 2)
) AS s(key_sq, key_en, val_sq, val_en, so)
WHERE p.slug = 'beosound-explore';

-- Beoplay H100
INSERT INTO product_specs (product_id, spec_key_sq, spec_key_en, spec_value_sq, spec_value_en, sort_order)
SELECT p.id, s.key_sq, s.key_en, s.val_sq, s.val_en, s.so
FROM products p
CROSS JOIN (VALUES
  ('Bateria', 'Battery', '40 orë', '40 hours', 0),
  ('ANC', 'ANC', 'Adaptive', 'Adaptive', 1),
  ('Drajveri', 'Driver', '40mm Titanium', '40mm Titanium', 2)
) AS s(key_sq, key_en, val_sq, val_en, so)
WHERE p.slug = 'beoplay-h100';

-- Beoplay HX
INSERT INTO product_specs (product_id, spec_key_sq, spec_key_en, spec_value_sq, spec_value_en, sort_order)
SELECT p.id, s.key_sq, s.key_en, s.val_sq, s.val_en, s.so
FROM products p
CROSS JOIN (VALUES
  ('Bateria', 'Battery', '35 orë', '35 hours', 0),
  ('ANC', 'ANC', 'Adaptive', 'Adaptive', 1),
  ('Drajveri', 'Driver', '40mm', '40mm', 2)
) AS s(key_sq, key_en, val_sq, val_en, so)
WHERE p.slug = 'beoplay-hx';

-- Beoplay EX
INSERT INTO product_specs (product_id, spec_key_sq, spec_key_en, spec_value_sq, spec_value_en, sort_order)
SELECT p.id, s.key_sq, s.key_en, s.val_sq, s.val_en, s.so
FROM products p
CROSS JOIN (VALUES
  ('Bateria', 'Battery', '6+20 orë', '6+20 hours', 0),
  ('ANC', 'ANC', 'Adaptive', 'Adaptive', 1),
  ('IP', 'IP Rating', 'IP57', 'IP57', 2)
) AS s(key_sq, key_en, val_sq, val_en, so)
WHERE p.slug = 'beoplay-ex';

-- Beoplay EQ
INSERT INTO product_specs (product_id, spec_key_sq, spec_key_en, spec_value_sq, spec_value_en, sort_order)
SELECT p.id, s.key_sq, s.key_en, s.val_sq, s.val_en, s.so
FROM products p
CROSS JOIN (VALUES
  ('Bateria', 'Battery', '6+20 orë', '6+20 hours', 0),
  ('ANC', 'ANC', 'Adaptive', 'Adaptive', 1),
  ('Codec', 'Codec', 'aptX Adaptive', 'aptX Adaptive', 2)
) AS s(key_sq, key_en, val_sq, val_en, so)
WHERE p.slug = 'beoplay-eq';

-- Beovision Contour
INSERT INTO product_specs (product_id, spec_key_sq, spec_key_en, spec_value_sq, spec_value_en, sort_order)
SELECT p.id, s.key_sq, s.key_en, s.val_sq, s.val_en, s.so
FROM products p
CROSS JOIN (VALUES
  ('Ekrani', 'Screen', '48" / 55" OLED', '48" / 55" OLED', 0),
  ('Rezolucioni', 'Resolution', '4K', '4K', 1),
  ('Zëri', 'Sound', '3.1 kanale, 240W', '3.1 channels, 240W', 2)
) AS s(key_sq, key_en, val_sq, val_en, so)
WHERE p.slug = 'beovision-contour';

-- Beovision Theatre
INSERT INTO product_specs (product_id, spec_key_sq, spec_key_en, spec_value_sq, spec_value_en, sort_order)
SELECT p.id, s.key_sq, s.key_en, s.val_sq, s.val_en, s.so
FROM products p
CROSS JOIN (VALUES
  ('Ekrani', 'Screen', '55" / 65" / 77" OLED', '55" / 65" / 77" OLED', 0),
  ('Rezolucioni', 'Resolution', '4K', '4K', 1),
  ('Zëri', 'Sound', 'Dolby Atmos, 12 drajverë', 'Dolby Atmos, 12 drivers', 2)
) AS s(key_sq, key_en, val_sq, val_en, so)
WHERE p.slug = 'beovision-theatre';

-- Beosound Stage
INSERT INTO product_specs (product_id, spec_key_sq, spec_key_en, spec_value_sq, spec_value_en, sort_order)
SELECT p.id, s.key_sq, s.key_en, s.val_sq, s.val_en, s.so
FROM products p
CROSS JOIN (VALUES
  ('Fuqia', 'Power', '660W', '660W', 0),
  ('Kanalet', 'Channels', '11 drajverë', '11 drivers', 1),
  ('Dolby Atmos', 'Dolby Atmos', 'Po', 'Yes', 2)
) AS s(key_sq, key_en, val_sq, val_en, so)
WHERE p.slug = 'beosound-stage';

-- Beosound Theatre
INSERT INTO product_specs (product_id, spec_key_sq, spec_key_en, spec_value_sq, spec_value_en, sort_order)
SELECT p.id, s.key_sq, s.key_en, s.val_sq, s.val_en, s.so
FROM products p
CROSS JOIN (VALUES
  ('Fuqia', 'Power', '800W', '800W', 0),
  ('Kanalet', 'Channels', '12 drajverë', '12 drivers', 1),
  ('Dolby Atmos', 'Dolby Atmos', 'Po', 'Yes', 2)
) AS s(key_sq, key_en, val_sq, val_en, so)
WHERE p.slug = 'beosound-theatre';

-- Devialet Phantom I 108
INSERT INTO product_specs (product_id, spec_key_sq, spec_key_en, spec_value_sq, spec_value_en, sort_order)
SELECT p.id, s.key_sq, s.key_en, s.val_sq, s.val_en, s.so
FROM products p
CROSS JOIN (VALUES
  ('Fuqia', 'Power', '1100W', '1100W', 0),
  ('SPL', 'SPL', '108 dB', '108 dB', 1),
  ('Frekuenca', 'Frequency', '14 Hz - 27 kHz', '14 Hz - 27 kHz', 2)
) AS s(key_sq, key_en, val_sq, val_en, so)
WHERE p.slug = 'phantom-i-108db';

-- Devialet Phantom I 103
INSERT INTO product_specs (product_id, spec_key_sq, spec_key_en, spec_value_sq, spec_value_en, sort_order)
SELECT p.id, s.key_sq, s.key_en, s.val_sq, s.val_en, s.so
FROM products p
CROSS JOIN (VALUES
  ('Fuqia', 'Power', '500W', '500W', 0),
  ('SPL', 'SPL', '103 dB', '103 dB', 1),
  ('Frekuenca', 'Frequency', '16 Hz - 25 kHz', '16 Hz - 25 kHz', 2)
) AS s(key_sq, key_en, val_sq, val_en, so)
WHERE p.slug = 'phantom-i-103db';

-- Devialet Phantom II 98
INSERT INTO product_specs (product_id, spec_key_sq, spec_key_en, spec_value_sq, spec_value_en, sort_order)
SELECT p.id, s.key_sq, s.key_en, s.val_sq, s.val_en, s.so
FROM products p
CROSS JOIN (VALUES
  ('Fuqia', 'Power', '400W', '400W', 0),
  ('SPL', 'SPL', '98 dB', '98 dB', 1),
  ('Frekuenca', 'Frequency', '18 Hz - 21 kHz', '18 Hz - 21 kHz', 2)
) AS s(key_sq, key_en, val_sq, val_en, so)
WHERE p.slug = 'phantom-ii-98db';

-- Devialet Phantom II 95
INSERT INTO product_specs (product_id, spec_key_sq, spec_key_en, spec_value_sq, spec_value_en, sort_order)
SELECT p.id, s.key_sq, s.key_en, s.val_sq, s.val_en, s.so
FROM products p
CROSS JOIN (VALUES
  ('Fuqia', 'Power', '300W', '300W', 0),
  ('SPL', 'SPL', '95 dB', '95 dB', 1),
  ('Frekuenca', 'Frequency', '18 Hz - 21 kHz', '18 Hz - 21 kHz', 2)
) AS s(key_sq, key_en, val_sq, val_en, so)
WHERE p.slug = 'phantom-ii-95db';

-- Devialet Mania
INSERT INTO product_specs (product_id, spec_key_sq, spec_key_en, spec_value_sq, spec_value_en, sort_order)
SELECT p.id, s.key_sq, s.key_en, s.val_sq, s.val_en, s.so
FROM products p
CROSS JOIN (VALUES
  ('Bateria', 'Battery', '10 orë', '10 hours', 0),
  ('Fuqia', 'Power', '2x 8W', '2x 8W', 1),
  ('IP', 'IP Rating', 'IPX4', 'IPX4', 2)
) AS s(key_sq, key_en, val_sq, val_en, so)
WHERE p.slug = 'devialet-mania';

-- Devialet Dione
INSERT INTO product_specs (product_id, spec_key_sq, spec_key_en, spec_value_sq, spec_value_en, sort_order)
SELECT p.id, s.key_sq, s.key_en, s.val_sq, s.val_en, s.so
FROM products p
CROSS JOIN (VALUES
  ('Fuqia', 'Power', '950W', '950W', 0),
  ('Kanalet', 'Channels', '5.1.2', '5.1.2', 1),
  ('Dolby Atmos', 'Dolby Atmos', 'Po', 'Yes', 2)
) AS s(key_sq, key_en, val_sq, val_en, so)
WHERE p.slug = 'devialet-dione';

-- Devialet Gemini II
INSERT INTO product_specs (product_id, spec_key_sq, spec_key_en, spec_value_sq, spec_value_en, sort_order)
SELECT p.id, s.key_sq, s.key_en, s.val_sq, s.val_en, s.so
FROM products p
CROSS JOIN (VALUES
  ('Bateria', 'Battery', '8+32 orë', '8+32 hours', 0),
  ('ANC', 'ANC', 'Adaptive', 'Adaptive', 1),
  ('IP', 'IP Rating', 'IPX4', 'IPX4', 2)
) AS s(key_sq, key_en, val_sq, val_en, so)
WHERE p.slug = 'devialet-gemini-ii';

-- Loewe we.SEE 32
INSERT INTO product_specs (product_id, spec_key_sq, spec_key_en, spec_value_sq, spec_value_en, sort_order)
SELECT p.id, s.key_sq, s.key_en, s.val_sq, s.val_en, s.so
FROM products p
CROSS JOIN (VALUES
  ('Ekrani', 'Screen', '32" Full HD', '32" Full HD', 0),
  ('Smart TV', 'Smart TV', 'Po', 'Yes', 1),
  ('Zëri', 'Sound', '40W', '40W', 2)
) AS s(key_sq, key_en, val_sq, val_en, so)
WHERE p.slug = 'loewe-we-see-32';

-- Loewe we.SEE 43
INSERT INTO product_specs (product_id, spec_key_sq, spec_key_en, spec_value_sq, spec_value_en, sort_order)
SELECT p.id, s.key_sq, s.key_en, s.val_sq, s.val_en, s.so
FROM products p
CROSS JOIN (VALUES
  ('Ekrani', 'Screen', '43" 4K UHD', '43" 4K UHD', 0),
  ('Smart TV', 'Smart TV', 'Po', 'Yes', 1),
  ('Zëri', 'Sound', '40W', '40W', 2)
) AS s(key_sq, key_en, val_sq, val_en, so)
WHERE p.slug = 'loewe-we-see-43';

-- Loewe we.SEE 50
INSERT INTO product_specs (product_id, spec_key_sq, spec_key_en, spec_value_sq, spec_value_en, sort_order)
SELECT p.id, s.key_sq, s.key_en, s.val_sq, s.val_en, s.so
FROM products p
CROSS JOIN (VALUES
  ('Ekrani', 'Screen', '50" 4K UHD', '50" 4K UHD', 0),
  ('Smart TV', 'Smart TV', 'Po', 'Yes', 1),
  ('Zëri', 'Sound', '40W', '40W', 2)
) AS s(key_sq, key_en, val_sq, val_en, so)
WHERE p.slug = 'loewe-we-see-50';

-- Loewe we.SEE 55
INSERT INTO product_specs (product_id, spec_key_sq, spec_key_en, spec_value_sq, spec_value_en, sort_order)
SELECT p.id, s.key_sq, s.key_en, s.val_sq, s.val_en, s.so
FROM products p
CROSS JOIN (VALUES
  ('Ekrani', 'Screen', '55" 4K UHD', '55" 4K UHD', 0),
  ('Smart TV', 'Smart TV', 'Po', 'Yes', 1),
  ('Zëri', 'Sound', '40W', '40W', 2)
) AS s(key_sq, key_en, val_sq, val_en, so)
WHERE p.slug = 'loewe-we-see-55';

-- Loewe INSPIRE 55
INSERT INTO product_specs (product_id, spec_key_sq, spec_key_en, spec_value_sq, spec_value_en, sort_order)
SELECT p.id, s.key_sq, s.key_en, s.val_sq, s.val_en, s.so
FROM products p
CROSS JOIN (VALUES
  ('Ekrani', 'Screen', '55" OLED', '55" OLED', 0),
  ('Rezolucioni', 'Resolution', '4K', '4K', 1),
  ('HDR', 'HDR', 'Dolby Vision', 'Dolby Vision', 2)
) AS s(key_sq, key_en, val_sq, val_en, so)
WHERE p.slug = 'loewe-inspire-55';

-- Loewe INSPIRE 65
INSERT INTO product_specs (product_id, spec_key_sq, spec_key_en, spec_value_sq, spec_value_en, sort_order)
SELECT p.id, s.key_sq, s.key_en, s.val_sq, s.val_en, s.so
FROM products p
CROSS JOIN (VALUES
  ('Ekrani', 'Screen', '65" OLED', '65" OLED', 0),
  ('Rezolucioni', 'Resolution', '4K', '4K', 1),
  ('HDR', 'HDR', 'Dolby Vision', 'Dolby Vision', 2)
) AS s(key_sq, key_en, val_sq, val_en, so)
WHERE p.slug = 'loewe-inspire-65';

-- Loewe STELLAR 55
INSERT INTO product_specs (product_id, spec_key_sq, spec_key_en, spec_value_sq, spec_value_en, sort_order)
SELECT p.id, s.key_sq, s.key_en, s.val_sq, s.val_en, s.so
FROM products p
CROSS JOIN (VALUES
  ('Ekrani', 'Screen', '55" OLED', '55" OLED', 0),
  ('Rezolucioni', 'Resolution', '4K', '4K', 1),
  ('Zëri', 'Sound', '60W', '60W', 2)
) AS s(key_sq, key_en, val_sq, val_en, so)
WHERE p.slug = 'loewe-stellar-55';

-- Loewe STELLAR 65
INSERT INTO product_specs (product_id, spec_key_sq, spec_key_en, spec_value_sq, spec_value_en, sort_order)
SELECT p.id, s.key_sq, s.key_en, s.val_sq, s.val_en, s.so
FROM products p
CROSS JOIN (VALUES
  ('Ekrani', 'Screen', '65" OLED', '65" OLED', 0),
  ('Rezolucioni', 'Resolution', '4K', '4K', 1),
  ('Zëri', 'Sound', '80W', '80W', 2)
) AS s(key_sq, key_en, val_sq, val_en, so)
WHERE p.slug = 'loewe-stellar-65';

-- Loewe ICONIC 55
INSERT INTO product_specs (product_id, spec_key_sq, spec_key_en, spec_value_sq, spec_value_en, sort_order)
SELECT p.id, s.key_sq, s.key_en, s.val_sq, s.val_en, s.so
FROM products p
CROSS JOIN (VALUES
  ('Ekrani', 'Screen', '55" OLED', '55" OLED', 0),
  ('Rezolucioni', 'Resolution', '4K', '4K', 1),
  ('Zëri', 'Sound', '80W, Dolby Atmos', '80W, Dolby Atmos', 2)
) AS s(key_sq, key_en, val_sq, val_en, so)
WHERE p.slug = 'loewe-iconic-55';

-- Loewe ICONIC 65
INSERT INTO product_specs (product_id, spec_key_sq, spec_key_en, spec_value_sq, spec_value_en, sort_order)
SELECT p.id, s.key_sq, s.key_en, s.val_sq, s.val_en, s.so
FROM products p
CROSS JOIN (VALUES
  ('Ekrani', 'Screen', '65" OLED', '65" OLED', 0),
  ('Rezolucioni', 'Resolution', '4K', '4K', 1),
  ('Zëri', 'Sound', '80W, Dolby Atmos', '80W, Dolby Atmos', 2)
) AS s(key_sq, key_en, val_sq, val_en, so)
WHERE p.slug = 'loewe-iconic-65';

-- Loewe we.BEAM
INSERT INTO product_specs (product_id, spec_key_sq, spec_key_en, spec_value_sq, spec_value_en, sort_order)
SELECT p.id, s.key_sq, s.key_en, s.val_sq, s.val_en, s.so
FROM products p
CROSS JOIN (VALUES
  ('Rezolucioni', 'Resolution', 'Full HD', 'Full HD', 0),
  ('Ndriçimi', 'Brightness', '300 ANSI lumens', '300 ANSI lumens', 1),
  ('Smart TV', 'Smart TV', 'Android TV', 'Android TV', 2)
) AS s(key_sq, key_en, val_sq, val_en, so)
WHERE p.slug = 'loewe-we-beam';

-- Loewe klang bar i
INSERT INTO product_specs (product_id, spec_key_sq, spec_key_en, spec_value_sq, spec_value_en, sort_order)
SELECT p.id, s.key_sq, s.key_en, s.val_sq, s.val_en, s.so
FROM products p
CROSS JOIN (VALUES
  ('Fuqia', 'Power', '260W', '260W', 0),
  ('Kanalet', 'Channels', '5.1', '5.1', 1),
  ('Dolby Atmos', 'Dolby Atmos', 'Po', 'Yes', 2)
) AS s(key_sq, key_en, val_sq, val_en, so)
WHERE p.slug = 'loewe-klang-bar-i';

-- Loewe klang bar5 mr
INSERT INTO product_specs (product_id, spec_key_sq, spec_key_en, spec_value_sq, spec_value_en, sort_order)
SELECT p.id, s.key_sq, s.key_en, s.val_sq, s.val_en, s.so
FROM products p
CROSS JOIN (VALUES
  ('Fuqia', 'Power', '180W', '180W', 0),
  ('Lidhja', 'Connectivity', 'Bluetooth, Wi-Fi', 'Bluetooth, Wi-Fi', 1),
  ('Multiroom', 'Multiroom', 'Po', 'Yes', 2)
) AS s(key_sq, key_en, val_sq, val_en, so)
WHERE p.slug = 'loewe-klang-bar-5';

-- Loewe klang sub5
INSERT INTO product_specs (product_id, spec_key_sq, spec_key_en, spec_value_sq, spec_value_en, sort_order)
SELECT p.id, s.key_sq, s.key_en, s.val_sq, s.val_en, s.so
FROM products p
CROSS JOIN (VALUES
  ('Fuqia', 'Power', '300W', '300W', 0),
  ('Lidhja', 'Connectivity', 'Wireless', 'Wireless', 1),
  ('Drajveri', 'Driver', '8"', '8"', 2)
) AS s(key_sq, key_en, val_sq, val_en, so)
WHERE p.slug = 'loewe-klang-sub-5';

-- Loewe klang mr1
INSERT INTO product_specs (product_id, spec_key_sq, spec_key_en, spec_value_sq, spec_value_en, sort_order)
SELECT p.id, s.key_sq, s.key_en, s.val_sq, s.val_en, s.so
FROM products p
CROSS JOIN (VALUES
  ('Fuqia', 'Power', '50W', '50W', 0),
  ('Lidhja', 'Connectivity', 'Wi-Fi, Bluetooth', 'Wi-Fi, Bluetooth', 1),
  ('Multiroom', 'Multiroom', 'Po', 'Yes', 2)
) AS s(key_sq, key_en, val_sq, val_en, so)
WHERE p.slug = 'loewe-klang-mr1';

-- Loewe klang mr3
INSERT INTO product_specs (product_id, spec_key_sq, spec_key_en, spec_value_sq, spec_value_en, sort_order)
SELECT p.id, s.key_sq, s.key_en, s.val_sq, s.val_en, s.so
FROM products p
CROSS JOIN (VALUES
  ('Fuqia', 'Power', '150W', '150W', 0),
  ('Lidhja', 'Connectivity', 'Wi-Fi, Bluetooth', 'Wi-Fi, Bluetooth', 1),
  ('Multiroom', 'Multiroom', 'Po', 'Yes', 2)
) AS s(key_sq, key_en, val_sq, val_en, so)
WHERE p.slug = 'loewe-klang-mr3';

-- Loewe klang mr5
INSERT INTO product_specs (product_id, spec_key_sq, spec_key_en, spec_value_sq, spec_value_en, sort_order)
SELECT p.id, s.key_sq, s.key_en, s.val_sq, s.val_en, s.so
FROM products p
CROSS JOIN (VALUES
  ('Fuqia', 'Power', '300W', '300W', 0),
  ('Lidhja', 'Connectivity', 'Wi-Fi, Bluetooth', 'Wi-Fi, Bluetooth', 1),
  ('Multiroom', 'Multiroom', 'Po', 'Yes', 2)
) AS s(key_sq, key_en, val_sq, val_en, so)
WHERE p.slug = 'loewe-klang-mr5';

-- Loewe radio
INSERT INTO product_specs (product_id, spec_key_sq, spec_key_en, spec_value_sq, spec_value_en, sort_order)
SELECT p.id, s.key_sq, s.key_en, s.val_sq, s.val_en, s.so
FROM products p
CROSS JOIN (VALUES
  ('Radio', 'Radio', 'DAB+, FM', 'DAB+, FM', 0),
  ('Lidhja', 'Connectivity', 'Bluetooth', 'Bluetooth', 1),
  ('Zëri', 'Sound', '20W', '20W', 2)
) AS s(key_sq, key_en, val_sq, val_en, so)
WHERE p.slug = 'loewe-radio';

-- Storage buckets
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES
  ('products', 'products', true, 10485760, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']),
  ('site', 'site', true, 52428800, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'video/mp4', 'video/webm'])
ON CONFLICT (id) DO NOTHING;

-- Storage policies
CREATE POLICY "Public read products bucket" ON storage.objects FOR SELECT USING (bucket_id = 'products');
CREATE POLICY "Auth upload products bucket" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'products');
CREATE POLICY "Auth update products bucket" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'products');
CREATE POLICY "Auth delete products bucket" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'products');

CREATE POLICY "Public read site bucket" ON storage.objects FOR SELECT USING (bucket_id = 'site');
CREATE POLICY "Auth upload site bucket" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'site');
CREATE POLICY "Auth update site bucket" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'site');
CREATE POLICY "Auth delete site bucket" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'site');
