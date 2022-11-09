import React from "react";
import styles from "./MyPosts.module.css";
import Post from "./Post/Post";
import { Formik, Form, Field } from "formik";
import { PostType } from "../../../Types/Types";

type PropsType = {
  postsData: Array<PostType>;
  addPost: (newPostText: string) => void;
};

const MyPosts: React.FC<PropsType> = React.memo((props) => {
  let postsElements = props.postsData.map((p) => (
    <Post message={p.message} key={p.id} countLike={p.countLike} />
  ));
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

type FormikPropsType = {
  addPost: (newPostText: string) => void;
};

type FormikValuesType = {
  newPostText: string;
};

const PostsBody: React.FC<FormikPropsType> = (props) => {
  let addOnePost = (values: string) => {
    props.addPost(values);
  };
  const initialValues: FormikValuesType = { newPostText: "" };
  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, { resetForm }) => {
          addOnePost(values.newPostText);
          resetForm({ values });
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
