const inputs = [
    {name : 'email', label : 'Почта', placeholder : 'email@yandex.ru', type : 'email', errorText : 'Некоректная почта'},
    {name : 'login', label : 'Логин', placeholder : 'Логин', type : 'text', errorText : 'Некоректный логин'},
    {name : 'first_name', label : 'Имя', placeholder : 'Имя', type : 'text', errorText : 'Некоректное имя'},
    {name : 'second_name', label : 'Фамилия', placeholder : 'Фамилия', type : 'text', errorText : 'Некоректная фамилия'},
    {name : 'phone', label : 'Телефон', placeholder : '79099673030', type : 'tel', errorText : 'Некоректный телефон'},
    {name : 'password', label : 'Пароль', placeholder : 'Пароль', type : 'password', errorText : ''},
    {name : 'repassword', label : 'Пароль', placeholder : 'Пароль', type : 'password', errorText : 'Пароли не совпадают'},
]

const signup = {
    inputs : inputs
}

module.exports = signup