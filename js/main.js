'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCerrarModal = document.querySelector('.btn--cerrar-modal');
const btnsAbrirModal = document.querySelectorAll('.btn--abrir-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const nav = document.querySelector('.nav');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');


///////////////////////////////////////
// Ventana Modal
const abrirModal = function (e) {
    e.preventDefault();
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
};

const cerrarModal = function () {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
};

btnsAbrirModal.forEach(btn => btn.addEventListener('click', abrirModal));

btnCerrarModal.addEventListener('click', cerrarModal);
overlay.addEventListener('click', cerrarModal);

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        cerrarModal();
    }
});

///////////////////////////////////////
// Componente con pestañas
tabsContainer.addEventListener('click', function (e) {
    const clicked = e.target.closest('.operations__tab');

    if (!clicked) return;

    // Eliminar clases activas
    tabs.forEach(t => t.classList.remove('operations__tab--active'));
    tabsContent.forEach(c => c.classList.remove('operations__content--active'));

    // Activar pestaña
    clicked.classList.add('operations__tab--active');

    // Activar contenido
    document
        .querySelector(`.operations__content--${clicked.dataset.tab}`)
        .classList.add('operations__content--active');
});

///////////////////////////////////////
// Slider
const slider = function () {
    const slides = document.querySelectorAll('.slide');
    const btnLeft = document.querySelector('.slider__btn--left');
    const btnRight = document.querySelector('.slider__btn--right');
    const dotContainer = document.querySelector('.dots');

    let curSlide = 0;
    const maxSlide = slides.length;

    // Funciones
    const createDots = function () {
        slides.forEach(function (_, i) {
            dotContainer.insertAdjacentHTML(
                'beforeend',
                `<button class="dots__dot" data-slide="${i}"></button>`
            );
        });
    };

    const activateDot = function (slide) {
        document.querySelectorAll('.dots__dot').forEach(dot => dot.classList.remove('dots__dot--active'));

        document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active');
    };

    const goToSlide = function (slide) {
        slides.forEach(
            (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
        );
    };

    // Siguiente slide
    const nextSlide = function () {
        if (curSlide === maxSlide - 1) {
            curSlide = 0;
        } else {
            curSlide++;
        }

        goToSlide(curSlide);
        activateDot(curSlide);
    };

    const prevSlide = function () {
        if (curSlide === 0) {
            curSlide = maxSlide - 1;
        } else {
            curSlide--;
        }
        goToSlide(curSlide);
        activateDot(curSlide);
    };

    const init = function () {
        goToSlide(0);
        createDots();

        activateDot(0);
    };
    init();

    // Eventos
    btnRight.addEventListener('click', nextSlide);
    btnLeft.addEventListener('click', prevSlide);

    document.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowLeft') prevSlide();
        e.key === 'ArrowRight' && nextSlide();
    });

    dotContainer.addEventListener('click', function (e) {
        if (e.target.classList.contains('dots__dot')) {
            const { slide } = e.target.dataset;
            goToSlide(slide);
            activateDot(slide);
        }
    });
};
slider();



































// // Datos

// const cuenta1 = {
//     titular: 'Pablo Sánchez',
//     movimientos: [2000, 4500, -4000, 30000, -6500, -1300, 700, 13000],
//     tasaInteres: 1.2, // % tasa que se paga por cada depósito
//     pass: 1111,
// };

// const cuenta2 = {
//     titular: 'Jésica López',
//     movimientos: [5000, 6400, -1500, -790, -3210, -1000, 8500, -300],
//     tasaInteres: 1.5,
//     pass: 2222,
// };

// const cuenta3 = {
//     titular: 'Lautaro García',
//     movimientos: [2000, -2000, 3400, -3000, -200, 700, 4200, -4600],
//     tasaInteres: 0.7,
//     pass: 3333,
// };

// const cuenta4 = {
//     titular: 'Sara Martínez',
//     movimientos: [4300, 10000, 7000, 500, 900],
//     tasaInteres: 1,
//     pass: 4444,
// };

// const cuentas = [cuenta1, cuenta2, cuenta3, cuenta4];

// // Declaración de variables
// // let nombreUsuario, passwordUsuario, saldoUsuario;


