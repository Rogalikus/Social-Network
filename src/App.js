import React from "react";
import "./App.css";
import Dialogs from "./components/Dialogs/Dialogs";
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./components/Profile/Profile";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App = (props) => {
  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <Header />
        <Navbar />
        <div className="app-wrapper-content">
          <Routes>
            <Route
              path="/dialogs/*"
              element={
                <Dialogs
                  messagesData={props.reDux.messagesPage}
                  updateNewMessageText={props.updateNewMessageText}
                  addMessage={props.addMessage}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  updateNewPostText={props.updateNewPostText}
                  postsData={props.reDux.profilePage}
                  addPost={props.addPost}
                />
              }
            />
          </Routes>
          <Routes>
            <Route
              path="/"
              element={
                <Profile
                  updateNewPostText={props.updateNewPostText}
                  postsData={props.reDux.profilePage}
                  addPost={props.addPost}
                />
              }
            />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
