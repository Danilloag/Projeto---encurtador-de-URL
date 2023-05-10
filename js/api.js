// import { renderTable } from './render.js'
import { parseDate } from "./render.js"
import { showModalDelete, showModalEdit, closeModalDelete, closeModalEdit } from "./showAndClose.js"
import { feedBackUser } from "./feedBack.js"

const optionsGet = {
    method: 'GET',
    headers: { accept: 'application/json', Authorization: 'sk_xGdYnKVzmd1U2UfL' }
}

export const storageUpdate = () => {
    fetch('https://api.short.io/api/links?domain_id=721993&limit=30&dateSortOrder=desc', optionsGet)
        .then(response => response.json())
        .then(data => {
            const bodyTable = document.querySelector('#table-body')
            bodyTable.innerHTML = ''
            data.links.forEach((el) => {
                const row = document.createElement('tr')
                const deleteButton = document.createElement('button')
                deleteButton.innerHTML = '<img src="/assets/icons/delete.svg" alt="delete">'
                deleteButton.addEventListener('click', () => deleteUrl(el.idString, el.originalURL))
                const editButton = document.createElement('button')
                editButton.innerHTML = '<img src="/assets/icons/edit.svg" alt="edit">'
                editButton.addEventListener('click', () => editUrl(el.path, el.originalURL, el.idString))
                const tdDelete = document.createElement('td')
                tdDelete.appendChild(deleteButton)
                tdDelete.appendChild(editButton)
                row.innerHTML = `
        <td>${el.shortURL}</td>
        <td>${el.originalURL}</td>
        <td>${parseDate(el.updatedAt)}</td>
    `
                row.appendChild(tdDelete);
                bodyTable.appendChild(row)
            })
        })
        .catch(err => console.error(err))
}

export function renderUrlShort(shortUrl, date) {
    const linkDisplayed = document.getElementById('link-displayed')
    const dateLink = document.getElementById('date-link')

    fetch('https://api.short.io/api/links?domain_id=721993&limit=30&dateSortOrder=desc', optionsGet)
        .then(response => response.json())
        .then(data => {
            console.log(data.links)
            linkDisplayed.innerHTML = data.links[0].shortURL
            dateLink.innerHTML = parseDate(data.links[0].updatedAt)
        })
        .catch(err => console.error(err))

    linkDisplayed.innerHTML = shortUrl
    dateLink.innerHTML = parseDate(date)
}

export const postAPI = (insertedURL) => {
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
                throw new error('API NÃO RETORNOU COMO ESPERADO')
            }
        })
        .then(response => console.log(response))
        .catch(err => console.error(err))
}

export const deleteUrl = (idUrl, originalUrl) => {
    showModalDelete()
    const btnConfirmDelete = document.getElementById('btn-confirm-delete')
    const btnCancelDelete = document.getElementById('btn-cancel-delete')
    const modalDelete = document.getElementById('modal-delete')
    const textParagraph = document.getElementById('paragraph-modal-delete')

    textParagraph.textContent = `Are you sure you want to delete ${originalUrl}?`
    const firstChild = modalDelete.firstChild;
    modalDelete.insertBefore(textParagraph, firstChild);

    btnCancelDelete.addEventListener("click", closeModalDelete)
    btnConfirmDelete.addEventListener("click", function () {
        const optionsDelete = {
            method: 'DELETE',
            headers: { Authorization: 'sk_xGdYnKVzmd1U2UfL' }
        };

        fetch(`https://api.short.io/links/${idUrl}`, optionsDelete)
            .then(response => {
                if (response.status == 200 && response.ok) {
                    feedBackUser(true, "URL deleted successfully")
                    closeModalDelete()
                    storageUpdate()
                    return response.json()
                } else {
                    throw new error('API NÃO RETORNOU COMO ESPERADO')
                }
            })
            .catch(err => console.error(err));
    })
}

export const editUrl = (pathUrl, originalUrl, idUrl) => {
    showModalEdit()
    const inputPathEdit = document.getElementById('pathEdit')
    const inputOriginalUrl = document.getElementById('originalUrl')

    inputPathEdit.value = pathUrl
    inputOriginalUrl.value = originalUrl

    const btnSaveEdit = document.getElementById('btn-save-edit')
    const btnCancelEdit = document.getElementById('btn-cancel-edit')

    btnCancelEdit.addEventListener("click", closeModalEdit)

    btnSaveEdit.addEventListener("click", function () {
        if (inputPathEdit.value != '' && inputOriginalUrl.value != '') {
            const optionsEdit = {
                method: 'POST',
                headers: {
                    accept: 'application/json',
                    'content-type': 'application/json',
                    Authorization: 'sk_xGdYnKVzmd1U2UfL'
                },
                body: JSON.stringify({
                    path: inputPathEdit.value,
                    originalURL: inputOriginalUrl.value,
                    update: {
                        path: true,
                        originalURL: true
                    }
                })
            }

            fetch(`https://api.short.io/links/${idUrl}`, optionsEdit)
                .then(response => {
                    return response.json()
                })
                .then(response => {
                    console.log(response)
                    closeModalEdit()
                    storageUpdate()
                    feedBackUser(true, "URL updated successfully")
                    return response
                }
                )
                .catch(err => console.error(err))
        } else {
            feedBackUser(false, "Fill in the empty fields")
        }
    })
}

export const generateQrCode = (idString) => {
    let boxFunctions = document.getElementById('box-functions')

    const optionsQrCode = {
        method: 'POST',
        headers: {
            accept: 'image/png',
            'content-type': 'application/json',
            Authorization: 'sk_xGdYnKVzmd1U2UfL'
        },
        body: JSON.stringify({ 
            type: 'png',
            size: 250
     })
    };

    fetch(`https://api.short.io/links/qr/lnk_31P3_9dCPkp7SqwJ`, optionsQrCode)
        .then(response => response.blob())
        .then(blob => {
            const imgUrl = URL.createObjectURL(blob);
            const img = document.createElement('img');
            img.src = imgUrl;
            img.style.width = '250px';
            boxFunctions.appendChild(img)

            //Create the download link 
            const downloadLink = document.createElement('a')
            downloadLink.href = imgUrl
            downloadLink.download = `qr_code_${idString}.png`
            downloadLink.innerText = 'Download QR code'
            boxFunctions.appendChild(downloadLink)
        })
        .catch(err => console.error(err));
}