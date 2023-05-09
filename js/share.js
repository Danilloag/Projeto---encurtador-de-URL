let btnShareWapp = document.getElementById('btn-share-wapp')

btnShareWapp.addEventListener("click", function () {

    console.log('clicou')
    let phoneNumber = document.getElementById('phone-number').value
    let urlShare = document.getElementById('link-displayed')

    let link = `whatsapp://send?phone=${phoneNumber}&text=Olá, segue o link encurtado: ${urlShare}`;

    window.open(link);
}) 