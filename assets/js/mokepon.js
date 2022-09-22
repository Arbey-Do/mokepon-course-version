// Sections
const sectionSeleccionarMascota = document.getElementById(
  "seleccionar-mascota"
);
const tarjetasMokepon = document.getElementById("mokepones");
const sectionSeleccionarAtaque = document.getElementById("seleccionar-ataque");
const sectionReiniciar = document.getElementById("reiniciar");
const mensajeTurno = document.getElementById("resultado-turno");
const ataqueJugador = document.getElementById("ataque-jugador");
const ataqueEnemigo = document.getElementById("ataque-enemigo");
const botonesAtaqueJugador = document.getElementById("botones-ataque-jugador");
const seccionMensajes = document.getElementById("mensajes");
// Seccion mapa
const seccionMapa = document.getElementById("ver-mapa");
const canvas = document.getElementById("mapa");

// Buttons
const botonMascotaJugador = document.getElementById("boton-mascota-jugador");
const botonReiniciar = document.getElementById("boton-reiniciar");

// Text
const spanMascotaJugador = document.getElementById("mascota-jugador");
const spanMascotaEnemigo = document.getElementById("mascota-enemigo");
const spanVidasJugador = document.getElementById("vidas-jugador");
const spanVidasEnemigo = document.getElementById("vidas-enemigo");

let mokepones = [];

let jugadorId = null;
let mascotaJugador = null;
let mascotaEnemigo = null;
let ataqueSelecJugador = "";
let ataqueSelecEnemigo = "";
let numeroAtaques = 0;
let victoriasJugador = 0;
let victoriasEnemigo = 0;
let imagenJugador = null;
let imagenEnemigo = "";
let lienzo = null;
let nIntervId = null;

let alturaMapa;
let anchoMapa = window.innerWidth - 20;

alturaMapa = (anchoMapa * 600) / 800;

canvas.width = anchoMapa;
canvas.height = alturaMapa;

const anchoMaximoMapa = 350;

if (anchoMapa > anchoMaximoMapa) {
  anchoMapa = anchoMaximoMapa - 20;
}

if (canvas.getContext) {
  lienzo = canvas.getContext("2d");
}

class Mokepon {
  constructor(id, nombre, foto, fotoAvatar, xi = 20, yi = 30) {
    this.id = id;
    this.nombre = nombre;
    this.foto = foto;
    this.ataques = [];
    this.victorias = 0;
    this.fotoPersonaje = new Image();
    this.fotoPersonaje.src = foto;
    this.anchoImg = 40;
    this.altoImg = 40;
    this.xi = aleatorio(0, mapa.width - this.anchoImg);
    this.yi = aleatorio(0, mapa.height - this.altoImg);
    this.avatarPersonaje = new Image();
    this.avatarPersonaje.src = fotoAvatar;
    this.velocidadX = 0;
    this.velocidadY = 0;
  }

  pintarMokepon() {
    lienzo.drawImage(
      this.avatarPersonaje,
      this.xi,
      this.yi,
      this.anchoImg,
      this.altoImg
    );
  }
}

class Ataque {
  constructor(id, nombre) {
    this.id = id;
    this.nombre = nombre;
  }
}

const hipodoge = new Mokepon(
  "hipodoge",
  "Hipodoge",
  "./assets/img/hipodoge.png",
  "./assets/img/hipodoge_head.png"
);

const capipepo = new Mokepon(
  "capipepo",
  "Capipepo",
  "./assets/img/capipepo.png",
  "./assets/img/capipepo_head.png"
);

const ratigueya = new Mokepon(
  "ratigueya",
  "Ratigueya",
  "./assets/img/ratigueya.png",
  "./assets/img/ratigueya_head.png"
);

const ataqueFuego = new Ataque("boton-fuego", "🔥 Fuego");
const ataqueAgua = new Ataque("boton-agua", "💧 Agua");
const ataqueTierra = new Ataque("boton-tierra", "🌱 Tierra");

hipodoge.ataques = [
  ataqueAgua,
  ataqueAgua,
  ataqueAgua,
  ataqueFuego,
  ataqueTierra,
];
capipepo.ataques = [
  ataqueTierra,
  ataqueTierra,
  ataqueTierra,
  ataqueAgua,
  ataqueFuego,
];
ratigueya.ataques = [
  ataqueFuego,
  ataqueFuego,
  ataqueFuego,
  ataqueAgua,
  ataqueTierra,
];

mokepones.push(hipodoge, capipepo, ratigueya);

const capipepoEnemigo = new Mokepon(
  "capipepo",
  "Capipepo",
  "./assets/img/capipepo.png",
  "./assets/img/capipepo_head.png"
);

