// PRODUCTOS
const productos = [
    // Moneda extranjera
    {
        id: "dolares",
        titulo: "Dólares Estadounidenses",
        imagen: "./img/moneda-extranjera/dolares.jpg",
        categoria: {
            nombre: "Monedas Extranjeras",
            id: "monedas"
        },
        precio: 195
    },
    {
        id: "euros",
        titulo: "Euros",
        imagen: "./img/moneda-extranjera/euros.jpg",
        categoria: {
            nombre: "Monedas Extranjeras",
            id: "monedas"
        },
        precio: 203.10
    },
    {
        id: "reales",
        titulo: "Reales Brasileños",
        imagen: "./img/moneda-extranjera/reales.jpg",
        categoria: {
            nombre: "Monedas Extranjeras",
            id: "monedas"
        },
        precio: 36.51
    },
    {
        id: "libras",
        titulo: "Libras Esterlinas",
        imagen: "./img/moneda-extranjera/libras.jpg",
        categoria: {
            nombre: "Monedas Extranjeras",
            id: "monedas"
        },
        precio: 225.94
    },
    {
        id: "yuanes",
        titulo: "Yuanes Chinos",
        imagen: "./img/moneda-extranjera/yuanes.jpg",
        categoria: {
            nombre: "Monedas Extranjeras",
            id: "monedas"
        },
        precio: 6.78
    },
    // Bonos y Acciones
    {
        id: "pampa-energia",
        titulo: "Pampa Energía",
        imagen: "./img/bonos-acciones/pampa-energia.jpg",
        categoria: {
            nombre: "Bonos y Acciones",
            id: "bonos-acciones"
        },
        precio: 498
    },
    {
        id: "telecom",
        titulo: "Telecom",
        imagen: "./img/bonos-acciones/telecom.jpeg",
        categoria: {
            nombre: "Bonos y Acciones",
            id: "bonos-acciones"
        },
        precio: 476.95
    },
    {
        id: "banco-galica",
        titulo: "Banco Galicia",
        imagen: "./img/bonos-acciones/banco-galicia.jpg",
        categoria: {
            nombre: "Bonos y Acciones",
            id: "bonos-acciones"
        },
        precio: 482.8
    },
    {
        id: "ypf",
        titulo: "YPF",
        imagen: "./img/bonos-acciones/ypf.jpg",
        categoria: {
            nombre: "Bonos y Acciones",
            id: "bonos-acciones"
        },
        precio: 4315
    },
    {
        id: "aluar",
        titulo: "Aluar",
        imagen: "./img/bonos-acciones/aluar.jpg",
        categoria: {
            nombre: "Bonos y Acciones",
            id: "bonos-acciones"
        },
        precio: 211.5
    },
    {
        id: "edenor",
        titulo: "Edenor",
        imagen: "./img/bonos-acciones/edenor.jpg",
        categoria: {
            nombre: "Bonos y Acciones",
            id: "bonos-acciones"
        },
        precio: 174
    },
    {
        id: "bonar-2024",
        titulo: "BONAR 2024",
        imagen: "./img/bonos-acciones/bonar.jpg",
        categoria: {
            nombre: "Bonos y Acciones",
            id: "bonos-acciones"
        },
        precio: 8601
    },
    {
        id: "bocon-RA",
        titulo: "Bocon 2024 L. Arg.",
        imagen: "./img/bonos-acciones/bonos-argentina.jpg",
        categoria: {
            nombre: "Bonos y Acciones",
            id: "bonos-acciones"
        },
        precio: 814.9
    },
    {
        id: "bono-TN",
        titulo: "Bono del Tesoro Nacional",
        imagen: "./img/bonos-acciones/letes.jpg",
        categoria: {
            nombre: "Bonos y Acciones",
            id: "bonos-acciones"
        },
        precio: 248
    },
    // Fondos Comunes de Inversión
    {
        id: "renta-fija",
        titulo: "Renta Fija en Dólares",
        imagen: "./img/fondos-comunes-inversion/fci-renta-fija-en-dolares.jpg",
        categoria: {
            nombre: "Fondos Comunes de Inversión",
            id: "fci"
        },
        precio: 690
    },
    {
        id: "megainver",
        titulo: "MegaINVER Renta Fija",
        imagen: "./img/fondos-comunes-inversion/fci-megainver.jpg",
        categoria: {
            nombre: "Fondos Comunes de Inversión",
            id: "fci"
        },
        precio: 32.15
    },
    {
        id: "investec-global-franchise",
        titulo: "Investec Global Franchise",
        imagen: "./img/fondos-comunes-inversion/investec-global-franchise.jpg",
        categoria: {
            nombre: "Fondos Comunes de Inversión",
            id: "fci"
        },
        precio: 98.4
    }
];


/////////////////////////////////////////////////////

// let productosEnCarrito = localStorage.getItem("productos-en-carrito");
// productosEnCarrito = JSON.parse(productosEnCarrito);

// const contenedorCarritoVacio = document.querySelector("#carrito-vacio");
// const contenedorCarritoProductos = document.querySelector("#carrito-productos");
// const contenedorCarritoAcciones = document.querySelector("#carrito-acciones");
// const contenedorCarritoComprado = document.querySelector("#carrito-comprado");
// let botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
// const botonVaciar = document.querySelector("#carrito-acciones-vaciar");
// const contenedorTotal = document.querySelector("#total");
// const botonComprar = document.querySelector("#carrito-acciones-comprar");

/////////////////////////////////////////////////////


const contenedorProductos = document.querySelector('#contenedor-productos');
const botonesCategorias = document.querySelectorAll('.boton-categoria');
const tituloPrincipal = document.querySelector('#titulo-principal');
let botonesAgregar = document.querySelectorAll('.producto-agregar');
const numerito = document.querySelector('#numerito');
const aside = document.querySelector("aside");

// no estaba
botonesCategorias.forEach(boton => boton.addEventListener("click", () => {
    aside.classList.remove("aside-visible");
}))


function cargarProductos(productosElegidos) {

    contenedorProductos.innerHTML = '';

    productosElegidos.forEach(producto => {

        const div = document.createElement('div');
        div.classList.add('producto');
        div.innerHTML = `
            <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <p class="producto-precio">$ ${producto.precio}</p>
                <button class="producto-agregar" id="${producto.id}">Agregar</button>
            </div>
        `;

        contenedorProductos.append(div);
    })

    actualizarBotonesAgregar();
}

botonesCategorias.forEach(boton => {
    boton.addEventListener('click', (e) => {

        botonesCategorias.forEach(boton => boton.classList.remove('active'));
        e.currentTarget.classList.add('active');

        if (e.currentTarget.id != 'todos') {
            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
            tituloPrincipal.innerText = productoCategoria.categoria.nombre;

            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            cargarProductos(productosBoton);
        } else {
            tituloPrincipal.innerText = 'Todos los productos financieros';
            cargarProductos(productos);
        }
    })
});

function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll('.producto-agregar');

    botonesAgregar.forEach(boton => {
        boton.addEventListener('click', agregarAlCarrito);
    });
}

let productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem('productos-en-carrito');

if (productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumerito();
} else {
    productosEnCarrito = [];
}


function agregarAlCarrito(e) {

    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if (productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }

    actualizarNumerito();

    localStorage.setItem('productos-en-carrito', JSON.stringify(productosEnCarrito));
};

function actualizarNumerito() {
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}

