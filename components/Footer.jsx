import styles from "../styles/Footer.module.css";
import { useRef } from "react";

const Footer = ({ contactRef }) => {
  return (
    <div ref={contactRef} className={styles.footer}>
      <div className={styles.footer__wrapper}>
        <div className={styles.footer__item}>
          <div className={styles.footer__header__wrapper}>
            <svg className={styles.footer__icon}>
              <use xlinkHref="/svg/location-icon.svg#icon-location" />
            </svg>
            <h2 className={styles.footer__header}>our schools</h2>
          </div>
          <div className={styles.footer__body}>
            <p className={styles.footer__address}>
              <b>B</b>right<b>F</b>uture College
              <br />
              103/105, Mauji Rd,
              <br />
              Moshun round about,
              <br /> Yorkshire,
              <br />
              London.
            </p>
            <p className={styles.footer__address}>
              <b>B</b>right<b>F</b>uture Basic School
              <br />
              32, Dome Tatiana Street,
              <br />
              Bright Bus Stop,
              <br />
              Off Pola Shorike grovy Road,
              <br />
              Yorkshire
              <br />
              London.
            </p>
          </div>
        </div>

        <div className={styles.footer__item}>
          <div className={styles.footer__header__wrapper}>
            <svg className={styles.footer__icon} width="30" height="24">
              <use xlinkHref="/svg/contact-icon.svg#icon-contact" />
            </svg>
            <h2 className={styles.footer__header}>contact us</h2>
          </div>
          <div className={styles.footer__body}>
            <div className={styles.contact__item}>
              <h4>
                Tel: <span>+44 8432 750 789</span>
              </h4>
              <h4>
                Tel: <span>+44 0214 965 755</span>
              </h4>
              <h4>
                Email: <span>brightfutureschools@yahoo.com</span>
              </h4>
            </div>
          </div>
        </div>

        <div className={styles.footer__item}>
          <div className={styles.footer__icon__wrapper}>
            <h2 className={styles.footer__header}>connect with us</h2>
            <div className={styles.footer__icon__container}>
              <a
                target="_blank"
                href="https://facebook.com/"
                rel="noopener noreferrer"
              >
                <svg className={styles.fb__icon}>
                  <use xlinkHref="/svg/facebook-icon.svg#icon-facebook" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.copyright}>
        <span className={styles.copyright__info}>
          © BrightFuture Schools 2023. All right reserved.
        </span>
      </div>
    </div>
  );
};

export default Footer;
