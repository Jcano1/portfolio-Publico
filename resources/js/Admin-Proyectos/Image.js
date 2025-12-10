var ArrayDeleteWhenRelaod = []
var ArrayaddToDeletedImg = []
export function OpenImageUploader(formEditor, img = null) {

    formEditor.innerHTML = `
            <label class="flex flex-col">
                Subir imagen:
                <input type="file" id="inputImagen" accept="image/*" class="border rounded p-2">
            </label>
            <label class="flex flex-col">
                Ancho (px):
                <input type="number" id="inputWidth" class="border rounded p-2" value="150">
            </label>
        `;
    if (img) {
        formEditor.innerHTML += `<img id="previewImagen" class="mt-2 max-h-32 object-contain"/>`
        document.getElementById("inputWidth").value = img.width || "";
        document.getElementById("previewImagen").src = img.src;
    }

}
export async function uploadImage(file, width, PreviousImage = null) {
    if (file) {
        // Obtenemos el id de la imagen actual (si existe)

        // Preparamos FormData
        const formData = new FormData();
        formData.append("imagen", file);

        if (PreviousImage) {
            const imgActual = PreviousImage.querySelector("img");
            const imageId = imgActual ? imgActual.dataset.id : null;
            if (imageId) formData.append("id", imageId);
        }


        return fetch("/imagenes/upload", {
            method: "POST",
            body: formData,
            headers: {
                "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').getAttribute("content")
            }
        })
            .then(r => r.json())
            .then(data => {
                if (data.success) {
                    ArrayDeleteWhenRelaod.push(data.id)
                    console.log(data.url)
                    return `<img src="${data.url}" width="${width}" class="rounded-lg" data-id="${data.id}" style="display: block; margin: 0 auto;"/>`;

                } else {

                    alert("Error al subir la imagen");
                }
            })
            .catch(err => console.error("Error:", err));
    }


}
window.addEventListener('clearTempFiles', () => {
    ArrayDeleteWhenRelaod = [];
    if (ArrayDeleteWhenRelaod.length != 0) {
        console.log(ArrayaddToDeletedImg)
        deleteImgArray(ArrayaddToDeletedImg)
    }

});
window.addEventListener("beforeunload", () => {
    if (!ArrayDeleteWhenRelaod?.length) return;
    deleteImgArray(ArrayDeleteWhenRelaod)
});
function deleteImgArray(Img) {
    console.log(Img)
    const payload = { imagenes: Img };
    const blob = new Blob([JSON.stringify(payload)], { type: "application/json" });
    // Se enviará al backend para eliminar imágenes temporales
    navigator.sendBeacon("/api/eliminar-imagenes", blob);
}
export function addToDeletedimg(id) {
    console.log('id')
    console.log(id)
    ArrayaddToDeletedImg.push(id)
}