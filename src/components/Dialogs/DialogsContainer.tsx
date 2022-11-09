import Dialogs from "./Dialogs";
import { action, DialogType, MessageType } from "../../redux/dialogs-reducer";
import { connect } from "react-redux";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";
import { AppStateType } from "../../redux/redux-store";

type MapStatePropsType = {
  dialogsData: Array<DialogType>;
  messagesData: Array<MessageType>;
};

//type MapDispatchPropsType = {};

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
  return {
    dialogsData: state.messagesPage.dialogsData,
    messagesData: state.messagesPage.messagesData,
  };
};
// let mapDispatchToProps = (dispatch: any) => {
//   return {
//     newMessage: (a: any) => {
//       dispatch(action.addMessageActionCreator(a));
//     },
//   };
// };

export default compose<React.ComponentType>(
  connect(mapStateToProps, { ...action }),
  withAuthRedirect
)(Dialogs);

// const DialogsContainer = () => {
//   return (
//     <StoreContext.Consumer>
//       {(store) => {
//         let state = store.getState();
//         let newMessage = () => {
//           store.dispatch(addMessageActionCreator());
//         };
//         let onMessageChange = (text) => {
//           store.dispatch(updateNewMessageTextActionCreator(text));
//         };
//         return (
//           <Dialogs
//             newMessage={newMessage}
//             updateNewMessageText={onMessageChange}
//             dialogsData={state.messagesPage.dialogsData}
//             messagesData={state.messagesPage.messagesData}
//             newMessagesData={state.messagesPage.newMessagesData}
//             dialogsPage={state}
//           />
//         );
//       }}
//     </StoreContext.Consumer>
//   );
// };
