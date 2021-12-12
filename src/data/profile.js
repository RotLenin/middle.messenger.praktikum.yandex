const profileFields = [
    {name : 'Почта', value: 'pochta@yandex.ru'},
    {name : 'Логин', value: 'ivanivanov'},
    {name : 'Имя', value: 'Иван'},
    {name : 'Фамилия', value: 'Иванов'},
    {name : 'Имя в чате', value: 'Иван'},
    {name : 'Телефон', value: '+7 (909) 967 30 30'},
]

const profileChangeInfo = [
    {name : 'email', value: 'pochta@yandex.ru', label:'Почта', type: 'email'},
    {name : 'login', value: 'ivanivanov', label:'Логин', type: 'text'},
    {name : 'first_name', value: 'Иван', label:'Имя', type: 'text'},
    {name : 'second_name', value: 'Иванов', label:'Фамилия', type: 'text'},
    {name : 'display_name', value: 'Иван', label:'Имя в чате', type: 'text'},
    {name : 'phone', value: '7 (909) 967 30 30', label:'Телефон', type: 'tel'},
]

const profileChangePassword = [
    {name : 'oldPassword', value: '123456', label:'Старый пароль', type: 'password'},
    {name : 'newPassword', value: '123', label:'Новый пароль', type: 'password'},
    {name : 'reNewPassword', value: '12', label:'Повторите новый пароль', type: 'password'},
]

const profile = {
    profile : profileFields,
    profileChangeInfo : profileChangeInfo,
    profileChangePassword : profileChangePassword,
}

module.exports = profile