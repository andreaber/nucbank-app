'use strict';

///////////////////////////////////////////////////
// NUCBANK APP

// Datos

// Datos distintos, contiene fechas de movimiento, moneda y lugar

const cuenta1 = {
  titular: 'Javier Scheider',
  movimientos: [2000, 4550.23, -3060.5, 25000, -6420.21, -1330.9, 7900.97, 13000],
  tasaInteres: 1.2, // %
  pin: 1111,

  fechasMovimientos: [
    "2021-11-18T21:31:17.178Z",
    "2021-12-23T07:42:02.383Z",
    "2022-01-28T09:15:04.904Z",
    "2022-04-01T10:17:24.185Z",
    "2022-05-08T14:11:59.604Z",
    "2022-07-26T17:01:17.194Z",
    "2022-07-28T23:36:17.929Z",
    "2022-08-01T10:51:36.790Z",
  ],
  moneda: "ARS",
  lugar: "es_AR",
};

const cuenta2 = {
  titular: 'Camila Dávila',
  movimientos: [5000, 34000, -1500, -7900, -3210, -10000, 85000, -3000],
  tasaInteres: 1.5,
  pin: 2222,

  fechasMovimientos: [
    "2021-11-01T13:15:33.035Z",
    "2021-11-30T09:48:16.867Z",
    "2021-12-25T06:04:23.907Z",
    "2022-01-25T14:18:46.235Z",
    "2022-02-05T16:33:06.386Z",
    "2022-04-10T14:43:26.374Z",
    "2022-06-25T18:49:59.371Z",
    "2022-07-26T12:01:20.894Z",
  ],
  moneda: "USD",
  lugar: "en-US",
};

const cuenta3 = {
  titular: 'Sergio Marucci',
  movimientos: [20000, -2000, 3400, -3000, -2000, 5000, 4000, -4600],
  tasaInteres: 0.7,
  pin: 3333,
};

const cuenta4 = {
  titular: 'Valentina Lestarpe',
  movimientos: [43000, 10000, 7000, 500, 9000],
  tasaInteres: 1,
  pin: 4444,
};

const cuentas = [cuenta1, cuenta2, cuenta3, cuenta4];

///////////////////////////////////////////////////
// Elementos
const labelBienvenido = document.querySelector('.bienvenido');
const labelFecha = document.querySelector('.fecha');
const labelSaldo = document.querySelector('.saldo__value');
const labelResIngreso = document.querySelector('.resumen__value--in');
const labelResEgreso = document.querySelector('.resumen__value--out');
const labelResInteres = document.querySelector('.resumen__value--interes');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovimientos = document.querySelector('.movimientos');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnPrestamo = document.querySelector('.form__btn--prestamo');
const btnCerrar = document.querySelector('.form__btn--cerrar');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferA = document.querySelector('.form__input--a');
const inputTransferMonto = document.querySelector('.form__input--monto');
const inputPrestamoMonto = document.querySelector('.form__input--prestamo-monto');
const inputCerrarUsername = document.querySelector('.form__input--user');
const inputCerrarPin = document.querySelector('.form__input--pin');


///////////////////////////////////////////////////
// Funciones

const formatMovementDate = function (date, locale) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDaysPassed(new Date(), date);
  console.log(daysPassed);

  if (daysPassed === 0) return "Today";
  if (daysPassed === 1) return "Yesterday";
  if (daysPassed <= 7) return `${daysPassed} days ago`;

  // const day = `${date.getDate()}`.padStart(2, 0);
  // const month = `${date.getMonth() + 1}`.padStart(2, 0);
  // const year = date.getFullYear();
  // return `${day}/${month}/${year}`;
  return new Intl.DateTimeFormat(locale).format(date);
};

const formatCur = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(value);
};







const mostrarMovimientos = function (acc, sort = false) {
  containerMovimientos.innerHTML = '';

  const movs = sort ? acc.movimientos.slice().sort((a, b) => a - b) : acc.movimientos;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposito' : 'retiro';

    const fecha = new Date(acc.fechasMovimientos[i]);
    const dia = `${fecha.getDate()}`.padStart(2, 0);
    const mes = `${fecha.getMonth() + 1}`.padStart(2, 0);
    const anio = fecha.getFullYear();
    const mostrarFecha = `${dia}/${mes}/${anio}`;


    const html = `
      <div class="movimientos__row">
        <div class="movimientos__type movimientos__type--${type}">${i + 1} ${type}</div>
        <div class="movimientos__fecha">${mostrarFecha}</div>
        <div class="movimientos__value">${mov.toFixed(2)}$</div>
      </div>
    `;

    containerMovimientos.insertAdjacentHTML('afterbegin', html);
  });
};


