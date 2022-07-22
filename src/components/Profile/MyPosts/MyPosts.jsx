import React from "react";
import styles from "./MyPosts.module.css";
import Post from "./Post/Post";

const MyPosts = () => {
  return (
    <div>
      MyPosts
      <div>
        <textarea></textarea>
        <button>
          <img
            src="https://w7.pngwing.com/pngs/274/656/png-transparent-shipping-mail-envelope-send-letter-post-icon-thumbnail.png"
            width={28}
          />
        </button>
      </div>
      <div className={styles.Posts}>
        <Post message="Hui, SHO TU GOLOVA?" countLike="0" />
        <Post message="It`s JOPA" countLike="5" />
      </div>
    </div>
  );
};

export default MyPosts;
