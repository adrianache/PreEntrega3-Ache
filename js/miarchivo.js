const boton = document.getElementById('startButton');
const salida = document.getElementById('output');

// click por parte del usuario
boton.onclick = function () {
    let nota = prompt("Escribe tu nota:");

    if (nota) {
        // nota en html + concatenacion
        let nuevaNota = "<div class='note'><p>" + nota + "</p></div>";
        salida.innerHTML = salida.innerHTML + nuevaNota;

        // Ciclo para mostrar todas las notas ingresadas
        for (let i = 0; i < 3; i++) {
            console.log("Nota " + (i + 1));
        }
    } else {
        alert("No escribiste nada.");
    }
};
