<?php

namespace App\Http\Controllers;

use App\Mail\ContactFormMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Validation\ValidationException;
use App\Models\User;
class ContactController extends Controller
{
public function send(Request $request)
    {
        // El try-catch es útil para capturar la ValidationException de Laravel
        try {
            // 1. Validar los datos
            $validatedData = $request->validate([
                'name'    => 'required|string|max:255',
                'email'   => 'required|email|max:255',
                'message' => 'required|string',
            ]);

            // 2. Destinatario
            $user = User::find(1);
            $recipient = $user->email;
            
            // 3. Enviar el correo
            Mail::to($recipient)->send(new ContactFormMail($validatedData));

            // 4. Devolver una respuesta JSON de éxito (código HTTP 200 OK)
            return response()->json([
                'message' => '¡Mensaje enviado con éxito! Recibirás una respuesta pronto.',
                'status' => 'success'
            ]);

        } catch (ValidationException $e) {
            throw $e; 
        } catch (\Exception $e) {
            // Si falla el envío de correo u otro error de servidor
            return response()->json([
                'message' => 'Error del servidor: No se pudo enviar el correo.',
                'status' => 'error',
                'details' => $e->getMessage()
            ], 500); // Código HTTP 500 para error del servidor
        }
    }
}