function crearBarra(habilidad) {
    const template = document.querySelector('#Plantilla-barras');
    const clone = template.content.cloneNode(true);
    const barra = clone.querySelector('.Barra-Color');

    clone.querySelector('.Name-Habilidad').textContent = habilidad.nombre;
    barra.style.backgroundColor = habilidad.colores;


    barra.style.width = '0%';

    const porcentaje = Math.min(habilidad.nivel * 10, 100);


    setTimeout(() => {
        barra.style.width = `${porcentaje}%`;
    }, 150); // Un pequeño margen para asegurar que el DOM ya lo renderizó

    const actions = clone.querySelector('.habilidad-actions');
    if (actions) {
        actions.id = habilidad.id;
    }

    return clone;
}
function CargarBarras(){
fetch("/habilidades")
    .then(response => response.json())
    .then(data => {
        if (data.length == 0) {
            const container = document.querySelector('#contenedor-barras');
            container.innerHTML = "";

        } else {
            const container = document.querySelector('#contenedor-barras');
            container.classList.add('grid');
            container.classList.remove('columna1', 'columna2', 'columna3');

            if (data.length >= 1 && data.length <= 3) {
                container.classList.add('columna1');
            } else if (data.length >= 4 && data.length <= 6) {
                container.classList.add('columna2');
            } else if (data.length >= 7) {
                container.classList.add('columna3');
            }

            // Limpiar antes de volver a añadir
            container.innerHTML = "";

            data.forEach(hab => {
                container.appendChild(crearBarra(hab));
            });
            document.dispatchEvent(new Event("habilidadesCargadas"));
        }
    })
    .catch(error => console.error("Error cargando habilidades:", error));
}
window.CargarBarras = CargarBarras;
CargarBarras()















// -------------------------------------------------------
