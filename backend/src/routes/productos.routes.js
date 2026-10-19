const { Router } = require("express");
const asyncHandler = require("../middlewares/asyncHandler");
const productosController = require("../controllers/productos.controller");

const router = Router();

router.get("/categorias", asyncHandler(productosController.listarCategorias));
router.get("/productos", asyncHandler(productosController.listarProductos));
router.post("/productos", asyncHandler(productosController.crearProducto));

module.exports = router;