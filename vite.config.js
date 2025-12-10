import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/css/app.css',
                'resources/css/portfolio.css',
                'resources/css/portfolio-admin.css',
                'resources/css/Proyectos.css',
                'resources/css/Proyectos-admin.css',
                'resources/css/footer.css',
                'resources/js/app.js',
                'resources/js/Helper.js',
                'resources/js/Portfolio_Habilidades.js',
                'resources/js/Portfolio_Habilidades_Admin.js',
                'resources/js/Portfolio_Projectos.js',
                'resources/js/Portfolio_Projectos-admin.js',
                'resources/js/Proyectos-admin.js',
                'resources/js/proyectos.js',
                'resources/js/contacto_Correo.js',
                'resources/js/portfolio_editData.js',
                'resources/js/Admin-Proyectos/Button.js',
                'resources/js/Admin-Proyectos/Text.js',
                'resources/js/Admin-Proyectos/Image.js',
                'resources/js/Admin-Proyectos/Separator.js',
                'resources/js/Admin-Proyectos/JsonSave.js',
                
            ],
            refresh: true,
        }),
    ],

    // 👇 Esta línea evita los errores Mixed Content (usa rutas relativas)
    base: '/build/',

    resolve: {
        alias: {
            '@': '/resources/js',
        },
    },
});
