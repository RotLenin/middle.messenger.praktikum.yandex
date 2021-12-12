/**
 * img - пока пустое
 * author - пока будем true/false, т.к. нет состояния текущего пользователя
 * message - будет обрезаться на клиенте/сервере, пока только убрали переполнения, без ...
 * time - крайне неудобно обрабатывать данные в шаблонизаторе - пока запишем строками
 */

const chats = [
    {
        id : 1,
        img : "../static/img/avatars/man.png",
        name : 'Андрей',
        notification : 2,
        lastMessage : {
            time : '10:49',
            author : false,
            message : "Изображение",
        }
    },
    {
        id : 2,
        img : "../static/img/avatars/man1.png",
        name : 'Киноклуб',
        notification : null,
        lastMessage : {
            time : '12:00',
            author : true,
            message : "стикер",
        }
    },
    {
        id : 3,
        img : "../static/img/avatars/woman.png",
        name : 'Илья',
        notification : 4,
        lastMessage : {
            time : '15:12',
            author : false,
            message : "Друзья, у меня для вас особенный выпуск новостей!...Друзья, у меня для вас особенный выпуск новостей!...",
        }
    },
    {
        id : 4,
        img : "../static/img/avatars/man2.png",
        name : 'Вадим',
        notification : null,
        lastMessage : {
            time : 'Пт',
            author : true,
            message : "Круто!",
        }
    },
    {
        id : 5,
        img : "../static/img/avatars/woman1.png",
        name : 'тет-а-теты',
        notification : null,
        lastMessage : {
            time : '1 мая 2020',
            author : true,
            message : "И Human Interface Guidelines и Material Design рекомендуют...И Human Interface Guidelines и Material Design рекомендуют...",
        }
    },
]

module.exports = chats;