// Reducir todos los elementos de una matriz a un solo valor
const calcMostrarSaldo = function (acc) {
  acc.saldo = acc.movimientos.reduce((acc, mov) => acc + mov, 0);
  labelSaldo.textContent = `${acc.saldo.toFixed(2)}$`;
};

// Calcular total ingresos, egresos, intereses
const calcMostrarResumen = function (acc) {
  const ingresos = acc.movimientos
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelResIngreso.textContent = `${ingresos.toFixed(2)}$`;

  const egresos = acc.movimientos
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelResEgreso.textContent = `${Math.abs(egresos).toFixed(2)}$`;

  const interes = acc.movimientos
    .filter(mov => mov > 0)
    .map(deposito => deposito * acc.tasaInteres / 100)
    .filter((int, i, arr) => {     // solo paga int si es > a 1$
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelResInteres.textContent = `${interes.toFixed(2)}$`;
};

// Crear usernames
const crearUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.titular
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  })
};
crearUsernames(cuentas);   // sm (iniciales del nombre en minúscula)

const actualizarUI = function (acc) {
  // Mostrar movimientos
  mostrarMovimientos(acc);

  // Mostrar saldo
  calcMostrarSaldo(acc);

  // Mostrar resumen
  calcMostrarResumen(acc);
};

///////////////////////////////////////////////////
// Controladores de eventos
let cuentaCorriente;

cuentaCorriente = cuenta1;
actualizarUI(cuentaCorriente);
containerApp.style.opacity = 100;

// día/mes/año

btnLogin.addEventListener('click', function (e) {
  // Evita que se envíe el formulario
  e.preventDefault();

  cuentaCorriente = cuentas.find(acc => acc.username === inputLoginUsername.value);
  console.log(cuentaCorriente);

  if (cuentaCorriente?.pin === +(inputLoginPin.value)) {

    // Mostrar la interfaz de usuario y un msj de bienvenida
    labelBienvenido.textContent = `${cuentaCorriente.titular.split(' ')[0]}, bienvenido de nuevo!`;
    containerApp.style.opacity = 100;

    // Crear fecha y hora actual
    const ahora = new Date();
    const dia = `${ahora.getDate()}`.padStart(2, 0);
    const mes = `${ahora.getMonth() + 1}`.padStart(2, 0);
    const anio = ahora.getFullYear();
    const hora = `${ahora.getHours()}`.padStart(2, 0);
    const min = `${ahora.getMinutes()}`.padStart(2, 0);
    labelFecha.textContent = `${dia}/${mes}/${anio}, ${hora}:${min}`;

    // Borrar campos de entrada
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Actualizar interfaz de usuario (UI)
    actualizarUI(cuentaCorriente);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const monto = +(inputTransferMonto.value);
  const cuentaReceptora = cuentas.find(acc => acc.username === inputTransferA.value);
  inputTransferMonto.value = inputTransferA.value = '';

  if (
    monto > 0 &&
    cuentaReceptora &&
    cuentaCorriente.saldo >= monto &&
    cuentaReceptora?.username !== cuentaCorriente.username) {
    // console.log('Transferencia válida');

    // Hacer la transferencia
    cuentaCorriente.movimientos.push(-monto);
    cuentaReceptora.movimientos.push(monto);

    // Agregar fecha de transferencia
    cuentaCorriente.fechasMovimientos.push(new Date().toISOString());
    cuentaReceptora.fechasMovimientos.push(new Date().toISOString());

    // Actualizar interfaz de usuario (UI)
    actualizarUI(cuentaCorriente);
  }
});

btnPrestamo.addEventListener('click', function (e) {
  e.preventDefault();

  const monto = Math.floor(inputPrestamoMonto.value);


  if (monto > 0 && cuentaCorriente.movimientos.some(mov => mov >= monto * 0.1)) {
    // Agregar movimiento
    cuentaCorriente.movimientos.push(monto);

    // Agregar fecha del préstamo
    cuentaCorriente.fechasMovimientos.push(new Date().toISOString());

    // Actualizar UI
    actualizarUI(cuentaCorriente);
  }
  inputPrestamoMonto.value = '';
});

btnCerrar.addEventListener('click', function (e) {
  e.preventDefault();

  if (inputCerrarUsername.value === cuentaCorriente.username && +(inputCerrarPin.value) === cuentaCorriente.pin) {
    const index = cuentas.findIndex(acc => acc.username === cuentaCorriente.username);
    console.log(index);
    // .indexOf(23);

    // Borrar cuenta
    cuentas.splice(index, 1);

    // Ocultar UI
    containerApp.style.opacity = 0;
  }

  inputCerrarUsername.value = inputCerrarPin.value = '';
});

let ordenado = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  mostrarMovimientos(cuentaCorriente.movimientos, !ordenado);
  ordenado = !ordenado;
});


