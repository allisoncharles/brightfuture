import AdminNav from "../../../components/AdminNav";
import EditResult from "../../../components/EditResult";
import styles from "../../../styles/EditResult.module.css";
import client from "../../../utils/apollo-client";
import { GET_USER_RESULT } from "../../../graphql/queries";
import { useContext, useEffect, useState, useRef } from "react";
import Router from "next/router";
import { AuthContext } from "../../../store/store";
import NavBar from "../../../components/Navbar";
import Footer from "../../../components/Footer";

const Result = ({ resultData }) => {
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

  return (
    <>
      <NavBar />
      <div className={styles.edit__result}>
        {token && !loading && (
          <>
            <div ref={adminNavRef} className={styles.edit__result__left}>
              <AdminNav />
            </div>
            <div className={styles.edit__result__right}>
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
              <EditResult resultData={resultData} />
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export const getServerSideProps = async (context) => {
  const params = context.params.slug;
  const regno = params[0].replace(/-/g, "/");
  const term = params[1];
  const session = `${params[2]}/${params[3]}`;
  const response = await client.query({
    query: GET_USER_RESULT,
    variables: { result: { regno, term, session } },
  });

  return {
    props: {
      resultData: response.data.getResult,
    },
  };
};

export default Result;
