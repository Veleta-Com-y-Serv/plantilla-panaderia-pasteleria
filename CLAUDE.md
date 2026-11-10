# Plantilla «Panadería y pastelería» (NoExpertise)

Web estática Astro 5 + Tailwind 4, derivada de AstroWind (MIT, ver `LICENSE-ASTROWIND.md`). Estilo: **solstice** (tema
Solstice de la skill Hallmark: papel crema, tinta marrón, filetes de oro, una señal bermellón). Todo en castellano de
España, frases cortas, sin jerga, de tú. Brief de diseño completo en `DISEÑO.md`.

## Dónde está cada cosa
- **Textos, contacto, menú, SEO y secciones**: `site.yaml` (raíz). Es la única fuente de contenido. `src/data/site.ts` lo carga y lo tipa; no pongas textos fijos en los componentes.
- **Colores**: `site.yaml → colores` (fondo = papel crema, texto = tinta marrón, acento = bermellón de botones/foco/una cifra, primario = banda de tinta del pie y de «temporada»). `src/layouts/Base.astro` los convierte en variables CSS (`--c-primario`…). Los demás tonos (`--papel-2`, `--papel-3`, `--oro`, `--filete`, `--apagado`, `--acento-legible`, `--sobre-primario`, `--sobre-acento`) se derivan en `src/styles/global.css` con `color-mix()` y `oklch(from …)`: el texto sobre primario y sobre acento se elige solo (claro u oscuro). No pongas colores literales en componentes.
- **Tipografías**: Yeseva One (titulares), Archivo 400/500 (texto) y Archivo Narrow 600 (letra menuda: antetítulos, meses, pies de foto, botones), alojadas en `public/fuentes/` (licencias en `public/fuentes/LICENCIAS.md`). No añadas fuentes ni servicios externos.
- **Aspecto general**: `src/styles/global.css` (bandas `.banda--papel|clara|tinta`, cabeza de sección con filete de tinta `.cabeza`, letra menuda `.menuda`, botón píldora bermellón `.btn`, botón subrayado `.btn-sec`, foto con el tratamiento del tema `.foto`, pozo con borde de tinta, filete de oro y sombra dura `.pozo`, mitades a sangre `.mitades`). Sin radios salvo los botones; sin sombras suaves.
- **Bandas**: `src/components/ui/Banda.astro` pinta una sección de borde a borde con el contenido en `.contenedor` (90 rem, 16 px de margen en móvil). Como mucho dos bandas de tinta por página (temporada y pie).
- **Imágenes**: fotos en `public/fotos/` (se generan a partir de `fotos.json`); si una foto de `/fotos/` falta, `Imagen.astro` muestra `/placeholders/<mismo nombre>.svg`. En `site.yaml`, ruta absoluta (`/fotos/hero.jpg`). Personas: siempre `/placeholders/persona.svg`, nunca caras generadas.
- **Logo**: `site.yaml → logo` (ruta en `public/`); vacío = nombre en Yeseva One.
- **Pie «Web creada con NoExpertise»**: `site.yaml → marca_pie` (true en plan gratis). En móvil, barra fija abajo con «Llamar» y «Encargar» (WhatsApp, o la sección de tartas, o el contacto).

