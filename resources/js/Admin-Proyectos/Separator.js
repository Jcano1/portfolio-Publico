var tipo = ""
var CurrentSeparator = '<hr class="Separator" style="width: 80%; border: 1px solid white; border-radius: 2px;">'
export function OpenSelectedSeapartor(formEditor, Separator = "") {

    let currentSeparatorType = "solid";
    if (Separator) {
        const content = Separator.cloneNode(true)

        if (content && content.tagName === "DIV") {
            currentSeparatorType = "space";
        } else if (content && content.style.borderTopStyle === "dashed") {
            currentSeparatorType = "dashed";
        }
    }

    formEditor.innerHTML = `
                    <div class="flex justify-center space-x-16 mt-8">
                        <div class="flex flex-col items-center opcion-sep" data-type="space">
                            <div class="w-20 h-20 ${currentSeparatorType === "space" ? "selected-sep" : ""} bg-white rounded-full shadow-lg flex items-center justify-center mb-3 cursor-pointer hover:scale-105 transition">
                                <i class="fas fa-arrows-alt-v text-4xl text-gray-800"></i>
                            </div>
                            <span class="text-gray-700">Espacio</span>
                        </div>
                        <div class="flex flex-col items-center opcion-sep" data-type="solid">
                            <div class="w-20 h-20 ${currentSeparatorType === "solid" ? "selected-sep" : ""} bg-white rounded-full shadow-lg flex items-center justify-center mb-3 cursor-pointer hover:scale-105 transition">
                                <i class="fas fa-minus text-4xl text-gray-800"></i>
                            </div>
                            <span class="text-gray-700">Línea continua</span>
                        </div>
                        <div class="flex flex-col items-center opcion-sep" data-type="dashed">
                            <div class="w-20 h-20 ${currentSeparatorType === "dashed" ? "selected-sep" : ""} bg-white rounded-full shadow-lg flex items-center justify-center mb-3 cursor-pointer hover:scale-105 transition" style:"box-shadow: 0 0 0 4px #0CCCF2 inset;">
                                <i class="fas fa-ellipsis-h text-4xl text-gray-800"></i>
                            </div>
                            <span class="text-gray-700">Línea discontinua</span>
                        </div>
                    </div>
                `;

    formEditor.querySelectorAll(".opcion-sep").forEach(opcion => {
        opcion.addEventListener("click", () => {
            tipo = opcion.dataset.type;
            if (tipo === "space") {
                // Espacio vertical
                CurrentSeparator = `<div class="Separator" style="height: 2rem;"></div>`;
            } else if (tipo === "solid") {
                // Línea continua
                CurrentSeparator = `<hr class="Separator" style="width: 80%; border: 1px solid white; border-radius: 2px;">`;
            } else if (tipo === "dashed") {
                // Línea discontinua
                CurrentSeparator = `<hr class="Separator" style="width: 80%; border-top: 2px dashed white;">`;
            }
            formEditor.querySelectorAll(".opcion-sep div").forEach(div => {
                div.classList.remove("selected-sep");
            });
            opcion.querySelector("div").classList.add("selected-sep");

        });
    });
}

export function GetCurrentSeparator() {
    return CurrentSeparator
}