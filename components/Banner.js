import React from 'react';
import { urlFor } from '../sanityConfig';
import styles from '../styles/components/Banner.module.css';

const Banner = ({ homeImage }) => {
  return (
    <div
    className={styles.imgContainer}
    style={{ backgroundImage: `url(${urlFor(homeImage)})` }}></div>
  )
};

export default Banner;
