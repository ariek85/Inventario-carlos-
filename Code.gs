/**
 * Backend del Inventario de Materia Prima (Google Apps Script).
 *
 * Guarda los movimientos en una hoja llamada "Movimientos" del Google Sheet
 * donde esté pegado este script. Crea la hoja y el encabezado automáticamente.
 *
 * Acciones (vía parámetros GET):
 *   ?action=list                         -> { ok, data: [...] }
 *   ?action=add&clave=...&cantidad=...   -> { ok, row }
 *   ?action=delete&id=...                -> { ok, deleted }
 *
 * Ver INSTRUCCIONES.md para el paso a paso de instalación.
 */

var SHEET_NAME = 'Movimientos';
var HEADERS = ['id', 'fecha', 'clave', 'descripcion', 'tipo', 'cantidad', 'unidad', 'cliente', 'nota'];

function doGet(e) {
  var action = (e && e.parameter && e.parameter.action) || '';
  try {
    if (action === 'list')   return json({ ok: true, data: listRows() });
    if (action === 'add')    return json({ ok: true, row: addRow(e.parameter) });
    if (action === 'delete') return json({ ok: true, deleted: deleteRow(e.parameter.id) });
    return json({ ok: false, error: 'Acción desconocida: ' + action });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  }
}

// Permite también peticiones POST (por si en el futuro se usan).
function doPost(e) {
  return doGet(e);
}

function getSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName(SHEET_NAME);
  if (!sh) {
    sh = ss.insertSheet(SHEET_NAME);
    sh.appendRow(HEADERS);
  }
  if (sh.getLastRow() === 0) {
    sh.appendRow(HEADERS);
  }
  return sh;
}

function listRows() {
  var sh = getSheet();
  var values = sh.getDataRange().getValues();
  if (values.length < 2) return [];
  var head = values.shift();
  return values.map(function (r) {
    var o = {};
    head.forEach(function (h, i) { o[h] = r[i]; });
    return o;
  });
}

function addRow(p) {
  var sh = getSheet();
  var row = HEADERS.map(function (h) {
    return (p[h] !== undefined && p[h] !== null) ? p[h] : '';
  });
  sh.appendRow(row);
  return row;
}

function deleteRow(id) {
  var sh = getSheet();
  var values = sh.getDataRange().getValues();
  for (var i = 1; i < values.length; i++) {
    if (String(values[i][0]) === String(id)) {
      sh.deleteRow(i + 1);
      return true;
    }
  }
  return false;
}

function json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
