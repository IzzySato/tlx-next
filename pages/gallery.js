import styles from '../styles/pages/Gallery.module.css';
import React from 'react';
import { sanityFetch } from '../lib/sanity/sanityFetch';
import GalleryImages from '../components/gallery';
import MoveToTop from '../components/MoveToTop';

const Gallery = ({ gallery }) => {
  return (
    <div className={`${styles.container} pageWrapper mt-2`}>
      <GalleryImages data={gallery} />
      <MoveToTop />
    </div>
  );
};

export const getServerSideProps = async () => {
  const gallery = await sanityFetch('gallery');
  return { props: { gallery } };
};

export default Gallery;
