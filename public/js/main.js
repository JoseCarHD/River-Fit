
document.getElementById('clienteForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que el formulario se envíe de la manera tradicional

    // Captura los datos del formulario
    const formData = {
        nombre: document.getElementById('inputNombre').value,
        apellido: document.getElementById('inputApellido').value,
        correo: document.getElementById('inputCorreo').value,
        telefono: document.getElementById('inputTelefono').value,
        codigorid: document.getElementById('inputCodigoRID').value,
        terminosCondiciones: document.getElementById('terminosCondiciones').checked,
        recibirPromociones: document.getElementById('recibirPromociones').checked
    };

    console.log("Este es un script externo");


    // Enviar datos a la API
    fetch('http://localhost:3000/users/register', {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Cliente registrado con éxito');
        } else {
            alert('Error al registrar el cliente');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Ocurrió un error al registrar el cliente');
    });
});