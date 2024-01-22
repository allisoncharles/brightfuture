import styles from "../../../styles/Users.module.css";
import AdminNav from "../../../components/AdminNav";
import UserList from "../../../components/UserList";
import client from "../../../utils/apollo-client";
import { GET_USERS } from "../../../graphql/queries";
import { useContext, useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "../../../store/store";
import NavBar from "../../../components/Navbar";
import Footer from "../../../components/Footer";

const UserAdmin = ({ userlist }) => {
  const { token } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [showClose, setShowClose] = useState(false);
  const router = useRouter();
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

  // useEffect(() => {
  //   if (token) {
  //     setLoading(false);
  //     document.body.setAttribute("no-scroll", "false");
  //   } else {
  //     router.push("/admin");
  //   }
  // }, [token, router]);

  return (
    <>
      <NavBar />
      <div className={styles.admin__users}>
        {/* {token && !loading && ( */}
        <>
          <div ref={adminNavRef} className={styles.admin__users__left}>
            <AdminNav />
          </div>
          <div className={styles.admin__users__right}>
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
            <UserList userlist={userlist} />
          </div>
        </>
        {/* )} */}
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
  const userlist = await client.query({ query: GET_USERS });
  return {
    props: {
      userlist: userlist?.data?.getAllUsers ?? [],
    },
  };
}

export default UserAdmin;