const ratigueyaEnemigo = new Mokepon(
  "ratigueya",
  "Ratigueya",
  "./assets/img/ratigueya.png",
  "./assets/img/ratigueya_head.png"
);

const hipodogeEnemigo = new Mokepon(
  "hipodoge",
  "Hipodoge",
  "./assets/img/hipodoge.png",
  "./assets/img/hipodoge_head.png"
);

hipodogeEnemigo.ataques = [
  ataqueAgua,
  ataqueAgua,
  ataqueAgua,
  ataqueFuego,
  ataqueTierra,
];
capipepoEnemigo.ataques = [
  ataqueTierra,
  ataqueTierra,
  ataqueTierra,
  ataqueAgua,
  ataqueFuego,
];
ratigueyaEnemigo.ataques = [
  ataqueFuego,
  ataqueFuego,
  ataqueFuego,
  ataqueAgua,
  ataqueTierra,
];

/*Crea las tarjetas de los mokepones dinamicamente en el DOM*/
function iniciarJuego() {
  mokepones.forEach((mokepon) => {
    const pMokepon = document.createElement("p");
    const imgMokepon = document.createElement("img");
    const inputMokepon = document.createElement("input");
    const labelMokepon = document.createElement("label");
    const divMokepon = document.createElement("div");
    const mokeponName = document.createTextNode(mokepon.nombre);
    pMokepon.appendChild(mokeponName);
    imgMokepon.src = mokepon.foto;
    imgMokepon.alt = mokepon.nombre;
    labelMokepon.htmlFor = mokepon.id;
    labelMokepon.classList.add("tarjeta-de-mokepon");
    inputMokepon.type = "radio";
    inputMokepon.id = mokepon.id;
    inputMokepon.value = mokepon.nombre;
    inputMokepon.name = "mascota";
    inputMokepon.classList.add("input-mokepon");
    labelMokepon.appendChild(pMokepon);
    labelMokepon.appendChild(imgMokepon);
    divMokepon.appendChild(inputMokepon);
    divMokepon.appendChild(labelMokepon);
    tarjetasMokepon.appendChild(divMokepon);
  });

  botonMascotaJugador.addEventListener("click", seleccionarMascotaJugador);

  // Aparece en el juego después de terminar una batalla.
  botonReiniciar.addEventListener("click", reiniciarJuego);

  unirseAlJuego();
}

function unirseAlJuego() {
  fetch("http://localhost:8080/unirse").then(function (res) {
    if (res.ok) {
      res.text().then(function (respuesta) {
        console.log(respuesta);
        jugadorId = respuesta;
      });
    }
  });
}

function seleccionarMascotaJugador() {
  let mokeponId = null;
  const inputsMokepon = document.querySelectorAll('input[name="mascota"]');
  inputsMokepon.forEach((input) => {
    if (input.checked) {
      mokeponId = input.id;
      return;
    }
  });
  if (!mokeponId) {
    alert("No seleccionaste ningun mokepon");
    return;
  }
  mokepones.forEach((mokepon) => {
    if (mokepon.id == mokeponId) {
      mascotaJugador = mokepon;
      return;
    }
  });

  console.log(mascotaJugador);

  seleccionarMokepon(mascotaJugador.nombre);

  cargarMovimientosTeclado();
  cargarMovimientosBotones();

  // Oculta la sección de seleccionar personaje.
  sectionSeleccionarMascota.classList.add("hidden");

  // Mostramos la sección del mapa.
  seccionMapa.classList.remove("hidden");

  // Setea un intervalo cada 50 milisegundos que dibuja el mapa y a los personajes
  nIntervId = setInterval(pintarCanvas, 50);
}

function seleccionarMokepon(nombreMascotaJugador) {
  fetch(`http://localhost:8080/mokepon/${jugadorId}`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      mokepon: nombreMascotaJugador,
    }),
  });
}

/* Carga dinamicamente los movimientos que se pueden realizar con los personajes
a traves de las teclas de dirección y letras específicas. */
function cargarMovimientosTeclado() {
  window.addEventListener("keydown", (e) => {
    if (e.key == "w" || e.key == "ArrowUp") {
      moverArriba();
    } else if (e.key == "s" || e.key == "ArrowDown") {
      moverAbajo();
    } else if (e.key == "d" || e.key == "ArrowRight") {
      moverDerecha();
    } else if (e.key == "a" || e.key == "ArrowLeft") {
      moverIzquierda();
    }
  });

  /* Agrega la función de detener el movimiento de los personajes al levantar las teclas
  específicas */
  window.addEventListener("keyup", (e) => {
    switch (e.key) {
      case "ArrowUp":
      case "ArrowDown":
      case "ArrowLeft":
      case "ArrowRight":
      case "w":
      case "s":
      case "a":
      case "d":
        mascotaJugador.velocidadX = 0;
        mascotaJugador.velocidadY = 0;
        break;
    }
  });
}

