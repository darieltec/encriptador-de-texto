// Función para encriptar texto
function encriptar() {
    // Obtener el valor del textarea con id 'textArea'
    let texto = document.getElementById("textArea").value;
    if (texto === "") {
        Swal.fire({
            icon: 'warning',
            title: 'Oops...',
            text: 'Por favor, ingresa un texto para encriptar.',
        });
        return;
    }
    
    // Reemplazar cada vocal por su correspondiente "encriptado"
    let textoEncriptado = texto.replace(/e/g, 'enter')
                               .replace(/i/g, 'imes')
                               .replace(/a/g, 'ai')
                               .replace(/o/g, 'ober')
                               .replace(/u/g, 'ufat');
    
    // Asignar el texto encriptado al textarea de resultado y mostrarlo
    document.getElementById('resultadoTextArea').value = textoEncriptado;
    mostrarResultado();
}

// Función para desencriptar texto
function desencriptar() {
    // Obtener el valor del textarea con id 'textArea'
    let texto = document.getElementById("textArea").value;
    if (texto === "") {
        Swal.fire({
            icon: 'warning',
            title: 'Oops...',
            text: 'Por favor, ingresa un texto para desencriptar.',
        });
        return;
    }
    
    // Reemplazar cada "encriptado" por su vocal correspondiente
    let textoDesencriptado = texto.replace(/enter/g, 'e')
                                  .replace(/imes/g, 'i')
                                  .replace(/ai/g, 'a')
                                  .replace(/ober/g, 'o')
                                  .replace(/ufat/g, 'u');
    
    // Asignar el texto desencriptado al textarea de resultado y mostrarlo
    document.getElementById('resultadoTextArea').value = textoDesencriptado;
    mostrarResultado();
}

// Función para copiar texto al portapapeles
function copiar() {
    // Obtener el textarea con el texto encriptado/desencriptado
    let textoResultado = document.getElementById('resultadoTextArea').value;

    // Usar la API del portapapeles para copiar el texto
    navigator.clipboard.writeText(textoResultado)
        .then(() => {
            // Mostrar un mensaje temporal de copiado usando SweetAlert
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Texto copiado',
                showConfirmButton: false,
                timer: 1500
            });
        })
        .catch(err => {
            console.error('Error al copiar el texto: ', err);
        });
}

// Función para mostrar el resultado y ocultar el mensaje de "No mensaje"
function mostrarResultado() {
    document.getElementById('noMensaje').style.display = 'none';
    document.getElementById('resultado').style.display = 'flex';
}

// Función para limpiar los textareas
function limpiarTextos() {
    document.getElementById('textArea').value = '';
    document.getElementById('resultadoTextArea').value = '';
    document.getElementById('noMensaje').style.display = 'flex';
    document.getElementById('resultado').style.display = 'none';
    actualizarBotonBorrar();
}

// Función para actualizar la visibilidad del botón de borrar
function actualizarBotonBorrar() {
    let textArea = document.getElementById('textArea');
    let clearButton = document.querySelector('.clear-btn');
    if (textArea.value === '') {
        clearButton.style.display = 'none';
        // Limpiar también el resultado si el textarea principal está vacío
        document.getElementById('resultadoTextArea').value = '';
        document.getElementById('noMensaje').style.display = 'flex';
        document.getElementById('resultado').style.display = 'none';
    } else {
        clearButton.style.display = 'block';
    }
}

// Función para validar el texto ingresado
function validarTexto(event) {
    let texto = event.target.value;
    let regex = /[A-ZÁÉÍÓÚÜÑáéíóúüñ]/;

    if (regex.test(texto)) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Ha ingresado caracteres no permitidos!"
        });
        
        // Remover caracteres no permitidos
        event.target.value = texto.replace(/[A-ZÁÉÍÓÚÜÑáéíóúüñ]/g, '');
    }
}

// Añadir evento input al textarea para actualizar la visibilidad del botón de borrar y validar el texto ingresado
document.getElementById('textArea').addEventListener('input', function(event) {
    actualizarBotonBorrar();
    validarTexto(event);
});

// Inicialmente ocultar el botón de borrar
actualizarBotonBorrar();

// Añadir foco al textarea al cargar la página
window.onload = function() {
    document.getElementById('textArea').focus();
};

// Función para mostrar el manual del usuario
function mostrarManual() {
    Swal.fire({
        width: 600, // Aumenta el ancho de la ventana
        html: `
            <h3>¿Cómo utilizar el Encriptador de Texto?</h3>
            <ol style="text-align: left;">
                <li>Escribe o pega el texto en el área de texto a la izquierda.</li>
                <li>Asegúrate de usar solo letras minúsculas y sin acentos.</li>
                <li>Haz clic en "Encriptar" para convertir tu texto a un formato encriptado.</li>
                <li>Haz clic en "Desencriptar" para convertir un texto encriptado de vuelta a su forma original.</li>
                <li>Para copiar el resultado encriptado o desencriptado, haz clic en "Copiar".</li>
                <li>Para limpiar ambos campos de texto, haz clic en la "X".</li>
            </ol>
            <p><strong>Nota:</strong> Se mostrarán mensajes de error si ingresas letras mayúsculas o vocales con tildes.</p>
        `,
        icon: 'info',
        confirmButtonText: 'Entendido'
    });
}

// Asocia la función mostrarManual al enlace "¿Cómo funciona?"
document.getElementById('textEnlace').addEventListener('click', mostrarManual);



