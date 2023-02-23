export type DialogType = {
  id: number;
  name: string;
};

export type MessageType = {
  id: number;
  text: string;
};

let initialState = {
  dialogsData: [
    { id: 1, name: "Ukrainets" },
    // { id: 2, name: "Belarus" },
    // { id: 3, name: "Moskal" },
    // { id: 4, name: "Negr" },
  ] as Array<DialogType>,
  messagesData: [
    { id: 1, text: "Pishov Nahui,Moskal" },
    // { id: 2, text: "Ne stop, dai hui otsosy, potom idi kyda ho4esh" },
    // { id: 3, text: "Ladno(" },
    // { id: 4, text: "Y menya bolshe,Belarus" },
  ] as Array<MessageType>,
};

export type InitialStateType = typeof initialState;

export const dialogsReducer = (
  state = initialState,
  action: any
): InitialStateType => {
  switch (action.type) {
    case "ADD_MESSAGE":
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

export const action = {
  newMessage: (newMessagesData: string) => {
    return {
      type: "ADD_MESSAGE",
      newMessagesData,
    } as const;
  },
};
export default dialogsReducer;
