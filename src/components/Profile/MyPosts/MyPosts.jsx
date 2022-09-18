import React from "react";
import styles from "./MyPosts.module.css";
import Post from "./Post/Post";
import { Formik, Form, Field } from "formik";

const MyPosts = React.memo((props) => {
  let postsElements = props.postsData.map((p) => (
    <Post message={p.message} key={p.id} countLike={p.countLike} />
  ));
  // let newPostElement = React.createRef();
  // let addOnePost = () => {
  //   this.props.addPost();
  // };

  // let onPostChange = () => {
  //   let text = newPostElement.current.value;
  //   this.props.updateNewPostText(text);
  // };

  return (
    <div>
      MyPosts
      <div>
        <PostsBody addPost={props.addPost} />
      </div>
      <div className={styles.Posts}>{postsElements}</div>
    </div>
  );
});

const PostsBody = (props) => {
  let addOnePost = (values) => {
    props.addPost(values);
  };
  return (
    <div>
      <Formik
        initialValues={{ newPostText: "" }}
        onSubmit={(values, { resetForm }) => {
          addOnePost(values.newPostText);
          resetForm({ values: "" });
        }}
      >
        {() => (
          <Form>
            <div>
              <Field
                type="textarea"
                name="newPostText"
                placeholder="Napishu sho tu golova"
              />
            </div>
            <button type="submit">send</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
export default MyPosts;
