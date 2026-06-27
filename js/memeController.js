
"use strict"




function onIncreaseTextSize(ev) {
    onTextSizeChange(true)
}

function onDecreaseTextSize(ev) {
    onTextSizeChange(false)
}

function onItalic() {
    if (!gSelectedTextBox) return

    gSelectedTextBox.isItalic = !gSelectedTextBox.isItalic
    renderCanvas()
}

function onBold() {
    if (!gSelectedTextBox) return

    gSelectedTextBox.isBold = !gSelectedTextBox.isBold
    renderCanvas()
}

function onOutline() {
    if (!gSelectedTextBox) return

    gSelectedTextBox.hasOutline = !gSelectedTextBox.hasOutline
    renderCanvas()
}

function onFontChange() {
    const fontSelect = document.querySelector("#chooseFont")
    if (!fontSelect) return

    if (gSelectedTextBox) {
        gSelectedTextBox.font = fontSelect.value
        renderCanvas()
        return


    }

    gTextFont = fontSelect.value
}







function onMouseDown(ev) {
    const { offsetX, offsetY } = ev
    const clickedTextBox = checkClickedTextBox(offsetX, offsetY)
    const input = document.querySelector(".textType")

    //checking if the mouse is holding the handle of a text box first, then if its holding a text box, and then trying to create a new textbox if the cursor isnt on anything on the canvas

    if (gSelectedTextBox && checkClickedResizeHandle(gSelectedTextBox, offsetX, offsetY)) {
        gTextResize.state = true
        gTextResize.startX = offsetX
        gTextResize.startY = offsetY
        gTextResize.startSize = gSelectedTextBox.size

        gTextDrag.state = false
        return
    }



    if (clickedTextBox) {
        const fontSelect = document.querySelector("#chooseFont")
        if(fontSelect) fontSelect.value = clickedTextBox.font
        gSelectedTextBox = clickedTextBox
        gTextDrag.state = true

        gTextDrag.dragOffSetX = offsetX - clickedTextBox.x
        gTextDrag.dragOffSetY = offsetY - clickedTextBox.y
        renderCanvas()

        gTextResize.state = false

        renderCanvas()

        return
    }


    if (gInputType !== "emoji" && input && input.value) {  //if the chosen input isn't an emoji but there is an existing input in the text box, it inputs the current teXT
        gInputValue = input.value
        gInputType = "text"
    }

    if (gInputType !== "text" && gInputType !== "emoji") return
    if (!gInputValue) return


    const textBox = { //creates textbox with he text existing fonts and the selected location
        text: gInputValue,
        x: offsetX,
        y: offsetY,
        size: gTextSize,
        font: gInputType === "emoji" ? "Segoe UI Emoji" : document.querySelector("#chooseFont").value,
        isBold: gTextBL,
        isItalic: gTextIT,
        hasOutline: gTextOL
    }

    gTextBoxes.push(textBox) //add created text box to the textbox array so it can be changed/rerendered later
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
        const diffX = offsetX - gTextResize.startX  //checking where the cursor is moving while holding the handle by checking the distance from where it started holding the handle
        const diffY = gTextResize.startY - offsetY

        const diff = Math.max(diffX, diffY) //changing the size based on the most pushed direction of the handle

        gSelectedTextBox.size = gTextResize.startSize + diff

        if (gSelectedTextBox.size < 12) {  //adding minimum size to the box to avoid    
            gSelectedTextBox.size = 12
        }

        renderCanvas()
        return

    }


    if (gTextDrag.state && gSelectedTextBox) {
        gSelectedTextBox.x = offsetX - gTextDrag.dragOffSetX //moving the box with the cursor on the handle while avoiding centering it on the cursor
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

    const input = document.querySelector(".textType") // clear text from the input box when choosing an emoji
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

