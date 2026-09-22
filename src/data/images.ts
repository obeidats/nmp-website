/**
 * Every photograph on the site. Files live in public/images/ (WebP). To swap a photo for a real
 * one, replace the file (or change the name here) and update its size so the layout does not jump.
 * Gallery photos come from the sister company's site; the large covers are cropped from the
 * company profile PDF.
 */
import type { ProjectId } from './site';

export interface Img {
  src: string;
  width: number;
  height: number;
}

const img = (name: string, width: number, height: number): Img => ({
  src: `/images/${name}.webp`,
  width,
  height,
});

export const photos = {
  heroBridge: img('hero-bridge', 613, 900),
  muscat: img('muscat', 760, 751),
  safety: img('safety', 801, 811),
  coordination: img('coordination', 654, 911),
  delivery: img('delivery', 757, 641),
  partners: img('partners', 800, 560),
  operations: img('operations', 790, 548),
  cityBanner: img('city-banner', 1455, 339),
  roadSunset: img('road-sunset', 341, 608),
  projectsRoad: img('projects-road', 451, 626),
} as const;

/** Large feature photo for each discipline */
export const covers: Record<ProjectId, Img> = {
  roads: img('cover-roads', 1600, 823),
  water: img('cover-water', 797, 335),
  networks: img('cover-networks', 871, 626),
  electrical: img('cover-electrical', 866, 737),
  buildings: img('cover-buildings', 645, 737),
};

const shot = (id: ProjectId, count: number): Img[] =>
  Array.from({ length: count }, (_, i) => img(`gallery/${id}-${i + 1}`, 450, 271));

/** Small field photos. Captions live in `projects.explorer.disciplines[n].gallery` (same order). */
export const gallery: Record<ProjectId, Img[]> = {
  roads: shot('roads', 6),
  water: shot('water', 6),
  networks: shot('networks', 4),
  electrical: shot('electrical', 6),
  buildings: shot('buildings', 5),
};
