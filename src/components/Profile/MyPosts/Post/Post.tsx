import React, { useState } from "react";
import styles from "./Post.module.css";

type PropsType = {
  message: string;
  countLike: number;
};

const Post: React.FC<PropsType> = (props) => {
  const [count, setCount] = useState(0);

  return (
    <div className={styles.item}>
      <img
        src="https://png.pngtree.com/png-clipart/20210312/original/pngtree-formal-gray-color-suit-png-png-image_6076723.jpg"
        alt="AvaPost"
      />
      {props.message}
      <div>
        <button className={styles.button} onClick={() => setCount(count + 1)}>
          {count} Like
        </button>
        {/* <span> PoshelNahui</span> */}
      </div>
    </div>
  );
};

export default Post;
