import React from "react";
import MyPosts from "./MyPosts/MyPosts";
import styles from "./Profile.module.css";

const Profile = () => {
  return (
    <div>
      <div className={styles.profile}>
        <a
          class="btn"
          href="https://www.youtube.com/watch?v=aP5HDUOayeY&ab_channel=%D0%9A%D0%BE%D0%BD%D1%82%D0%B5%D0%BD%D1%82%3F%D0%9D%D0%B0%D0%BC%D0%B5%D1%81%D1%82%D0%B5%21"
          target="_blank"
        >
          <img src="kavo.jpg" />
        </a>
      </div>
      <div>ava+ descr</div>
      <MyPosts />
    </div>
  );
};

export default Profile;
