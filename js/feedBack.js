import { showBox, closeBox } from "./showAndClose.js"

export function feedBackUser(success = true, message) {
    let feedBackMessage = document.getElementById('feedback-message')
    let boxMsg = document.getElementById('box-msg')
    let presentClass = boxMsg.getAttribute("class")

    presentClass = success
        ? presentClass.replace("error-msg", "success-msg")
        : presentClass.replace("success-msg", "error-msg")
    boxMsg.setAttribute("class", presentClass)
    console.log(presentClass)
    feedBackMessage.innerHTML = `
    <p>${message}</p>
    `
    showBox(boxMsg)

    //TODOCRIAR UMA FUNÇÃO A PARTE
    const btnCloseBoxMsg = document.querySelector('#close-box-msg')
    btnCloseBoxMsg.addEventListener("click", function () {
        let boxMsg = document.getElementById('box-msg')
        closeBox(boxMsg)
    })
}

