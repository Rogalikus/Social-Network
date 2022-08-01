import React from "react";
import styles from "./Dialogs.module.css";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";

const Dialogs = (props) => {
  let newMessageElement = React.createRef();
  let newMessage = () => {
    let newtextMessage = newMessageElement.current.value;
    alert(newtextMessage);
  };
  let dialogsElements = props.messagesData.dialogsData.map((dialog) => (
    <DialogItem name={dialog.name} id={dialog.id} />
  ));
  let messagesElements = props.messagesData.messagesData.map((message) => (
    <Message text={message.text} id={message.id} />
  ));

  return (
    <div>
      <div className={styles.dialogs}>
        <div className={styles.dialogsItems}>{dialogsElements}</div>
        <div className={styles.messages}>{messagesElements}</div>
      </div>
      <div>
        <textarea ref={newMessageElement}></textarea>
        <button onClick={newMessage} width={30}></button>
      </div>
    </div>
  );
};

export default Dialogs;
