import styles from "../styles/DeleteConfirm.module.css";
import { useContext } from "react";
import { DeleteConfirmContext } from "../store/store";

const DeleteConfirm = ({ id, component, deleteFunc, args }) => {
  let term;
  let session;
  if (args) {
    if (Object.keys(args).length) {
      const { termValue, sessionValue } = args;
      term = termValue;
      session = sessionValue;
    }
  }

  const { openDelete, setOpenDelete } = useContext(DeleteConfirmContext);

  const handleDeleteSure = () => {
    if (args && Object.keys(args).length) {
      deleteFunc(id, term, session);
    } else {
      deleteFunc(id);
    }
  };
  return (
    <div className={styles.delete__confirm__wrapper}>
      <div className={styles.delete__confirm}>
        <h3 className={styles.delete__confirm__text}>
          Are you sure you want to{" "}
          <span className={styles.delete__confirm__warning}>delete</span>{" "}
          {component} {id.includes("std") ? `of id ${id}` : ""} ?
        </h3>
        <div className={styles.delete__confirm__button__container}>
          <button
            onClick={handleDeleteSure}
            className={`${styles["delete__confirm__button"]} ${styles["delete__confirm__button__true"]}`}
          >
            Delete
          </button>
          <button
            onClick={() => setOpenDelete(false)}
            className={`${styles["delete__confirm__button"]} ${styles["delete__confirm__button__false"]}`}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirm;
