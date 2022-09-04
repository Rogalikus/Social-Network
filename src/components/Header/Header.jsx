import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";
const Header = (props) => {
  debugger;
  return (
    <header className={styles.header}>
      <img src="../rog.png" alt="Rogalik" />
      <div className={styles.loginBlock}>
        {props.isAuth ? (
          <div>
            {props.login} - <button onClick={props.logOut}> Log Out </button>
          </div>
        ) : (
          <NavLink to={"/login "}>Login</NavLink>
        )}
      </div>
    </header>
  );
};

export default Header;
