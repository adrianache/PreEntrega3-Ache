alert("¡Bienvenido! Este es un espacio para tus notas. 🎉\nEs una versión simple, pero con el tiempo podríamos agregar más funcionalidades. 🚀");

// conexión con HTML
const boton = document.getElementById('startButton');
const salida = document.getElementById('output');

// Lista para guardar las notas
let notas = [];

boton.addEventListener('click', () => {
    let nota = prompt("Escribe tu nota. Si quieres salir, solo escribe 'salir'.");

    if (nota) {
        if (nota.toLowerCase() === "salir") {
            alert("Hasta pronto. ¡Que tengas un buen día! 😉");
        } else {
            notas.push(nota); // guarda la nota
            salida.innerHTML += `<div class="note"><p>${nota}</p></div>`;
        }
    } else {
        alert("No escribiste nada. ¡Intenta de nuevo!");
    }
});

