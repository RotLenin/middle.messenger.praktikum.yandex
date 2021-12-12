import {validationField, validationForm} from "../utils/inputValidation";
import {NodeListforEach} from "../utils/nodeListHelper";

const form = document.querySelector('.form')

function singin(){
    let inputs = form.querySelectorAll('input')
    let {errors, data} = validationForm(inputs);
    // Если ошибок при валидации нет - кидаем в chat
    if(errors.length === 0){
        localStorage.setItem('user', JSON.stringify(data))
        window.location.href = window.location.origin + '/' + 'chat.html';
        return true;
    }
    // Если есть ошибки - по хорошему заблокировать кнопку
    return false
}

/** TODO - желательно проверять что это авторизация а не регистрация */
form.querySelector('.accept-btn').addEventListener('click', singin);
NodeListforEach(form.querySelectorAll('input'), (el) => el.addEventListener('change', validationField));
