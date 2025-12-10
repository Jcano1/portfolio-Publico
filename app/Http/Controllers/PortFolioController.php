<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
class PortFolioController extends Controller
{
    public function index()
    {
        // Obtener el primer usuario con rol 'admin'
        $admin = User::where('role', 'Admin')->first();

        // Pasar el admin a la vista
        return view('Port_Folio', compact('admin'));
    }
}
