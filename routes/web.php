<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PortFolioController;
use App\Http\Controllers\HabilidadController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ImagenController;
use App\Http\Controllers\ArchivoController;
use App\Http\Controllers\ContactController;

Route::post('/contact', [ContactController::class, 'send'])->name('contact.send');

Route::get('/', [PortFolioController::class, 'index'])->name("Port_Folio");

Route::get('/habilidades', [HabilidadController::class, 'index']);

Route::post('/Savehabilidades', [HabilidadController::class, 'store']);

Route::get('/Proyectos', [PageController::class, 'list'])->name('proyectos.list');

Route::delete('/habilidades/{id}', [HabilidadController::class, 'destroy']);

Route::put('/habilidades/update', [HabilidadController::class, 'update'])->name('habilidades.update');

Route::post('/imagenes/upload', [ImagenController::class, 'upload'])->name('imagenes.upload');
Route::delete('/imagenes/{id}', [ImagenController::class, 'destroy'])->name('imagenes.destroy');

Route::post('/archivos/upload', [ArchivoController::class, 'upload'])->name('archivos.upload');
Route::get('/descargar/{id}', [ArchivoController::class, 'descargar'])->name('archivos.descargar');

Route::get('/Proyectos/{id}', [PageController::class, 'show'])->name('proyectos.show');

Route::get('/Proyectos/{id}/edit', [PageController::class, 'edit'])
    ->name('proyectos.edit');

Route::put('/Proyectos/{id}/update', [PageController::class, 'update'])->name('Proyectos.update');


Route::get('/userAdmin', [UserController::class, 'IsAdmin']);

Route::post('/Proyectos', [PageController::class, 'store'])->name('proyectos.store');

Route::get('/prueba', function () {
    return view('prueba');
})->name('prueba');


Route::get('/welcome', function () {
    return view('welcome');
})->name("welcome");
Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_session'),
    'verified',
])->group(function () {
    Route::get('/dashboard', function () {
        return view('Port_Folio');
    })->name('dashboard');
});


