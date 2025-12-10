var selectedButton = ""
var ArrayDeleteWhenRelaod = []
var ArrayaddToDeletedButtons = []
import { rgbToHex } from '../Helper.js';
export function OpenSelectButton(formEditor, Button = null) {

    var buttonText
    var SelectedLarge = ""
    var SelectedMedium = ""
    var SelectedSmall = ""
    var backgroundColor = "#0CCCF2"
    var TextColor = "#FFFFFF"

    if (Button) {
        backgroundColor = rgbToHex(Button.style.backgroundColor)
        TextColor = rgbToHex(Button.style.color)
        buttonText = Button.innerHTML.trim()
        const DataSize = Button.dataset.size
        if (DataSize.trim() == 'large') {
            SelectedLarge = 'selected_button'
        } else if (DataSize.trim() == 'medium') {
            SelectedMedium = 'selected_button'
        } else if (DataSize.trim() == 'small') {
            SelectedSmall = 'selected_button'
        }
    } else {
        buttonText = 'Click aquí prueba'
        SelectedMedium = 'selected_button'
    }




    formEditor.innerHTML = `
                    <label class="flex flex-col gap-2">
                        <span>Texto del botón</span>
                        <input type="text" id="inputBtnText" class="border rounded p-2" value="${buttonText}">
                    </label>

                    <div class="flex gap-4">
                    <label class="flex flex-col gap-2">
                        <span>Color de fondo</span>
                        <input type="color" id="inputBtnColor" class="w-16 h-10 border rounded" value="${backgroundColor}">
                    </label>

                    <label class="flex flex-col gap-2">
                        <span>Color del texto</span>
                        <input type="color" id="inputBtnTextColor" class="w-16 h-10 border rounded" value="${TextColor}">
                    </label>
                    </div>

                    <div class="flex flex-col gap-2">
                    <span>Tamaño del botón</span>
                    <div id="btnSizeOptions" class="flex flex-wrap gap-3 justify-center">
                        <button type="button" class="btnBase btn-small text-sm ${SelectedSmall}" data-size="small" data-id="0" href="//">
                        ${buttonText}
                        </button>
                        <button type="button" class="btnBase btn-medium text-base ${SelectedMedium}" data-size="medium" data-id="0" href="//">
                        ${buttonText}
                        </button>
                        <button type="button" class="btnBase btn-large text-lg ${SelectedLarge}" data-size="large" data-id="0" href="//">
                        ${buttonText}
                        </button>
                    </div>
                    </div>

                    <!-- 🔹 NUEVO APARTADO: Pestañas para subir archivo o usar enlace -->
                    <div class="flex flex-col gap-2 mt-4">
                    <span>Destino del botón</span>
                    <div class="border rounded-lg">
                        <!-- Pestañas -->
                        <div class="flex border-b">
                        <button type="button" id="tabUpload" class="flex-1 py-2 text-center bg-gray-100 font-medium border-r active-tab">
                            Subir archivo
                        </button>
                        <button type="button" id="tabLink" class="flex-1 py-2 text-center font-medium">
                            Usar enlace
                        </button>
                        </div>

                        <!-- Contenido de pestañas -->
                        <div class="p-3">
                        <!-- Subir archivo -->
                        <div id="uploadTabContent" class="tab-content block">
                            <input type="file" id="inputFileUpload" class="border rounded p-2 w-full" accept=".pdf,.doc,.jpg,.png,.zip,.rar,.7zip" />
                        </div>

                        <!-- Usar enlace -->
                        <div id="linkTabContent" class="tab-content hidden">
                            <input type="url" id="inputBtnLink" class="border rounded p-2 w-full" placeholder="https://ejemplo.com" />
                        </div>
                        </div>
                    </div>
                    </div>
            `;


    const sizeOptions = document.querySelectorAll("#btnSizeOptions .btnBase");
    const colorInput = document.getElementById("inputBtnColor");
    const colorInputText = document.getElementById('inputBtnTextColor')
    const textInput = document.getElementById('inputBtnText')

    const newColor = colorInputText.value;

    formEditor.addEventListener("click", e => {
        if (e.target.id === "tabUpload" || e.target.id === "tabLink") {
            document.querySelectorAll(".tab-content").forEach(el => el.classList.add("hidden"));
            document.querySelectorAll("#tabUpload, #tabLink").forEach(el => el.classList.remove("bg-gray-100", "active-tab"));

            if (e.target.id === "tabUpload") {
                document.getElementById("uploadTabContent").classList.remove("hidden");
                e.target.classList.add("bg-gray-100", "active-tab");
            } else {
                document.getElementById("linkTabContent").classList.remove("hidden");
                e.target.classList.add("bg-gray-100", "active-tab");
            }
        }
    });

    sizeOptions.forEach(btn => {
        btn.style.color = newColor;
        updateSelectedButton()
    });

    updateSelectedButton()
    function updateSelectedButton() {
        const btn = document.querySelector('.selected_button');
        if (btn) {
            selectedButton = btn.cloneNode(true); // referencia al DOM actual

        }
    }

    // Manejar selección de tamaño
    sizeOptions.forEach(btn => {
        btn.addEventListener("click", () => {
            sizeOptions.forEach(b => b.classList.remove("selected_button"));
            btn.classList.add("selected_button");
            updateSelectedButton()
        });
    });

    // Actualizar color de las vistas previas al cambiar el color
    colorInput.addEventListener("input", () => {
        const newColor = colorInput.value;
        sizeOptions.forEach(btn => {
            btn.style.backgroundColor = newColor;
            updateSelectedButton()
        });
    });

    colorInputText.addEventListener('input', () => {
        const newColor = colorInputText.value;
        sizeOptions.forEach(btn => {
            btn.style.color = newColor;
            updateSelectedButton()
        });
    })

    textInput.addEventListener('input', () => {
        const newColor = textInput.value;
        sizeOptions.forEach(btn => {
            btn.innerHTML = newColor;
            updateSelectedButton()
        });
    })

    const initialColor = colorInput.value;
    sizeOptions.forEach(btn => (btn.style.backgroundColor = initialColor));
}

