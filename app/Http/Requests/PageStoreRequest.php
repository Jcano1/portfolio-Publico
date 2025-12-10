<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PageStoreRequest extends FormRequest
{
    public function authorize()
    {
        return true; // ajusta según autorización real
    }

    public function rules()
    {
        return [
            'title' => 'nullable|string|max:255',
            'structure' => 'required|array',
        ];
    }

    protected function prepareForValidation()
    {
        // nada por ahora
    }

    public function withValidator($validator)
    {
        $validator->after(function ($validator) {
            $structure = $this->input('structure', []);

            // intenta sanear la estructura; si no válida -> agrega error
            try {
                $clean = \App\Helpers\PageSanitizer::sanitizeStructure($structure);
                // reemplazamos el input para que el controlador reciba lo saneado
                $this->merge(['structure' => $clean]);
            } catch (\Exception $e) {
                $validator->errors()->add('structure', $e->getMessage());
            }
        });
    }
}
