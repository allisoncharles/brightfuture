import styles from "../styles/EditUser.module.css";
import Image from "next/image";
import { useState, useRef } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_USER } from "../graphql/mutations";
import classList from "../utils/class-list";

const EditUser = ({ userData }) => {
  const [name, setName] = useState(userData?.name);
  const [email, setEmail] = useState(userData?.email);
  const [yearValue, setYearValue] = useState(userData?.class);
  const [armValue, setArmValue] = useState(userData?.arm);
  const [role, setRole] = useState(userData?.role);
  const [profileImg, setProfileImg] = useState(userData?.profileImg);
  const [selectedImg, setSelectedImg] = useState("No item selected");
  const [displayedImg, setDisplayedImg] = useState(userData?.profileImg);
  const [updateImg, setUpdateImg] = useState(false);

  const [updateUser, { loading, error, data }] = useMutation(UPDATE_USER);

  const uploadImage = (e) => {
    const imgFile = e.target.files[0];

    setProfileImg(imgFile);

    setSelectedImg(e.target.files[0].name);
    const fileReader = new FileReader();

    fileReader.onload = function (e) {
      setDisplayedImg(e.target.result);
      setUpdateImg(true);
    };

    fileReader.readAsDataURL(imgFile);
  };

  async function handleUpdate() {
    if (updateImg) {
      const formData = new FormData();
      formData.append("file", profileImg);
      formData.append("upload_preset", "my-uploads");

      let data = await fetch(
        "https://api.cloudinary.com/v1_1/dhvzlv8ji/image/upload",
        {
          method: "POST",
          body: formData,
        }
      )
        .then((r) => r.json())
        .then((data) => {
          updateUser({
            variables: {
              regno: userData.regno,
              user: {
                name,
                email,
                class: yearValue,
                arm: armValue,
                role,
                profileImg: data.secure_url,
              },
            },
          });
        });
    } else {
      updateUser({
        variables: {
          regno: userData.regno,
          user: {
            name,
            email,
            class: yearValue,
            arm: armValue,
            role,
          },
        },
      });
    }
  }
  return (
    <div className={styles.edit__user}>
      <div className={styles.edit__user__detail__right}>
        <input
          type="file"
          accept="image/png, image/jpeg"
          id="user-upload-input"
          className={styles.user__upload__input}
          onChange={uploadImage}
        />
        <div className={styles.edit__user__profile__pic__container}>
          <Image
            src={displayedImg ? displayedImg : "/img/placeholder.png"}
            className={styles.edit__user__profile__pic}
            fill
            alt=""
          />
        </div>
        <input
          className={`${styles.edit__user__detail__input} ${styles.center}`}
          type="text"
          placeholder={selectedImg}
          readOnly
        />
        <label
          htmlFor="user-upload-input"
          className={styles.edit__user__icon__container}
        >
          <svg className={styles.edit__user__profile__pic__icon}>
            <use xlinkHref="/svg/upload-icon.svg#upload-icon" />
          </svg>
        </label>
      </div>
      <div className={styles.edit__user__detail__left}>
        <div className={styles.edit__user__detail__input__wrapper}>
          <input
            onChange={(e) => setName(e.target.value)}
            className={styles.edit__user__detail__input}
            type="text"
            placeholder={userData?.name}
            value={name}
          />

          <input
            onChange={(e) => setRegno(e.target.value)}
            className={styles.edit__user__detail__input}
            type="text"
            placeholder={userData?.regno}
          />

          <input
            onChange={(e) => setEmail(e.target.value)}
            className={styles.edit__user__detail__input}
            type="text"
            placeholder={userData?.email ? userData?.email : "email"}
            value={email}
          />

          <select
            onChange={(e) => setYearValue(e.target.value)}
            className={styles.edit__user__detail__input}
            value={yearValue}
          >
            <option value={userData?.class}>{userData?.class}</option>
            {classList.map((classItem) => (
              <option key={classItem} value={classItem}>
                {classItem}
              </option>
            ))}
          </select>

          <select
            onChange={(e) => setArmValue(e.target.value)}
            className={styles.edit__user__detail__input}
            value={armValue}
          >
            <option value={userData?.arm}>{userData?.arm}</option>
            <option value="emerald">emerald</option>
            <option value="diamond">diamond</option>
            <option value="gold">gold</option>
            <option value="silver">silver</option>
          </select>

          <select
            onChange={(e) => setRole(e.target.value)}
            className={styles.edit__user__detail__input}
            value={role}
          >
            <option>{userData?.role}</option>
            <option value="admin">admin</option>
            <option value="user">user</option>
          </select>
        </div>

        <div className={styles.edit__user__btn__container}>
          <button
            onClick={handleUpdate}
            className={styles.edit__user__detail__update__button}
          >
            update
          </button>
        </div>

        {loading && (
          <h2 className={styles.edit__user__message__load}>Updating User...</h2>
        )}
        {data?.updateUser && (
          <h2 className={styles.edit__user__message}>User Updated!</h2>
        )}
        {error && (
          <h2 className={styles.edit__user__message__error}>
            An Error occured, check your inputs and try again
          </h2>
        )}
      </div>
    </div>
  );
};

export default EditUser;
