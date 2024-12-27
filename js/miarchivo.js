alert("¡Bienvenido! Este es un espacio para tus notas. 🎉\nEs una versión simple, pero con el tiempo podríamos agregar más funcionalidades. 🚀");

// Conexión con HTML
const boton = document.getElementById('startButton');
const salida = document.getElementById('output');

// Lista para guardar las notas
let notas = [];

function mostrarNotas() {
    salida.innerHTML = ""; // Limpia la salida
    notas.forEach((nota, index) => {
        salida.innerHTML += `
            <div class="note">
                <p><strong>Nota ${index + 1}:</strong> ${nota.texto}</p>
                <p><em>Fecha:</em> ${nota.fecha}</p>
            </div>`;
    });
}

boton.addEventListener('click', () => {
    let nota;
    do {
        nota = prompt("Escribe tu nota. Si quieres salir, solo escribe 'salir'.");
        
        if (nota && nota.toLowerCase() !== "salir") {
            const nuevaNota = {
                texto: nota.trim(),
                fecha: new Date().toLocaleString(), // Agregar la fecha y hora actual
            };

            notas.push(nuevaNota); // Guardar la nota en el array
            mostrarNotas(); // Mostrar las notas actualizadas
        } else if (!nota) {
            alert("No escribiste nada. ¡Intenta de nuevo!");
        }
    } while (nota && nota.toLowerCase() !== "salir");

    alert("Hasta pronto. ¡Que tengas un buen día! 😉");
});
