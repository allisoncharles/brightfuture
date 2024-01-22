import styles from "../styles/NewsComponent.module.css";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useContext, useRef } from "react";
import { useMutation } from "@apollo/client";
import { DELETE_NEWS } from "../graphql/mutations";
import DeleteConfirm from "./DeleteConfirm";
import { DeleteConfirmContext } from "../store/store";

const NewsComponent = ({ newsRes }) => {
  const [news, setNews] = useState();
  const [deleteNews, { data, error, loading }] = useMutation(DELETE_NEWS);
  const { openDelete, setOpenDelete } = useContext(DeleteConfirmContext);
  const deleteComponentIdRef = useRef();

  useEffect(() => {
    setNews(newsRes);
  }, [newsRes]);

  const checkDelete = (id) => {
    try {
      deleteNews({
        variables: { _id: id },
      }).then(
        () => setNews(news?.filter((newsItem) => newsItem._id !== id)),
        setOpenDelete(false)
      );
    } catch (err) {
      throw new Error(err);
    }
  };

  const handleNewsDelete = (id) => {
    setOpenDelete(true);
    deleteComponentIdRef.current = id;
  };
  return (
    <div className={styles.news__component}>
      {openDelete ? (
        <DeleteConfirm
          id={deleteComponentIdRef.current}
          component={"news"}
          deleteFunc={checkDelete}
        />
      ) : null}
      <div className={styles.news__create__button__container}>
        <Link href={`/admin/news/addnews`}>
          <button className={styles.news__create__button}>Add news</button>
        </Link>
      </div>
      <div className={styles.news__component__wrapper}>
        <div className={styles.news__component__list__wrapper}>
          <ul className={styles.news__component__list}>
            {news?.map((newsItem, index) => (
              <div
                key={index}
                className={styles.news__component__list__wrapper}
              >
                <>
                  <li className={styles.news__component__list__item}>
                    <div className={styles.news__component__item}>
                      <div className={styles.news__component__image__container}>
                        <Image
                          className={styles.news__component__image}
                          src={
                            newsItem?.newsImg
                              ? newsItem?.newsImg
                              : "/img/placeholder.png"
                          }
                          alt=""
                          fill
                        />
                      </div>
                      <h2 className={styles.news__component__title}>
                        {newsItem.newsTitle}
                      </h2>
                    </div>
                  </li>

                  <div
                    onClick={() => handleNewsDelete(newsItem._id)}
                    className={styles.news__component__icon__container}
                  >
                    <svg className={styles.news__component__delete__icon}>
                      <use
                        xlinkHref="/svg/recycle-bin-icon.svg#recycle-bin-icon"
                        aria-hidden="true"
                      />
                    </svg>
                  </div>
                </>
              </div>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NewsComponent;
