import styles from "../styles/Navbar.module.css";
import CheckResultConfig from "./CheckResultConfig";
import { useRef, useState } from "react";
import Result from "./Result";
import Link from "next/link";

const Navbar = ({ homeRef, aboutRef, contactRef }) => {
  const [showClose, setShowClose] = useState(false);
  const handleScroll = (ref) => {
    window.scrollTo({
      top: ref?.offsetTop - 90,
      left: 0,
      behavior: "smooth",
    });

    if (window.innerWidth < 871) {
      navRef.current.toggleAttribute("data-visible");
      navbarRef.current.toggleAttribute("data-overlay");
      document.body.setAttribute("no-scroll", "false");
      setShowClose(false);
    }
  };

  const navRef = useRef();
  const navToggleRef = useRef();
  const navbarRef = useRef();
  const authRef = useRef();
  const authContainerRef = useRef();
  const resultRef = useRef();

  const toggleNav = () => {
    navRef.current.hasAttribute("data-visible")
      ? navToggleRef.current.setAttribute("aria-expanded", false)
      : navToggleRef.current.setAttribute("aria-expanded", true);
    navRef.current.toggleAttribute("data-visible");
    navbarRef.current.toggleAttribute("data-overlay");
    if (document.body.getAttribute("no-scroll") == "false") {
      document.body.setAttribute("no-scroll", "true");
      setShowClose(true);
    } else {
      document.body.setAttribute("no-scroll", "false");
      setShowClose(false);
    }
  };

  const showResultConfig = () => {
    if (window.innerWidth < 871) {
      setShowClose(false);
    }
    navbarRef.current.toggleAttribute("show-auth");
    navbarRef.current.toggleAttribute("auth-overlay");
    navbarRef.current.setAttribute("has-auth", "true");
    navRef.current.removeAttribute("data-visible");
    navbarRef.current.removeAttribute("data-overlay");
  };

  const removeOverlay = (e) => {
    if (navbarRef.current.hasAttribute("has-auth")) {
      let parent = e.target.parentNode;
      let authBtn = authRef.current;
      let resultBtn = resultRef.current;
      if (parent == authBtn || parent == resultBtn) return;
      let parentContainer = authContainerRef.current;

      // NOT CLOSING MODAL IF THE MODAL CONTAINER IS BEING CLICKED.
      if (parentContainer?.contains(e.target)) return;

      navbarRef.current.removeAttribute("show-auth");
      navbarRef.current.removeAttribute("auth-overlay");
      navbarRef.current.removeAttribute("has-auth");
      document.body.removeAttribute("no-scroll");
    }
  };

  return (
    <header
      className={styles.navbar}
      ref={navbarRef}
      onClick={(e) => removeOverlay(e)}
    >
      <div className={styles.nav__wrapper}>
        <div className={styles.nav__left}>
          <Link href="/">
            <svg className={styles.nav__logo}>
              <use xlinkHref="/svg/bf-icon.svg#bf-icon" />
            </svg>
          </Link>
          <div className={styles.logo__text}>
            <h2 className={styles["fs-logo-heading"]}>
              <b>b</b>right<b>f</b>uture <b>s</b>chools
            </h2>
          </div>
        </div>
        <div className={styles.nav__right}>
          <button
            ref={navToggleRef}
            onClick={toggleNav}
            className={styles.mobile_nav_toggle}
            aria-expanded="false"
            aria-controls="primary__navigation"
          >
            {showClose ? (
              <svg
                className={`${styles["navbar__icon"]} + ${styles["menu__icon"]}`}
                width="30"
                height="24"
              >
                <use
                  xlinkHref="/svg/close-icon.svg#close-icon"
                  aria-hidden="true"
                />
              </svg>
            ) : (
              <svg
                className={`${styles["navbar__icon"]} + ${styles["menu__icon"]}`}
                width="30"
                height="24"
              >
                <use
                  xlinkHref="/svg/menu-icon.svg#menu-icon"
                  aria-hidden="true"
                />
              </svg>
            )}

            <span className={styles.visually__hidden}>Menu</span>
          </button>
          <nav
            ref={navRef}
            className={styles.primary__navigation}
            id="primary__navigation"
          >
            <ul aria-label="primary" className={styles.nav__list}>
              <li className={styles.nav__list__item} onClick={() => handleScroll(homeRef?.current)}>
                <svg className={styles.navbar__icon} width="146" height="24">
                  <use xlinkHref="/svg/home-icon.svg#icon-home" />
                </svg>
                <span className={styles.nav__title}>home</span>
              </li>
              <li className={styles.nav__list__item} onClick={() => handleScroll(aboutRef?.current)}>
                <svg className={styles.navbar__icon} width="146" height="24">
                  <use xlinkHref="/svg/info-icon.svg#icon-info" />
                </svg>
                <span className={styles.nav__title}>about us</span>
              </li>

              <li className={styles.nav__list__item} ref={resultRef} onClick={showResultConfig}>
                <svg className={styles.navbar__icon} width="146" height="24">
                  <use
                    xlinkHref="/svg/check-result-icon.svg#check-result-icon"
                    aria-hidden="true"
                  />
                </svg>

                <span className={styles.nav__title}>check result</span>
              </li>
              <li className={styles.nav__list__item} onClick={() => handleScroll(contactRef?.current)}>
                <svg className={styles.navbar__icon} width="146" height="24">
                  <use xlinkHref="/svg/contact-icon.svg#icon-contact" />
                </svg>
                <span className={styles.nav__title}>contact us</span>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <div className={styles.auth} ref={authContainerRef}>
        <CheckResultConfig />
      </div>
      <div className={styles.result__container}>
        <Result />
      </div>
    </header>
  );
};

export default Navbar;
