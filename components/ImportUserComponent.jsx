import styles from "../styles/ImportUserComponent.module.css";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { UPLOAD_USERS } from "../graphql/mutations";

const ImportUserComponent = () => {
  const [userCsv, setUserCsv] = useState();
  const [userUploadClicked, setUserUploadClicked] = useState(false);
  const [uploadUsers, { data, loading, error }] = useMutation(UPLOAD_USERS);

  const csvToObjectUser = (str) => {
    const headers = str.trim().split(/\n/g)[0].split(/,/g);

    const userBody = str.trim().split(/\n/g).slice(1);
    let userDetailArr = [];

    userBody.map((users) => {
      const user = users.split(/,/g);
      let usersDetail = {};
      headers.map((header, idx) => {
        usersDetail[header] = idx == 1 ? user[idx] : user[idx].toLowerCase();
      });
      userDetailArr.push(usersDetail);
    });

    uploadUsers({
      variables: {
        users: userDetailArr,
      },
    }).then(() => setUserUploadClicked(true));
  };

  const handleImportUser = () => {
    setUserUploadClicked(false);
    const reader = new FileReader();
    reader.onload = function (event) {
      const text = event.target.result;
      csvToObjectUser(text);
    };

    userCsv ? reader.readAsText(userCsv) : null;
  };

  return (
    <div className={styles.import__user__component}>
      <div className={styles.import__user__component__wrapper}>
        <div className={styles.import__user__component__input__container}>
          <input
            className={styles.import__user__component__input}
            type="text"
            placeholder={userCsv ? userCsv?.name : `No file selected`}
            readOnly
          />
          <label
            className={styles.import__user__component__button}
            htmlFor="add-user-input"
          >
            <svg className={styles.import__user__component__upload__icon}>
              <use xlinkHref="/svg/upload-icon.svg#upload-icon" />
            </svg>
          </label>
          <input
            onChange={(e) => setUserCsv(e.target.files[0])}
            type="file"
            accept=".csv"
            id="add-user-input"
            className={styles.import__user__component__input__file}
          />
        </div>
        <div className={styles.import__user__component__btn__container}>
          <button
            onClick={handleImportUser}
            className={styles.import__user__component__btn}
          >
            Import Users
          </button>
        </div>
        {loading && (
          <h2 className={styles.import__user__component__message__load}>
            Users Uploading...
          </h2>
        )}
        {data?.uploadUsers?.length && (
          <h2 className={styles.import__user__component__message}>
            Users Uploaded!
          </h2>
        )}
        {userUploadClicked && data?.uploadUsers == null && (
          <h2 className={styles.import__user__component__message__error}>
            Users Already Uploaded!
          </h2>
        )}
        {error && (
          <h2 className={styles.import__user__component__message__error}>
            An Error occured, check the file and try again
          </h2>
        )}
      </div>
    </div>
  );
};

export default ImportUserComponent;
