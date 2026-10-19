const { sql, getConnection } = require("../config/db");

async function listarCategorias() {
  const pool = await getConnection();
  const resultado = await pool.request().execute("usp_ListarCategorias");
  return resultado.recordset;
}

async function listarProductos(idCategoria) {
  const pool = await getConnection();
  const resultado = await pool.request()
    .input("IdCategoria", sql.Int, idCategoria ?? null)
    .execute("usp_ListarProductos");
  return resultado.recordset;
}

async function crear({ idCategoria, nombre, precio, stock }) {
  const pool = await getConnection();

  const resultado = await pool.request()
    .input("IdCategoria", sql.Int, idCategoria)
    .input("Nombre", sql.NVarChar(80), nombre)
    .input("Precio", sql.Decimal(12, 2), precio)
    .input("Stock", sql.Int, stock)
    .output("IdProducto", sql.Int)
    .execute("usp_CrearProducto");

  return resultado.output.IdProducto;
}

module.exports = { listarCategorias, listarProductos, crear };