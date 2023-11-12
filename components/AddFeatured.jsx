import styles from "../styles/AddFeatured.module.css";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_FEATURED } from "../graphql/mutations";

const AddFeatured = () => {
  const [featuredTitle, setFeaturedTitle] = useState("");
  const [featuredText, setFeaturedText] = useState("");
  const [featuredImg, setFeaturedImg] = useState("");
  const [featuredImgFile, setFeaturedImgFile] = useState("No Image selected");
  const [createFeatured, { data, loading, error }] = useMutation(ADD_FEATURED);

  const handleFeaturedUpload = (e) => {
    const imgFile = e.target.files[0];
    setFeaturedImg(imgFile);
    setFeaturedImgFile(e.target.files[0].name);
  };

  async function handleAddFeatured() {
    if (featuredImg) {
      const formData = new FormData();
      formData.append("file", featuredImg);
      formData.append("upload_preset", "my-uploads");

      await fetch("https://api.cloudinary.com/v1_1/dhvzlv8ji/image/upload", {
        method: "POST",
        body: formData,
      })
        .then((r) => r.json())
        .then((data) => {
          createFeatured({
            variables: {
              featured: {
                featuredTitle,
                featuredText,
                featuredImg: data.secure_url,
              },
            },
          }).then(() => {
            setFeaturedTitle("");
            setFeaturedText("");
            setFeaturedImg("");
            setFeaturedImgFile("No Image selected");
          });
        });
    }
  }

  return (
    <div className={styles.add__featured}>
      <div className={styles.add__featured__details__wrapper}>
        <div className={styles.add__featured__upload__wrapper}>
          <input
            className={styles.add__featured__detail__input}
            type="text"
            placeholder={featuredImgFile}
            readOnly
          />

          <label
            htmlFor="new-featured-upload-input"
            className={styles.add__featured__icon__container}
          >
            <svg className={styles.add__featured__profile__pic__icon}>
              <use xlinkHref="/svg/upload-icon.svg#upload-icon" />
            </svg>
          </label>
        </div>

        <div className={styles.add__featured__detail__input__wrapper}>
          <label
            className={styles.add__featured__detail__label}
            htmlFor="new-featured-title"
          >
            Title of featured
          </label>
          <textarea
            id="new-featured-title"
            onChange={(e) => setFeaturedTitle(e.target.value)}
            className={styles.add__featured__detail__input}
            value={featuredTitle}
            autoComplete
            placeholder="type in here"
          />

          <label
            className={styles.add__featured__detail__label}
            htmlFor="new-featured-text"
          >
            detail of featured
          </label>

          <textarea
            id="new-featured-textarea"
            onChange={(e) => setFeaturedText(e.target.value)}
            className={styles.add__featured__detail__input}
            value={featuredText}
            autoComplete
            placeholder="type in here"
          />

          <input
            id="new-featured-upload-input"
            className={styles.add__featured__upload__input}
            type="file"
            accept="image/png, image/jpeg"
            onChange={handleFeaturedUpload}
          />

          <button
            onClick={handleAddFeatured}
            className={styles.add__featured__create__button}
          >
            Add
          </button>
          {loading && (
            <h2 className={styles.add__featured__message__load}>
              Creating Featured...
            </h2>
          )}

          {data?.createFeatured && (
            <h2 className={styles.add__featured__message}>Featured Created!</h2>
          )}
          {error && (
            <h2 className={styles.add__featured__message__error}>
              An Error occured, check your inputs and try again
            </h2>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddFeatured;
