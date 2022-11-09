import React from "react";
import { actions, InitialStateType } from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";
import { connect, ConnectedProps } from "react-redux";
import { AppStateType } from "../../../redux/redux-store";
import { PostType } from "../../../Types/Types";

type MapDispatchPropsType = {
  addPost: (newPostText: string) => void;
};

type MapStatePropsType = {
  postsData: Array<PostType>;
  newPostText: string;
};

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
  return {
    postsData: state.profilePage.postsData,
    newPostText: state.profilePage.newPostText,
  };
};
const mapDispatchToProps = (dispatch: any): MapDispatchPropsType => {
  return {
    addPost: (newPostText: string) => {
      dispatch(actions.addPostActionCreator(newPostText));
    },
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

const MyPostsContainer = connector(MyPosts);

export default MyPostsContainer;

// const MyPostsContainer = (props) => {
//   return (
//     <StoreContext.Consumer>
//       {(store) => {
//         let state = store.getState();
//         let addPost = () => {
//           store.dispatch(addPostActionCreator());
//         };
//         let onPostChange = (text) => {
//           store.dispatch(updateNewPostTextActionCreator(text));
//         };
//         return (
//           <MyPosts
//             updateNewPostText={onPostChange}
//             addPost={addPost}
//             postsData={state.profilePage.postsData}
//             newPostText={state.profilePage.newPostText}
//           />
//         );
//       }}
//     </StoreContext.Consumer>
//   );
// };
