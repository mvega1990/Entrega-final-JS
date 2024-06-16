let numeroCarritoID = document.querySelector("#numeroCarritoID")
function actualizarNumero() {
    let carritoProductos = JSON.parse(localStorage.getItem("productoEnCarrito")) || [];
    let nuevoNumero = carritoProductos.reduce((acc, producto) => acc + producto.cantidad, 0);
    numeroCarritoID.innerText = nuevoNumero; 
}
actualizarNumero()