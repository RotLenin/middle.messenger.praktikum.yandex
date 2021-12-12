/** Утилита валидации полей формы */

import {empty} from './myLodash';
import {nodeListforEach} from './nodeListHelper';
import Iobject from "../types/interface/Iobject";

/** validationField
 * Валидация input - передает Node в validation
 * @param {Event} event
 * @return {boolean}
 */
export function validationField(event : Event) {
  const target = event.target;
  // @ts-ignore
  return validation(target);
}

/** validation
 * Собственно сама проверка на корректность
 * @param {HTMLInputElement} target
 * @return {boolean}
 */
function validation(target : HTMLInputElement) {
  const {value, type, name} = target;
  // Если поле пустое - нет смысла дальше проверять
  if (empty(value)) {
    setError(target, name);
    return false;
  }
  // Проверяем по name
  if (!nameValidation(name, value)) {
    setError(target, name);
    return false;
  }
  // Проверяем по type
  if (!typeValidation(type, value)) {
    setError(target, name);
    return false;
  }
  // TODO : реализовать более хитрую логику для повтора пороля и тд
  // TODO : в идеале писать разные ошибки на разные проверки как в yup

  resetError(target, name);
  return true;
}

/** nameValidation
 * Ищем проверки по имени поля
 * @param {string} name
 * @param {*} value
 * @return {boolean}
 */
function nameValidation(name : string, value : string) {
  switch (name) {
    case 'first_name':
    case 'second_name':
      return value.match('^[а-яА-ЯёЁa-zA-Z]+$') !== null;
    case 'login':
      return (value.length >= 3 && value.length <= 20 && value.match('^[a-zA-Z][a-zA-Z0-9-_]+$') !== null);
    case 'email':
      return value.match('^[-\\w.]+@([A-z0-9][-A-z0-9]+\\.)+[A-z]{2,4}$') !== null;
    case 'phone':
      return value.match('^((8|\\+7)[\\- ]?)?(\\(?\\d{3}\\)?[\\- ]?)?[\\d\\- ]{7,10}$');
    default:
      return true
  }
}

/** typeValidation
 * Ищем проверки по type поля
 * @param {string} type
 * @param {*} value
 * @return {boolean}
 */
function typeValidation(type : string, value : string) {
  switch (type) {
    case 'password':
      return value.match('(?=^.{8,40}$)((?=.*\\d)|(?=.*\\W+))(?![.\\n])(?=.*[A-Z])(?=.*[a-z]).*$');
    default:
      return true
  }
}

/** validationForm
 * Проверка всей формы
 * @param {NodeList} inputs
 * @return {object} - {
 *   errors : [],
 *   data : []
 * }
 */
export function validationForm(inputs : NodeList) {
  const errors : string[] = [];
  const data : Iobject = {};

  // @ts-ignore
  nodeListforEach(inputs, (input: HTMLInputElement) => {
    const {value, name} = input;
    data[name] = value;

    if (!validation(input)) {
      errors.push(input.name);
    }
  });
  console.log({errors: errors, data: data})
  return {errors: errors, data: data};
}

/** findErrorField
 * Ищем поле, куда необходимо вписать ошибку
 * @param {string} name
 * @return {HTMLInputElement}
 */
function findErrorField(name : string) {
  return document.querySelector(`.input-error[name=${name}]`);
}

/** resetError
 * Обнуляем текст ошибки
 * @param {HTMLInputElement} target
 * @param {string} name
 * @return {void}
 */
function resetError(target : HTMLElement, name : string) {
  target.classList.remove('form-input_error-color');
  const error = findErrorField(name);
  if(error){
    error.innerHTML = '';
  } else {
    console.log('cant find error field: '+name);
  }
}

/** setError
 * Выставляем сообщение об ошибке
 * @param {HTMLElement} target
 * @param {string} name
 * @return {void}
 */
function setError(target : HTMLElement, name : string) {
  target.classList.add('form-input_error-color');
  const error = findErrorField(name);
  if(error){
    // @ts-ignore
    error.innerHTML = error?.dataset?.error;
  } else {
    console.log('cant find error field: '+name);
  }
}
