"use strict"

let gCanvas
let gCtx
var gImage = false //does the canvas have 
var gSearch
var gCurrentTag

function onInit() {
    gCanvas = document.querySelector("canvas")
    gCtx = gCanvas.getContext("2d") 
    gCurrentTag = gMemes
}


function onSelectImg(elImg) {
    gCanvas.height = (elImg.naturalHeight / elImg.naturalWidth) * gCanvas.width //scale canvas to fit the size of the image
    gCtx.drawImage(elImg, 0, 0, gCanvas.width, gCanvas.height)
    gImage = true
}

function onApply(ev) {
    if(gImage!=1) return //make sure there's an image in the canvas

    const change = document.querySelector("#bottom")
    change.innerHTML = 
    "<input type = \"text\" class=\"textType\"></input> <select id=\"chooseFont\"> <option value=\"IMPACT\">IMPACT</option> <option value=\"Arial\">Arial</option> <option value=\"Comic Sans MS\">Comic Sans</option><option value=\"Times New Roman\">Times New Roman</option></select>"


}

function onScrollBack(){
    const img = document.querySelector("#img-1")
    const srcNum = (img.getAttribute("src")).match(/\d+/)
    
if(!gCurrentTag.length<2) return

if(gCurrentTag[0].id==srcNum)
    img.src = ""
    

}