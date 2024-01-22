import styles from "../styles/Login.module.css";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../graphql/mutations";
import { useState, useContext, useRef } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "../store/store";

const Login = () => {
  const [regno, setRegno] = useState("");
  const [passcode, setPasscode] = useState("");
  const { setToken } = useContext(AuthContext);
  const router = useRouter();
  const regnoRef = useRef(null);
  const passcodeRef = useRef(null);
  const formRef = useRef(null);
  const testPasscode = process.env.NEXT_PUBLIC_TEST_LOGIN_PASSCODE
  const testReg = process.env.NEXT_PUBLIC_TEST_LOGIN_REG

  const [loginUser, { data, loading, error }] = useMutation(LOGIN, {
    onCompleted({ loginUser }) {
      if (loginUser) {
        setToken(loginUser.access_token);
        router.replace("/admin/users");
      }

      if (error) {
        return err;
      }
    },
  });

  function handleTestData(e) {
    e.preventDefault();
    setRegno("std/reg/0000/0000");
    setPasscode("2042060i");
    regnoRef.current.placeholder = "std/reg/0000/0000";
    passcodeRef.current.placeholder = "2042060i";

    regnoRef.current.setAttribute("testdata", true);
    passcodeRef.current.setAttribute("testdata", true);
  }

  const handleLogin = (event) => {
    event.preventDefault();
    try {
      loginUser({
        variables: { user: { regno: regno.toLowerCase(), passcode } },
      });
    } catch (err) {
      return err;
    }
  };

  return (
    <div className={styles.login}>
      <form
        onSubmit={handleLogin}
        className={styles.login__wrapper}
        ref={formRef}
      >
        <div className={styles.login__header}>
          <svg className={styles.login__header__icon} width="30" height="24">
            <use
              xlinkHref="/svg/login-icon.svg#login-icon"
              aria-hidden="true"
            />
          </svg>
          <h2 className={styles.login__text}>Login</h2>
        </div>
        <div className={styles.login__input__container}>
          <svg className={styles.login__input__icon} width="30" height="24">
            <use
              xlinkHref="/svg/male-avatar-icon.svg#avatar-icon"
              aria-hidden="true"
            />
          </svg>
          <input
            ref={regnoRef}
            className={styles.login__input}
            type="text"
            id="email"
            placeholder="Enter Username"
            onChange={(e) => setRegno(e.target.value)}
          />
        </div>
        <div className={styles.login__input__container}>
          <svg className={styles.login__input__icon} width="30" height="24">
            <use xlinkHref="/svg/lock-icon.svg#lock-icon" aria-hidden="true" />
          </svg>
          <input
            ref={passcodeRef}
            className={styles.login__input}
            type="text"
            id="password"
            placeholder="Enter Passcode"
            onChange={(e) => setPasscode(e.target.value)}
          />
        </div>
        <div className={styles.btn__wrapper}>
          <button
            onClick={handleTestData}
            className={styles.login__submit__button}
          >
            Use Test Data
          </button>

          <button className={styles.login__submit__button} type="submit">
            Sign In
          </button>
        </div>
      </form>
      {loading && (
        <h2 className={styles.login__message__load}>Logging In...</h2>
      )}

      {data?.createFace && (
        <h2 className={styles.login__message}>Logged In!</h2>
      )}
      {error && (
        <h2 className={styles.login__message__error}>
          Invalid Username and Password
        </h2>
      )}
    </div>
  );
};

export default Login;
