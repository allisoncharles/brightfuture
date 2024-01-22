import styles from "../styles/GalleryComponent.module.css";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useContext, useRef } from "react";
import { useMutation } from "@apollo/client";
import { DELETE_GALLERY } from "../graphql/mutations";
import DeleteConfirm from "./DeleteConfirm";
import { DeleteConfirmContext } from "../store/store";

const GalleryComponent = ({ galleryRes }) => {
  const [gallery, setGallery] = useState();
  const [deleteGallery, { data, error, loading }] = useMutation(DELETE_GALLERY);
  const { openDelete, setOpenDelete } = useContext(DeleteConfirmContext);
  const deleteComponentIdRef = useRef();

  useEffect(() => {
    setGallery(galleryRes);
  }, [galleryRes]);

  const checkDelete = (id) => {
    try {
      deleteGallery({
        variables: { _id: id },
      }).then(
        () =>
          setGallery(gallery?.filter((galleryItem) => galleryItem._id !== id)),
        setOpenDelete(false)
      );
    } catch (err) {
      throw new Error(err);
    }
  };

  const handleGalleryDelete = (id) => {
    setOpenDelete(true);
    deleteComponentIdRef.current = id;
  };
  return (
    <div className={styles.gallery__component}>
      {openDelete ? (
        <DeleteConfirm
          id={deleteComponentIdRef.current}
          component={"image"}
          deleteFunc={checkDelete}
        />
      ) : null}
      <div className={styles.gallery__create__button__container}>
        <Link href={`/admin/gallery/addgallery`}>
          <button className={styles.gallery__create__button}>
            Add gallery
          </button>
        </Link>
      </div>
      <div className={styles.gallery__component__wrapper}>
        <div className={styles.gallery__component__list__wrapper}>
          <ul className={styles.gallery__component__list}>
            {gallery?.map((galleryItem, index) => (
              <div
                key={index}
                className={styles.gallery__component__item__wrapper}
              >
                <>
                  <li className={styles.gallery__component__list__item}>
                    <div className={styles.gallery__component__item}>
                      <div
                        className={styles.gallery__component__image__container}
                      >
                        <Image
                          className={styles.gallery__component__image}
                          src={
                            galleryItem?.galleryImg
                              ? galleryItem?.galleryImg
                              : "/img/placeholder.png"
                          }
                          alt=""
                          fill
                          objectFit="cover"
                        />
                      </div>
                      <h2 className={styles.gallery__component__title}>
                        {galleryItem.galleryTitle}
                      </h2>
                    </div>
                  </li>
                  <div
                    onClick={() => handleGalleryDelete(galleryItem._id)}
                    className={styles.gallery__component__icon__container}
                  >
                    <svg className={styles.gallery__component__delete__icon}>
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

export default GalleryComponent;