export function getSelectedButtonClone() {

    if (!selectedButton) return null;
    selectedButton.classList.remove("selected_button")
    const clone = selectedButton.cloneNode(true);


    selectedButton = ""


    return clone;
}


async function uploadFile(file) {
    if (!file) return null;

    const formData = new FormData();
    formData.append('file', file);

    try {
        const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

        const res = await fetch('/archivos/upload', {
            method: 'POST',
            headers: {
                'X-CSRF-TOKEN': token
            },
            body: formData
        });

        if (!res.ok) {
            // puedes parsear el JSON de error si lo devuelves desde Laravel
            const text = await res.text();
            throw new Error(`HTTP ${res.status}: ${text}`);
        }

        const data = await res.json();
        return data; // { success: true/false, url: '...', id: 123, message: '...' }
    } catch (err) {
        console.error('Error subiendo fichero:', err);
        throw err;
    }
}

export function SaveDocument(button, file = null) {
    if (file) {
        try {
            return uploadFile(file).then((resp) => {
                if (resp && resp.success) {
                    button.setAttribute("data-id", resp.id);
                    addDocumentDownloadEvenet(button)
                    ArrayDeleteWhenRelaod.push(resp.id)
                } else {
                    alert(resp?.message || 'Error al subir el archivo');
                }
            });

        } catch (err) {
            alert('Error al subir el archivo. Revisa la consola.');
        } finally {
            // ocultar loader, habilitar UI
        }
    } else {
        addDocumentDownloadEvenet(button)
    }

}
export function addDocumentDownloadEvenet(button) {
    button.addEventListener('click', () => {
        const fileId = button.dataset.id;
        window.open(`/descargar/${fileId}`, '_blank');
    });
}
export function saveRute(button, url = null) {
    if (url) {
        button.setAttribute("href", url)

    }
    addUrlEvent(button)
}
export function addUrlEvent(button) {
    button.addEventListener('click', () => {
        var url = button.getAttribute('href')
        window.open(url, '_blank');
    });
}

export function addToDeletedButtons(id) {
    ArrayaddToDeletedButtons.push(id)
}

window.addEventListener('clearTempFiles', () => {
    ArrayDeleteWhenRelaod = [];
    if (ArrayaddToDeletedButtons.length != 0) {
        console.log(ArrayaddToDeletedButtons)
        deleteArchivesArray(ArrayaddToDeletedButtons)
    }
});

window.addEventListener("beforeunload", () => {
    if (!ArrayDeleteWhenRelaod?.length) return;
    deleteArchivesArray(ArrayDeleteWhenRelaod)

});

function deleteArchivesArray(array) {
    const payload = {
        archivos: array
    };

    const blob = new Blob([JSON.stringify(payload)], {
        type: "application/json",
    });

    // Se enviará justo cuando el usuario recargue o cierre la pestaña
    navigator.sendBeacon("/api/eliminar-archivos", blob);
}