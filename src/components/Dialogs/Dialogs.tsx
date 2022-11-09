import React from "react";
import styles from "./Dialogs.module.css";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import { Formik, Form, Field } from "formik";
import { DialogType, MessageType } from "../../redux/dialogs-reducer";
//key={message.id} key={dialog.id}

// type DialogsDataType = {
//   id: number,
//   name: string
// }

// type MessagesData = {
//   id: number,
//   text: string
// }

type PropsType = {
  dialogsData: Array<DialogType>;
  addMessageActionCreator: () => void;
  isAuth: boolean;
  messagesData: Array<MessageType>;
  newMessage: (messageText: string) => void;
};

const Dialogs: React.FC<PropsType> = (props) => {
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

type FormikPropsType = {
  newMessage: (messageText: string) => void;
};

interface FormValue {
  newMessagesData: string;
  values: string;
}

const DialogsBody: React.FC<FormikPropsType> = (props) => {
  let addNewMessage = (values: string) => {
    props.newMessage(values);
  };

  const initialValues: FormValue = { newMessagesData: "", values: "" };
  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, { resetForm }) => {
          addNewMessage(values.newMessagesData);
          resetForm({ values: initialValues });
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
