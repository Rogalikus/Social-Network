const ADD_MESSAGE = "ADD-MESSAGE";

let initialState = {
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
};

export const dialogsReducer = (state = initialState, action) => {
  switch (action.type) {
    //this._addMessage
    case ADD_MESSAGE:
      let newMessage = {
        id: 5,
        text: action.newMessagesData,
      };
      return {
        ...state,
        messagesData: [...state.messagesData, newMessage],
      };
    default:
      return state;
  }
};
export const addMessageActionCreator = (newMessagesData) => {
  debugger;
  return {
    type: ADD_MESSAGE,
    newMessagesData,
  };
};
export default dialogsReducer;
