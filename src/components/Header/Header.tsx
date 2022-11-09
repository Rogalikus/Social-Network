import { LoginOutlined, LogoutOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";

type PropsType = {
  isAuth: boolean;
  login: null | string;
  logOut: () => void;
};

const Header: React.FC<PropsType> = (props) => {
  return (
    <header className={styles.header}>
      <img src="../rog.png" alt="Rogalik" />
      <div className={styles.loginBlock}>
        {props.isAuth ? (
          <div className={styles.nickname}>
            {props.login} -{" "}
            <Button
              type="default"
              icon={<LogoutOutlined />}
              danger
              onClick={props.logOut}
            ></Button>
          </div>
        ) : (
          <NavLink to={"/login "}>
            <Button icon={<LoginOutlined />}></Button>
          </NavLink>
        )}
      </div>
    </header>
  );
};

export default Header;