## Secciones
Cada sección es un componente que solo se pinta si `site.yaml → secciones.<id>.activa` es `true`, en el orden de `site.yaml`.
- `hero` → portada partida: texto a la izquierda (antetítulo, titular, frase, dos botones, `items` como datos cortos) y la foto a sangre a la derecha con `pie_foto`. En móvil la foto va arriba.
- `horno` → «Lo que sale del horno»: `hornada` agrupada por `categoria` en columnas, filas con filete de puntos de oro.
- `obrador` → foto a sangre a la izquierda y texto: `desde` en cifra grande, título, `declaracion`, párrafos y valores (`items`).
- `temporada` → banda de tinta con los `dulces` como paradas sobre un filete de oro (mes, dulce, línea); marca el mes en curso con un script mínimo.
- `tartas` → rejilla de `tartas` (foto vertical, nombre, línea, raciones, precio) y «cómo encargar»: `items` como pasos numerados, botón, `cta_secundario` y `nota`.
- `reparto` → banda clara partida: titular y botón a la izquierda, `items` como filas con filete a la derecha.
- `galeria` → mosaico de fotos (la primera grande) con botón a Instagram.
- `horario` → titular, dirección y botones a la izquierda; el `horario` en un pozo (etiqueta) a la derecha.
- `opiniones` → la primera opinión como frase grande, las demás en columnas. Sin opiniones, no se pinta.
- `preguntas` → filas `details/summary`; sin preguntas no se pinta.
- `contacto` → vías grandes (teléfono, WhatsApp, email, dirección) y el formulario dentro de un pozo.
- `texto` → apartado genérico (`tipo: texto`), con foto a sangre si lleva `imagen`.

## Campos propios de esta plantilla (además del esquema común)
- `hero`: `cta` y `cta_secundario` (sin `cta` el botón llama; sin `cta_secundario`, «Cómo llegar»); `pie_foto` (una frase sobre la foto); `items` = datos cortos (solo `titulo`).
- `horno.hornada` [{nombre, texto, precio, categoria, destacado}]: se agrupan por `categoria` en el orden en que aparecen. `precio` SIEMPRE como cadena (`"3,40 €"`); vacío = sin precio. `destacado: true` pone la marca (`horno.marca_destacado`, por defecto «La más pedida»).
- `obrador`: `desde` (año de apertura como cadena, `"1962"`; vacío = no sale), `declaracion`, `texto` (párrafos separados por una línea en blanco), `imagen`, `items` [{titulo, texto}].
- `temporada.dulces` [{mes, nombre, texto}]: `mes` en texto libre («Enero», «Marzo y abril»); si nombra el mes de hoy, la parada se marca en bermellón.
- `tartas.tartas` [{nombre, texto, raciones, precio, imagen, imagenes, detalle}]: `raciones` y `precio` como cadena; `detalle` da página propia. `tartas.items` = pasos para encargar; `cta` (normalmente WhatsApp; sin él, el WhatsApp o el teléfono de contacto), `cta_secundario`, `nota`.
- `reparto`: `items` [{titulo, texto}], `cta` (sin él, llamar).
- `galeria`: `galeria` (hasta 8 fotos; 5 es lo que mejor queda) y `cta` (sin él, `redes.instagram`).
- `horario.horario` [{dia, horas}]: sin él, se usa `contacto.horario`. Las horas con «Cerrado» salen apagadas.
- `opiniones.testimonios` [{texto, autor, nota}]: `nota` opcional (de dónde viene). Sin estrellas ni notas.

