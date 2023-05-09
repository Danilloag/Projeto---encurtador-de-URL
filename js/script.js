import { storageUpdate, postAPI } from './api.js'
import { renderUrlShort } from './api.js'
import { validateUrl } from './regex.js'
import { feedBackUser } from './feedBack.js'
import { showBox, closeBox } from './showAndClose.js'

window.addEventListener('load', storageUpdate())

//Box
const boxInitial = document.querySelector('#box-initial')
const boxMsg = document.querySelector('#box-msg')
const boxSendLink = document.querySelector('#box-send-link')
const boxSocialMedias = document.querySelector('#box-social-medias')
const boxBtns = document.querySelector('#box-buttons')
const boxLink = document.querySelector('#box-link')
const boxFunctions = document.querySelector('#box-functions')
const BoxManageLinks = document.querySelector('#box-manage-links')

//Buttons
const btnLogo = document.querySelector('#btn-logo')
const btnSettings = document.querySelector('#btn-settings')
const btnShortURL = document.querySelector('#btn-shortURL')
const btnShare = document.querySelector('#btn-share')
const btnShareWapp = document.querySelector('#btn-share-wapp')
const btnCreateQRCode = document.querySelector('#btn-create-qrcode')
const btnCopy = document.querySelector('#btn-copy')
const linkDisplayed = document.querySelector('#link-displayed')

//Buttons click
btnLogo.addEventListener("click", function () {
    closeBox(BoxManageLinks)
    showBox(boxInitial)
})

btnSettings.addEventListener("click", function () {
    closeBox(boxInitial)
    closeBox(boxFunctions)
    showBox(BoxManageLinks)
})

btnShortURL.addEventListener("click", function () {
    let insertedURL = document.getElementById('inserted-url').value

    if (validateUrl(insertedURL)) {
        postAPI(insertedURL)
            .then(() => {
                storageUpdate()
                renderUrlShort()
                showBox(boxFunctions)
                feedBackUser(true, 'URL shortened successfully!')
            })
            .catch(err => console.error(err))
    } else {
        feedBackUser(false, 'Invalid URL.')
    }
})

btnShare.addEventListener("click", function () {
    showBox(boxSocialMedias)
})

btnShareWapp.addEventListener("click", function () {
    showBox(boxSendLink)
})

btnCreateQRCode.addEventListener("click", function () {
    closeBox(boxSendLink)
})

//Copy link
btnCopy.addEventListener("click", () => {
    console.log('btncopiar')
    // Seleciona o conteúdo da tag <h2>
    const range = document.createRange()
    range.selectNode(linkDisplayed)
    window.getSelection().removeAllRanges()
    window.getSelection().addRange(range)
    // Copia o conteúdo selecionado para a área de transferência
    document.execCommand('copy')
    // Limpa a seleção de texto da página
    window.getSelection().removeAllRanges()

    feedBackUser(true, 'Link copied successfully')
});

//Compartilhando nas mídias sociais
let btnSendWapp = document.getElementById('btn-send-wapp')
btnSendWapp.addEventListener("click", function () {

    let phoneNumber = document.getElementById('phone-number').value
    let urlShare = document.getElementById('link-displayed').textContent

    let link = `whatsapp://send?phone=${phoneNumber}&text=Olá, segue o link encurtado: ${urlShare}`;

    window.open(link);
})

const btnShareTwitter = document.querySelector('#btn-share-twitter')
btnShareTwitter.addEventListener("click", function () {
    closeBox(boxSendLink)
    let urlShare = document.getElementById('link-displayed').textContent

    let link = `https://twitter.com/intent/tweet?text=Olá, segue o link encurtado: ${urlShare}`

    window.open(link)
})

//não funcionou
const btnShareLinkedin = document.querySelector('#btn-share-linkedin')
btnShareLinkedin.addEventListener("click", function () {
    closeBox(boxSendLink)
    let urlShare = document.getElementById('link-displayed').textContent

    const link = `https://www.linkedin.com/sharing/share-offsite/?url=&summary=${urlShare}`;

    window.open(link)
})