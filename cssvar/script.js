const selector = document.getElementById('theme-selector');
const body = document.body;

selector.addEventListener('change', () => {
    // 1. Obtenemos el valor seleccionado (ej: "theme-dark")
    const selectedTheme = selector.value;
    
    // 2. Eliminamos cualquier clase de tema previa
    body.classList.remove('minimal', 'dark', 'neo');
    
    // 3. Aplicamos la nueva clase
    body.classList.add(selectedTheme);
    
    console.log("Tema cambiado a: " + selectedTheme);
});