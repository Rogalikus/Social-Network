import React from "react";
import styles from "./ProfileInfo.module.css";
import Preloader from "./../../Preloader/Preloader";
import kavo from "../../img/kavo.jpg";
import ProfileStatus from "./ProfileStatus";

const ProfileInfo = (props) => {
  if (!props.profile) {
    return <Preloader />;
  }
  return (
    <div className={styles.profileInfo}>
      <div>
        <a
          class="btn"
          href="https://www.youtube.com/watch?v=aP5HDUOayeY&ab_channel=%D0%9A%D0%BE%D0%BD%D1%82%D0%B5%D0%BD%D1%82%3F%D0%9D%D0%B0%D0%BC%D0%B5%D1%81%D1%82%D0%B5%21"
          target="_blank"
        >
          <img src={kavo} alt="osnova" />
        </a>
      </div>
      <div className={styles.desciptionBlock}>
        <img src={props.profile.photos.large} />
      </div>
      <div>
        <ProfileStatus
          status={props.status}
          updateStatus={props.updateStatus}
        />
      </div>
    </div>
  );
};

export default ProfileInfo;
