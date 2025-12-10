<?php

namespace App\Http\Controllers;

use App\Models\Imagen;
use App\Models\Page;
use Illuminate\Http\Request;  // <-- Importa aquí

class PageController extends Controller
{
    public function store(Request $request)
    {
        // Validar datos
        $validated = $request->validate([
            'titulo' => 'required|string|max:255',
            'ShortDescription' => 'nullable|string|max:500',
            'ImgRute' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        $imagenId = null;

        // ✅ Si el usuario sube una imagen, se guarda en la tabla `imagenes`
        if ($request->hasFile('ImgRute')) {
            $file = $request->file('ImgRute');
            $path = $file->store('images', 'public');

            $imagen = Imagen::create([
                'nombre' => $file->getClientOriginalName(),
                'ruta' => $path,
            ]);

            $imagenId = $imagen->id;
        }

        // ✅ Crear la página y enlazar la imagen
        $page = Page::create([
            'title' => $validated['titulo'],
            'ShortDescription' => $validated['ShortDescription'] ?? null,
            'imagen_id' => $imagenId,
            'structure' => [],
        ]);

        // ✅ Redirigir a la página de edición o mostrar mensaje
        return redirect()
            ->route('proyectos.edit', $page->id)
            ->with('success', 'Página creada correctamente.');
    }

    public function edit($id)
    {
        $page = Page::findOrFail($id);
        return view('Proyectos', compact('page'));
    }

    public function update(Request $request, $id)
    {
        // 1. Buscar la página
        $page = Page::findOrFail($id);

        // 2. Validar lo que viene
        $validated = $request->validate([
            'structure' => 'required|array'
        ]);

        // 3. Guardar en la base de datos (en un campo JSON)
        $page->structure = $validated['structure']; // ⚡ tu columna debe ser tipo JSON
        $page->save();

        // 4. Responder al frontend
        return response()->json([
            'success' => true,
            'message' => 'Estructura guardada correctamente',
            'page' => $page
        ]);
    }

    public function show($id)
    {
        $page = Page::findOrFail($id);
        return view('Proyectos', compact('page'));
    }

    public function list()
    {
        return Page::with('imagen:id,ruta')->get();
    }
    public function DeleteOne($id)
    {
        $page = Page::findOrFail($id);
        $page->delete();
        $currentPages=Page::All();
        return response()->json([
            'success' => true,
            'message' => 'Pagina borrada correctamente',
            'page' => $currentPages
        ]);
    }
}
