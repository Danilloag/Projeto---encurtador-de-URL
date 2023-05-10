// let btnShareWapp = document.getElementById('btn-share-wapp')

// btnShareWapp.addEventListener("click", function () {

//     console.log('clicou')
//     let phoneNumber = document.getElementById('phone-number').value
//     let urlShare = document.getElementById('link-displayed')

//     let link = `whatsapp://send?phone=${phoneNumber}&text=Olá, segue o link encurtado: ${urlShare.href}`;

//     window.open(link);
// }) 

// let btnSendWapp = document.getElementById('btn-send-wapp')
// btnSendWapp.addEventListener("click", function () {

//     let phoneNumber = document.getElementById('phone-number').value
//     let urlShare = document.getElementById('link-displayed').textContent

//     let link = `whatsapp://send?phone=${phoneNumber}&text=Olá, segue o link encurtado: ${urlShare}`;

//     window.open(link);
// })

// const btnShareTwitter = document.querySelector('#btn-share-twitter')
// btnShareTwitter.addEventListener("click", function () {
//     closeBox(boxSendLink)
//     let urlShare = document.getElementById('link-displayed').textContent

//     let link = `https://twitter.com/intent/tweet?text=Olá, segue o link encurtado: ${urlShare}`

//     window.open(link)
// })

// const btnShareLinkedin = document.querySelector('#btn-share-linkedin')
// btnShareLinkedin.addEventListener("click", function () {
//     closeBox(boxSendLink)
//     let urlShare = document.getElementById('link-displayed').textContent

//     const link = `https://www.linkedin.com/sharing/share-offsite/?url=&summary=${urlShare}`;

//     window.open(link)
// })