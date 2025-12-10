var ButtonsAgreeDecline = `
                    <button id="Save">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="green" viewBox="0 0 24 24">
                            <path d="M20.285 6.709l-11.025 11.025-5.545-5.545 1.414-1.414 4.131 4.131 9.611-9.611z"/>
                            </svg>
                    </button>
                    <button id="Cancel">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="red" viewBox="0 0 24 24">
                                <path d="M18.364 5.636l-1.414-1.414L12 9.172 7.05 4.222 5.636 5.636 10.586 10.586 5.636 15.536l1.414 1.414L12 12.828l4.95 4.95 1.414-1.414-4.95-4.95z"/>
                                </svg>
                    </button>
`
function EventLisenerEditData() {
    document.querySelector('#ButonEditData').addEventListener('click', () => {
        var FullNameUser = document.querySelector('#FullNameUser')
        var EmailUser = document.querySelector('#EmailUser')
        var PostUser = document.querySelector('#PostUser')
        var ContainerButonEditData = document.querySelector('#ContainerButonEditData')

        var FullNameUserCopy = FullNameUser.cloneNode(true)
        var EmailUserCopy = EmailUser.cloneNode(true)
        var PostUserCopy = PostUser.cloneNode(true)

        var ContainerButonEditDataInnerHTML = ContainerButonEditData.innerHTML
        const inputClass = "form-input-display"
        FullNameUser.outerHTML = `<input type="text" value="${FullNameUser.innerHTML.trim()}" class="${FullNameUser.className} ${inputClass}" id="${FullNameUser.id}">`
        EmailUser.outerHTML = `<input type="text" value="${EmailUser.innerHTML.trim()}" class="${EmailUser.className} ${inputClass}" id="${EmailUser.id}">`
        PostUser.outerHTML = `<input type="text" value="${PostUser.innerHTML.trim()}" class="${PostUser.className} ${inputClass}" id="${PostUser.id}">`
        ContainerButonEditData.innerHTML = ButtonsAgreeDecline
        ContainerButonEditData.querySelector('#Cancel').addEventListener('click', () => {
            FullNameUser = document.querySelector('#' + FullNameUser.id)
            PostUser = document.querySelector('#' + PostUser.id)
            EmailUser = document.querySelector('#' + EmailUser.id)

            FullNameUser.replaceWith(FullNameUserCopy);
            EmailUser.replaceWith(EmailUserCopy);
            PostUser.replaceWith(PostUserCopy);

            ContainerButonEditData.innerHTML = ContainerButonEditDataInnerHTML
            EventLisenerEditData()
        })
        ContainerButonEditData.querySelector('#Save').addEventListener('click', () => {
            var ArrayFullName = document.querySelector('#' + FullNameUser.id).value.trim().split(" ")
            var Name = ArrayFullName[0]
            var FirsName = ArrayFullName[1]
            var SecondName = ArrayFullName[2]
            var Email = document.querySelector('#' + EmailUser.id).value.trim()
            var Post = document.querySelector('#' + PostUser.id).value.trim()
            const dataToSend = {
                // Claves del objeto JSON      <-- Columnas de tu base de datos -->
                name: Name,
                first_surname: FirsName,
                second_surname: SecondName,
                email: Email,
                puesto: Post // Enviamos el valor de la variable 'Post' a la clave 'puesto'
            };

            // 3. Realizar la petición fetch
            fetch('/api/user/update-profile', {
                method: 'POST', // O 'PUT', dependiendo de cómo definas la ruta, pero POST es común para APIs
                headers: {
                    'Content-Type': 'application/json',
                    // Necesario para proteger la API de ataques CSRF si usas autenticación por sesión
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                },
                body: JSON.stringify(dataToSend) // Convertimos el objeto JS a una cadena JSON
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Error en la petición: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    const currentFullNameInput = document.querySelector('#' + FullNameUser.id);
                    const currentEmailInput = document.querySelector('#' + EmailUser.id);
                    const currentPostInput = document.querySelector('#' + PostUser.id);

                    FullNameUserCopy.innerHTML = Name + " " + FirsName + " " + SecondName;
                    EmailUserCopy.innerHTML = Email;
                    PostUserCopy.innerHTML = Post;

                    currentFullNameInput.replaceWith(FullNameUserCopy);
                    currentEmailInput.replaceWith(EmailUserCopy);
                    currentPostInput.replaceWith(PostUserCopy);
                    ContainerButonEditData.innerHTML = ContainerButonEditDataInnerHTML
                    EventLisenerEditData()
                    if (data.message) {
                        console.log('✅ Éxito:', data.message);
                        // Mostrar mensaje de éxito al usuario
                    } else if (data.errors) {
                        console.error('❌ Error de validación:', data.errors);
                        // Mostrar los errores de validación de Laravel
                    }
                })
                .catch((error) => {
                    console.error('🚨 Error de red o del servidor:', error);
                    // Mostrar mensaje de error general
                });
        })
    })
}



