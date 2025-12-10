<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Imagen extends Model
{
    use HasFactory;

    protected $table = 'imagenes';

    protected $fillable = [
        'nombre',
        'ruta',
    ];

    // Accessor para devolver la URL completa de la imagen
    public function getUrlAttribute()
    {
        return Storage::url($this->ruta);
    }
}
