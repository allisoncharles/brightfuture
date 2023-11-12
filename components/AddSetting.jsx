import styles from "../styles/AddSetting.module.css";
import { useRef, useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_SETTING } from "../graphql/mutations";

const AddSetting = () => {
  const [session, setSession] = useState();
  const [createSetting, { data, loading, error }] = useMutation(ADD_SETTING);

  const handleAddEvent = () => {
    createSetting({
      variables: { setting: { session } },
    });
  };

  return (
    <div className={styles.add__setting}>
      <div className={styles.add__setting__details__wrapper}>
        <div className={styles.add__setting__detail__input__wrapper}>
          <input
            type="text"
            placeholder="yyyy/yyyy"
            onChange={(e) => setSession(e.target.value)}
            className={styles.add__setting__detail__input}
          />

          <button
            onClick={handleAddEvent}
            className={styles.add__setting__create__button}
          >
            Add
          </button>
          {loading && (
            <h2 className={styles.add__setting__message__load}>
              Creating Session...
            </h2>
          )}

          {data?.createSetting && (
            <h2 className={styles.add__setting__message}>Session Created!</h2>
          )}
          {error && (
            <h2 className={styles.add__setting__message__error}>
              An Error occured, check your inputs and try again
            </h2>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddSetting;
