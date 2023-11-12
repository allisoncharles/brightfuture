import styles from "../styles/AddGallery.module.css";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_GALLERY } from "../graphql/mutations";

const AddGallery = () => {
  const [galleryTitle, setGalleryTitle] = useState("");
  const [galleryImg, setGalleryImg] = useState("");
  const [selectedImg, setSelectedImg] = useState("No Image selected");
  const [createGallery, { data, loading, error }] = useMutation(ADD_GALLERY);

  const handleGalleryUpload = (e) => {
    const imgFile = e.target.files[0];
    setGalleryImg(imgFile);
    setSelectedImg(e.target.files[0].name);
  };

  async function handleAddGallery() {
    if (galleryImg) {
      const formData = new FormData();
      formData.append("file", galleryImg);
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
          createGallery({
            variables: {
              gallery: { galleryTitle, galleryImg: data.secure_url },
            },
          }).then(() => {
            setGalleryTitle("");
            setGalleryImg("");
            setSelectedImg("No Image selected");
          });
        });
    }
  }

  return (
    <div className={styles.add__gallery}>
      <div className={styles.add__gallery__details__wrapper}>
        <div className={styles.add__gallery__upload__wrapper}>
          <input
            className={styles.add__gallery__detail__input}
            type="text"
            placeholder={selectedImg}
            readOnly
          />

          <label
            htmlFor="new-gallery-upload-input"
            className={styles.add__gallery__icon__container}
          >
            <svg className={styles.add__gallery__profile__pic__icon}>
              <use xlinkHref="/svg/upload-icon.svg#upload-icon" />
            </svg>
          </label>
        </div>

        <div className={styles.add__gallery__detail__input__wrapper}>
          <label
            className={styles.add__gallery__detail__label}
            htmlFor="new-user-textarea"
          >
            detail of gallery
          </label>
          <textarea
            id="new-user-textarea"
            onChange={(e) => setGalleryTitle(e.target.value)}
            className={styles.add__gallery__detail__input}
            value={galleryTitle}
          />

          <input
            id="new-gallery-upload-input"
            className={styles.add__gallery__upload__input}
            type="file"
            accept="image/png, image/jpeg"
            onChange={handleGalleryUpload}
          />

          <button
            onClick={handleAddGallery}
            className={styles.add__gallery__create__button}
          >
            Add
          </button>
          {loading && (
            <h2 className={styles.add__gallery__message__load}>
              Creating Image...
            </h2>
          )}

          {data?.createGallery && (
            <h2 className={styles.add__gallery__message}>Image Created!</h2>
          )}
          {error && (
            <h2 className={styles.add__gallery__message__error}>
              An Error occured, check your inputs and try again
            </h2>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddGallery;
