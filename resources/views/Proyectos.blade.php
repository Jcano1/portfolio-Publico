<x-app-layout>
    <link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet">
    <script src="https://cdn.quilljs.com/1.3.6/quill.js"></script>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet" />
    <script src="https://cdn.jsdelivr.net/npm/quill-delta-to-html/dist/quill-delta-to-html.js"></script>
    @auth
        @vite(['resources/css/Proyectos-admin.css'])
        @vite(['resources/js/Proyectos-admin.js'])
    @else
        @vite(['resources/css/Proyectos.css'])
        @vite(['resources/js/proyectos.js'])
    @endauth



    {{-- Barra secundaria justo debajo del nav --}}
    @auth
        <div class="w-full bg-[#315F68] text-white px-6 py-3 shadow-md sticky top-0 mt-[-30px] admin-bar">
            <div class="max-w-7xl mx-auto flex justify-between items-center">
                <h2 class="text-lg font-semibold">{{ $page->title ?? "no funciona" }}</h2>
                <div class="flex gap-4">
                    <a href="#" id="btnGuardar" class="hover:text-[#0cccf2]" data-page-id="{{ $page->id }}">
                        Guardar
                    </a>
                    <a href="" class="hover:text-[#0cccf2]">Cancelar</a>
                </div>
            </div>
        </div>
    @endauth
    <div class="w-full h-fit  flex justify-center items-center flex-col">
        <div class="text-white w-[60%] h-[50%]  flex  justify-start p-4  flex-col">



            <div id="Container-pagina" class="grid gap-4 p-4">
                @foreach ($page->structure as $block)
                    @include('partials.render-block', ['block' => $block])
                @endforeach
            </div>


            @auth
                <div class="w-[100%]  text-white p-6 rounded-xl shadow">
                    <div id="ContainerForm">
                        <div class="flex flex-col items-center justify-center border-2 border-dashed border-[#315F68] rounded-xl p-6 cursor-pointer hover:bg-[#315F68]/20 transition"
                            id="btAddProjectos">
                            <span class="text-4xl font-bold text-[#315F68]">+</span>
                            <span class="mt-2 text-sm font-semibold text-[#315F68]">Añadir Caja</span>
                        </div>
                    </div>
                </div>
            @endauth
        </div>
    </div>
    <div id="modal-opciones_columna"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center hidden z-50">
        <div class="bg-white rounded-xl shadow-lg w-[90%] max-w-lg p-6 relative">
            <!-- Botón cerrar -->
            <button id="closeModal" class="absolute top-3 right-3 text-gray-500 hover:text-black text-2xl">
                &times;
            </button>

            <!-- Contenido del modal -->
            <div class="flex justify-center items-center space-x-16 my-8">
                <!-- 1 Column Icon -->
                <div class="column-icon flex flex-col items-center cursor-pointer" id="Select-button-1">
                    <div
                        class="w-24 h-24 rounded-lg border-4 border-gray-700 flex items-center justify-center bg-white shadow-md">
                        <div class="w-16 h-16 bg-gray-700 rounded"></div>
                    </div>
                    <p class="mt-3 text-gray-700 font-medium">1 Columna</p>
                </div>

                <!-- 2 Column Icon -->
                <div class="column-icon flex flex-col items-center cursor-pointer" id="Select-button-2">
                    <div
                        class="w-24 h-24 rounded-lg border-4 border-gray-700 flex items-center justify-center bg-white shadow-md">
                        <div class="flex w-16 h-16 space-x-1">
                            <div class="w-7 h-16 bg-gray-700 rounded"></div>
                            <div class="w-7 h-16 bg-gray-700 rounded"></div>
                        </div>
                    </div>
                    <p class="mt-3 text-gray-700 font-medium">2 Columnas</p>
                </div>

                <!-- 3 Column Icon -->
                <div class="column-icon flex flex-col items-center cursor-pointer" id="Select-button-3">
                    <div
                        class="w-24 h-24 rounded-lg border-4 border-gray-700 flex items-center justify-center bg-white shadow-md">
                        <div class="flex w-16 h-16 space-x-1">
                            <div class="w-5 h-16 bg-gray-700 rounded"></div>
                            <div class="w-5 h-16 bg-gray-700 rounded"></div>
                            <div class="w-5 h-16 bg-gray-700 rounded"></div>
                        </div>
                    </div>
                    <p class="mt-3 text-gray-700 font-medium">3 Columnas</p>
                </div>
            </div>
        </div>
    </div>
    <!-- Modal general -->
    <div id="modal-opciones_diseño"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center hidden z-50">
        <div class="bg-white rounded-xl shadow-lg w-fit p-[45px]  relative">
            <button id="closeModal_diseño"
                class="absolute top-3 right-3 text-gray-500 hover:text-black text-2xl">&times;</button>
            <h2 class="text-xl font-bold mb-4">Añadir contenido</h2>
            <div class="flex flex-col gap-4">

                <div class="flex justify-center space-x-16 mt-8">
                    <div class="flex flex-col items-center opcion" data-type="text">
                        <div class="w-20 h-20 bg-white rounded-full shadow-lg flex items-center justify-center mb-3">
                            <i class="fas fa-font text-4xl text-gray-800"></i>
                        </div>
                        <span class="text-gray-700">Texto</span>
                    </div>
                    <div class="flex flex-col items-center opcion" data-type="image">
                        <div class="w-20 h-20 bg-white rounded-full shadow-lg flex items-center justify-center mb-3">
                            <i class="fas fa-image text-4xl text-gray-800"></i>
                        </div>
                        <span class="text-gray-700">Imágenes</span>
                    </div>
                    <div class="flex flex-col items-center opcion" data-type="button">
                        <div class="w-20 h-20 bg-white rounded-full shadow-lg flex items-center justify-center mb-3">
                            <i class="fas fa-square text-4xl text-gray-800"></i>
                        </div>
                        <span class="text-gray-700">Botones</span>
                    </div>
                    <div class="flex flex-col items-center opcion" data-type="separator">
                        <div class="w-20 h-20 bg-white rounded-full shadow-lg flex items-center justify-center mb-3">
                            <i class="fas fa-grip-lines text-4xl text-gray-800">
                            </i>
                        </div>
                        <span class="text-gray-700">
                            Separadores
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div id="modal-editor" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center hidden z-50">
        <div class="bg-white rounded-xl shadow-lg w-[60%]  p-6 relative">
            <button id="closeEditor"
                class="absolute top-3 right-3 text-gray-500 hover:text-black text-2xl">&times;</button>
            <h2 id="editor-title" class="text-xl font-bold mb-4">Editar contenido</h2>

            <form id="editor-form" class="flex flex-col gap-4">
                <!-- Aquí se insertarán los inputs dinámicamente -->
            </form>

            <div class="mt-6 flex justify-end gap-4">
                <button id="cancelEditor" class="px-4 py-2 bg-red-500 text-black py-2 rounded-lg hover:bg-red-600 hover:text-white transition">Cancelar</button>
                <button id="saveEditor" class="px-4 py-2 rounded-lg bg-[#0cccf2] hover:bg-[#09b2d4] hover:text-white transition">Guardar</button>
            </div>
        </div>
    </div>

</x-app-layout>