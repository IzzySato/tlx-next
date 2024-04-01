import React from 'react';
import { urlFor } from '../../sanityConfig';
import { textListUl } from '../../Util/textFormat';
import styles from '../../styles/components/about/AboutMain.module.css';

const AboutMain = ({ image, title, description, box }) => {
  return (
    <div className={styles.aboutContainer}>
      {image && (
        <div
          className={styles.aboutImg}
          style={{ backgroundImage: `url(${urlFor(image)})` }}
        ></div>
      )}
      <div className={`${styles.titleDiv} ${styles[box]}`}>
        <h1 className={`${styles.title} headerTitle`}>{title}</h1>
        <p className={`${styles.desc} paragraph`}>{textListUl(description)}</p>
      </div>
    </div>
  );
};

export default AboutMain;