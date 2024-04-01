import { urlFor } from '../../sanityConfig';
import styles from '../../styles/components/gallery/Index.module.css';
import React, { useState, useEffect } from 'react';

const GalleryImages = ({ data }) => {
  const [galleryData, setGalleryData] = useState([]);

  useEffect(() => {
    const orderedData = data?.sort((a, b) => a.order - b.order);
    setGalleryData(orderedData);
  }, [data]);

  return (
    <div className={`componentContainer`}>
      {galleryData &&
        galleryData.map(({ title, images }) => (
          <div key={title} className={styles.galleryContainer}>
            <h2 className={`subHeader mb-1`}>{title}</h2>
            <div className={styles.galleryImages}>
              {images.map((image) => (
                <img
                  className={styles.galleryImage}
                  key={urlFor(image)}
                  alt="image"
                  src={urlFor(image)}
                />
              ))}
            </div>
          </div>
        ))}
    </div>
  );
};

export default GalleryImages;
