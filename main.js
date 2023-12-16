// Representación de las fichas en el tablero (true significa ocupado, false significa vacío)
var piezasNegras = [
    [true, true, true, true, true, true, true, true],
    [true, true, true, true, true, true, true, true],
    [false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false]
];

var piezasBlancas = [
    [false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false],
    [true, true, true, true, true, true, true, true],
    [true, true, true, true, true, true, true, true]
];

var piezas = [
    ["♜", "♞", "♝", "♛", "♚", "♝", "♞", "♜"],
    ["♟", "♟", "♟", "♟", "♟", "♟", "♟", "♟"],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["♙", "♙", "♙", "♙", "♙", "♙", "♙", "♙"],
    ["♖", "♘", "♗", "♕", "♔", "♗", "♘", "♖"]
];

var nombres = [
    ["torre", "caballo", "alfil", "reina", "rey", "alfil", "caballo", "torre"],
    ["peon", "peon", "peon", "peon", "peon", "peon", "peon", "peon"],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["peon", "peon", "peon", "peon", "peon", "peon", "peon", "peon"],
    ["torre", "caballo", "alfil", "reina", "rey", "alfil", "caballo", "torre"]
];

var reyBlanco = [7, 4];
var reyNegro = [0, 4];
var cantPiezasNegras = 16;
var cantPiezasBlancas = 16;
var piezaJaque = [0, 0];
var enroqueBlanco = true;
var enroqueNegro = true;
var enrocar = false;

// Función para crear el tablero y las piezas
function crearTablero() {
    const board = document.getElementById("board");

    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            var cell = document.createElement("div");
            cell.style.position = "relative";
            cell.classList.add("cell", (i + j) % 2 == 0 ? "white" : "black");
            cell.dataset.row = parseInt(i);
            cell.dataset.col = parseInt(j);
            cell.dataset.name = nombres[i][j];
            cell.textContent = piezas[i][j];
            if (i == 0 && j == 0)
                cell.classList.add("torreIN1");
            else if (i == 0 && j == 7)
                cell.classList.add("torreDN1");
            else if (i == 7 && j == 7)
                cell.classList.add("torreDB1");
            else if (i == 7 && j == 0)
                cell.classList.add("torreIB1");
            else if (i == 0 && j == 3)
                cell.classList.add("torreIN2");
            else if (i == 0 && j == 5)
                cell.classList.add("torreDN2");
            else if (i == 7 && j == 3)
                cell.classList.add("torreIB2");
            else if (i == 7 && j == 5)
                cell.classList.add("torreDB2");
            /*
            if(i == 7) {
                let div = document.createElement("spam");
                cell.appendChild(div);
                div.classList.add("letra");
                switch(j) {
                    case 0: 
                        div.textContent = "a";
                        break;
                    case 1: 
                        div.textContent = "b";
                        break;
                    case 2: 
                        div.textContent = "c";
                        break;
                    case 3: 
                        div.textContent = "d";
                        break;
                    case 4: 
                        div.textContent = "e";
                        break;
                    case 5: 
                        div.textContent = "f";
                        break;
                    case 6: 
                        div.textContent = "g";
                        break;
                    case 7: 
                        div.textContent = "h";
                        break;
                }
            }

            if(j == 7) {
                let div = document.createElement("spam");
                cell.appendChild(div);
                div.classList.add("numero");
                switch(i) {
                    case 0: 
                        div.textContent = "8";
                        break;
                    case 1: 
                        div.textContent = "7";
                        break;
                    case 2: 
                        div.textContent = "6";
                        break;
                    case 3: 
                        div.textContent = "5";
                        break;
                    case 4: 
                        div.textContent = "4";
                        break;
                    case 5: 
                        div.textContent = "3";
                        break;
                    case 6: 
                        div.textContent = "2";
                        break;
                    case 7: 
                        div.textContent = "1";
                        break;
                }
            }
            */
            board.appendChild(cell);
        }
    }
}

crearTablero();

