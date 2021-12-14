/* TODO: Сейчас есть возможность открыть несколько разных droDownMenu,
 * надо будет решить - это баг или фича =) */

/** manageDropdown
 * Открытие/закрытие dropdown
 * @param {HTMLElement} dropDown
 * @return {function}
 */
export function manageDropdown(dropDown : HTMLElement) {
  const body = document.querySelector('body');

  /** toggle
   * @param {Event} event
   * @return {void}
   */
  function toggle(event : Event) {
    if (dropDown.classList.contains('hidden')) {
      if (body) {
        body.addEventListener('click', toggle);
      }
    } else {
      if (body) {
        body.removeEventListener('click', toggle);
      }
    }
    dropDown.classList.toggle('hidden');
    event.stopPropagation();
  }
  return toggle;
}
