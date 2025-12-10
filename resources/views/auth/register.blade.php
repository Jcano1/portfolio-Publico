<x-guest-layout>
    <x-authentication-card>

        <x-validation-errors class="mb-4" />

        <form method="POST" action="{{ route('register') }}">
            @csrf

            <!-- Nombre -->
            <div>
                <x-label for="name" value="{{ __('Name') }}" />
                <x-input id="name" class="block mt-1 w-full" type="text" name="name" :value="old('name')" required
                    autofocus autocomplete="name" />
            </div>

            <!-- Apellidos -->
            <div class="mt-4">
                <x-label for="surnames" value="{{ __('First Surname') }}" />
                <x-input id="surnames" class="block mt-1 w-full" type="text" name="first_surname"
                    :value="old('First_surnames')" required autocomplete="family-name" />
            </div>

            <div class="mt-4">
                <x-label for="surnames" value="{{ __('Second Surname') }}" />
                <x-input id="surnames" class="block mt-1 w-full" type="text" name="second_surname"
                    :value="old('Second_surnames')" required autocomplete="family-name" />
            </div>

            <!-- Email -->
            <div class="mt-4">
                <x-label for="email" value="{{ __('Email') }}" />
                <x-input id="email" class="block mt-1 w-full" type="email" name="email" :value="old('email')" required
                    autocomplete="username" />
            </div>

            <!-- Rol -->
            <!-- <div class="mt-4">
                <x-label for="role" value="{{ __('Role') }}" />
                <select id="role" name="role" class="block mt-1 w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                    <option value="Admin" {{ old('role') === 'Admin' ? 'selected' : '' }}>Admin</option>
                    <option value="User" {{ old('role') === 'User' ? 'selected' : '' }}>User</option>
                </select>
            </div> -->

            <!-- Descripción -->
            <div class="mt-4">
                <x-label for="description" value="{{ __('Description') }}" />
                <textarea id="description" name="description"
                    class="block mt-1 w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    rows="3">{{ old('description') }}</textarea>
            </div>
            <!-- Puesto -->
            <div class="mt-4">
                <x-label for="surnames" value="{{ __('Puesto') }}" />
                <x-input id="surnames" class="block mt-1 w-full" type="text" name="puesto"
                    :value="old('puesto')" required autocomplete="family-name" />
            </div>

            <!-- Password -->
            <div class="mt-4">
                <x-label for="password" value="{{ __('Password') }}" />
                <x-input id="password" class="block mt-1 w-full" type="password" name="password" required
                    autocomplete="new-password" />
            </div>

            <!-- Confirmación -->
            <div class="mt-4">
                <x-label for="password_confirmation" value="{{ __('Confirm Password') }}" />
                <x-input id="password_confirmation" class="block mt-1 w-full" type="password"
                    name="password_confirmation" required autocomplete="new-password" />
            </div>

            <div class="flex items-center justify-end mt-4">
                <a class="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    href="{{ route('login') }}">
                    {{ __('Already registered?') }}
                </a>

                <x-button class="ms-4">
                    {{ __('Register') }}
                </x-button>
            </div>
        </form>
    </x-authentication-card>
</x-guest-layout>