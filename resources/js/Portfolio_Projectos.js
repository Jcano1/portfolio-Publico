
const container = document.getElementById("ContainerProjectos");

let isDown = false;
let startX;
let scrollLeft;
let isDragging = false;

container.addEventListener("mousedown", (e) => {
  // Solo botón izquierdo
  if (e.button !== 0) return;
  isDown = true;
  isDragging = false;
  container.classList.add("grabbing");
  startX = e.pageX - container.offsetLeft;
  scrollLeft = container.scrollLeft;
});

container.addEventListener("mouseleave", () => {
  isDown = false;
  container.classList.remove("grabbing");
});

container.addEventListener("mouseup", (e) => {
  container.classList.remove("grabbing");
  if (isDragging) {
    e.preventDefault();
    const link = e.target.closest("a");
    if (link) {
      link.onclick = (ev) => ev.preventDefault();
      setTimeout(() => (link.onclick = null), 0);
    }
  }
  isDown = false;
});

container.addEventListener("mousemove", (e) => {
  if (!isDown || e.buttons !== 1) return;
  e.preventDefault();
  const x = e.pageX - container.offsetLeft;
  const walk = x - startX; // relación 1:1
  if (Math.abs(walk) > 5) {
    isDragging = true;
  }
  container.scrollLeft = scrollLeft - walk;
});

function crearProyecto(proyecto) {
  const template = document.querySelector('#Plantilla-proyectos');
  const clone = template.content.cloneNode(true);
  console.log(proyecto)
  clone.querySelector('.Titulo-Proyecto').textContent = proyecto.title;
  if (proyecto.imagen) {
    clone.querySelector('.card-image').innerHTML = `<img src="/storage/${proyecto.imagen.ruta}" alt=""  class="card-img" draggable="false" />`
  }
  clone.querySelector('.Descripción-Proyecto').innerHTML = proyecto.ShortDescription
  clone.querySelector('a').setAttribute('href', `/Proyectos/${proyecto.id}`)
  return clone;
}

function CargarProyectos() {
  fetch("/Proyectos")
    .then(response => response.json())
    .then(data => {

      const container = document.querySelector('#ContainerProjectos');

      if (!data || data.length === 0) {
        container.innerHTML = "<p class='text-gray-500'>No hay proyectos todavía.</p>";
        return;
      }

      // Limpiar antes de volver a cargar
      container.innerHTML = "";

      data.forEach(proy => {
        container.appendChild(crearProyecto(proy));
      });
      const event = new CustomEvent('projectsLoaded', {
        detail: { count: data.length }
      });
      document.dispatchEvent(event);
      document.addEventListener("dragstart", (e) => {
        if (e.target.tagName === "a") {
          e.preventDefault();
        }
      });
    })
    .catch(error => console.error("❌ Error cargando proyectos:", error));
}

// Hacer accesible globalmente si quieres recargar tras crear
window.CargarProyectos = CargarProyectos;

// Cargar proyectos al inicio
CargarProyectos();