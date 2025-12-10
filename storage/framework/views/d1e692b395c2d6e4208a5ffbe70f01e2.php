

<?php $__env->startComponent('mail::message'); ?>
# Nuevo mensaje de contacto

Has recibido un nuevo mensaje de tu portfolio:

**De:** <?php echo new \Illuminate\Support\EncodedHtmlString($name); ?> (<?php echo new \Illuminate\Support\EncodedHtmlString($email); ?>)

---

**Mensaje:**

<?php echo new \Illuminate\Support\EncodedHtmlString($messageBody); ?>


<?php $__env->startComponent('mail::button', ['url' => 'mailto:' . $email]); ?>
Responder a <?php echo new \Illuminate\Support\EncodedHtmlString($name); ?>

<?php echo $__env->renderComponent(); ?>

Gracias,
El formulario de contacto de tu portfolio.
<?php echo $__env->renderComponent(); ?><?php /**PATH C:\Users\javier\Desktop\Trabajo\Porta_folio-12.4\resources\views/emails/contact/form.blade.php ENDPATH**/ ?>