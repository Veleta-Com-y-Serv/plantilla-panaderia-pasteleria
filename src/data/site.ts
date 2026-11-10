// Carga ../../site.yaml en el build y lo expone tipado.
// Es la única fuente de contenido: textos, colores, contacto, menú y secciones.
import datos from '../../site.yaml';
import { conPaginas } from '../lib/multipagina';

export interface Enlace { texto: string; url: string }
export interface Item { titulo: string; texto?: string; icono?: string; imagen?: string }
export interface Persona { nombre: string; cargo?: string; foto?: string; texto?: string }
/** Opinión. `nota` es opcional (de dónde viene: «Google»…). */
export interface Testimonio { texto: string; autor: string; nota?: string }
export interface Horario { dia: string; horas: string }
export interface Pregunta { pregunta: string; respuesta: string }
/** Pieza del horno (horno.hornada). `categoria` agrupa en el orden en que aparece; `precio` siempre como cadena. */
export interface Pieza { nombre: string; texto: string; precio: string; categoria: string; destacado: boolean }
/** Tarta por encargo (tartas.tartas). Con `detalle`, tiene página propia en /tartas/<slug>/. */
export interface Tarta { nombre: string; texto: string; raciones: string; precio: string; imagen: string; [campo: string]: unknown }
/** Dulce de temporada (temporada.dulces): una parada en «el año en una línea». */
export interface Dulce { mes: string; nombre: string; texto: string }

export interface Seccion {
  activa: boolean;
  titulo?: string;
  antetitulo?: string;
  texto?: string;
  imagen?: string;
  cta?: Enlace | null;
  cta_secundario?: Enlace | null;
  items: Item[];
  personas: Persona[];
  testimonios: Testimonio[];
  galeria: string[];
  horario: Horario[];
  preguntas: Pregunta[];
  /** horno */
  hornada: Pieza[];
  marca_destacado?: string;
  /** tartas */
  tartas: Tarta[];
  nota?: string;
  /** temporada */
  dulces: Dulce[];
  /** obrador */
  declaracion?: string;
  desde?: string;
  /** hero */
  pie_foto?: string;
  [campo: string]: unknown;
}

export interface Site {
  nombre: string;
  eslogan: string;
  sector: string;
  logo: string;
  colores: { primario: string; acento: string; fondo: string; texto: string };
  contacto: { telefono: string; email: string; direccion: string; horario: string; whatsapp: string };
  redes: { instagram: string; facebook: string; linkedin: string };
  menu: Enlace[];
  /** `url` e `indexable` los escribe la plataforma (opcionales: las webs antiguas no los traen). */
  seo: { titulo: string; descripcion: string; tipo: string; url?: string; indexable?: boolean };
  boton_cabecera: Enlace | null;
  marca_pie: boolean;
  secciones: Record<string, Seccion>;
}

type Crudo = Record<string, any>;
const d = conPaginas((datos ?? {}) as Crudo);
export function lista<T>(v: unknown): T[] {
  return Array.isArray(v) ? (v.filter(Boolean) as T[]) : [];
}
export const texto = (v: unknown) => (v == null ? '' : String(v).trim());
const enlaceDe = (v: unknown): Enlace | null => {
  const e = (v ?? {}) as Crudo;
  return texto(e.url) ? { texto: texto(e.texto) || texto(e.url), url: texto(e.url) } : null;
};

