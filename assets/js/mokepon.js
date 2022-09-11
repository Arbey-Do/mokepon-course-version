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
  canvas.width = 700;
  canvas.height = 600;
  
// Buttons
const botonMascotaJugador = document.getElementById("boton-mascota-jugador");
const botonReiniciar = document.getElementById("boton-reiniciar");

// Text
const spanMascotaJugador = document.getElementById("mascota-jugador");
const spanMascotaEnemigo = document.getElementById("mascota-enemigo");
const spanVidasJugador = document.getElementById("vidas-jugador");
const spanVidasEnemigo = document.getElementById("vidas-enemigo");

// Mapa Mokepon
const botonMover = document.getElementById("mover-jugador");


let mokepones = [];

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

if (canvas.getContext) {
  lienzo = canvas.getContext("2d");
}

class Mokepon {
  constructor(id, nombre, foto) {
    this.id = id;
    this.nombre = nombre;
    this.foto = foto;
    this.ataques = [];
    this.victorias = 0;
    this.fotoPersonaje = new Image();
    this.fotoPersonaje.src = foto;
    this.xi = 20;
    this.yi = 30;
    this.anchoImg = 100;
    this.altoImg = 100;
    this.velocidad = 10;
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
  "./assets/img/hipodoge.png"
);

const capipepo = new Mokepon(
  "capipepo",
  "Capipepo",
  "./assets/img/capipepo.png"
);

const ratigueya = new Mokepon(
  "ratigueya",
  "Ratigueya",
  "./assets/img/ratigueya.png"
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
  botonReiniciar.addEventListener("click", reiniciarJuego);
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

  // Lógica para la sección del MAPA
  console.log(mascotaJugador);
  cargarMovimientosTeclado();
  cargarMovimientosJugador();

  sectionSeleccionarMascota.classList.add("hidden");
  seccionMapa.classList.remove("hidden");
  pintarPersonaje();

  // pintarPersonaje();
  // botonMover.addEventListener("click", moverMascotaJugador);

  // Lógica para la sección del COMBATE
  // **************************************************
  // numeroAtaques = mascotaJugador.ataques.length - 1;
  // imagenJugador = mascotaJugador.foto;
  // document.getElementById("imagen-jugador").src = imagenJugador;
  // console.log("Mascota Jugador: ", mascotaJugador);
  // spanMascotaJugador.innerHTML = mascotaJugador.nombre;

  // limpiarBotonesJugador();
  // cargarAtaquesJugador();

  // sectionSeleccionarMascota.classList.add("hidden");
  // sectionSeleccionarAtaque.classList.remove("hidden");

  // seleccionarMascotaEnemigo();
}

function cargarMovimientosTeclado() {
  let nIntervId;
  window.addEventListener("keydown", (e) => {
    if (e.key == "w" || e.key == "ArrowUp") {
      if (!nIntervId) {
        nIntervId = setInterval(moverArriba, 50);
      }
    } else if (e.key == "s" || e.key == "ArrowDown") {
      if (!nIntervId) {
        nIntervId = setInterval(moverAbajo, 50);
      }
    } else if (e.key == "d" || e.key == "ArrowRight") {
      if (!nIntervId) {
        nIntervId = setInterval(moverDerecha, 50);
      }
    } else if (e.key == "a" || e.key == "ArrowLeft") {
      if (!nIntervId) {
        nIntervId = setInterval(moverIzquierda, 50);
      }
    }
  });

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
        clearInterval(nIntervId);
        nIntervId = null;
        break;
    }
  });
}

function cargarMovimientosJugador() {
  const botonesMovimiento = document.createElement("div");
  const movimientos = ["Up", "Right", "Left", "Down"];
  movimientos.forEach((movimiento) => {
    const boton = document.createElement("button");
    boton.id = movimiento.toLowerCase();
    boton.textContent = movimiento;
    switch (movimiento) {
      case "Up":
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

function cargarMovimiento(btn, accion) {
  let nIntervId;
  const eventos = ["mousedown", "mouseleave", "mouseup"];
  eventos.forEach((evento) => {
    switch (evento) {
      case "mousedown":
        btn.addEventListener(evento, () => {
          if (!nIntervId) {
            nIntervId = setInterval(accion, 50);
            console.log(nIntervId);
          }
        });
        break;
      case "mouseleave":
      case "mouseup":
        btn.addEventListener(evento, () => {
          clearInterval(nIntervId);
          nIntervId = null;
          console.log(nIntervId);
        });
        break;
    }
  });
}

function moverArriba() {
  mascotaJugador.yi -= mascotaJugador.velocidad;
  pintarPersonaje();
}

function moverDerecha() {
  mascotaJugador.xi += mascotaJugador.velocidad;
  pintarPersonaje();
}

function moverIzquierda() {
  mascotaJugador.xi -= mascotaJugador.velocidad;
  pintarPersonaje();
}

function moverAbajo() {
  mascotaJugador.yi += mascotaJugador.velocidad;
  pintarPersonaje();
}

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

function limpiarBotonesJugador() {
  botonesAtaqueJugador.innerHTML = "";
}

function seleccionarMascotaEnemigo() {
  mascotaEnemigo = mokepones[aleatorio(0, mokepones.length - 1)];
  imagenEnemigo = mascotaEnemigo.foto;
  document.getElementById("imagen-enemigo").src = imagenEnemigo;
  console.log("Mascota enemiga es: ", mascotaEnemigo);
  spanMascotaEnemigo.innerHTML = mascotaEnemigo.nombre;
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

// Funciones de Mapa
function pintarPersonaje() {
  lienzo.clearRect(0, 0, canvas.width, canvas.height);
  // lienzo.clearRect(mascotaJugador.xi, mascotaJugador.yi, mascotaJugador.anchoImg, mascotaJugador.altoImg);
  lienzo.drawImage(
    mascotaJugador.fotoPersonaje,
    mascotaJugador.xi,
    mascotaJugador.yi,
    mascotaJugador.anchoImg,
    mascotaJugador.altoImg
  );
}

window.addEventListener("load", iniciarJuego);
