// import { renderTable } from './render.js'
import { parseDate } from "./render.js"

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
                bodyTable.innerHTML += `
            <tr>
                <td>${el.shortURL}</td>
                <td>${el.originalURL}</td>
                <td>${parseDate(el.updatedAt)}</td>
                <td>
                    <button onclick="showModalEdit()"><img src="/assets/icons/edit.svg" alt="edit"></button>
                    <button onclick="showModalDelete()"><img src="/assets/icons/delete.svg" alt="delete"></button>
                </td>
            </tr>
            `
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
                throw new error('MENSAGEM DE ERRO DO RETORNO DA API')
            }
        })
        .then(response => console.log(response))
        .catch(err => console.error(err))
}