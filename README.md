#middle.messenger.praktikum.yandex
##Версия - Гаврика Александра RotLenin

###Полезные ссылки :
- Макет в Figma :  https://www.figma.com/file/a1EiMq8L7K9ovKhO66i0el/yandex-practicum
- nettify-link : https://rot-lenin.netlify.app/
- pull-request : https://github.com/RotLenin/middle.messenger.praktikum.yandex/pull/5

###Команды для разработки :
- `npm run dev` : запускает сборщик parcel в режиме разработки на порту 1234
- `npm run build` : собирает проект в директорию **dist**
- `npm run start` : запускаем сборку проекта, после запускает Express на порту 3000, с настройкой под раздачу статики из **dist**
- `npm run startAfterBuild` : запускает Express на порту 3000, с настройкой под раздачу статики из **dist**
- `npm run test` : mocha для тестирования компонентов
- `npm run styleLint` : запускает styleLint, для поиска нарушений стандартов в CSS
- `npm run styleLintFix` : запускает styleLint, для поиска нарушений стандартов в CSS с флагом на исправление `--fix`
- `npm run eslint` : запускает eslint на проверку синтакса .ts файлов
- `npm run eslintFix` : запускает eslint на проверку синтакса .ts файлов с флагом на исправление `--fix`

### Принцип работы проекта :
1. Parcel собирает проект в директорию dist
1. Express сервер всегда отдает index.html файл, настроенным как SPA приложение (пока с косяками)
1. Router по маршруту (Пока GET Роутер) подключает необходимый Контроллер 
1. Контроллер получает данные из Model необходимые для View и вешает обработчики
1. Изменилась модель передеча данных между компонентов, с древовидной на подписки. Пример : ChatBodyMessages подписан на изменения в хранилище. При изменнии в сообщениях - обновится только компонент : ChatBodyMessages (Умное обновление пока в разработке)

### Нерешенные проблемы :
1. Есть проблемы при обновлении, тонна не добаработок по интерфейсу
    1. Нет обновления меню чатов при добавлении нового (фильтр еще не делал)
    1. Нет отписки от обновлений при удалении компонента
    1. Интерфейса при удалении 
    etc.
1. Серьезная проблемы с тестами :
    1. Т.к. тесты идут в обход parcel, нет трансформации pug шаблонов в js функции. Поэтому старался избегать импорта
    1. Для тестов Роутера необходимо корректное окружение location | history. В целом могу переписать Роутер на прокидывание экземпляра history|locals из теста ... но стоит ли оно того ? 

    