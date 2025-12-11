<?php

namespace App\Providers;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\View;
use App\Models\User;

class AppServiceProvider extends ServiceProvider
{
    public const HOME = '/gestion/pedidos';
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Comparte el usuario admin con todas las vistas
        // if (config('app.env') === 'produccion') {
        //     URL::forceScheme('https');
        // }
        $admin = User::where('role', 'Admin')->first();
        View::share('admin', $admin);

    }
}
