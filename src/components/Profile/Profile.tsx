import React from "react";
import { ProfileType } from "../../Types/Types";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import styles from "./Profile.module.css";
import ProfileInfo from "./ProfileInfo/ProfileInfo";

type PropsType = {
  error: never[];
  saveProfile: (profile: ProfileType) => Promise<void>;
  savePhoto: (file: any) => void;
  isOwner: any;
  profile: ProfileType | null;
  status: string;
  updateStatus: (status: string) => void;
};

const Profile = (props: PropsType) => {
  return (
    <div>
      <ProfileInfo
        error={props.error}
        saveProfile={props.saveProfile}
        savePhoto={props.savePhoto}
        isOwner={props.isOwner}
        profile={props.profile}
        status={props.status}
        updateStatus={props.updateStatus}
      />
      <MyPostsContainer />
    </div>
  );
};

export default Profile;