/* Dispara la sección de pelea entre mokepones */
function iniciarCombate() {
  seccionMapa.classList.add("hidden");
  sectionSeleccionarAtaque.classList.remove("hidden");
  numeroAtaques = mascotaJugador.ataques.length - 1;
  imagenJugador = mascotaJugador.foto;
  document.getElementById("imagen-jugador").src = imagenJugador;
  spanMascotaJugador.innerHTML = mascotaJugador.nombre;
  imagenEnemigo = mascotaEnemigo.foto;
  document.getElementById("imagen-enemigo").src = imagenEnemigo;
  spanMascotaEnemigo.innerHTML = mascotaEnemigo.nombre;
  limpiarBotonesJugador();
  cargarAtaquesJugador();
}

/* Carga los botones de movimiento del jugador. */
function cargarMovimientosBotones() {
  const botonesMovimiento = document.createElement("div");
  botonesMovimiento.classList.add("botones-movimiento");
  const movimientos = ["Up", "Left", "Down", "Right"];
  movimientos.forEach((movimiento) => {
    const boton = document.createElement("button");
    boton.id = movimiento.toLowerCase();
    boton.textContent = movimiento;
    boton.classList.add("boton-mascota-jugador");
    switch (movimiento) {
      case "Up":
        boton.classList.add("block-auto-margin");
        cargarMovimiento(boton, moverArriba);
        break;
      case "Right":
        cargarMovimiento(boton, moverDerecha);
        break;
      case "Left":
        cargarMovimiento(boton, moverIzquierda);
        break;
      case "Down":
        cargarMovimiento(boton, moverAbajo);
        break;
    }
    botonesMovimiento.appendChild(boton);
  });
  seccionMapa.appendChild(botonesMovimiento);
}

// Carga en cada boton el listener respectivo a la acción del mouse
function cargarMovimiento(btn, accion) {
  const eventos = ["mousedown", "mouseleave", "mouseup"];
  eventos.forEach((evento) => {
    switch (evento) {
      case "mousedown":
        btn.addEventListener(evento, accion);
        break;
      case "mouseleave":
      case "mouseup":
        btn.addEventListener(evento, () => {
          mascotaJugador.velocidadX = 0;
          mascotaJugador.velocidadY = 0;
        });
        break;
    }
  });
}

// Mueve al jugador hacia arriba.
function moverArriba() {
  mascotaJugador.velocidadY = -10;
}

// Mueve al jugador a la derecha.
function moverDerecha() {
  mascotaJugador.velocidadX = 10;
}

// Mueve al jugador a la izquierda.
function moverIzquierda() {
  mascotaJugador.velocidadX = -10;
}

// Mueve al jugador hacia abajo.
function moverAbajo() {
  mascotaJugador.velocidadY = 10;
}

// Carga los botones de ataque del jugador en la seccion de botones-ataque-jugador
function cargarAtaquesJugador() {
  mascotaJugador.ataques.forEach((ataque) => {
    const text = document.createTextNode(ataque.nombre);
    const botonAtaque = document.createElement("button");
    botonAtaque.appendChild(text);
    botonAtaque.id = ataque.id;
    botonAtaque.value = ataque.nombre;
    botonAtaque.classList.add("boton-de-ataque");
    botonesAtaqueJugador.appendChild(botonAtaque);
    botonAtaque.addEventListener("click", () => {
      ataqueSelecJugador = ataque.nombre;
      botonAtaque.classList.add("hidden");
      console.log("Ataque jugador", ataqueSelecJugador);
      const textAtaqueJugador = document.createTextNode(ataqueSelecJugador);
      const pAtaqueJugador = document.createElement("p");
      pAtaqueJugador.appendChild(textAtaqueJugador);
      ataqueJugador.appendChild(pAtaqueJugador);
      ataqueAleatorioEnemigo();
      numeroAtaques -= 1;
    });
  });
}

/* Limpia la sección de botones-ataque-jugador
para quitar los botones utilizados previamnete */
function limpiarBotonesJugador() {
  botonesAtaqueJugador.innerHTML = "";
}

