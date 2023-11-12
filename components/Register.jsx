import styles from "../styles/Register.module.css";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../graphql/mutations";

const Register = ({ setOpen }) => {
  const [createUser] = useMutation(ADD_USER);
  const [error, setError] = useState(false);

  const [name, setName] = useState("");
  const [regno, setRegno] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // const handleLog = () => {
  //   setOpen(false);
  // };

  const handleRegister = () => {
    if (password !== confirmPassword) {
      setError(true);
      return;
    } else {
      setError(false);
      createUser({
        variables: { user: { name, regno, email, password } },
      }).then(() => setOpen(false));
    }
  };

  return (
    <div className={styles.register}>
      <div className={styles.register__wrapper}>
        <div className={styles.register__header}>
          <svg className={styles.register__header__icon} width="30" height="24">
            <use
              xlinkHref="/svg/register-icon.svg#register-icon"
              aria-hidden="true"
            />
          </svg>
          <h2 className={styles.register__text}>register</h2>
        </div>
        <div className={styles.register__input__container}>
          <svg className={styles.input__icon} width="30" height="24">
            <use
              xlinkHref="/svg/male-avatar-icon.svg#avatar-icon"
              aria-hidden="true"
            />
          </svg>
          <input
            className={styles.register__input}
            type="text"
            id="last-name"
            placeholder="Last Name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className={styles.register__input__container}>
          <svg className={styles.input__icon} width="30" height="24">
            <use
              xlinkHref="/svg/male-avatar-icon.svg#avatar-icon"
              aria-hidden="true"
            />
          </svg>
          <input
            className={styles.register__input}
            type="text"
            id="student-reg"
            placeholder="Student Reg. No."
            onChange={(e) => setRegno(e.target.value)}
          />
        </div>
        <div className={styles.register__input__container}>
          <svg className={styles.input__icon} width="30" height="24">
            <use
              xlinkHref="/svg/male-avatar-icon.svg#avatar-icon"
              aria-hidden="true"
            />
          </svg>
          <input
            className={styles.register__input}
            type="email"
            id="reg-email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div
          className={
            error
              ? styles["register__error__input"]
              : styles["register__input__container"]
          }
        >
          <svg className={styles.input__icon} width="30" height="24">
            <use xlinkHref="/svg/lock-icon.svg#lock-icon" aria-hidden="true" />
          </svg>
          <input
            className={styles.register__input}
            type="password"
            id="reg-password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div
          className={
            error
              ? styles["register__error__input"]
              : styles["register__input__container"]
          }
        >
          <svg className={styles.input__icon} width="30" height="24">
            <use xlinkHref="/svg/lock-icon.svg#lock-icon" aria-hidden="true" />
          </svg>
          <input
            className={styles.register__input}
            type="password"
            id="reg-confirm-password"
            placeholder="Confirm Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button
          onClick={handleRegister}
          className={styles.register__submit__button}
        >
          Sign In
        </button>
        <span className={styles.reg__more__info}>
          Have an account? <b onClick={() => setOpen(false)}>Sign In</b>
        </span>
        {error && (
          <span className={styles.register__error}>Passwords Mismatch!</span>
        )}
      </div>
    </div>
  );
};

export default Register;
