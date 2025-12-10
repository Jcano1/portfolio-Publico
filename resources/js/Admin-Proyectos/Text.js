var quill
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";
export function openTextEditor(formEditor, paragraphElement = null) {
    ensureEditorMarkup(formEditor);
    initQuillIfNeeded();
    if (paragraphElement) {
        var htmlToLoad = paragraphElement.outerHTML || paragraphElement.innerHTML
        const delta = quill.clipboard.convert(htmlToLoad.trim());
        quill.setContents(delta);
    } else {

        quill.setContents([{ insert: '\n' }]);
    }

}
export function getText() {
    const delta = quill.getContents();
    const converter = new QuillDeltaToHtmlConverter(delta.ops, { inlineStyles: true });
    let contenidoHTML = converter.convert();

    // 🔧 Combina todos los <p> en uno solo

    return '<div class="Container-Text">'+contenidoHTML+'</div>';
}
function ensureEditorMarkup(formEditor) {
    // usamos una clase común y un ID fijo
    if (!document.getElementById('editorTexto')) {
        formEditor.innerHTML = `
            <div class="editor-quill">
                <div id="editorTexto" class="border rounded" style="height:300px;"></div>
            </div>
        `;
    }
}

function initQuillIfNeeded() {
    // crea la instancia global
    quill = new Quill('#editorTexto', {
        theme: 'snow',
        placeholder: 'Escribe tu texto aquí...',
        modules: {
            toolbar: [
                [{ 'font': [] }],
                [{ 'size': ['small', false, 'large', 'huge'] }],
                ['bold', 'italic', 'underline'],
                [{ 'color': [] }, { 'background': [] }],
                [{ 'align': [] }],
                ['link'],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }]
            ]
        }
    });

    // tu matcher (convertir font-size en size)
    const basePx = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
    quill.clipboard.addMatcher(Node.ELEMENT_NODE, function (node, delta) {
        let size = null;
        if (node.classList) {
            if (node.classList.contains('ql-size-small')) size = 'small';
            else if (node.classList.contains('ql-size-large')) size = 'large';
            else if (node.classList.contains('ql-size-huge')) size = 'huge';
        }
        if (!size && node.style && node.style.fontSize) {
            const raw = node.style.fontSize.trim();
            let px = NaN;
            if (raw.endsWith('em')) px = parseFloat(raw) * basePx;
            else if (raw.endsWith('rem')) px = parseFloat(raw) * basePx;
            else if (raw.endsWith('%')) px = (parseFloat(raw) / 100) * basePx;
            else px = parseFloat(raw);
            if (!Number.isNaN(px)) {
                if (px <= 12) size = 'small';
                else if (px >= 32) size = 'huge';
                else if (px >= 18) size = 'large';
            }
        }
        if (size) {
            delta.ops.forEach(op => {
                if (op.insert && typeof op.insert === 'string') {
                    op.attributes = op.attributes || {};
                    op.attributes.size = size;
                }
            });
        }
        return delta;
    });
    window._quillInitialized = true;
}