import React, { Component, Suspense } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
//import DialogsContainer from "./components/Dialogs/DialogsContainer";
//import UsersContainer from "./components/Users/UsersContainer";
//import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
//import Login from "./components/Login/login";
import { connect } from "react-redux";
import { initializeApp } from "./redux/app-reducer";
import { compose } from "redux";
import Preloader from "./components/Preloader/Preloader";
import store from "./redux/redux-store";
import { Provider } from "react-redux";
import withSuspense from "./hoc/withSuspence";

const DialogsContainer = withSuspense(
  React.lazy(() => import("./components/Dialogs/DialogsContainer"))
);
const UsersContainer = withSuspense(
  React.lazy(() => import("./components/Users/UsersContainer"))
);
const ProfileContainer = withSuspense(
  React.lazy(() => import("./components/Profile/ProfileContainer"))
);
//const HeaderContainer = React.lazy(() => import("./components/Header/HeaderContainer"));
const Login = withSuspense(
  React.lazy(() => import("./components/Login/login"))
);
class App extends Component {
  componentDidMount() {
    this.props.initializeApp();
  }
  render() {
    if (!this.props.initialized) {
      return <Preloader />;
    }

    return (
      <div className="app-wrapper">
        <HeaderContainer />
        <Navbar />
        <div className="app-wrapper-content">
          <Routes>
            <Route path="/dialogs/*" element={<DialogsContainer />} />
            <Route path="/profile/:userId" element={<ProfileContainer />} />
            <Route path="/profile" element={<ProfileContainer />} />
            <Route path="/users" element={<UsersContainer />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<ProfileContainer />} />
          </Routes>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized,
});

const AppContainer = compose(connect(mapStateToProps, { initializeApp }))(App);
//store={props.store}

let MainApp = (props) => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </BrowserRouter>
  );
};
export default MainApp;
