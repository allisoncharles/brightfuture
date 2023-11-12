import AdminNav from "../../../components/AdminNav";
import EditUser from "../../../components/EditUser";
import styles from "../../../styles/User.module.css";
import client from "../../../utils/apollo-client";
import { GET_USER } from "../../../graphql/queries";
import { useContext, useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "../../../store/store";
import NavBar from "../../../components/Navbar";
import Footer from "../../../components/Footer";

const User = ({ userData }) => {
  const { token } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
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
      router.push("/admin");
    }
  }, [token, router]);

  return (
    <>
      <NavBar />
      <div className={styles.edit__user}>
        {token && !loading && (
          <>
            <div ref={adminNavRef} className={styles.edit__user__left}>
              <AdminNav />
            </div>
            <div className={styles.edit__user__right}>
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
              <EditUser userData={userData} />
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export async function getServerSideProps(context) {
  const originalRegno = context.params.regno.replace(/-/g, "/");

  const response = await client.query({
    query: GET_USER,
    variables: { regno: originalRegno },
  });

  return {
    props: {
      userData: response.data.getUser,
    },
  };
}

export default User;
