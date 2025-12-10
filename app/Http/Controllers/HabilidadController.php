<?php

namespace App\Http\Controllers;

use App\Models\Habilidad;
use Illuminate\Http\Request;

class HabilidadController extends Controller
{
    // Devuelve todas las habilidades en JSON
    public function index()
    {
        $Habilidades=Habilidad::all();
        if($Habilidades!=null){
            return response()->json(Habilidad::all());
        }
        return response()->json('Vacio');
    }

        public function store(Request $request){
        try {
            $validated = $request->validate([
                'nombre'  => 'required|string|max:255',
                'nivel'   => 'required|integer|min:0|max:10',
                'colores' => 'nullable|string|regex:/^#[0-9A-Fa-f]{6}$/'
            ]);

            // si "colores" viene null, asignamos un valor por defecto
            if (empty($validated['colores'])) {
                $validated['colores'] = '#0CCCF2'; // tu color predeterminado
            }

            $habilidad = Habilidad::create($validated);

            return response()->json([
                'success' => true,
                'data' => $habilidad
            ]);
        } catch (\Throwable $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }
    public function destroy($id){
        $habilidad = Habilidad::find($id);

        if (!$habilidad) {
            return response()->json(['message' => 'Habilidad no encontrada'], 404);
        }

        $habilidad->delete();

        return response()->json(['message' => 'Habilidad eliminada correctamente']);
    }
    
public function update(Request $request)
    {
        // Validar entrada
        $data = $request->validate([
            'id'     => 'required|integer|exists:habilidades,id',
            'nombre' => 'required|string|max:255',
            'nivel'  => 'required|integer|min:0|max:10',
            'color'  => 'nullable|string|size:7', 
        ]);

        // Buscar la habilidad
        $habilidad = Habilidad::findOrFail($data['id']);

        // Actualizar campos
        $habilidad->nombre = $data['nombre'];
        $habilidad->nivel  = $data['nivel'];

        // Solo actualizar color si llega, si no se mantiene el actual
        if (!empty($data['color'])) {
            $habilidad->colores = $data['color'];
        }

        $habilidad->save();

        return response()->json([
            'success' => true,
            'message' => 'Habilidad actualizada correctamente',
            'habilidad' => $habilidad,
        ]);
    }
}