function validar(nombrePieza, filaActual, columnaActual, filaDestino, columnaDestino, jugador) {
    filaActual = parseInt(filaActual);
    columnaActual = parseInt(columnaActual);
    filaDestino = parseInt(filaDestino);
    columnaDestino = parseInt(columnaDestino);

    // Verificar que las coordenadas estén dentro del tablero (8x8)
    if (filaActual < 0 || filaActual > 7 || columnaActual < 0 || columnaActual > 7 ||
        filaDestino < 0 || filaDestino > 7 || columnaDestino < 0 || columnaDestino > 7
        || (filaActual == filaDestino && columnaActual == columnaDestino)) {
        return false;
    }

    // Lógica de validación basada en el nombre de la pieza
    switch (nombrePieza) {
        case "peon":
            if (jugador == "blancas") {
                if (filaDestino == parseInt(filaActual) - 1 && columnaDestino == columnaActual && !piezasNegras[filaDestino][columnaDestino])
                    return true;
                if (filaDestino == parseInt(filaActual) - 2 && columnaDestino == columnaActual && !piezasNegras[filaDestino][columnaDestino] && filaActual == 6)
                    return true;
                if (filaDestino == parseInt(filaActual) - 1 &&
                    (columnaDestino == parseInt(columnaActual) - 1 || columnaDestino == parseInt(columnaActual) + 1) &&
                    piezasNegras[filaDestino][columnaDestino])
                    return true;
            }
            else {
                if (filaDestino == parseInt(filaActual) + 1 && columnaDestino == columnaActual && !piezasBlancas[filaDestino][columnaDestino])
                    return true;
                if (filaDestino == parseInt(filaActual) + 2 && columnaDestino == columnaActual && !piezasBlancas[filaDestino][columnaDestino] && filaActual == 1)
                    return true;
                if (filaDestino == parseInt(filaActual) + 1 &&
                    (columnaDestino == parseInt(columnaActual) - 1 || columnaDestino == parseInt(columnaActual) + 1) &&
                    piezasBlancas[filaDestino][columnaDestino])
                    return true;
            }

            return false;

        case "torre":
            // Validación para la torre (movimiento en vertical u horizontal)
            if (filaDestino == filaActual || columnaDestino == columnaActual) {
                if (filaDestino == filaActual) {
                    if (columnaDestino > columnaActual) {
                        let aux = columnaActual + 1;
                        while (aux < columnaDestino) {
                            if (piezasBlancas[filaActual][aux] || piezasNegras[filaActual][aux])
                                return false;
                            aux++;
                        }
                    }
                    else {
                        let aux = columnaActual - 1;
                        while (aux > columnaDestino) {
                            if (piezasBlancas[filaActual][aux] || piezasNegras[filaActual][aux])
                                return false;
                            aux--;
                        }
                    }
                    return true;
                }
                else {
                    if (filaDestino > filaActual) {
                        let aux = filaActual + 1;
                        while (aux < filaDestino) {
                            if (piezasBlancas[aux][columnaActual] || piezasNegras[aux][columnaActual])
                                return false;
                            aux++;
                        }
                    }
                    else {
                        let aux = filaActual - 1;
                        while (aux > filaDestino) {
                            if (piezasBlancas[aux][columnaActual] || piezasNegras[aux][columnaActual])
                                return false;
                            aux--;
                        }
                    }
                    return true;
                }
            }
            return false;

        case "alfil":
            // Validación para el alfil (movimiento diagonal)
            if (Math.abs(filaDestino - filaActual) == Math.abs(columnaDestino - columnaActual)) {
                if (filaDestino > filaActual && columnaDestino > columnaActual) {
                    let auxF = filaActual + 1;
                    let auxC = columnaActual + 1;
                    while (auxF < filaDestino && auxC < columnaDestino) {
                        if (piezasBlancas[auxF][auxC] || piezasNegras[auxF][auxC])
                            return false;
                        auxF++, auxC++;
                    }
                    return true;
                }
                if (filaDestino > filaActual && columnaDestino < columnaActual) {
                    let auxF = filaActual + 1;
                    let auxC = columnaActual - 1;
                    while (auxF < filaDestino && auxC > columnaDestino) {
                        if (piezasBlancas[auxF][auxC] || piezasNegras[auxF][auxC])
                            return false;
                        auxF++, auxC--;
                    }
                    return true;
                }
                if (filaDestino < filaActual && columnaDestino < columnaActual) {
                    let auxF = filaActual - 1;
                    let auxC = columnaActual - 1;
                    while (auxF > filaDestino && auxC > columnaDestino) {
                        if (piezasBlancas[auxF][auxC] || piezasNegras[auxF][auxC])
                            return false;
                        auxF--, auxC--;
                    }
                    return true;
                }
                else {
                    let auxF = filaActual - 1;
                    let auxC = columnaActual + 1;
                    while (auxF > filaDestino && auxC < columnaDestino) {
                        if (piezasBlancas[auxF][auxC] || piezasNegras[auxF][auxC])
                            return false;
                        auxF--, auxC++;
                    }
                    return true;
                }
            }
            return false;

        case "caballo":
            // Validación para el caballo(movimiento en forma de L)
            const filaDiferencia = Math.abs(filaDestino - filaActual);
            const columnaDiferencia = Math.abs(columnaDestino - columnaActual);
            if ((filaDiferencia == 2 && columnaDiferencia == 1) || (filaDiferencia == 1 && columnaDiferencia == 2)) {
                return true;
            }
            return false;

        case "reina":
            // Validación para la torre (movimiento en vertical u horizontal)
            if (filaDestino == filaActual || columnaDestino == columnaActual) {
                if (filaDestino == filaActual) {
                    if (columnaDestino > columnaActual) {
                        let aux = columnaActual + 1;
                        while (aux < columnaDestino) {
                            if (piezasBlancas[filaActual][aux] || piezasNegras[filaActual][aux])
                                return false;
                            aux++;
                        }
                    }
                    else {
                        let aux = columnaActual - 1;
                        while (aux > columnaDestino) {
                            if (piezasBlancas[filaActual][aux] || piezasNegras[filaActual][aux])
                                return false;
                            aux--;
                        }
                    }
                    return true;
                }
                else {
                    if (filaDestino > filaActual) {
                        let aux = filaActual + 1;
                        while (aux < filaDestino) {
                            if (piezasBlancas[aux][columnaActual] || piezasNegras[aux][columnaActual])
                                return false;
                            aux++;
                        }
                    }
                    else {
                        let aux = filaActual - 1;
                        while (aux > filaDestino) {
                            if (piezasBlancas[aux][columnaActual] || piezasNegras[aux][columnaActual])
                                return false;
                            aux--;
                        }
                    }
                    return true;
                }
            }

            // Validación para el alfil (movimiento diagonal)
            if (Math.abs(filaDestino - filaActual) == Math.abs(columnaDestino - columnaActual)) {
                if (filaDestino > filaActual && columnaDestino > columnaActual) {
                    let auxF = filaActual + 1;
                    let auxC = columnaActual + 1;
                    while (auxF < filaDestino && auxC < columnaDestino) {
                        if (piezasBlancas[auxF][auxC] || piezasNegras[auxF][auxC])
                            return false;
                        auxF++, auxC++;
                    }
                    return true;
                }
                if (filaDestino > filaActual && columnaDestino < columnaActual) {
                    let auxF = filaActual + 1;
                    let auxC = columnaActual - 1;
                    while (auxF < filaDestino && auxC > columnaDestino) {
                        if (piezasBlancas[auxF][auxC] || piezasNegras[auxF][auxC])
                            return false;
                        auxF++, auxC--;
                    }
                    return true;
                }
                if (filaDestino < filaActual && columnaDestino < columnaActual) {
                    let auxF = filaActual - 1;
                    let auxC = columnaActual - 1;
                    while (auxF > filaDestino && auxC > columnaDestino) {
                        if (piezasBlancas[auxF][auxC] || piezasNegras[auxF][auxC])
                            return false;
                        auxF--, auxC--;
                    }
                    return true;
                }
                else {
                    let auxF = filaActual - 1;
                    let auxC = columnaActual + 1;
                    while (auxF > filaDestino && auxC < columnaDestino) {
                        if (piezasBlancas[auxF][auxC] || piezasNegras[auxF][auxC])
                            return false;
                        auxF--, auxC++;
                    }
                    return true;
                }
            }

            return false;

        case "rey":
            // Validación para el rey(celdas adyacentes)
            const filaDifAbs = Math.abs(filaDestino - filaActual);
            const colDifAbs = Math.abs(columnaDestino - columnaActual);
            if (filaDifAbs <= 1 && colDifAbs <= 1) {
                return true;
            }

            if (jugador == "blancas") {
                if (filaActual == 7 && columnaActual == 4 && enroqueBlanco && filaDestino == 7 && columnaDestino == 6) {
                    if (!piezasBlancas[7][5] && !piezasNegras[7][5] && !piezasBlancas[7][6] && !piezasNegras[7][6] && piezasBlancas[7][7] && nombres[7][7] == "torre") {
                        enrocar = true;
                        return true;
                    }
                }
                else if (filaActual == 7 && columnaActual == 4 && enroqueBlanco && filaDestino == 7 && columnaDestino == 2) {
                    if (!piezasBlancas[7][1] && !piezasNegras[7][1] && !piezasBlancas[7][2] && !piezasNegras[7][2] && !piezasBlancas[7][3] && !piezasNegras[7][3] && piezasBlancas[7][0] && nombres[7][0] == "torre") {
                        enrocar = true;
                        return true;
                    }
                }
            }
            else {
                if (filaActual == 0 && columnaActual == 4 && enroqueNegro && filaDestino == 0 && columnaDestino == 6) {
                    if (!piezasBlancas[0][5] && !piezasNegras[0][5] && !piezasBlancas[0][6] && !piezasNegras[0][6] && piezasNegras[0][7] && nombres[0][7] == "torre") {
                        enrocar = true;
                        return true;
                    }
                }
                else if (filaActual == 0 && columnaActual == 4 && enroqueBlanco && filaDestino == 0 && columnaDestino == 2) {
                    if (!piezasBlancas[0][1] && !piezasNegras[0][1] && !piezasBlancas[0][2] && !piezasNegras[0][2] && !piezasBlancas[0][3] && !piezasNegras[0][3] && piezasNegras[0][0] && nombres[0][0] == "torre") {
                        enrocar = true;
                        return true;
                    }
                }
            }


            return false;

        default:
            return false; // Nombre de pieza no válido
    }
}

