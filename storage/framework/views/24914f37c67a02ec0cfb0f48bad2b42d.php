<!DOCTYPE html>
<html lang="<?php echo e(str_replace('_', '-', app()->getLocale())); ?>">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="<?php echo e(csrf_token()); ?>">

    <title><?php echo e(config('app.name', 'Laravel')); ?></title>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />
    <link href="https://fonts.googleapis.com/css2?family=Fira+Mono&display=swap" rel="stylesheet">

    <!-- Scripts -->
    <?php echo app('Illuminate\Foundation\Vite')(['resources/css/app.css', 'resources/js/app.js', 'resources/css/footer.css',]); ?>

    <!-- Styles -->
    <?php echo \Livewire\Mechanisms\FrontendAssets\FrontendAssets::styles(); ?>

</head>

<body class="font-sans antialiased">
    <?php if (isset($component)) { $__componentOriginalff9615640ecc9fe720b9f7641382872b = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginalff9615640ecc9fe720b9f7641382872b = $attributes; } ?>
<?php $component = Illuminate\View\AnonymousComponent::resolve(['view' => 'components.banner','data' => []] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? $attributes->all() : [])); ?>
<?php $component->withName('banner'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag): ?>
<?php $attributes = $attributes->except(\Illuminate\View\AnonymousComponent::ignoredParameterNames()); ?>
<?php endif; ?>
<?php $component->withAttributes([]); ?>
<?php echo $__env->renderComponent(); ?>
<?php endif; ?>
<?php if (isset($__attributesOriginalff9615640ecc9fe720b9f7641382872b)): ?>
<?php $attributes = $__attributesOriginalff9615640ecc9fe720b9f7641382872b; ?>
<?php unset($__attributesOriginalff9615640ecc9fe720b9f7641382872b); ?>
<?php endif; ?>
<?php if (isset($__componentOriginalff9615640ecc9fe720b9f7641382872b)): ?>
<?php $component = $__componentOriginalff9615640ecc9fe720b9f7641382872b; ?>
<?php unset($__componentOriginalff9615640ecc9fe720b9f7641382872b); ?>
<?php endif; ?>

    <div class="min-h-screen  bg-[#102023]">
        <?php
$__split = function ($name, $params = []) {
    return [$name, $params];
};
[$__name, $__params] = $__split('navigation-menu');

$key = null;

$key ??= \Livewire\Features\SupportCompiledWireKeys\SupportCompiledWireKeys::generateKey('lw-2362046721-0', null);

$__html = app('livewire')->mount($__name, $__params, $key);

echo $__html;

unset($__html);
unset($__name);
unset($__params);
unset($__split);
if (isset($__slots)) unset($__slots);
?>
        <!-- Page Heading -->
        <?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if BLOCK]><![endif]--><?php endif; ?><?php if(isset($header)): ?>
            <header class="bg-white shadow">
                <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <?php echo e($header); ?>

                </div>
            </header>
        <?php endif; ?><?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if ENDBLOCK]><![endif]--><?php endif; ?>

        <!-- Page Content -->
        <main>
            <?php echo e($slot); ?>

        </main>
        <div class="Space">

        </div>
        <footer class="main-footer">
            <div class="footer-content">
                
                <div class="footer-column Column-Container">
                    <h3 class="footer-title">Contacto</h3>
                    <p>Email: <a href="mailto:<?php echo e($admin?->email ?? 'correo@ejemplo.com'); ?>" class="footer-link"><?php echo e($admin?->email ?? 'correo@ejemplo.com'); ?></a></p>
                    <p>Puesto: <?php echo e($admin?->puesto ?? 'Desarrollador Web'); ?></p>
                    <?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if BLOCK]><![endif]--><?php endif; ?><?php if(auth()->guard()->check()): ?>
                        
                        <form method="POST" action="<?php echo e(route('logout')); ?>" x-data>
                            <?php echo csrf_field(); ?>
                            
                            <p>
                                <a class="footer-link" 
                                href="<?php echo e(route('logout')); ?>" 
                                @click.prevent="$root.submit();"> 
                                    Logout
                                </a>
                            </p>
                        </form>
                    <?php else: ?>
                        
                        <p><a class="footer-link" href="<?php echo e(route('login')); ?>">Login</a></p>
                    <?php endif; ?><?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if ENDBLOCK]><![endif]--><?php endif; ?>

                    
                </div>

                
                <div class="footer-column Column-Container">
                    <h3 class="footer-title">Navegación Rápida</h3>
                    <ul class="footer-links-list contenido ul">
                        <li><a href="#QuienSoy" class="footer-link">Sobre Mí</a></li>
                        <li><a href="#Habilidades" class="footer-link">Habilidades</a></li>
                        <li><a href="#Proyectos" class="footer-link">Proyectos</a></li>
                        <li><a href="#contacto" class="footer-link">Contáctame</a></li>
                    </ul>
                </div>

                
                <div class="footer-column Column-Container">
                    <h3 class="footer-title">Sígueme</h3>

                    <div class="social-icons">
                        
                        <a href="https://www.linkedin.com/in/javier-cano-6897403a0/" target="_blank" class="social-link" aria-label="LinkedIn">
                            <img src="<?php echo e(asset('storage/Icons/icono_Linkedin.png')); ?>" alt="">
                        </a>
                        <a href="https://github.com/Jcano1/portfolio-Publico" target="_blank" class="social-link" aria-label="GitHub">
                            <img src="<?php echo e(asset('storage/Icons/icono_github.png')); ?>" alt="">
                        </a>
                        
                    </div>
                </div>
            </div>

            
            <div class="footer-bottom">
                <p>&copy; <?php echo e(date('Y')); ?> <?php echo e($admin?->name ?? 'Javier Cano'); ?>. Todos los derechos reservados.</p>
            </div>
        </footer>
    </div>

    <?php echo $__env->yieldPushContent('modals'); ?>

    <?php echo \Livewire\Mechanisms\FrontendAssets\FrontendAssets::scripts(); ?>


</body>


</html><?php /**PATH C:\Users\javier\Desktop\Trabajo\Porta_folio-12.4\resources\views/layouts/app.blade.php ENDPATH**/ ?>