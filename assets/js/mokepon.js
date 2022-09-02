const sectionSeleccionarAtaque = document.getElementById("seleccionar-ataque");
const sectionReiniciar = document.getElementById("reiniciar");
const botonMascotaJugador = document.getElementById("boton-mascota");
const botonFuego = document.getElementById("boton-fuego");
const botonAgua = document.getElementById("boton-agua");
const botonTierra = document.getElementById("boton-tierra");
const botonReiniciar = document.getElementById("boton-reiniciar");
const spanMascotaJugador = document.getElementById("mascota-jugador");
const sectionSeleccionarMascota = document.getElementById(
  "seleccionar-mascota"
);
const spanMascotaEnemigo = document.getElementById("mascota-enemigo");
const spanVidasJugador = document.getElementById("vidas-jugador");
const spanVidasEnemigo = document.getElementById("vidas-enemigo");
const sectionMensajes = document.getElementById("resultado");
const ataquesDelJugador = document.getElementById("ataques-del-jugador");
const ataquesDelEnemigo = document.getElementById("ataques-del-enemigo");
const tarjetasMokepon = document.getElementById("tarjetas");
const botonesAtaqueJugador = document.getElementById("tarjetas-ataques");

let mokepones = [];

let mascotaJugador;
let ataqueJugador;
let ataqueEnemigo;
let opcionDeMokepones;
let inputHipodoge;
let inputCapipepo;
let inputRatigueya;
let vidasJugador = 3;
let vidasEnemigo = 3;

class Mokepon {
  constructor(id, nombre, foto, vida) {
    this.id = id;
    this.nombre = nombre;
    this.foto = foto;
    this.vida = vida;
    this.ataques = [];
  }
}

const hipodoge = new Mokepon(
  "hipodoge",
  "Hipodoge",
  "./assets/img/hipodoge.png",
  5
);
const capipepo = new Mokepon(
  "capipepo",
  "Capipepo",
  "./assets/img/capipepo.png",
  5
);
const ratigueya = new Mokepon(
  "ratigueya",
  "Ratigueya",
  "./assets/img/ratigueya.png",
  5
);

hipodoge.ataques.push(
  { nombre: "💧", id: "boton-agua" },
  { nombre: "💧", id: "boton-agua" },
  { nombre: "💧", id: "boton-agua" },
  { nombre: "🔥", id: "boton-fuego" },
  { nombre: "🌱", id: "boton-tierra" }
);

capipepo.ataques.push(
  { nombre: "🌱", id: "boton-tierra" },
  { nombre: "🌱", id: "boton-tierra" },
  { nombre: "🌱", id: "boton-tierra" },
  { nombre: "💧", id: "boton-agua" },
  { nombre: "🔥", id: "boton-fuego" }
);

ratigueya.ataques.push(
  { nombre: "🔥", id: "boton-fuego" },
  { nombre: "🔥", id: "boton-fuego" },
  { nombre: "🔥", id: "boton-fuego" },
  { nombre: "💧", id: "boton-agua" },
  { nombre: "🌱", id: "boton-tierra" }
);

mokepones.push(hipodoge, capipepo, ratigueya);

function iniciarJuego() {
  mokepones.forEach((mokepon) => {
    opcionDeMokepones = `
    <input
      type="radio"
      value="${mokepon.nombre}"
      name="mascota"
      id="${mokepon.id}"
    />
    <label class="tarjeta-de-mokepon" for="${mokepon.id}">
      <p>${mokepon.nombre}</p>
      <img src="${mokepon.foto}" alt="${mokepon.nombre}" />
    </label>`;
    tarjetasMokepon.innerHTML += opcionDeMokepones;
  });

  inputHipodoge = document.getElementById("hipodoge");
  inputCapipepo = document.getElementById("capipepo");
  inputRatigueya = document.getElementById("ratigueya");

  console.log({ inputHipodoge, isChecked: inputHipodoge.checked });

  sectionSeleccionarAtaque.style.display = "none";
  sectionReiniciar.style.display = "none";
  botonMascotaJugador.addEventListener("click", seleccionarMascotaJugador);
  // botonFuego.addEventListener("click", ataqueFuego);
  // botonAgua.addEventListener("click", ataqueAgua);
  // botonTierra.addEventListener("click", ataqueTierra);
  botonReiniciar.addEventListener("click", reiniciarJuego);
}

