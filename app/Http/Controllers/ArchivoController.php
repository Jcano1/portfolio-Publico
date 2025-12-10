<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Models\Archivo; // si usas modelo/tabla

class ArchivoController extends Controller
{
    public function upload(Request $request)
    {
        // Validación: ajustar tipos y tamaño según necesidad
        $request->validate([
            'file' => 'required|file|mimes:jpg,jpeg,png,gif,pdf,doc,docx,zip,rar,7zip' // max 10MB
        ]);

        $file = $request->file('file');

        // Nombre único opcional
        $filename = uniqid() . '_' . trim($file->getClientOriginalName());

        // Guardarlo en disk 'public' => storage/app/public/...
        $path = $file->storeAs('uploads', $filename, 'public');

        // Generar URL accesible públicamente (storage link)
        $url = Storage::disk('public')->url($path);

        // Opcional: guardar registro en BD y devolver su id
        // Si no quieres BD, puedes omitir esto y devolver null o path.
        $archivo = null;
        if (class_exists(\App\Models\Archivo::class)) {
            $archivo = Archivo::create([
                'filename' => $filename,
                'path' => $path,
                'url' => $url,
                'mime' => $file->getClientMimeType(),
                'size' => $file->getSize(),
            ]);
        }

        return response()->json([
            'success' => true,
            'url' => $url,
            'path' => $path,
            'id' => $archivo ? $archivo->id : null,
        ]);
    }
    public function descargar($id)
    {
        $archivo = Archivo::findOrFail($id);

        // Si guardaste la ruta del archivo en BD
        $path = storage_path('app/public/' . $archivo->path);

        // Devuelve el archivo con cabeceras de descarga
        return response()->download($path, $archivo->filename);
    }
    
    public function eliminarArchivos(Request $request)
    {
        // El cuerpo viene del sendBeacon con un array de IDs
        $ids = $request->input('archivos', []);

        if (empty($ids)) {
            return response()->json(['success' => false, 'message' => 'No se recibieron IDs.'], 400);
        }

        // Busca todos los archivos por ID
        $archivos = Archivo::whereIn('id', $ids)->get();

        foreach ($archivos as $archivo) {
            // Elimina el archivo físico
            if (Storage::disk('public')->exists($archivo->path)) {
                Storage::disk('public')->delete($archivo->path);
            }

            // Borra el registro de la base de datos
            $archivo->delete();
        }

        return response()->json(['success' => true, 'deleted' => count($archivos)]);
    }
}

