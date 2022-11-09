import { Dispatch } from "react";
import { boolean } from "yup";
import { getUsers } from "../api/api";
import { getFollow } from "../api/api";
import { dropFollow } from "../api/api";
import { updateObjectInArray } from "../object-helpers";
import { UserType } from "../Types/Types";
import { AppStateType, BaseThunkType, InferActionsTypes } from "./redux-store";

let initialState = {
  users: [] as Array<UserType>,
  pageSize: 5,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: true,
  followingInProgress: [] as Array<number>,
  filter: { term: "", friend: "" as string | boolean },
};

export type InitialStateType = typeof initialState;
export type FilterType = typeof initialState.filter;

const usersReducer = (
  state = initialState,
  action: ActionsTypes
): InitialStateType => {
  switch (action.type) {
    case "FOLLOW":
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
    case "UNFOLLOW":
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, "id", {
          followed: false,
        }),
      };
    case "SET_USERS":
      return { ...state, users: action.users };
    case "SET_CURRENT_PAGE":
      return { ...state, currentPage: action.currentPage };
    case "SET_FILTER":
      return { ...state, filter: action.payload };
    case "SET_TOTAL_USERS_COUNT":
      return { ...state, totalUsersCount: action.total };
    case "TOGGLE_IS_FETCHING":
      return { ...state, isFetching: action.isFetching };
    case "TOGGLE_IS_FOLLOWING_IN_PROGRESS":
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

type ActionsTypes = InferActionsTypes<typeof actions>;

export const actions = {
  followSuccess: (userId: number) => {
    return { type: "FOLLOW", userId } as const;
  },
  unfollowSuccess: (userId: number) => {
    return { type: "UNFOLLOW", userId } as const;
  },
  setCurrentPage: (currentPage: number) => {
    return { type: "SET_CURRENT_PAGE", currentPage: currentPage } as const;
  },
  setFilter: (filter: FilterType) => {
    return { type: "SET_FILTER", payload: filter } as const;
  },
  setUsers: (users: Array<UserType>) => {
    return { type: "SET_USERS", users: users } as const;
  },
  setTotalUsersCount: (totalUsersCount: number) => {
    return { type: "SET_TOTAL_USERS_COUNT", total: totalUsersCount } as const;
  },
  toggleIsFetching: (isFetching: boolean) => {
    return { type: "TOGGLE_IS_FETCHING", isFetching } as const;
  },
  toggleFollowingProgress: (isFetching: boolean, userId: number) => {
    return {
      type: "TOGGLE_IS_FOLLOWING_IN_PROGRESS",
      isFetching,
      userId,
    } as const;
  },
};

type GetStateType = () => AppStateType;
type DispatchType = Dispatch<ActionsTypes>;
type ThunkType = BaseThunkType<ActionsTypes>;

export const thunkUsers = (
  currentPage: number,
  pageSize: number,
  filter: FilterType
): ThunkType => {
  return async (dispatch, _getState) => {
    dispatch(actions.toggleIsFetching(true));
    dispatch(actions.setCurrentPage(currentPage));
    dispatch(actions.setFilter(filter));

    let data = await getUsers(
      currentPage,
      pageSize,
      filter.term,
      filter.friend
    );
    dispatch(actions.toggleIsFetching(false));
    dispatch(actions.setUsers(data.items));
    dispatch(actions.setTotalUsersCount(data.totalCount));
  };
};

export const _followUnfollow = async (
  dispatch: DispatchType,
  id: number,
  apiMethod: any,
  actionCreator: (userId: number) => ActionsTypes
) => {
  dispatch(actions.toggleFollowingProgress(true, id));
  let data = await apiMethod(id);
  if (data.resultCode === 0) {
    dispatch(actionCreator(id));
  }
  dispatch(actions.toggleFollowingProgress(false, id));
};

export const follow = (id: number): ThunkType => {
  return async (dispatch: any) => {
    const apiMethod = getFollow;
    const actionCreator = actions.followSuccess;
    _followUnfollow(dispatch, id, apiMethod, actionCreator);
  };
};

export const unfollow = (id: number): ThunkType => {
  return async (dispatch: any) => {
    const apiMethod = dropFollow;
    const actionCreator = actions.unfollowSuccess;
    _followUnfollow(dispatch, id, apiMethod, actionCreator);
  };
};

export default usersReducer;

// AC - ActionCreator
