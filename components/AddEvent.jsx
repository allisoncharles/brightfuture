import styles from "../styles/AddEvent.module.css";
import { useRef, useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_EVENT } from "../graphql/mutations";

const AddEvent = () => {
  const [eventTitle, setEventTitle] = useState("");
  const [eventHost, setEventHost] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [createEvent, { data, loading, error }] = useMutation(ADD_EVENT);

  const handleDate = (date) => {
    const dateString = date.toString();
    setEventDate(dateString);
  };

  const handleAddEvent = () => {
    createEvent({
      variables: { event: { eventTitle, eventHost, eventDate } },
    }).then(() => {
      setEventTitle("");
      setEventHost("");
      setEventDate("");
    });
  };

  return (
    <div className={styles.add__event}>
      <div className={styles.add__event__details__wrapper}>
        <div className={styles.add__event__detail__input__wrapper}>
          <label
            className={styles.add__event__detail__label}
            htmlFor="new-event-title"
          >
            Title
          </label>
          <textarea
            id="new-event-title"
            onChange={(e) => setEventTitle(e.target.value)}
            className={styles.add__event__detail__input}
            value={eventTitle}
          />

          <label
            className={styles.add__event__detail__label}
            htmlFor="new-event-host"
          >
            Host of event
          </label>

          <textarea
            id="new-event-host"
            onChange={(e) => setEventHost(e.target.value)}
            className={styles.add__event__detail__input}
            value={eventHost}
          />

          <label htmlFor="new-event-date">Date</label>
          <input
            type="date"
            id="new-event-date"
            onChange={(e) => handleDate(e.target.value)}
            className={styles.add__event__detail__input}
            value={eventDate}
          />

          <button
            onClick={handleAddEvent}
            className={styles.add__event__create__button}
          >
            Add
          </button>
          {loading && (
            <h2 className={styles.add__event__message__load}>
              Creating Event...
            </h2>
          )}

          {data?.createEvent && (
            <h2 className={styles.add__event__message}>Event Created!</h2>
          )}
          {error && (
            <h2 className={styles.add__event__message__error}>
              An Error occured, check your inputs and try again
            </h2>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddEvent;
