import React from "react";
import styles from "./Dialogs.module.css";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";

const Dialogs = (props) => {
  let dialogsElements = props.messagesData.dialogsData.map((dialog) => (
    <DialogItem name={dialog.name} id={dialog.id} />
  ));
  let messagesElements = props.messagesData.messagesData.map((message) => (
    <Message text={message.text} id={message.id} />
  ));
  let newMessageElement = React.createRef();
  let newMessage = () => {
    let text = newMessageElement.current.value;
    props.addMessage(text);
  };
  let onMessageChange = () => {
    let text = newMessageElement.current.value;
    props.updateNewMessageText(text);
  };

  return (
    <div>
      <div className={styles.dialogs}>
        <div className={styles.dialogsItems}>{dialogsElements}</div>
        <div className={styles.messages}>{messagesElements}</div>
      </div>
      <div>
        <textarea
          onChange={onMessageChange}
          value={props.newMessagesData}
          ref={newMessageElement}
        ></textarea>
        <button className={styles.send} onClick={newMessage}></button>
      </div>
    </div>
  );
};

export default Dialogs;
