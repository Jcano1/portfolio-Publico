import{r as h}from"./Helper-Ct59Lgux.js";var d="",b=[],u=[];function S(t,a=null){var n,l="",i="",c="",v="#0CCCF2",m="#FFFFFF";if(a){v=h(a.style.backgroundColor),m=h(a.style.color),n=a.innerHTML.trim();const e=a.dataset.size;e.trim()=="large"?l="selected_button":e.trim()=="medium"?i="selected_button":e.trim()=="small"&&(c="selected_button")}else n="Click aquí prueba",i="selected_button";t.innerHTML=`
                    <label class="flex flex-col gap-2">
                        <span>Texto del botón</span>
                        <input type="text" id="inputBtnText" class="border rounded p-2" value="${n}">
                    </label>

                    <div class="flex gap-4">
                    <label class="flex flex-col gap-2">
                        <span>Color de fondo</span>
                        <input type="color" id="inputBtnColor" class="w-16 h-10 border rounded" value="${v}">
                    </label>

                    <label class="flex flex-col gap-2">
                        <span>Color del texto</span>
                        <input type="color" id="inputBtnTextColor" class="w-16 h-10 border rounded" value="${m}">
                    </label>
                    </div>

                    <div class="flex flex-col gap-2">
                    <span>Tamaño del botón</span>
                    <div id="btnSizeOptions" class="flex flex-wrap gap-3 justify-center">
                        <button type="button" class="btnBase btn-small text-sm ${c}" data-size="small" data-id="0" href="//">
                        ${n}
                        </button>
                        <button type="button" class="btnBase btn-medium text-base ${i}" data-size="medium" data-id="0" href="//">
                        ${n}
                        </button>
                        <button type="button" class="btnBase btn-large text-lg ${l}" data-size="large" data-id="0" href="//">
                        ${n}
                        </button>
                    </div>
                    </div>

                    <!-- 🔹 NUEVO APARTADO: Pestañas para subir archivo o usar enlace -->
                    <div class="flex flex-col gap-2 mt-4">
                    <span>Destino del botón</span>
                    <div class="border rounded-lg">
                        <!-- Pestañas -->
                        <div class="flex border-b">
                        <button type="button" id="tabUpload" class="flex-1 py-2 text-center bg-gray-100 font-medium border-r active-tab">
                            Subir archivo
                        </button>
                        <button type="button" id="tabLink" class="flex-1 py-2 text-center font-medium">
                            Usar enlace
                        </button>
                        </div>

                        <!-- Contenido de pestañas -->
                        <div class="p-3">
                        <!-- Subir archivo -->
                        <div id="uploadTabContent" class="tab-content block">
                            <input type="file" id="inputFileUpload" class="border rounded p-2 w-full" accept=".pdf,.doc,.jpg,.png,.zip,.rar,.7zip" />
                        </div>

                        <!-- Usar enlace -->
                        <div id="linkTabContent" class="tab-content hidden">
                            <input type="url" id="inputBtnLink" class="border rounded p-2 w-full" placeholder="https://ejemplo.com" />
                        </div>
                        </div>
                    </div>
                    </div>
            `;const r=document.querySelectorAll("#btnSizeOptions .btnBase"),p=document.getElementById("inputBtnColor"),f=document.getElementById("inputBtnTextColor"),g=document.getElementById("inputBtnText"),E=f.value;t.addEventListener("click",e=>{(e.target.id==="tabUpload"||e.target.id==="tabLink")&&(document.querySelectorAll(".tab-content").forEach(o=>o.classList.add("hidden")),document.querySelectorAll("#tabUpload, #tabLink").forEach(o=>o.classList.remove("bg-gray-100","active-tab")),e.target.id==="tabUpload"?(document.getElementById("uploadTabContent").classList.remove("hidden"),e.target.classList.add("bg-gray-100","active-tab")):(document.getElementById("linkTabContent").classList.remove("hidden"),e.target.classList.add("bg-gray-100","active-tab")))}),r.forEach(e=>{e.style.color=E,s()}),s();function s(){const e=document.querySelector(".selected_button");e&&(d=e.cloneNode(!0))}r.forEach(e=>{e.addEventListener("click",()=>{r.forEach(o=>o.classList.remove("selected_button")),e.classList.add("selected_button"),s()})}),p.addEventListener("input",()=>{const e=p.value;r.forEach(o=>{o.style.backgroundColor=e,s()})}),f.addEventListener("input",()=>{const e=f.value;r.forEach(o=>{o.style.color=e,s()})}),g.addEventListener("input",()=>{const e=g.value;r.forEach(o=>{o.innerHTML=e,s()})});const C=p.value;r.forEach(e=>e.style.backgroundColor=C)}function k(){if(!d)return null;d.classList.remove("selected_button");const t=d.cloneNode(!0);return d="",t}async function w(t){if(!t)return null;const a=new FormData;a.append("file",t);try{const n=document.querySelector('meta[name="csrf-token"]').getAttribute("content"),l=await fetch("/archivos/upload",{method:"POST",headers:{"X-CSRF-TOKEN":n},body:a});if(!l.ok){const c=await l.text();throw new Error(`HTTP ${l.status}: ${c}`)}return await l.json()}catch(n){throw console.error("Error subiendo fichero:",n),n}}function B(t,a=null){if(a)try{return w(a).then(n=>{n&&n.success?(t.setAttribute("data-id",n.id),y(t),b.push(n.id)):alert(n?.message||"Error al subir el archivo")})}catch{alert("Error al subir el archivo. Revisa la consola.")}finally{}else y(t)}function y(t){t.addEventListener("click",()=>{const a=t.dataset.id;window.open(`/descargar/${a}`,"_blank")})}function A(t,a=null){a&&t.setAttribute("href",a),L(t)}function L(t){t.addEventListener("click",()=>{var a=t.getAttribute("href");window.open(a,"_blank")})}function F(t){u.push(t)}window.addEventListener("clearTempFiles",()=>{b=[],u.length!=0&&(console.log(u),x(u))});window.addEventListener("beforeunload",()=>{b?.length&&x(b)});function x(t){const a={archivos:t},n=new Blob([JSON.stringify(a)],{type:"application/json"});navigator.sendBeacon("/api/eliminar-archivos",n)}export{S as O,B as S,F as a,L as b,y as c,k as g,A as s};
