# Panadería y pastelería: brief de diseño

Plantilla `panaderia-pasteleria` creada el 10/11/2026 a partir de `cafeteria-brunch` con `php artisan plantillas:nueva` y
rediseñada entera con el tema **Solstice** de la skill Hallmark (género editorial). De la base solo queda la estructura técnica.
Este fichero se queda en el repo: es lo que lee quien (persona o agente) rediseñe la plantilla.

## Brief

- **Para quién**: panaderías, pastelerías, hornos y obradores tradicionales de pueblo o de barrio (sectores `panaderia`,
  `pasteleria`, `horno`, `confiteria`): pan del día, bollería, tartas por encargo, dulces típicos, turrones y roscones de
  temporada, a veces reparto a bares y tiendas. Su cliente entra para ver qué hacen, el horario, dónde están y encargar una tarta.
- **Qué tiene que conseguir la web**: que **encarguen** (tarta o pedido, por WhatsApp o teléfono) y que **vengan** (horario y
  dirección). «Encargar una tarta» en la cabecera y en la portada; en móvil, barra fija con «Llamar» y «Encargar».
- **Tono**: almanaque, cálido, de oficio. Sí: el papel de una etiqueta de horno antiguo, la luz baja de la mañana sobre el pan.
  No: la pastelería rosa de cupcakes ni la plantilla de crema y terracota que hace cualquier generador.

## Tema Hallmark y cómo se ha traducido

Solstice (`references/themes/solstice.md`, luz `long-light`): papel crema, tinta marrón, Yeseva One en titulares, Archivo para
leer y Archivo Narrow para la letra menuda, filetes de oro, superficies cuadradas con sombra dura de papel, fotos de luz baja y
cálida, una sola señal bermellón por debajo del 5 % de la pantalla.

- **Cuatro colores** → `fondo` = papel (`#f6e9d5`), `texto` = tinta (`#3a1e0e`), `acento` = bermellón (`#c9212e`: botón, foco,
  la cifra del año, la marca «La más pedida»), `primario` = banda de tinta (`#442415`: «temporada» y el pie).
- **Derivados** (`src/styles/global.css`): `--papel-2` (pozos, bandas claras), `--papel-3` (sombra dura), `--oro` (filetes;
  toma el matiz del papel con `oklch(from …)`: con un papel blanco sale un filete neutro), `--filete`, `--apagado`,
  `--acento-legible` (bermellón como texto, nunca más claro que L 0,5), `--sobre-primario` y `--sobre-acento` (texto claro u
  oscuro según el color del cliente). Probado con primario azul marino, acento amarillo y papel blanco: legible.
- **Material**: cabeza de sección con filete de tinta de 2 px a todo el ancho; filetes de oro bajo los títulos de grupo y de
  puntos entre filas; el pozo (borde de tinta, filete de oro por dentro a 8 px y sombra dura sin desenfoque) para el horario,
  el formulario y la etiqueta de cada tarta; botones en pareja: píldora bermellón + subrayado de tinta; fotos cuadradas con
  filete de tinta al 12 % y tratamiento cálido por CSS (`sepia(.16) saturate(.97) brightness(.97)`). Movimiento quieto: solo
  el subrayado del menú y el signo de las preguntas.
- **Firma**: «el año en una línea» (Range del tema): los dulces de temporada como paradas sobre un filete de oro en la banda
  de tinta, el mes en letra menuda dorada y el dulce en Yeseva; el mes en curso se marca en bermellón.

## Tipografías y licencias

Yeseva One 400 (Jovanny Lemonad), Archivo 400 y 500 y Archivo Narrow 600 (Omnibus-Type), todas **OFL-1.1**, woff2 `latin` de
Fontsource en `public/fuentes/` (59 KB en total), `font-display: swap`, respaldo del sistema de la misma clase y `preload` solo
de Yeseva One. Archivo Narrow es la anchura estrecha de la misma superfamilia Archivo; el tema la declara como cara de la letra
menuda, por eso son tres ficheros de familia. Detalle en `public/fuentes/LICENCIAS.md`.

Titulares sin palabras partidas: `overflow-wrap: normal`, `hyphens: manual`; en Yeseva una palabra de 20 letras mide 11,16 em,
así que el `h1` baja a 30 px a 375 px y los `h2` a 28 px para que quepa «Impermeabilizaciones». En escritorio el `h1` de la
portada se limita con `cqi` a la columna de texto.

## Forma y ritmo de bandas

| # | Sección | Papel | Lleva |
|---|---|---|---|
| 1 | `hero` | papel | Stage: texto en la mitad izquierda, foto a sangre a la derecha de toda la altura (en móvil, arriba) |
| 2 | `horno` | papel | lista del horno por grupos con filetes (la «etiqueta como lista con filetes») |
| 3 | `obrador` | clara | foto a sangre a la izquierda, año en cifra bermellón, declaración y valores en filas |
| 4 | `temporada` | tinta | el año en una línea (firma) |
| 5 | `tartas` | papel | rejilla de tartas con foto vertical, pasos numerados y botón de WhatsApp |
| 6 | `reparto` | clara | filas con filete |
| 7 | `galeria` | papel | mosaico, la primera foto grande |
| 8 | `horario` | clara | dirección y el horario en un pozo |
| 9 | `opiniones` | papel | la primera como frase grande |
| 10 | `preguntas` | clara | filas `details` |
| 11 | `contacto` | papel | vías grandes y formulario en un pozo |
| — | pie | tinta | nombre como mástil, cuatro columnas, barra móvil |

Se alternan bandas guiadas por foto (portada, obrador, tartas, galería) con bandas que solo hace el material (lista con
filetes, el año en una línea, filas, pozo).

## Listas propias y páginas

- `horno.hornada` {nombre, texto, precio, categoria, destacado}, `temporada.dulces` {mes, nombre, texto},
  `tartas.tartas` {nombre, texto, raciones, precio, imagen, imagenes, detalle}.
- Fichas: cada tarta con `detalle` tiene su página en `/tartas/<slug>/` (`Product`). Sin zonas (no es un oficio que se desplace).
- Varias páginas recomendadas: El horno (horno, temporada), Tartas, El obrador (obrador, reparto), Horario y contacto.

## Fotos

10 fotos generadas con IA a partir de `fotos.json` (pan en el mostrador con luz baja, boca del horno de leña, las tres tartas,
carro de pan enfriando, manos amasando, bandeja de croissants, mostrador con cestas, dulces tradicionales en papel de estraza).
Sin texto, sin logotipos, sin caras. La herramienta devuelve 1024×1024: se recortan al aspecto y se amplían (la portada a
1920 px), así que están algo blandas a pantalla completa; conviene que el cliente ponga las suyas.

## Lo que no se ha podido o choca con Hallmark

- `antetitulo` es contrato: se pinta como letra menuda en caja normal (Hallmark prohíbe el antetítulo).
- `opiniones` lleva ejemplos ficticios en el `site.yaml` de muestra (Hallmark prohíbe inventarlos); la plataforma deja la
  sección desmarcada y vacía al crear una web.
- Los `items` de la portada la plataforma los trata como cifras (no se inventan): por eso no van en el paso «negocio» del guion.
- El sello de Hallmark no queda en la primera línea del CSS servido (Tailwind antepone su cabecera al ir en línea) y `comun.css`
  (común a todas las plantillas) trae colores literales y etiquetas en mayúsculas que aquí se anulan.
- Hallmark pide 450 palabras por página; una web de panadería con la lista del horno y las preguntas pasa de 1000. Se queda así
  porque es contenido que el cliente necesita.
