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

        const change = document.querySelector("#bottom")
        change.innerHTML =
            "<input type = \"text\" class=\"textType\"></input> <select id=\"chooseFont\">" +
            
            "<option value=\"IMPACT\">IMPACT</option>" +

            "<option value=\"Arial\">Arial</option>" +
            "<option value=\"Comic Sans MS\">Comic Sans</option>" +
            "<option value=\"Times New Roman\">Times New Roman</option>"
            +
            "</select>" +
            "<button onclick=\"onSubmit()\">Submit Text</button>"
        

    }

    function onSubmit()
    {
        const input = document.querySelector(".textType")
        const memeText = input.value

        if(!memeText) return

        drawText(memeText, gCanvas.width/2, gCanvas.height/2)
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