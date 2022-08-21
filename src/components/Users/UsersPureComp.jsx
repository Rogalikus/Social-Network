import React from "react";
import { NavLink } from "react-router-dom";
import photoUs from "../../components/img/2.jpg";
import styles from "./Users.module.css";
import { getFollow } from "../../api/api";
import { dropFollow } from "./../../api/api";

const UsersPureComp = (props) => {
  debugger;
  let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
  let pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  return (
    <div>
      <div>
        {pages.map((p) => {
          return (
            <span
              className={props.currentPage === p && styles.selectedPage}
              onClick={(e) => {
                props.onPageChanged(p);
              }}
            >
              {p}
            </span>
          );
        })}
      </div>
      {props.users.map((u) => (
        <div key={u.id}>
          <span>
            <div>
              <NavLink to={"/profile/" + u.id}>
                <img
                  className={styles.photo}
                  src={u.photos.small != null ? u.photos.small : photoUs}
                  alt={"AVAS"}
                />
              </NavLink>
            </div>
            <div>
              {u.followed ? (
                <button
                  disabled={props.followingInProgress}
                  onClick={() => {
                    props.followingInProgress(true);
                    // axios
                    //   .delete(
                    //     `https://social-network.samuraijs.com/api/1.0/follow/${u.id}`,
                    //     {
                    //       withCredentials: true,
                    //       headers: {
                    //         "API-KEY": "117de793-4071-49ba-8933-4701d3fabaae",
                    //       },
                    //     }
                    //   )
                    dropFollow(u.id).then((data) => {
                      if (data.resultCode === 0) {
                        props.unfollow(u.id);
                      }
                      props.followingInProgress(false);
                    });
                  }}
                >
                  Unfollow
                </button>
              ) : (
                <button
                  disabled={props.followingInProgress}
                  onClick={() => {
                    props.followingInProgress(true);
                    // axios
                    //   .post(
                    //     `https://social-network.samuraijs.com/api/1.0/follow/${u.id}`,
                    //     null,
                    //     {
                    //       withCredentials: true,
                    //       headers: {
                    //         "API-KEY": "117de793-4071-49ba-8933-4701d3fabaae",
                    //       },
                    //     }
                    //   )
                    getFollow(u.id).then((data) => {
                      if (data.resultCode === 0) {
                        props.follow(u.id);
                      }
                      props.followingInProgress(false);
                    });
                  }}
                >
                  Follow
                </button>
              )}
            </div>
          </span>
          <span>
            <span>
              <div>{u.name}</div>
              <div>{u.status}</div>
            </span>
            <span>
              <div>{"u.location.city"}</div>
              <div>{"u.location.country"}</div>
            </span>
          </span>
        </div>
      ))}
    </div>
  );
};
export default UsersPureComp;
