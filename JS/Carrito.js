
    /* document.addEventListener("DOMContentLoaded", () => {
        
        const carritoProductos = JSON.parse(localStorage.getItem("productoEnCarrito")) || [];
        
        
        let carritoVacio = document.querySelector("#carritoVacio");
        let contenedorCarritoProductos = document.querySelector("#carritoProductos");
        let carritoAcciones = document.querySelector("#carritoAcciones");
        let botonBorrar = document.querySelectorAll(".delete")
    
        
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
    
            // Iterar sobre productos del carrito y agregarlos a la tabla
            carritoProductos.forEach(producto => {
                const filaProductos = document.createElement("tr");
                filaProductos.className = "CartProducto";
    
                const imgTd = document.createElement("td");
                imgTd.className = "imgProductoCarrito";
                const img = document.createElement("img");
                img.src = producto.img; // Asegúrate de que `producto.imagen` contenga la URL de la imagen
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
                    <input class="cantidadInput" type="number" style="width:50px; text-align:center" min="0" value="${producto.cantidad}">
                `;
    
                const subtotalTd = document.createElement("td");
                subtotalTd.className = "subtotalNumero";
                subtotalTd.innerHTML = `$ ${producto.precio * producto.cantidad}`;
    
                const deleteTd = document.createElement("td");
                deleteTd.className = "delete";
                deleteTd.innerHTML = '<button><i class="bi bi-trash"></i></button>';
    
                filaProductos.appendChild(imgTd);
                filaProductos.appendChild(descripcionTd);
                filaProductos.appendChild(precioTd);
                filaProductos.appendChild(cantidadTd);
                filaProductos.appendChild(subtotalTd);
                filaProductos.appendChild(deleteTd);
    
                tbody.appendChild(filaProductos);
            });
            actualizarBotonesEliminar()
    
            
            table.appendChild(tbody);
    
           
            contenedorCarritoProductos.appendChild(table);
        }
        
    });
    
    function actualizarNumero(arrayDeProdCarrito) {
        let nuevoNumero = arrayDeProdCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
        numeroCarritoID.innerText = nuevoNumero; 
    }
   
    function actualizarBotonesEliminar() {
        botonBorrar = document.querySelectorAll(".delete");
        botonBorrar.forEach(boton => {
            boton.addEventListener("click", eliminarDelCarrito)
        })
    }
   
function eliminarDelCarrito(e){
        let idBoton = e.currentTarget.id
        let productoEliminado = carritoProductos.find(producto=>producto.id===idBoton)
    
        
} */
let carritoVacio = document.querySelector("#carritoVacio");
let contenedorCarritoProductos = document.querySelector("#carritoProductos");
let carritoAcciones = document.querySelector("#carritoAcciones");
let botonBorrar = document.querySelectorAll(".delete button")
let botonComprar = document.querySelector(".comprar")
let contenedorParrafoCompra=document.querySelector(".contenedorCarrito")


document.addEventListener("DOMContentLoaded", function() {
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

        // Iterar sobre productos del carrito y agregarlos a la tabla
        carritoProductos.forEach(producto => {
            const filaProductos = document.createElement("tr");
            filaProductos.className = "CartProducto";

            const imgTd = document.createElement("td");
            imgTd.className = "imgProductoCarrito";
            const img = document.createElement("img");
            img.src = producto.img; // Asegúrate de que `producto.img` contenga la URL de la imagen
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
                <input class="cantidadInput" type="number" style="width:50px; text-align:center" min="0" value="${producto.cantidad}">
            `;

            const subtotalTd = document.createElement("td");
            subtotalTd.className = "subtotalNumero";
            subtotalTd.innerHTML = `$ ${producto.precio * producto.cantidad}`;

            const deleteTd = document.createElement("td");
            deleteTd.className = "delete";
            deleteTd.innerHTML = '<button id="' + producto.id + '"><i class="bi bi-trash"></i></button>';

            filaProductos.appendChild(imgTd);
            filaProductos.appendChild(descripcionTd);
            filaProductos.appendChild(precioTd);
            filaProductos.appendChild(cantidadTd);
            filaProductos.appendChild(subtotalTd);
            filaProductos.appendChild(deleteTd);

            tbody.appendChild(filaProductos);
        });

        table.appendChild(tbody);
        contenedorCarritoProductos.appendChild(table);

        actualizarBotonesEliminar();
        Actualizartotal()
        
    }

;})




function actualizarBotonesEliminar() {
    botonBorrar = document.querySelectorAll(".delete button");
    botonBorrar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito);
        
    });
}

function eliminarDelCarrito(e) {
    let idBoton = e.currentTarget.id;
    
    let carritoProductos = JSON.parse(localStorage.getItem("productoEnCarrito")) || [];
    let productoEliminado = carritoProductos.find(producto => producto.id === idBoton);
    
    if (productoEliminado) {
        
        carritoProductos = carritoProductos.filter(producto => producto.id !== idBoton);
        localStorage.setItem("productoEnCarrito", JSON.stringify(carritoProductos));
        

        
        const filaProducto = e.currentTarget.closest('tr');
        filaProducto.remove();

        
        Actualizartotal()
        actualizarNumero()
    }
    
}
function actualizarNumero() {
    let carritoProductos = JSON.parse(localStorage.getItem("productoEnCarrito")) || [];
    let nuevoNumero = carritoProductos.reduce((acc, producto) => acc + producto.cantidad, 0);
    numeroCarritoID.innerText = nuevoNumero; 
}


actualizarNumero()

function Actualizartotal(){
    let valorTotalp = document.querySelector(".valorTotal")
    let carritoProductos = JSON.parse(localStorage.getItem("productoEnCarrito")) || [];
    const totalCalculado = carritoProductos.reduce((acc , producto) => acc + (producto.precio * producto.cantidad), 0)
    valorTotalp.innerText= `$${totalCalculado}`
}

botonComprar.addEventListener("click", comprarCarrito)
function comprarCarrito(){
    carritoProductos.length=0
    localStorage.setItem("productosEnCarrito", JSON.stringify(carritoProductos))
    
    carritoVacio.classList.add("disabled");
    contenedorCarritoProductos.classList.add("disabled");
    carritoAcciones.classList.add("disabled");
    let parrafoCompra= document.createElement("p")
    parrafoCompra.innerText= "Gracias por su compra"
    contenedorParrafoCompra.appendChild(parrafoCompra)

    }

