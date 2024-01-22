import styles from "../styles/UserList.module.css";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useContext, useRef } from "react";
import Pagination from "./Pagination";
import { useMutation } from "@apollo/client";
import { DELETE_USER } from "../graphql/mutations";
import DeleteConfirm from "./DeleteConfirm";
import { DeleteConfirmContext } from "../store/store";

const UserList = ({ userlist }) => {
  const [users, setUsers] = useState(userlist);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);
  const [searchText, setSearchText] = useState("");
  const deleteComponentIdRef = useRef();
  const [deleteUser, { data, loading, error }] = useMutation(DELETE_USER);

  const { openDelete, setOpenDelete } = useContext(DeleteConfirmContext);

  const indexedOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexedOfLastRecord - recordsPerPage;

  // records to be displayed on the current page
  const currentRecords = users?.slice(indexOfFirstRecord, indexedOfLastRecord);

  // calculating the number of pages
  const nPages = Math.ceil(users?.length / recordsPerPage);

  const checkDelete = (regno) => {
    try {
      deleteUser({
        variables: { regno },
      }).then(
        () => setUsers(users?.filter((record) => record.regno !== regno)),
        setOpenDelete(false)
      );
    } catch (err) {
      throw new Error(err);
    }
  };

  const handleDelete = (regno) => {
    setOpenDelete(true);
    deleteComponentIdRef.current = regno;
  };

  const handleChange = (e) => {
    setSearchText(e.target.value);
  };

  useEffect(() => {
    if (searchText === "") {
      setUsers(userlist);
    } else {
      const filteredItems = userlist?.filter((item) => {
        searchText.toLowerCase();
        return item.regno.includes(searchText);
      });
      setUsers(filteredItems);
    }
  }, [searchText, userlist]);

  const displayData = (main, pag) => {
    if (searchText.length > 0) {
      return main;
    } else {
      return pag;
    }
  };

  return (
    <div className={styles.userlist}>
      {openDelete ? (
        <DeleteConfirm
          id={deleteComponentIdRef.current}
          component={"user"}
          deleteFunc={checkDelete}
        />
      ) : null}
      <div className={styles.userlist__create__button__container}>
        <Link href={`/admin/users/spoolbyclass`}>
          <button className={styles.userlist__create__button}>
            Spool by class
          </button>
        </Link>

        <Link href={`/admin/users/importusers`}>
          <button className={styles.userlist__create__button}>
            import users
          </button>
        </Link>

        <Link href={`/admin/users/createuser`}>
          <button className={styles.userlist__create__button}>
            create user
          </button>
        </Link>
      </div>

      <div className={styles.search__wrapper}>
        <div className={styles.search__container}>
          <input
            className={styles.search__input}
            type="text"
            placeholder="search user with reg no"
            onChange={handleChange}
          />
          <div className={styles.admin__search__icon__wrapper}>
            <svg className={styles.admin__search__icon}>
              <use
                xlinkHref="/svg/search-icon.svg#search-icon"
                aria-hidden="true"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className={styles.admin__userlist__wrapper}>
        <table className={styles.admin__userlist}>
          <thead>
            <tr>
              <th className={styles.userlist__header}>s/n</th>
              <th className={styles.userlist__header}>reg no</th>
              <th className={styles.userlist__header}>name</th>
              <th className={styles.userlist__header}>email</th>
              <th className={styles.userlist__header}>role</th>
              <th className={styles.userlist__header}>actions</th>
            </tr>
          </thead>
          <tbody>
            {displayData(users, currentRecords)?.map((user, index) => (
              <tr key={index} className={styles.userlist__row}>
                <td className={styles.admin__userlist__col}>{index + 1}</td>
                <td className={styles.admin__userlist__col}>{user.regno}</td>
                <td className={styles.admin__userlist__col}>
                  <div className={styles.admin__userlist__name}>
                    <Image
                      src={
                        user.profileImg
                          ? user?.profileImg
                          : "/img/placeholder.png"
                      }
                      alt=""
                      className={styles.userList__profileImg}
                      width="30"
                      height="30"
                    />{" "}
                    <p>{user.name}</p>
                  </div>
                </td>
                <td className={styles.admin__userlist__col}>{user.email}</td>
                <td className={styles.admin__userlist__col}>{user.role}</td>
                <td className={styles.admin__userlist__col}>
                  <div className={styles.admin__userlist__actions}>
                    <Link
                      href={`/admin/users/${user.regno.replace(/\//g, "-")}`}
                    >
                      <svg className={styles.admin__edit__icon}>
                        <use
                          xlinkHref="/svg/edit-icon.svg#edit-icon"
                          aria-hidden="true"
                        />
                      </svg>
                    </Link>
                    <svg
                      onClick={(e) => handleDelete(user.regno)}
                      className={styles.admin__delete__icon}
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
      <div className={styles.pagination__wrapper}>
        <Pagination
          nPages={nPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default UserList;