## Reglas para órdenes
1. **Activar o quitar una sección**: cambia `activa: true|false` en `site.yaml`. No borres componentes.
2. **Reordenar secciones**: mueve el bloque dentro de `secciones:` en `site.yaml`. La cabecera es siempre sólida y va por encima: no depende del orden.
3. **Cambiar textos, piezas, tartas, precios, horarios, fotos**: solo en `site.yaml`. Si un texto contiene comas o dos puntos dentro de `{ … }`, ponlo entre comillas. Precios siempre entre comillas.
4. **Listas planas**: nunca una lista dentro de un elemento de lista. Para agrupar piezas usa `categoria`; para varios datos, una cadena. Máximo 24 elementos por lista.
5. **Nunca inventes** precios, cifras, años ni opiniones: si el cliente no los da, déjalos vacíos (los componentes lo soportan).
6. **Página nueva**: crea `src/pages/<slug>.astro` con `import Base from '../layouts/Base.astro'` y `<Base titulo="…" descripcion="…">…</Base>`, con bandas como `src/pages/aviso-legal.astro`; enlázala en `site.yaml → menu`.
7. **Apartado nuevo**: añade `secciones.<id>` en `site.yaml` con `tipo:` = `texto`, `horno`, `tartas`, `reparto`, `galeria`… (el diseño que quiera reutilizar). `src/pages/index.astro` lo recoge solo; no lo toques.
8. **No tocar** `src/pages/index.astro`, `src/layouts/Base.astro`, `tailwind.config.mjs` ni `src/styles/comun.css` salvo orden explícita de diseño. Tampoco `src/lib/seo.ts` ni `src/pages/robots.txt.ts`, `sitemap.xml.ts` y `llms.txt.ts`: son el SEO de base, salen solos de `site.yaml` y el fichero es el mismo en todas las plantillas. `seo.url` y `seo.indexable` los pone la plataforma: no los cambies.
9. Mantén: `lang="es-ES"`, imágenes con `Imagen.astro` (carga diferida), sin JavaScript nuevo salvo necesidad real (solo hay el de la cabecera y el de «temporada»), bandas a todo el ancho, 16 px de margen lateral del texto, botones de 44 px de alto como mínimo, sin scroll horizontal en móvil, titulares sin palabras partidas (`overflow-wrap: normal`, `hyphens: manual`). Imágenes de contenido con `alt` sacado del contenido (`altHero`, `altFicha`, `altGaleria`, `altSeccion` de `src/lib/seo.ts`); las decorativas, `alt=""`.
10. El formulario no tiene servidor: abre el correo (`mailto`) con el email de `site.yaml`. Para envío real, cambia `action` en `src/components/ui/FormularioContacto.astro`.

## Construir
```
npm ci && npm run build      # resultado en dist/
npx astro preview            # ver dist/ en http://localhost:4321
```
Antes de dar una orden por buena: `npm run build` sin errores.

## Páginas propias (fichas por elemento)
- Listas con página propia (espejo de `fichas:` de template.yaml en `src/data/fichas.ts`): `tartas.tartas` → `/tartas/<slug>/`.
  **Solo los elementos con `detalle`** (texto largo, párrafos separados por una línea en blanco, ≤ 3000 caracteres, sin HTML) tienen página;
  los demás siguen como hasta ahora. Campos opcionales del elemento: `slug` (si falta, sale del nombre; no lo pongas sin motivo)
  e `imagenes` («/fotos/a.jpg; /fotos/b.jpg», galería de la ficha; la foto principal es `imagen` o, si no hay, la primera de `imagenes`).
  El resto de campos (raciones, precio…) salen en la etiqueta de datos de la ficha.
- Una orden «añade una página para la tarta X» = escribir su `detalle` en site.yaml. Nunca crees a mano páginas en
  `src/pages/tartas/`: salen solas de `src/pages/[coleccion]/[slug].astro`.
- No tocar `src/lib/paginas.ts`, `src/lib/slug.ts` ni `src/lib/seo.ts` (comunes a todas las plantillas). Las páginas propias entran solas en
  `sitemap.xml` y `llms.txt`, con su JSON-LD (migas y producto con precio si lo hay).

## Varias páginas
- `paginas:` (raíz de site.yaml, opcional): `[{ ruta, titulo, secciones: "horno; temporada" }]`, como mucho 6, cada sección en una sola página y nunca `hero`. Con ella la web pasa a Inicio (hero + lo que no esté en ninguna página) y una página por entrada (`/el-horno/`…); el menú se hace solo con las páginas (las entradas `/#…` de `menu` no salen) y los enlaces `/#id` del site.yaml se cambian solos por la dirección de su sección. Sin ella, una sola página larga. Una orden «haz la web de varias páginas» = escribir `paginas`; nunca crees páginas a mano para eso.
- No tocar `src/lib/multipagina.ts`, `src/pages/index.astro` ni `src/pages/[...pagina].astro` (comunes a todas las plantillas). En un componente, un enlace fijo a una sección va con `enlace('/#contacto')` (de `src/lib/multipagina.ts`).
