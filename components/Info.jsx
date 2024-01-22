import styles from "../styles/Info.module.css";
import Image from "next/image";
import month from "../utils/months";

const Info = ({ news, events }) => {
  const newsItems = news?.slice(-3).reverse();
  const dynamicStyle = (arg) => {
    switch (arg) {
      case 0:
        return `${styles["first-news"]}`;
        break;
      case 1:
        return `${styles["second-news"]}`;
        break;
      case 2:
        return `${styles["third-news"]}`;
        break;
    }
  };

  const now = new Date();
  const dateResult = `${now.getFullYear()}-${
    now.getMonth() + 1
  }-${now.getDate()}`;

  // convert all date string to a Date
  const dateTrans = events.map((eventItem) => {
    return {
      ...eventItem,
      eventDate: new Date(eventItem.eventDate).toISOString(),
    };
  });

  const today = new Date(dateResult).toISOString();

  // filtering out old dates.
  const filtered = dateTrans.filter((item) => {
    return today <= item.eventDate;
  });

  // sorting dates ascending
  const sortedAsc = filtered.sort(
    (a, b) => new Date(a.eventDate) - new Date(b.eventDate)
  );

  const eventItems = sortedAsc.slice(0, 2);

  const transformDate = (date) => {
    const modDate = new Date(date);
    const dateResult = `${modDate.getDate()}-${modDate.getMonth()}-${modDate.getFullYear()}`;
    return dateResult.split(/-/g);
  };

  const transformNewsDate = (val) => {
    const date = new Date(Number(val));
    return `${date.getDate()} ${month[date.getMonth()]} ${date.getFullYear()}`;
  };

  return (
    <section>
      <div className={styles.info}>
        <div className={styles.info__container}>
          <div
            className={`${styles["info__item"]} ${styles["news-header"]} ${styles["w-3"]}`}
          >
            <div className={styles.header}>
              <h1>news</h1>
              <span>all news</span>
            </div>
          </div>
          {newsItems.map((newsItem, index) => (
            <div
              key={`news${index}`}
              className={`${styles["info__item"]} ${dynamicStyle(index)}`}
            >
              <div className={styles.news__item}>
                <div className={styles.info__image}>
                  <Image
                    src={
                      newsItem?.newsImg
                        ? newsItem?.newsImg
                        : "/img/placeholder.png"
                    }
                    fill
                    alt=""
                  />
                </div>
                <div className={styles.overlay}></div>
                <div className={styles.info__text}>
                  <h2>{newsItem.newsTitle}</h2>
                  <small className={styles.info__small}>
                    {transformNewsDate(newsItem.createdAt)}
                  </small>
                </div>
              </div>
            </div>
          ))}

          <div className={`${styles["info__item"]} ${styles["event"]}`}>
            <div className={styles.event__container}>
              <div className={styles.header}>
                <h1>events</h1>
                <span>all events</span>
              </div>
              {eventItems.map((eventItem, index) => (
                <div key={`events${index}`} className={styles.event__item}>
                  <div className={styles.event__icon}>
                    <h2>{transformDate(eventItem.eventDate)[0]}</h2>
                    <small className={styles.info__small}>
                      {month[transformDate(eventItem.eventDate)[1]]}
                    </small>
                  </div>
                  <div className={styles.event__info}>
                    <h2>{eventItem.eventTitle}</h2>
                    <span>{eventItem.eventHost}</span>
                    <small className={styles.info__small}>
                      {`${transformDate(eventItem.eventDate)[0]} ${
                        month[transformDate(eventItem.eventDate)[1]]
                      } ${transformDate(eventItem.eventDate)[2]}`}
                    </small>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Info;