function ataqueAleatorioEnemigo() {
  const numeroAletorio = aleatorio(0, mascotaEnemigo.ataques.length - 1);
  ataqueSelecEnemigo = mascotaEnemigo.ataques.splice(numeroAletorio, 1)[0]
    .nombre;
  console.log("Ataque enemigo", ataqueSelecEnemigo);

  const textAtaqueEnemigo = document.createTextNode(ataqueSelecEnemigo);
  const pAtaqueEnemigo = document.createElement("p");
  pAtaqueEnemigo.appendChild(textAtaqueEnemigo);
  ataqueEnemigo.appendChild(pAtaqueEnemigo);

  combate(ataqueSelecJugador, ataqueSelecEnemigo);
}

// Determina el ganador de la ronda actual
function combate(ataqueJugador, ataqueEnemigo) {
  if (ataqueJugador == ataqueEnemigo) {
    crearMensajeTurno("EMPATE");
  } else if (ataqueJugador == "🔥 Fuego" && ataqueEnemigo == "🌱 Tierra") {
    crearMensajeTurno("GANASTE");
    victoriasJugador += 1;
    spanVidasJugador.innerHTML = victoriasJugador;
  } else if (ataqueJugador == "💧 Agua" && ataqueEnemigo == "🔥 Fuego") {
    crearMensajeTurno("GANASTE");
    victoriasJugador += 1;
    spanVidasJugador.innerHTML = victoriasJugador;
  } else if (ataqueJugador == "🌱 Tierra" && ataqueEnemigo == "💧 Agua") {
    crearMensajeTurno("GANASTE");
    victoriasJugador += 1;
    spanVidasJugador.innerHTML = victoriasJugador;
  } else {
    crearMensajeTurno("PERDISTE");
    victoriasEnemigo += 1;
    spanVidasEnemigo.innerHTML = victoriasEnemigo;
  }
  console.log(numeroAtaques);
  if (numeroAtaques == 0) {
    revisarVidas();
  }
}

function revisarVidas() {
  if (victoriasJugador == victoriasEnemigo) {
    crearMensajeFinal("RONDA EMPATADA!");
  } else if (victoriasJugador > victoriasEnemigo) {
    crearMensajeFinal("FELICIDADES GANASTE!!");
  } else {
    crearMensajeFinal("LO SIENTO, PERDISTE!!");
  }
}

function crearMensajeTurno(resultado) {
  mensajeTurno.innerHTML = resultado;
}

function crearMensajeFinal(resultadoFinal) {
  seccionMensajes.innerHTML = resultadoFinal;
  sectionReiniciar.style.display = "block";
}

function reiniciarJuego() {
  location.reload();
}

function aleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function pintarCanvas() {
  mascotaJugador.xi += mascotaJugador.velocidadX;
  mascotaJugador.yi += mascotaJugador.velocidadY;
  lienzo.clearRect(0, 0, canvas.width, canvas.height);
  mascotaJugador.pintarMokepon();
  enviarPosicion(mascotaJugador.x, mascotaJugador.y);
  mostrarEnemigos();
  if (mascotaJugador.velocidadX !== 0 || mascotaJugador.velocidadY !== 0) {
    revisarColision(capipepoEnemigo);
    revisarColision(hipodogeEnemigo);
    revisarColision(ratigueyaEnemigo);
  }
}

function enviarPosicion(x, y) {
  fetch(`http://localhost:8080/mokepon/${jugadorId}/posicion`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      x,
      y,
    }),
  });
}

function mostrarEnemigos() {
  ratigueyaEnemigo.pintarMokepon();
  hipodogeEnemigo.pintarMokepon();
  capipepoEnemigo.pintarMokepon();
}

function revisarColision(enemigo) {
  const arribaMascota = mascotaJugador.yi;
  const abajoMascota = mascotaJugador.yi + mascotaJugador.altoImg;
  const derechaMascota = mascotaJugador.xi + mascotaJugador.anchoImg;
  const izquierdaMascota = mascotaJugador.xi;

  const arribaEnemigo = enemigo.yi;
  const abajoEnemigo = enemigo.yi + enemigo.altoImg;
  const derechaEnemigo = enemigo.xi + enemigo.anchoImg;
  const izquierdaEnemigo = enemigo.xi;

  if (
    abajoMascota < arribaEnemigo ||
    arribaMascota > abajoEnemigo ||
    derechaMascota < izquierdaEnemigo ||
    izquierdaMascota > derechaEnemigo
  ) {
    return;
  }
  mascotaJugador.velocidadX = 0;
  mascotaJugador.velocidadY = 0;
  mascotaEnemigo = enemigo;
  iniciarCombate();
}

window.addEventListener("load", iniciarJuego);
