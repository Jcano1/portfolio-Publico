

import { OpenSelectButton } from './Admin-Proyectos/Button.js';
import { getSelectedButtonClone } from './Admin-Proyectos/Button.js';
import { SaveDocument } from './Admin-Proyectos/Button.js';
import { saveRute } from './Admin-Proyectos/Button.js';
import { addToDeletedButtons } from './Admin-Proyectos/Button.js';

import { openTextEditor } from './Admin-Proyectos/Text.js';
import { getText } from './Admin-Proyectos/Text.js';

import { OpenImageUploader } from './Admin-Proyectos/Image.js';
import { uploadImage } from './Admin-Proyectos/Image.js';
import { addToDeletedimg } from './Admin-Proyectos/Image.js';

import { OpenSelectedSeapartor } from './Admin-Proyectos/Separator.js';
import { GetCurrentSeparator } from './Admin-Proyectos/Separator.js';

import { serializeModule } from './Admin-Proyectos/JsonSave.js';
import { formJSON } from './Admin-Proyectos/JsonSave.js';


document.addEventListener("DOMContentLoaded", () => {

    let editingElement = null;
    let currentType = null;
    const btnAbrir = document.getElementById("btAddProjectos");
    const modal = document.getElementById("modal-opciones_columna");
    const modalEditor = document.getElementById("modal-editor");
    const closeEditor = document.getElementById("closeEditor");
    const formEditor = document.getElementById("editor-form");
    const cancelEditor = document.getElementById("cancelEditor");
    const saveEditor = document.getElementById("saveEditor");
    const btnCerrar = document.getElementById("closeModal");
    let targetColumn = null;
    const modal_diseño = document.getElementById("modal-opciones_diseño");
    const btnCerrar_diseño = document.getElementById("closeModal_diseño");

    btnCerrar_diseño.addEventListener("click", () => {
        modal_diseño.classList.add("hidden");
        resetEditor();
        targetColumn = null;
    });

    modal_diseño.addEventListener("mousedown", (e) => {
        if (e.target === modal_diseño) {
            modal_diseño.classList.add("hidden");
            resetEditor();
            targetColumn = null;
        }
    });

    cancelEditor.addEventListener("click", () => {
        modalEditor.classList.add("hidden");
        modal_diseño.classList.add("hidden");
        resetEditor();
        targetColumn = null;
    });
    closeEditor.addEventListener("mousedown", () => {
        modalEditor.classList.add("hidden");
        modal_diseño.classList.add("hidden");
        resetEditor();
        targetColumn = null;
    });

    modalEditor.addEventListener("mousedown", (e) => {
        if (e.target === modalEditor) {
            modalEditor.classList.add("hidden");
            modal_diseño.classList.add("hidden");
            resetEditor();
            targetColumn = null;
        }
    });
    btnAbrir.addEventListener("click", () => {
        modal.classList.remove("hidden");
    });

    btnCerrar.addEventListener("click", () => {
        modal.classList.add("hidden");
    });

    // Cerrar si hacen click fuera de la caja
    modal.addEventListener("mousedown", (e) => {
        if (e.target === modal) {
            modal.classList.add("hidden");
        }
    });

    function resetEditor() {
        currentType = null;
        editingElement = null;
        formEditor.innerHTML = "";
        saveEditor.textContent = "Guardar"; // por defecto modo creación
    }

    const container = document.getElementById("Container-pagina");
    const constr1 = document.getElementById("Select-button-1");
    const constr2 = document.getElementById("Select-button-2");
    const constr3 = document.getElementById("Select-button-3");

    let cajaIndex = 0; // contador global de cajas
    let quill;

    document.querySelectorAll("#modal-opciones_diseño div[data-type]").forEach(btn => {

        btn.addEventListener("click", () => {
            currentType = btn.dataset.type;

            // Limpiar formulario anterior
            formEditor.innerHTML = "";

            if (currentType === "text") {
                openTextEditor(formEditor)
                //openTextEditorForCreation()

            } else if (currentType === "image") {
                OpenImageUploader(formEditor)
            } else if (currentType === "button") {
                OpenSelectButton(formEditor)
            }
            else if (currentType === "separator") {
                OpenSelectedSeapartor(formEditor)
            }


            // Abrir modal editor
            modalEditor.classList.remove("hidden");
        });
    });
    function CargarCajas() {

        document.querySelectorAll('.caja-proyecto').forEach(elemento => {
            let i = 0;
            cajaIndex++;
            elemento.appendChild(createBoxActionBar(elemento));


            elemento.querySelectorAll('.Column-Container').forEach(Columna => {

                // añadir el botón de opciones
                Columna.innerHTML = Columna.innerHTML +
                    `<div class="w-[100%]  text-white p-6 rounded-xl">
                    <div id="ContainerForm">
                        <div class="flex flex-col items-center justify-center border-2 border-dashed border-[#315F68] rounded-xl p-6 cursor-pointer hover:bg-[#315F68]/20 transition"
                            id="btAddOpciones${cajaIndex}-${i}">
                            <span class="text-4xl font-bold text-[#315F68]">+</span>
                            <span class="mt-2 text-sm font-semibold text-[#315F68]">opciones</span>
                        </div>
                    </div>
                </div>`;

                Columna.querySelector(`#btAddOpciones${cajaIndex}-${i}`).addEventListener("click", () => {
                    targetColumn = Columna;
                    modal_diseño.classList.remove("hidden");
                });
                targetColumn = Columna;
                elemento.appendChild(Columna);
                let dataContainer = Columna.querySelector(`.Container_Data`);

                if (!dataContainer) {
                    dataContainer = document.createElement("div");
                    dataContainer.className = "Container_Data flex flex-col justify-center items-center gap-4 mb-4";
                    const botonAgregar = Columna.querySelector(`[id^="btAddOpciones"]`);
                    Columna.insertBefore(dataContainer, botonAgregar.parentElement.parentElement);
                }
                // 🔥 Detectar tipo en lugar de usar currentType (que es null)
                Columna.querySelectorAll('.item-proyecto').forEach(item => {
                    let detected = serializeModule(item);
                    item.appendChild(createActionBar(item, detected.type)); // ahora sí le pasas el tipo real
                    insertContent(item);
                    var button = item.querySelector('button')
                    if (button) {
                        if (button.getAttribute('href') && button.getAttribute('href') != '//') {
                            saveRute(button)
                        } else if (button.getAttribute('data-id') && button.getAttribute('data-id') != "0") {
                            SaveDocument(button)
                        }
                    }
                });
            });
        });
    }

    CargarCajas()

    function crearCaja(numColumnas) {
        cajaIndex++; // nueva caja → nuevo índice
        // Crear la caja principal
        const newBox = document.createElement("div");
        newBox.className = "caja-proyecto ";
        newBox.style.gridTemplateColumns = `repeat(${numColumnas}, 1fr)`;
        newBox.appendChild(createBoxActionBar(newBox));
        // Crear las columnas
        for (let i = 1; i <= numColumnas; i++) {
            const columna = document.createElement("div");
            columna.className = "rounded-md Column-Container";
            columna.id = `${cajaIndex}-${i}`; // ID con formato posición-columna

            columna.innerHTML = `
            <div class="w-[100%]  text-white p-6 rounded-xl">
                <div id="ContainerForm">
                    <div class="flex flex-col items-center justify-center border-2 border-dashed border-[#315F68] rounded-xl p-6 cursor-pointer hover:bg-[#315F68]/20 transition"
                        id="btAddOpciones${cajaIndex}-${i}">
                        <span class="text-4xl font-bold text-[#315F68]">+</span>
                        <span class="mt-2 text-sm font-semibold text-[#315F68]">opciones</span>
                    </div>
                </div>
            </div>
        `;
            modal.classList.add("hidden");


            columna.querySelector(`#btAddOpciones${cajaIndex}-${i}`).addEventListener("click", () => {
                targetColumn = columna;
                modal_diseño.classList.remove("hidden");
            });


            newBox.appendChild(columna);
            let dataContainer = columna.querySelector(`.Container_Data`);

            if (!dataContainer) {
                dataContainer = document.createElement("div");
                dataContainer.className = "Container_Data flex flex-col justify-center items-center gap-4 mb-4";
                const botonAgregar = columna.querySelector(`[id^="btAddOpciones"]`);
                columna.insertBefore(dataContainer, botonAgregar.parentElement.parentElement);
            }
        }

        // Insertar la caja en el contenedor principal
        container.appendChild(newBox);
    }
    function insertContent(elemento) {

        if (!targetColumn) return;

        let dataContainer = targetColumn.querySelector(`.Container_Data`);

        if (!dataContainer) {
            dataContainer = document.createElement("div");
            dataContainer.className = "Container_Data flex flex-col justify-center items-center gap-4 mb-4";
            const botonAgregar = targetColumn.querySelector(`[id^="btAddOpciones"]`);
            targetColumn.insertBefore(dataContainer, botonAgregar.parentElement.parentElement);
        }

        dataContainer.appendChild(elemento);
    }
    saveEditor.addEventListener("click", (e) => {
        e.preventDefault();

        if (editingElement) {
            // 👉 Modo edición -------------------------------------------------------------------------------------------------------------------------------------
            if (currentType === "text") {
                editingElement.innerHTML = getText();
            }
            else if (currentType === "image") {
                const file = document.getElementById("inputImagen").files[0];
                const width = document.getElementById("inputWidth").value;
                var SaveEditingElement = editingElement
                uploadImage(file, width, editingElement)
                    .then(html => {
                        SaveEditingElement.innerHTML = html || "";
                    })
                    .catch(err => {
                        editingElement.innerHTML = `<div class="error">Error al subir imagen</div>`;
                        console.error(err);
                    });
            }
            else if (currentType === "button") {
                editingElement.innerHTML = getSelectedButtonClone().outerHTML;
            }
            else if (currentType === "separator") {

                editingElement.innerHTML = GetCurrentSeparator()
            }


            modalEditor.classList.add("hidden");
            editingElement = null; // reset
            return;
        }

        // 👉 Modo creación -------------------------------------------------------------------------------------------------------------------------------------
        let wrapper = document.createElement("div");
        wrapper.className = "item-proyecto relative group w-full flex justify-center";

        let nuevoContenido = document.createElement("div");
        nuevoContenido.className = `contenido w-full`;
        if (currentType === "text") {
            nuevoContenido.innerHTML = getText();
        }

        else if (currentType === "image") {

            const file = document.getElementById("inputImagen").files[0];
            const width = document.getElementById("inputWidth").value;

            uploadImage(file, width)
                .then(html => {
                    nuevoContenido.innerHTML = html || "";
                })
                .catch(err => {
                    nuevoContenido.innerHTML = `<div class="error">Error al subir imagen</div>`;
                    console.error(err);
                });
        }
        else if (currentType === "button") {

            nuevoContenido.className = `contenido w-full flex justify-center items-center`;
            nuevoContenido.innerHTML = getSelectedButtonClone().outerHTML;
            const file = document.getElementById('inputFileUpload').files[0];
            const rute = document.getElementById('inputBtnLink').value;

            var button = nuevoContenido.querySelector('button')
            if (file) {
                SaveDocument(button, file)
            } else if (rute) {
                saveRute(button, rute)
            }
        }
        else if (currentType === "separator") {
            nuevoContenido.className = "contenido w-full flex justify-center";
            nuevoContenido.innerHTML = GetCurrentSeparator()
        }
        wrapper.appendChild(nuevoContenido);
        wrapper.appendChild(createActionBar(wrapper, currentType));

        insertContent(wrapper);
        modalEditor.classList.add("hidden");
    });


    // Asignamos eventos a los botones
    constr1.addEventListener('click', () => crearCaja(1));
    constr2.addEventListener('click', () => crearCaja(2));
    constr3.addEventListener('click', () => crearCaja(3));
    function getDragAfterElement(container, y) {
        const draggableElements = [...container.querySelectorAll(".item-proyecto:not(.dragging)")];

        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;
            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child };
            } else {
                return closest;
            }
        }, { offset: Number.NEGATIVE_INFINITY }).element;
    }
    function createActionBar(wrapper, type) {
        wrapper.setAttribute("draggable", "true");
        document.addEventListener("dragstart", (e) => {
            if (e.target.classList.contains("item-proyecto")) {
                e.dataTransfer.effectAllowed = "move";
                e.target.classList.add("dragging");
                e.target.style.cursor = "grabbing";
            }
        });

        document.addEventListener("dragend", (e) => {
            if (e.target.classList.contains("item-proyecto")) {
                e.target.classList.remove("dragging");
            }
        });

        document.addEventListener("dragover", (e) => {
            const dragging = document.querySelector(".dragging");
            if (!dragging) return;

            const container = e.target.closest(".Container_Data");
            if (container) {
                e.preventDefault();
                const afterElement = getDragAfterElement(container, e.clientY);
                if (afterElement == null) {
                    container.appendChild(dragging);
                } else {
                    container.insertBefore(dragging, afterElement);
                }
            }
        });



        const actionBar = document.createElement("div");
        actionBar.className = `item-toolbar flex justify-between items-center`;

        // 👉 Handle de arrastre
        const dragHandle = document.createElement("span");
        dragHandle.textContent = "⋮⋮⋮⋮";
        dragHandle.className = "cursor-move text-gray-400 px-2 drag-handle";

        // Botón editar
        const btnEdit = document.createElement("button");
        btnEdit.textContent = "✏️";
        btnEdit.className = "btn-edit";

        btnEdit.addEventListener("click", (e) => {

            e.stopPropagation();
            editingElement = wrapper.querySelector(".contenido");


            currentType = type;

            // 👉 reconstruir formulario ANTES de setear valores
            formEditor.innerHTML = "";

            if (type === "text") {
                const p = editingElement.querySelector(".Container-Text") ;
                openTextEditor(formEditor, p);
            } else if (type === "image") {
                const img = editingElement.querySelector("img");
                OpenImageUploader(formEditor, img)

            } else if (type === "button") {
                OpenSelectButton(formEditor, editingElement.querySelector('button'))
            }
            else if (currentType === "separator") {
                OpenSelectedSeapartor(formEditor, editingElement.querySelector("hr, div"))
            }
            modalEditor.classList.remove("hidden");
            saveEditor.textContent = "Actualizar";
        });

        // Botón eliminar
        const btnDelete = document.createElement("button");
        btnDelete.textContent = "🗑️";
        btnDelete.className = "btn-delete";
        btnDelete.addEventListener("click", (e) => {
            e.stopPropagation();
            console.log(wrapper)
            console.log(wrapper)
            if (wrapper.querySelector('img')) {
                console.log(wrapper.querySelector('img').getAttribute('data-id'))
                addToDeletedimg(wrapper.querySelector('img').getAttribute('data-id'))
            } else if (wrapper.querySelector('button')) {
                addToDeletedButtons(wrapper.querySelector('button').getAttribute('data-id'))
            }
            wrapper.remove();
        });

        // Añadir todo a la barra
        actionBar.appendChild(dragHandle);
        actionBar.appendChild(btnEdit);
        actionBar.appendChild(btnDelete);

        return actionBar;
    }
    function createBoxActionBar(box) {

        const actionBar = document.createElement("div");
        actionBar.className = "box-toolbar flex justify-end items-center gap-2 p-1";
        const btnUp = document.createElement("button");
        btnUp.textContent = "⬆️";
        btnUp.addEventListener("click", () => {
            const prev = box.previousElementSibling;
            if (prev) box.parentNode.insertBefore(box, prev);
        });

        // 👉 Botón bajar
        const btnDown = document.createElement("button");
        btnDown.textContent = "⬇️";
        btnDown.addEventListener("click", () => {
            const next = box.nextElementSibling;
            if (next) box.parentNode.insertBefore(next, box);
        });

        // 👉 Botón eliminar
        const btnDelete = document.createElement("button");
        btnDelete.textContent = "🗑️";
        btnDelete.addEventListener("click", () => {
            box.remove();
        });

        // 👉 Montar la barra
        actionBar.appendChild(btnUp);
        actionBar.appendChild(btnDown);
        actionBar.appendChild(btnDelete);

        return actionBar;
    }
    window.pageId = document.getElementById('btnGuardar').dataset.pageId;

    const btn = document.getElementById('btnGuardar');
    if (btn) {
        btn.addEventListener('click', (e) => formJSON(e, { download: false, post: false }));
    }

});