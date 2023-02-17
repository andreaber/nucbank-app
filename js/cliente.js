// Datos que contienen: titular, pin, movimientos, fechas de movimiento, tasa de interés, moneda y lugar

class Cliente {
  constructor(titular, pin, movimientos, fechasMovimientos, tasaInteres, moneda, lugar) {

    this.titular = titular;
    this.pin = pin;
    this.movimientos = movimientos;
    this.fechasMovimientos = fechasMovimientos;
    this.tasaInteres = tasaInteres;
    this.moneda = moneda;
    this.lugar = lugar;

  }
}

const cuenta1 = new Cliente(
  'Javier Scheider',
  1111,
  [2000, 4550.23, -3060.50, 25000, -6420.21, -1330.90, 7900.97, 13000],
  [
    "2021-11-18T21:31:17.178Z",
    "2021-12-23T07:42:02.383Z",
    "2022-01-28T09:15:04.904Z",
    "2022-04-01T10:17:24.185Z",
    "2022-05-08T14:11:59.604Z",
    "2022-07-26T17:01:17.194Z",
    "2022-08-28T23:36:17.929Z",
    "2022-10-01T10:51:36.790Z",
  ],
  5.2,
  'ARS',
  'es_AR',
);

const cuenta2 = new Cliente(
  'Camila Dávila',
  2222,
  [5000.56, 34000, -1512.35, -7900, -3210.15, -10000, 85320.60, -3080.90],
  [
    "2021-04-01T13:15:33.035Z",
    "2021-05-30T09:48:16.867Z",
    "2021-06-25T06:04:23.907Z",
    "2022-08-25T14:18:46.235Z",
    "2022-09-05T16:33:06.386Z",
    "2022-11-10T14:43:26.374Z",
    "2022-12-25T18:49:59.371Z",
    "2023-01-26T12:01:20.894Z",
  ],
  7.5,
  'ARS',
  'es_AR',
);


const cuenta3 = new Cliente(
  'Sergio Marucci',
  3333,
  [21390.90, -2000, 3400, -3220.50, -2000, 5490.25, 4000.36, -4600.50],
  [
    "2021-11-18T21:31:17.178Z",
    "2021-12-23T07:42:02.383Z",
    "2022-01-28T09:15:04.904Z",
    "2022-04-01T10:17:24.185Z",
    "2022-05-08T14:11:59.604Z",
    "2022-07-26T17:01:17.194Z",
    "2022-08-28T23:36:17.929Z",
    "2022-10-01T10:51:36.790Z",
  ],
  6.7,
  'ARS',
  'es_AR',
);


const cuenta4 = new Cliente(
  'Valentina Lestarpe',
  4444,
  [43550, 10780.60, -7523.12, 5009.10, 9000, -2450.60],
  [
    "2021-05-18T21:31:17.178Z",
    "2021-06-23T07:42:02.383Z",
    "2022-08-25T09:15:04.904Z",
    "2022-10-24T10:17:24.185Z",
    "2022-12-08T14:11:59.604Z",
    "2023-01-16T17:01:17.194Z",
  ],
  6.7,
  'ARS',
  'es_AR',
);

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
const btnOrdenar = document.querySelector('.btn--ordenar');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferA = document.querySelector('.form__input--a');
const inputTransferMonto = document.querySelector('.form__input--monto');
const inputPrestamoMonto = document.querySelector('.form__input--prestamo-monto');
const inputCerrarUsername = document.querySelector('.form__input--user');
const inputCerrarPin = document.querySelector('.form__input--pin');


///////////////////////////////////////////////////
// Funciones

const mostrarMovimientos = function (acc, ordenar = false) {
  containerMovimientos.innerHTML = '';

  const movs = ordenar ? acc.movimientos.slice().ordenar((a, b) => a - b) : acc.movimientos;

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

// Calcular mostrar saldo
const calcMostrarSaldo = function (acc) {
  acc.saldo = acc.movimientos.reduce((acc, mov) => acc + mov, 0);
  labelSaldo.textContent = `${acc.saldo.toFixed(2)}$`;
};

// Calcular mostrar resumen
const calcMostrarResumen = function (acc) {

  // Calcular total ingresos
  const ingresos = acc.movimientos
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelResIngreso.textContent = `${ingresos.toFixed(2)}$`;

  // Calcular total egresos
  const egresos = acc.movimientos
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelResEgreso.textContent = `${Math.abs(egresos).toFixed(2)}$`;

  // Calcular total intereses
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
crearUsernames(cuentas);   // iniciales del nombre en minúscula: js - cd - sm - vl

const actualizarUI = function (acc) {
  // Mostrar movimientos
  mostrarMovimientos(acc);

  // Mostrar saldo
  calcMostrarSaldo(acc);

  // Mostrar resumen
  calcMostrarResumen(acc);
};

///////////////////////////////////////////////////
// Eventos
let cuentaCorriente;

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

    // Borrar cuenta
    cuentas.splice(index, 1);

    // Ocultar UI
    containerApp.style.opacity = 0;
  }

  inputCerrarUsername.value = inputCerrarPin.value = '';
});

let ordenado = false;
btnOrdenar.addEventListener('click', function (e) {
  e.preventDefault();
  mostrarMovimientos(cuentaCorriente.movimientos, !ordenado);
  ordenado = !ordenado;
});