function jaque(jugador) {
    if (jugador == "blancas") {
        // verifica que el rey enemigo no esté en celdas adyacentes
        if (reyBlanco[0] + 1 <= 7 && nombres[reyBlanco[0] + 1][reyBlanco[1]] == "rey" && piezasNegras[reyBlanco[0] + 1][reyBlanco[1]])
            return true;
        if (reyBlanco[0] - 1 >= 0 && nombres[reyBlanco[0] - 1][reyBlanco[1]] == "rey" && piezasNegras[reyBlanco[0] - 1][reyBlanco[1]])
            return true;
        if (reyBlanco[1] + 1 <= 7 && nombres[reyBlanco[0]][reyBlanco[1] + 1] == "rey" && piezasNegras[reyBlanco[0]][reyBlanco[1] + 1])
            return true;
        if (reyBlanco[1] - 1 >= 0 && nombres[reyBlanco[0]][reyBlanco[1] - 1] == "rey" && piezasNegras[reyBlanco[0]][reyBlanco[1] - 1])
            return true;
        if (reyBlanco[0] + 1 <= 7 && reyBlanco[1] + 1 <= 7 && nombres[reyBlanco[0] + 1][reyBlanco[1] + 1] == "rey" && piezasNegras[reyBlanco[0] + 1][reyBlanco[1] + 1])
            return true;
        if (reyBlanco[0] - 1 >= 0 && reyBlanco[1] - 1 >= 0 && nombres[reyBlanco[0] - 1][reyBlanco[1] - 1] == "rey" && piezasNegras[reyBlanco[0] - 1][reyBlanco[1] - 1])
            return true;
        if (reyBlanco[0] + 1 <= 7 && reyBlanco[1] - 1 >= 0 && nombres[reyBlanco[0] + 1][reyBlanco[1] - 1] == "rey" && piezasNegras[reyBlanco[0] + 1][reyBlanco[1] - 1])
            return true;
        if (reyBlanco[0] - 1 >= 0 && reyBlanco[1] + 1 <= 7 && nombres[reyBlanco[0] - 1][reyBlanco[1] + 1] == "rey" && piezasNegras[reyBlanco[0] - 1][reyBlanco[1] + 1])
            return true;

        let norte = [reyBlanco[0] - 1, reyBlanco[1]];
        while (norte[0] >= 0) {
            if (piezasNegras[norte[0]][norte[1]]) {
                if (nombres[norte[0]][norte[1]] == "reina" || nombres[norte[0]][norte[1]] == "torre") {
                    piezaJaque = [norte[0], norte[1]];
                    return true;
                }
                else
                    break;
            }
            if (piezasBlancas[norte[0]][norte[1]])
                break;

            norte[0]--;
        }

        let norEste = [reyBlanco[0] - 1, reyBlanco[1] + 1];
        if (norEste[0] >= 0 && norEste[1] <= 7 && piezasNegras[norEste[0]][norEste[1]])
            if (nombres[norEste[0]][norEste[1]] == "peon") {
                piezaJaque = [norEste[0], norEste[1]];
                return true;
            }
        while (norEste[0] >= 0 && norEste[1] <= 7) {
            if (piezasNegras[norEste[0]][norEste[1]]) {
                if (nombres[norEste[0]][norEste[1]] == "reina" || nombres[norEste[0]][norEste[1]] == "alfil") {
                    piezaJaque = [norEste[0], norEste[1]];
                    return true;
                }
                else
                    break;
            }
            if (piezasBlancas[norEste[0]][norEste[1]])
                break;

            norEste[0]--, norEste[1]++;
        }

        let este = [reyBlanco[0], reyBlanco[1] + 1];
        while (este[1] <= 7) {
            if (piezasNegras[este[0]][este[1]]) {
                if (nombres[este[0]][este[1]] == "reina" || nombres[este[0]][este[1]] == "torre") {
                    piezaJaque = [este[0], este[1]];
                    return true;
                }
                else
                    break;
            }
            if (piezasBlancas[este[0]][este[1]])
                break;

            este[1]++;
        }

        //sureste
        let aux = [reyBlanco[0] + 1, reyBlanco[1] + 1];
        while (aux[0] <= 7 && aux[1] <= 7) {
            if (piezasNegras[aux[0]][aux[1]]) {
                if (nombres[aux[0]][aux[1]] == "reina" || nombres[aux[0]][aux[1]] == "alfil") {
                    piezaJaque = [aux[0], aux[1]];
                    return true;
                }
                else
                    break;
            }
            if (piezasBlancas[aux[0]][aux[1]])
                break;

            aux[0]++, aux[1]++;
        }

        //sur
        aux = [reyBlanco[0] + 1, reyBlanco[1]];
        while (aux[0] <= 7) {
            if (piezasNegras[aux[0]][aux[1]]) {
                if (nombres[aux[0]][aux[1]] == "reina" || nombres[aux[0]][aux[1]] == "torre") {
                    piezaJaque = [aux[0], aux[1]];
                    return true;
                }
                else
                    break;
            }
            if (piezasBlancas[aux[0]][aux[1]])
                break;

            aux[0]++;
        }

        //suroeste
        aux = [reyBlanco[0] + 1, reyBlanco[1] - 1];
        while (aux[0] <= 7 && aux[1] >= 0) {
            if (piezasNegras[aux[0]][aux[1]]) {
                if (nombres[aux[0]][aux[1]] == "reina" || nombres[aux[0]][aux[1]] == "alfil") {
                    piezaJaque = [aux[0], aux[1]];
                    return true;
                }
                else
                    break;
            }
            if (piezasBlancas[aux[0]][aux[1]])
                break;

            aux[0]++, aux[1]--;
        }

        //oeste
        aux = [reyBlanco[0], reyBlanco[1] - 1];
        while (aux[1] >= 0) {
            if (piezasNegras[aux[0]][aux[1]]) {
                if (nombres[aux[0]][aux[1]] == "reina" || nombres[aux[0]][aux[1]] == "torre") {
                    piezaJaque = [aux[0], aux[1]];
                    return true;
                }
                else
                    break;
            }
            if (piezasBlancas[aux[0]][aux[1]])
                break;

            aux[1]--;
        }

        //noroeste
        aux = [reyBlanco[0] - 1, reyBlanco[1] - 1];
        if (aux[0] >= 0 && aux[1] >= 0 && piezasNegras[aux[0]][aux[1]])
            if (nombres[aux[0]][aux[1]] == "peon") {
                piezaJaque = [aux[0], aux[1]];
                return true;
            }
        while (aux[0] >= 0 && aux[1] >= 0) {
            if (piezasNegras[aux[0]][aux[1]]) {
                if (nombres[aux[0]][aux[1]] == "reina" || nombres[aux[0]][aux[1]] == "alfil") {
                    piezaJaque = [aux[0], aux[1]];
                    return true;
                }
                else
                    break;
            }
            if (piezasBlancas[aux[0]][aux[1]])
                break;

            aux[0]--, aux[1]--;
        }

        //caballo
        if (reyBlanco[0] - 1 >= 0 && reyBlanco[1] + 2 <= 7) {
            if (piezasNegras[reyBlanco[0] - 1][reyBlanco[1] + 2]) {
                if (nombres[reyBlanco[0] - 1][reyBlanco[1] + 2] == "caballo") {
                    piezaJaque = [reyBlanco[0] - 1, reyBlanco[1] + 2];
                    return true;
                }
            }
        }

        if (reyBlanco[0] - 2 >= 0 && reyBlanco[1] + 1 <= 7) {
            if (piezasNegras[reyBlanco[0] - 2][reyBlanco[1] + 1]) {
                if (nombres[reyBlanco[0] - 2][reyBlanco[1] + 1] == "caballo") {
                    piezaJaque = [reyBlanco[0] - 2, reyBlanco[1] + 1];
                    return true;
                }
            }
        }

        if (reyBlanco[0] + 2 <= 7 && reyBlanco[1] + 1 <= 7) {
            if (piezasNegras[reyBlanco[0] + 2][reyBlanco[1] + 1]) {
                if (nombres[reyBlanco[0] + 2][reyBlanco[1] + 1] == "caballo") {
                    piezaJaque = [reyBlanco[0] + 2, reyBlanco[1] + 1];
                    return true;
                }
            }
        }

        if (reyBlanco[0] + 1 <= 7 && reyBlanco[1] + 2 <= 7) {
            if (piezasNegras[reyBlanco[0] + 1][reyBlanco[1] + 2]) {
                if (nombres[reyBlanco[0] + 1][reyBlanco[1] + 2] == "caballo") {
                    piezaJaque = [reyBlanco[0] + 1, reyBlanco[1] + 2];
                    return true;
                }
            }
        }

        if (reyBlanco[0] + 2 <= 7 && reyBlanco[1] - 1 >= 0) {
            if (piezasNegras[reyBlanco[0] + 2][reyBlanco[1] - 1]) {
                if (nombres[reyBlanco[0] + 2][reyBlanco[1] - 1] == "caballo") {
                    piezaJaque = [reyBlanco[0] + 2, reyBlanco[1] - 1];
                    return true;
                }
            }
        }

        if (reyBlanco[0] + 1 <= 7 && reyBlanco[1] - 2 >= 0) {
            if (piezasNegras[reyBlanco[0] + 1][reyBlanco[1] - 2]) {
                if (nombres[reyBlanco[0] + 1][reyBlanco[1] - 2] == "caballo") {
                    piezaJaque = [reyBlanco[0] + 1, reyBlanco[1] - 2];
                    return true;
                }
            }
        }

        if (reyBlanco[0] - 1 >= 0 && reyBlanco[1] - 2 >= 0) {
            if (piezasNegras[reyBlanco[0] - 1][reyBlanco[1] - 2]) {
                if (nombres[reyBlanco[0] - 1][reyBlanco[1] - 2] == "caballo") {
                    piezaJaque = [reyBlanco[0] - 1, reyBlanco[1] - 2];
                    return true;
                }
            }
        }

        if (reyBlanco[0] - 2 >= 0 && reyBlanco[1] - 1 >= 0) {
            if (piezasNegras[reyBlanco[0] - 2][reyBlanco[1] - 1]) {
                if (nombres[reyBlanco[0] - 2][reyBlanco[1] - 1] == "caballo") {
                    piezaJaque = [reyBlanco[0] - 2, reyBlanco[1] - 1];
                    return true;
                }
            }
        }

        return false;
    }//negras
    else {
        // verifica que el rey enemigo no esté en celdas adyacentes
        if (reyNegro[0] + 1 <= 7 && nombres[reyNegro[0] + 1][reyNegro[1]] == "rey" && piezasBlancas[reyNegro[0] + 1][reyNegro[1]])
            return true;
        if (reyNegro[0] - 1 >= 0 && nombres[reyNegro[0] - 1][reyNegro[1]] == "rey" && piezasBlancas[reyNegro[0] - 1][reyNegro[1]])
            return true;
        if (reyNegro[1] + 1 <= 7 && nombres[reyNegro[0]][reyNegro[1] + 1] == "rey" && piezasBlancas[reyNegro[0]][reyNegro[1] + 1])
            return true;
        if (reyNegro[1] - 1 >= 0 && nombres[reyNegro[0]][reyNegro[1] - 1] == "rey" && piezasBlancas[reyNegro[0]][reyNegro[1] - 1])
            return true;
        if (reyNegro[0] + 1 <= 7 && reyNegro[1] + 1 <= 7 && nombres[reyNegro[0] + 1][reyNegro[1] + 1] == "rey" && piezasBlancas[reyNegro[0] + 1][reyNegro[1] + 1])
            return true;
        if (reyNegro[0] - 1 >= 0 && reyNegro[1] - 1 >= 0 && nombres[reyNegro[0] - 1][reyNegro[1] - 1] == "rey" && piezasBlancas[reyNegro[0] - 1][reyNegro[1] - 1])
            return true;
        if (reyNegro[0] + 1 <= 7 && reyNegro[1] - 1 >= 0 && nombres[reyNegro[0] + 1][reyNegro[1] - 1] == "rey" && piezasBlancas[reyNegro[0] + 1][reyNegro[1] - 1])
            return true;
        if (reyNegro[0] - 1 >= 0 && reyNegro[1] + 1 <= 7 && nombres[reyNegro[0] - 1][reyNegro[1] + 1] == "rey" && piezasBlancas[reyNegro[0] - 1][reyNegro[1] + 1])
            return true;

        let norte = [reyNegro[0] - 1, reyNegro[1]];
        while (norte[0] >= 0) {
            if (piezasBlancas[norte[0]][norte[1]]) {
                if (nombres[norte[0]][norte[1]] == "reina" || nombres[norte[0]][norte[1]] == "torre") {
                    piezaJaque = [norte[0], norte[1]];
                    return true;
                }
                else
                    break;
            }
            if (piezasNegras[norte[0]][norte[1]])
                break;

            norte[0]--;
        }

        let noreste = [reyNegro[0] - 1, reyNegro[1] + 1];
        while (noreste[0] >= 0 && noreste[1] <= 7) {
            if (piezasBlancas[noreste[0]][noreste[1]]) {
                if (nombres[noreste[0]][noreste[1]] == "reina" || nombres[noreste[0]][noreste[1]] == "alfil") {
                    piezaJaque = [noreste[0], noreste[1]];
                    return true;
                }
                else
                    break;
            }
            if (piezasNegras[noreste[0]][noreste[1]])
                break;

            noreste[0]--, noreste[1]++;
        }

        let este = [reyNegro[0], reyNegro[1] + 1];
        while (este[1] <= 7) {
            if (piezasBlancas[este[0]][este[1]]) {
                if (nombres[este[0]][este[1]] == "reina" || nombres[este[0]][este[1]] == "torre") {
                    piezaJaque = [este[0], este[1]];
                    return true;
                }
                else
                    break;
            }
            if (piezasNegras[este[0]][este[1]])
                break;

            este[1]++;
        }

        //sureste
        let aux = [reyNegro[0] + 1, reyNegro[1] + 1];
        if (aux[0] <= 7 && aux[1] <= 7 && piezasBlancas[aux[0]][aux[1]])
            if (nombres[aux[0]][aux[1]] == "peon")
                return true;
        while (aux[0] <= 7 && aux[1] <= 7) {
            if (piezasBlancas[aux[0]][aux[1]]) {
                if (nombres[aux[0]][aux[1]] == "reina" || nombres[aux[0]][aux[1]] == "alfil") {
                    piezaJaque = [aux[0], aux[1]];
                    return true;
                }
                else
                    break;
            }
            if (piezasNegras[aux[0]][aux[1]])
                break;

            aux[0]++, aux[1]++;
        }

        //sur
        aux = [reyNegro[0] + 1, reyNegro[1]];
        while (aux[0] <= 7) {
            if (piezasBlancas[aux[0]][aux[1]]) {
                if (nombres[aux[0]][aux[1]] == "reina" || nombres[aux[0]][aux[1]] == "torre") {
                    piezaJaque = [aux[0], aux[1]];
                    return true;
                }
                else
                    break;
            }
            if (piezasNegras[aux[0]][aux[1]])
                break;

            aux[0]++;
        }

        //suroeste
        aux = [reyNegro[0] + 1, reyNegro[1] - 1];
        if (aux[0] <= 7 && aux[1] >= 0 && piezasBlancas[aux[0]][aux[1]])
            if (nombres[aux[0]][aux[1]] == "peon") {
                piezaJaque = [aux[0], aux[1]];
                return true;
            }
        while (aux[0] <= 7 && aux[1] >= 0) {
            if (piezasBlancas[aux[0]][aux[1]]) {
                if (nombres[aux[0]][aux[1]] == "reina" || nombres[aux[0]][aux[1]] == "alfil") {
                    piezaJaque = [aux[0], aux[1]];
                    return true;
                }
                else
                    break;
            }
            if (piezasNegras[aux[0]][aux[1]])
                break;

            aux[0]++, aux[1]--;
        }

        //oeste
        aux = [reyNegro[0], reyNegro[1] - 1];
        while (aux[1] >= 0) {
            if (piezasBlancas[aux[0]][aux[1]]) {
                if (nombres[aux[0]][aux[1]] == "reina" || nombres[aux[0]][aux[1]] == "torre") {
                    piezaJaque = [aux[0], aux[1]];
                    return true;
                }
                else
                    break;
            }
            if (piezasNegras[aux[0]][aux[1]])
                break;

            aux[1]--;
        }

        //noroeste
        aux = [reyNegro[0] - 1, reyNegro[1] - 1];
        while (aux[0] >= 0 && aux[1] >= 0) {
            if (piezasBlancas[aux[0]][aux[1]]) {
                if (nombres[aux[0]][aux[1]] == "reina" || nombres[aux[0]][aux[1]] == "alfil") {
                    piezaJaque = [aux[0], aux[1]];
                    return true;
                }
                else
                    break;
            }
            if (piezasNegras[aux[0]][aux[1]])
                break;

            aux[0]--, aux[1]--;
        }

        //caballo
        if (reyNegro[0] - 1 >= 0 && reyNegro[1] + 2 <= 7) {
            if (piezasBlancas[[reyNegro[0] - 1][reyNegro[1] + 2]]) {
                if (nombres[[reyNegro[0] - 1][reyNegro[1] + 2]] == "caballo") {
                    piezaJaque = [reyNegro[0] - 1, reyNegro[1] + 2];
                    return true;
                }
            }
        }

        if (reyNegro[0] - 2 >= 0 && reyNegro[1] + 1 <= 7) {
            if (piezasBlancas[[reyNegro[0] - 2][reyNegro[1] + 1]]) {
                if (nombres[[reyNegro[0] - 2][reyNegro[1] + 1]] == "caballo") {
                    piezaJaque = [reyNegro[0] - 2, reyNegro[1] + 1];
                    return true;
                }
            }
        }

        if (reyNegro[0] + 2 <= 7 && reyNegro[1] + 1 <= 7) {
            if (piezasBlancas[[reyNegro[0] + 2][reyNegro[1] + 1]]) {
                if (nombres[[reyNegro[0] + 2][reyNegro[1] + 1]] == "caballo") {
                    piezaJaque = [reyNegro[0] + 2, reyNegro[1] + 1];
                    return true;
                }
            }
        }

        if (reyNegro[0] + 1 <= 7 && reyNegro[1] + 2 <= 7) {
            if (piezasBlancas[[reyNegro[0] + 1][reyNegro[1] + 2]]) {
                if (nombres[[reyNegro[0] + 1][reyNegro[1] + 2]] == "caballo") {
                    piezaJaque = [reyNegro[0] + 1, reyNegro[1] + 2];
                    return true;
                }
            }
        }

        if (reyNegro[0] + 2 <= 7 && reyNegro[1] - 1 >= 0) {
            if (piezasBlancas[[reyNegro[0] + 2][reyNegro[1] - 1]]) {
                if (nombres[[reyNegro[0] + 2][reyNegro[1] - 1]] == "caballo") {
                    piezaJaque = [reyNegro[0] + 2, reyNegro[1] - 1];
                    return true;
                }
            }
        }

        if (reyNegro[0] + 1 <= 7 && reyNegro[1] - 2 >= 0) {
            if (piezasBlancas[[reyNegro[0] + 1][reyNegro[1] - 2]]) {
                if (nombres[[reyNegro[0] + 1][reyNegro[1] - 2]] == "caballo") {
                    piezaJaque = [reyNegro[0] + 1, reyNegro[1] - 2];
                    return true;
                }
            }
        }

        if (reyNegro[0] - 1 >= 0 && reyNegro[1] - 2 >= 0) {
            if (piezasBlancas[[reyNegro[0] - 1][reyNegro[1] - 2]]) {
                if (nombres[[reyNegro[0] - 1][reyNegro[1] - 2]] == "caballo") {
                    piezaJaque = [reyNegro[0] - 1, reyNegro[1] - 2];
                    return true;
                }
            }
        }

        if (reyNegro[0] - 2 >= 0 && reyNegro[1] - 1 >= 0) {
            if (piezasBlancas[[reyNegro[0] - 2][reyNegro[1] - 1]]) {
                if (nombres[[reyNegro[0] - 2][reyNegro[1] - 1]] == "caballo") {
                    piezaJaque = [reyNegro[0] - 2, reyNegro[1] - 1];
                    return true;
                }
            }
        }

        return false;
    }
}

