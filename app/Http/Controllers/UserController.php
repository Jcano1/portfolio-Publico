<?php

namespace App\Http\Controllers;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
class UserController extends Controller
{
    public function IsAdmin()
    {
        $user = auth()->user();

        if (!$user) {
            // No está logueado
            return response()->json(['isAdmin' => false, 'message' => 'Usuario no autenticado']);
        }

        // Si existe usuario, comprobamos su rol
        $isAdmin = ($user->role === 'admin');

        return response()->json(['isAdmin' => $isAdmin]);
    }
    public function updateProfile(Request $request)
    {
        // 1. Validar los datos de entrada
        // Las validaciones de 'first_surname' y 'second_surname' son opcionales
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'first_surname' => 'nullable|string|max:255',
            'second_surname' => 'nullable|string|max:255',
            'email' => 'required|string|email|max:255',
            'puesto' => 'nullable|string|max:255', // Usamos 'puesto' según tu migración
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // 2. Buscar al usuario con ID 1
        $user = User::find(1);

        if (!$user) {
            // Manejar el caso de que el usuario con ID 1 no exista
            return response()->json(['message' => 'Usuario con ID 1 no encontrado.'], 404);
        }

        // 3. Mapear y actualizar los datos
        $dataToUpdate = [
            'name' => $request->input('name'),
            'first_surname' => $request->input('first_surname'),
            'second_surname' => $request->input('second_surname'),
            'email' => $request->input('email'),
            'puesto' => $request->input('post', $request->input('puesto')),
        ];

        // Actualizar el usuario
        $user->update($dataToUpdate);

        return response()->json(['message' => 'Perfil actualizado exitosamente.', 'user' => $request->all()], 200);
    }
    public function updateDescription(Request $request)
    {
        // 1. Validar los datos de entrada
        // Las validaciones de 'first_surname' y 'second_surname' son opcionales
        $validator = Validator::make($request->all(), [
            'description' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // 2. Buscar al usuario con ID 1
        $user = User::find(1);

        if (!$user) {
            // Manejar el caso de que el usuario con ID 1 no exista
            return response()->json(['message' => 'Usuario con ID 1 no encontrado.'], 404);
        }

        // 3. Mapear y actualizar los datos
        $dataToUpdate = [
            'description' => $request->input('description'),
        ];

        // Actualizar el usuario
        $user->update($dataToUpdate);

        return response()->json(['message' => 'Perfil actualizado exitosamente.', 'user' => $request->all()], 200);
    }
}
