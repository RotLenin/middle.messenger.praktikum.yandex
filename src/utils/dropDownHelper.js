/** Помимо открытия/закрытия - будем вешать закрывышку при клике вне элемента */
/** TODO: Сейчас есть возможность открыть несколько разных droDownMenu, надо будет решить - это баг или фича =) */
export function manageDropdown(dropDown){
    const body = document.querySelector('body');
    function toggle(event){
        if(dropDown.classList.contains('hidden')){
            body.addEventListener('click', toggle);
        } else {
            body.removeEventListener('click', toggle);
        }
        dropDown.classList.toggle('hidden')
        event.stopPropagation();
    }
    return toggle;
}