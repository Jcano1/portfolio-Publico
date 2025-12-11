<?php if (isset($component)) { $__componentOriginal9ac128a9029c0e4701924bd2d73d7f54 = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginal9ac128a9029c0e4701924bd2d73d7f54 = $attributes; } ?>
<?php $component = App\View\Components\AppLayout::resolve([] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('app-layout'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\App\View\Components\AppLayout::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes([]); ?>


    <?php echo app('Illuminate\Foundation\Vite')(['resources/js/Portfolio_Habilidades.js']); ?>
    <?php echo app('Illuminate\Foundation\Vite')(['resources/css/portfolio.css']); ?>
    <?php echo app('Illuminate\Foundation\Vite')(['resources/js/Portfolio_Projectos.js']); ?>
    <?php echo app('Illuminate\Foundation\Vite')(['resources/js/contacto_Correo.js']); ?>
    <?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if BLOCK]><![endif]--><?php endif; ?><?php if(auth()->guard()->check()): ?>
        <?php echo app('Illuminate\Foundation\Vite')(['resources/js/Portfolio_Habilidades_Admin.js']); ?>
        <?php echo app('Illuminate\Foundation\Vite')(['resources/js/Portfolio_Projectos-admin.js']); ?>
        <?php echo app('Illuminate\Foundation\Vite')(['resources/js/portfolio_editData.js']); ?>
        <?php echo app('Illuminate\Foundation\Vite')(['resources/css/portfolio-admin.css']); ?>
    <?php endif; ?><?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if ENDBLOCK]><![endif]--><?php endif; ?>


    <div class="w-full h-fit  flex justify-center items-center flex-col">
        <div class="w-[60%]  bg-[#dceff3] flex items-end justify-start p-4 rounded-xl relative ContainerData">
            <?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if BLOCK]><![endif]--><?php endif; ?><?php if(auth()->guard()->check()): ?>
                <div id="ContainerButonEditData" class="absolute top-4 right-4 p-1">
                    <button id="ButonEditData">
                        <img src="<?php echo e(asset('storage/Icons/icono_lapiz.png')); ?>" alt="Lápiz de edición" class="h-6 w-6" />
                    </button>
                </div>
            <?php endif; ?><?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if ENDBLOCK]><![endif]--><?php endif; ?>
            <div class="flex flex-col gap-2 m-[40px]">
                <h1 class="text-[48px] font-bold text-left mb-[10px]" id="FullNameUser">
                    <?php echo e($admin
    ? $admin->name . ' ' . $admin->first_surname . ' ' . $admin->second_surname
    : 'No hay admin'); ?>

                </h1>
                <h3 class="text-left mb-[30px] text-[28px] " id="EmailUser"><?php echo e($admin?->email ?? 'No hay admin'); ?></h3>
                <h4 class="text-left mb-[30px] text-[20px] " id="PostUser"><?php echo e($admin?->puesto ?? 'No hay admin'); ?></h4>

                <a class="mb-7 bg-[#0cccf2] rounded-xl px-[20px] py-2 font-semibold w-fit hover:text-white"  href="#contacto">
                    Contactame
                </a>
            </div>
        </div>
        <div class="text-white w-[60%] h-[50%]  flex  justify-start p-4  flex-col relative">
            <?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if BLOCK]><![endif]--><?php endif; ?><?php if(auth()->guard()->check()): ?>
                <div id="ContainerButonEditDescription" class="absolute top-4 right-4 p-1">
                    <button id="ButonEditDescription">
                        <img src="<?php echo e(asset('storage/Icons/icono_lapiz.png')); ?>" alt="Lápiz de edición"
                            class="h-6 w-6 invert" />
                    </button>
                </div>
            <?php endif; ?><?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if ENDBLOCK]><![endif]--><?php endif; ?>
            <h1 class="text-[36px] py-[10px] scroll-mt-16" id="QuienSoy">Quien soy </h1>
            <div class="text-[16px] overflow-auto" style="white-space: pre-wrap; margin: 0;" id="Description"><?php echo $admin?->description ?? 'No hay admin'; ?></div>
        </div>
        <div class="text-white w-[60%] h-[50%]  flex  justify-start p-4  flex-col" id="ContainerHabilidades">
            <h1 class="text-[36px] py-[10px] scroll-mt-16" id="Habilidades">Habilidades </h1>
            <div class="w-[100%]  text-white p-6 rounded-xl shadow" id="ContainerGrid">
                <!-- esto es una plantilla -->
                <template id="Plantilla-barras" class="hidden">
                    <div class="flex flex-col">
                        <div class="habilidad-header">
                            <span class="block font-semibold mb-1 Name-Habilidad"></span>
                            <?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if BLOCK]><![endif]--><?php endif; ?><?php if(auth()->guard()->check()): ?>
                                <div class="habilidad-actions"></div>
                            <?php endif; ?><?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if ENDBLOCK]><![endif]--><?php endif; ?>
                        </div>
                        <div class="w-full bg-color_fondo_barra rounded-full h-4 Container-prueba">
                            <div class="h-4 rounded-full Barra-Color"></div>
                        </div>
                    </div>
                </template>

                <!-- Aquí se insertarán todas las barras -->
                <div id="contenedor-barras"></div>

            </div>
            <?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if BLOCK]><![endif]--><?php endif; ?><?php if(auth()->guard()->check()): ?>
                <div class="w-[100%]  text-white p-6 rounded-xl shadow">
                    <div id="ContainerForm">
                        <div class="flex flex-col items-center justify-center border-2 border-dashed border-[#315F68] rounded-xl p-6 cursor-pointer hover:bg-[#315F68]/20 transition"
                            id="btAddHabilidades">
                            <span class="text-4xl font-bold text-[#315F68]">+</span>
                            <span class="mt-2 text-sm font-semibold text-[#315F68]">Añadir habilidad</span>
                        </div>
                    </div>
                </div>
            <?php endif; ?><?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if ENDBLOCK]><![endif]--><?php endif; ?>

        </div>
        <div class="text-white w-[60%] h-[50%]  flex  justify-start p-4  flex-col" id="ContainerHabilidades">
            <h1 class="text-[36px] py-[10px] scroll-mt-16" id="Proyectos">Proyectos</h1>


            <!-- Plantilla proyectos -->
            <template id="Plantilla-proyectos" class="hidden">
                <a href="" draggable="false">
                    <div class="card relative">
                        <?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if BLOCK]><![endif]--><?php endif; ?><?php if(auth()->guard()->check()): ?>
                            <div id="ContainerButonDeleteProyect" class="absolute top-[5px] right-[5px] p-1 z-50">
                                <button id="Cancel ">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="red"
                                        viewBox="0 0 24 24">
                                        <path
                                            d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.39l2.12-2.12 1.41 1.41-2.12 2.12 2.12 2.12-1.41 1.41-2.12-2.12-2.12 2.12-1.41-1.41 2.12-2.12-2.12-2.12 1.41-1.41zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                                    </svg>
                                </button>
                            </div>
                        <?php endif; ?><?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if ENDBLOCK]><![endif]--><?php endif; ?>
                        <div class="card-image">
                            <i class="fas fa-image text-gray-500 text-4xl"></i>
                        </div>
                        <div class="card-text">
                            <p class="font-bold text-gray-700 Titulo-Proyecto">Título de Ejemplo</p>
                            <p class="text-sm text-gray-600 Descripción-Proyecto">Texto que puede ser bastante largo y
                                necesitar
                                manejo especial
                                en la tarjeta para mantenerse legible.</p>
                        </div>
                    </div>
                </a>
            </template>

            <!-- Contenedor de proyectos -->
            <div id="ContainerProjectos" class="proyectos-row">
            </div>
            <?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if BLOCK]><![endif]--><?php endif; ?><?php if(auth()->guard()->check()): ?>
                <div class="w-[100%]  text-white p-6 rounded-xl shadow">
                    <div id="ContainerForm">
                        <div class="flex flex-col items-center justify-center border-2 border-dashed border-[#315F68] rounded-xl p-6 cursor-pointer hover:bg-[#315F68]/20 transition"
                            id="btAddProjectos">
                            <span class="text-4xl font-bold text-[#315F68]">+</span>
                            <span class="mt-2 text-sm font-semibold text-[#315F68]">Añadir projecto</span>
                        </div>
                    </div>
                </div>
            <?php endif; ?><?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if ENDBLOCK]><![endif]--><?php endif; ?>
        </div>
        <?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if BLOCK]><![endif]--><?php endif; ?><?php if(auth()->guard()->check()): ?>
            <div id="modal-confirm-delete"
                class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center hidden z-50">
                <div class="bg-white rounded-xl shadow-lg w-[90%] md:w-[400px] p-6 relative">
                    <button id="closeDeleteModal"
                        class="absolute top-3 right-3 text-gray-500 hover:text-black text-2xl">&times;</button>

                    <h2 class="text-xl font-bold mb-2 text-red-600">⚠️ Confirmar Eliminación</h2>
                    <p class="text-gray-700 mb-6">¿Estás seguro de que deseas **borrar** este proyecto de forma permanente?
                        Esta acción no se puede deshacer.</p>

                    <input type="hidden" id="projectIdToDelete" value="">

                    <div class="mt-4 flex justify-end gap-3">
                        <button id="cancelDelete"
                            class="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition">Cancelar</button>
                        <button id="confirmDelete"
                            class="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition font-semibold">Sí,
                            Borrar Proyecto</button>
                    </div>
                </div>
            </div>
        <?php endif; ?><?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if ENDBLOCK]><![endif]--><?php endif; ?>
        <?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if BLOCK]><![endif]--><?php endif; ?><?php if(auth()->guard()->check()): ?>
            <div id="modal" class="fixed inset-0 bg-black/50 flex items-center justify-center hidden">
                <div class="bg-[#DCEFF3] text-black rounded-xl p-6 w-[400px] shadow-lg relative">
                    <!-- Botón cerrar -->
                    <button id="closeModal" class="absolute top-2 right-2 text-gray-500 hover:text-gray-800">
                        ✖
                    </button>

                    <h2 class="text-xl font-bold mb-6">Nuevo Proyecto</h2>

                    <!-- FORM -->
                    <form id="formProyecto" action="<?php echo e(route('proyectos.store')); ?>" method="POST"
                        enctype="multipart/form-data">
                        <?php echo csrf_field(); ?>

                        
                        <div class="mb-4">
                            <label for="titulo" class="block text-sm font-medium text-gray-700 mb-1">
                                Título
                            </label>
                            <input id="titulo" name="titulo" type="text" placeholder="Escribe el título del proyecto"
                                class="form-input_Proyecto" required />
                        </div>

                        
                        <div class="mb-4">
                            <label for="ShortDescription" class="block text-sm font-medium text-gray-700 mb-1">
                                Descripción corta
                            </label>
                            <textarea id="ShortDescription" name="ShortDescription" rows="3"
                                placeholder="Escribe una breve descripción del proyecto"
                                class="form-input_Proyecto"></textarea>
                        </div>

                        
                        <div class="mb-4">
                            <label for="ImgRute" class="block text-sm font-medium text-gray-700 mb-1">
                                Imagen del proyecto
                            </label>
                            <input id="ImgRute" name="ImgRute" type="file" accept="image/*" class="form-input_Proyecto" />
                        </div>

                        
                        <div class="flex space-x-3">
                            <button type="submit"
                                class="flex-1 py-2 rounded-lg bg-[#0cccf2] hover:bg-[#09b2d4] hover:text-white transition">
                                Crear
                            </button>
                            <button type="button" id="cancelar"
                                class="flex-1 bg-red-500 text-black py-2 rounded-lg hover:bg-red-600 hover:text-white transition">
                                Cancelar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        <?php endif; ?><?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if ENDBLOCK]><![endif]--><?php endif; ?>
        <div class="text-white w-[60%] h-[50%]  flex  justify-center p-4  flex-col" id="ContainerFormContacto">
            <h1 class="text-[36px] py-[10px] scroll-mt-16" id="contacto"> Contactame </h1>
            <div class="container-Contacto py-[50px]">
                
                <form id="contactForm" method="POST" action="<?php echo e(route('contact.send')); ?>" class="form-container">
                    <?php echo csrf_field(); ?>

                    
                    <div>
                        <label for="name" class="form-label">Nombre:</label>
                        <input type="text" id="name" name="name" required class="form-input">
                    </div>

                    <div>
                        <label for="email" class="form-label">Email:</label>
                        <input type="email" id="email" name="email" required class="form-input">
                    </div>

                    <div>
                        <label for="message" class="form-label">Mensaje:</label>
                        
                        <textarea id="message" name="message" rows="5" required class="form-input"></textarea>
                    </div>

                    <div id="statusMessage" style="margin-top: 15px;"></div>

                    
                    <button type="submit" class="form-button">Enviar Mensaje</button>
                </form>
            </div>
        </div>
    </div>

 <?php echo $__env->renderComponent(); ?>
<?php endif; ?>
<?php if (isset($__attributesOriginal9ac128a9029c0e4701924bd2d73d7f54)): ?>
<?php $attributes = $__attributesOriginal9ac128a9029c0e4701924bd2d73d7f54; ?>
<?php unset($__attributesOriginal9ac128a9029c0e4701924bd2d73d7f54); ?>
<?php endif; ?>
<?php if (isset($__componentOriginal9ac128a9029c0e4701924bd2d73d7f54)): ?>
<?php $component = $__componentOriginal9ac128a9029c0e4701924bd2d73d7f54; ?>
<?php unset($__componentOriginal9ac128a9029c0e4701924bd2d73d7f54); ?>
<?php endif; ?><?php /**PATH C:\Users\javier\Desktop\Trabajo\Porta_folio-12.4\resources\views/Port_Folio.blade.php ENDPATH**/ ?>