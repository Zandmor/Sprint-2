"use strict"

let gCanvas
let gCtx
var gImage = false //does the canvas have 
var gSearch
var gCurrentTag

function onInit() {
    gCanvas = document.querySelector("canvas")
    gCanvas.with = 600
    gCanvas.height = 400
    gCtx = gCanvas.getContext("2d")
    gCurrentTag = gMemes
    searchInput()
}
function scaleCanvas(img) {
    const maxHeight = 400

    gCanvas.width = img.naturalWidth
    gCanvas.height = img.naturalHeight

    if (gCanvas.height > maxHeight) {
        const ratio = maxHeight / gCanvas.height
        gCanvas.height = maxHeight
        gCanvas.width = gCanvas.width * ratio
    }
}
function searchInput() {
    var input = document.querySelector(".searchTag")

    input.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();

            onSearch()
        }
    })
}

function onSearch(){
const input = document.querySelector(".searchTag")
    const tag = input.value
    onTag(tag)

}

function onFunny(){
    onTag("funny")
}
function onCrying(){
    onTag("crying")
}
function onLaughing(){
    onTag("laughing")
}
function onAnimal(){
    onTag("animal")
}



function onTag(tag) {
    
    const currImgs = document.querySelector(".img-gallery")
    var newImgs = ""

    gCurrentTag = gMemes.filter(function (meme) {
        if (meme.tags.includes(tag))
            return meme

    }
    )
newImgs+= "<button class=\"arrow scroll-back\" onclick=\"onScroll(-1)\"></button>"

    for (var i = 0;i < gCurrentTag.length; i++) {
        newImgs += "<img class='img-option' id='img-" + (i + 1) + "' onclick='onSelectImg(this)'  src='imgs/" + gCurrentTag[i].id + ".jpg'>"
        if (i === 2) break
    }

    newImgs+= "<button class=\"arrow scroll-forward\" onclick=\"onScroll(1)\"></button>"
    currImgs.innerHTML = newImgs


}
function onSelectImg(elImg) {

    scaleCanvas(elImg)

    gCtx.drawImage(elImg, 0, 0, gCanvas.width, gCanvas.height)
    gImage = true


}


function onScroll(direction) {
    if (gCurrentTag.length <= 2) return


    var imgs = document.querySelectorAll(".img-option")
    var srcNum
    var newID
    var currIdx = imgs.forEach(currImg => {

        srcNum = Number(currImg.getAttribute("src").match(/\d+/)[0])
        currIdx = gCurrentTag.findIndex(function (checkmeme) {
            return checkmeme.id == srcNum
        })
        if (direction === -1) {
            if (gCurrentTag[0].id == srcNum)

                newID = gCurrentTag[gCurrentTag.length - 1].id

            else

                newID = gCurrentTag[currIdx - 1].id
        }

        if (direction === 1) {
            if (gCurrentTag[gCurrentTag.length - 1].id == srcNum)

                newID = gCurrentTag[0].id

            else

                newID = gCurrentTag[currIdx + 1].id

        }
        currImg.src = "imgs/ID.jpg".replace("ID", newID)

    });
}

function onApply(ev) {
    if (gImage != 1) return //make sure there's an image in the canvas
    const canvas = document.querySelector("canvas")
    canvas.onclick= onPlace


    const change = document.querySelector(".img-selectors")
    change.innerHTML =
        "<input type = \"text\" class=\"textType\" placeholder = \"type text here\"></input> <select id=\"chooseFont\">" +

        "<option value=\"IMPACT\">IMPACT</option>" +

        "<option value=\"Arial\">Arial</option>" +
        "<option value=\"Comic Sans MS\">Comic Sans</option>" +
        "<option value=\"Times New Roman\">Times New Roman</option>"
        +
        "</select>" +
        "<button onclick=\"onFinished()\">Finished</button>"


}

function onFinished() {
    const canvas = document.querySelector("canvas")
    canvas.onclick= onPlace


    const change = document.querySelector(".img-selectors")
    change.innerHTML =
        "<button class=\"download chooseImg\">Download</button>"
+
"<button class =\"share\">Share</button>"
+
        "<button class =\"facebook\">Share on Facebook</button>"
}


function onPlace(ev){
   const {offsetX , offsetY} = ev
    const input = document.querySelector(".textType")
    const memeText = input.value

     if (!memeText) return


    drawText(memeText,offsetX,offsetY)


   
}
function drawText(text, x, y) {
    gCtx.linewidth = 2
    gCtx.strokeStyle = 'Pink'
    

    gCtx.font = '80px Impact'
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'

    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)

}