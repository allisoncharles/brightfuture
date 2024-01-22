import Image from "next/image";
import styles from "../styles/Result.module.css";
import { useState, useEffect, useContext } from "react";
import { UserResultContext, RequestedTermContext } from "../store/store";
import { subjectTitle } from "../utils/subject-title";

const classes = ["year 7", "year 8", "year 9", "year 10", "year 11", "year 12"];

const Result = () => {
  // For School address specificity.
  const [isSchoolOne, setIsSchoolOne] = useState(false);
  const { userResult, setUserResult } = useContext(UserResultContext);
  const { requestedTerm } = useContext(RequestedTermContext);

  const resultDataRes = userResult?.getUserResult;

  let resultData = resultDataRes?.filter(
    (result) => result["term"] === requestedTerm
  );

  useEffect(() => {
    if (userResult?.getUserResult?.length > 0) {
      if (classes.includes(resultDataRes[0].class)) {
        setIsSchoolOne(true);
      } else {
        setIsSchoolOne(false);
      }
    }
  }, [userResult]);

  const resultOtherTerm = resultDataRes?.filter(
    (result) => result["term"] !== requestedTerm
  );

  let resultRandTerm1;
  let resultRandTerm2;

  if (resultOtherTerm) resultRandTerm1 = resultOtherTerm[0];
  if (resultOtherTerm) resultRandTerm2 = resultOtherTerm[1];

  let randTermTot1 = {};
  let randTermTot2 = {};

  if (resultRandTerm1) {
    for (const [key, value] of Object.entries(resultRandTerm1["subjects"])) {
      randTermTot1[key] = value["total"];
    }
  }

  if (resultRandTerm2) {
    for (const [key, value] of Object.entries(resultRandTerm2["subjects"])) {
      randTermTot2[key] = value["total"];
    }
  }

  if (resultData) resultData = resultData[0];

  const subjectResults = resultData?.subjects;
  let subjects;
  if (subjectResults) {
    subjects = JSON.parse(JSON.stringify(subjectResults));
    for (const [key, value] of Object.entries(subjects)) {
      if (key === "__typename") {
        delete subjects[key];
      }
      if (value["ca"] === null) delete subjects[key];
    }
  }

  const calGrade = (num) => {
    if (num >= 90) {
      return "A1";
    } else if (num >= 80 && num <= 89) {
      return "B2";
    } else if (num >= 70 && num <= 79) {
      return "B3";
    } else if (num >= 65 && num <= 69) {
      return "C4";
    } else if (num >= 59 && num <= 64) {
      return "C5";
    } else if (num >= 50 && num <= 58) {
      return "C6";
    } else if (num >= 45 && num <= 49) {
      return "D7";
    } else if (num >= 40 && num <= 44) {
      return "E8";
    } else if (num <= 39) {
      return "F9";
    } else {
      return "";
    }
  };

  const calRemark = (num) => {
    if (num >= 90) {
      return "Distinction";
    } else if (num >= 80 && num <= 89) {
      return "Very Good";
    } else if (num >= 70 && num <= 79) {
      return "Good";
    } else if (num >= 65 && num <= 69) {
      return "Upper Credit";
    } else if (num >= 59 && num <= 64) {
      return "Credit";
    } else if (num >= 50 && num <= 58) {
      return "Pass";
    } else if (num >= 45 && num <= 49) {
      return "Weak Pass";
    } else if (num >= 40 && num <= 44) {
      return "Poor";
    } else if (num <= 39) {
      return "Fair";
    } else {
      return "";
    }
  };

  if (subjects) {
    if (resultRandTerm1) {
      for (const [key, value] of Object.entries(subjects)) {
        value[`${resultRandTerm1["term"]} term`] = randTermTot1[key];
      }
    }

    if (resultRandTerm2) {
      for (const [key, value] of Object.entries(subjects)) {
        value[`${resultRandTerm2["term"]} term`] = randTermTot2[key];
      }
    }
  }

  const handlePrint = () => {
    window.print();
  };

  const calCumm = (total, firstTotal, secondTotal, thirdTotal) => {
    if (subjects) {
      let avg = 4;
      if (firstTotal === undefined) {
        firstTotal = 0;
        avg--;
      }

      if (secondTotal === undefined) {
        secondTotal = 0;
        avg--;
      }

      if (thirdTotal === undefined) {
        thirdTotal = 0;
        avg--;
      }
      total = parseInt(total);
      firstTotal = parseInt(firstTotal);
      secondTotal = parseInt(secondTotal);
      thirdTotal = parseInt(thirdTotal);
      let cumm = (total + firstTotal + secondTotal + thirdTotal) / avg;

      const resp = cumm.toString().slice(0, 5);

      return resp;
    }
  };

  let title;
  if (subjects) {
    title = Object.entries(subjects)[0][1];
    delete title["__typename"];
  }

  const handleResultClose = (e) => {
    const parentEl = e.target.parentNode.parentNode.parentNode.parentNode;
    if (parentEl.hasAttribute("result-view")) {
      parentEl.removeAttribute("result-view");
      parentEl.removeAttribute("auth-overlay");
      document.body.removeAttribute("no-scroll");
      setUserResult([]);
    }
  };

  return (
    <div className={styles.result}>
      <div className={styles.result__nav}>
        <button className={styles.print__button} onClick={handlePrint}>
          print
        </button>
        <svg
          onClick={(e) => handleResultClose(e)}
          className={styles.result__close__icon}
          width="42"
          height="32"
        >
          <use xlinkHref="/svg/close-icon.svg#close-icon" aria-hidden="true" />
        </svg>
      </div>
      <div className={styles.result__wrapper}>
        <div className={styles.result__header}>
          <div className={styles.result__school__logo__container}>
            <Image
              fill
              className={styles.result__school__logo}
              src="/img/bf.png"
              alt="BrightFuture Schools"
            />
          </div>
          <div className={styles.result__school__address}>
            {isSchoolOne ? (
              <div className="result__school__address__item">
                <h2 className={styles.result__school__Name}>
                  <b>B</b>right<b>F</b>uture <b>S</b>chools
                </h2>
                <h4>103/105, Mauji Rd, Mosadolohun</h4>
                <h4>Moshun round about, Yorkshire.</h4>
              </div>
            ) : (
              <div className="result__school__address__item">
                <h2 className={styles.result__school__Name}>
                  <b>B</b>right<b>F</b>uture <b>B</b>asic <b>S</b>chools
                </h2>
                <h4>32, Dome Tatiana Street,</h4>
                <h4>Bright Bus Stop,</h4>
                <h4>Off Pola Shorike grovy Road,</h4>
                <h4>Yorkshire, London.</h4>
              </div>
            )}

            <div className="result__school__address__item">
              <h4>brightfutureschools@gmail.com, 08034965703</h4>
            </div>
          </div>
          <div className={styles.result__user__image__container}>
            <Image
              fill
              className={styles.result__user__image}
              src={
                resultData?.user?.profileImg
                  ? resultData?.user?.profileImg
                  : "/img/placeholder.png"
              }
              alt="BrightFuture Schools"
            />
          </div>
        </div>

        <div className={styles.result__user__detail}>
          <div className={styles.result__user__item}>
            <div className={styles.result__user__detail__title}>
              <h4>Name:</h4>
              <h4>Reg No.:</h4>
              <h4>Gender:</h4>
              <h4>D.O.B:</h4>
              <h4>Club:</h4>
              <h4>Class:</h4>
            </div>
            <div>
              <h4>{resultData?.user?.name}</h4>
              <h4>{resultData?.regno}</h4>
              <h4>{resultData?.sex}</h4>
              <h4>{resultData?.dob}</h4>
              <h4>{resultData?.club}</h4>
              <h4>{resultData?.class}</h4>
            </div>
          </div>
          <div className={styles.result__user__item}>
            <div className={styles.result__user__detail__title}>
              <h4>Term:</h4>
              <h4>Session:</h4>
              <h4>No. in class:</h4>
              <h4>Times Sch Open:</h4>
              <h4>Times Present:</h4>
            </div>
            <div>
              <h4>{resultData?.term}</h4>
              <h4>{resultData?.session}</h4>
              <h4>{resultData?.noInClass}</h4>
              <h4>{resultData?.open}</h4>
              <h4>{resultData?.present}</h4>
            </div>
          </div>
          <div className={styles.result__user__item}>
            <div className={styles.result__user__detail__title}>
              <h4>Next Term Begins:</h4>

              <h4>Termly Average:</h4>
              {resultData?.cumm ? <h4>Cummulative:</h4> : null}
            </div>
            <div>
              <h4>{resultData?.sch_open}</h4>

              <h4>{resultData?.avg}%</h4>
              {resultData?.cumm ? <h4>{resultData?.cumm}%</h4> : null}
            </div>
          </div>
        </div>

        <div className={styles.result__details}>
          <table className={styles.result__details__table}>
            <thead>
              <tr>
                <th className={styles.result__details__header}>subjects</th>
                {subjects &&
                  Object.entries(title).map(([key, value]) => (
                    <th key={key} className={styles.result__details__header}>
                      {key}
                    </th>
                  ))}
                <th className={styles.result__details__header}>Grade</th>
                <th className={styles.result__details__header}>cumm scores</th>
                <th className={styles.result__details__header}>remark</th>
              </tr>
            </thead>
            <tbody className={styles.result__details__table__body}>
              {subjects &&
                Object.entries(subjects).map(([key, value]) => (
                  <tr
                    className={
                      value["total"] < 44
                        ? styles.result__background__below__score
                        : ""
                    }
                    key={key}
                  >
                    <td className={styles.result__detail__title}>
                      {subjectTitle[key]}
                    </td>
                    <td>{value["ca"]}</td>
                    <td>{value["exam"]}</td>
                    <td>{value["total"]}</td>
                    {value["first term"] && <td>{value["first term"]}</td>}
                    {value["second term"] && <td>{value["second term"]}</td>}
                    {value["third term"] && <td>{value["third term"]}</td>}
                    <td>{calGrade(value["total"])}</td>
                    <td>
                      {calCumm(
                        value["total"],
                        value["first term"],
                        value["second term"],
                        value["third term"]
                      )}
                    </td>
                    <td>{calRemark(value["total"])}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        <div className={styles.result__report__info__wrapper}>
          <div className={styles.result__report__info__item}>
            <h2 className={styles.result__report__info__title}>
              teachers comment:{" "}
            </h2>
            <h2 className={styles.result__report__info__value}>
              {resultData?.teacher}
            </h2>
          </div>
          <div className={styles.result__report__info__item}>
            <h2 className={styles.result__report__info__title__head}>
              head of school&apos;s comment:{" "}
            </h2>
            <h2 className={styles.result__report__info__value}>
              {resultData?.head}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Result;
