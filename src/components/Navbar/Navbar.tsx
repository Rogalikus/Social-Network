import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <nav className={styles.nav}>
      <div>
        <NavLink
          className={(navData) =>
            navData.isActive ? styles.active : styles.item
          }
          to="/profile"
        >
          Profile
        </NavLink>
      </div>
      <div>
        <NavLink
          className={(navData) =>
            navData.isActive ? styles.active : styles.item
          }
          to="/dialogs"
          //activeclassname={styles.active}
        >
          Messages
        </NavLink>
      </div>
      <div>
        <NavLink
          className={(navData) =>
            navData.isActive ? styles.active : styles.item
          }
          to="/news"
        >
          News
        </NavLink>
      </div>
      <div>
        <NavLink
          className={(navData) =>
            navData.isActive ? styles.active : styles.item
          }
          to="/musik"
        >
          Musik
        </NavLink>
      </div>
      <div>
        <NavLink
          className={(navData) =>
            navData.isActive ? styles.active : styles.item
          }
          to="/settings"
        >
          Settings
        </NavLink>
      </div>
      <div className={styles.users}>
        <NavLink
          className={(navData) =>
            navData.isActive ? styles.active : styles.item
          }
          to="/users"
        >
          Users
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
