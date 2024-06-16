let carritoVacio = document.querySelector("#carritoVacio");
let contenedorCarritoProductos = document.querySelector("#carritoProductos");
let carritoAcciones = document.querySelector("#carritoAcciones");
let botonBorrar = document.querySelectorAll(".delete button")
let botonComprar = document.querySelector(".comprar")
let contenedorParrafoCompra = document.querySelector(".contenedorCarrito")

async function obtenerCotizacionDolar() {
    try {
        const response = await fetch("https://dolarapi.com/v1/dolares/oficial");
        const data = await response.json();
        return data.venta;
    } catch (error) {
        console.error('Error al obtener la cotización del dólar:', error);
        return null;
    }
}


document.addEventListener("DOMContentLoaded", function () {
    const carritoProductos = JSON.parse(localStorage.getItem("productoEnCarrito")) || [];

    if (carritoProductos.length > 0) {
        carritoVacio.classList.add("disabled");
        contenedorCarritoProductos.classList.remove("disabled");
        carritoAcciones.classList.remove("disabled");


        const table = document.createElement("table");
        table.className = "cartTable offset-lg-2 col-lg-8";

        const tbody = document.createElement("tbody");

        // Fila de encabezado
        const headerRow = document.createElement("tr");
        headerRow.className = "CartProducto";

        const headers = ["Producto", "Producto", "Precio", "Cant.", "SubTotal", ""];
        headers.forEach(headerText => {
            const th = document.createElement("td");
            th.textContent = headerText;
            headerRow.appendChild(th);
        });

        tbody.appendChild(headerRow);


        carritoProductos.forEach(producto => {
            const filaProductos = document.createElement("tr");
            filaProductos.className = "CartProducto";

            const imgTd = document.createElement("td");
            imgTd.className = "imgProductoCarrito";
            const img = document.createElement("img");
            img.src = producto.img;
            imgTd.appendChild(img);

            const descripcionTd = document.createElement("td");
            descripcionTd.className = "descripcionProductoCarrito";
            descripcionTd.innerHTML = `
                <div class="CartDescription">
                    <p class="descripcionProductoEspecifico">${producto.nombre}</p>
                    <p class="codigoNum">Cod. ${producto.id}</p>
                </div>
            `;

            const precioTd = document.createElement("td");
            precioTd.className = "productoPrecio";
            precioTd.innerHTML = `<p class="productoPrecioCarrito">$ ${producto.precio}</p>`;

            const cantidadTd = document.createElement("td");
            cantidadTd.className = "car-cant";
            cantidadTd.innerHTML = `
            <p class="productoPrecioCarrito">${producto.cantidad}</p>
            `;

            const subtotalTd = document.createElement("td");
            subtotalTd.className = "subtotalNumero";
            subtotalTd.innerHTML = `$ ${producto.precio * producto.cantidad}`;

            const deleteTd = document.createElement("td");
            deleteTd.className = "delete";
            deleteTd.innerHTML = '<button id="' + producto.id + '"><i class="bi bi-trash"></i></button>';

            filaProductos.append(imgTd, descripcionTd, precioTd, cantidadTd, subtotalTd, deleteTd);


            tbody.appendChild(filaProductos);
        });

        table.appendChild(tbody);
        contenedorCarritoProductos.appendChild(table);

        actualizarBotonesEliminar();
        Actualizartotal()

    }

    ;
})




function actualizarBotonesEliminar() {
    botonBorrar = document.querySelectorAll(".delete button");
    botonBorrar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito);

    });
}

function eliminarDelCarrito(e) {
    let idBoton = e.currentTarget.id;
    const filaProducto = e.currentTarget.closest('tr');

    Swal.fire({
        title: "Estas seguro de eliminar esta linea de productos?",
        text: "Podras volver agregarlo de nuevo desde Productos",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, quiero borrarlo!"
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: "Borrado",
                text: "Este producto se elimino del carrito",
                icon: "success"
            });

            let carritoProductos = JSON.parse(localStorage.getItem("productoEnCarrito")) || [];
            let productoEliminado = carritoProductos.find(producto => producto.id === idBoton);

            if (productoEliminado) {
                carritoProductos = carritoProductos.filter(producto => producto.id !== idBoton);
                localStorage.setItem("productoEnCarrito", JSON.stringify(carritoProductos));

                filaProducto && filaProducto.remove();

                Actualizartotal();
                actualizarNumero();
            }
            if(carritoProductos.length==0){
                carritoVacio.classList.remove("disabled");
                contenedorCarritoProductos.classList.add("disabled");
                carritoAcciones.classList.add("disabled");
            }
        }
    });
}


function actualizarNumero() {
    let carritoProductos = JSON.parse(localStorage.getItem("productoEnCarrito")) || [];
    let nuevoNumero = carritoProductos.reduce((acc, producto) => acc + producto.cantidad, 0);
    numeroCarritoID.innerText = nuevoNumero;
}


actualizarNumero()

async function Actualizartotal() {
    let valorTotalp = document.querySelector(".valorTotal")
    const cotizacionDolar = await obtenerCotizacionDolar();

    let carritoProductos = JSON.parse(localStorage.getItem("productoEnCarrito")) || [];
    const precioEnDolares = carritoProductos.reduce((acc, producto) => acc + ((producto.precio * producto.cantidad) / cotizacionDolar), 0)
    const precioEnDolaresDecimal = precioEnDolares.toFixed(2)
    const totalCalculado = carritoProductos.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0)
    valorTotalp.innerText = `$${totalCalculado} / USD ${precioEnDolaresDecimal}`
}

botonComprar.addEventListener("click", comprarCarrito)

function comprarCarrito() {
    carritoProductos.length = 0
    localStorage.clear()
    carritoVacio.classList.add("disabled");
    contenedorCarritoProductos.classList.add("disabled");
    carritoAcciones.classList.add("disabled");
    let parrafoCompra = document.createElement("p")
    parrafoCompra.innerText = "Gracias por su compra"
    contenedorParrafoCompra.appendChild(parrafoCompra)
    actualizarNumero()
}