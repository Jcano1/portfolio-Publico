<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Archivo extends Model
{
    protected $fillable = ['filename', 'path', 'url', 'mime', 'size'];
}
