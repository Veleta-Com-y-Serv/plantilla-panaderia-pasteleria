// Páginas propias de esta plantilla (NoExpertise): espejo de `fichas:` y `zonas:` de template.yaml.
// Cada tarta con `detalle` tiene su página en /tartas/<slug>/ (src/pages/[coleccion]/[slug].astro). Sin zonas.
import type { DefFicha, DefZonas } from '../lib/paginas';

export const FICHAS: DefFicha[] = [
  { lista: 'tartas', campo: 'tartas', ruta: 'tartas', nombre: 'Tarta', tipo: 'Product' },
];

export const ZONAS: DefZonas | null = null;
