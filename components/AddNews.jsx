import styles from "../styles/AddNews.module.css";
import { useRef, useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_NEWS } from "../graphql/mutations";

const AddNews = () => {
  const [newsTitle, setNewsTitle] = useState("");
  const [newsImg, setNewsImg] = useState("");
  const [selectedImg, setSelectedImg] = useState("No Image selected");
  const [createNews, { data, loading, error }] = useMutation(ADD_NEWS);

  const handleNewsUpload = (e) => {
    const imgFile = e.target.files[0];
    setNewsImg(imgFile);
    setSelectedImg(e.target.files[0].name);
  };

  async function handleAddNews() {
    if (newsImg) {
      const formData = new FormData();
      formData.append("file", newsImg);
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
          createNews({
            variables: { news: { newsTitle, newsImg: data.secure_url } },
          }).then(() => {
            setNewsTitle("");
            setSelectedImg("No image selected");
          });
        });
    }
  }

  return (
    <div className={styles.add__news}>
      <div className={styles.add__news__details__wrapper}>
        <div className={styles.add__news__upload__wrapper}>
          <input
            className={styles.add__news__detail__input}
            type="text"
            placeholder={selectedImg}
            readOnly
          />

          <label
            htmlFor="new-user-upload-input"
            className={styles.add__news__icon__container}
          >
            <svg className={styles.add__news__profile__pic__icon}>
              <use xlinkHref="/svg/upload-icon.svg#upload-icon" />
            </svg>
          </label>
        </div>

        <div className={styles.add__news__detail__input__wrapper}>
          <label
            className={styles.add__news__detail__label}
            htmlFor="new-user-textarea"
          >
            detail of news
          </label>
          <textarea
            id="new-user-textarea"
            onChange={(e) => setNewsTitle(e.target.value)}
            className={styles.add__news__detail__input}
            value={newsTitle}
          />

          <input
            id="new-user-upload-input"
            className={styles.add__news__upload__input}
            type="file"
            onChange={handleNewsUpload}
          />

          <button
            onClick={handleAddNews}
            className={styles.add__news__create__button}
          >
            Add
          </button>

          {loading && (
            <h2 className={styles.add__news__message__load}>
              Creating News...
            </h2>
          )}

          {data?.createNews && (
            <h2 className={styles.add__news__message}>News Created!</h2>
          )}
          {error && (
            <h2 className={styles.add__news__message__error}>
              An Error occured, check your inputs and try again
            </h2>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddNews;
