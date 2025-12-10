function getComputedProps(el) {
    if (!el) return {};

    const cs = getComputedStyle(el);
    return {
        class: el.className || "",
        inlineStyle: el.getAttribute('style') || "",
        computed: {
            display: cs.display,
            width: el.style.width || cs.width,
            height: el.style.height || cs.height,
            backgroundColor: el.style.backgroundColor || cs.backgroundColor,
            color: el.style.color || cs.color,
            fontSize: el.style.fontSize || cs.fontSize,  // ⚡ prioridad al inline
            padding: el.style.padding || cs.padding,
            margin: el.style.margin || cs.margin,
            borderRadius: el.style.borderRadius || cs.borderRadius,
            textAlign: el.style.textAlign || cs.textAlign
        }
    };
}

export function serializeModule(wrapper) {
    // wrapper: el div que contiene el contenido (ej. .item-proyecto o .contenido)
    const result = {
        type: "unknown",
        props: {},
    };

    if (!wrapper) return result;

    // preferimos el nodo de contenido (si usas .contenido)
    const content = wrapper.querySelector('.Container-Text') || wrapper.querySelector('img') || wrapper.querySelector('.Separator') || wrapper.querySelector('button') || wrapper.firstElementChild.firstElementChild;
    // guardar propiedades del wrapper y del contenido
    result.wrapper = getComputedProps(wrapper);

    if (!content) {
        result.type = "empty";
        result.props = { html: wrapper.innerHTML };
        return result;
    }

    if (content.classList[0] === 'Container-Text' || content.tagName === 'OL' || content.tagName === 'UL') {

        result.type = "text";
        result.props = {
            html: content.outerHTML.trim(),   // ✅ guarda el contenido con estilos
            text: content.textContent.trim(),  // (opcional) por si quieres solo el texto plano
            styleInline: content.getAttribute('style'),

            class: content.classList.toString()
        };
    } else if (content.tagName === 'IMG') {

        result.type = "image";
        result.props = Object.assign({
            src: content.getAttribute('src') || "",
            alt: content.getAttribute('alt') || "",
            id: content.dataset.id || null   // 👈 añadimos el id
        }, getComputedProps(content));
    } else if (content.tagName === 'BUTTON' || content.querySelector && content.querySelector('button')) {

        const btn = content.tagName === 'BUTTON' ? content : content.querySelector('button');
        result.type = "button";
        result.props = {
            inlineStyle: btn.getAttribute('style'),
            inlineClass: btn.getAttribute('class'),
            dataId: content.getAttribute('data-id'),
            href: content.getAttribute('href'),
            DataSize: btn.dataset.size,
            content: btn.innerHTML.trim(),   // ✅ guarda el contenido con estilos
        };
    } else if (content.classList[0] === 'Separator') {

        result.type = "Separator";
        result.props = {
            html: content.outerHTML,   // ✅ guarda el contenido con estilos
        };
    } else {
        result.type = "html";
        result.props = Object.assign({
            html: content.outerHTML || content.innerHTML || content.textContent
        }, getComputedProps(content));
    }

    return result;
}


export function formJSON(event, options = { download: false, post: true }) {
    try {
        if (event && typeof event.preventDefault === 'function') event.preventDefault();

        const containerRoot = document.getElementById('Container-pagina');
        const rows = [];
        const rowNodes = (containerRoot.querySelectorAll ? containerRoot.querySelectorAll('.caja-proyecto') : []);
        rowNodes.forEach(row => {
            const rowObj = {
                type: "container",
                props: getComputedProps(row),
                children: []
            };

            const columns = Array.from(row.children).filter(c => {
                return c.nodeType === 1 && !c.classList.contains("box-toolbar");
            });
            columns.forEach(col => {
                const colObj = {
                    type: "container",
                    props: Object.assign({ id: col.id || null }, getComputedProps(col)),
                    children: []
                };

                const dataContainer = col.querySelector('.Container_Data');
                if (dataContainer) {
                    Array.from(dataContainer.children).forEach(wrapper => {
                        const mod = serializeModule(wrapper);
                        colObj.children.push(mod);
                    });
                }

                rowObj.children.push(colObj);
            });

            rows.push(rowObj);
        });

        const resultJson = rows;



        if (options.download) {
            const blob = new Blob([JSON.stringify(resultJson, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'layout.json';
            document.body.appendChild(a);
            a.click();
            a.remove();
            URL.revokeObjectURL(url);
        }

        // 👉 Opción: enviar al backend
        if (options.post) {
            const csrfMeta = document.querySelector('meta[name="csrf-token"]');
            const headers = { 'Content-Type': 'application/json' };
            if (csrfMeta) headers['X-CSRF-TOKEN'] = csrfMeta.getAttribute('content');
            fetch(`/Proyectos/${window.pageId}/update`, {
                method: 'PUT',
                headers,
                body: JSON.stringify({ structure: resultJson }) // ⚡ importante: envolver
                
            })
                .then(r => r.json())
                .then(resp => {
                    console.log('Respuesta servidor:', resp)
                    window.dispatchEvent(new Event('clearTempFiles'));
                })
                .catch(err => console.error('Error al enviar JSON al servidor:', err));
        }

        return resultJson;
    } catch (err) {
        console.error("Error generando JSON:", err);
        return null;
    }
}