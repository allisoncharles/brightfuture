import styles from "../styles/FeaturedComponent.module.css";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useContext, useRef } from "react";
import { useMutation } from "@apollo/client";
import { DELETE_FEATURED } from "../graphql/mutations";
import DeleteConfirm from "./DeleteConfirm";
import { DeleteConfirmContext } from "../store/store";

const FeaturedComponent = ({ featuredRes }) => {
  const [featured, setFeatured] = useState();
  const [deleteFeatured, { data, error, loading }] =
    useMutation(DELETE_FEATURED);
  const { openDelete, setOpenDelete } = useContext(DeleteConfirmContext);
  const deleteComponentIdRef = useRef();

  useEffect(() => {
    setFeatured(featuredRes);
  }, [featuredRes]);

  const checkDelete = (id) => {
    try {
      deleteFeatured({
        variables: { _id: id },
      }).then(
        () =>
          setFeatured(
            featured?.filter((featuredItem) => featuredItem._id !== id)
          ),
        setOpenDelete(false)
      );
    } catch (err) {
      throw new Error(err);
    }
  };

  const handleFeaturedDelete = (id) => {
    setOpenDelete(true);
    deleteComponentIdRef.current = id;
  };
  return (
    <div className={styles.featured__component}>
      {openDelete ? (
        <DeleteConfirm
          id={deleteComponentIdRef.current}
          component={"featured"}
          deleteFunc={checkDelete}
        />
      ) : null}
      <div className={styles.featured__create__button__container}>
        <Link href={`/admin/featured/addfeatured`}>
          <button className={styles.featured__create__button}>
            Add featured
          </button>
        </Link>
      </div>
      <div className={styles.featured__component__wrapper}>
        <div className={styles.featured__component__list__wrapper}>
          <ul className={styles.featured__component__list}>
            {featured?.map((featuredItem, index) => (
              <div
                key={index}
                className={styles.featured__component__item__wrapper}
              >
                <>
                  <li className={styles.featured__component__list__item}>
                    <div className={styles.featured__component__item}>
                      <div
                        className={styles.featured__component__image__container}
                      >
                        <Image
                          className={styles.featured__component__image}
                          src={
                            featuredItem?.featuredImg
                              ? featuredItem?.featuredImg
                              : "/img/placeholder.png"
                          }
                          alt=""
                          fill
                          objectFit="cover"
                        />
                      </div>
                      <div className={styles.featured__component__text}>
                        <h2 className={styles.featured__component__title}>
                          Title: {featuredItem.featuredTitle}
                        </h2>
                        <h2 className={styles.featured__component__title}>
                          Text: {featuredItem.featuredText}
                        </h2>
                      </div>
                    </div>
                  </li>
                  <div
                    onClick={() => handleFeaturedDelete(featuredItem._id)}
                    className={styles.featured__component__icon__container}
                  >
                    <svg className={styles.featured__component__delete__icon}>
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

export default FeaturedComponent;
