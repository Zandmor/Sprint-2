
"use strict"




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




    drawText(gInputValue, offsetX, offsetY)

}





function onMouseDown(ev) {
    const { offsetX, offsetY } = ev
    const clickedTextBox = checkClickedTextBox(offsetX, offsetY)
    const input = document.querySelector(".textType")

    if (gSelectedTextBox && checkClickedResizeHandle(gSelectedTextBox, offsetX, offsetY)) {
        gTextResize.state = true
        gTextResize.startX = offsetX
        gTextResize.startY = offsetY
        gTextResize.startSize = gSelectedTextBox.size

        gTextDrag.state = false
        return
    }



    if (clickedTextBox) {
        gSelectedTextBox = clickedTextBox
        gTextDrag.state = true

        gTextDrag.dragOffSetX = offsetX - clickedTextBox.x
        gTextDrag.dragOffSetY = offsetY - clickedTextBox.y
        renderCanvas()

        gTextResize.state = false

        renderCanvas()

        return
    }


    if (gInputType !== "emoji" && input && input.value) {
        gInputValue = input.value
        gInputType = "text"
    }

    if (gInputType !== "text" && gInputType !== "emoji") return
    if (!gInputValue) return


    const textBox = {
        text: gInputValue,
        x: offsetX,
        y: offsetY,
        size: gTextSize,
        font: gInputType === "emoji" ? "Segoe UI Emoji" :document.querySelector("#chooseFont").value,
        isBold: gTextBL,
        isItalic: gTextIT,
        hasOutline: gTextOL
    }

    gTextBoxes.push(textBox)
    gSelectedTextBox = textBox
    gTextDrag.state = true

    gTextDrag.dragOffSetX = 0
    gTextDrag.dragOffSetY = 0

    gTextResize.state = false

    renderCanvas()

}




function onMouseMove(ev) {
    const { offsetX, offsetY } = ev


    if (gTextResize.state && gSelectedTextBox) {
        const diffX = offsetX - gTextResize.startX
        const diffY = gTextResize.startY - offsetY

        const diff = Math.max(diffX, diffY)

        gSelectedTextBox.size = gTextResize.startSize + diff

        if (gSelectedTextBox.size < 12) {
            gSelectedTextBox.size = 12
        }

        renderCanvas()
        return

    }


    if (gTextDrag.state && gSelectedTextBox) {
        gSelectedTextBox.x = offsetX - gTextDrag.dragOffSetX
        gSelectedTextBox.y = offsetY - gTextDrag.dragOffSetY

        renderCanvas()
    }
}

function onMouseUp() {
    gTextDrag.state = false
    gTextResize.state = false
}






function onFireEmoji() {
    gInputValue = "🔥"
    gInputType = "emoji"

    const input = document.querySelector(".textType")
    if (input) input.value = ""

}

function onMeltingEmoji() {
    gInputValue = "🫠"
    gInputType = "emoji"

    const input = document.querySelector(".textType")
    if (input) input.value = ""
}

function onSkullEmoji() {
    gInputValue = "💀"
    gInputType = "emoji"

    const input = document.querySelector(".textType")
    if (input) input.value = ""
}
function onLaughingEmoji() {
    gInputValue = "🤣"
    gInputType = "emoji"

    const input = document.querySelector(".textType")
    if (input) input.value = ""
}
function onCryingEmoji() {
    gInputValue = "😭"
    gInputType = "emoji"

    const input = document.querySelector(".textType")
    if (input) input.value = ""
}

