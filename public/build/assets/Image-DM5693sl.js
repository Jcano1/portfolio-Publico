var a=[],i=[];function c(n,l=null){n.innerHTML=`
            <label class="flex flex-col">
                Subir imagen:
                <input type="file" id="inputImagen" accept="image/*" class="border rounded p-2">
            </label>
            <label class="flex flex-col">
                Ancho (px):
                <input type="number" id="inputWidth" class="border rounded p-2" value="150">
            </label>
        `,l&&(n.innerHTML+='<img id="previewImagen" class="mt-2 max-h-32 object-contain"/>',document.getElementById("inputWidth").value=l.width||"",document.getElementById("previewImagen").src=l.src)}async function d(n,l,o=null){if(n){const t=new FormData;if(t.append("imagen",n),o){const e=o.querySelector("img"),r=e?e.dataset.id:null;r&&t.append("id",r)}return fetch("/imagenes/upload",{method:"POST",body:t,headers:{"X-CSRF-TOKEN":document.querySelector('meta[name="csrf-token"]').getAttribute("content")}}).then(e=>e.json()).then(e=>{if(e.success)return a.push(e.id),console.log(e.url),`<img src="${e.url}" width="${l}" class="rounded-lg" data-id="${e.id}" style="display: block; margin: 0 auto;"/>`;alert("Error al subir la imagen")}).catch(e=>console.error("Error:",e))}}window.addEventListener("clearTempFiles",()=>{a=[],a.length!=0&&(console.log(i),s(i))});window.addEventListener("beforeunload",()=>{a?.length&&s(a)});function s(n){console.log(n);const l={imagenes:n},o=new Blob([JSON.stringify(l)],{type:"application/json"});navigator.sendBeacon("/api/eliminar-imagenes",o)}function u(n){console.log("id"),console.log(n),i.push(n)}export{c as O,u as a,d as u};
