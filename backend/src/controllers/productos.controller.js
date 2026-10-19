const productosService = require("../services/productos.service");

// GET /api/categorias
async function listarCategorias(req, res) {
  const categorias = await productosService.listarCategorias();
  res.json(categorias);
}

// GET /api/productos?categoria=3
async function listarProductos(req, res) {
  const { categoria } = req.query;

  let idCategoria = null;
  if (categoria !== undefined && categoria !== "") {
    idCategoria = Number(categoria);
    if (Number.isNaN(idCategoria)) {
      return res.status(400).json({ mensaje: "La categoría debe ser numérica." });
    }
  }

  const productos = await productosService.listarProductos(idCategoria);
  res.json(productos);
}

// POST /api/productos
async function crearProducto(req, res) {
  const { idCategoria, nombre, precio, stock } = req.body;

  if (!idCategoria || Number.isNaN(Number(idCategoria))) {
    return res.status(400).json({ mensaje: "Debe elegir una categoría válida." });
  }
  if (!nombre || nombre.trim() === "") {
    return res.status(400).json({ mensaje: "El nombre del producto es obligatorio." });
  }
  if (Number.isNaN(Number(precio)) || Number(precio) <= 0) {
    return res.status(400).json({ mensaje: "El precio debe ser mayor a cero." });
  }
  if (Number.isNaN(Number(stock)) || Number(stock) < 0) {
    return res.status(400).json({ mensaje: "El stock no puede ser negativo." });
  }

  const idProducto = await productosService.crear({
    idCategoria: Number(idCategoria),
    nombre: nombre.trim(),
    precio: Number(precio),
    stock: Number(stock)
  });

  res.status(201).json({ idProducto, mensaje: `Producto N° ${idProducto} creado.` });
}

module.exports = { listarCategorias, listarProductos, crearProducto };