const sectionSeleccionarAtaque = document.getElementById("seleccionar-ataque");
const sectionReiniciar = document.getElementById("reiniciar");
const botonMascotaJugador = document.getElementById("boton-mascota");
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
    this.ataqueSeleccionado = null;
    this.ataques = null;
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
    opcionDeMokepones = `
    <div>
      <input
        type="radio"
        value="${mokepon.nombre}"
        name="mascota"
        id="${mokepon.id}"
        class="input-mokepon"
      />
      <label class="tarjeta-de-mokepon" for="${mokepon.id}">
        <p>${mokepon.nombre}</p>
        <img src="${mokepon.foto}" alt="${mokepon.nombre}" />
      </label>
    </div>`;
    tarjetasMokepon.innerHTML += opcionDeMokepones;
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
    alert("No seleccionaste ningun mokepon ¬¬");
    return;
  }
  mokepones.forEach((mokepon) => {
    if (mokepon.id == mokeponId) {
      mascotaJugador = mokepon;
      return;
    }
  });

  console.log("Mi mascota es: ", mascotaJugador);
  spanMascotaJugador.innerHTML = mascotaJugador.nombre;

  cargarAtaquesJugador(mascotaJugador);

  sectionSeleccionarMascota.classList.add("hidden");
  sectionSeleccionarAtaque.classList.remove("hidden");

  seleccionarMascotaEnemigo();
}

function cargarAtaquesJugador(mascotaJugador) {
  mascotaJugador.ataques.forEach((ataqueJugador) => {
    let botonAtaque = document.createElement("button");
    let text = document.createTextNode(ataqueJugador.nombre);
    botonAtaque.appendChild(text);
    botonAtaque.id = ataqueJugador.id;
    botonAtaque.classList.add("boton-de-ataque");
    // This is posibly a closure
    botonAtaque.addEventListener("click", function () {
      mascotaJugador.ataqueSeleccionado = ataqueJugador.nombre;
      console.log(mascotaJugador);
      ataqueAleatorioEnemigo();
    });
    botonesAtaqueJugador.appendChild(botonAtaque);
  });
}

function seleccionarMascotaEnemigo() {
  let mascotaAleatoria = mokepones[aleatorio(0, mokepones.length - 1)];
  console.log("Mascota enemiga es: ", mascotaAleatoria);
  spanMascotaEnemigo.innerHTML = mascotaAleatoria.nombre;
}

function ataqueAleatorioEnemigo() {
  let ataqueAleatorio = aleatorio(1, 3);

  if (ataqueAleatorio == 1) {
    ataqueEnemigo = "🔥 Fuego";
  } else if (ataqueAleatorio == 2) {
    ataqueEnemigo = "💧 Agua";
  } else {
    ataqueEnemigo = "🌱 Tierra";
  }

  console.log(ataqueEnemigo);

  combate();
}

function combate() {
  if (ataqueEnemigo == mascotaJugador.ataqueSeleccionado) {
    crearMensaje("EMPATE");
  } else if (
    mascotaJugador.ataqueSeleccionado == ataqueFuego.nombre &&
    ataqueEnemigo == ataqueTierra.nombre
  ) {
    crearMensaje("GANASTE");
    vidasEnemigo--;
    spanVidasEnemigo.innerHTML = vidasEnemigo;
  } else if (
    mascotaJugador.ataqueSeleccionado == ataqueAgua.nombre &&
    ataqueEnemigo == ataqueFuego.nombre
  ) {
    crearMensaje("GANASTE");
    vidasEnemigo--;
    spanVidasEnemigo.innerHTML = vidasEnemigo;
  } else if (
    mascotaJugador.ataqueSeleccionado == ataqueTierra.nombre &&
    ataqueEnemigo == ataqueAgua.nombre
  ) {
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
  nuevoAtaqueDelJugador.innerHTML = mascotaJugador.ataqueSeleccionado;
  nuevoAtaqueDelEnemigo.innerHTML = ataqueEnemigo;

  ataquesDelJugador.appendChild(nuevoAtaqueDelJugador);
  ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo);
}

function crearMensajeFinal(resultadoFinal) {
  sectionMensajes.innerHTML = resultadoFinal;

  // botonFuego.disabled = true;

  // botonAgua.disabled = true;

  // botonTierra.disabled = true;

  sectionReiniciar.style.display = "block";
}

function reiniciarJuego() {
  location.reload();
}

function aleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

window.addEventListener("load", iniciarJuego);