///////////////////////////////////////////////////


// const divisas = new Map([
//   ['ARS', 'Peso Argentino'],
//   ['USD', 'Dólar Estadounidense'],
//   ['EUR', 'Euro'],
//   ['BRL', 'Real Brasileño'],
// ]);

// Map para movimientos
const movimientos = [200, 450, -400, 3000, -650, -130, 70, 1300];

const pesoADolar = 0.0055;
const movimientosUSD = movimientos.map(mov => mov * pesoADolar);
console.log(movimientos);
console.log(movimientosUSD);

const descripcionesMovimientos = movimientos.map((mov, i) =>
  `Movimiento ${i + 1}: Usted ${mov > 0 ? 'depositó' : 'retiró'} ${Math.abs(mov)}`
);
console.log(descripcionesMovimientos);


/*
const movimientos = [200, 450, -400, 3000, -650, -130, 70, 1300];

divisas.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});

// Tomo todos los depósitos de movimiento, luego los convierto de ARS a USD, y finalmente los sumo, para saber cuánto se depositó en la cuenta en USD.

const pesoADolar = 0.0055;
const totalDepositosUSD = movimientos
  .filter(mov => mov > 0)
  .map(mov => mov * pesoADolar)
  .reduce((acum, mov) => acum + mov, 0);
console.log(`Tu depósito es USD ${totalDepositosUSD}`);
*/



// Crear matriz de depósitos y retiros

const depositos = movimientos.filter(function (mov, i, arr) {
  return mov > 0;
});
console.log(depositos);

const retiros = movimientos.filter(mov => mov < 0);
console.log(retiros);


// Reducir todos los elementos de una matriz a un solo valor

// const saldo = movimientos.reduce(function (acc, dva, i, arr) {
//   console.log(`Iteración ${i}: ${acc}`);
//   return acc + dva;
// }, 0);

const saldo = movimientos.reduce((acc, dva) => acc + dva, 0);
console.log(saldo);


// Obtener el valor máximo de la matriz
const max = movimientos.reduce((acc, mov) => {
  if (acc > mov) return acc;
  else return mov;
}, movimientos[0]);
console.log(max);


// Tomar todos los depósitos y convertirlos de pesos a dólares
const totalDepositosUSD = movimientos
  .filter(mov => mov > 0)
  .map(mov => mov * pesoADolar)
  .reduce((acc, mov) => acc + mov, 0);
console.log(`Tu depósito es USD ${totalDepositosUSD}`);


// Recuperar un elemento de un array en función de una condición
const primerRetiro = movimientos.find(mov => mov < 0);
console.log(primerRetiro);

console.log(cuentas);

const cuenta = cuentas.find(acc => acc.titular === 'Camila Dávila');
console.log(cuenta);




console.log(movimientos);

// IGUALDAD
console.log(movimientos.includes(-130));

// SOME: CONDICIÓN
console.log(movimientos.some(mov => mov === -130));

const algunosDepositos = movimientos.some(mov => mov > 0);
console.log(algunosDepositos);

// EVERY
console.log(movimientos.every(mov => mov > 0));
console.log(cuenta4.movimientos.every(mov => mov > 0));

