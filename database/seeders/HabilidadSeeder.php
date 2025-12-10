<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Habilidad;

class HabilidadSeeder extends Seeder
{
    public function run()
    {
        Habilidad::create([
            'nombre' => 'Laravel',
            'nivel' => '4',
        ]);
        Habilidad::create([
            'nombre' => 'Laravel',
            'nivel' => '8',
        ]);
        Habilidad::create([
            'nombre' => 'Laravel',
            'nivel' => '2',
        ]);
        Habilidad::create([
            'nombre' => 'Laravel',
            'nivel' => '2',
        ]);    
 
    }
}
