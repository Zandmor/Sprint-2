"use strict"

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
    canvas.onmousedown = onMouseDown
    canvas.onmousemove = onMouseMove
    canvas.onmouseup = onMouseUp
    canvas.onmouseleave = onMouseUp


    const removeGallery = document.querySelector(".img-row")
    removeGallery.innerHTML = ""
    const removeTags = document.querySelector(".tags")
    removeTags.innerHTML = ""

    const emojiBar = document.querySelector(".emojisBar")
    emojiBar.classList.add("visible");
    emojiBar.innerHTML = "<button class= \"emoji\"  onclick=\"onFireEmoji()\">🔥</button><button class= \"emoji\"  onclick=\"onMeltingEmoji()\">🫠</button><button class= \"emoji\"  onclick=\"onSkullEmoji()\">💀</button><button class= \"emoji\"  onclick=\"onLaughingEmoji()\">🤣</button><button class= \"emoji\"  onclick=\"onCryingEmoji()\">😭</button>"


    const textBar = document.querySelector(".textBar")
    textBar.classList.add("visible");

    textBar.innerHTML = "<button class= \"font-btn\" onclick=\"onDecreaseTextSize()\"><img src=\"buttons/decrease-font-size.png\"></button><button class= \"font-btn\" onclick=\"onIncreaseTextSize()\"><img src=\"buttons/increase-font-size.png\"></button><button class= \"font-btn\" onclick=\"onBold()\"><img src=\"buttons/bold-text.png\"></button><button class= \"font-btn\" onclick=\"onOutline()\"><img src=\"buttons/outline-text.png\"></button><button class= \"font-btn\" onclick=\"onItalic()\"><img src=\"buttons/italic-text.png\"></button>"
    const change = document.querySelector(".img-selectors")
    change.innerHTML =
        "<input id = type = \"text\" class=\"textType\" oninput=\"changeTextInput()\" placeholder = \"type text here\"></input> <select id=\"chooseFont\">" +

        "<option value=\"Impact\">Impact</option>" +

        "<option value=\"Arial\">Arial</option>" +
        "<option value=\"Comic Sans MS\">Comic Sans</option>" +
        "<option value=\"Times New Roman\">Times New Roman</option>"
        +
        "</select>" +
        "<button onclick=\"onFinished()\">Finished</button>"



}


