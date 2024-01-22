import styles from "../styles/About.module.css";
import Image from "next/image";
import React from "react";

const About = ({ faceRes, aboutRef }) => {
  const face = faceRes?.slice(-1)[0];

  return (
    <div ref={aboutRef} className={styles.about}>
      <h2 className={styles.about__title}>about us</h2>
      <div className={styles.about__header}>
        <div className={styles.face}>
          <Image
            src={face?.faceImg ? face?.faceImg : "/img/placeholder.png"}
            alt=""
            fill
            className={styles.face__image}
          />
        </div>
        <div className={styles.header__text__wrapper}>
          <div className={styles.header__text__container}>
            <h2 className={styles.header__text}>
              a legacy of world-class education
            </h2>
          </div>
          <h2 className={styles.header__info}>
            We are in tune with the future of learning, and continue to lead the
            pack in world-class education
          </h2>
        </div>
      </div>

      <div className={styles.about__text__wrapper}>
        <div className={styles.about__text}>
          <h2
            className={`${styles["about__text__header"]} ${styles["vission"]}`}
          >
            our vision
          </h2>
          <p className={styles.about__text__details}>
            To prepare young people capable of providing <b>honest</b> &{" "}
            <b>quality</b> <b>leadership</b> to the society
          </p>
        </div>
        <div className={styles.about__text}>
          <h2
            className={`${styles["about__text__header"]} ${styles["mission"]}`}
          >
            our mission
          </h2>
          <p className={styles.about__text__details}>
            To provide in a conducive and <b>godly</b> environment, balanced
            education opportunities directed at the <b>development</b> of our
            children&apos;s spiritual, intellectual and physical character to
            the satisfaction of our <b>stakeholders</b>
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
