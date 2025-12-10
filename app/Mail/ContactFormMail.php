<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ContactFormMail extends Mailable
{
    use Queueable, SerializesModels;

    public $data; // Variable para almacenar los datos del formulario

    /**
     * Crea una nueva instancia del mensaje.
     */
    public function __construct($data)
    {
        $this->data = $data;
    }

    /**
     * Obtiene el sobre del mensaje (remitente, destinatarios, asunto).
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            // Aquí defines el asunto que verás en tu correo personal
            subject: 'Nuevo Mensaje de Contacto del Portfolio - ' . $this->data['name'],
            // Opcional: Establecer el campo "Reply-To" para responder fácilmente
            replyTo: $this->data['email'],
        );
    }

    /**
     * Obtiene la definición del contenido del mensaje.
     */
    public function content(): Content
    {
        return new Content(
            // Define la vista Blade que contiene el HTML/texto del correo
            markdown: 'emails.contact.form',
            // Puedes pasar la variable $data a la vista
            with: [
                'messageBody' => $this->data['message'],
                'name' => $this->data['name'],
                'email' => $this->data['email'],
            ],
        );
    }

    /**
     * Obtiene el array de archivos adjuntos para el mensaje.
     */
    public function attachments(): array
    {
        return [];
    }
}