import styles from "../../../styles/ResultAD.module.css";
import AdminNav from "../../../components/AdminNav";
import { useEffect, useContext, useState, useRef } from "react";
import ResultComponent from "../../../components/ResultComponent";
import { GET__ALL__RESULT, GET_SETTING } from "../../../graphql/queries";
import client from "../../../utils/apollo-client";
import { SettingContext } from "../../../store/store";
import Router from "next/router";
import { AuthContext } from "../../../store/store";
import NavBar from "../../../components/Navbar";
import Footer from "../../../components/Footer";

const ResultAD = ({ resultRes, sessionsRes }) => {
  const { setSessions } = useContext(SettingContext);
  const { token } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [showClose, setShowClose] = useState(false);

  const adminNavRef = useRef();
  const adminToggleRef = useRef();

  const toggleAdminNav = () => {
    setShowClose(true);
    adminNavRef.current.hasAttribute("data-visible")
      ? adminToggleRef.current.setAttribute("aria-expanded", false)
      : adminToggleRef.current.setAttribute("aria-expanded", true);
    adminNavRef.current.toggleAttribute("data-visible");
    adminNavRef.current.toggleAttribute("data-overlay");

    if (document.body.getAttribute("no-scroll") == "false") {
      document.body.setAttribute("no-scroll", "true");
    } else {
      document.body.setAttribute("no-scroll", "false");
      setShowClose(false);
    }
  };

  useEffect(() => {
    if (token) {
      setLoading(false);
      document.body.setAttribute("no-scroll", "false");
    } else {
      Router.push("/admin");
    }
  }, [token]);
  useEffect(() => {
    setSessions(sessionsRes);
  });
  return (
    <>
      <NavBar />
      <div className={styles.admin__result}>
        {token && !loading && (
          <>
            <div ref={adminNavRef} className={styles.admin__result__left}>
              <AdminNav />
            </div>
            <div className={styles.admin__result__right}>
              <div className={styles.admin__nav__toggle}>
                <button
                  ref={adminToggleRef}
                  onClick={toggleAdminNav}
                  className={styles.admin__nav__toggle__btn}
                  aria-expanded="false"
                  aria-controls="admin__navigation"
                >
                  {showClose ? (
                    <svg
                      className={styles.admin__menu__icon}
                      width="35"
                      height="28"
                    >
                      <use
                        xlinkHref="/svg/close-icon.svg#close-icon"
                        aria-hidden="true"
                      />
                    </svg>
                  ) : (
                    <svg
                      className={styles.admin__menu__icon}
                      width="35"
                      height="28"
                    >
                      <use
                        xlinkHref="/svg/menu-icon.svg#menu-icon"
                        aria-hidden="true"
                      />
                    </svg>
                  )}
                  <span className={styles.visually__hidden}>Menu</span>
                </button>
              </div>
              <ResultComponent resultRes={resultRes} />
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export async function getServerSideProps({ req, res }) {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );
  const resultResponse = await client.query({ query: GET__ALL__RESULT });

  const settingsResponse = await client.query({ query: GET_SETTING });
  return {
    props: {
      resultRes: resultResponse?.data?.getAllResults ?? [],
      sessionsRes: settingsResponse?.data?.getAllSettings ?? [],
    },
  };
}

export default ResultAD;
