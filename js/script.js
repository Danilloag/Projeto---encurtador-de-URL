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
const btnShareLinkedin = document.querySelector('#btn-share-linkedin')
const btnShareWapp = document.querySelector('#btn-share-wapp')
const btnShareTwitter = document.querySelector('#btn-share-twitter')
const btnCreateQRCode = document.querySelector('#btn-create-qrcode')
const btnCopy = document.querySelector('#btn-copy')
const btnCloseBoxMsg = document.querySelector('#close-box-msg')

const linkDisplayed = document.querySelector('#link-displayed')
const bodyTable = document.querySelector('#table-body')

// Domínio API: 9aj3.short.gy
// const keyAPI = 'sk_xGdYnKVzmd1U2UfL';

//Open and show box
function closeBox(box) {
    box.style.display = "none";
}

function showBox(box) {
    box.style.display = "flex";
}

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
    console.log(insertedURL)
    postAPI(insertedURL)
    showBox(boxFunctions)
})

btnShare.addEventListener("click", function () {
    showBox(boxSocialMedias)
})

btnShareWapp.addEventListener("click", function () {
    showBox(boxSendLink)
})

btnShareLinkedin.addEventListener("click", function () {
    closeBox(boxSendLink)
})

btnShareTwitter.addEventListener("click", function () {
    closeBox(boxSendLink)
})

btnCreateQRCode.addEventListener("click", function () {
    closeBox(boxSendLink)
})

btnCloseBoxMsg.addEventListener("click", function () {
    closeBox(boxMsg)
})

//Copy link
btnCopy.addEventListener('click', () => {
    // Seleciona o conteúdo da tag <h2>
    const range = document.createRange()
    range.selectNode(linkDisplayed)
    window.getSelection().removeAllRanges()
    window.getSelection().addRange(range)

    // Copia o conteúdo selecionado para a área de transferência
    document.execCommand('copy')

    // Limpa a seleção de texto da página
    window.getSelection().removeAllRanges()

    showBox(boxMsg)
});

//insert table
function insertTable(shortLink, originalLink, date) {
    bodyTable.innerHTML += `
    <tr>
                            <td>${shortLink}</td>
                            <td>${originalLink}</td>
                            <td>${date}</td>
                            <td>
                                <button><img src="/assets/icons/edit.svg" alt="edit"></button>
                                <button><img src="/assets/icons/delete.svg" alt="delete"></button>
                            </td>
                        </tr>
    `
}

function insertHTML(local, content) {
    local.innerHTML = content
}

//GET and POST
const optionsGet = {
    method: 'GET',
    headers: { accept: 'application/json', Authorization: 'sk_xGdYnKVzmd1U2UfL' }
}

const requirementAPI = () => {
    fetch('https://api.short.io/api/domains', optionsGet)
        .then(response => response.json())
        .then(
            response => {
                const idRequirementAPI = response[0].id
                const hostNameRequirementAPI = response[0].hostname
            }
        )
        .catch(err => console.error(err))
}

const postAPI = (insertedURL) => {
    const optionsPost = {
        method: 'POST',
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            Authorization: 'sk_xGdYnKVzmd1U2UfL'
        },
        body: JSON.stringify({
            domain: '9aj3.short.gy',
            originalURL: insertedURL
        })
    }
    return fetch('https://api.short.io/links', optionsPost)
        .then(response => {
            if ((response.status == 200 || response.status == 201) && response.ok) {
                return response.json()
            } else {
                throw new error('MENSAGEM DE ERRO DO RETORNO DA API')
            }
        })
        .then(response => console.log(response))
        .catch(err => console.error(err))
}