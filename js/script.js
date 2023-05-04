//Box
const boxMsg = document.querySelector('#box-msg')
const boxSendLink = document.querySelector('#box-send-link')
const boxSocialMedias = document.querySelector('#box-social-medias')
const boxBtns = document.querySelector('#box-buttons')
const boxLink = document.querySelector('#box-link')
const boxFunctions = document.querySelector('#box-functions')

//Buttons
const btnShortURL = document.querySelector('#btn-shortURL')
const btnShare = document.querySelector('#btn-share')
const btnShareLinkedin = document.querySelector('#btn-share-linkedin')
const btnShareWapp = document.querySelector('#btn-share-wapp')
const btnShareTwitter = document.querySelector('#btn-share-twitter')
const btnCreateQRCode = document.querySelector('#btn-create-qrcode')

//Open and show box
function closeBox(box) {
    box.style.display = "none";
}

function showBox(box) {
    box.style.display = "flex";
}

btnShortURL.addEventListener("click", function() {
    showBox(boxFunctions);
})

btnShare.addEventListener("click", function() {
    showBox(boxSocialMedias)
})

btnShareWapp.addEventListener("click", function() {
    showBox(boxSendLink)
})

btnShareLinkedin.addEventListener("click",function(){
    closeBox(boxSendLink)
})

btnShareTwitter.addEventListener("click",function(){
    closeBox(boxSendLink)
})

btnCreateQRCode.addEventListener("click", function(){
    closeBox(boxSendLink)
})