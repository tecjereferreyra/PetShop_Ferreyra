export function crearFiltroCategorias(categorias, idActiva) {
    const botones = categorias.map(c => `
        <button class="btn-filtro ${c.IdCategoria === idActiva ? "activo" : ""}"
            data-id="${c.IdCategoria}">${c.Nombre}</button>
    `).join("");

    return `
        <button class="btn-filtro ${idActiva === null ? "activo" : ""}"
            data-id="">Todos</button>
        ${botones}
    `;
}

export function crearOpcionesCategorias(categorias) {
    return '<option value="">Seleccione una categoría</option>' +
        categorias.map(c =>
            `<option value="${c.IdCategoria}">${c.Nombre}</option>`
        ).join("");
}