function tablas(jugador) {
    if (cantPiezasBlancas == 1 && cantPiezasNegras == 1)
        return true;

    if (jugador == "blancas") {
        if (cantPiezasBlancas <= 5) {
            for (let i = 0; i < 8; i++) {
                for (let j = 0; j < 8; j++) {
                    if (piezasBlancas[i][j]) {
                        if (nombres[i][j] == "peon" && !piezasNegras[i - 1][j])
                            return false
                        if (nombres[i][j] == "peon")
                            if (j + 1 <= 7 && piezasNegras[i - 1][j + 1] || j - 1 >= 0 && piezasNegras[i - 1][j - 1])
                                return false;
                            else if (nombres[i][j] != "rey")
                                return false;
                    }
                }
            }
            return movRey(jugador);
        }
        else
            return false;
    }
    else {
        if (cantPiezasNegras <= 5) {
            for (let i = 0; i < 8; i++) {
                for (let j = 0; j < 8; j++) {
                    if (piezasNegras[i][j]) {
                        if (nombres[i][j] == "peon" && !piezasBlancas[i + 1][j])
                            return false;
                        if (nombres[i][j] == "peon")
                            if (j + 1 <= 7 && piezasBlancas[i + 1][j + 1] || j - 1 >= 0 && piezasBlancas[i + 1][j - 1])
                                return false;
                            else if (nombres[i][j] != "rey")
                                return false;
                    }
                }
            }
            return movRey(jugador);
        }
        else
            return false;
    }
}

