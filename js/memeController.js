
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



function onFireEmoji() {
    gInputValue = "🔥"
    gInputType = "text"

}



function onIncreaseTextSize(ev) {
    onTextSizeChange(true)
}

function onDecreaseTextSize(ev) {
    onTextSizeChange(false)
}

function onItalic() {
    gTextIT = !gTextIT
}

function onBold() {
    gTextBL = !gTextBL
}

function onOutline() {
    gTextOL = !gTextOL
}


function onPlace(ev) {
    const { offsetX, offsetY } = ev

    if (gInputType !== "text") return
    if (!gInputValue) return

    const textBox = {
        text: gInputValue,
        x: offsetX,
        y: offsetY,
        size: gTextSize,
        font: document.querySelector("#chooseFont").value,
        isBold: gTextBL,
        isItalic: gTextIT,
        hasOutline: gTextOL
    }

    gTextBoxes.push(textBox)
    gSelectedTextBox = textBox

    renderCanvas()
    drawText(gInputValue, offsetX, offsetY)

}

function drawTextBox(textBox) {
    const fontStyle = gTextIT ? 'italic' : 'normal'
    const fontWeight = gTextBL ? 'bold' : 'normal'

    gCtx.linewidth = 2
    gCtx.strokeStyle = 'Pink'
    gCtx.fillStyle = "white"



    gCtx.font = `${fontStyle} ${fontWeight} ${gTextSize}px ${gTextFont}`
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'


    if (textBox.hasOutline) gCtx.strokeStyle(textBox.text, textBox.x, textBox.y)



    gCtx.fillText(textBox.text, textBox.x, textBox.y)

    if (textBox === gSelectedTextBox)
        drawTextBoxBorder(textBox)


}

function drawTextBoxBorder(textBox) {
    const width = gCtx.measureText(textBox.text).width
    const height = textBox.size

    gCtx.strokeStyle = "pink"
    gCtx.lineWidth = 2
    gCtx.strokeRect(
        textBox.x - width / 2 - 10,
        textBox.y - height / 2 - 10,
        width + 20,
        height + 20
    )

}


function onMouseDown(ev) {
const {offsetX,offsetY} = ev

const clickedTextBox = checkClickedTextBox(offsetX,offsetY)

if(clickedTextBox) {
    gSelectedTextBox = clickedTextBox
    gTextDrag = true
    renderCanvas()
}
}

function onMouseMove(ev) {
    if (!gTextDrag) return
    if (!gSelectedTextBox) return

    const { offsetX, offsetY } = ev

    gSelectedTextBox.x = offsetX
    gSelectedTextBox.y = offsetY

    renderCanvas()
}

function onMouseUp() {
    gIsDraggingText = false
}





function checkClickedTextBox(x, y) {
    for (var i = gTextBoxes.length - 1; i >= 0; i--) {
        const textBox = gTextBoxes[i]

        gCtx.font = `${textBox.isItalic ? "italic" : "normal"} ${textBox.isBold ? "bold" : "normal"} ${textBox.size}px ${textBox.font}`

        const width = gCtx.measureText(textBox.text).width
        const height = textBox.size

        const boxLeft = textBox.x - width / 2 - 10
        const boxRight = textBox.x + width / 2 + 10
        const boxTop = textBox.y - height / 2 - 10
        const boxBottom = textBox.y + height / 2 + 10

        if (x >= boxLeft && x <= boxRight && y >= boxTop && y <= boxBottom) return textBox
    }
    return null
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


