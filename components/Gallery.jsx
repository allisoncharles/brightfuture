import styles from "../styles/Gallery.module.css";
import { useEffect, useRef } from "react";
import Image from "next/image";

const Gallery = ({ gallery }) => {
  const slidesRef = useRef();

  let width = 340;
  let distance;
  let length;

  useEffect(() => {
    let left;
    const slides = slidesRef.current.children;
    const slidesArr = Array.from(slides);
    if (left === undefined) left = 0;
    slidesArr.forEach((slide) => {
      slide.style.left = `${left}px`;
      left += width;
    });
  });

  const addCloneEnd = (length) => {
    let clonedFirstChild = slidesRef.current.firstElementChild.cloneNode(true);
    clonedFirstChild.style.left = `${length}px`;
    slidesRef.current.appendChild(clonedFirstChild);
  };

  const removeFirstChildClone = () => {
    let clonedFirstChild = slidesRef.current.firstElementChild;
    slidesRef.current.removeChild(clonedFirstChild);
  };

  const moveSlideLeft = () => {
    const slides = slidesRef.current.children;
    const slidesArr = Array.from(slides);
    if (distance === undefined || distance === null) {
      distance = 0;
    }
    removeFirstChildClone();
    slidesArr.forEach((slide) => {
      slide.style.transform = `translateX(-${distance + width}px)`;
    });
    if (length === undefined) length = width * slides.length;
    addCloneEnd(length);
    length += width;
    distance += width;
  };

  return (
    <div className={styles.gallery}>
      <h1 className={styles.gallery__header}>take a virtual tour</h1>
      <div className={styles.gallery__container}>
        <div className={styles.icon__container}>
          <svg
            className={styles.gallery__icon}
            width="40"
            height="30"
            onClick={moveSlideLeft}
          >
            <use
              xlinkHref="/svg/arrow-right-icon.svg#arrow-right"
              aria-hidden="true"
            />
          </svg>
        </div>
        <div className={styles.gallery__items} ref={slidesRef}>
          {gallery.map((galleryItem, index) => (
            <div key={`gallery${index}`} className={styles.gallery__item}>
              <Image
                fill
                className={styles.gallery__img}
                src={
                  galleryItem?.galleryImg
                    ? galleryItem?.galleryImg
                    : "/img/placeholder.png"
                }
                alt=""
              />
              <h2 className={styles.gallery__label}>
                {galleryItem.galleryTitle}
              </h2>
              <div className={styles.gallery__overlay}></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
