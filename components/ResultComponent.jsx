import styles from "../styles/ResultComponent.module.css";
import Link from "next/link";
import { Fragment, useEffect, useState, useContext, useRef } from "react";
import { SettingContext } from "../store/store";
import Pagination from "./Pagination";
import { useMutation } from "@apollo/client";
import { DELETE_RESULT } from "../graphql/mutations";
import DeleteConfirm from "./DeleteConfirm";
import { DeleteConfirmContext } from "../store/store";
import classList from "../utils/class-list";

const ResultComponent = ({ resultRes }) => {
  let resultNonNull;
  if (resultRes) {
    resultNonNull = JSON.parse(JSON.stringify(resultRes));
    resultNonNull.map((result) => {
      for (const [key, value] of Object.entries(result.subjects)) {
        if (value["ca"] === null) delete result.subjects[key];
        if (key === "__typename") delete result.subjects[key];
        for (const [title, titleValue] of Object.entries(value)) {
          if (value[title] === "SubjectType") delete value[title];
        }
      }
    });
  }
  const { sessions } = useContext(SettingContext);

  const reversedSessions = sessions?.map((sess) => sess.session).reverse();

  const displayedSession = reversedSessions ? reversedSessions[0] : "";

  const [classValue, setClassValue] = useState("year 7");
  const [armValue, setArmValue] = useState("diamond");
  const [termValue, setTermValue] = useState("first");
  const [sessionValue, setSessionValue] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);
  const [searchText, setSearchText] = useState("");
  const deleteComponentIdRef = useRef();
  const deleteComponentArgRef = useRef();
  const { openDelete, setOpenDelete } = useContext(DeleteConfirmContext);
  const [filteredResultRes, setFilteredResultRes] = useState();

  const [results, setResults] = useState(filteredResultRes);

  useEffect(() => {
    if (sessionValue == undefined) {
      setSessionValue(displayedSession);
    }
  }, [sessions, sessionValue, displayedSession]);

  useEffect(() => {
    setFilteredResultRes(
      resultNonNull.filter(
        (result) =>
          result.class.toLowerCase() == classValue &&
          result.arm.toLowerCase() == armValue &&
          result.term.toLowerCase() == termValue &&
          result.session == sessionValue
      )
    );
  }, [classValue, armValue, termValue, sessionValue]);

  useEffect(() => {
    setResults(filteredResultRes);
  }, [filteredResultRes]);

  const [deleteResult, { data, loading, error }] = useMutation(DELETE_RESULT);

  const indexedOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexedOfLastRecord - recordsPerPage;

  // records to be displayed on the current page
  const currentRecords = results?.slice(
    indexOfFirstRecord,
    indexedOfLastRecord
  );

  // calculating the number of pages
  const nPages = Math.ceil(results?.length / recordsPerPage);

  const checkDelete = (regno, term, session) => {
    try {
      deleteResult({
        variables: { regno, term, session },
      }).then(
        () => setResults(results?.filter((record) => record.regno !== regno)),
        setOpenDelete(false)
      );
    } catch (err) {
      throw new Error(err);
    }
  };

  let resultSubjectsTitle = [];
  if (results) {
    const resultResp = results.length > 1 ? results[0].subjects : null;
    if (resultResp) {
      for (const [key, value] of Object.entries(resultResp)) {
        if (key !== "__typename") resultSubjectsTitle.push(key);
      }
    }
  }

  const handleDelete = (regno, termValue, sessionValue) => {
    setOpenDelete(true);
    deleteComponentIdRef.current = regno;
    deleteComponentArgRef.current = { termValue, sessionValue };
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  useEffect(() => {
    if (searchText === "") {
      setResults(filteredResultRes);
    } else {
      const filteredItems = filteredResultRes?.filter((item) => {
        searchText.toLowerCase();
        return item.regno.includes(searchText);
      });
      setResults(filteredItems);
    }
  }, [searchText, filteredResultRes]);

  const displayData = (main, pag) => {
    if (searchText.length > 0) {
      return main;
    } else {
      return pag;
    }
  };

  return (
    <div className={styles.result__component}>
      {openDelete ? (
        <DeleteConfirm
          id={deleteComponentIdRef.current}
          args={deleteComponentArgRef.current}
          component={"result"}
          deleteFunc={checkDelete}
        />
      ) : null}
      <div className={styles.result__component__create__button__container}>
        <Link href={`/admin/result/createresult`}>
          <button className={styles.result__component__create__button}>
            upload results
          </button>
        </Link>
      </div>
      <div className={styles.result__component__query__wrapper}>
        <div className={styles.result__component__search__container}>
          <input
            className={styles.result__component__search__input}
            type="text"
            placeholder="search result with reg no"
            onChange={handleSearch}
          />
          <div className={styles.result__component__search__icon__wrapper}>
            <svg className={styles.result__component__search__icon}>
              <use
                xlinkHref="/svg/search-icon.svg#search-icon"
                aria-hidden="true"
              />
            </svg>
          </div>
        </div>
        <div className={styles.result__component__query__container}>
          <select
            onChange={(e) => setClassValue(e.target.value)}
            className={styles.result__component__query__item}
            value={classValue}
          >
            {classList.map((classItem, idx) => (
              <option key={idx} value={classItem}>
                {classItem}
              </option>
            ))}
          </select>
          <select
            onChange={(e) => setArmValue(e.target.value)}
            className={styles.result__component__query__item}
            value={armValue}
          >
            <option value="emerald">emerald</option>
            <option value="diamond">diamond</option>
            <option value="gold">gold</option>
            <option value="silver">silver</option>
          </select>
          <select
            onChange={(e) => setTermValue(e.target.value)}
            className={styles.result__component__query__item}
            value={termValue}
          >
            <option value="first">first</option>
            <option value="second">second</option>
            <option value="third">third</option>
          </select>
          <select
            onChange={(e) => setSessionValue(e.target.value)}
            className={styles.result__component__query__item}
          >
            {reversedSessions.map((sess, idx) => (
              <option key={idx} value={sess}>
                {sess}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className={styles.result__component__table__wrapper}>
        <table className={styles.result__component__table}>
          <thead>
            <tr>
              <th className={styles.result__component__header}>s/n</th>
              <th className={styles.result__component__header}>reg no</th>
              <th className={styles.result__component__header}>name</th>
              <th className={styles.result__component__header}>class</th>
              <th className={styles.result__component__header}>arm</th>
              <th className={styles.result__component__header}>term</th>
              <th className={styles.result__component__header}>session</th>
              <th className={styles.result__component__header}>club</th>
              <th className={styles.result__component__header}>dob</th>
              <th className={styles.result__component__header}>sex</th>
              <th className={styles.result__component__header}>open</th>
              <th className={styles.result__component__header}>present</th>
              {resultSubjectsTitle?.map((subject, idx) => (
                <Fragment key={idx}>
                  <th className={styles.result__component__header}>
                    {`${subject} 40`}
                  </th>
                  <th className={styles.result__component__header}>
                    {`${subject} 60`}
                  </th>
                  <th className={styles.result__component__header}>
                    {`${subject} 100`}
                  </th>
                </Fragment>
              ))}
              <th className={styles.result__component__header}>avg</th>
              {termValue == "third" && (
                <th className={styles.result__component__header}>cumm</th>
              )}
              <th className={styles.result__component__header}>teacher</th>
              <th className={styles.result__component__header}>head</th>
              <th className={styles.result__component__header}>actions</th>
            </tr>
          </thead>
          <tbody>
            {displayData(results, currentRecords)?.map((resultItem, index) => (
              <tr key={index} className={styles.result__component__row}>
                <td className={styles.result__component__col}>{index + 1}</td>
                <td className={styles.result__component__col}>
                  {resultItem.regno}
                </td>
                <td className={styles.result__component__col}>
                  <div className={styles.result__component__name}>
                    <p>{resultItem?.user?.name}</p>
                  </div>
                </td>
                <td className={styles.result__component__col}>
                  {resultItem.class}
                </td>
                <td className={styles.result__component__col}>
                  {resultItem.arm}
                </td>
                <td className={styles.result__component__col}>
                  {resultItem.term}
                </td>
                <td className={styles.result__component__col}>
                  {resultItem.session}
                </td>
                <td className={styles.result__component__col}>
                  {resultItem.club}
                </td>
                <td className={styles.result__component__col}>
                  {resultItem.dob}
                </td>
                <td className={styles.result__component__col}>
                  {resultItem.sex}
                </td>
                <td className={styles.result__component__col}>
                  {resultItem.open}
                </td>
                <td className={styles.result__component__col}>
                  {resultItem.present}
                </td>
                {Object.entries(resultItem.subjects).map(
                  ([key, value], index) => (
                    <Fragment key={index}>
                      <td className={styles.result__component__col}>
                        {value["ca"]}
                      </td>
                      <td className={styles.result__component__col}>
                        {value["exam"]}
                      </td>
                      <td className={styles.result__component__col}>
                        {value["total"]}
                      </td>
                    </Fragment>
                  )
                )}
                <td className={styles.result__component__col}>
                  {resultItem.avg}%
                </td>
                {termValue == "third" && (
                  <td className={styles.result__component__col}>
                    {resultItem.cumm}%
                  </td>
                )}
                <td className={styles.result__component__col}>
                  {resultItem.teacher}
                </td>
                <td className={styles.result__component__col}>
                  {resultItem.head}
                </td>

                <td className={styles.result__component__col}>
                  <div className={styles.result__component__actions}>
                    <Link
                      href={`/admin/result/editresult/${resultItem.regno.replace(
                        /\//g,
                        "-"
                      )}/${resultItem.term}/${resultItem.session}`}
                      as={`/admin/result/editresult/${resultItem.regno.replace(
                        /\//g,
                        "-"
                      )}/${resultItem.term}/${resultItem.session}`}
                    >
                      <svg className={styles.result__component__edit__icon}>
                        <use
                          xlinkHref="/svg/edit-icon.svg#edit-icon"
                          aria-hidden="true"
                        />
                      </svg>
                    </Link>
                    <svg
                      onClick={() =>
                        handleDelete(
                          resultItem.regno,
                          resultItem.term,
                          resultItem.session
                        )
                      }
                      className={styles.result__component__delete__icon}
                    >
                      <use
                        xlinkHref="/svg/recycle-bin-icon.svg#recycle-bin-icon"
                        aria-hidden="true"
                      />
                    </svg>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {results && (
        <div className={styles.pagination__wrapper}>
          <Pagination
            nPages={nPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
};

export default ResultComponent;
