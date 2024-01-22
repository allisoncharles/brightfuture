import styles from "../../styles/Admin.module.css";
import Login from "../../components/Login";
import NavBar from "../../components/Navbar";
import Footer from "../../components/Footer";

const Admin = () => {
  return (
    <>
      <NavBar />
      <div className={styles.admin}>
        <div className={styles.auth__container}>
          <Login />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Admin;
