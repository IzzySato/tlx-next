import styles from '../styles/pages/Gallery.module.css';
import React, { useState, useEffect } from 'react';
import { urlFor } from '../sanityConfig';
import { sanityFetch } from '../lib/sanity/sanityFetch';

const Gallery = ({ gallery }) => {
  const [galleryData, setGalleryData] = useState([]);

  useEffect(() => {
    setGalleryData(gallery)
  }, [gallery]);

  return (
    <div className={`${styles.container} pageWrapper mt-2`}>
      {
        galleryData && galleryData.map(({ title, images}) => 
          <div key={title} className={styles.galleryContainer}>
           <h2 className={`subHeader mb-1`}>{title}</h2>
            <div className={styles.galleryImages}>
              {
                images.map((image) => <img className={styles.galleryImage} key={urlFor(image)} alt='image' src={urlFor(image)}/>)
              }
            </div>
          </div>
        )
      }
    </div>
  )
};

export const getServerSideProps = async () => {
  const gallery = await sanityFetch('gallery')
  return { props: { gallery }};
};

export default Gallery;