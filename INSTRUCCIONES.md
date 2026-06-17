# Inventario de Materia Prima — Instalación

App de inventario en un solo archivo HTML, conectada a un Google Sheet mediante
Google Apps Script. Mismo funcionamiento que el inventario de telas, pero con:

- Catálogo precargado de **776 productos** (clave de artículo + descripción), tomado de `materia_prima.csv`.
- Movimientos de **Entrada / Salida / Devolución**.
- **Cantidad + Unidad** (pieza, litro, kilo, metro, caja…) en vez de metros/rollos.
- Campo **Cliente** para salidas.
- Pestañas **Movimientos** y **Catálogo** (con existencia calculada y filtro "solo con existencia").

## Archivos

| Archivo                         | Qué es                                              |
|---------------------------------|-----------------------------------------------------|
| `inventario-materia-prima.html` | La app. Se abre en el navegador.                    |
| `Code.gs`                       | El backend que va dentro de Google Apps Script.     |
| `materia_prima.csv`             | Fuente del catálogo (por si hay que regenerarlo).   |

## Paso 1 — Crear el Google Sheet

1. Ve a https://sheets.google.com y crea una hoja de cálculo nueva.
2. Ponle el nombre que quieras (ej. *Inventario Materia Prima*).
   - No necesitas crear pestañas ni encabezados: el script crea la hoja
     "Movimientos" con sus columnas automáticamente la primera vez.

## Paso 2 — Pegar el Apps Script

1. En el Sheet, menú **Extensiones → Apps Script**.
2. Borra el contenido de ejemplo y pega **todo** el contenido de `Code.gs`.
3. Guarda (ícono de disquete).

## Paso 3 — Implementar como aplicación web

1. Arriba a la derecha: **Implementar → Nueva implementación**.
2. En "Tipo", elige **Aplicación web**.
3. Configura:
   - **Ejecutar como:** Yo (tu cuenta).
   - **Quién tiene acceso:** **Cualquier usuario**.
4. Clic en **Implementar** y autoriza los permisos cuando te los pida
   (acepta la pantalla de "no verificada" → Configuración avanzada → Ir al proyecto).
5. Copia la **URL de la aplicación web** (termina en `/exec`).

> Si más adelante editas `Code.gs`, usa **Implementar → Gestionar implementaciones
> → editar (lápiz) → Versión: Nueva** para que los cambios surtan efecto.
> Esa URL no cambia.

## Paso 4 — Pegar la URL en la app

1. Abre `inventario-materia-prima.html` en un editor de texto.
2. Busca esta línea (cerca del inicio del `<script>`):

   ```js
   const API = 'PEGA_AQUI_LA_URL_DE_TU_APPS_SCRIPT';
   ```

3. Reemplaza el texto entre comillas por tu URL `/exec`. Guarda.

¡Listo! Abre el HTML en el navegador y empieza a registrar movimientos.
La advertencia amarilla de "falta configurar la URL" desaparece sola al pegarla.

## Cómo se usa

- **Registrar movimiento:** escribe en *Producto* la clave o parte del nombre y
  elige de la lista. Aparece un check verde con la existencia actual. Elige
  tipo, cantidad y unidad. Para *Salida* aparece el campo Cliente.
- **Movimientos:** historial completo, buscable por clave o producto.
- **Catálogo:** los 776 productos con su existencia calculada. Marca
  "Solo con existencia" para ver únicamente lo que tiene stock.

## Regenerar el catálogo (opcional)

Si cambia la lista de productos, edita `materia_prima.csv` (columnas:
`Almacén, Descripción del almacén, Clave de artículo, Estatus, Descripción del producto`)
y vuelve a generar el bloque del catálogo dentro del HTML. El catálogo vive
entre los marcadores `/*__CATALOGO__*/` y `/*__FIN__*/` como un arreglo de
pares `["clave","descripción"]`.
