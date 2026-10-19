import { obtenerCategorias, obtenerProductos, crearProducto } from "./api.js";
import crearTarjetaProducto from "./componentes/tarjetaProducto.js";
import { crearFiltroCategorias, crearOpcionesCategorias } from "./componentes/filtroCategoria.js";

const contenedorFiltro = document.querySelector("#filtroCategorias");
const grillaProductos = document.querySelector("#grillaProductos");
const formProducto = document.querySelector("#formProducto");
const selectCategoria = document.querySelector("#categoria");
const inputNombre = document.querySelector("#nombre");
const inputPrecio = document.querySelector("#precio");
const inputStock = document.querySelector("#stock");
const mensajeForm = document.querySelector("#mensajeForm");

// ------------------------------------------------------------
// Estado (la arquitectura de la Clase 13 sigue intacta)
// ------------------------------------------------------------
const estado = {
    categorias: [],
    categoriaActiva: null    // null = "Todos"
};

function mostrarMensaje(texto, tipo) {
    mensajeForm.textContent = texto;
    mensajeForm.className = `mensaje ${tipo}`;
    setTimeout(() => {
        mensajeForm.textContent = "";
        mensajeForm.className = "mensaje";
    }, 6000);
}

// ------------------------------------------------------------
// Render
// ------------------------------------------------------------
function renderFiltro() {
    contenedorFiltro.innerHTML =
        crearFiltroCategorias(estado.categorias, estado.categoriaActiva);
}

async function renderProductos() {
    try {
        const productos = await obtenerProductos(estado.categoriaActiva);

        grillaProductos.innerHTML = productos.length
            ? productos.map(crearTarjetaProducto).join("")
            : '<p class="resumen-vacio">No hay productos en esta categoría.</p>';
    } catch (error) {
        grillaProductos.innerHTML = `<p class="resumen-vacio">${error.message}</p>`;
        console.error(error);
    }
}

// ------------------------------------------------------------
// Eventos
// ------------------------------------------------------------
contenedorFiltro.addEventListener("click", (evento) => {
    const boton = evento.target.closest(".btn-filtro");
    if (!boton) {
        return;
    }

    estado.categoriaActiva = boton.dataset.id ? Number(boton.dataset.id) : null;
    renderFiltro();
    renderProductos();
});

formProducto.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    try {
        const datos = await crearProducto({
            idCategoria: selectCategoria.value,
            nombre: inputNombre.value,
            precio: inputPrecio.value,
            stock: inputStock.value
        });

        mostrarMensaje(datos.mensaje, "ok");
        formProducto.reset();
        renderProductos();
    } catch (error) {
        mostrarMensaje(error.message, "error");
        console.error(error);
    }
});

// ------------------------------------------------------------
// Inicio
// ------------------------------------------------------------
async function iniciar() {
    try {
        estado.categorias = await obtenerCategorias();
        renderFiltro();
        selectCategoria.innerHTML = crearOpcionesCategorias(estado.categorias);
        renderProductos();
    } catch (error) {
        grillaProductos.innerHTML =
            '<p class="resumen-vacio">No se pudo conectar con la API.</p>';
        console.error(error);
    }
}

iniciar();