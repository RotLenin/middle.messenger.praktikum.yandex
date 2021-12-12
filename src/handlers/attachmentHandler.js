import {manageDropdown} from "../utils/dropDownHelper";

const dotMenu = document.querySelector('.chat-body-sender__attachment');
const dropDown = dotMenu.querySelector('.drop-down-menu')

const toggleFunc = manageDropdown(dropDown);

function toggleMenu(event){
    toggleFunc(event)
    event.stopPropagation();
}

dotMenu.addEventListener('click', toggleMenu)