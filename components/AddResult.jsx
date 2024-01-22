import styles from "../styles/AddResult.module.css";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { UPLOAD_RESULT } from "../graphql/mutations";

const AddResult = () => {
  const [resultCsv, setResultCsv] = useState();
  const [clickedUpload, setClickedUpload] = useState(false);
  const [third, setThird] = useState();
  const [uploadResult, { data, loading, error }] = useMutation(UPLOAD_RESULT);

  const csvToObject = (str, delimiter = ",") => {
    const calSubjLen = (val) => {
      if (val) {
        return -8;
      } else {
        return -7;
      }
    };

    const headerRow = str
      .split(/\n/)[1]
      .split(delimiter)
      .filter((arr) => arr.trim() != "");

    const restHeaders1 = headerRow.slice(0, 9);
    const restHeaders2 = headerRow.slice(calSubjLen(third));
    const restHeaders = restHeaders1.concat(restHeaders2);

    const body = str.trim().split(/\n/).slice(2);

    const resultBodyContainer = [];
    body.map((bd) => {
      const bodyRow = bd.match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g);
      const rowLeft = bodyRow.slice(0, 9).map((item) => item.toLowerCase());
      const rowRight = bodyRow.slice(calSubjLen(third));
      const fullBody = rowLeft.concat(rowRight);
      const result = {};
      restHeaders.forEach((header, idx) => {
        result[header] = fullBody[idx];
      });
      resultBodyContainer.push(result);
    });

    const scoreTitle = headerRow.slice(9, calSubjLen(third));
    const subjectTitle = str
      .split(/\n/)[0]
      .split(delimiter)
      .filter((arr) => arr.trim() != "")
      .map((arr) => arr.toLowerCase());

    const all = str.trim().split(/\n/).slice(2);
    const resultScoreContainer = [];
    all.map((res) => {
      const chunkSize = 3;
      const chunk = [];
      const eachStdCompiledScore = [];
      const eachStdScoreAsStr = [];
      const subjectObj = {};
      const resValues = res.match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g);
      const eachStdScores = resValues.slice(9, calSubjLen(third));
      scoreTitle.map((title, idx) => {
        eachStdScoreAsStr.push(`${title}: ${eachStdScores[idx]}`);
      });

      for (let i = 0; i < eachStdScoreAsStr.length; i += chunkSize) {
        chunk.push(eachStdScoreAsStr.slice(i, i + chunkSize));
      }

      chunk.map((eachSub) => {
        const eachSubRes = eachSub.map((field) => {
          return field.split(/:/);
        });

        const eachSubjectScores = {};
        eachSubRes.forEach((value) => {
          eachSubjectScores[value[0]] = value[1];
        });
        eachStdCompiledScore.push(eachSubjectScores);
      });

      subjectTitle.map((subject, idx) => {
        subjectObj[subject] = eachStdCompiledScore[idx];
      });
      resultScoreContainer.push(subjectObj);
    });

    resultBodyContainer.map((item) => {
      delete item["name"];
    });

    resultBodyContainer.map((item, idx) => {
      item["subjects"] = resultScoreContainer[idx];
    });

    uploadResult({
      variables: { result: resultBodyContainer },
    }).then(() => setClickedUpload(true));
  };

  const handleImportResult = () => {
    setClickedUpload(false);
    const reader = new FileReader();
    reader.onload = function (event) {
      const text = event.target.result;
      csvToObject(text);
    };

    resultCsv ? reader.readAsText(resultCsv) : null;
  };

  return (
    <div className={styles.add__result}>
      <div className={styles.add__result__wrapper}>
        <div className={styles.add__result__input__wrapper}>
          <input
            className={styles.add__result__input}
            type="text"
            placeholder={resultCsv ? resultCsv?.name : `No file selected`}
            readOnly
          />
          <label
            className={styles.add__result__button}
            htmlFor="add-result-input"
          >
            <svg className={styles.add__result__upload__icon}>
              <use xlinkHref="/svg/upload-icon.svg#upload-icon" />
            </svg>
          </label>
          <input
            onChange={(e) => setResultCsv(e.target.files[0])}
            type="file"
            accept=".csv"
            id="add-result-input"
            className={styles.add__result__input__file}
          />
        </div>
        <div className={styles.add__result__submit__wrapper}>
          <div className={styles.add__result__decision__wrapper}>
            <label
              htmlFor="third_select"
              className={styles.add__result__radio__text}
            >
              Third Term?
            </label>
            <input
              id="third_select"
              className={styles.add__result__radio}
              type="checkbox"
              onChange={(e) => setThird(e.target.checked)}
            />
          </div>
          <button
            onClick={handleImportResult}
            className={styles.add__result__upload__button}
          >
            Upload Result
          </button>
        </div>
        {loading && (
          <h2 className={styles.add__result__message__load}>
            Result Uploading...
          </h2>
        )}
        {data?.uploadResult?.length && (
          <h2 className={styles.add__result__message}>Result Uploaded!</h2>
        )}
        {clickedUpload && data?.uploadResult == null && (
          <h2 className={styles.add__result__message__error}>
            Result Already Uploaded!
          </h2>
        )}
        {error && (
          <h2 className={styles.add__result__message__error}>
            An Error occured, check the file and try again
          </h2>
        )}
      </div>
    </div>
  );
};

export default AddResult;