// let usuarios = [
//     { nombreUsuario: "Pablo", passwordUsuario: "1111" },
//     { nombreUsuario: "Sara", passwordUsuario: "2222" },
//     { nombreUsuario: "Lautaro", passwordUsuario: "3333" },
//     { nombreUsuario: "Jésica", passwordUsuario: "4444" }
// ];

// function verificarUsuario(nombreUsuario, passwordUsuario) {
//     for (let i = 0; i < usuarios.length; i++) {
//         if (nombreUsuario === usuarios[i].nombreUsuario && passwordUsuario === usuarios[i].passwordUsuario) {
//             return true;
//         }
//     }
//     return false;
// };

// let nombreUsuario = prompt("Ingresa tu nombre de usuario:");
// let passwordUsuario = prompt("Ingresa tu contraseña:");

// if (verificarUsuario(nombreUsuario, passwordUsuario)) {
//     let saldoUsuario = 1500;
//     alert(`¡Bienvenido ${nombreUsuario}!`);
// } else {
//     alert(`Usuario o contraseña inválidos.`);
// }

// ////////////////////////////////////////////////


// // Simular dejar en plazo fijo un capital (algoritmo para calcular el interés compuesto)

// // Obtener la entrada del usuario para el monto principal
// let capitalInicial = parseFloat(prompt("Si deseas depositar dinero en plazo fijo, ingresa el capital inicial:"));

// // // Obtener la entrada del usuario para la tasa de interés
// let tasaInteres = parseFloat(prompt("Ingresa la tasa de interés mensual (en formato decimal):"));

// // Obtener la entrada del usuario para el número de períodos de capitalización
// let tiempo = parseFloat(prompt("Ingresa el número de períodos de capitalización (en meses):"));

// // Calcular interés compuesto
// let interesCompuesto = capitalInicial * Math.pow(1 + tasaInteres, tiempo);

// // Mostrar resultado al usuario
// alert(`El monto final a interés compuesto es: $ ${interesCompuesto}. Los intereses ganados en esta operación son: $ ${interesCompuesto - capitalInicial}`);


// // Simular un sistema de reembolso de préstamos (usando algoritmo del sistema de amortización francés)

// capitalInicial = parseFloat(prompt("Si deseas pedir un préstamo personal, ingresa el monto a solicitar:"));
// tasaInteres = parseFloat(prompt("Ingresa la tasa de interés mensual (en formato decimal):"));
// tiempo = parseFloat(prompt("Ingresa el plazo de devolución (en meses):"));
// let cuota = capitalInicial * ((tasaInteres * Math.pow(1 + tasaInteres, tiempo)) / (Math.pow(1 + tasaInteres, tiempo) - 1));

// alert(`La cuota de tu préstamos es: $ ${cuota}`);



// ///////////////////////////////////////////////


// // Lógica para realizar transacciones

// let saldo = 0;

// while (true) {
//     let accion = prompt("¿Qué deseas hacer: depositar, retirar, consultar saldo o salir?)");
//     if (accion == "depositar") {
//         let deposito = prompt("Ingresa la cantidad a depositar:");
//         saldo += parseFloat(deposito);
//         alert(`Has depositado $ ${deposito}. Tu saldo actual es de $ ${saldo}.`);
//     } else if (accion == "retirar") {
//         let retiro = prompt("Ingresa la cantidad a retirar:");
//         saldo -= parseFloat(retiro);
//         alert(`Has retirado $ ${retiro}. Tu saldo actual es de $ ${saldo}`);
//     } else if (accion == "consultar saldo") {
//         let consultar = prompt(`Tu saldo actual es $ ${saldo}`);
//     } else if (accion == 'salir') {
//         let salir;
//         alert('Gracias por utilizar nuestros servicios. ¡Vuelve pronto!');
//         break;
//     } else {
//         alert("Acción no válida. Por favor ingresa 'depositar', 'retirar', 'consultar saldo' o 'salir'.");
//     }
// };


// //////////////////////////////////////////////////

// const movimientos = [3000, 4500, -4000, 30000, -6500, -1300, 700, 13000];
// console.log(movimientos);

// movimientos.forEach(function (movimiento, i) {
//     if (movimiento > 0) {
//         console.log(`Movimiento ${i + 1}: Has depositado ${Math.abs(movimiento)}`);
//     } else {
//         console.log(`Movimiento ${i + 1}: Has retirado ${Math.abs(movimiento)}`);
//     }
// });