// Devolución de llamada
const deposito = mov => mov > 0;
console.log(movimientos.some(deposito));
console.log(movimientos.every(deposito));
console.log(movimientos.filter(deposito));


const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
console.log(arr.flat());

const arr2 = [[[1, 2], 3], [4, [5, 6]], 7, 8];
console.log(arr2.flat(1));

// flat
const saldoGeneral = cuentas
  .map(acc => acc.movimientos)
  .flat()
  .reduce((acc, mov) => acc + mov, 0);
console.log(saldoGeneral);

// flatMap
const saldoGeneral2 = cuentas
  .flatMap(acc => acc.movimientos)
  .reduce((acc, mov) => acc + mov, 0);
console.log(saldoGeneral2);

// Sort
// Strings
const titulares = ['Javier', 'Zulma', 'Andrés', 'Marta'];
console.log(titulares.sort());
console.log(titulares);

// Numbers
console.log(movimientos);

// return < 0, A, B  (mantiene el orden)
// return > 0, B, A  (cambia el orden)

// Orden ascendente
// movimientos.sort((a, b) => {
//   if (a > b) return 1;
//   if (a < b) return -1;
// });
movimientos.sort((a, b) => a - b);
console.log(movimientos);

// Orden descendente
// movimientos.sort((a, b) => {
//   if (a > b) return -1;
//   if (a < b) return 1;
// });
movimientos.sort((a, b) => b - a);
console.log(movimientos);



console.log([1, 2, 3, 4, 5, 6, 7]);
console.log(new Array(1, 2, 3, 4, 5, 6, 7));

// Matrices vacías + método fill
const x = new Array(7);
console.log(x);
// console.log(x.map(() => 5));
x.fill(1, 3, 5);
x.fill(1);
console.log(x);

arr.fill(23, 2, 6);
console.log(arr);

// Array.from
const y = Array.from({ length: 7 }, () => 1);
console.log(y);

const z = Array.from({ length: 7 }, (_, i) => i + 1);
console.log(z);

labelSaldo.addEventListener('click', function () {
  const movimientosUI = Array.from(document.querySelectorAll('.movimientos__ value'), elem => Number(elem.textContent.replace('$', '')));

  console.log(movimientosUI);
});



///////////////////////////////////////////
// Arrays Métodos

// Calcular cuánto se ha depositado en total en el banco
const resumenDepositoBanco = cuentas
  .flatMap(acc => acc.movimientos)
  .filter(mov => mov > 0)
  .reduce((sum, cur) => sum + cur, 0);

console.log(resumenDepositoBanco);

// Calcular cuántos depósitos ha habido en el banco con al menos $1000
// const numDepositos1000 = cuentas
//   .flatMap(acc => acc.movimientos)
//   .filter(mov => mov >= 1000).length;

const numDepositos1000 = cuentas
  .flatMap(acc => acc.movimientos)
  .reduce((recuento, cur) => (cur >= 1000 ? ++recuento : recuento), 0);

console.log(numDepositos1000);

// Crear un objeto que contenga la suma de los depósitos y de los retiros
const { deposits, retirs } = cuentas
  .flatMap(acc => acc.movimientos)
  .reduce(
    (sumas, cur) => {
      // cur > 0 ? sumas.deposits += cur : sumas.retirs += cur;
      sumas[cur > 0 ? 'deposits' : 'retirs'] += cur;
      return sumas;
    },
    { deposits: 0, retirs: 0 }
  );

console.log(deposits, retirs);

// este es un bonito título -> Este Es un Bonito Título
const convertirTituloCase = function (title) {
  const capitalize = str => str[0].toUpperCase() + str.slice(1);

  const excepciones = ['un', 'una', 'unos', 'unas', 'el', 'la', 'los', 'las', 'y', 'o', 'pero', 'sobre', 'en', 'con', 'a', 'de', 'en', 'por'];

  const tituloCase = title
    .toLowerCase()
    .split(' ')
    .map(palabra => (excepciones.includes(palabra) ? palabra : capitalize(palabra)))
    .join(' ');

  return capitalize(tituloCase);
};

console.log(convertirTituloCase('este es un buen título'));
console.log(convertirTituloCase('este es un título LARGO pero no demasiado largo'));
console.log(convertirTituloCase('y aquí hay otro título con un EJEMPLO'));





