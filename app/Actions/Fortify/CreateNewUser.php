<?php

namespace App\Actions\Fortify;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Laravel\Fortify\Contracts\CreatesNewUsers;
use Laravel\Jetstream\Jetstream;

class CreateNewUser implements CreatesNewUsers
{
    use PasswordValidationRules;

    /**
     * Validate and create a newly registered user.
     *
     * @param  array<string, string>  $input
     */
    public function create(array $input): User
    {
        Validator::make($input, [
            'name' => ['required', 'string', 'max:255'],
            'first_surname' => ['required', 'string', 'max:255'],
            'second_surname' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => $this->passwordRules(),
            'description' => ['nullable', 'string'],
            'puesto' => ['required', 'string', 'max:255'],
            // Solo validamos 'role' si viene del formulario (por ejemplo, en la vista de registro completa)
            'role' => ['nullable', 'string', 'max:50'],
            'terms' => Jetstream::hasTermsAndPrivacyPolicyFeature() ? ['accepted', 'required'] : '',
        ])->validate();

        // Asigna automáticamente el rol "Admin" si es el primer usuario, o "User" para los siguientes
        $role = User::count() === 0 ? 'Admin' : ($input['role'] ?? 'User');

        return User::create([
            'name' => ucfirst($input['name']),
            'first_surname' => ucfirst($input['first_surname']),
            'second_surname' => ucfirst($input['second_surname']),
            'email' => $input['email'],
            'password' => Hash::make($input['password']),
            'description' => $input['description'] ?? '',
            'puesto' => $input['puesto'] ?? '',
            'role' => $role,
        ]);
    }
}
