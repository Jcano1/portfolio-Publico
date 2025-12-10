import { rgbToHex } from '@/Helper.js';

console.log('Cargado Admin')
document.addEventListener("habilidadesCargadas", () => {
    var Admin_buttons = document.querySelectorAll('.habilidad-actions')
    Admin_buttons.forEach(buttonContainer => {
        buttonContainer.innerHTML = `
            <button class="btn-edit">✏️</button>
            <button class="btn-delete">🗑️</button>
        `;

    });
    CargarBotonesAdmin(Admin_buttons)

});
document.getElementById('btAddHabilidades').addEventListener('click', () => {
    var buttonAddHabilidad = document.getElementById('ContainerForm')
    buttonAddHabilidad.innerHTML = `
                        <div class="form-container">
                            <!-- Nombre de la habilidad -->
                            <div style="display: flex; flex-direction: column;">
                                <label for="nombre" class="form-label">Nombre de la habilidad</label>
                                <input id="nombre" type="text" placeholder="Ej. Laravel" class="form-input">
                            </div>

                            <!-- Color y Nivel en la misma fila -->
                            <div style="display: flex; flex-direction: row; gap: 1rem; align-items: center;">
                                <!-- Color -->
                                <div style="flex: 1; display: flex; flex-direction: column;">
                                    <label for="color" class="form-label">Color (hexadecimal)</label>
                                    <input id="color" type="color"  class="form-input" value="#0CCCF2">
                                    <small style="font-size: 0.8rem; color: #555;">Ejemplo: #FF0000</small>
                                </div>

                                <!-- Nivel -->
                                <div style="flex: 2; display: flex; flex-direction: column; " class="Container-Nivel">
                                    <label for="nivel" class="form-label">Nivel</label>
                                    <div style="display: flex; align-items: center; gap: 1rem;">
                                        <input id="nivel" type="range" min="0" max="10" value="5" step="1" class="form-range" style="flex: 1;">
                                        <span id="nivelOutput" class="form-output" style="width: 2rem; text-align: center;">5</span>
                                    </div>
                                </div>
                            </div>

                            <!-- Botón de enviar -->
                            <button id="guardarHabilidad" class="form-button">Guardar habilidad</button>
                        </div>
                        `

    const slider = document.getElementById('nivel');

    function updateTrack() {
        const percentage = (slider.value - slider.min) / (slider.max - slider.min) * 100;
        slider.style.setProperty('--value', percentage + '%');
    }

    slider.addEventListener('input', updateTrack);

    updateTrack();
    const Color = document.getElementById('color')
    var barraNivel = document.getElementById('nivel')
    Color.addEventListener('input', () => {
        const hexRegex = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/;
        console.log('pruebas')
        if (hexRegex.test(Color.value)) {
            // Si el valor es un hex válido, lo usamos
            barraNivel.style.setProperty('--color-bar', Color.value);
        } else {
            // Si no, usamos un color base
            barraNivel.style.setProperty('--color-bar', '#0CCCF2');
        }

    })
    const nivelInput = document.getElementById('nivel')
    var nivelOutput = document.getElementById('nivelOutput')
    nivelInput.addEventListener('input', () => {
        nivelOutput.innerHTML = nivelInput.value
    })

    document.getElementById('guardarHabilidad').addEventListener('click', async (e) => {
        e.preventDefault();

        const nombreEl = document.getElementById('nombre');
        const nivelEl = document.getElementById('nivel');
        const colorEl = document.getElementById('color');
        const btn = document.getElementById('guardarHabilidad');

        if (!nombreEl || !nivelEl || !colorEl || !btn) {
            console.error('Faltan elementos del formulario en el DOM');
            return;
        }

        const nombre = nombreEl.value.trim();
        const nivel = parseInt(nivelEl.value, 10);
        let color = colorEl.value.trim(); // <-- DECLARADA con let

        // Validación rápida del color hex (si no es válido lo dejamos null)
        if (!/^#[0-9A-Fa-f]{6}$/.test(color)) {
            color = null;
        }

        const data = {
            nombre,
            nivel,
            colores: color
        };

        btn.disabled = true;
        btn.textContent = 'Guardando...';

        try {
            const csrfMeta = document.querySelector('meta[name="csrf-token"]');
            const csrfToken = csrfMeta ? csrfMeta.getAttribute('content') : null;

            const response = await fetch('/Savehabilidades', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...(csrfToken ? { 'X-CSRF-TOKEN': csrfToken } : {})
                },
                body: JSON.stringify(data)
            });

            const text = await response.text();
            let result;
            try {
                result = JSON.parse(text);
            } catch {
                console.error("Respuesta no era JSON:", text);
                throw new Error("El servidor no devolvió JSON");
            }


            if (response.ok) {
                CargarBarras()
            } else {
                error.log('❌ Error: ' + (result.message || 'No se pudo guardar'));
            }
        } catch (error) {
            console.error('Error al enviar:', error);

        } finally {
            btn.disabled = false;
            btn.textContent = 'Guardar';
        }
    });

});
async function borrarHabilidad(id) {

    console.log(id)
    try {
        const response = await fetch(`/habilidades/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').content
            }
        });

        const result = await response.json();


        if (response.ok) {
            CargarBarras()
        }
    } catch (error) {

        console.error("Error al enviar:", error);
    }
}


function PrepareEditarHabilidad(id) {
    var Editable = document.getElementById(id);
    var Editable = Editable.closest(".flex");
    var preEdit = Editable.innerHTML
    var adminButtons = Editable.querySelector(".habilidad-actions");
    if (adminButtons) {
        // Limpiar botones antiguos
        adminButtons.innerHTML = "";

        // Crear botón "Aceptar" con icono de tick
        var aceptarBtn = document.createElement("button");
        aceptarBtn.className = "btn-aceptar";
        aceptarBtn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="green" viewBox="0 0 24 24">
                <path d="M20.285 6.709l-11.025 11.025-5.545-5.545 1.414-1.414 4.131 4.131 9.611-9.611z"/>
            </svg>
        `;
        aceptarBtn.addEventListener("click", async function () {
            // 1. Obtener los valores editados
            const nombre = document.getElementById(`edit-nombre-${id}`).value.trim();
            const color = document.getElementById(`edit-color-${id}`).value.trim();
            const nivel = document.getElementById(`nivel-${id}`).value;

            // 2. Construir objeto de datos
            const data = {
                id: id,
                nombre: nombre,
                color: color,
                nivel: parseInt(nivel, 10)
            };

            // 3. Enviar al controlador con la función genérica
            const result = await enviarDatosUpdate(data, "/habilidades/update");


            if (result) {
                CargarBarras(); // refrescar UI
            } else {
                console.error("❌ Error al actualizar habilidad");
            }
        });

        // Crear botón "Cancelar" con icono de cruz
        var cancelarBtn = document.createElement("button");
        cancelarBtn.className = "btn-cancelar";
        cancelarBtn.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="red" viewBox="0 0 24 24">
                <path d="M18.364 5.636l-1.414-1.414L12 9.172 7.05 4.222 5.636 5.636 10.586 10.586 5.636 15.536l1.414 1.414L12 12.828l4.95 4.95 1.414-1.414-4.95-4.95z"/>
            </svg>
        `;
        cancelarBtn.addEventListener("click", function () {
            Editable.innerHTML = preEdit
            CargarBotonesAdmin('text')

        });

        // Añadir botones al contenedor
        adminButtons.appendChild(aceptarBtn);
        adminButtons.appendChild(cancelarBtn);

        // Estilo para mostrar botones
        adminButtons.style.display = "flex";
        adminButtons.style.gap = "0.5rem";
    }
    var Nombre = Editable.querySelector(".Name-Habilidad");
    if (Nombre) {
        var NombreValue = Nombre.textContent.trim();
        var inputNombre = document.createElement("input");
        inputNombre.type = "text";
        inputNombre.value = NombreValue;
        inputNombre.className = "form-input";
        inputNombre.id = "edit-nombre-" + id;
        Nombre.replaceWith(inputNombre);
    }

    // Buscar la barra interna que tiene el color en HEX
    var BarraColor = Editable.querySelector(".Barra-Color");
    var header = Editable.querySelector(".habilidad-header");
    if (BarraColor && header) {

        var currentColor = rgbToHex(BarraColor.style.backgroundColor);
        if (!currentColor || currentColor === "#000000") {
            currentColor = "#0CCCF2"; // fallback
        }
        var inputColor = document.createElement("input");
        inputColor.type = "color";
        inputColor.value = currentColor;
        inputColor.className = "form-input Centrar";
        inputColor.id = "edit-color-" + id;
        // Insertarlo antes de los botones de admin
        var botones = header.querySelector(".habilidad-actions");
        if (botones) {
            header.insertBefore(inputColor, botones);
        } else {
            header.appendChild(inputColor);
        }
    }

    var Nivel = Editable.querySelector('.Container-prueba');
    if (Nivel) {
        var barraInterior = Nivel.querySelector("div");
        var currentWidth = barraInterior?.style.width || "0%";
        var nivelValue = parseInt(currentWidth) / 10; // ej. "50%" → 5
        var colorBarra = barraInterior?.style.backgroundColor || "#4caf50";

        // Nuevo contenedor editable
        var container = document.createElement("div");
        container.className = "Container-Nivel";
        container.style.display = "flex";
        container.style.flexDirection = "column";
        container.style.gap = "0.5rem";

        container.innerHTML = `
            <label for="nivel-${id}" class="form-label-Edit"></label>
            <div style="position: relative; width: 100%; display: flex; align-items: center; gap: 1rem;">
                <!-- Tu barra visual -->
                <div class="w-full bg-color_fondo_barra rounded-full h-4 relative ">
                    <div id="barra-edit-${id}" class="h-4 rounded-full" style="width: ${nivelValue * 10}%; background-color: ${colorBarra};"></div>
                    <!-- Pelotita -->
                    <div id="thumb-${id}" style="
                        position: absolute;
                        top: 50%;
                        left: ${nivelValue * 10}%;
                        transform: translate(-50%, -50%);
                        width: 1.5rem;
                        height: 1.5rem;
                        border-radius: 50%;
                        background-color: ${colorBarra};
                        box-shadow: 0 0 2px rgba(0,0,0,0.5);
                        pointer-events: none;
                        "></div>
                </div>

                <!-- Input invisible encima -->
                <input id="nivel-${id}" type="range" min="0" max="10" value="${nivelValue}" step="1" 
                    style="position: absolute; left: 0; top: 0; width: calc(100% - 3rem); height: 100%; opacity: 0; cursor: pointer;">
                
                <!-- Output del valor -->
                <span id="nivelOutput-${id}" class="form-output" style="width: 2rem; text-align: center;">${nivelValue}</span>
            </div>
        `;

        Nivel.replaceWith(container);

        // Conectar input con barra, span y pelotita
        var inputRange = container.querySelector(`#nivel-${id}`);
        var output = container.querySelector(`#nivelOutput-${id}`);
        var barra = container.querySelector(`#barra-edit-${id}`);
        var thumb = container.querySelector(`#thumb-${id}`);

        inputRange.addEventListener("input", function () {
            var porcentaje = inputRange.value * 10;
            output.textContent = inputRange.value;
            barra.style.width = porcentaje + "%";
            thumb.style.left = porcentaje + "%"; // mover la pelotita
        });

        inputColor.addEventListener('input', () => {
            container.querySelector(`#barra-edit-${id}`).style.backgroundColor = inputColor.value
            container.querySelector(`#thumb-${id}`).style.backgroundColor = inputColor.value
        })
    }

}


function CargarBotonesAdmin(adminbuttons) {
    console.log(adminbuttons)
    if (adminbuttons != "") {
        document.querySelectorAll(".btn-delete").forEach((btn) => {
            btn.addEventListener("click", () => {
                // Buscar el contenedor general (div con clase "flex")
                console.log(btn)
                const contenedor = btn.closest(".habilidad-actions");
                if (adminbuttons) {
                    console.log(contenedor)
                    const idGeneral = contenedor.id;

                    borrarHabilidad(idGeneral)
                }
            });
        });
        document.querySelectorAll(".btn-edit").forEach((btn) => {
            btn.addEventListener("click", () => {
                // Buscar el contenedor general (div con clase "flex")
                const contenedor = btn.closest(".habilidad-actions");
                if (contenedor) {
                    console.log('editando')
                    const idGeneral = contenedor.id;
                    PrepareEditarHabilidad(idGeneral)
                }
            });
        });
    }
}

async function enviarDatosUpdate(datos) {
    try {
        const response = await fetch('/habilidades/update', {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').content
            },
            body: JSON.stringify(datos)
        });

        const result = await response.json();


        if (response.ok) {
            return result
        }
    } catch (error) {
        console.error("Error en el fetch:", error);
    }
}






