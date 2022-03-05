import {TITLE} from '../constants/title';
const title = document.querySelector('title');

/** setTitle
 * Выставляет заголовок страницы
 * @param {string} titleText - заголовок
 */
export function setTitle(titleText: string) {
  if (title) {
    title.innerHTML = TITLE + ' - ' + titleText;
  } else {
    console.log('cant find title');
  }
}
