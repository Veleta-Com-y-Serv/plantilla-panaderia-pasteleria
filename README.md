# Plantilla NoExpertise · Panadería y pastelería

Web de almanaque para panaderías, pastelerías, hornos y obradores de pueblo o de barrio: pan del día, tartas por encargo, dulces de temporada, horario y cómo llegar.

- Sectores: panaderia, pasteleria, horno, confiteria. Estilo: solstice (tema Solstice de Hallmark). Plan mínimo: gratis. Orden 670.
- Secciones: hero, horno, obrador, temporada, tartas, reparto, galeria, horario, opiniones, preguntas, contacto (y `texto` para apartados nuevos).
- Diseño a ancho completo: portada partida con la foto a sangre hasta el borde, lista del horno con filetes de oro por grupos, el obrador con el año de apertura en grande, los dulces de temporada como «el año en una línea» sobre la banda de tinta, tartas en rejilla con su página propia, filas con filetes para el reparto, mosaico de fotos, el horario como etiqueta en un pozo con sombra dura y pie con el nombre como mástil. Yeseva One, Archivo y Archivo Narrow alojadas en `public/fuentes/` (OFL). Detalle en `DISEÑO.md`.
- Ejemplo: Panadería Arribas, horno de leña ficticio en Medina del Campo (Valladolid).
- SEO de base incluido (`src/lib/seo.ts`): canónica, og:image, JSON-LD (`Bakery`) y preguntas frecuentes, `robots.txt`, `sitemap.xml` y `llms.txt`; `noindex` si `seo.indexable: false`.
- Páginas propias: cada tarta con `detalle` tiene su página en `/tartas/<slug>/` (`fichas:` en `template.yaml`, espejo en `src/data/fichas.ts`).
- Varias páginas (opcional, `paginas:` en la raíz de `site.yaml`): Inicio + una página por entrada (`{ ruta, titulo, secciones: "a; b" }`, hasta 6) con el menú hecho solo; reparto recomendado en `template.yaml → paginas` (El horno, Tartas, El obrador, Horario y contacto). Sin la clave, una sola página larga.
- Contenido editable en `site.yaml`; metadatos y guion del asistente (13 pasos) en `template.yaml`; reglas para el agente en `CLAUDE.md`; fotos a generar en `fotos.json` (10).

## Campos propios

| Sección | Campos |
|---|---|
| `hero` | `cta`, `cta_secundario`, `pie_foto` (etiqueta sobre la foto), `items` [{titulo}] (datos cortos bajo los botones) |
| `horno` | `marca_destacado`, `hornada` [{nombre, texto, precio, categoria, destacado}] |
| `obrador` | `desde` (año de apertura, cifra grande), `declaracion`, `texto`, `imagen`, `items` [{titulo, texto}], `cta` |
| `temporada` | `dulces` [{mes, nombre, texto}] |
| `tartas` | `tartas` [{nombre, texto, raciones, precio, imagen, imagenes, detalle, slug}], `items` [{titulo, texto}] (pasos), `cta`, `cta_secundario`, `nota` |
| `reparto` | `items` [{titulo, texto}], `cta` |
| `galeria` | `galeria` [rutas], `cta` |
| `horario` | `horario` [{dia, horas}] |
| `opiniones` | `testimonios` [{texto, autor, nota}] |
| `preguntas` | `preguntas` [{pregunta, respuesta}] |

```
npm ci
npm run dev      # desarrollo
npm run build    # web estática en dist/
```

Basada en [AstroWind](https://github.com/onwidget/astrowind) © onWidget, licencia MIT (`LICENSE-ASTROWIND.md`). Fuentes con licencia SIL Open Font License 1.1 (`public/fuentes/LICENCIAS.md`). Imágenes de relleno (`public/placeholders/`) dibujadas para esta plantilla, sin licencias de terceros.

## Páginas propias

- Campos opcionales de los elementos con ficha: `detalle` (párrafos separados por una línea en blanco), `slug` e `imagenes` («/fotos/a.jpg; /fotos/b.jpg»).
