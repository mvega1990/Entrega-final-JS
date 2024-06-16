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


class Producto {
    constructor(id, nombre, marca, precio, img, categoria) {
        this.id = id;
        this.nombre = nombre;
        this.marca = marca;
        this.precio = precio;
        this.img = img;
        this.categoria = categoria;
    }

}

let productos = [];

let producto1 = new Producto("1", "amoladora", "umi", 80000, "../Img productos/Amoladora.jpg", "electricas");
let producto2 = new Producto("2", "alicate", "bremen", 9000, "../Img productos/alicate bremen.jpg", "manuales");
let producto3 = new Producto("3", "amoladora neumatica", "bremen", 30000, "../Img productos/amoladora neumatica bremen.jp}g.jpeg", "neumaticas");
let producto4 = new Producto("4", "banco de trabajo", "palladino", 100000, "../Img productos/banco de trabajo.jpg", "muebleria");
let producto5 = new Producto("5", "Batea", "palladino", 80000, "../Img productos/BATEA-XD.jpg", "muebleria");
let producto6 = new Producto("6", "carro 2 estantes", "palladino", 60000, "../Img productos/carro 2 estantes.jpg", "muebleria");
let producto7 = new Producto("7", "crique de media neumatica", "pz", 16000, "../Img productos/crique de media neumatica PZ.jpg", "neumaticas");
let producto8 = new Producto("8", "piztola de calor", "umi", 60000, "../Img productos/D_NQ_NP_780267-MLU74219968922_012024-O.jpg", "electricas");
let producto9 = new Producto("9", "lijadora chica", "argentec", 26000, "../Img productos/lijadora chia.jpg", "electricas");
let producto10 = new Producto("10", "lijadora grande", "argentec", 56000, "../Img productos/Lijadora grande Argentec.jpg", "electricas");
let producto11 = new Producto("11", "Mesa rodante de 6 cajones", "palladino", 70000, "../Img productos/mesa de 6 cajones.jpg", "muebleria");
let producto12 = new Producto("12", "ordenador 12 cajones", "palladino", 50000, "../Img productos/ordenador 12 cajones.jpg", "muebleria");
let producto13 = new Producto("13", "pico loro", "rucci", 29000, "../Img productos/pico loro rucci.jpg", "manuales");
let producto14 = new Producto("14", "pinza de punta", "bremen", 10000, "../Img productos/Pinza de punta Bremen.jpg", "manuales");
let producto15 = new Producto("15", "pinza universal", "bremen", 12000, "../Img productos/Pinza universal Bremen.jpg", "manuales");
let producto16 = new Producto("16", "piztola de impacto", "pz", 105000, "../Img productos/Piztola de impacto PZ.jpg", "neumaticas");
let producto17 = new Producto("17", "rotohorbital neumatica", "bremen", 66000, "../Img productos/rotohorbital neumatica bremen.jpg", "neumaticas");
let producto18 = new Producto("18", "torno neumatico", "bremen", 46000, "../Img productos/torno neumatico bremen.jpg", "neumaticas");
let producto19 = new Producto("19", "sacafiltro", "rucci", 9000, "../Img productos/sacafiltro rucci.jpg", "manuales");
let producto20 = new Producto("20", "tablero chico", "palladino", 80000, "../Img productos/tablero.jpg", "muebleria");
let producto21 = new Producto("21", "taladro 850w", "umi", 90000, "../Img productos/Taladro UMI.jpg", "electricas");

productos.push(producto1, producto2, producto3, producto4, producto5, producto6, producto7, producto8, producto9, producto10, producto11, producto12, producto13, producto14, producto15, producto16, producto17, producto18, producto19, producto20, producto21);

let contenedorProducto = document.querySelector("#contenedorProductos");
let linkCategorias = document.querySelectorAll(".linkCategorias");
let buttonComprar = document.querySelectorAll(".buttonComprar");
let numeroCarritoID = document.querySelector("#numeroCarritoID")

async function crearProductos(linkElegido) {
    contenedorProducto.innerHTML = "";
    const cotizacionDolar = await obtenerCotizacionDolar();
    linkElegido.forEach((x) => {
        const precioEnDolares = cotizacionDolar ? (x.precio / cotizacionDolar).toFixed(2) : 'N/A';
        const div = document.createElement("div");
        div.classList.add("productos");
        div.innerHTML = `<img class="Imagenproducto" src="${x.img}" alt="${x.titulo}">
        <div class="descripcionPorProducto">
        <h3 class="tituloProducto">${x.nombre}</h3>
        <p class="precioProducto">Precio: $${x.precio} ARS / $${precioEnDolares} USD</p>
        <button class="buttonComprar" id= ${x.id}>Comprar</button>
        </div>
        `
        contenedorProducto.appendChild(div)
    })
    actualizarBotones()

}

crearProductos(productos);

linkCategorias.forEach(link => {
    link.addEventListener("click", (e) => {

        let productosLink = productos.filter(x => x.categoria === e.currentTarget.id);
        crearProductos(productosLink)
    })
})

function actualizarBotones() {
    buttonComprar = document.querySelectorAll(".buttonComprar");
    buttonComprar.forEach(boton => {
        boton.addEventListener("click", agregarACarrrito)
    })
}
let productosEnCarrito = JSON.parse(localStorage.getItem("productoEnCarrito")) || [];
productosEnCarrito.length && actualizarNumero();

function agregarACarrrito(e) {
    const id = e.currentTarget.id

    const productoAgregado = productos.find(producto => producto.id === id)


    console.log(productosEnCarrito.some(producto => producto.id === id))
    if (productosEnCarrito.some(producto => producto.id === id)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === id)
        productosEnCarrito[index].cantidad++

    } else {
        productoAgregado.cantidad = 1
        productosEnCarrito.push(productoAgregado);
    }
    actualizarNumero()

    localStorage.setItem("productoEnCarrito", JSON.stringify(productosEnCarrito))
    Toastify({

        text: "Se agrego al carrito",

        duration: 3000

    }).showToast();

}

function actualizarNumero() {
    let nuevoNumero = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numeroCarritoID.innerText = nuevoNumero;
}