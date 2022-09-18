import { getUsers } from "../api/api";
import { getFollow } from "../api/api";
import { dropFollow } from "../api/api";
import { updateObjectInArray } from "./../object-helpers";

const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET_USERS";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_TOTAL_USERS_COUNT = "SET_TOTAL_USERS_COUNT";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";
const TOGGLE_IS_FOLLOWING_IN_PROGRESS = "TOGGLE_IS_FOLLOWING_IN_PROGRESS";
let initialState = {
  users: [],
  pageSize: 5,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: true,
  followingInProgress: [],
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FOLLOW:
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, "id", {
          followed: true,
        }),
        // state.users.map((u) => {
        //   if (u.id === action.userId) {
        //     return { ...u, followed: true };
        //   }
        //   return u;
      };
    case UNFOLLOW:
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, "id", {
          followed: false,
        }),
      };
    case SET_USERS:
      return { ...state, users: action.users };
    case SET_CURRENT_PAGE:
      return { ...state, currentPage: action.currentPage };
    case SET_TOTAL_USERS_COUNT:
      return { ...state, totalUsersCount: action.total };
    case TOGGLE_IS_FETCHING:
      return { ...state, isFetching: action.isFetching };
    case TOGGLE_IS_FOLLOWING_IN_PROGRESS:
      return {
        ...state,
        followingInProgress: action.isFetching
          ? [...state.followingInProgress, action.userId]
          : state.followingInProgress.filter((id) => id !== action.userId),
      };
    default:
      return state;
  }
};
export const followSuccess = (userId) => {
  return { type: FOLLOW, userId };
};
export const unfollowSuccess = (userId) => {
  return { type: UNFOLLOW, userId };
};
export const setCurrentPage = (currentPage) => {
  return { type: SET_CURRENT_PAGE, currentPage: currentPage };
};
export const setUsers = (users) => {
  return { type: SET_USERS, users: users };
};
export const setTotalUsersCount = (totalUsersCount) => {
  return { type: SET_TOTAL_USERS_COUNT, total: totalUsersCount };
};
export const toggleIsFetching = (isFetching) => {
  return { type: TOGGLE_IS_FETCHING, isFetching };
};
export const toggleFollowingProgress = (isFetching, userId) => {
  return { type: TOGGLE_IS_FOLLOWING_IN_PROGRESS, isFetching, userId };
};

export const thunkUsers = (currentPage, pageSize) => {
  return async (dispatch) => {
    dispatch(toggleIsFetching(true));

    let data = await getUsers(currentPage, pageSize);
    dispatch(toggleIsFetching(false));
    dispatch(setUsers(data.items));
    dispatch(setTotalUsersCount(data.totalCount));
  };
};
export const followUnfollow = async (
  dispatch,
  id,
  apiMethod,
  actionCreator
) => {
  dispatch(toggleFollowingProgress(true, id));
  let data = await apiMethod(id);
  if (data.resultCode === 0) {
    dispatch(actionCreator(id));
  }
  dispatch(toggleFollowingProgress(false, id));
};
export const follow = (id) => {
  return async (dispatch) => {
    const apiMethod = getFollow;
    const actionCreator = followSuccess;
    followUnfollow(dispatch, id, apiMethod, actionCreator);
  };
};
export const unfollow = (id) => {
  return async (dispatch) => {
    const apiMethod = dropFollow;
    const actionCreator = unfollowSuccess;
    followUnfollow(dispatch, id, apiMethod, actionCreator);
  };
};
export default usersReducer;

// AC - ActionCreator
