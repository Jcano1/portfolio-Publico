var t="",a='<hr class="Separator" style="width: 80%; border: 1px solid white; border-radius: 2px;">';function d(r,i=""){let s="solid";if(i){const e=i.cloneNode(!0);e&&e.tagName==="DIV"?s="space":e&&e.style.borderTopStyle==="dashed"&&(s="dashed")}r.innerHTML=`
                    <div class="flex justify-center space-x-16 mt-8">
                        <div class="flex flex-col items-center opcion-sep" data-type="space">
                            <div class="w-20 h-20 ${s==="space"?"selected-sep":""} bg-white rounded-full shadow-lg flex items-center justify-center mb-3 cursor-pointer hover:scale-105 transition">
                                <i class="fas fa-arrows-alt-v text-4xl text-gray-800"></i>
                            </div>
                            <span class="text-gray-700">Espacio</span>
                        </div>
                        <div class="flex flex-col items-center opcion-sep" data-type="solid">
                            <div class="w-20 h-20 ${s==="solid"?"selected-sep":""} bg-white rounded-full shadow-lg flex items-center justify-center mb-3 cursor-pointer hover:scale-105 transition">
                                <i class="fas fa-minus text-4xl text-gray-800"></i>
                            </div>
                            <span class="text-gray-700">Línea continua</span>
                        </div>
                        <div class="flex flex-col items-center opcion-sep" data-type="dashed">
                            <div class="w-20 h-20 ${s==="dashed"?"selected-sep":""} bg-white rounded-full shadow-lg flex items-center justify-center mb-3 cursor-pointer hover:scale-105 transition" style:"box-shadow: 0 0 0 4px #0CCCF2 inset;">
                                <i class="fas fa-ellipsis-h text-4xl text-gray-800"></i>
                            </div>
                            <span class="text-gray-700">Línea discontinua</span>
                        </div>
                    </div>
                `,r.querySelectorAll(".opcion-sep").forEach(e=>{e.addEventListener("click",()=>{t=e.dataset.type,t==="space"?a='<div class="Separator" style="height: 2rem;"></div>':t==="solid"?a='<hr class="Separator" style="width: 80%; border: 1px solid white; border-radius: 2px;">':t==="dashed"&&(a='<hr class="Separator" style="width: 80%; border-top: 2px dashed white;">'),r.querySelectorAll(".opcion-sep div").forEach(l=>{l.classList.remove("selected-sep")}),e.querySelector("div").classList.add("selected-sep")})})}function c(){return a}export{c as G,d as O};
