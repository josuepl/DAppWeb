
// Variables globales
let tarjetasCreadas = 0;
let colorSeleccionado = '#3498db';

// Referencias a elementos del DOM
const formulario = document.getElementById('tarjetaForm');
const cardsGrid = document.getElementById('cardsGrid');
const emptyState = document.getElementById('emptyState');
const contadorTarjetas = document.getElementById('contadorTarjetas');
const colorOptions = document.querySelectorAll('.color-option');
const colorInput = document.getElementById('colorSeleccionado');
const limpiarBtn = document.getElementById('limpiarBtn');

// Manejar selección de color
colorOptions.forEach(option => {
    option.addEventListener('click', function () {
        // Remover clase 'selected' de todas las opciones
        colorOptions.forEach(opt => opt.classList.remove('selected'));

        // Agregar clase 'selected' a la opción clickeada
        this.classList.add('selected');

        // Actualizar color seleccionado
        colorSeleccionado = this.getAttribute('data-color');
        colorInput.value = colorSeleccionado;
    });
});

// Manejar envío del formulario
formulario.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevenir recarga de página

    // Obtener valores del formulario
    const titulo = document.getElementById('titulo').value;
    const descripcion = document.getElementById('descripcion').value;
    const categoria = document.getElementById('categoria').value;

    // Crear tarjeta
    crearTarjeta(titulo, descripcion, categoria, colorSeleccionado);

    // Limpiar formulario
    limpiarFormulario();

    // Actualizar contador
    actualizarContador();
});

// Función para crear una nueva tarjeta
function crearTarjeta(titulo, descripcion, categoria, color) {
    // Remover estado vacío si existe
    if (emptyState.style.display !== 'none') {
        emptyState.style.display = 'none';
    }

    // Crear ID único para la tarjeta
    const cardId = 'card-' + Date.now();

    // Crear elementos HTML de la tarjeta
    const cardElement = document.createElement('div');
    cardElement.className = 'card';
    cardElement.id = cardId;

    // Mapear categorías a colores de fondo
    const categoriaTexto = {
        'trabajo': ' Trabajo',
        'personal': ' Personal',
        'estudio': ' Estudio',
        'hobbies': ' Hobbies',
        'otros': ' Otros'
    };

    // Estructura de la tarjeta
    cardElement.innerHTML = `
                <div class="card-header" style="background: ${color};">
                    <h3 class="card-title">${titulo}</h3>
                </div>
                <div class="card-body">
                    <span class="card-category">${categoriaTexto[categoria] || '🔶 Otros'}</span>
                    <p class="card-content">${descripcion}</p>
                </div>
                <div class="card-footer">
                    <span>Creada: ${new Date().toLocaleDateString()}</span>
                    <button class="delete-btn" onclick="eliminarTarjeta('${cardId}')">Eliminar</button>
                </div>
            `;

    // Agregar tarjeta al contenedor (al principio)
    cardsGrid.insertBefore(cardElement, cardsGrid.firstChild);

    // Incrementar contador
    tarjetasCreadas++;
}

// Función para eliminar una tarjeta
window.eliminarTarjeta = function (cardId) {
    const cardElement = document.getElementById(cardId);
    if (cardElement) {

        // Eliminar después de la animación
        setTimeout(() => {
            cardElement.remove();
            tarjetasCreadas--;
            actualizarContador();

            // Mostrar estado vacío si no hay tarjetas
            if (tarjetasCreadas === 0) {
                emptyState.style.display = 'block';
            }
        }, 300);
    }
};

// Función para actualizar el contador
function actualizarContador() {
    const texto = tarjetasCreadas === 1 ? '1 tarjeta' : `${tarjetasCreadas} tarjetas`;
    contadorTarjetas.textContent = texto;
}

// Función para limpiar el formulario
function limpiarFormulario() {
    formulario.reset();

    // Restablecer color a azul por defecto
    colorOptions.forEach(opt => opt.classList.remove('selected'));
    colorOptions[0].classList.add('selected');
    colorSeleccionado = '#3498db';
    colorInput.value = colorSeleccionado;
}

// Botón para limpiar formulario
limpiarBtn.addEventListener('click', limpiarFormulario);

// Crear algunas tarjetas de ejemplo al cargar la página
window.addEventListener('DOMContentLoaded', function () {
    // Tarjetas de ejemplo
    const ejemplos = [
        {
            titulo: 'Aprender JavaScript',
            descripcion: 'Completar el curso avanzado de manipulación del DOM y eventos.',
            categoria: 'estudio',
            color: '#3498db'
        },
        {
            titulo: 'Reunión de equipo',
            descripcion: 'Presentación del nuevo proyecto de desarrollo web.',
            categoria: 'trabajo',
            color: '#2ecc71'
        },
        {
            titulo: 'Gimnasio',
            descripcion: 'Rutina de entrenamiento: cardio y pesas.',
            categoria: 'personal',
            color: '#e74c3c'
        }
    ];

    // Crear tarjetas de ejemplo
    ejemplos.forEach(ejemplo => {
        crearTarjeta(
            ejemplo.titulo,
            ejemplo.descripcion,
            ejemplo.categoria,
            ejemplo.color
        );
    });

    // Actualizar contador
    actualizarContador();
});
