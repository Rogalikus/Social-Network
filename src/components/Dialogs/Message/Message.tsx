import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./../Dialogs.module.css";

type PropsType = {
  text: string;
  id: number;
};

const Message: React.FC<PropsType> = (props) => {
  return <div className={styles.message}>{props.text}</div>;
};
export default Message;
