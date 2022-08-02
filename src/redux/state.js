import { rerenderEntireTree } from "../render";
let state = {
  profilePage: {
    postsData: [
      { id: 1, message: "Hui, SHO TU GOLOVA?", countLike: "0" },
      { id: 2, message: "It`s JOPA", countLike: "5" },
    ],
    newPostText: "4e go?",
  },
  messagesPage: {
    dialogsData: [
      { id: 1, name: "Ukrainets" },
      { id: 2, name: "Belarus" },
      { id: 3, name: "Moskal" },
      { id: 4, name: "Negr" },
    ],
    messagesData: [
      { id: 1, text: "Pishov Nahui,Moskal" },
      { id: 2, text: "Ne stop, dai hui otsosy, potom idi kyda ho4esh" },
      { id: 3, text: "Ladno(" },
      { id: 4, text: "Y menya bolshe,Belarus" },
    ],
    newMessagesData: "Sho hochesh?",
  },
};
export let addPost = () => {
  let newPost = {
    id: 5,
    message: state.profilePage.newPostText,
    countLike: 0,
  };
  state.profilePage.postsData.push(newPost);
  state.profilePage.newPostText = "";
  rerenderEntireTree(state);
};
export let updateNewPostText = (newText) => {
  state.profilePage.newPostText = newText;
  rerenderEntireTree(state);
};
export let addMessage = () => {
  let newMessage = {
    id: 5,
    message: state.messagesPage.newMessagesData,
  };
  state.messagesPage.messagesData.push(newMessage);
  rerenderEntireTree(state);
};
export let updateNewMessageText = (newText) => {
  state.messagesPage.newMessagesData = newText;
  rerenderEntireTree(state);
};
export default state;
