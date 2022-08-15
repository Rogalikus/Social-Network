import React from "react";
import styles from "./MyPosts.module.css";
import Post from "./Post/Post";

const MyPosts = (props) => {
  let postsElements = props.postsData.map((p) => (
    <Post message={p.message} key={p.id} countLike={p.countLike} />
  ));
  let newPostElement = React.createRef();
  let addOnePost = () => {
    props.addPost();
  };

  let onPostChange = () => {
    let text = newPostElement.current.value;
    props.updateNewPostText(text);
  };

  return (
    <div>
      MyPosts
      <div>
        <textarea
          onChange={onPostChange}
          ref={newPostElement}
          value={props.newPostText}
        />
        <button onClick={addOnePost}>
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
