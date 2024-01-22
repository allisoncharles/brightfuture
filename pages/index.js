import Head from "next/head";
import styles from "../styles/Home.module.css";
import Featured from "../components/Featured";
import Info from "../components/Info";
import About from "../components/About";
import Gallery from "../components/Gallery";
import client from "../utils/apollo-client";
import { GET_HOME } from "../graphql/queries";
import { useContext, useEffect, useRef } from "react";
import { SettingContext } from "../store/store";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Home = ({ homeDetails }) => {
  const {
    getAllFeatured,
    getAllGallery,
    getAllNews,
    getAllEvent,
    getAllFace,
    getAllSettings,
  } = homeDetails;
  const { setSessions } = useContext(SettingContext);

  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const contactRef = useRef(null);

  useEffect(() => {
    setSessions(getAllSettings);
  });

  return (
    <div className={styles.home}>
      <Head>
        <title>BrightFuture Schools</title>
      </Head>
      <Navbar homeRef={homeRef} aboutRef={aboutRef} contactRef={contactRef} />
      <main>
        <Featured homeRef={homeRef} featuredItems={getAllFeatured} />
        <Info news={getAllNews} events={getAllEvent} />
        <About aboutRef={aboutRef} faceRes={getAllFace} />
        <Gallery gallery={getAllGallery} />
      </main>
      <Footer contactRef={contactRef} />
    </div>
  );
};

export async function getServerSideProps({ req, res }) {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );

  const homeDetails = await client.query({ query: GET_HOME });
  return {
    props: {
      homeDetails: homeDetails?.data ?? [],
    },
  };
}

export default Home;
