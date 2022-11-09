import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./../Dialogs.module.css";

type PropsType = {
  id: number;
  name: string;
};

const DialogItem: React.FC<PropsType> = (props) => {
  return (
    <div className={styles.dialog}>
      <NavLink
        className={(navData) =>
          navData.isActive ? styles.active : styles.dialog
        }
        to={"/dialogs/" + `${props.id}`}
      >
        {props.name}
      </NavLink>
    </div>
  );
};
export default DialogItem;
