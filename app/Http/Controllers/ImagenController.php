<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Models\Imagen;

class ImagenController extends Controller
{
    public function upload(Request $request)
    {
        $request->validate([
            'imagen' => 'required|image|mimes:jpg,jpeg,png,gif|max:2048'
        ]);

        $file = $request->file('imagen');
        $path = $file->store('uploads', 'public');

        $imagen = Imagen::create([
            'nombre' => $file->getClientOriginalName(),
            'ruta' => $path,
        ]);

        return response()->json([
            'success' => true,
            // Usar Storage::url() que es más robusto para generar la URL del symlink
            'url' => Storage::url($imagen->ruta),
            'id' => $imagen->id,
        ]);
    }
    public function destroy($id, $deleteRecord = true)
    {
        $imagen = Imagen::findOrFail($id);

        // Borra el archivo físico si existe en storage/app/public
        if ($imagen->ruta && Storage::disk('public')->exists($imagen->ruta)) {
            Storage::disk('public')->delete($imagen->ruta);
        }

        // Opcional: eliminar también el registro de la base de datos
        if ($deleteRecord) {
            $imagen->delete();
        }

        return response()->json([
            'success' => true,
            'message' => $deleteRecord
                ? 'Imagen eliminada correctamente.'
                : 'Archivo de imagen eliminado del storage correctamente.'
        ]);
    }
    public function eliminarImagenesTemporales(Request $request)
    {
        $ids = $request->input('imagenes', []);

        if (empty($ids)) {
            return response()->json(['success' => false, 'message' => 'No se recibieron IDs'], 400);
        }

        $imagenes = Imagen::whereIn('id', $ids)->get();

        foreach ($imagenes as $imagen) {
            // Borra el archivo físico
            if (Storage::disk('public')->exists($imagen->ruta)) {
                Storage::disk('public')->delete($imagen->ruta);
            }

            // Borra el registro de la base de datos
            $imagen->delete();
        }

        return response()->json([
            'success' => true,
            'deleted' => count($imagenes)
        ]);
    }
}
