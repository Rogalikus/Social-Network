import React from "react";
import styles from "./Dialogs.module.css";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";

const Dialogs = (props) => {
  let dialogsElements = props.dialogsData.map((dialog) => (
    <DialogItem name={dialog.name} key={dialog.id} id={dialog.id} />
  ));
  let messagesElements = props.messagesData.map((message) => (
    <Message text={message.text} key={message.id} id={message.id} />
  ));
  const newMessagesData = props.newMessagesData;
  let newOneMessage = () => {
    props.newMessage();
  };
  let onMessageChange = (e) => {
    let text = e.target.value;
    props.updateNewMessageText(text);
  };
  return (
    <div>
      <div className={styles.dialogs}>
        <div className={styles.dialogsItems}>{dialogsElements}</div>
        <div className={styles.messages}>
          {messagesElements}
          <textarea
            className={styles.textarea}
            onChange={onMessageChange}
            value={newMessagesData}
          ></textarea>
          <button className={styles.send} onClick={newOneMessage}></button>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default Dialogs;
