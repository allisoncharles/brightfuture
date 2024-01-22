import styles from "../styles/FaceComponent.module.css";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useContext, useRef } from "react";
import { useMutation } from "@apollo/client";
import { DELETE_FACE } from "../graphql/mutations";
import DeleteConfirm from "./DeleteConfirm";
import { DeleteConfirmContext } from "../store/store";

const FaceComponent = ({ faceRes }) => {
  const [face, setFace] = useState();
  const [deleteFace, { data, error, loading }] = useMutation(DELETE_FACE);
  const { openDelete, setOpenDelete } = useContext(DeleteConfirmContext);
  const deleteComponentIdRef = useRef();

  useEffect(() => {
    setFace(faceRes);
  }, [faceRes]);

  const checkDelete = (id) => {
    try {
      deleteFace({
        variables: { _id: id },
      }).then(
        () => setFace(face?.filter((faceItem) => faceItem._id !== id)),
        setOpenDelete(false)
      );
    } catch (err) {
      throw new Error(err);
    }
  };

  const handleFaceDelete = (id) => {
    setOpenDelete(true);
    deleteComponentIdRef.current = id;
  };
  return (
    <div className={styles.face__component}>
      {openDelete ? (
        <DeleteConfirm
          id={deleteComponentIdRef.current}
          component={"Image"}
          deleteFunc={checkDelete}
        />
      ) : null}
      <div className={styles.face__create__button__container}>
        <Link href={`/admin/face/addface`}>
          <button className={styles.face__create__button}>Add face</button>
        </Link>
      </div>
      <div className={styles.face__component__wrapper}>
        <div className={styles.face__component__list__wrapper}>
          <ul className={styles.face__component__list}>
            {face?.map((faceItem, index) => (
              <div
                key={index}
                className={styles.face__component__item__wrapper}
              >
                <>
                  <li className={styles.face__component__list__item}>
                    <div className={styles.face__component__item}>
                      <div className={styles.face__component__image__container}>
                        <Image
                          className={styles.face__component__image}
                          src={
                            faceItem?.faceImg
                              ? faceItem?.faceImg
                              : "/img/placeholder.png"
                          }
                          alt=""
                          fill
                          objectFit="cover"
                        />
                      </div>
                      <div className={styles.face__component__text}>
                        <h2 className={styles.face__component__title}>
                          Title: {faceItem.faceTitle}
                        </h2>
                      </div>
                    </div>
                  </li>
                  <div
                    onClick={() => handleFaceDelete(faceItem._id)}
                    className={styles.face__component__icon__container}
                  >
                    <svg className={styles.face__component__delete__icon}>
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

export default FaceComponent;