// ///////////////////////////////////////////////////////


// // calcular mostrar saldo
// const calcMostrarSaldo = function (movimientos) {
//     const saldo = movimientos.reduce((acum, mov) => acum + mov, 0);
//     return `Saldo: $ ${saldo}`;
// };
// console.log(calcMostrarSaldo(cuenta1.movimientos));

// // Mostrar resumen ingresos
// const calcMostrarResumenIn = function (movimientos) {

//     const ingresos = movimientos
//         .filter(mov => mov > 0)
//         .reduce((acum, mov) => acum + mov, 0);
//     return `Ingresos: $ ${ingresos}`;
// };
// console.log(calcMostrarResumenIn(cuenta1.movimientos));


// // Mostrar resumen egresos
// const calcMostrarResumenOut = function (movimientos) {
//     const egresos = movimientos
//         .filter(mov => mov < 0)
//         .reduce((acum, mov) => acum + mov, 0);
//     return `Egresos: $ ${Math.abs(egresos)}`;
// };
// console.log(calcMostrarResumenOut(cuenta1.movimientos));


// // Mostrar resumen intereses, este banco pagará un interés cada vez que haya un depósito en la cuenta bancaria, y ese interés es del 1.2% del monto depositado
// const calcMostrarIntereses = function (movimientos) {
//     const interes = movimientos
//         .filter(mov => mov > 0)
//         .map(deposito => (deposito * 1.2) / 100)
//         .filter((int, i, arr) => {
//             console.log(arr);
//             return int >= 10;
//         })
//         .reduce((acum, int) => acum + int, 0);
//     return `Intereses ganados: $ ${interes}`;
// };
// console.log(calcMostrarIntereses(cuenta1.movimientos));
// // Aquí puse una condición que cuando el valor de los intereses es mmenor a 10, no se suman al total de intereses y se filtrará.


// /////////////////////////////////////////////////////


// // MAP, FILTER, REDUCE
// const divisas = new Map([
//     ['ARS', 'Peso Argentino'],
//     ['USD', 'Dólar Estadounidense'],
//     ['EUR', 'Euro'],
//     ['BRL', 'Real Brasileño'],
// ]);

// divisas.forEach(function (value, key, map) {
//     console.log(`${key}: ${value}`);
// });

// // Tomo todos los depósitos de movimiento, luego los convierto de ARS a USD, y finalmente los sumo, para saber cuánto se depositó en la cuenta en USD.

// const pesoADolar = 0.0055;
// const totalDepositosUSD = movimientos
//     .filter(mov => mov > 0)
//     .map(mov => mov * pesoADolar)
//     .reduce((acum, mov) => acum + mov, 0);
// console.log(`Tu depósito es USD ${totalDepositosUSD}`);


// // Método Map: Convertir divisas con Map
// const movimientosUSD = movimientos.map(mov => mov * pesoADolar);
// console.log(movimientos);
// console.log(movimientosUSD);

// // Convierte divisas con 'for of'
// const pesoAReal = 0.028;
// const movimientosBRLfor = [];
// for (const mov of movimientos) movimientosBRLfor.push(mov * pesoAReal);
// console.log(movimientosBRLfor);


// ///////////////////////////////////////////////////////

// // Método Find
// const primerRetiro = movimientos.find(mov => mov < 0)
// console.log(movimientos);
// console.log(primerRetiro);

// console.log(cuentas);
// const cta = cuentas.find(cta => cta.titular === 'Jésica López');
// console.log(cuentas);


// // Sort
// // Cadenas (orden alfabético de las las cadenas)
// const titulares = ['Pablo', 'Jésica', 'Lautaro', 'Sara'];
// console.log(titulares);
// console.log(titulares.sort());     // cambia el array original
// console.log(titulares);

// // Números (orden de las los números)
// console.log(movimientos);

// // return < 0, A, B (mantiene el orden)
// // return > 0, B, A (cambia el orden)

// // Orden ascendente
// movimientos.sort((a, b) => {
//     if (a > b) return 1;
//     if (a < b) return -1;
// });
// console.log(movimientos);

// // Orden descendente
// movimientos.sort((a, b) => {
//     if (a > b) return -1;
//     if (a < b) return 1;
// });
// console.log(movimientos);












