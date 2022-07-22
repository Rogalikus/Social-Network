import React from "react";
import styles from "./Post.module.css";

const Post = (props) => {
  return (
    <div className={styles.item}>
      <img src="https://png.pngtree.com/png-clipart/20210312/original/pngtree-formal-gray-color-suit-png-png-image_6076723.jpg" />
      {props.message}
      <div>
        <span>{props.countLike}</span>
        <span> Like</span>
        <span> PoshelNahui</span>
      </div>
    </div>
  );
};

export default Post;
