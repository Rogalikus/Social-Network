import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FilterType, thunkUsers, follow } from "../../redux/users-reducer";
import Pagination from "./Pagination";
import User from "./User";
import { UserSearch } from "./UserSearch";
import {
  getUsers,
  getTotalUsersCount,
  getCurrentPage,
  getPageSize,
  getUsersFilter,
  getFollowingInProgress,
} from "../../redux/users-selectors";
import type {} from "redux-thunk/extend-redux";
import { unfollow } from "./../../redux/users-reducer";
import { useLocation, useNavigate } from "react-router";

export const UsersPureComp: React.FC = () => {
  const users = useSelector(getUsers);
  const totalUsersCount = useSelector(getTotalUsersCount);
  const currentPage = useSelector(getCurrentPage);
  const pageSize = useSelector(getPageSize);
  const filter = useSelector(getUsersFilter);
  const followingInProgress = useSelector(getFollowingInProgress);
  useEffect(() => {
    dispatch(thunkUsers(currentPage, pageSize, filter));
  }, []);

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    navigate(
      "/users" +
        `?term=${filter.term}&friend=${filter.friend}&page=${currentPage}`
    );
  }, [filter, currentPage]);

  useEffect(() => {
    const parsed = new URLSearchParams(location.search.substring(1));

    const queryFriend = parsed.get("friend");
    const queryPage = parsed.get("page");
    const queryTerm = parsed.get("term");
    let actualPage = currentPage;
    let actualFilter = filter;

    if (!!queryPage) actualPage = Number(queryPage);
    if (!!queryTerm) actualFilter = { ...actualFilter, term: queryTerm };
    if (!!queryFriend)
      actualFilter = {
        ...actualFilter,
        friend:
          queryFriend === "null"
            ? "null"
            : queryFriend === "true"
            ? true
            : false,
      };

    dispatch(thunkUsers(actualPage, pageSize, actualFilter));
  }, [location.search]);

  const onPageChanged = (pageNumber: number) => {
    dispatch(thunkUsers(pageNumber, pageSize, filter));
  };
  const onFilterChanged = (filter: FilterType) => {
    dispatch(thunkUsers(1, pageSize, filter));
  };

  const followS = (userId: number) => {
    dispatch(follow(userId));
  };
  const unfollowS = (userId: number) => {
    dispatch(unfollow(userId));
  };

  let pagesCount = Math.ceil(totalUsersCount / pageSize);
  let pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }
  return (
    <div>
      <div>
        <UserSearch onFilterChanged={onFilterChanged} />
      </div>
      <div>
        <Pagination
          currentPage={currentPage}
          onPageChanged={onPageChanged}
          pageSize={pageSize}
          totalUsersCount={totalUsersCount}
        />
        {users.map((u) => (
          <User
            followingInProgress={followingInProgress}
            follow={followS}
            unfollow={unfollowS}
            key={u.id}
            u={u}
          />
        ))}
        ;
      </div>
    </div>
  );
};
