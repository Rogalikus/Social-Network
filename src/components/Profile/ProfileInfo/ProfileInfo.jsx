import React, { useState } from "react";
import styles from "./ProfileInfo.module.css";
import Preloader from "./../../Preloader/Preloader";
import photo from "../../img/2.jpg";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import DesciptionFormik from "./DescriptionFormik";

const ProfileInfo = (props) => {
  const [editMode, setEditMode] = useState(false);

  if (!props.profile) {
    return <Preloader />;
  }

  const mainPhotoSelected = (e) => {
    if (e.target.files.length) {
      props.savePhoto(e.target.files[0]);
    }
  };
  return (
    <div className={styles.profileInfo}>
      {/* <div>
        <a
          class="btn"
          href="https://www.youtube.com/watch?v=aP5HDUOayeY&ab_channel=%D0%9A%D0%BE%D0%BD%D1%82%D0%B5%D0%BD%D1%82%3F%D0%9D%D0%B0%D0%BC%D0%B5%D1%81%D1%82%D0%B5%21"
          target="_blank"
        >
          <img src={kavo} alt="osnova" />
        </a>
      </div> */}
      <div className={styles.desciptionBlock}>
        <img src={props.profile.photos.large || photo} alt="avatar" />
        {props.isOwner && <input type={"file"} onChange={mainPhotoSelected} />}
      </div>
      <div>
        {editMode ? (
          <DesciptionFormik
            profile={props.profile}
            saveProfile={props.saveProfile}
          />
        ) : (
          <DesciptionBlock
            profile={props.profile}
            isOwner={props.isOwner}
            toEditMode={() => {
              setEditMode(true);
            }}
          />
        )}
      </div>

      <div>
        <ProfileStatusWithHooks
          status={props.status}
          updateStatus={props.updateStatus}
        />
      </div>
    </div>
  );
};

const DesciptionBlock = (props) => {
  return (
    <div>
      <div>
        <b> Full Name</b>: {props.profile.fullName}
      </div>
      <div>
        <b>Looking for a job</b>: {props.profile.lookingForAJob ? "yes" : "no"}
      </div>
      {props.profile.lookingForAJob && (
        <div>
          <b>My Professional skills</b>:{" "}
          {props.profile.lookingForAJobDescription}
        </div>
      )}

      <div>
        <b>About me</b>: {props.profile.aboutMe}
      </div>
      <div>
        <b>Contacts</b>:
        {Object.keys(props.profile.contacts).map((key) => {
          return (
            <Contact
              key={key}
              contactTitle={key}
              contactValue={props.profile.contacts[key]}
            />
          );
        })}
      </div>
      {props.isOwner && (
        <div>
          <button onClick={props.toEditMode}>Edit</button>{" "}
        </div>
      )}
    </div>
  );
};

const Contact = ({ contactTitle, contactValue }) => {
  return (
    <div className={styles.contact}>
      <b>{contactTitle}</b>: {contactValue}
    </div>
  );
};

export default ProfileInfo;
