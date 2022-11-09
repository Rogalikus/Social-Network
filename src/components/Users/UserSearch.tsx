import React from "react";
import { Formik, Form, Field } from "formik";
import styles from "./Search.module.css";
import { FilterType } from "../../redux/users-reducer";
import { getUsersFilter } from "../../redux/users-selectors";
import { useSelector } from "react-redux";

type PropsType = {
  onFilterChanged: (filter: FilterType) => void;
};

export const UserSearch: React.FC<PropsType> = React.memo((props) => {
  const filter = useSelector(getUsersFilter);
  const submit = (
    values: FilterType,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    props.onFilterChanged(values);
    setSubmitting(false);
  };
  return (
    <div className={styles.search}>
      <Formik
        enableReinitialize
        initialValues={{ term: filter.term, friend: String(filter.friend) }}
        validate={(values) => {}}
        onSubmit={submit}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field type="text" name="term" />
            <Field name="friend" as="select">
              <option value="null">All</option>
              <option value="true">Only Followed</option>
              <option value="false">Only Unfollowed</option>
            </Field>
            <button type="submit" disabled={isSubmitting}>
              Find
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
});
