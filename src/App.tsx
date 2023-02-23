import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HeaderContainer from "./components/Header/HeaderContainer";
import { connect } from "react-redux";
import { initializeApp } from "./redux/app-reducer";
import { compose } from "redux";
import Preloader from "./components/Preloader/Preloader";
import store, { AppStateType } from "./redux/redux-store";
import { Provider } from "react-redux";
import withSuspense from "./hoc/withSuspence";
import { UsersPage } from "./components/Users/UsersContainer";
import { Login } from "./components/Login/login";
import "antd/dist/antd.min.css";
import {
  BookOutlined,
  CustomerServiceOutlined,
  MessageOutlined,
  SettingOutlined,
  TeamOutlined,
  UserOutlined,
  WechatOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import type { MenuProps } from "antd";
import { NavLink } from "react-router-dom";

const DialogsContainer = withSuspense(
  React.lazy(() => import("./components/Dialogs/DialogsContainer"))
);
const ProfileContainer = withSuspense(
  React.lazy(() => import("./components/Profile/ProfileContainer"))
);
const ChatPage = withSuspense(
  React.lazy(() => import("./pages/Chat/ChatPage"))
);

type PropsAppType = ReturnType<typeof mapStateToProps>;
type ThunkAppType = {
  initializeApp: () => void;
};

const { Header, Content, Footer, Sider } = Layout;
type MenuItem = Required<MenuProps>["items"][number];
function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    label,
    key,
    icon,
    children,
    type,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem(
    "Profile",
    "1",
    <NavLink to="/profile">
      <UserOutlined />
    </NavLink>
  ),
  getItem(
    "Messages",
    "2",
    <NavLink to="/dialogs">
      <MessageOutlined />
    </NavLink>
  ),
  getItem(
    "News",
    "3",
    <NavLink to="/news">
      {" "}
      <BookOutlined />
    </NavLink>
  ),
  getItem(
    "Musik",
    "4",
    <NavLink to="/musik">
      <CustomerServiceOutlined />
    </NavLink>
  ),
  getItem(
    "Settings",
    "5",
    <NavLink to="/settings">
      <SettingOutlined />
    </NavLink>
  ),
  getItem(
    "Users",
    "6",
    <NavLink to="/users">
      {" "}
      <TeamOutlined />
    </NavLink>
  ),
  getItem(
    "Chat",
    "7",
    <NavLink to="/chat">
      {" "}
      <WechatOutlined />
    </NavLink>
  ),
];

class App extends React.Component<PropsAppType & ThunkAppType> {
  catchAllUnhandleError = (e: PromiseRejectionEvent) => {
    alert("Some error occured");
    //console.error(promiseRejectionEvent)
  };
  componentDidMount() {
    this.props.initializeApp();
    window.addEventListener("unhandledrejection", this.catchAllUnhandleError);
  }
  componentWillUnmount() {
    window.removeEventListener(
      "unhandledrejection",
      this.catchAllUnhandleError
    );
  }
  render() {
    if (!this.props.initialized) {
      return <Preloader />;
    }

    return (
      <Layout>
        <Sider>
          <div className="logo" style={{ marginTop: 60 }} />
          <Menu
            items={items}
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
          />
        </Sider>
        <Layout>
          <Header
            className="site-layout-sub-header-background"
            style={{ padding: 0 }}
          >
            {" "}
            <HeaderContainer />
          </Header>
          <Content style={{ margin: "24px 16px 0" }}>
            <div
              className="site-layout-background"
              style={{ padding: 24, minHeight: 900 }}
            >
              <Routes>
                <Route path="/dialogs/*" element={<DialogsContainer />} />
                <Route path="/profile/:userId" element={<ProfileContainer />} />
                <Route path="/profile" element={<ProfileContainer />} />
                <Route
                  path="/users"
                  element={<UsersPage pageTitle={"Рогалики"} />}
                />
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<ProfileContainer />} />
                <Route path="/chat" element={<ChatPage />} />
                <Route path="*" element={<div>404 NOT FOUND</div>} />
              </Routes>
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Design ©2022 Created by Rogalik
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

type MapStateToProps = {
  initialized: boolean;
};

const mapStateToProps = (state: AppStateType): MapStateToProps => ({
  initialized: state.app.initialized,
});

const AppContainer = compose(connect(mapStateToProps, { initializeApp }))(App);

let MainApp: React.FC = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </BrowserRouter>
  );
};

export default MainApp;

// <div className="app-wrapper">
//   <HeaderContainer />
//   <Navbar />
//   <div className="app-wrapper-content">
//     <Routes>
//       <Route path="/dialogs/*" element={<DialogsContainer />} />
//       <Route path="/profile/:userId" element={<ProfileContainer />} />
//       <Route path="/profile" element={<ProfileContainer />} />
//      <Route
//         path="/users"
//         element={<UsersPage pageTitle={"Рогалики"} />}
//       />
//       <Route path="/login" element={<Login />} />
//       <Route path="/" element={<ProfileContainer />} />
//       <Route
//         path="*"
//         element={
//           <div>
//             404 NOT FOUND
//           </div>
//         }
//       />
//     </Routes>
//   </div>
// </div> */