function defender(auxF, auxC, jugador) {
    let bandera = true;
    if (jugador == "blancas") {
        for (let i = 0; i <= 7; i++) {
            for (let j = 0; j <= 7; j++) {
                if (piezasBlancas[i][j] && validar(nombres[i][j], i, j, auxF, auxC, jugador)) {
                    let nombreCopy = nombres[auxF][auxC];
                    if (nombres[i][j] == "rey")
                        continue;

                    if (piezasNegras[auxF][auxC]) {
                        //comer sin que se vea
                        piezasNegras[auxF][auxC] = false;
                        bandera = false;
                    }

                    //mover la pieza sin que se vea
                    piezasBlancas[auxF][auxC] = true;
                    piezasBlancas[i][j] = false;
                    nombres[auxF][auxC] = nombres[i][j];
                    nombres[i][j] = "";

                    //checkeo de jaque
                    if (jaque(jugador)) {
                        //retrocede el movimiento
                        piezasBlancas[auxF][auxC] = false;
                        piezasBlancas[i][j] = true;
                        nombres[i][j] = nombres[auxF][auxC];
                        nombres[auxF][auxC] = nombreCopy;
                        if (!bandera) {
                            //retrocede la comida
                            piezasNegras[auxF][auxC] = true;
                        }
                    }
                    else {
                        //retrocede el movimiento
                        piezasBlancas[auxF][auxC] = false;
                        piezasBlancas[i][j] = true;
                        nombres[i][j] = nombres[auxF][auxC];
                        nombres[auxF][auxC] = nombreCopy;
                        if (!bandera) {
                            //retrocede la comida
                            piezasNegras[auxF][auxC] = true;
                        }

                        return true;
                    }
                }
            }
        }
    }
    else {
        for (let i = 0; i <= 7; i++) {
            for (let j = 0; j <= 7; j++) {
                if (piezasNegras[i][j] && validar(nombres[i][j], i, j, auxF, auxC, jugador)) {
                    let nombreCopy = nombres[auxF][auxC];
                    if (nombres[i][j] == "rey")
                        continue;

                    if (piezasBlancas[auxF][auxC]) {
                        //comer sin que se vea
                        piezasBlancas[auxF][auxC] = false;
                        bandera = false;
                    }

                    //mover la pieza sin que se vea
                    piezasNegras[auxF][auxC] = true;
                    piezasNegras[i][j] = false;
                    nombres[auxF][auxC] = nombres[i][j];
                    nombres[i][j] = "";

                    //checkeo de jaque
                    if (jaque(jugador)) {
                        //retrocede el movimiento
                        piezasNegras[auxF][auxC] = false;
                        piezasNegras[i][j] = true;
                        nombres[i][j] = nombres[auxF][auxC];
                        nombres[auxF][auxC] = nombreCopy;
                        if (!bandera) {
                            //retrocede la comida
                            piezasBlancas[auxF][auxC] = true;
                        }
                    }
                    else {
                        //retrocede el movimiento
                        piezasNegras[auxF][auxC] = false;
                        piezasNegras[i][j] = true;
                        nombres[i][j] = nombres[auxF][auxC];
                        nombres[auxF][auxC] = nombreCopy;
                        if (!bandera) {
                            //retrocede la comida
                            piezasBlancas[auxF][auxC] = true;
                        }

                        return true;
                    }
                }
            }
        }
    }
    return false;
}

