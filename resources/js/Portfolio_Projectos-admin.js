const modal = document.getElementById("modal");
const openBtn = document.getElementById("btAddProjectos");
const closeBtn = document.getElementById("closeModal");
const cancelarBtn = document.getElementById("cancelar");
const form = document.getElementById("formProyecto");

// Abrir modal
openBtn.addEventListener("click", () => {
  modal.classList.remove("hidden");
});

// Cerrar modal con botones
closeBtn.addEventListener("click", () => {
  modal.classList.add("hidden");
});
cancelarBtn.addEventListener("click", () => {
  modal.classList.add("hidden");
});

// Cerrar modal al hacer click fuera del contenido
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.add("hidden");
  }
});
let targetCardElement = null;
document.addEventListener('projectsLoaded', function (event) {
  const deleteButtons = document.querySelectorAll('#ContainerButonDeleteProyect button');


  const modal = document.getElementById('modal-confirm-delete');
  const closeBtn = document.getElementById('closeDeleteModal');
  const cancelBtn = document.getElementById('cancelDelete');
  const confirmBtn = document.getElementById('confirmDelete');
  const projectIdInput = document.getElementById('projectIdToDelete');

  // Función para cerrar el modal
  const closeModal = () => {
    modal.classList.add('hidden');
  };

  deleteButtons.forEach(deleteButton => {

    deleteButton.addEventListener('click', (e) => {
      e.stopPropagation();
      e.preventDefault();
      console.log('✅ ¡Acción de administrador sobre un botón! El enlace NO DEBE FUNCIONAR.');

      const cardLink = deleteButton.closest('a');
      if (!cardLink) return;
      targetCardElement = deleteButton.closest('a')
      // Suponiendo que el ID se extrae de la URL del 'href'
      const projectId = cardLink.getAttribute('href').split('/').pop();

      // 2. Guardar el ID en el campo oculto
      projectIdInput.value = projectId;

      // 3. Mostrar el modal
      modal.classList.remove('hidden');

      console.log(`Modal abierto para el Proyecto ID: ${projectId}`);
    });
  });

  closeBtn.addEventListener('click', closeModal);
  cancelBtn.addEventListener('click', closeModal);

  // Cerrar al hacer click fuera del modal (en el overlay)
  modal.addEventListener('click', (e) => {
    // Si el clic fue directamente en el contenedor del modal (el overlay)
    if (e.target.id === 'modal-confirm-delete') {
      closeModal();
    }
  });

  confirmBtn.addEventListener('click', () => {
    const id = projectIdInput.value;
    if (id) {
      const csrfToken = document.querySelector('meta[name="csrf-token"]').content;
      console.log(csrfToken)

      const url = `/api/Proyecto/Delete/${id}`;

      console.log(`🔥 INICIANDO BORRADO DEL PROYECTO ID: ${id}`);

      fetch(url, {
        method: 'POST', // O 'DELETE' si usaste Route::delete
        headers: {
          'Content-Type': 'application/json',
          // Incluir el token CSRF para seguridad
          'X-CSRF-TOKEN': csrfToken
        }
      })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            console.log(data.message);
            
          } else {
            console.error('Error al borrar:', data.message);
          }
        })
        .catch(error => console.error('Error de conexión:', error));
      setTimeout(() => {
        closeModal();
        targetCardElement.remove();
      }, 500);
    }
  });
});