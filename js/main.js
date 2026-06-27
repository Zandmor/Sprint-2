"use strict"

let gCanvas = null
var gCurrImage = null
let gCtx = null
var gImage = false //does the canvas have 
var gSearch = null
var gCurrentTag = null
var gInputValue = null
var gInputType = null
var gTextBoxes = []
var gSelectedTextBox = null
var gTextFont = "Arial"
var gTextSize = 80
var gTextIT = false
var gTextOL = false
var gTextBL = false
var gTextDrag = {
    state: false,
    dragOffSetX: 0,
    dragOffSetY: 0
}

var gTextResize = {
    state : false,
    startX: 0,
    startY: 0,
    startSize: 0
}

function onInit() {
    gCanvas = document.querySelector("canvas")
    gCanvas.with = 600
    gCanvas.height = 400
    gCtx = gCanvas.getContext("2d")
    gCurrentTag = gMemes
    searchInput()
    chooseInput()

    document.addEventListener("keydown", onKeyDown)
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

function renderCanvas() {
    if (!gCurrImage) return

    gCtx.clearRect(0,0, gCanvas.width, gCanvas.height)
    gCtx.drawImage(gCurrImage, 0, 0, gCanvas.width, gCanvas.height)

    gTextBoxes.forEach(function (textBox){
        drawTextBox(textBox)
    })

}

function onSelectImg(elImg) {

    scaleCanvas(elImg)
    gCurrImage = elImg
    gCtx.drawImage(elImg, 0, 0, gCanvas.width, gCanvas.height)
    gImage = true


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

function chooseInput() {
    const uploadButton = document.querySelector("#uploadImage")

    uploadButton.addEventListener(("change"), function () {
        const file = uploadButton.files[0]

        if (!file) return;

        const img = new Image()

        img.onload = function () {
            onSelectImg(img)
        }

        img.src = URL.createObjectURL(file);
    }
    )
}



function onTextSizeChange(change) {
    if (gInputType != "text") return
    if(!gSelectedTextBox) return
    var check = true
    var currSize = gSelectedTextBox.size

    if (4 < currSize < 24) {
        if (change) currSize += 2
        else currSize -= 2


    }

    if (24 < currSize < 40 && check) {
        if (change) currSize += 4
        else currSize -= 4

    }


    if (40 < currSize && check) {

        if (change) currSize += 8
        else currSize -= 8


    }

    gSelectedTextBox.size = currSize

    renderCanvas()


}






function changeTextInput() {
    const input = document.querySelector(".textType")
    gInputValue = input.value
    gInputType = "text"

}



function drawText(text, x, y) {
    const fontChoose = document.querySelector("#chooseFont")
    const gTextFont = fontChoose.value
    const fontStyle = gTextIT ? 'italic' : 'normal'
    const fontWeight = gTextBL ? 'bold' : 'normal'

    gCtx.lineWidth = 2
    gCtx.strokeStyle = 'Pink'


    gCtx.font = `${fontStyle} ${fontWeight} ${gTextSize}px ${gTextFont}`
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'

    gCtx.fillText(text, x, y)
    if(gTextOL) gCtx.strokeText(text, x, y)

    

}

function drawTextBox(textBox) {
    const fontStyle = textBox.isItalic ? 'italic' : 'normal'
    const fontWeight = textBox.isBold ? 'bold' : 'normal'

    gCtx.lineWidth = 2
    gCtx.strokeStyle = 'Pink'
    gCtx.fillStyle = "white"



    gCtx.font = `${fontStyle} ${fontWeight} ${textBox.size}px ${textBox.font}`
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'


    if (textBox.hasOutline) gCtx.strokeText(textBox.text, textBox.x, textBox.y)



    gCtx.fillText(textBox.text, textBox.x, textBox.y)

    if (textBox === gSelectedTextBox)
        drawTextBoxBorder(textBox)


}

function drawTextBoxBorder(textBox) {

    const box = getTextBoxRect(textBox)

    gCtx.strokeStyle = "pink"
    gCtx.lineWidth = 2
    gCtx.strokeRect(box.left, box.top, box.width, box.height)

        gCtx.fillStyle = "pink"
        gCtx.fillRect(box.right - 8, box.top - 8, 16, 16)
    

}

function getTextBoxRect(textBox){
gCtx.font = `${textBox.isItalic ? "italic" : "normal"} ${textBox.isBold ? "bold" : "normal"} ${textBox.size}px ${textBox.font}`

    const width = gCtx.measureText(textBox.text).width
    const height = textBox.size

    return {
        left: textBox.x - width / 2 - 10,
        right: textBox.x + width / 2 + 10,
        top: textBox.y - height / 2 - 10,
        bottom: textBox.y + height / 2 + 10,
        width: width + 20,
        height: height + 20

}
}




function checkClickedTextBox(x, y) {
    for (var i = gTextBoxes.length - 1; i >= 0; i--) {
        const textBox = gTextBoxes[i]
        const box = getTextBoxRect(textBox)


        if (x >= box.left && x <= box.right && y >= box.top && y <= box.bottom) return textBox
    }
    return null
}

function checkClickedResizeHandle(textBox, x, y) {
    if (!textBox) return false

    const box = getTextBoxRect(textBox)

    const handleLeft = box.right - 8
    const handleRight = box.right + 8
    const handleTop = box.top - 8
    const handleBottom = box.top + 8

    return (
        x >= handleLeft &&
        x <= handleRight &&
        y >= handleTop &&
        y <= handleBottom
    )
}


function onKeyDown(ev)
{
    if(ev.key==="Delete"){
        deleteSelectedTextBox()
    }
}


function deleteSelectedTextBox() {
    if (!gSelectedTextBox) return

    gTextBoxes = gTextBoxes.filter(function (textBox) {
        return textBox !== gSelectedTextBox
    })

    gSelectedTextBox = null
    renderCanvas()
}