export function showModal(modal){
    modal.classList.remove('modal_not_show')
}

export function closeModal(modal){
    modal.classList.add('modal_not_show')
}

export function toggle(modal){
    modal.classList.toggle('modal_not_show')
}