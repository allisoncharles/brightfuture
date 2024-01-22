import styles from "../styles/Featured.module.css";
import { useEffect, useState } from "react";
import Image from "next/image";
import React from "react";

const Featured = ({ featuredItems, homeRef }) => {
  const delay = 60000;
  let [counter, setCounter] = useState(0);

  useEffect(() => {
    if (document.getElementById(`radio${counter}`)) {
      const autoSlide = setInterval(() => {
        document.getElementById(`radio${counter}`).checked = true;
        if (counter < featuredItems.length - 1) {
          setCounter((prevCounter) => prevCounter + 1);
        } else {
          setCounter(0);
        }
      }, delay);
      return () => clearInterval(autoSlide);
    }
  }, [counter, featuredItems.length]);

  return (
    <section ref={homeRef}>
      <div className={styles.featured}>
        <div className={styles.featured__wrapper}>
          {featuredItems.map((_, index) => (
            <input
              type="radio"
              id={`radio${index}`}
              name="radio-btn"
              key={`radio${index}`}
            />
          ))}
          {featuredItems.map((featuredItem, index) => (
            <div
              className={
                index === 0
                  ? `${styles["featured__container"]} ${styles["first"]}`
                  : `${styles["featured__container"]}`
              }
              key={`featured${index}`}
            >
              <div className={styles.image__container}>
                <Image
                  className={styles.featured__image}
                  src={
                    featuredItem?.featuredImg
                      ? featuredItem?.featuredImg
                      : "/img/placeholder.png"
                  }
                  fill
                  alt="featured"
                  priority
                />
              </div>
              <div className={styles.text__container}>
                <h2>{featuredItem.featuredTitle}</h2>
                <span>{featuredItem.featuredText}</span>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.carousel__pager}>
          {featuredItems.map((_, index) => (
            <label
              htmlFor={`radio${index}`}
              id={`button${index}`}
              className={`btn${index}`}
              key={`label${index}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Featured;
