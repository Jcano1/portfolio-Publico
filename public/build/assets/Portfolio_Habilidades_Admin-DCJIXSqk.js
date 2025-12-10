import{r as k}from"./Helper-Ct59Lgux.js";console.log("Cargado Admin");document.addEventListener("habilidadesCargadas",()=>{var t=document.querySelectorAll(".habilidad-actions");t.forEach(e=>{e.innerHTML=`
            <button class="btn-edit">✏️</button>
            <button class="btn-delete">🗑️</button>
        `}),w(t)});document.getElementById("btAddHabilidades").addEventListener("click",()=>{var t=document.getElementById("ContainerForm");t.innerHTML=`
                        <div class="form-container">
                            <!-- Nombre de la habilidad -->
                            <div style="display: flex; flex-direction: column;">
                                <label for="nombre" class="form-label">Nombre de la habilidad</label>
                                <input id="nombre" type="text" placeholder="Ej. Laravel" class="form-input">
                            </div>

                            <!-- Color y Nivel en la misma fila -->
                            <div style="display: flex; flex-direction: row; gap: 1rem; align-items: center;">
                                <!-- Color -->
                                <div style="flex: 1; display: flex; flex-direction: column;">
                                    <label for="color" class="form-label">Color (hexadecimal)</label>
                                    <input id="color" type="color"  class="form-input" value="#0CCCF2">
                                    <small style="font-size: 0.8rem; color: #555;">Ejemplo: #FF0000</small>
                                </div>

                                <!-- Nivel -->
                                <div style="flex: 2; display: flex; flex-direction: column; " class="Container-Nivel">
                                    <label for="nivel" class="form-label">Nivel</label>
                                    <div style="display: flex; align-items: center; gap: 1rem;">
                                        <input id="nivel" type="range" min="0" max="10" value="5" step="1" class="form-range" style="flex: 1;">
                                        <span id="nivelOutput" class="form-output" style="width: 2rem; text-align: center;">5</span>
                                    </div>
                                </div>
                            </div>

                            <!-- Botón de enviar -->
                            <button id="guardarHabilidad" class="form-button">Guardar habilidad</button>
                        </div>
                        `;const e=document.getElementById("nivel");function a(){const c=(e.value-e.min)/(e.max-e.min)*100;e.style.setProperty("--value",c+"%")}e.addEventListener("input",a),a();const r=document.getElementById("color");var s=document.getElementById("nivel");r.addEventListener("input",()=>{const c=/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/;console.log("pruebas"),c.test(r.value)?s.style.setProperty("--color-bar",r.value):s.style.setProperty("--color-bar","#0CCCF2")});const d=document.getElementById("nivel");var b=document.getElementById("nivelOutput");d.addEventListener("input",()=>{b.innerHTML=d.value}),document.getElementById("guardarHabilidad").addEventListener("click",async c=>{c.preventDefault();const i=document.getElementById("nombre"),p=document.getElementById("nivel"),u=document.getElementById("color"),n=document.getElementById("guardarHabilidad");if(!i||!p||!u||!n){console.error("Faltan elementos del formulario en el DOM");return}const o=i.value.trim(),h=parseInt(p.value,10);let m=u.value.trim();/^#[0-9A-Fa-f]{6}$/.test(m)||(m=null);const E={nombre:o,nivel:h,colores:m};n.disabled=!0,n.textContent="Guardando...";try{const y=document.querySelector('meta[name="csrf-token"]'),v=y?y.getAttribute("content"):null,g=await fetch("/Savehabilidades",{method:"POST",headers:{"Content-Type":"application/json",...v?{"X-CSRF-TOKEN":v}:{}},body:JSON.stringify(E)}),l=await g.text();let f;try{f=JSON.parse(l)}catch{throw console.error("Respuesta no era JSON:",l),new Error("El servidor no devolvió JSON")}g.ok?CargarBarras():error.log("❌ Error: "+(f.message||"No se pudo guardar"))}catch(y){console.error("Error al enviar:",y)}finally{n.disabled=!1,n.textContent="Guardar"}})});async function B(t){console.log(t);try{const e=await fetch(`/habilidades/${t}`,{method:"DELETE",headers:{"Content-Type":"application/json","X-CSRF-TOKEN":document.querySelector('meta[name="csrf-token"]').content}}),a=await e.json();e.ok&&CargarBarras()}catch(e){console.error("Error al enviar:",e)}}function I(t){var e=document.getElementById(t),e=e.closest(".flex"),a=e.innerHTML,r=e.querySelector(".habilidad-actions");if(r){r.innerHTML="";var s=document.createElement("button");s.className="btn-aceptar",s.innerHTML=`
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="green" viewBox="0 0 24 24">
                <path d="M20.285 6.709l-11.025 11.025-5.545-5.545 1.414-1.414 4.131 4.131 9.611-9.611z"/>
            </svg>
        `,s.addEventListener("click",async function(){const x=document.getElementById(`edit-nombre-${t}`).value.trim(),$=document.getElementById(`edit-color-${t}`).value.trim(),T=document.getElementById(`nivel-${t}`).value,N={id:t,nombre:x,color:$,nivel:parseInt(T,10)};await q(N)?CargarBarras():console.error("❌ Error al actualizar habilidad")});var d=document.createElement("button");d.className="btn-cancelar",d.innerHTML=`
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="red" viewBox="0 0 24 24">
                <path d="M18.364 5.636l-1.414-1.414L12 9.172 7.05 4.222 5.636 5.636 10.586 10.586 5.636 15.536l1.414 1.414L12 12.828l4.95 4.95 1.414-1.414-4.95-4.95z"/>
            </svg>
        `,d.addEventListener("click",function(){e.innerHTML=a,w("text")}),r.appendChild(s),r.appendChild(d),r.style.display="flex",r.style.gap="0.5rem"}var b=e.querySelector(".Name-Habilidad");if(b){var c=b.textContent.trim(),i=document.createElement("input");i.type="text",i.value=c,i.className="form-input",i.id="edit-nombre-"+t,b.replaceWith(i)}var p=e.querySelector(".Barra-Color"),u=e.querySelector(".habilidad-header");if(p&&u){var n=k(p.style.backgroundColor);(!n||n==="#000000")&&(n="#0CCCF2");var o=document.createElement("input");o.type="color",o.value=n,o.className="form-input Centrar",o.id="edit-color-"+t;var h=u.querySelector(".habilidad-actions");h?u.insertBefore(o,h):u.appendChild(o)}var m=e.querySelector(".Container-prueba");if(m){var E=m.querySelector("div"),y=E?.style.width||"0%",v=parseInt(y)/10,g=E?.style.backgroundColor||"#4caf50",l=document.createElement("div");l.className="Container-Nivel",l.style.display="flex",l.style.flexDirection="column",l.style.gap="0.5rem",l.innerHTML=`
            <label for="nivel-${t}" class="form-label-Edit"></label>
            <div style="position: relative; width: 100%; display: flex; align-items: center; gap: 1rem;">
                <!-- Tu barra visual -->
                <div class="w-full bg-color_fondo_barra rounded-full h-4 relative ">
                    <div id="barra-edit-${t}" class="h-4 rounded-full" style="width: ${v*10}%; background-color: ${g};"></div>
                    <!-- Pelotita -->
                    <div id="thumb-${t}" style="
                        position: absolute;
                        top: 50%;
                        left: ${v*10}%;
                        transform: translate(-50%, -50%);
                        width: 1.5rem;
                        height: 1.5rem;
                        border-radius: 50%;
                        background-color: ${g};
                        box-shadow: 0 0 2px rgba(0,0,0,0.5);
                        pointer-events: none;
                        "></div>
                </div>

                <!-- Input invisible encima -->
                <input id="nivel-${t}" type="range" min="0" max="10" value="${v}" step="1" 
                    style="position: absolute; left: 0; top: 0; width: calc(100% - 3rem); height: 100%; opacity: 0; cursor: pointer;">
                
                <!-- Output del valor -->
                <span id="nivelOutput-${t}" class="form-output" style="width: 2rem; text-align: center;">${v}</span>
            </div>
        `,m.replaceWith(l);var f=l.querySelector(`#nivel-${t}`),C=l.querySelector(`#nivelOutput-${t}`),S=l.querySelector(`#barra-edit-${t}`),L=l.querySelector(`#thumb-${t}`);f.addEventListener("input",function(){var x=f.value*10;C.textContent=f.value,S.style.width=x+"%",L.style.left=x+"%"}),o.addEventListener("input",()=>{l.querySelector(`#barra-edit-${t}`).style.backgroundColor=o.value,l.querySelector(`#thumb-${t}`).style.backgroundColor=o.value})}}function w(t){console.log(t),t!=""&&(document.querySelectorAll(".btn-delete").forEach(e=>{e.addEventListener("click",()=>{console.log(e);const a=e.closest(".habilidad-actions");if(t){console.log(a);const r=a.id;B(r)}})}),document.querySelectorAll(".btn-edit").forEach(e=>{e.addEventListener("click",()=>{const a=e.closest(".habilidad-actions");if(a){console.log("editando");const r=a.id;I(r)}})}))}async function q(t){try{const e=await fetch("/habilidades/update",{method:"PUT",headers:{"Content-Type":"application/json","X-CSRF-TOKEN":document.querySelector('meta[name="csrf-token"]').content},body:JSON.stringify(t)}),a=await e.json();if(e.ok)return a}catch(e){console.error("Error en el fetch:",e)}}
