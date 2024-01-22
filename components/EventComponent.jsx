import styles from "../styles/EventComponent.module.css";
import Link from "next/link";
import { useEffect, useState, useContext, useRef } from "react";
import { useMutation } from "@apollo/client";
import { DELETE_EVENT } from "../graphql/mutations";
import DeleteConfirm from "./DeleteConfirm";
import { DeleteConfirmContext } from "../store/store";

const EventComponent = ({ eventRes }) => {
  const [event, setEvent] = useState();
  const [deleteEvent, { data, error, loading }] = useMutation(DELETE_EVENT);
  const { openDelete, setOpenDelete } = useContext(DeleteConfirmContext);
  const deleteComponentIdRef = useRef();

  useEffect(() => {
    setEvent(eventRes);
  }, [eventRes]);

  const checkDelete = (id) => {
    try {
      deleteEvent({
        variables: { _id: id },
      }).then(
        () => setEvent(event?.filter((eventItem) => eventItem._id !== id)),
        setOpenDelete(false)
      );
    } catch (err) {
      throw new Error(err);
    }
  };

  const handleEventDelete = (id) => {
    setOpenDelete(true);
    deleteComponentIdRef.current = id;
  };
  return (
    <div className={styles.event__component}>
      {openDelete ? (
        <DeleteConfirm
          id={deleteComponentIdRef.current}
          component={"event"}
          deleteFunc={checkDelete}
        />
      ) : null}
      <div className={styles.event__create__button__container}>
        <Link href={`/admin/event/addevent`}>
          <button className={styles.event__create__button}>Add event</button>
        </Link>
      </div>
      <div className={styles.event__component__wrapper}>
        <div className={styles.event__component__list__wrapper}>
          <ul className={styles.event__component__list}>
            {event?.map((eventItem, index) => (
              <div
                key={index}
                className={styles.event__component__item__wrapper}
              >
                <>
                  <li className={styles.event__component__list__item}>
                    <div className={styles.event__component__item}>
                      <div className={styles.event__component__text}>
                        <h2 className={styles.event__component__title}>
                          Title: {eventItem.eventTitle}
                        </h2>
                        <h2 className={styles.event__component__title}>
                          Host: {eventItem.eventHost}
                        </h2>
                        <h2 className={styles.event__component__title}>
                          Date: {eventItem.eventDate}
                        </h2>
                      </div>
                    </div>
                  </li>
                  <div
                    onClick={() => handleEventDelete(eventItem._id)}
                    className={styles.event__component__icon__container}
                  >
                    <svg className={styles.event__component__delete__icon}>
                      <use
                        xlinkHref="/svg/recycle-bin-icon.svg#recycle-bin-icon"
                        aria-hidden="true"
                      />
                    </svg>
                  </div>
                </>
              </div>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EventComponent;
