import React from "react";
import { connect } from "react-redux";
import {
  follow,
  unfollow,
  setCurrentPage,
  toggleFollowingProgress,
  thunkUsers,
} from "../../redux/users-reducer";
import UsersPureComp from "./UsersPureComp";
import Preloader from "./../Preloader/Preloader";
import { compose } from "redux";
import { withAuthRedirect } from "./../../hoc/withAuthRedirect";
import {
  getUsers,
  getTotalUsersCount,
  getCurrentPage,
  getFollowingInProgress,
  getIsFetching,
  getPageSize,
} from "./../../redux/users-selectors";

class UsersClassComp extends React.Component {
  componentDidMount() {
    const { pageSize, currentPage } = this.props;
    this.props.thunkUsers(currentPage, pageSize);
  }
  onPageChanged = (pageNumber) => {
    const { pageSize } = this.props;
    this.props.thunkUsers(pageNumber, pageSize);
    this.props.setCurrentPage(pageNumber);
  };

  render() {
    return (
      <>
        {this.props.isFetching ? (
          <Preloader />
        ) : (
          <UsersPureComp
            totalUsersCount={this.props.totalUsersCount}
            pageSize={this.props.pageSize}
            currentPage={this.props.currentPage}
            users={this.props.users}
            onPageChanged={this.onPageChanged}
            unfollow={this.props.unfollow}
            follow={this.props.follow}
            followingInProgress={this.props.followingInProgress}
          />
        )}
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    users: getUsers(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    followingInProgress: getFollowingInProgress(state),
  };
};

export default compose(
  connect(mapStateToProps, {
    follow,
    unfollow,
    setCurrentPage,
    toggleFollowingProgress,
    thunkUsers,
  }),
  withAuthRedirect
)(UsersClassComp);
