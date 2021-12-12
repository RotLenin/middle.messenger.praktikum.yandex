/** Логика замены текста Label при загрузке файла */
const defaultText = 'Выберите файл на компьютере';

export function onUpload(input, label){
    if(input.value !== ''){
        label.classList.add('custom-file-uploader_done');
        label.innerHTML = input.value.split('\\').pop();
        return true;
    }
    label.classList.remove('custom-file-uploader_done');
    label.innerHTML = defaultText;
    return false;
}