function seleccionarMascotaJugador() {
  if (inputHipodoge.checked) {
    mascotaJugador = hipodoge;
  } else if (inputCapipepo.checked) {
    mascotaJugador = capipepo;
  } else if (inputRatigueya.checked) {
    mascotaJugador = ratigueya;
  } else {
    alert("Selecciona una mascota");
    return;
  }
  console.log(mascotaJugador);
  spanMascotaJugador.innerHTML = mascotaJugador.nombre;

  mostrarAtaquesJugador(mascotaJugador);

  sectionSeleccionarMascota.style.display = "none";
  sectionSeleccionarAtaque.style.display = "flex";

  seleccionarMascotaEnemigo();
}

function mostrarAtaquesJugador(mascotaJugador) {
  mascotaJugador.ataques.forEach((ataqueJugador) => {
    let botonAtaque = document.createElement("button");
    let text = document.createTextNode(ataqueJugador.nombre);
    botonAtaque.appendChild(text);
    botonAtaque.id = ataqueJugador.id;
    botonAtaque.classList.add("boton-de-ataque");
    botonesAtaqueJugador.appendChild(botonAtaque);
  });
}

function seleccionarMascotaEnemigo() {
  let mascotaAleatoria = mokepones[aleatorio(0, mokepones.length - 1)];
  console.log(mascotaAleatoria);
  spanMascotaEnemigo.innerHTML = mascotaAleatoria.nombre;
}

function ataqueFuego() {
  ataqueJugador = "FUEGO";
  ataqueAleatorioEnemigo();
}
function ataqueAgua() {
  ataqueJugador = "AGUA";
  ataqueAleatorioEnemigo();
}
function ataqueTierra() {
  ataqueJugador = "TIERRA";
  ataqueAleatorioEnemigo();
}

function ataqueAleatorioEnemigo() {
  let ataqueAleatorio = aleatorio(1, 3);

  if (ataqueAleatorio == 1) {
    ataqueEnemigo = "FUEGO";
  } else if (ataqueAleatorio == 2) {
    ataqueEnemigo = "AGUA";
  } else {
    ataqueEnemigo = "TIERRA";
  }

  combate();
}

function combate() {
  if (ataqueEnemigo == ataqueJugador) {
    crearMensaje("EMPATE");
  } else if (ataqueJugador == "FUEGO" && ataqueEnemigo == "TIERRA") {
    crearMensaje("GANASTE");
    vidasEnemigo--;
    spanVidasEnemigo.innerHTML = vidasEnemigo;
  } else if (ataqueJugador == "AGUA" && ataqueEnemigo == "FUEGO") {
    crearMensaje("GANASTE");
    vidasEnemigo--;
    spanVidasEnemigo.innerHTML = vidasEnemigo;
  } else if (ataqueJugador == "TIERRA" && ataqueEnemigo == "AGUA") {
    crearMensaje("GANASTE");
    vidasEnemigo--;
    spanVidasEnemigo.innerHTML = vidasEnemigo;
  } else {
    crearMensaje("PERDISTE");
    vidasJugador--;
    spanVidasJugador.innerHTML = vidasJugador;
  }

  revisarVidas();
}

function revisarVidas() {
  if (vidasEnemigo == 0) {
    crearMensajeFinal("FELICITACIONES! Ganaste :)");
  } else if (vidasJugador == 0) {
    crearMensajeFinal("Lo siento, perdiste :(");
  }
}

function crearMensaje(resultado) {
  let nuevoAtaqueDelJugador = document.createElement("p");
  let nuevoAtaqueDelEnemigo = document.createElement("p");

  sectionMensajes.innerHTML = resultado;
  nuevoAtaqueDelJugador.innerHTML = ataqueJugador;
  nuevoAtaqueDelEnemigo.innerHTML = ataqueEnemigo;

  ataquesDelJugador.appendChild(nuevoAtaqueDelJugador);
  ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo);
}

function crearMensajeFinal(resultadoFinal) {
  sectionMensajes.innerHTML = resultadoFinal;

  botonFuego.disabled = true;

  botonAgua.disabled = true;

  botonTierra.disabled = true;

  sectionReiniciar.style.display = "block";
}

function reiniciarJuego() {
  location.reload();
}

function aleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

window.addEventListener("load", iniciarJuego);
