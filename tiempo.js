let tiempoBlancas = 10 * 60; // 10 minutos en segundos
let tiempoNegras = 10 * 60;  // 10 minutos en segundos
var jugador = "blancas"; // Iniciar con las blancas
const sonidoVictoria = document.getElementById("sonidoVictoria");

// Función para actualizar el cronómetro
function actualizarCronometro() {
    const tiempoRestanteBlancas = document.getElementById("timeW");
    const tiempoRestanteNegras = document.getElementById("timeB");

    if (jugador === "blancas") {
        let timeB = document.querySelector("#tiempoBlancas");
        timeB.style.backgroundColor = "rgba(255, 255, 255, 1)";
        let timeN = document.querySelector("#tiempoNegras");
        timeN.style.backgroundColor = "rgba(0, 0, 0, 0.3)";

        tiempoRestanteNegras.style.animation = "none";

        tiempoBlancas--;
        if (tiempoBlancas <= 0) {
            tiempoBlancas = 0;
            clearInterval(partida);
            var gameOver = document.querySelector("#gameOver");
            gameOver.textContent = "Ganan las Negras";
            let description = document.querySelector("#description");
            description.textContent = "Tiempo"
            let contenedor = document.querySelector(".contenedor");
            contenedor.style.visibility = "visible";
            sonidoVictoria.play();
        }
        if (tiempoBlancas < 60) {
            tiempoRestanteBlancas.style.color = "red";
            tiempoRestanteBlancas.style.animation = "palpita2 1s infinite";
        }

        tiempoRestanteBlancas.textContent = ` ${formatoTiempo(tiempoBlancas)}`;
    } else {
        let timeB = document.querySelector("#tiempoNegras");
        timeB.style.backgroundColor = "rgba(0, 0, 0, 1)";
        let timeN = document.querySelector("#tiempoBlancas");
        timeN.style.backgroundColor = "rgba(255, 255, 255, 0.3)";

        tiempoRestanteBlancas.style.animation = "none";

        tiempoNegras--;
        if (tiempoNegras <= 0) {
            tiempoNegras = 0;
            clearInterval(partida);
            var gameOver = document.querySelector("#gameOver");
            gameOver.textContent = "Ganan las Blancas";
            let description = document.querySelector("#description");
            description.textContent = "Tiempo"
            var contenedor = document.querySelector(".contenedor");
            contenedor.style.visibility = "visible";
            sonidoVictoria.play();
        }
        if (tiempoNegras < 60) {
            tiempoRestanteNegras.style.color = "red";
            tiempoRestanteBlancas.style.animation = "palpita2 1s infinite";
        }
        tiempoRestanteNegras.textContent = ` ${formatoTiempo(tiempoNegras)}`;
    }
}

// Función para formatear el tiempo en minutos y segundos
function formatoTiempo(segundos) {
    const minutos = Math.floor(segundos / 60);
    const segundosRestantes = segundos % 60;
    return `${minutos}:${segundosRestantes < 10 ? "0" : ""}${segundosRestantes}`;
}

// Llamar a setInterval para actualizar el cronómetro cada segundo
var partida = setInterval(actualizarCronometro, 1000);

var reset = document.querySelector("#reiniciar");
reset.addEventListener("click", () => {
    location.reload();
});
