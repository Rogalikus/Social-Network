import { rerenderEntireTree } from "../render";
let state = {
  profilePage: {
    postsData: [
      { id: 1, message: "Hui, SHO TU GOLOVA?", countLike: "0" },
      { id: 2, message: "It`s JOPA", countLike: "5" },
    ],
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
  },
};
export let addPost = (postMessage) => {
  debugger;
  let newPost = {
    id: 5,
    message: postMessage,
    countLike: 0,
  };
  state.profilePage.postsData.push(newPost);
  rerenderEntireTree(state);
};
export default state;
