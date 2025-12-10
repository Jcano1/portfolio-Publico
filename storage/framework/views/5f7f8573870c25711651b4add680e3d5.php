<?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if BLOCK]><![endif]--><?php endif; ?><?php if($block['type'] === 'container'): ?>
    <div class="<?php echo e($block['props']['class'] ?? ''); ?>" style="<?php echo e($block['props']['inlineStyle'] ?? ''); ?>">
        <?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if BLOCK]><![endif]--><?php endif; ?><?php $__currentLoopData = $block['children'] ?? []; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $child): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
            <?php echo $__env->make('partials.render-block', ['block' => $child], array_diff_key(get_defined_vars(), ['__data' => 1, '__path' => 1]))->render(); ?>
        <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?><?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if ENDBLOCK]><![endif]--><?php endif; ?>
    </div>

<?php elseif($block['type'] === 'text'): ?>
    <div class="<?php echo e($block['wrapper']['class'] ?? ''); ?>" >
        <div class="contenido w-full ">
                <?php echo $block['props']['html'] ?? $block['props']['text'] ?? ''; ?>

        </div>
    </div>

<?php elseif($block['type'] === 'image'): ?>
    <div class="<?php echo e($block['wrapper']['class'] ?? ''); ?>" >
        <div class="contenido w-full ">
            <img src="<?php echo e($block['props']['src'] ?? ''); ?>" width="<?php echo e($block['props']['computed']['width'] ?? ''); ?>"
                class="<?php echo e($block['props']['class'] ?? ''); ?>" style="<?php echo e($block['props']['inlineStyle'] ?? ''); ?>"
                data-id="<?php echo e($block['props']['id'] ?? ''); ?>" alt="<?php echo e($block['props']['alt'] ?? ''); ?>" />
        </div>
    </div>

<?php elseif($block['type'] === 'button'): ?>
    <div class="<?php echo e($block['wrapper']['class'] ?? ''); ?>" >
        <div class="contenido w-full flex justify-center items-center">
            <button style="<?php echo e($block['props']['inlineStyle']); ?>" class="<?php echo e($block['props']['inlineClass']); ?>" Data-Size="<?php echo e($block['props']['dataId']); ?>" data-id="<?php echo e($block['props']['dataId']); ?>" href="<?php echo e($block['props']['href']); ?>"><?php echo e($block['props']['content']); ?></button>
        </div>
    </div>

<?php elseif($block['type'] === 'Separator'): ?>
    <div class="<?php echo e($block['wrapper']['class'] ?? ''); ?>" >
        <div class="contenido w-full flex justify-center">
            <?php echo $block['props']['html']; ?>

        </div>
    </div>
<?php endif; ?><?php if(\Livewire\Mechanisms\ExtendBlade\ExtendBlade::isRenderingLivewireComponent()): ?><!--[if ENDBLOCK]><![endif]--><?php endif; ?><?php /**PATH C:\Users\javier\Desktop\Trabajo\Porta_folio-12.4\resources\views/partials/render-block.blade.php ENDPATH**/ ?>