function mate(jugador) {
    let rey = [];
    if (jugador == "blancas")
        rey = reyBlanco;
    else
        rey = reyNegro;

    switch (nombres[piezaJaque[0]][piezaJaque[1]]) {
        case "torre":
            if (piezaJaque[0] == rey[0]) {
                if (piezaJaque[1] > rey[1]) {
                    let aux = rey[1] + 1;
                    while (aux <= piezaJaque[1]) {
                        if (defender(piezaJaque[0], aux, jugador))
                            return false;
                        aux++;
                    }
                }
                else {
                    let aux = rey[1] - 1;
                    while (aux >= piezaJaque[1]) {
                        if (defender(piezaJaque[0], aux, jugador))
                            return false;
                        aux--;
                    }
                }
            }
            else {
                if (piezaJaque[0] > rey[0]) {
                    let aux = rey[0] + 1;
                    while (aux <= piezaJaque[0]) {
                        if (defender(piezaJaque[0], aux, jugador))
                            return false;
                        aux++;
                    }
                }
                else {
                    let aux = rey[0] - 1;
                    while (aux >= piezaJaque[0]) {
                        if (defender(piezaJaque[0], aux, jugador))
                            return false;
                        aux--;
                    }
                }
            }

            break;

        case "alfil":
            if (piezaJaque[0] > rey[0] && piezaJaque[1] > rey[1]) {
                let aux = [rey[0] + 1, rey[1] + 1];
                while (aux[0] <= piezaJaque[0] && aux[1] <= piezaJaque[1]) {
                    if (defender(aux[0], aux[1], jugador))
                        return false;
                    aux[0]++, aux[1]++;
                }
            }
            else if (piezaJaque[0] > rey[0] && piezaJaque[1] < rey[1]) {
                let aux = [rey[0] + 1, rey[1] - 1];
                while (aux[0] <= piezaJaque[0] && aux[1] >= piezaJaque[1]) {
                    if (defender(aux[0], aux[1], jugador))
                        return false;
                    aux[0]++, aux[1]--;
                }
            }
            else if (piezaJaque[0] < rey[0] && piezaJaque[1] < rey[1]) {
                let aux = [rey[0] - 1, rey[1] - 1];
                while (aux[0] >= piezaJaque[0] && aux[1] >= piezaJaque[1]) {
                    if (defender(aux[0], aux[1], jugador))
                        return false;
                    aux[0]--, aux[1]--;
                }
            }
            else if (piezaJaque[0] <= rey[0] && piezaJaque[1] >= rey[1]) {
                let aux = [rey[0] - 1, rey[1] + 1];
                while (aux[0] >= piezaJaque[0] && aux[1] <= piezaJaque[1]) {
                    if (defender(aux[0], aux[1], jugador))
                        return false;
                    aux[0]--, aux[1]++;
                }
            }

            break;

        case "reina":
            if (piezaJaque[0] == rey[0]) {
                if (piezaJaque[1] > rey[1]) {
                    let aux = rey[1] + 1;
                    while (aux <= piezaJaque[1]) {
                        if (defender(piezaJaque[0], aux, jugador))
                            return false;
                        aux++;
                    }
                }
                else {
                    let aux = rey[1] - 1;
                    while (aux >= piezaJaque[1]) {
                        if (defender(piezaJaque[0], aux, jugador))
                            return false;
                        aux--;
                    }
                }
            }
            else if (piezaJaque[1] == rey[1]) {
                if (piezaJaque[0] > rey[0]) {
                    let aux = rey[0] + 1;
                    while (aux <= piezaJaque[0]) {
                        if (defender(aux, piezaJaque[1], jugador))
                            return false;
                        aux++;
                    }
                }
                else {
                    let aux = rey[0] - 1;
                    while (aux >= piezaJaque[0]) {
                        if (defender(aux, piezaJaque[1], jugador))
                            return false;
                        aux--;
                    }
                }
            }
            else if (piezaJaque[0] > rey[0] && piezaJaque[1] > rey[1]) {
                let aux = [rey[0] + 1, rey[1] + 1];
                while (aux[0] <= piezaJaque[0] && aux[1] <= piezaJaque[1]) {
                    if (defender(aux[0], aux[1], jugador))
                        return false;
                    aux[0]++, aux[1]++;
                }
            }
            else if (piezaJaque[0] > rey[0] && piezaJaque[1] < rey[1]) {
                let aux = [rey[0] + 1, rey[1] - 1];
                while (aux[0] <= piezaJaque[0] && aux[1] >= piezaJaque[1]) {
                    if (defender(aux[0], aux[1], jugador))
                        return false;
                    aux[0]++, aux[1]--;
                }
            }
            else if (piezaJaque[0] < rey[0] && piezaJaque[1] < rey[1]) {
                let aux = [rey[0] - 1, rey[1] - 1];
                while (aux[0] >= piezaJaque[0] && aux[1] >= piezaJaque[1]) {
                    if (defender(aux[0], aux[1], jugador))
                        return false;
                    aux[0]--, aux[1]--;
                }
            }
            else if (piezaJaque[0] < rey[0] && piezaJaque[1] > rey[1]) {
                let aux = [rey[0] - 1, rey[1] + 1];
                while (aux[0] >= piezaJaque[0] && aux[1] <= piezaJaque[1]) {
                    if (defender(aux[0], aux[1], jugador))
                        return false;
                    aux[0]--, aux[1]++;
                }
            }

            break;
    }

    //comprobar si el rey puede escapar
    return movRey(jugador);
}

