function onFinished() {
    
    const canvas = document.querySelector("canvas")


    canvas.onmousedown = null
    canvas.onmousemove = null
    canvas.onmouseup = null
    canvas.onmouseleave = null
    gSelectedTextBox = null
    renderCanvas()


    const change = document.querySelector(".img-selectors")
    change.innerHTML = `<button class="icon download" onclick="onDownload()"><img src="buttons/download.png"></button>
    <a id="downloadLink" download="my-meme.jpg"></a>

<button class="icon share" onclick=\"onShare()\"><img src="buttons/facebook.png"></button>

<button class="icon facebook" onclick=\"onFacebook()><img src="buttons/share.png"></button>
  `;
}


function onDownload() {
    const imgContent = gCanvas.toDataURL('image/jpeg')
    const link = document.querySelector("#downloadLink")
    link.href = imgContent
    link.click()
}

function onShare() {

    gSelectedTextBox = null
    renderCanvas()

    const canvasData = gCanvas.toDataURL("image/jpeg")

    uploadImg(canvasData, function (uploadedImgUrl) {
        const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)

        const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}`

        window.open(facebookUrl, "_blank", "width=600,height=500")
    })

}


