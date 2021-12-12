const root = document.querySelector('.profile');
const actionBtn = root.querySelector('.profile-actions .accept-btn');

function saveChanges(){
    //Тут будем обрабатывать изменения, пока просто кидаем на profile
    window.location.href = window.location.origin + '/' + 'profile.html';
}

actionBtn.addEventListener('click', saveChanges);