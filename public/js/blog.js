// blog.js
document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token'); // Obtener el token

    if (!token) {
        alert('No estás autenticado, redirigiendo a login.');
        window.location.href = '/login'; // Redirigir si no hay token
        return;
    }

    console.log('Token enviado:', token); // Para depuración

    try {
        const response = await fetch('/api/blog', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`, // Enviar el token de autenticación
            },
        });

        if (response.ok) {
            const data = await response.json();
            renderBlogPosts(data); // Función para renderizar los datos en la página
        } else {
            console.error('Error al cargar el blog:', response.status);
            alert('No autorizado, por favor inicie sesión nuevamente.');
            window.location.href = '/login'; // Redirigir si no está autorizado
        }
    } catch (error) {
        console.error('Error al hacer la solicitud:', error);
        alert('Error al cargar la página. Por favor, intenta de nuevo.');
    }
});
