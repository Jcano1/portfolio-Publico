document.getElementById('contactForm').addEventListener('submit', function(event) {
        event.preventDefault(); // 1. Detiene el envío normal del formulario

        const form = event.target;
        const formData = new FormData(form);
        const statusMessage = document.getElementById('statusMessage');

        // Limpia cualquier mensaje previo
        statusMessage.textContent = '';
        statusMessage.style.color = 'inherit';

        // 2. Ejecuta la petición con Fetch
        fetch(form.action, {
            method: 'POST',
            body: formData, // FormData ya incluye el token CSRF y los datos
            // Laravel espera que el token CSRF esté incluido, ya sea en el body (FormData) 
            // o en un header X-CSRF-TOKEN. Usando FormData es más simple.
            headers: {
                // Opcional, pero bueno para indicar que es una petición AJAX
                'X-Requested-With': 'XMLHttpRequest', 
            }
        })
        .then(response => {
            // 3. Maneja respuestas HTTP 4xx, 5xx
            if (!response.ok) {
                // Convierte la respuesta en JSON para ver los errores de validación
                return response.json().then(data => {
                    // Si hay errores de validación (422) o un error de servidor
                    throw new Error(JSON.stringify(data)); 
                });
            }
            // 4. Si la respuesta es 200 (OK), devuelve el JSON de la respuesta.
            return response.json();
        })
        .then(data => {
            // 5. Muestra el mensaje de éxito
            statusMessage.textContent = data.message || 'Mensaje enviado con éxito!';
            statusMessage.style.color = 'green';
            form.reset(); // Limpia el formulario
            setTimeout(() => {
                statusMessage.textContent=""
            }, 10000);
        })
        .catch(error => {
            console.error('Error:', error);
            
            // Intenta parsear los errores de validación específicos
            try {
                const errorData = JSON.parse(error.message);
                let errorMessage = 'Hubo un problema al enviar el mensaje. ';
                
                // Si Laravel devuelve errores de validación (el array 'errors')
                if (errorData.errors) {
                    errorMessage += 'Revisa los siguientes campos: ';
                    // Concatena los primeros mensajes de error de cada campo
                    Object.values(errorData.errors).forEach(messages => {
                        errorMessage += messages[0] + ' ';
                    });
                } else {
                    errorMessage = errorData.message || 'Error desconocido.';
                }

                statusMessage.textContent = errorMessage.trim();

            } catch (e) {
                // Manejo de errores que no son JSON (ej. fallo de red)
                statusMessage.textContent = 'Error de conexión o del servidor.';
            }

            statusMessage.style.color = 'red';
        });
    });