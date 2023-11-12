import styles from "../styles/SettingComponent.module.css";
import Link from "next/link";
import { useEffect, useState, useContext, useRef } from "react";
import { useMutation } from "@apollo/client";
import { DELETE_SETTING } from "../graphql/mutations";
import DeleteConfirm from "./DeleteConfirm";
import { DeleteConfirmContext } from "../store/store";

const SettingComponent = ({ settingRes }) => {
  const [setting, setSetting] = useState();
  const [deleteSetting, { data, error, loading }] = useMutation(DELETE_SETTING);
  const { openDelete, setOpenDelete } = useContext(DeleteConfirmContext);
  const deleteComponentIdRef = useRef();

  useEffect(() => {
    setSetting(settingRes);
  }, [settingRes]);

  const checkDelete = (id) => {
    try {
      deleteSetting({
        variables: { _id: id },
      }).then(
        () =>
          setSetting(setting?.filter((settingItem) => settingItem._id !== id)),
        setOpenDelete(false)
      );
    } catch (err) {
      throw new Error(err);
    }
  };

  const handleSettingDelete = (id) => {
    setOpenDelete(true);
    deleteComponentIdRef.current = id;
  };
  return (
    <div className={styles.settings__component}>
      {openDelete ? (
        <DeleteConfirm
          id={deleteComponentIdRef.current}
          component={"session"}
          deleteFunc={checkDelete}
        />
      ) : null}
      <div className={styles.settings__create__button__container}>
        <Link href={`/admin/setting/createsetting`}>
          <button className={styles.settings__create__button}>
            Add Session
          </button>
        </Link>
      </div>
      <div className={styles.settings__component__wrapper}>
        <div className={styles.settings__component__list__wrapper}>
          <ul className={styles.settings__component__list}>
            {setting?.map((settingItem, index) => (
              <div
                key={index}
                className={styles.settings__component__list__wrapper}
              >
                <li className={styles.settings__component__list__item}>
                  <div className={styles.settings__component__item}>
                    <h2 className={styles.settings__component__title}>
                      {settingItem.session}
                    </h2>
                  </div>
                </li>
                <div
                  onClick={() => handleSettingDelete(settingItem._id)}
                  className={styles.settings__component__icon__container}
                >
                  <svg className={styles.settings__component__delete__icon}>
                    <use
                      xlinkHref="/svg/recycle-bin-icon.svg#recycle-bin-icon"
                      aria-hidden="true"
                    />
                  </svg>
                </div>
              </div>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SettingComponent;
