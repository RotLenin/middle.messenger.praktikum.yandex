import {validationField, validationForm} from "../utils/inputValidation";
import {NodeListforEach} from "../utils/nodeListHelper";

import USERS from "../data/users";

const form = document.querySelector('.form')

function auth(){
    let inputs = form.querySelectorAll('input')
    let {errors, data} = validationForm(inputs);
    // Если ошибок при валидации нет - проводим авторизацию (пока со статикой)
    console.log(errors, data);
    if(errors.length === 0){
        let user = USERS.find(user => user.login === data.login && user.password === data.password);
        if(user){
            localStorage.setItem('user', JSON.stringify(user))
            window.location.href = window.location.origin + '/' + 'chat.html';
            return true;
        }
        /** TODO: сделать функционал на очистку ошибки при изменении полей формы */
        console.log('Bad data user');
        form.querySelector('.form-action__error').innerHTML = 'Неверный Логин или Пароль'
        return false
    }
    // Если есть ошибки - по хорошему заблокировать кнопку
    return false
}

/** TODO - желательно проверять что это авторизация а не регистрация */
form.querySelector('.accept-btn').addEventListener('click', auth);
NodeListforEach(form.querySelectorAll('input'), (el) => el.addEventListener('change', validationField));
