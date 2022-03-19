import addImg from '../static/img/icons/add.png';

const locals = {
  main: {
    headers: {
      title: 'Чат',
    },
    locals: {
      menu: {
        addChatImg: addImg,
        chats: [],
      },
      body: {
        selectedChat: null,
      },
    },
  },
};

export default locals;
