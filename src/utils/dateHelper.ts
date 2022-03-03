enum DAYS {
  'Вс',
  'Пн',
  'Вт',
  'Ср',
  'Чт',
  'Пт',
  'Сб'
}
/*
enum MONTHS {
  'Января',
  'Февраля',
  'Марта',
  'Апреля',
  'Мая',
  'Июня',
  'Июля',
  'Августа',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь'
}
*/
const DAY = 86400000;

/** createDate
 * @description Не помню зачем писал =)
 * @param {string} time
 * @return {Date}
 */
function createDate(time : string) : Date {
  return new Date(time);
}

/** getDayOfWeek
 * @description Получаем день недели используя словать
 * @param {Date} date
 * @return {string}
 */
function getDayOfWeek(date : Date) {
  return DAYS[date.getDay()];
}

/** getTime
 * @description Получаем время из даты в формате hh:mm
 * @param {Date} date
 * @return {string}
 */
function getTime(date : Date) : string {
  let m = String(date.getMinutes());
  if (Number(m) < 10) {
    m = '0' + m;
  }
  return date.getHours() + ':' + m;
}

/** getMonth
 * @description Получаем строковое представление месяца
 * @param {Date} date
 * @return {string}
 */
function getMonth(date : Date) : string {
  return DAYS[date.getMonth()];
}

/** formatFullDate
 * @description Полное представление даты
 * @param {Date} date
 * @return {string}
 */
function formatFullDate(date : Date) : string {
  return date.getDate() + ' ' + getMonth(date) + ' ' + date.getFullYear();
}

/** formaDate
 * @description Форматирует дату в зависимости от прошедшего времени
 * @param {string} dateString
 * @return {string}
 */
export function formaDate(dateString : string) : string {
  const date : Date = createDate(dateString);
  const now : Date = new Date();
  /** Сегодня */
  if (now.getTime() - date.getTime() < DAY) {
    return getTime(date);
  }
  /** Текущая неделя */
  if (now.getTime() - date.getTime() < DAY * 7) {
    return getDayOfWeek(date);
  }
  /** Более недели */
  return formatFullDate(date);
}
