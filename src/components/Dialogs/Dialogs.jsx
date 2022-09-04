import React from "react";
import styles from "./Dialogs.module.css";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import { Formik, Form, Field } from "formik";
//key={message.id} key={dialog.id}
const Dialogs = (props) => {
  let dialogsElements = props.dialogsData.map((dialog) => (
    <DialogItem name={dialog.name} key={dialog.id} id={dialog.id} />
  ));
  let messagesElements = props.messagesData.map((message) => (
    <Message text={message.text} key={message.id} id={message.id} />
  ));

  return (
    <div>
      <div className={styles.dialogs}>
        <div className={styles.dialogsItems}>{dialogsElements}</div>
        <div className={styles.messages}>
          {messagesElements}
          <DialogsBody newMessage={props.newMessage} />
        </div>
      </div>
    </div>
  );
};

const DialogsBody = (props) => {
  let addNewMessage = (values) => {
    props.newMessage(values);
  };
  return (
    <div>
      <Formik
        initialValues={{ newMessagesData: "" }}
        onSubmit={(values, { resetForm }) => {
          addNewMessage(values.newMessagesData);
          resetForm({ values: "" });
        }}
      >
        {() => (
          <Form>
            <div>
              <Field
                type="textarea"
                name="newMessagesData"
                placeholder="Horosho"
              />
            </div>
            <button type="submit">send</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Dialogs;
