const filter = document.querySelector('.search-filter')

import {NodeListforEach} from "../utils/nodeListHelper";

/** TODO: Пока ищем только по заголовку, без поиска в сообщениях */
function findChat(event){
    let value = event.target.value.toLowerCase();
    NodeListforEach(document.querySelectorAll('.chat-menu-item'),
        (el) => {
            let title = el.querySelector('.chat-menu-item__title').innerHTML.toLowerCase();
            value === "" || title.includes(value) ? el.classList.remove('hidden') : el.classList.add('hidden')
        }
    )
}

filter.addEventListener('input', findChat)