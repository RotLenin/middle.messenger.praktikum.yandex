/** Утилита валидации полей формы */

import {empty} from "./myLodash";
import {NodeListforEach} from "./nodeListHelper";

// Переход с валидации поля на общую
export function validationField(event){
    let target = event.target;
    return validation(target)

}

function validation(target){
    let {value, type, name} = target;
    //TODO : сделать валидацию по типу, пока просто на 0
    if(empty(value)){
        setError(target, name)
        return false
    }
    resetError(target, name)
    return true;
}

export function validationForm(inputs){
    let errors = [];
    let data = {};

    NodeListforEach(inputs, (input) => {
        let {value, name} = input;
        data[name] = value;

        if(!validation(input)){
            errors.push(input.name)
        }
    })

    return {errors : errors, data : data}
}

function findErrorField(name){
    return document.querySelector(`.form-input-error[name=${name}]`)
}

function resetError(target, name){
    target.classList.remove('form-input_error-color');
    let error = findErrorField(name);
    error.innerHTML = '';
}

function setError(target, name){
    target.classList.add('form-input_error-color');
    let error = findErrorField(name)
    error.innerHTML = error.dataset.error;
}