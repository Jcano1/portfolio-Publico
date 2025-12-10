<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ArchivoController;
use App\Http\Controllers\ImagenController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\PageController;

Route::post('/eliminar-archivos', [ArchivoController::class, 'eliminarArchivos']);


Route::post('/eliminar-imagenes', [ImagenController::class, 'eliminarImagenesTemporales']);

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/user/update-profile', [UserController::class, 'updateProfile']);
Route::post('/user/update-description', [UserController::class, 'updateDescription']);

Route::post('/Proyecto/Delete/{id}', [PageController::class, 'DeleteOne']);
