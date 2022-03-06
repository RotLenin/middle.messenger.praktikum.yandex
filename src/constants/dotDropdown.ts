import IDropdown from '../types/interface/IDropdown';

import ADD_USER_IMG from '../static/img/icons/add.png';
import REMOVE_USER_IMG from '../static/img/icons/remove.png';

const dotDropdown: IDropdown[] = [
  {id: 'addUserBtn', icon: ADD_USER_IMG, name: 'Добавить пользователя'},
  {id: 'removeUserBtn', icon: REMOVE_USER_IMG, name: 'Удалить пользователя'},
];

export default dotDropdown;
