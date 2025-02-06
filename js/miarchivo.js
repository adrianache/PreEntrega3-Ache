// Conexión con HTML
const form = document.getElementById('noteForm');
const noteInput = document.getElementById('noteInput');
const studentNameInput = document.getElementById('studentNameInput');
const subjectInput = document.getElementById('subjectInput');
const salida = document.getElementById('output');
const addNoteManuallyButton = document.getElementById('addNoteManually');
const searchInput = document.getElementById('searchInput');
const clearSearchButton = document.getElementById('clearSearch');
const toggleThemeButton = document.getElementById('toggleTheme');
const messageContainer = document.getElementById('message');

// Lista para guardar las notas
let notas = [];

// Muestra mensajes al usuario
function mostrarMensaje(mensaje, tipo = "success") {
    messageContainer.textContent = mensaje;
    messageContainer.className = `message ${tipo}`;
    messageContainer.style.display = "block";
    setTimeout(() => {
        messageContainer.style.display = "none";
    }, 3000); // oculta después de 3 segundos
}

// Carga notas desde localStorage y sessionStorage al iniciar
function cargarNotas() {
    const notasLocal = localStorage.getItem('notas');
    const notasSession = sessionStorage.getItem('notas');
    if (notasLocal) {
        notas = JSON.parse(notasLocal);
    } else if (notasSession) {
        notas = JSON.parse(notasSession);
    }
    mostrarNotas();
}

// Guarda notas en localStorage y sessionStorage
function guardarNotas() {
    localStorage.setItem('notas', JSON.stringify(notas));
    sessionStorage.setItem('notas', JSON.stringify(notas));
}

// Muestra las notas en la página
function mostrarNotas(filterText = "") {
    salida.innerHTML = ""; // Limpia la salida
    notas
        .filter(nota =>
            nota.texto.toLowerCase().includes(filterText.toLowerCase()) ||
            (nota.alumno && nota.alumno.toLowerCase().includes(filterText.toLowerCase())) ||
            (nota.asignatura && nota.asignatura.toLowerCase().includes(filterText.toLowerCase()))
        )
        .forEach((nota, index) => {
            salida.innerHTML += `
                <div class="note">
                    ${nota.alumno ? `<p><strong>Alumno:</strong> ${nota.alumno}</p>` : ''}
                    ${nota.asignatura ? `<p><strong>Asignatura:</strong> ${nota.asignatura}</p>` : ''}
                    <p><strong>Nota ${index + 1}:</strong> ${nota.texto}</p>
                    <p><em>Fecha:</em> ${nota.fecha}</p>
                    <button onclick="editarNota(${index})" class="edit-button">Editar</button>
                    <button onclick="eliminarNota(${index})">Eliminar</button>
                </div>`;
        });
}

// Elimina una nota
function eliminarNota(index) {
    if (confirm("¿Estás seguro de que quieres eliminar esta nota?")) {
        notas.splice(index, 1); // Elimina la nota del array
        guardarNotas(); // Actualiza localStorage y sessionStorage
        mostrarNotas(); // Actualiza la vista
        mostrarMensaje("Nota eliminada correctamente.", "success");
    }
}

// Edita una nota
function editarNota(index) {
    const nuevaNota = prompt("Edita tu nota:", notas[index].texto);
    const nuevoAlumno = prompt("Edita el nombre del alumno:", notas[index].alumno || "");
    const nuevaAsignatura = prompt("Edita la asignatura:", notas[index].asignatura || "");
    if (nuevaNota && nuevaNota.trim()) {
        notas[index].texto = nuevaNota.trim();
        notas[index].alumno = nuevoAlumno.trim() || null;
        notas[index].asignatura = nuevaAsignatura.trim() || null;
        notas[index].fecha = new Date().toLocaleString();
        guardarNotas();
        mostrarNotas();
        mostrarMensaje("Nota editada correctamente.", "success");
    } else {
        mostrarMensaje("No puedes dejar la nota vacía.", "error");
    }
}

// Valida si una nota es duplicada
function esNotaDuplicada(texto, alumno, asignatura) {
    return notas.some(nota =>
        nota.texto === texto &&
        nota.alumno === (alumno || null) &&
        nota.asignatura === (asignatura || null)
    );
}

// Agrega una nueva nota desde el formulario
form.addEventListener('submit', (e) => {
    e.preventDefault(); // Evita que se recargue la página
    const texto = noteInput.value.trim();
    const alumno = studentNameInput.value.trim();
    const asignatura = subjectInput.value.trim();
    if (texto) {
        if (esNotaDuplicada(texto, alumno, asignatura)) {
            mostrarMensaje("Esta nota ya existe.", "error");
            return;
        }
        const nuevaNota = {
            texto: texto,
            alumno: alumno || null,
            asignatura: asignatura || null,
            fecha: new Date().toLocaleString(),
        };
        notas.push(nuevaNota); // Guarda la nota en el array
        guardarNotas();
        mostrarNotas();
        noteInput.value = ""; // Limpia el campo de texto
        studentNameInput.value = ""; // Limpia el campo del alumno
        subjectInput.value = ""; // Limpia el campo de la asignatura
        mostrarMensaje("Nota agregada correctamente.", "success");
    } else {
        mostrarMensaje("No puedes agregar una nota vacía.", "error");
    }
});

// Función debounce para mejorar el rendimiento de la búsqueda
function debounce(func, wait) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

// Busca notas con debounce
searchInput.addEventListener('input', debounce(() => {
    mostrarNotas(searchInput.value);
}, 300));

// Limpiar búsqueda
clearSearchButton.addEventListener('click', () => {
    searchInput.value = "";
    mostrarNotas();
});

// Cambia entre tema claro y oscuro
toggleThemeButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    if (document.body.classList.contains('dark-theme')) {
        toggleThemeButton.textContent = "Tema Claro";
    } else {
        toggleThemeButton.textContent = "Tema Oscuro";
    }
});

// Carga notas al iniciar la página
window.onload = cargarNotas;