function movRey(jugador) {
    let flag = false;
    let rey = [];
    if (jugador == "blancas") {
        rey = reyBlanco;
        if (rey[0] + 1 <= 7 && !piezasBlancas[rey[0] + 1][rey[1]]) {
            piezasBlancas[rey[0]][rey[1]] = false;
            rey[0]++;
            piezasBlancas[rey[0]][rey[1]] = true;
            if (piezasNegras[rey[0]][rey[1]]) {
                flag = true;
                piezasNegras[rey[0]][rey[1]] = false;
            }
            if (!jaque(jugador)) {
                if (flag)
                    piezasNegras[rey[0]][rey[1]] = true;

                piezasBlancas[rey[0]][rey[1]] = false;
                rey[0]--;
                piezasBlancas[rey[0]][rey[1]] = true;
                return false;
            }
            else {
                if (flag)
                    piezasNegras[rey[0]][rey[1]] = true;

                piezasBlancas[rey[0]][rey[1]] = false;
                rey[0]--;
                piezasBlancas[rey[0]][rey[1]] = true;
            }
        }
        if (rey[0] - 1 >= 0 && !piezasBlancas[rey[0] - 1][rey[1]]) {
            piezasBlancas[rey[0]][rey[1]] = false;
            rey[0]--;
            piezasBlancas[rey[0]][rey[1]] = true;
            if (piezasNegras[rey[0]][rey[1]]) {
                flag = true;
                piezasNegras[rey[0]][rey[1]] = false;
            }
            if (!jaque(jugador)) {
                if (flag)
                    piezasNegras[rey[0]][rey[1]] = true;

                piezasBlancas[rey[0]][rey[1]] = false;
                rey[0]++;
                piezasBlancas[rey[0]][rey[1]] = true;
                return false;
            }
            else {
                if (flag)
                    piezasNegras[rey[0]][rey[1]] = true;

                piezasBlancas[rey[0]][rey[1]] = false;
                rey[0]++;
                piezasBlancas[rey[0]][rey[1]] = true;
            }
        }
        if (rey[1] + 1 <= 7 && !piezasBlancas[rey[0]][rey[1] + 1]) {
            piezasBlancas[rey[0]][rey[1]] = false;
            rey[1]++;
            piezasBlancas[rey[0]][rey[1]] = true;
            if (piezasNegras[rey[0]][rey[1]]) {
                flag = true;
                piezasNegras[rey[0]][rey[1]] = false;
            }
            if (!jaque(jugador)) {
                if (flag)
                    piezasNegras[rey[0]][rey[1]] = true;

                piezasBlancas[rey[0]][rey[1]] = false;
                rey[1]--;
                piezasBlancas[rey[0]][rey[1]] = true;
                return false;
            }
            else {
                if (flag)
                    piezasNegras[rey[0]][rey[1]] = true;

                piezasBlancas[rey[0]][rey[1]] = false;
                rey[1]--;
                piezasBlancas[rey[0]][rey[1]] = true;
            }
        }
        if (rey[1] - 1 >= 0 && !piezasBlancas[rey[0]][rey[1] - 1]) {
            piezasBlancas[rey[0]][rey[1]] = false;
            rey[1]--;
            piezasBlancas[rey[0]][rey[1]] = true;
            if (piezasNegras[rey[0]][rey[1]]) {
                flag = true;
                piezasNegras[rey[0]][rey[1]] = false;
            }
            if (!jaque(jugador)) {
                if (flag)
                    piezasNegras[rey[0]][rey[1]] = true;

                piezasBlancas[rey[0]][rey[1]] = false;
                rey[1]++;
                piezasBlancas[rey[0]][rey[1]] = true;
                return false;
            }
            else {
                if (flag)
                    piezasNegras[rey[0]][rey[1]] = true;

                piezasBlancas[rey[0]][rey[1]] = false;
                rey[1]++;
                piezasBlancas[rey[0]][rey[1]] = true;
            }
        }
        if (rey[0] + 1 <= 7 && rey[1] + 1 <= 7 && !piezasBlancas[rey[0] + 1][rey[1] + 1]) {
            piezasBlancas[rey[0]][rey[1]] = false;
            rey[0]++, rey[1]++;
            piezasBlancas[rey[0]][rey[1]] = true;
            if (piezasNegras[rey[0]][rey[1]]) {
                flag = true;
                piezasNegras[rey[0]][rey[1]] = false;
            }
            if (!jaque(jugador)) {
                if (flag)
                    piezasNegras[rey[0]][rey[1]] = true;

                piezasBlancas[rey[0]][rey[1]] = false;
                rey[0]--, rey[1]--;
                piezasBlancas[rey[0]][rey[1]] = true;
                return false;
            }
            else {
                if (flag)
                    piezasNegras[rey[0]][rey[1]] = true;

                piezasBlancas[rey[0]][rey[1]] = false;
                rey[0]--, rey[1]--;
                piezasBlancas[rey[0]][rey[1]] = true;
            }
        }
        if (rey[0] - 1 >= 0 && rey[1] - 1 >= 0 && !piezasBlancas[rey[0] - 1][rey[1] - 1]) {
            piezasBlancas[rey[0]][rey[1]] = false;
            rey[0]--, rey[1]--;
            piezasBlancas[rey[0]][rey[1]] = true;
            if (piezasNegras[rey[0]][rey[1]]) {
                flag = true;
                piezasNegras[rey[0]][rey[1]] = false;
            }
            if (!jaque(jugador)) {
                if (flag)
                    piezasNegras[rey[0]][rey[1]] = true;

                piezasBlancas[rey[0]][rey[1]] = false;
                rey[0]++, rey[1]++;
                piezasBlancas[rey[0]][rey[1]] = true;
                return false;
            }
            else {
                if (flag)
                    piezasNegras[rey[0]][rey[1]] = true;

                piezasBlancas[rey[0]][rey[1]] = false;
                rey[0]++, rey[1]++;
                piezasBlancas[rey[0]][rey[1]] = true;
            }
        }
        if (rey[0] + 1 <= 7 && rey[1] - 1 >= 0 && !piezasBlancas[rey[0] + 1][rey[1] - 1]) {
            piezasBlancas[rey[0]][rey[1]] = false;
            rey[0]++, rey[1]--;
            piezasBlancas[rey[0]][rey[1]] = true;
            if (piezasNegras[rey[0]][rey[1]]) {
                flag = true;
                piezasNegras[rey[0]][rey[1]] = false;
            }
            if (!jaque(jugador)) {
                if (flag)
                    piezasNegras[rey[0]][rey[1]] = true;

                piezasBlancas[rey[0]][rey[1]] = false;
                rey[0]--, rey[1]++;
                piezasBlancas[rey[0]][rey[1]] = true;
                return false;
            }
            else {
                if (flag)
                    piezasNegras[rey[0]][rey[1]] = true;

                piezasBlancas[rey[0]][rey[1]] = false;
                rey[0]--, rey[1]++;
                piezasBlancas[rey[0]][rey[1]] = true;
            }
        }
        if (rey[0] - 1 >= 0 && rey[1] + 1 <= 7 && !piezasBlancas[rey[0] - 1][rey[1] + 1]) {
            piezasBlancas[rey[0]][rey[1]] = false;
            rey[0]--, rey[1]++;
            piezasBlancas[rey[0]][rey[1]] = true;
            if (piezasNegras[rey[0]][rey[1]]) {
                flag = true;
                piezasNegras[rey[0]][rey[1]] = false;
            }
            if (!jaque(jugador)) {
                if (flag)
                    piezasNegras[rey[0]][rey[1]] = true;

                piezasBlancas[rey[0]][rey[1]] = false;
                rey[0]++, rey[1]--;
                piezasBlancas[rey[0]][rey[1]] = true;
                return false;
            }
            else {
                if (flag)
                    piezasNegras[rey[0]][rey[1]] = true;

                piezasBlancas[rey[0]][rey[1]] = false;
                rey[0]++, rey[1]--;
                piezasBlancas[rey[0]][rey[1]] = true;
            }
        }

        return true;

    }//negras
    else {
        rey = reyNegro;
        if (rey[0] + 1 <= 7 && !piezasNegras[rey[0] + 1][rey[1]]) {
            piezasNegras[rey[0]][rey[1]] = false;
            rey[0]++;
            piezasNegras[rey[0]][rey[1]] = true;
            if (piezasNegras[rey[0]][rey[1]]) {
                flag = true;
                piezasNegras[rey[0]][rey[1]] = false;
            }
            if (!jaque(jugador)) {
                if (flag)
                    piezasNegras[rey[0]][rey[1]] = true;

                piezasNegras[rey[0]][rey[1]] = false;
                rey[0]--;
                piezasNegras[rey[0]][rey[1]] = true;
                return false;
            }
            else {
                if (flag)
                    piezasNegras[rey[0]][rey[1]] = true;

                piezasNegras[rey[0]][rey[1]] = false;
                rey[0]--;
                piezasNegras[rey[0]][rey[1]] = true;
            }
        }
        if (rey[0] - 1 >= 0 && !piezasNegras[rey[0] - 1][rey[1]]) {
            piezasNegras[rey[0]][rey[1]] = false;
            rey[0]--;
            piezasNegras[rey[0]][rey[1]] = true;
            if (piezasNegras[rey[0]][rey[1]]) {
                flag = true;
                piezasNegras[rey[0]][rey[1]] = false;
            }
            if (!jaque(jugador)) {
                if (flag)
                    piezasNegras[rey[0]][rey[1]] = true;

                piezasNegras[rey[0]][rey[1]] = false;
                rey[0]++;
                piezasNegras[rey[0]][rey[1]] = true;
                return false;
            }
            else {
                if (flag)
                    piezasNegras[rey[0]][rey[1]] = true;

                piezasNegras[rey[0]][rey[1]] = false;
                rey[0]++;
                piezasNegras[rey[0]][rey[1]] = true;
            }
        }
        if (rey[1] + 1 <= 7 && !piezasNegras[rey[0]][rey[1] + 1]) {
            piezasNegras[rey[0]][rey[1]] = false;
            rey[1]++;
            piezasNegras[rey[0]][rey[1]] = true;
            if (piezasNegras[rey[0]][rey[1]]) {
                flag = true;
                piezasNegras[rey[0]][rey[1]] = false;
            }
            if (!jaque(jugador)) {
                if (flag)
                    piezasNegras[rey[0]][rey[1]] = true;

                piezasNegras[rey[0]][rey[1]] = false;
                rey[1]--;
                piezasNegras[rey[0]][rey[1]] = true;
                return false;
            }
            else {
                if (flag)
                    piezasNegras[rey[0]][rey[1]] = true;

                piezasNegras[rey[0]][rey[1]] = false;
                rey[1]--;
                piezasNegras[rey[0]][rey[1]] = true;
            }
        }
        if (rey[1] - 1 >= 0 && !piezasNegras[rey[0]][rey[1] - 1]) {
            piezasNegras[rey[0]][rey[1]] = false;
            rey[1]--;
            piezasNegras[rey[0]][rey[1]] = true;
            if (piezasNegras[rey[0]][rey[1]]) {
                flag = true;
                piezasNegras[rey[0]][rey[1]] = false;
            }
            if (!jaque(jugador)) {
                if (flag)
                    piezasNegras[rey[0]][rey[1]] = true;

                piezasNegras[rey[0]][rey[1]] = false;
                rey[1]++;
                piezasNegras[rey[0]][rey[1]] = true;
                return false;
            }
            else {
                if (flag)
                    piezasNegras[rey[0]][rey[1]] = true;

                piezasNegras[rey[0]][rey[1]] = false;
                rey[1]++;
                piezasNegras[rey[0]][rey[1]] = true;
            }
        }
        if (rey[0] + 1 <= 7 && rey[1] + 1 <= 7 && !piezasNegras[rey[0] + 1][rey[1] + 1]) {
            piezasNegras[rey[0]][rey[1]] = false;
            rey[0]++, rey[1]++;
            piezasNegras[rey[0]][rey[1]] = true;
            if (piezasNegras[rey[0]][rey[1]]) {
                flag = true;
                piezasNegras[rey[0]][rey[1]] = false;
            }
            if (!jaque(jugador)) {
                if (flag)
                    piezasNegras[rey[0]][rey[1]] = true;

                piezasNegras[rey[0]][rey[1]] = false;
                rey[0]--, rey[1]--;
                piezasNegras[rey[0]][rey[1]] = true;
                return false;
            }
            else {
                if (flag)
                    piezasNegras[rey[0]][rey[1]] = true;

                piezasNegras[rey[0]][rey[1]] = false;
                rey[0]--, rey[1]--;
                piezasNegras[rey[0]][rey[1]] = true;
            }
        }
        if (rey[0] - 1 >= 0 && rey[1] - 1 >= 0 && !piezasNegras[rey[0] - 1][rey[1] - 1]) {
            piezasNegras[rey[0]][rey[1]] = false;
            rey[0]--, rey[1]--;
            piezasNegras[rey[0]][rey[1]] = true;
            if (piezasNegras[rey[0]][rey[1]]) {
                flag = true;
                piezasNegras[rey[0]][rey[1]] = false;
            }
            if (!jaque(jugador)) {
                if (flag)
                    piezasNegras[rey[0]][rey[1]] = true;

                piezasNegras[rey[0]][rey[1]] = false;
                rey[0]++, rey[1]++;
                piezasNegras[rey[0]][rey[1]] = true;
                return false;
            }
            else {
                if (flag)
                    piezasNegras[rey[0]][rey[1]] = true;

                piezasNegras[rey[0]][rey[1]] = false;
                rey[0]++, rey[1]++;
                piezasNegras[rey[0]][rey[1]] = true;
            }
        }
        if (rey[0] + 1 <= 7 && rey[1] - 1 >= 0 && !piezasNegras[rey[0] + 1][rey[1] - 1]) {
            piezasNegras[rey[0]][rey[1]] = false;
            rey[0]++, rey[1]--;
            piezasNegras[rey[0]][rey[1]] = true;
            if (piezasNegras[rey[0]][rey[1]]) {
                flag = true;
                piezasNegras[rey[0]][rey[1]] = false;
            }
            if (!jaque(jugador)) {
                if (flag)
                    piezasNegras[rey[0]][rey[1]] = true;

                piezasNegras[rey[0]][rey[1]] = false;
                rey[0]--, rey[1]++;
                piezasNegras[rey[0]][rey[1]] = true;
                return false;
            }
            else {
                if (flag)
                    piezasNegras[rey[0]][rey[1]] = true;

                piezasNegras[rey[0]][rey[1]] = false;
                rey[0]--, rey[1]++;
                piezasNegras[rey[0]][rey[1]] = true;
            }
        }
        if (rey[0] - 1 >= 0 && rey[1] + 1 <= 7 && !piezasNegras[rey[0] - 1][rey[1] + 1]) {
            piezasNegras[rey[0]][rey[1]] = false;
            rey[0]--, rey[1]++;
            piezasNegras[rey[0]][rey[1]] = true;
            if (piezasNegras[rey[0]][rey[1]]) {
                flag = true;
                piezasNegras[rey[0]][rey[1]] = false;
            }
            if (!jaque(jugador)) {
                if (flag)
                    piezasNegras[rey[0]][rey[1]] = true;

                piezasNegras[rey[0]][rey[1]] = false;
                rey[0]++, rey[1]--;
                piezasNegras[rey[0]][rey[1]] = true;
                return false;
            }
            else {
                if (flag)
                    piezasNegras[rey[0]][rey[1]] = true;

                piezasNegras[rey[0]][rey[1]] = false;
                rey[0]++, rey[1]--;
                piezasNegras[rey[0]][rey[1]] = true;
            }
        }

        return true;
    }
}

let btnCerrar = document.querySelector(".cerrar");
btnCerrar.addEventListener("click", () => {
    let contenedor = document.querySelector(".contenedor");
    contenedor.style.visibility = "hidden";
});




