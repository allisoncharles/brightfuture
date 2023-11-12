import styles from "../styles/SpoolByClassComponent.module.css";
import classList from "../utils/class-list";
import { useState, useEffect, useRef } from "react";

const SpoolByClassComponent = ({ userlist }) => {
  const [filteredUsers, setFilteredUsers] = useState();
  const [classValue, setClassValue] = useState("");
  const [armValue, setArmValue] = useState("emerald");
  const classListRef = useRef();

  const [users, setUsers] = useState(filteredUsers);
  useEffect(() => {
    setFilteredUsers(
      userlist.filter(
        (user) =>
          user.class.toLowerCase() == classValue &&
          user.arm.toLowerCase() == armValue
      )
    );
  }, [classValue, armValue, userlist]);

  useEffect(() => {
    setUsers(filteredUsers);
  }, [filteredUsers]);

  const handleUserPrint = () => {
    window.print();
  };

  return (
    <div>
      <div className={styles.spool__component__wrapper}>
        <div className={styles.spool__component__print__container}>
          <button
            onClick={handleUserPrint}
            className={styles.spool__component__print__btn}
          >
            Print
          </button>
        </div>

        <div className={styles.spool__component__input__container}>
          <select
            onChange={(e) => setClassValue(e.target.value)}
            className={styles.spool__component__select}
          >
            {classList.map((classItem, idx) => (
              <option value={classItem} key={idx}>
                {classItem}
              </option>
            ))}
          </select>

          <select
            onChange={(e) => setArmValue(e.target.value)}
            className={styles.spool__component__select}
          >
            <option value="emerald">emerald</option>
            <option value="diamond">diamond</option>
            <option value="gold">gold</option>
            <option value="silver">silver</option>
          </select>
        </div>

        <div className={styles.spool__component__table__container}>
          <h1
            className={styles.spool__class__indicator}
          >{`${classValue} ${armValue}`}</h1>
          <table className={styles.spool__component__table} id="userListTable">
            <thead>
              <tr>
                <th className={styles.spool__component__table__header}>
                  regno
                </th>
                <th className={styles.spool__component__table__header}>name</th>
                <th className={styles.spool__component__table__header}>
                  passcode
                </th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user, idx) => (
                <tr className={styles.spool__component__table__row} key={idx}>
                  <td
                    className={`${styles["spool__component__table__col"]} + ${styles["spool__component__table__col__name"]}`}
                  >
                    {user.regno}
                  </td>
                  <td className={styles.spool__component__table__col}>
                    {user.name}
                  </td>
                  <td className={styles.spool__component__table__col}>
                    {user.passcode}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SpoolByClassComponent;
