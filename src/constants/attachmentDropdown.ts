import IDropdown from '../types/interface/IDropdown';

import image from '../static/img/icons/image.png'
import file from '../static/img/icons/file.png'
import location from '../static/img/icons/location.png'

const attachmentDropdown: IDropdown[] = [
  {id: 'attachmentImg', icon: image, name: 'Фото или Видео'},
  {id: 'attachmentFile', icon: file, name: 'Файл'},
  {id: 'attachmentLocation', icon: location, name: 'Локация'},
];

export default attachmentDropdown;