function EventLisenerEditDescription() {
    document.querySelector('#ButonEditDescription').addEventListener('click', () => {

        var Description = document.querySelector('#Description')
        var DescriptionCopy = Description.cloneNode(true)

        Description.outerHTML = `<textarea 
    id="Description" 
    name="descripcion_larga" 
    rows="5" 
    cols="50"
    class="form-input form-textarea-auto"
    placeholder="Escribe aquí tu texto largo, comentarios, o detalles...">${Description.innerHTML.trim().replace(/<\s*br\s*\/?>/gi, '\n')}
</textarea>`

        var ContainerButonEditDescription = document.querySelector('#ContainerButonEditDescription')
        var ContainerButonEditDescriptionCopy = ContainerButonEditDescription.cloneNode(true)
        ContainerButonEditDescription.innerHTML = ButtonsAgreeDecline

        ContainerButonEditDescription.querySelector('#Cancel').addEventListener('click', () => {
            document.querySelector('#Description').replaceWith(DescriptionCopy)
            document.querySelector('#ContainerButonEditDescription').replaceWith(ContainerButonEditDescriptionCopy)
            EventLisenerEditDescription()
        })
        ContainerButonEditDescription.querySelector('#Save').addEventListener('click', () => {

            var Description = document.querySelector('#Description').value.trim()
            console.log(Description)
            const dataToSend = {
                description: Description,
            };
            console.log('ejecutado')
            fetch('/api/user/update-description', {
                method: 'POST', // O 'PUT', dependiendo de cómo definas la ruta, pero POST es común para APIs
                headers: {
                    'Content-Type': 'application/json',
                    // Necesario para proteger la API de ataques CSRF si usas autenticación por sesión
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                },
                body: JSON.stringify(dataToSend) // Convertimos el objeto JS a una cadena JSON
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Error en la petición: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    const currentDescription = document.querySelector('#Description');

                    DescriptionCopy.innerHTML = Description;
                    currentDescription.replaceWith(DescriptionCopy);
                    document.querySelector('#ContainerButonEditDescription').replaceWith(ContainerButonEditDescriptionCopy)
                    EventLisenerEditDescription()
                    if (data.message) {
                        console.log('✅ Éxito:', data.message);
                        // Mostrar mensaje de éxito al usuario
                    } else if (data.errors) {
                        console.error('❌ Error de validación:', data.errors);
                        // Mostrar los errores de validación de Laravel
                    }
                })
                .catch((error) => {
                    console.error('🚨 Error de red o del servidor:', error);
                    // Mostrar mensaje de error general
                });
        })
        const textarea = document.getElementById('Description');

        autoResizeTextarea(textarea);

        textarea.addEventListener('input', () => {
            autoResizeTextarea(textarea);
        });
    })
}

function autoResizeTextarea(elemento) {
    // 1. Resetea la altura a 'auto' para recalcular el scrollHeight
    elemento.style.height = 'auto';

    // 2. Asigna la altura basada en el scrollHeight (la altura necesaria para todo el contenido)
    elemento.style.height = elemento.scrollHeight + 'px';
}
EventLisenerEditData()
EventLisenerEditDescription()