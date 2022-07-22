import React from "react";
import styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <nav className="nav">
      <div>
        <a className={styles.item} href="/profile">
          Profile
        </a>
      </div>
      <div>
        <a className={styles.item} href="/dialogs">
          Messages
        </a>
      </div>
      <div>
        <a className={styles.item} href="/news">
          News
        </a>
      </div>
      <div>
        <a className={styles.item} href="/musik">
          Musik
        </a>
      </div>
      <div>
        <a className={styles.item} href="/settings">
          Settings
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
