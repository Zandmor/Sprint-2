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