function normalizar(s: Crudo = {}): Seccion {
  return {
    ...s,
    activa: s.activa === true,
    titulo: texto(s.titulo),
    antetitulo: texto(s.antetitulo),
    texto: texto(s.texto),
    imagen: texto(s.imagen),
    cta: enlaceDe(s.cta),
    cta_secundario: enlaceDe(s.cta_secundario),
    items: lista<Crudo>(s.items).filter((i) => texto(i.titulo) || texto(i.texto)).map((i) => ({ ...i, titulo: texto(i.titulo), texto: texto(i.texto) })),
    personas: lista<Persona>(s.personas),
    testimonios: lista<Crudo>(s.testimonios).filter((t) => texto(t.texto)).map((t) => ({ texto: texto(t.texto), autor: texto(t.autor), nota: texto(t.nota) })),
    galeria: lista<unknown>(s.galeria).map(texto).filter(Boolean),
    horario: lista<Crudo>(s.horario).filter((h) => texto(h.dia) || texto(h.horas)).map((h) => ({ dia: texto(h.dia), horas: texto(h.horas) })),
    preguntas: lista<Crudo>(s.preguntas).filter((p) => texto(p.pregunta)).map((p) => ({ pregunta: texto(p.pregunta), respuesta: texto(p.respuesta) })),
    hornada: lista<Crudo>(s.hornada)
      .filter((p) => texto(p.nombre))
      .map((p) => ({ nombre: texto(p.nombre), texto: texto(p.texto), precio: texto(p.precio), categoria: texto(p.categoria), destacado: p.destacado === true })),
    // Las tartas conservan el objeto original: src/lib/paginas.ts las reconoce por identidad (enlaceDe).
    tartas: lista<Crudo>(s.tartas).filter((t) => texto(t.nombre)) as Tarta[],
    dulces: lista<Crudo>(s.dulces).filter((x) => texto(x.nombre) || texto(x.mes)).map((x) => ({ mes: texto(x.mes), nombre: texto(x.nombre), texto: texto(x.texto) })),
  } as Seccion;
}

const secciones: Record<string, Seccion> = {};
for (const [id, s] of Object.entries((d.secciones ?? {}) as Crudo)) secciones[id] = normalizar((s ?? {}) as Crudo);

export const site: Site = {
  nombre: texto(d.nombre) || 'Mi panadería',
  eslogan: texto(d.eslogan),
  sector: texto(d.sector),
  logo: texto(d.logo),
  colores: { primario: '#442415', acento: '#c9212e', fondo: '#f6e9d5', texto: '#3a1e0e', ...(d.colores ?? {}) },
  contacto: { telefono: '', email: '', direccion: '', horario: '', whatsapp: '', ...(d.contacto ?? {}) },
  redes: { instagram: '', facebook: '', linkedin: '', ...(d.redes ?? {}) },
  menu: lista<Enlace>(d.menu).filter((e) => texto(e?.url)),
  seo: {
    titulo: texto(d.seo?.titulo) || texto(d.nombre),
    descripcion: texto(d.seo?.descripcion) || texto(d.eslogan),
    tipo: texto(d.seo?.tipo) || 'Bakery',
    ...(texto(d.seo?.url) && { url: texto(d.seo?.url).replace(/\/+$/, '') }),
    ...(typeof d.seo?.indexable === 'boolean' && { indexable: d.seo.indexable as boolean }),
  },
  boton_cabecera: d.boton_cabecera?.url ? (d.boton_cabecera as Enlace) : null,
  marca_pie: d.marca_pie !== false,
  secciones,
};

/** Devuelve la sección si existe y tiene `activa: true`; si no, null. */
export function seccion(id: string): Seccion | null {
  const s = site.secciones[id];
  return s && s.activa ? s : null;
}

/** Ids de las secciones activas, en el orden en que aparecen en site.yaml. */
export function seccionesActivas(): string[] {
  return Object.keys(site.secciones).filter((id) => site.secciones[id].activa);
}

/** Agrupa una lista por un campo escalar (p. ej. `categoria`), respetando el orden en que aparece cada grupo. */
export function agrupar<T>(items: T[], campo: (x: T) => string | undefined): { grupo: string; items: T[] }[] {
  const grupos: { grupo: string; items: T[] }[] = [];
  for (const it of items) {
    const g = (campo(it) ?? '').trim();
    let destino = grupos.find((x) => x.grupo === g);
    if (!destino) grupos.push((destino = { grupo: g, items: [] }));
    destino.items.push(it);
  }
  return grupos;
}

export const tel = (n?: string) => (n ? 'tel:' + n.replace(/[^\d+]/g, '') : '');
export const whatsapp = (n?: string, mensaje = '') =>
  n ? `https://wa.me/${n.replace(/\D/g, '')}${mensaje ? '?text=' + encodeURIComponent(mensaje) : ''}` : '';
export const mapa = (direccion?: string) =>
  direccion ? 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(direccion) : '';
/** ¿El enlace sale de la web? (abre en otra pestaña). */
export const externo = (u?: string) => !!u && /^https?:/.test(u);
/** Párrafos a partir de un texto con líneas en blanco entre párrafos. */
export const parrafos = (t?: string) => (t ? t.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean) : []);
