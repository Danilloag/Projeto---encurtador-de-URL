// export function renderUrlShort(shortUrl, date) {
//     const linkDisplayed = document.getElementById('link-displayed')
//     const dateLink = document.getElementById('date-link')

//     fetch('https://api.short.io/api/links?domain_id=721993&limit=30&dateSortOrder=desc', optionsGet)
//         .then(response => response.json())
//         .then(data => {
//             data.links[0]
//             })
//         .catch(err => console.error(err))

//     linkDisplayed.innerHTML = shortUrl
//     dateLink.innerHTML = parseDate(date)
// }

export const parseDate = (dateString) => {
    const date = new Date(dateString)
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()
  
    return `${day}/${month}/${year} às ${hour}:${minute}:${second}`
  }