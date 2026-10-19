const API_URL = "/api";   

async function pedirJson(url, opciones) {
    const respuesta = await fetch(url, opciones);
    const datos = await respuesta.json();

    if (!respuesta.ok) {
        // El mensaje del back viaja en datos.mensaje
        throw new Error(datos.mensaje || "Error al comunicarse con la API.");
    }

    return datos;
}

export function obtenerCategorias() {
    return pedirJson(`${API_URL}/categorias`);
}

export function obtenerProductos(idCategoria) {
    const query = idCategoria ? `?categoria=${idCategoria}` : "";
    return pedirJson(`${API_URL}/productos${query}`);
}

export function crearProducto(producto) {
    return pedirJson(`${API_URL}/productos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(producto)
    });
}