# Inventario

Inventarios web (un solo archivo HTML cada uno) conectados a Google Sheets vía Google Apps Script.

## Apps en producción

- **Telas:** https://ariek85.github.io/Inventario-carlos-/inventario-telas.html
- **Materia Prima:** https://ariek85.github.io/Inventario-carlos-/inventario-materia-prima.html

## Materia Prima

Catálogo precargado de 776 productos (clave + descripción). Movimientos de entrada/salida/devolución
con cantidad + unidad y campo cliente para salidas.

- App: [`inventario-materia-prima.html`](inventario-materia-prima.html)
- Backend Apps Script: [`Code.gs`](Code.gs)
- Fuente del catálogo: [`materia_prima.csv`](materia_prima.csv)
- **Instalación del backend:** [`INSTRUCCIONES.md`](INSTRUCCIONES.md)

> Pendiente para que quede 100% funcional: crear el Google Sheet, pegar `Code.gs`,
> implementar como app web y pegar la URL `/exec` en la variable `API` del HTML
> (ver INSTRUCCIONES.md). Es el único paso que requiere tu cuenta de Google.
