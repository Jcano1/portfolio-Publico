<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Page extends Model
{
    use HasFactory;

    protected $table = 'pages';

    protected $fillable = [
        'title',
        'ShortDescription',
        'imagen_id', // ahora hace referencia a la tabla imagenes
        'structure',
    ];

    protected $casts = [
        'structure' => 'array',
    ];

    // Relación con la tabla imagenes
    public function imagen()
    {
        return $this->belongsTo(Imagen::class, 'imagen_id');
    }
}
