<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />
    <link href="https://fonts.googleapis.com/css2?family=Fira+Mono&display=swap" rel="stylesheet">

    <!-- Scripts -->
    @vite(['resources/css/app.css', 'resources/js/app.js', 'resources/css/footer.css',])

    <!-- Styles -->
    @livewireStyles
</head>

<body class="font-sans antialiased">
    <x-banner />

    <div class="min-h-screen  bg-[#102023]">
        @livewire('navigation-menu')
        <!-- Page Heading -->
        @if (isset($header))
            <header class="bg-white shadow">
                <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    {{ $header }}
                </div>
            </header>
        @endif

        <!-- Page Content -->
        <main>
            {{ $slot }}
        </main>
        <div class="Space">

        </div>
        <footer class="main-footer">
            <div class="footer-content">
                {{-- Primera Columna: Información General --}}
                <div class="footer-column Column-Container">
                    <h3 class="footer-title">Contacto</h3>
                    <p>Email: <a href="mailto:{{ $admin?->email ?? 'correo@ejemplo.com' }}" class="footer-link">{{
                            $admin?->email ?? 'correo@ejemplo.com' }}</a></p>
                    <p>Puesto: {{ $admin?->puesto ?? 'Desarrollador Web' }}</p>
                    @auth
                        {{-- Para cerrar sesión, usamos un formulario POST --}}
                        <form method="POST" action="{{ route('logout') }}" x-data>
                            @csrf
                            
                            <p>
                                <a class="footer-link" 
                                href="{{ route('logout') }}" 
                                @click.prevent="$root.submit();"> {{-- ⬅️ Alpine.js fuerza el envío del formulario --}}
                                    Logout
                                </a>
                            </p>
                        </form>
                    @else
                        {{-- Login puede seguir siendo un enlace GET normal --}}
                        <p><a class="footer-link" href="{{ route('login') }}">Login</a></p>
                    @endauth

                    
                </div>

                {{-- Segunda Columna: Navegación --}}
                <div class="footer-column Column-Container">
                    <h3 class="footer-title">Navegación Rápida</h3>
                    <ul class="footer-links-list contenido ul">
                        <li><a href="#QuienSoy" class="footer-link">Sobre Mí</a></li>
                        <li><a href="#Habilidades" class="footer-link">Habilidades</a></li>
                        <li><a href="#Proyectos" class="footer-link">Proyectos</a></li>
                        <li><a href="#contacto" class="footer-link">Contáctame</a></li>
                    </ul>
                </div>

                {{-- Tercera Columna: Enlaces Sociales/Botón de CTA --}}
                <div class="footer-column Column-Container">
                    <h3 class="footer-title">Sígueme</h3>

                    <div class="social-icons">
                        {{-- Iconos de redes sociales (deberías tener iconos SVG o de una librería como Font Awesome)
                        --}}
                        <a href="https://www.linkedin.com/in/javier-cano-6897403a0/" target="_blank" class="social-link" aria-label="LinkedIn">
                            <img src="{{ asset('storage/Icons/icono_Linkedin.png') }}" alt="">
                        </a>
                        <a href="https://github.com/Jcano1/portfolio-Publico" target="_blank" class="social-link" aria-label="GitHub">
                            <img src="{{ asset('storage/Icons/icono_github.png') }}" alt="">
                        </a>
                        {{-- Añade más redes aquí --}}
                    </div>
                </div>
            </div>

            {{-- Derechos de autor --}}
            <div class="footer-bottom">
                <p>&copy; {{ date('Y') }} {{ $admin?->name ?? 'Javier Cano' }}. Todos los derechos reservados.</p>
            </div>
        </footer>
    </div>

    @stack('modals')

    @livewireScripts

</body>


</html>