import styles from "../styles/AddFace.module.css";
import { useRef, useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_FACE } from "../graphql/mutations";

const AddFace = () => {
  const [faceTitle, setFaceTitle] = useState("");
  const [selectedImg, setSelectedImg] = useState("No image selected");
  const [faceImg, setFaceImg] = useState("");
  const [createFace, { data, loading, error }] = useMutation(ADD_FACE);

  function handleFaceUpload(e) {
    const imgFile = e.target.files[0];
    setFaceImg(imgFile);
    setSelectedImg(e.target.files[0].name);
  }

  async function handleAddFace() {
    if (faceImg) {
      const formData = new FormData();
      formData.append("file", faceImg);
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
          createFace({
            variables: { face: { faceTitle, faceImg: data.secure_url } },
          }).then(() => {
            setFaceTitle("");
            setSelectedImg("No Image selected");
            setFaceImg("");
          });
        });
    }
  }

  return (
    <div className={styles.add__face}>
      <div className={styles.add__face__details__wrapper}>
        <div className={styles.add__face__upload__wrapper}>
          <input
            className={styles.add__face__detail__input}
            type="text"
            placeholder={selectedImg}
            readOnly
          />

          <label
            htmlFor="new-face-upload-input"
            className={styles.add__face__icon__container}
          >
            <svg className={styles.add__face__profile__pic__icon}>
              <use xlinkHref="/svg/upload-icon.svg#upload-icon" />
            </svg>
          </label>
        </div>

        <div className={styles.add__face__detail__input__wrapper}>
          <label
            className={styles.add__face__detail__label}
            htmlFor="new-face-title"
          >
            Name
          </label>
          <input
            type="text"
            id="new-face-title"
            onChange={(e) => setFaceTitle(e.target.value)}
            className={styles.add__face__detail__input}
            placeholder="type in here"
            value={faceTitle}
          />

          <input
            id="new-face-upload-input"
            className={styles.add__face__upload__input}
            type="file"
            accept="image/png, image/jpeg"
            onChange={(e) => handleFaceUpload(e)}
          />

          <button
            onClick={handleAddFace}
            className={styles.add__face__create__button}
          >
            Add
          </button>
          {loading && (
            <h2 className={styles.add__face__message__load}>
              Creating Face of TCS...
            </h2>
          )}

          {data?.createFace && (
            <h2 className={styles.add__face__message}>Face of TCS Created!</h2>
          )}
          {error && (
            <h2 className={styles.add__face__message__error}>
              An Error occured, check your inputs and try again
            </h2>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddFace;
