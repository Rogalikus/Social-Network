import React from "react";
import { Formik, Form, Field } from "formik";

const DesciptionFormik = (props) => {
  const saveProfile = (values) => {
    props.saveProfile(values);
  };
  return (
    <div>
      <Formik
        initialValues={{
          //   props.profile
          fullName: "",
          lookingForAJob: "",
          lookingForAJobDescription: "",
          aboutMe: "",
          facebook: "",
          website: "",
          vk: "",
          twitter: "",
          instagram: "",
          youtube: "",
          github: "",
          mainLink: "",
        }}
        onSubmit={(values) => {
          saveProfile(
            // values.profile
            values.fullName,
            values.lookingForAJob,
            values.lookingForAJobDescription,
            values.aboutMe,
            values.facebook,
            values.github,
            values.instagram,
            values.mainLink,
            values.twitter,
            values.vk,
            values.website,
            values.youtube
          );
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
              <Field type="input" name="facebook" placeholder="Facebook" />
            </div>
            <div>
              <Field type="input" name="website" placeholder="Website" />
            </div>
            <div>
              <Field type="input" name="vk" placeholder="Vk" />
            </div>
            <div>
              <Field type="input" name="twitter" placeholder="Twitter" />
            </div>
            <div>
              <Field type="input" name="instagram" placeholder="Instagram" />
            </div>
            <div>
              <Field type="input" name="youtube" placeholder="Youtube " />
            </div>
            <div>
              <Field type="input" name="github" placeholder="Github" />
            </div>
            <div>
              <Field type="input" name="mainLink" placeholder="Main Link" />
            </div>
            <button type="submit">Save</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
export default DesciptionFormik;
