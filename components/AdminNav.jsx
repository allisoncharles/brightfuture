import styles from "../styles/AdminNav.module.css";
import Link from "next/link";

const AdminNav = () => {
  return (
    <div className={styles.admin__nav}>
      <div>
        <h3 className={styles.admin__nav__title}>menu</h3>
        <ul className={styles.admin__link}>
          <Link href={`/admin/users`}>
            <li className={styles.admin__nav__items}>
              <div className={styles.admin__icon__wrapper}>
                <svg className={styles.admin__nav__icon} width="30" height="24">
                  <use
                    xlinkHref="/svg/users-icon.svg#users-icon"
                    aria-hidden="true"
                  />
                </svg>
              </div>
              <div>users</div>
            </li>
          </Link>
          <Link href="/admin/result">
            <li className={styles.admin__nav__items}>
              <div className={styles.admin__icon__wrapper}>
                <svg className={styles.admin__nav__icon} width="30" height="24">
                  <use
                    xlinkHref="/svg/check-result-icon.svg#check-result-icon"
                    aria-hidden="true"
                  />
                </svg>
              </div>
              <div>results</div>
            </li>
          </Link>
          <Link href="/admin/featured">
            <li className={styles.admin__nav__items}>
              <div className={styles.admin__icon__wrapper}>
                <svg className={styles.admin__nav__icon} width="30" height="24">
                  <use
                    xlinkHref="/svg/featured-playlist-icon.svg#featured-playlist-icon"
                    aria-hidden="true"
                  />
                </svg>
              </div>
              <div>featured</div>
            </li>
          </Link>
          <Link href="/admin/news">
            <li className={styles.admin__nav__items}>
              <div className={styles.admin__icon__wrapper}>
                <svg className={styles.admin__nav__icon} width="30" height="24">
                  <use
                    xlinkHref="/svg/icon-news.svg#news-icon"
                    aria-hidden="true"
                  />
                </svg>
              </div>
              <div>news</div>
            </li>
          </Link>
          <Link href="/admin/event">
            <li className={styles.admin__nav__items}>
              <div className={styles.admin__icon__wrapper}>
                <svg className={styles.admin__nav__icon} width="30" height="24">
                  <use
                    xlinkHref="/svg/calender-icon.svg#calender-icon"
                    aria-hidden="true"
                  />
                </svg>
              </div>
              <div>events</div>
            </li>
          </Link>
          <Link href="/admin/face">
            <li className={styles.admin__nav__items}>
              <div className={styles.admin__icon__wrapper}>
                <svg className={styles.admin__nav__icon} width="30" height="24">
                  <use
                    xlinkHref="/svg/scholar-icon.svg#scholar-icon"
                    aria-hidden="true"
                  />
                </svg>
              </div>
              <div>face of bfs</div>
            </li>
          </Link>
          <Link href="/admin/gallery">
            <li className={styles.admin__nav__items}>
              <div className={styles.admin__icon__wrapper}>
                <svg className={styles.admin__nav__icon} width="30" height="24">
                  <use
                    xlinkHref="/svg/gallery-icon.svg#gallery-icon"
                    aria-hidden="true"
                  />
                </svg>
              </div>
              <div>gallery</div>
            </li>
          </Link>
          <Link href="/admin/setting">
            <li className={styles.admin__nav__items}>
              <div className={styles.admin__icon__wrapper}>
                <svg className={styles.admin__nav__icon}>
                  <use
                    xlinkHref="/svg/settings.svg#settings"
                    aria-hidden="true"
                  />
                </svg>
              </div>
              <div>session config</div>
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default AdminNav;
