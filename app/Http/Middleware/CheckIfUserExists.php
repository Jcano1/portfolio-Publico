<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Models\User;

class CheckIfUserExists
{
    /**
     * Maneja una petición entrante.
     */
    public function handle(Request $request, Closure $next)
    {
        // Si no hay usuarios en la base de datos
        if (\App\Models\User::count() === 0) {

            // Excepciones: no redirigir en estas rutas
            if (
                ! $request->is('register') &&
                ! $request->is('register/*') //&&
                // ! $request->is('/')
            ) {
                return redirect()->route('register');
            }
        }

        return $next($request);
    }
}