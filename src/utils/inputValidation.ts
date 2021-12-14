/** Утилита валидации полей формы */
import {empty} from './myLodash';
import {nodeListforEach} from './nodeListHelper';

const nameValidator : Record<string, (value : string) => boolean>= {
  first_name : (value : string) => value.match('^[а-яА-ЯёЁa-zA-Z]+$') !== null,
  second_name : (value : string) => value.match('^[а-яА-ЯёЁa-zA-Z]+$') !== null,
  login : (value : string) => (value.length >= 3 && value.length <= 20 && value.match('^[a-zA-Z][a-zA-Z0-9-_]+$') !== null),
  email : (value : string) => value.match('(?:[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\\])') !== null,
  phone : (value : string) => value.match('^((8|\\+7)[\\- ]?)?(\\(?\\d{3}\\)?[\\- ]?)?[\\d\\- ]{7,10}$') !== null,
}

const typeValidator : Record<string, (value : string) => boolean> = {
  password : (value) => value.match('(?=^.{8,40}$)((?=.*\\d)|(?=.*\\W+))(?![.\\n])(?=.*[A-Z])(?=.*[a-z]).*$') !== null,
}

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
  if (Object.prototype.hasOwnProperty.call(nameValidator, name) && !nameValidator[name](value)) {
    setError(target, name);
    return false;
  }
  // Проверяем по type
  if (Object.prototype.hasOwnProperty.call(typeValidator, type) && !typeValidator[type](value)) {
    setError(target, name);
    return false;
  }

  resetError(target, name);
  return true;
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
  const data : Record<string, any> = {};

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
  if (error) {
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
  if (error) {
    // @ts-ignore
    error.innerHTML = error?.dataset?.error;
  } else {
    console.log('cant find error field: '+name);
  }
}
