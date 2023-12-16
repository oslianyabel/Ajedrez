var select = null;
var aux = null;
var reyRojo;
var reyNegroRojoFlag = false;
var reyBlancoRojoFlag = false;
const board = document.getElementById("board");
const cell = document.querySelector(".cell");
var perdidasBlancas = document.querySelector("#perdidasBlancas");
var perdidasNegras = document.querySelector("#perdidasNegras");
const sonidoBlancas = document.getElementById("sonidoBlancas");
const sonidoNegras = document.getElementById("sonidoNegras");
const sonidoComer = document.getElementById("sonidoComer");
const sonidoCoronar = document.getElementById("sonidoCoronar");
const sonidoEnroque = document.getElementById("sonidoEnroque");
const sonidoJaque = document.getElementById("sonidoJaque");
const sonidoTablas = document.getElementById("sonidoTablas");

function accion(e) {
    let bandera = true;
    let bandera2 = true;
    let celda = e.target;
    let torreDB1 = document.querySelector(".torreDB1");
    let torreIB1 = document.querySelector(".torreIB1");
    let torreDN1 = document.querySelector(".torreDN1");
    let torreIN1 = document.querySelector(".torreIN1");
    let torreDB2 = document.querySelector(".torreDB2");
    let torreIB2 = document.querySelector(".torreIB2");
    let torreDN2 = document.querySelector(".torreDN2");
    let torreIN2 = document.querySelector(".torreIN2");

    //seleccionar pieza
    if (jugador == "blancas") {
        if (piezasBlancas[parseInt(celda.dataset.row)][parseInt(celda.dataset.col)]) {
            if (select != null)
                select.classList.remove("select");
            celda.classList.add("select");
            if (aux != null)
                aux.classList.remove("select2");
            select = celda;
        }//validar que el movimiento sea legal
        else if (select != null && validar(
            select.dataset.name,
            select.dataset.row,
            select.dataset.col,
            parseInt(celda.dataset.row),
            parseInt(celda.dataset.col),
            jugador)) {

            if (enrocar) {
                console.log("enroque blanco");
                if (parseInt(celda.dataset.col) == 6) {
                    if (jaque(jugador)) {
                        enrocar = false;
                        console.log("estás en jaque");
                        return;
                    }

                    while (reyBlanco[1] < 6) {
                        piezasBlancas[reyBlanco[0]][reyBlanco[1]] = false;
                        reyBlanco[1]++;
                        piezasBlancas[reyBlanco[0]][reyBlanco[1]] = true;
                        if (jaque(jugador)) {
                            piezasBlancas[reyBlanco[0]][reyBlanco[1]] = false;
                            reyBlanco[1] = 4;
                            piezasBlancas[reyBlanco[0]][reyBlanco[1]] = true;
                            enrocar = false;
                            console.log("el rey no puede pasar por jaque");
                            return;
                        }
                    }

                    piezasBlancas[7][5] = true;
                    nombres[7][5] = "torre";
                    piezasBlancas[7][7] = false;
                    nombres[7][7] = "";
                    torreDB2.dataset.name = torreDB1.dataset.name;
                    torreDB2.textContent = torreDB1.textContent;
                    torreDB1.dataset.name = "";
                    torreDB1.textContent = "";
                }
                else {
                    if (jaque(jugador)) {
                        enrocar = false;
                        return;
                    }

                    while (reyBlanco[1] > 2) {
                        piezasBlancas[reyBlanco[0]][reyBlanco[1]] = false;
                        reyBlanco[1]--;
                        piezasBlancas[reyBlanco[0]][reyBlanco[1]] = true;
                        if (jaque(jugador)) {
                            piezasBlancas[reyBlanco[0]][reyBlanco[1]] = false;
                            reyBlanco[1] = 4;
                            piezasBlancas[reyBlanco[0]][reyBlanco[1]] = true;
                            enrocar = false;
                            return;
                        }
                    }

                    piezasBlancas[7][3] = true;
                    nombres[7][3] = "torre";
                    piezasBlancas[7][0] = false;
                    nombres[7][0] = "";
                    torreIB2.dataset.name = torreIB1.dataset.name;
                    torreIB2.textContent = torreIB1.textContent;
                    torreIB1.dataset.name = "";
                    torreIB1.textContent = "";
                }
                piezasBlancas[reyBlanco[0]][reyBlanco[1]] = false;
                reyBlanco[1] = 4;
                piezasBlancas[reyBlanco[0]][reyBlanco[1]] = true;

                piezasBlancas[parseInt(celda.dataset.row)][parseInt(celda.dataset.col)] = true;
                piezasBlancas[select.dataset.row][select.dataset.col] = false;
                nombres[parseInt(celda.dataset.row)][parseInt(celda.dataset.col)] = select.dataset.name;
                nombres[select.dataset.row][select.dataset.col] = "";

                reyBlanco = [parseInt(celda.dataset.row), parseInt(celda.dataset.col)];

                select.classList.remove("select");
                aux = celda;
                aux.classList.add("select2");
                celda.dataset.name = select.dataset.name;
                select.dataset.name = "";
                celda.textContent = select.textContent;
                select.textContent = "";
                sonidoEnroque.play();
                jugador = "negras";
                board.style.transform = "rotate(180deg)";
                cell.style.transform = "rotate(180deg)";
                select = null;
                enrocar = false;
                return;
            }

            //copia de la posicion actual de la pieza
            let nombreCopy = nombres[parseInt(celda.dataset.row)][parseInt(celda.dataset.col)];
            let reyBlancoCopy = null;
            if (piezasNegras[parseInt(celda.dataset.row)][parseInt(celda.dataset.col)]) {
                //comer sin que se vea
                piezasNegras[parseInt(celda.dataset.row)][parseInt(celda.dataset.col)] = false;
                bandera = false;
                cantPiezasNegras--;
            }
            if (select.dataset.name == "rey") {
                //mantener el control del rey
                reyBlancoCopy = [reyBlanco[0], reyBlanco[1]];
                reyBlanco = [parseInt(celda.dataset.row), parseInt(celda.dataset.col)];
                bandera2 = false;
            }
            //mover la pieza sin que se vea
            piezasBlancas[parseInt(celda.dataset.row)][parseInt(celda.dataset.col)] = true;
            piezasBlancas[select.dataset.row][select.dataset.col] = false;
            nombres[parseInt(celda.dataset.row)][parseInt(celda.dataset.col)] = select.dataset.name;
            nombres[select.dataset.row][select.dataset.col] = "";

            //checkeo de jaque
            if (jaque(jugador)) {
                //retrocede el movimiento
                piezasBlancas[parseInt(celda.dataset.row)][parseInt(celda.dataset.col)] = false;
                piezasBlancas[select.dataset.row][select.dataset.col] = true;
                nombres[select.dataset.row][select.dataset.col] = nombres[parseInt(celda.dataset.row)][parseInt(celda.dataset.col)];
                nombres[parseInt(celda.dataset.row)][parseInt(celda.dataset.col)] = nombreCopy;
                if (!bandera) {
                    //retrocede la comida
                    piezasNegras[parseInt(celda.dataset.row)][parseInt(celda.dataset.col)] = true;
                    cantPiezasNegras++;
                }

                if (!bandera2) {
                    //retrocede al rey
                    reyBlanco[0] = reyBlancoCopy[0];
                    reyBlanco[1] = reyBlancoCopy[1]
                }


                console.log("jaque");
                sonidoJaque.play();
            }
            else {//continuar con el movimiento
                if (bandera)//si no se comió que suene a movimiento
                    sonidoBlancas.play();
                else {
                    //si se comió que salga en el cementerio y suene a comida
                    const pieza = document.createElement("div");
                    pieza.textContent = celda.textContent;
                    perdidasNegras.appendChild(pieza);
                    sonidoComer.play();
                }

                if (select.dataset.name == "rey")
                    enroqueBlanco = false;

                //terminar de mover la pieza (que se vea)
                if (reyBlancoRojoFlag) {
                    reyRojo.style.textShadow = "none";
                    reyBlancoRojoFlag = false;
                }

                select.classList.remove("select");
                aux = celda;
                aux.classList.add("select2");
                celda.dataset.name = select.dataset.name;
                select.dataset.name = "";
                celda.textContent = select.textContent;
                select.textContent = "";
                jugador = "negras";
                /*board.style.transform = "rotate(180deg)";
                cell.style.transform = "rotate(180deg)";*/

                if (jaque(jugador)) {
                    sonidoJaque.play();

                    reyNegroRojoFlag = true;
                    reyRojo = document.querySelector(`[data-row = "${reyNegro[0]}"][data-col = "${reyNegro[1]}"]`);
                    reyRojo.style.textShadow = "0 0 5px red";

                    if (mate(jugador)) {
                        clearInterval(partida);
                        var gameOver = document.querySelector("#gameOver");
                        gameOver.textContent = "Ganan las Blancas";
                        let description = document.querySelector("#description");
                        description.textContent = "Jaque Mate"
                        var contenedor = document.querySelector(".contenedor");
                        contenedor.style.visibility = "visible";
                        sonidoVictoria.play();
                    }
                }

                if(tablas(jugador)){
                    console.log("tablas");
                    clearInterval(partida);
                    var gameOver = document.querySelector("#gameOver");
                    gameOver.textContent = "Tablas";
                    var contenedor = document.querySelector(".contenedor");
                    contenedor.style.visibility = "visible";
                    sonidoTablas.play();
                }

                select = null;
            }
        }
    }//negras
    else {
        if (piezasNegras[parseInt(celda.dataset.row)][parseInt(celda.dataset.col)]) {
            if (select != null)
                select.classList.remove("select");
            celda.classList.add("select");
            if (aux != null)
                aux.classList.remove("select2");
            select = celda;
        }
        else if (select != null && validar(
            select.dataset.name,
            select.dataset.row,
            select.dataset.col,
            parseInt(celda.dataset.row),
            parseInt(celda.dataset.col),
            jugador)) {

            if (enrocar) {
                console.log("enroque negro");
                if (parseInt(celda.dataset.col) == 6) {
                    if (jaque(jugador)) {
                        enrocar = false;
                        console.log("estás en jaque");
                        return;
                    }

                    while (reyNegro[1] < 6) {
                        piezasNegras[reyNegro[0]][reyNegro[1]] = false;
                        reyNegro[1]++;
                        piezasNegras[reyNegro[0]][reyNegro[1]] = true;
                        if (jaque(jugador)) {
                            piezasNegras[reyNegro[0]][reyNegro[1]] = false;
                            reyNegro[1] = 4;
                            piezasNegras[reyNegro[0]][reyNegro[1]] = true;
                            enrocar = false;
                            console.log("el rey no puede pasar por jaque");
                            return;
                        }
                    }

                    piezasNegras[0][5] = true;
                    nombres[0][5] = "torre";
                    piezasNegras[0][7] = false;
                    nombres[0][7] = "";
                    torreDN2.dataset.name = torreDN1.dataset.name;
                    torreDN2.textContent = torreDN1.textContent;
                    torreDN1.dataset.name = "";
                    torreDN1.textContent = "";
                }
                else {
                    if (jaque(jugador)) {
                        enrocar = false;
                        return;
                    }

                    while (reyNegro[1] > 2) {
                        piezasNegras[reyNegro[0]][reyNegro[1]] = false;
                        reyNegro[1]--;
                        piezasNegras[reyNegro[0]][reyNegro[1]] = true;
                        if (jaque(jugador)) {
                            piezasNegras[reyNegro[0]][reyNegro[1]] = false;
                            reyNegro[1] = 4;
                            piezasNegras[reyNegro[0]][reyNegro[1]] = true;
                            enrocar = false;
                            return;
                        }
                    }

                    piezasNegras[0][3] = true;
                    nombres[0][3] = "torre";
                    piezasNegras[0][0] = false;
                    nombres[0][0] = "";
                    torreIN2.dataset.name = torreIN1.dataset.name;
                    torreIN2.textContent = torreIN1.textContent;
                    torreIN1.dataset.name = "";
                    torreIN1.textContent = "";
                }

                piezasNegras[reyNegro[0]][reyNegro[1]] = false;
                reyNegro[1] = 4;
                piezasNegras[reyNegro[0]][reyNegro[1]] = true;

                piezasNegras[parseInt(celda.dataset.row)][parseInt(celda.dataset.col)] = true;
                piezasNegras[select.dataset.row][select.dataset.col] = false;
                nombres[parseInt(celda.dataset.row)][parseInt(celda.dataset.col)] = select.dataset.name;
                nombres[select.dataset.row][select.dataset.col] = "";

                reyNegro = [parseInt(celda.dataset.row), parseInt(celda.dataset.col)];

                select.classList.remove("select");
                aux = celda;
                aux.classList.add("select2");
                celda.dataset.name = select.dataset.name;
                select.dataset.name = "";
                celda.textContent = select.textContent;
                select.textContent = "";
                sonidoEnroque.play();
                jugador = "blancas";
                select = null;
                enrocar = false;
                return;
            }

            let nombreCopy = nombres[parseInt(celda.dataset.row)][parseInt(celda.dataset.col)];
            let reyNegroCopy = null;
            if (piezasBlancas[parseInt(celda.dataset.row)][parseInt(celda.dataset.col)]) {
                piezasBlancas[parseInt(celda.dataset.row)][parseInt(celda.dataset.col)] = false;
                bandera = false;
                cantPiezasBlancas--;
            }
            if (select.dataset.name == "rey") {
                reyNegroCopy = [reyNegro[0], reyNegro[1]];
                reyNegro = [parseInt(celda.dataset.row), parseInt(celda.dataset.col)];
                bandera2 = false;
            }

            piezasNegras[parseInt(celda.dataset.row)][parseInt(celda.dataset.col)] = true;
            piezasNegras[select.dataset.row][select.dataset.col] = false;
            nombres[parseInt(celda.dataset.row)][parseInt(celda.dataset.col)] = select.dataset.name;
            nombres[select.dataset.row][select.dataset.col] = "";

            //checkeo de jaque
            if (jaque(jugador)) {
                //retrocede las acciones
                piezasNegras[parseInt(celda.dataset.row)][parseInt(celda.dataset.col)] = false;
                piezasNegras[select.dataset.row][select.dataset.col] = true;
                if (!bandera) {
                    cantPiezasBlancas++;
                    piezasBlancas[parseInt(celda.dataset.row)][parseInt(celda.dataset.col)] = true;
                }
                nombres[select.dataset.row][select.dataset.col] = nombres[parseInt(celda.dataset.row)][parseInt(celda.dataset.col)];
                nombres[parseInt(celda.dataset.row)][parseInt(celda.dataset.col)] = nombreCopy;
                if (!bandera2)
                    reyNegro = [reyNegroCopy[0], reyNegroCopy[1]];

                console.log("jaque para las", jugador);
                sonidoJaque.play();
            }
            else {
                if (bandera)
                    sonidoNegras.play();
                else {
                    const pieza = document.createElement("div");
                    pieza.textContent = celda.textContent;
                    perdidasBlancas.appendChild(pieza);
                    sonidoComer.play();
                }

                if (select.dataset.name == "rey")
                    enroqueNegro = false;

                if (reyNegroRojoFlag) {
                    reyRojo.style.textShadow = "none";
                    reyNegroRojoFlag = false;
                }

                select.classList.remove("select");
                aux = celda;
                aux.classList.add("select2");
                celda.dataset.name = select.dataset.name;
                select.dataset.name = "";
                celda.textContent = select.textContent;
                select.textContent = "";
                jugador = "blancas";
                if (jaque(jugador)) {
                    sonidoJaque.play();

                    reyRojo = document.querySelector(`[data-row = "${reyBlanco[0]}"][data-col = "${reyBlanco[1]}"]`);
                    reyRojo.style.textShadow = "0 0 5px red";
                    reyBlancoRojoFlag = true;

                    if (mate(jugador)) {
                        clearInterval(partida);
                        let gameOver = document.querySelector("#gameOver");
                        gameOver.textContent = "Ganan las Negras";
                        let description = document.querySelector("#description");
                        description.textContent = "Jaque Mate"
                        var contenedor = document.querySelector(".contenedor");
                        contenedor.style.visibility = "visible";
                        sonidoVictoria.play();
                    }
                }

                if(tablas(jugador)){
                    console.log("tablas");
                    clearInterval(partida);
                    let gameOver = document.querySelector("#gameOver");
                    gameOver.textContent = "Tablas";
                    let description = document.querySelector("#description");
                    description.textContent = "Rey Ahogado"
                    var contenedor = document.querySelector(".contenedor");
                    contenedor.style.visibility = "visible";
                    sonidoTablas.play();
                }

                select = null;
            }
        }
    }
}

board.addEventListener("click", accion);