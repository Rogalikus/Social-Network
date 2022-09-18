import React from "react";
import { NavLink } from "react-router-dom";
import photoUs from "../../components/img/2.jpg";
import styles from "./Users.module.css";

const User = ({ u, ...props }) => {
  return (
    <div>
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
              disabled={props.followingInProgress.some((id) => id === u.id)}
              onClick={() => {
                props.unfollow(u.id);
              }}
            >
              Unfollow
            </button>
          ) : (
            <button
              disabled={props.followingInProgress.some((id) => id === u.id)}
              onClick={() => {
                props.follow(u.id);
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
  );
};
export default User;
