import Dialogs from "./Dialogs";
import { addMessageActionCreator } from "../../redux/dialogs-reducer";
import { connect } from "react-redux";
import { withAuthRedirect } from "./../../hoc/withAuthRedirect";
import { compose } from "redux";

let mapStateToProps = (state) => {
  return {
    dialogsData: state.messagesPage.dialogsData,
    messagesData: state.messagesPage.messagesData,
    newMessagesData: state.messagesPage.newMessagesData,
  };
};
let mapDispatchToProps = (dispatch) => {
  return {
    newMessage: (a) => {
      dispatch(addMessageActionCreator(a));
    },
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
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
