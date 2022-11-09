import React from "react";
import { connect } from "react-redux";
import Profile from "./Profile";
import {
  getUserProfile,
  getStatus,
  updateStatus,
  savePhoto,
  saveProfile,
} from "../../redux/profile-reducer";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";
import { AppStateType } from "../../redux/redux-store";
import { ProfileType } from "../../Types/Types";
import { number } from "yup";

type MapStatePropsType = {
  profile: ProfileType | null;
  status: string;
  authUserId: number | null;
  isAuth: boolean;
  error: never[];
};

type MapDispatchPropsType = {
  getUserProfile: (userId: number) => void;
  getStatus: (userId: number) => void;
  updateStatus: (status: string) => void;
  savePhoto: (file: any) => void;
  saveProfile: (profile: ProfileType) => Promise<void>;
};

type OwnPropsType = {
  router: any;
  history: any;
};

type StateType = {};

type PropsType = MapDispatchPropsType & MapStatePropsType & OwnPropsType;

class ProfileContainer extends React.Component<PropsType, StateType> {
  refreshProfile() {
    let userId = this.props.router.params.userId;
    if (!userId) {
      userId = this.props.authUserId;
      if (!userId) {
        this.props.history.push("/login");
      }
    }
    this.props.getUserProfile(userId);
    this.props.getStatus(userId);
  }

  componentDidMount() {
    this.refreshProfile();
  }
  componentDidUpdate(prevProps: PropsType, prevState: StateType) {
    if (this.props.router.params.userId !== prevProps.router.params.userId) {
      this.refreshProfile();
    }
  }
  render() {
    return (
      <Profile
        {...this.props}
        saveProfile={this.props.saveProfile}
        savePhoto={this.props.savePhoto}
        isOwner={!this.props.router.params.userId}
        profile={this.props.profile}
        status={this.props.status}
        updateStatus={this.props.updateStatus}
      />
    );
  }
}
const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
  profile: state.profilePage.profile,
  status: state.profilePage.status,
  authUserId: state.auth.id,
  isAuth: state.auth.isAuth,
  error: state.profilePage.error,
});

function withRouter(ProfileContainer: any) {
  function ComponentWithRouterProp(props: PropsType) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return (
      <ProfileContainer {...props} router={{ location, navigate, params }} />
    );
  }

  return ComponentWithRouterProp;
}

export default compose<React.ComponentType>(
  connect(mapStateToProps, {
    getUserProfile,
    getStatus,
    updateStatus,
    savePhoto,
    saveProfile,
  }),
  withRouter,
  withAuthRedirect
)(ProfileContainer);
