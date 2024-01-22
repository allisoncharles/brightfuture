import styles from "../styles/EditResultComponent.module.css";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_RESULT } from "../graphql/mutations";

const EditResult = ({ resultData }) => {
  const [updateResult, { data, error, loading }] = useMutation(UPDATE_RESULT);

  let modResultData = {};
  let subjectData = {};
  if (resultData) {
    modResultData = JSON.parse(JSON.stringify(resultData));
    Object.entries(modResultData).map(([key, value]) => {
      delete modResultData["__typename"];
      Object.entries(modResultData).map(([key1, value1]) => {
        delete modResultData["user"];
        delete modResultData["subjects"];
      });
    });

    subjectData = JSON.parse(JSON.stringify(resultData["subjects"]));

    Object.entries(subjectData).map(([key, value]) => {
      if (value["ca"] == null) delete subjectData[key];
      Object.entries(value).map(([key1, value1]) => {
        if (key1 == "__typename") delete value[key1];
      });
    });
  }

  const [result, setResult] = useState(modResultData);
  const [subject, setSubject] = useState(subjectData);
  const [userInput, setUserInput] = useState();
  const [userSubjectInput, setUserSubjectInput] = useState({});

  const handleUserInput = (e) => {
    setUserInput({
      ...userInput,
      [e.target.name]: e.target.value,
    });
  };

  const handleUserSubjectInput = (e, key) => {
    setUserSubjectInput({
      ...userSubjectInput,
      [key]: { ...userSubjectInput[key], [e.target.name]: e.target.value },
    });
  };

  const handleSubmit = () => {
    if (userInput) {
      Object.entries(userInput).map(([key, value]) => {
        if (value == "") delete userInput[key];
      });
    }

    Object.entries(userSubjectInput).map(([key, value]) => {
      Object.entries(value).map(([key1, value1]) => {
        if (value1 == "") delete value[key1];
      });

      if (Object.keys(value).length === 0) {
        delete userSubjectInput[key];
      }
    });

    let fullResultData = {};
    if (Object.keys(userSubjectInput).length === 0) {
      fullResultData = { ...userInput };
    } else {
      fullResultData = { ...userInput, subjects: { ...userSubjectInput } };
    }

    try {
      updateResult({
        variables: {
          regno: resultData.regno,
          result: fullResultData,
        },
      });
    } catch (err) {
      return err;
    }
  };

  return (
    <div className={styles.edit__std__result}>
      <div className={styles.edit__std__result__wrapper}>
        <div className={styles.edit__std__result__info__left}>
          {Object.entries(result).map(([key, value]) => (
            <div className={styles.edit__std__result__user__info} key={key}>
              <label className={styles.edit__std__result__user__label}>
                {key}
              </label>
              <input
                className={styles.edit__std__result__user__input}
                type="text"
                placeholder={value}
                name={key}
                onChange={(e) => handleUserInput(e)}
              />
            </div>
          ))}
        </div>
        <div className={styles.edit__std__result__info__right}>
          {Object.entries(subject).map(([key1, value1]) => (
            <div
              className={styles.edit__std__result__info}
              key={`${key1} index`}
            >
              <label className={styles.edit__std__result__result__label}>
                {key1}
              </label>
              <div className={styles.edit__std__result__info__input__container}>
                <input
                  className={styles.edit__std__result__info__input}
                  type="text"
                  placeholder={value1["ca"]}
                  name="ca"
                  onChange={(e) => handleUserSubjectInput(e, key1)}
                />
                <input
                  className={styles.edit__std__result__info__input}
                  type="text"
                  placeholder={value1["exam"]}
                  name="exam"
                  onChange={(e) => handleUserSubjectInput(e, key1)}
                />
                <input
                  className={styles.edit__std__result__info__input}
                  type="text"
                  placeholder={value1["total"]}
                  name="total"
                  onChange={(e) => handleUserSubjectInput(e, key1)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.edit__std__result__submit__btn__container}>
        <button
          onClick={handleSubmit}
          className={styles.edit__std__result__btn}
        >
          Update
        </button>
      </div>
      {loading && (
        <h2 className={styles.edit__std__result__message__load}>
          Updating Result...
        </h2>
      )}
      {data?.updateResult && (
        <h2 className={styles.edit__std__result__message}>Result Updated!</h2>
      )}
      {error && (
        <h2 className={styles.edit__std__result__message__error}>
          An Error occured, check your inputs and try again
        </h2>
      )}
    </div>
  );
};

export default EditResult;
