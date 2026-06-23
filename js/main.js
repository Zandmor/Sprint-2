"use strict"

let gCanvas
let gCtx
var gImage = false //does the canvas have 
var gSearch
var gCurrentTag
var gInputValue
var gInputType
var gTextFont = "Arial"
var gTextSize = 80
var gTextIT = false
var gTextUL = false
var gTextBL = false

function onInit() {
    gCanvas = document.querySelector("canvas")
    gCanvas.with = 600
    gCanvas.height = 400
    gCtx = gCanvas.getContext("2d")
    gCurrentTag = gMemes
    searchInput()
    Chooseinput()
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

function Chooseinput() {
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

function onSearch() {
    const input = document.querySelector(".searchTag")
    const tag = input.value
    onTag(tag)

}

function onFunny() {
    onTag("funny")
}
function onCrying() {
    onTag("crying")
}
function onLaughing() {
    onTag("laughing")
}
function onAnimal() {
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
    newImgs += "<button class=\"arrow scroll-back\" onclick=\"onScroll(-1)\"></button>"

    for (var i = 0; i < gCurrentTag.length; i++) {
        newImgs += "<img class='img-option' id='img-" + (i + 1) + "' onclick='onSelectImg(this)'  src='imgs/" + gCurrentTag[i].id + ".jpg'>"
        if (i === 2) break
    }

    newImgs += "<button class=\"arrow scroll-forward\" onclick=\"onScroll(1)\"></button>"
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
function onRandom() {
    const random = Math.floor(Math.random() * 32) + 1
    const randomImg = "imgs/" + random + ".jpg"

    const img = new Image()

    img.onload = function () {
        onSelectImg(img);
    }

    img.src = randomImg
}

function onChooseImage() {
    document.querySelector('#uploadImage').click();

}

function onApply(ev) {
    if (gImage != 1) return //make sure there's an image in the canvas



    const canvas = document.querySelector("canvas")
    canvas.onclick = onPlace
    const removeGallery = document.querySelector(".img-row")
    removeGallery.innerHTML = ""
    const removeTags = document.querySelector(".tags")
    removeTags.innerHTML = ""

    const emojiBar = document.querySelector(".emojisBar")
    emojiBar.classList.add("visible");
    emojiBar.innerHTML = "<button class= \"emoji\">🔥</button><button class= \"emoji\">🫠</button><button class= \"emoji\">💀</button><button class= \"emoji\">🤣</button><button class= \"emoji\">😭</button>"


    const textBar = document.querySelector(".textBar")
    textBar.classList.add("visible");

    textBar.innerHTML = "<button class= \"font-btn\" onclick=\"onDecreaseTextSize()\"><img src=\"buttons/decrease-font-size.png\"></button><button class= \"font-btn\" onclick=\"onIncreaseTextSize()\"><img src=\"buttons/increase-font-size.png\"></button><button class= \"font-btn\" onclick=\"onBold()\"><img src=\"buttons/bold-text.png\"></button><button class= \"font-btn\" onclick=\"onUnderline()\"><img src=\"buttons/underline-text.png\"></button><button class= \"font-btn\" onclick=\"onItalic()\"><img src=\"buttons/italic-text.png\"></button>"
    const change = document.querySelector(".img-selectors")
    change.innerHTML =
        "<input id = type = \"text\" class=\"textType\" onChange=\"changeTextInput()\" placeholder = \"type text here\"></input> <select id=\"chooseFont\">" +

        "<option value=\"Impact\">Impact</option>" +

        "<option value=\"Arial\">Arial</option>" +
        "<option value=\"Comic Sans MS\">Comic Sans</option>" +
        "<option value=\"Times New Roman\">Times New Roman</option>"
        +
        "</select>" +
        "<button onclick=\"onFinished()\">Finished</button>"



}

function onIncreaseTextSize(ev) {
onTextSizeChange(true)
}

function onDecreaseTextSize(ev) {
onTextSizeChange(false)
}


function onTextSizeChange(change) {
    if (gInputType != "text") return

    if (4 < gTextSize < 24) {
        if (change) gTextSize += 2
        else gTextSize -= 2
        return

    }

    if (24 < gTextSize < 40) {
        if (change) gTextSize += 4
        else gTextSize -= 4
        return
    }


    if (40 < gTextSize) {

        if (change) gTextSize += 8
        else gTextSize -= 8
        return

    }


}

function onItalic(){
    gTextIT = !gTextIT
}

function onBold() {
    gTextBL = !gTextBL
}

function onUnderline() {
    gTextUL = !gTextUL
}





function changeTextInput() {
    const input = document.querySelector(".textType")
    gInputValue = input.value
    gInputType = "text"

}


function onPlace(ev) {
    const { offsetX, offsetY } = ev

    if (gInputType == "text") {
        if (!gInputValue) return
        drawText(gInputValue, offsetX, offsetY)
    }

}
function drawText(text, x, y) {
    const fontChoose = document.querySelector("#chooseFont")
    const gTextFont = fontChoose.value
    gCtx.linewidth = 2
    gCtx.strokeStyle = 'Pink'


    gCtx.font = gTextSize + 'px ' + gTextFont
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'

    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)

}

function onFinished() {

    const encodedUploadedImgUrl = encodeURIComponent()
    const canvas = document.querySelector("canvas")
    canvas.onclick = onPlace


    const change = document.querySelector(".img-selectors")
    change.innerHTML = `<button class="icon download" onclick="onDownload()"><img src="buttons/download.png"></button>
    <a id="downloadLink" download="my-meme.jpg"></a>

<button class="icon share"><img src="buttons/share.png"></button>

<button class="icon facebook"><img src="buttons/facebook.png"></button>
  `;
}


function onDownload() {
    const imgContent = gCanvas.toDataURL('image/jpeg')
    const link = document.querySelector("#downloadLink")
    link.href = imgContent
    link.click()
}


