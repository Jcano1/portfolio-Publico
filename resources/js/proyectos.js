import { addUrlEvent } from './Admin-Proyectos/Button.js';
import { addDocumentDownloadEvenet } from './Admin-Proyectos/Button.js';
var botones = document.querySelectorAll('.btnBase')
botones.forEach(boton=>{
    if(boton.getAttribute('href')!="//"){
        addUrlEvent(boton)
    }else{
        addDocumentDownloadEvenet(boton)
    }
})