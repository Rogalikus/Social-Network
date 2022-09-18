import React from "react";
import Pagination from "./Pagination";
import User from "./User";

const UsersPureComp = (props) => {
  let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
  let pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }
  return (
    <div>
      {props.users.map((u) => (
        <User
          followingInProgress={props.followingInProgress}
          follow={props.follow}
          unfollow={props.unfollow}
          u={u}
          key={u.id}
        />
      ))}
      ;
      <Pagination
        currentPage={props.currentPage}
        onPageChanged={props.onPageChanged}
        pageSize={props.pageSize}
        totalUsersCount={props.totalUsersCount}
      />
    </div>
  );
};
export default UsersPureComp;
