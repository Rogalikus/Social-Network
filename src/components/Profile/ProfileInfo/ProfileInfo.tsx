import React, { ChangeEvent, useState } from "react";
import styles from "./ProfileInfo.module.css";
import Preloader from "../../Preloader/Preloader";
import photo from "../../img/2.jpg";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import DesciptionFormik from "./DescriptionFormik";
import { ProfileType, ContactsType } from "../../../Types/Types";

type PropsType = {
  profile: ProfileType | null;
  savePhoto: (file: File) => void;
  isOwner: boolean;
  status: string;
  saveProfile: (profile: ProfileType) => Promise<void>;
  updateStatus: (status: string) => void;
  error: never[];
};

const ProfileInfo: React.FC<PropsType> = (props) => {
  const [editMode, setEditMode] = useState(false);

  if (!props.profile) {
    return <Preloader />;
  }

  const mainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
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
            error={props.error}
            profile={props.profile}
            saveProfile={props.saveProfile}
            offEditMode={() => {
              setEditMode(false);
            }}
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

type DescriptionBlockType = {
  profile: ProfileType;
  isOwner: boolean;
  toEditMode: () => void;
};

const DesciptionBlock: React.FC<DescriptionBlockType> = (props) => {
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
              contactValue={props.profile.contacts[key as keyof ContactsType]}
            />
          );
        })}
      </div>
      {props.isOwner && (
        <div>
          <button onClick={props.toEditMode}>Edit</button>
        </div>
      )}
    </div>
  );
};

type ContactsPropsType = {
  contactTitle: string;
  contactValue: string;
};

const Contact: React.FC<ContactsPropsType> = ({
  contactTitle,
  contactValue,
}) => {
  return (
    <div className={styles.contact}>
      <b>{contactTitle}</b>: {contactValue}
    </div>
  );
};

export default ProfileInfo;
