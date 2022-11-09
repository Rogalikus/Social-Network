import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { UsersPureComp } from "./UsersPureComp";
import Preloader from "../Preloader/Preloader";
import {
  getCurrentPage,
  getIsFetching,
  getPageSize,
  getUsersFilter,
} from "../../redux/users-selectors";
import { thunkUsers } from "../../redux/users-reducer";
import { useDispatch } from "react-redux";

type UsersPagePropsType = {
  pageTitle: string;
};

export const UsersPage: React.FC<UsersPagePropsType> = (props) => {
  const isFetching = useSelector(getIsFetching);
  // useEffect(() => {
  //   dispatch(thunkUsers(currentPage, pageSize, filter));
  // }, []);
  // const dispatch = useDispatch();

  // const currentPage = useSelector(getCurrentPage);
  // const pageSize = useSelector(getPageSize);
  // const filter = useSelector(getUsersFilter);
  return (
    <>
      <h2>{props.pageTitle}</h2>
      {isFetching ? <Preloader /> : null}
      <UsersPureComp />
    </>
  );
};
// type MapStatePropsType = {
//   pageTitle: string;
//   totalUsersCount: number;
//   pageSize: number;
//   currentPage: number;
//   isFetching: boolean;
//   portionSize?: number;
//   followingInProgress: Array<number>;
//   filter: FilterType;
// };

// type MapDispatchPropsType = {
//   thunkUsers: (
//     currentPage: number,
//     pageSize: number,
//     filter: FilterType
//   ) => void;
//   setCurrentPage: (pageNumber: number) => void;
//   onPageChanged: (pageNumber: number) => void;
//   toggleFollowingProgress: (userId: number, isFetching: boolean) => void;
//   unfollow: (userId: number) => Action;
//   follow: (userId: number) => Action;
// };

// type OwnPropsType = {
//   pageTitle: string;
// };

// type PropsType = MapDispatchPropsType & MapStatePropsType & OwnPropsType;

// type StateType = {};

// class UsersClassComp extends React.Component<PropsType, StateType> {
//   componentDidMount() {
//     const { pageSize, currentPage, filter } = this.props;
//     this.props.thunkUsers(currentPage, pageSize, filter);
//   }

//   render() {
//     return (
//       <>
//         <h2>{this.props.pageTitle}</h2>
//         {this.props.isFetching ? (
//           <Preloader />
//         ) : (
//           <UsersPureComp
//             unfollow={this.props.unfollow}
//             follow={this.props.follow}
//           />
//         )}
//       </>
//     );
//   }
// }

// const mapStateToProps = (
//   state: AppStateType,
//   props: PropsType
// ): MapStatePropsType => {
//   return {
//     pageTitle: props.pageTitle,
//     users: getUsers(state),
//     pageSize: getPageSize(state),
//     totalUsersCount: getTotalUsersCount(state),
//     currentPage: getCurrentPage(state),
//     isFetching: getIsFetching(state),
//     followingInProgress: getFollowingInProgress(state),
//     filter: getUsersFilter(state),
//   };
// };

// const connector = connect(mapStateToProps, {
//   follow,
//   unfollow,
//   thunkUsers,
// });

// type PropsFromRedux = ConnectedProps<typeof connector>;

// export default compose<React.ComponentType>(
//   connector,
//   withAuthRedirect
// )(UsersClassComp);
