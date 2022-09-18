import profileReducer from "./profile-reducer";
import { React } from "react";
import { addPostActionCreator } from "./profile-reducer";

let state = {
  postsData: [
    { id: 1, message: "Hui, SHO TU GOLOVA?", countLike: "0" },
    { id: 2, message: "It`s JOPA", countLike: "5" },
  ],
};

test("new post", () => {
  //1. test DATA
  let action = addPostActionCreator("sho-to novoe");

  // 2. Action
  let newState = profileReducer(state, action);
  // 3. expectation
  expect(newState.postsData.length).toBe(3);
});

test("message of new should be correct", () => {
  //1. test DATA
  let action = addPostActionCreator("sho-to novoe");
  // 2. Action
  let newState = profileReducer(state, action);
  // 3. expectation
  expect(newState.postsData[2].message).toBe("sho-to novoe");
});
test("delete post", () => {
  //1. test DATA
  let action = deletePost(1);

  // 2. Action
  let newState = profileReducer(state, action);
  // 3. expectation
  expect(newState.postsData.length).toBe(1);
});
