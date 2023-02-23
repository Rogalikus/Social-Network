import { chatAPI, ChatMessageType } from "../api/chat-api";
import { AppStateType, BaseThunkType, InferActionsTypes } from "./redux-store";
import { Dispatch } from "redux";
import { message } from "antd";

let initialState = {
  messages: [] as ChatMessageType[],
};

export type InitialStateType = typeof initialState;

const chatReducer = (
  state = initialState,
  action: ActionsTypes
): InitialStateType => {
  switch (action.type) {
    case "MESSAGES_RECEIVED":
      return {
        ...state,
        messages: [...state.messages, ...action.payload],
      };
    default:
      return state;
  }
};
type ActionsTypes = InferActionsTypes<typeof actions>;

export const actions = {
  messagesReceived: (messages: ChatMessageType[]) =>
    ({
      type: "MESSAGES_RECEIVED",
      payload: messages,
    } as const),
};
type GetStateType = () => AppStateType;
type DispatchType = Dispatch<ActionsTypes>;
type ThunkType = BaseThunkType<ActionsTypes>;

let _newMessagesHandlerCreator: ((messages: ChatMessageType[]) => void) | null =
  null;
const newMessagesHandlerCreator = (dispatch: Dispatch) => {
  if (_newMessagesHandlerCreator === null) {
    _newMessagesHandlerCreator = (messages: ChatMessageType[]) => {
      dispatch(actions.messagesReceived(messages));
    };
  }
  return _newMessagesHandlerCreator;
};

export const startMessagesListening = (): ThunkType => async (dispatch) => {
  chatAPI.start();
  chatAPI.subscr(newMessagesHandlerCreator(dispatch));
};
export const stopMessagesListening = (): ThunkType => async (dispatch) => {
  chatAPI.unsubscr(newMessagesHandlerCreator(dispatch));
  chatAPI.stop();
};
export const sendMessages =
  (message: string): ThunkType =>
  async (dispatch) => {
    chatAPI.sendMessage(message);
  };
export default chatReducer;
