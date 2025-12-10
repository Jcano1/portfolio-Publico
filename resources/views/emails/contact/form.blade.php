{{-- resources/views/emails/contact/form.blade.php --}}

@component('mail::message')
# Nuevo mensaje de contacto

Has recibido un nuevo mensaje de tu portfolio:

**De:** {{ $name }} ({{ $email }})

---

**Mensaje:**

{{ $messageBody }}

@component('mail::button', ['url' => 'mailto:' . $email])
Responder a {{ $name }}
@endcomponent

Gracias,
El formulario de contacto de tu portfolio.
@endcomponent