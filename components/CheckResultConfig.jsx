import styles from "../styles/CheckResultConfig.module.css";
import { useContext, useState, useEffect, useRef } from "react";
import {
  SettingContext,
  UserResultContext,
  RequestedTermContext,
} from "../store/store";
import { useLazyQuery } from "@apollo/client";
import { GET_RESULT } from "../graphql/queries";

const CheckResultConfig = () => {
  const [term, setTerm] = useState("");
  const [regno, setRegno] = useState("");
  const [errorTag, setErrorTag] = useState(false);
  const resultCheckerRef = useRef(null);
  const regnoRef = useRef(null);
  const termRef = useRef(null);
  const sessionRef = useRef(null);
  const passcodeRef = useRef(null);
  const [passcode, setPasscode] = useState("");
  const { sessions } = useContext(SettingContext);
  const testReg = process.env.NEXT_PUBLIC_TESTREG;
  const testPasscode = process.env.NEXT_PUBLIC_TESTPASSCODE;
  const testTerm = process.env.NEXT_PUBLIC_TESTTERM;
  const testSession = process.env.NEXT_PUBLIC_TESTSESSION;

  const reversedSessions = sessions?.map((sess) => sess.session).reverse();
  const currentSession = reversedSessions[0];
  const { setUserResult } = useContext(UserResultContext);
  const { setRequestedTerm } = useContext(RequestedTermContext);
  const [session, setSession] = useState(currentSession);

  const [getUserResult, { loading, data }] = useLazyQuery(GET_RESULT, {
    onCompleted: (queryData) => {
      if (
        queryData.getUserResult == null ||
        queryData.getUserResult.length == 0
      ) {
        setErrorTag(true);
      }
      if (queryData?.getUserResult?.length) {
        closeConfigModal();
      }
    },
  });

  useEffect(() => {
    setUserResult(data);
    setRequestedTerm(term);
  });

  useEffect(() => {
    setSession(currentSession);
  }, [currentSession]);

  function closeConfigModal() {
    const navigationRef =
      resultCheckerRef.current.parentNode.parentNode.parentNode.parentNode
        .parentNode;
    navigationRef.removeAttribute("show-auth");
    navigationRef.removeAttribute("has-auth");
    navigationRef.setAttribute("result-view", "");
  }

  const viewResult = (e) => {
    e.preventDefault();
    setErrorTag(false);
    if (term == undefined) return;
    getUserResult({
      variables: {
        result: { regno, session, passcode },
      },
    });
  };

  const handleTestData = (e) => {
    e.preventDefault();
    setSession(testSession);
    setTerm(testTerm);
    setRegno(testReg);
    setPasscode(testPasscode);

    regnoRef.current.placeholder = testReg;
    sessionRef.current.placeholder = testSession;
    termRef.current.placeholder = testTerm;
    passcodeRef.current.placeholder = testPasscode;

    regnoRef.current.setAttribute("testdata", true);
    sessionRef.current.setAttribute("testdata", true);
    passcodeRef.current.setAttribute("testdata", true);
    termRef.current.setAttribute("testdata", true);
  };

  return (
    <div className={styles.check__result__config}>
      <div className={styles.check__result__config__header__wrapper}>
        <svg
          className={styles.check__result__config__icon}
          width="45"
          height="35"
        >
          <use
            xlinkHref="/svg/check-result-icon.svg#check-result-icon"
            aria-hidden="true"
          />
        </svg>
        <h2 className={styles.check__result__header__text}>check result</h2>
      </div>
      <form
        onSubmit={viewResult}
        className={styles.check__result__config__wrapper}
      >
        <div className={styles.check__result__config__item}>
          <input
            className={styles.check__result__config__input}
            onChange={(e) => setRegno(e.target.value.toLowerCase())}
            type="text"
            placeholder="type in reg no"
            value={regno}
            ref={regnoRef}
          />
        </div>

        <div className={styles.check__result__config__item}>
          <select
            className={styles.check__result__config__input}
            name="result-config-session"
            id="result-session"
            onChange={(e) => setSession(e.target.value)}
            value={session}
            ref={sessionRef}
          >
            {reversedSessions.map((sess, index) => (
              <option
                key={index}
                className={styles.check__result__config__option}
              >
                {sess}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.check__result__config__item}>
          <select
            className={styles.check__result__config__input}
            name="result-config-term"
            id="result-term"
            onChange={(e) => setTerm(e.target.value)}
            value={term}
            ref={termRef}
          >
            <option className={styles.check__result__config__option} value="">
              Select Term
            </option>
            <option
              className={styles.check__result__config__option}
              value="first"
            >
              first
            </option>
            <option
              className={styles.check__result__config__option}
              value="second"
            >
              second
            </option>
            <option
              className={styles.check__result__config__option}
              value="third"
            >
              third
            </option>
          </select>
        </div>
        <div className={styles.check__result__config__item}>
          <input
            className={styles.check__result__config__input}
            onChange={(e) => setPasscode(e.target.value)}
            type="text"
            placeholder="type in passcode"
            value={passcode}
            ref={passcodeRef}
          />
        </div>
        <div className={styles.btn__wrapper}>
          <button
            onClick={handleTestData}
            className={styles.check__result__config__button}
          >
            Use Test Data
          </button>

          <button
            ref={resultCheckerRef}
            onClick={viewResult}
            className={styles.check__result__config__button}
          >
            view result
          </button>
        </div>

        {errorTag && !data && (
          <div className={styles.check__result__config__error}>
            Check your entries and try again
          </div>
        )}
        {errorTag && (
          <div className={styles.check__result__config__error}>
            Check your entries and try again
          </div>
        )}
        {loading && (
          <div className={styles.check__result__config__loading}>
            Checking Result...
          </div>
        )}
      </form>
    </div>
  );
};

export default CheckResultConfig;
