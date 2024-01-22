import styles from "../styles/NewUser.module.css";
import { useState, useRef } from "react";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../graphql/mutations";
import classList from "../utils/class-list";
import Image from "next/image";

const NewUser = () => {
  const [fullname, setFullName] = useState("");
  const [regno, setRegno] = useState("");
  const [email, setEmail] = useState("");
  const [arm, setArm] = useState("diamond");
  const [year, setYear] = useState("");
  const [role, setRole] = useState("user");
  const [chosenImg, setChosenImg] = useState("");
  const [selectedImg, setSelectedImg] = useState("No Image Selected");
  const [profileImgFile, setProfileImgFile] = useState(undefined);
  const [createUser, { loading, data, error }] = useMutation(ADD_USER);

  const handleUpload = (e) => {
    const imgFile = e.target.files[0];
    setSelectedImg(e.target.files[0].name);
    setProfileImgFile(imgFile);

    const fileReader = new FileReader();

    fileReader.onload = function (e) {
      setChosenImg(e.target.result);
    };

    imgFile && fileReader.readAsDataURL(imgFile);
  };

  async function handleCreateUser() {
    if (profileImgFile) {
      const formData = new FormData();
      formData.append("file", profileImgFile);
      formData.append("upload_preset", "my-uploads");

      let data = await fetch(
        "https://api.cloudinary.com/v1_1/dhvzlv8ji/image/upload",
        {
          method: "POST",
          body: formData,
        }
      )
        .then((r) => {
          return r.json();
        })
        .then((data) => {
          createUser({
            variables: {
              user: {
                name: fullname,
                regno,
                email,
                arm,
                class: year,
                role,
                profileImg: data.secure_url,
              },
            },
          }).then(() => {
            setFullName("");
            setRegno("");
            setEmail("");
            setArm("diamond");
            setYear("");
            setRole("user");
            setSelectedImg("No Image Selected");
            setChosenImg("");
            setProfileImgFile(undefined);
          });
        });
    } else {
      createUser({
        variables: {
          user: {
            name: fullname,
            regno,
            email,
            arm,
            class: year,
            role,
            profileImg: "",
          },
        },
      }).then(() => {
        setFullName("");
        setRegno("");
        setEmail("");
        setArm("diamond");
        setYear("");
        setRole("user");
      });
    }
  }

  return (
    <div className={styles.new__user}>
      <div className={styles.new__user__details__wrapper}>
        <div className={styles.new__user__upload__wrapper}>
          <input
            className={styles.new__user__upload__input}
            type="file"
            accept="image/png, image/jpeg, image/webp"
            id="user-upload-input"
            onChange={handleUpload}
          />
          <div className={styles.new__user__profile__pic__container}>
            <Image
              src={chosenImg ? chosenImg : "/img/placeholder.png"}
              className={styles.new__user__profile__pic}
              fill
              alt=""
            />
          </div>
          <input
            className={styles.new__user__detail__input}
            type="text"
            placeholder={selectedImg}
            readOnly
          />
          <label htmlFor="user-upload-input">
            <svg className={styles.new__user__profile__pic__icon}>
              <use xlinkHref="/svg/upload-icon.svg#upload-icon" />
            </svg>
          </label>
        </div>
        <div className={styles.new__user__detail__input__wrapper}>
          <input
            className={styles.new__user__detail__input}
            type="text"
            value={fullname}
            placeholder="fullname"
            onChange={(e) => setFullName(e.target.value)}
          />
          <input
            className={styles.new__user__detail__input}
            type="text"
            placeholder="regno"
            value={regno}
            onChange={(e) => setRegno(e.target.value)}
          />
          <input
            className={styles.new__user__detail__input}
            type="text"
            value={email}
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <select
            className={styles.new__user__detail__input}
            onChange={(e) => setYear(e.target.value)}
            value={year}
          >
            <option>select class</option>
            {classList.map((year, idx) => (
              <option key={idx} value={year}>
                {year}
              </option>
            ))}
          </select>

          <select
            className={styles.new__user__detail__input}
            onChange={(e) => setArm(e.target.value)}
            value={arm}
          >
            <option value="diamond">diamond</option>
            <option value="emerald">emerald</option>
            <option value="gold">gold</option>
            <option value="silver">silver</option>
          </select>

          <select
            className={styles.new__user__detail__input}
            onChange={(e) => setRole(e.target.value)}
            value={role}
          >
            <option value="user">user</option>
            <option value="admin">admin</option>
          </select>

          <button
            className={styles.new__user__create__button}
            onClick={handleCreateUser}
          >
            create
          </button>

          {loading && (
            <h2 className={styles.add__user__message__load}>
              Creating User...
            </h2>
          )}

          {data?.createUser && (
            <h2 className={styles.add__user__message}>User Created!</h2>
          )}

          {error && (
            <h2 className={styles.add__user__message__error}>
              An Error occured, check your inputs and try again
            </h2>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewUser;
