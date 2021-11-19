import {showModal, closeModal, toggle} from "../components/modal/modal";
import {onUpload} from "../components/customFileUploader/customFileUploader";

const root = document.querySelector('.profile-img');
const imgWrapper = root.querySelector('.profile-img__img-wrapper');
const modal = root.querySelector('.modal');
const modalWrapper = modal.querySelector('.modal__wrapper');

/** Настройка логики модалки */
imgWrapper.addEventListener('click', () => showModal(modal));
modal.addEventListener('click', () => closeModal(modal));
/** Необходимо отключить всплытие,
 * чтобы модалка закрывалась только по клику на не рабочую область */
modalWrapper.addEventListener('click', (e) => e.stopPropagation());

/** Настройка загрузки файла */
const input = root.querySelector('#profileImg');
const label = root.querySelector('label[for=profileImg]');
const modalTitle = root.querySelector('.profile-img-modal__title');
const actionBtn = root.querySelector('.accept-btn');
const actionError = root.querySelector('.profile-img-modal__action-error');

const ACTION_ERROR_TEXT = 'Нужно выбрать файл';

function uploadFile(){
    //** TODO: На текущий момент не понял как повторить Ошибку загрузки */
    let res = onUpload(input, label);

    if(res){
        modalTitle.innerHTML = 'Файл загружен';
        // Так же чистим ошибку кнопки
        actionError.innerHTML = '';
        return true;
    }

    modalTitle.innerHTML = 'Загрузите файл';
    return true;
}

function saveFile(){
    //Проверять будем по наличию пути в input
    /** TODO: более качественная проверка была бы кстати */
    if(input.value !== ''){
        /*Тут какая то логика сохранения, пока работает со статикой
            просто закроем модалку*/
        closeModal(modal)
    }
    actionError.innerHTML = ACTION_ERROR_TEXT;
}

input.addEventListener('change', uploadFile);
actionBtn.addEventListener('click', saveFile);

