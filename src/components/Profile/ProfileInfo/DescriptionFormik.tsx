import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { ProfileType } from "../../../Types/Types";

type DescriptionFormikType = {
  error: never[];
  profile: ProfileType;
  saveProfile: (profile: ProfileType) => Promise<void>;
  offEditMode: () => void;
};

const DesciptionFormik: React.FC<DescriptionFormikType> = (props) => {
  console.log(props);
  const saveProfile = props.saveProfile;
  const offEditMode = props.offEditMode;
  if (props.error.length > 0) {
  }
  return (
    <div>
      <Formik
        initialValues={props.profile}
        onSubmit={(values) => {
          saveProfile(values).then(() => {
            offEditMode();
          });
        }}
      >
        {() => (
          <Form>
            <div>
              <Field type="input" name="fullName" placeholder="Full Name" />
            </div>
            <div>
              <Field type="checkbox" name="lookingForAJob" />
            </div>
            <div>
              <Field
                type="textarea"
                name="lookingForAJobDescription"
                placeholder="My Professional skills"
              />
            </div>
            <div>
              <Field type="textarea" name="aboutMe" placeholder="About me" />
            </div>
            <div>
              <b>Contacts</b>:
              {Object.keys(props.profile.contacts).map((key) => {
                return (
                  <div key={key}>
                    <b>
                      {key}:
                      <Field
                        type="input"
                        name={"contacts." + key}
                        placeholder={key}
                      />
                    </b>
                  </div>
                );
              })}
            </div>
            <button type="submit">Save</button>
            <div>{props.error ? <p>{props.error}</p> : !props.error}</div>
            {/* <ErrorMessage name="editMode" component={props.error} /> */}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default DesciptionFormik;
