import React from "react";
import styles from "./MyPosts.module.css";
import Post from "./Post/Post";

const MyPosts = (props) => {
  let postsElements = props.postsData.map((p) => (
    <Post message={p.message} countLike={p.countLike} />
  ));
  let newPostElement = React.createRef();
  let addPost = () => {
    let text = newPostElement.current.value;
    props.addPost(text);
  };
  return (
    <div>
      MyPosts
      <div>
        <textarea ref={newPostElement}></textarea>
        <button onClick={addPost}>
          <img
            src="https://w7.pngwing.com/pngs/274/656/png-transparent-shipping-mail-envelope-send-letter-post-icon-thumbnail.png"
            width={28}
          />
        </button>
      </div>
      <div className={styles.Posts}>{postsElements}</div>
    </div>
  );
};

export default MyPosts;
