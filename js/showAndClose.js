export function closeBox(box) {
    box.style.display = "none";
}

export function showBox(box) {
    box.style.display = "flex";
}

export function showModalDelete() {
    console.log('clicou')
    let backgroundModal = document.getElementById('background-modal')
    let modalDelete = document.getElementById('modal-delete')
    modalDelete.classList.remove("hidden")
    backgroundModal.classList.remove("hidden")
}

export function showModalEdit() {
    let backgroundModal = document.getElementById('background-modal')
    let modalEdit = document.getElementById('modal-edit')
    modalEdit.classList.remove("hidden")
    backgroundModal.classList.remove("hidden")
}

export function closeModalDelete() {
    let backgroundModal = document.getElementById('background-modal')
    let modalDelete = document.getElementById('modal-delete')
    backgroundModal.classList.add('hidden')
    modalDelete.classList.add('hidden')
}

export function closeModalEdit() {
    let backgroundModal = document.getElementById('background-modal')
    let modalEdit = document.getElementById('modal-edit')
    backgroundModal.classList.add('hidden')
    modalEdit.classList.add('hidden')
}