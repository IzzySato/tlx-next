import styles from '../styles/pages/About.module.css';
import { urlFor } from '../sanityConfig';
import React, { useState, useEffect } from 'react';
import { insertStyles } from '../Util/pageUtil';
import { sanityFetch } from '../lib/sanity/sanityFetch';
import { getAboutData } from '../lib/sanity/data/aboutSanity';
import { defaultDataToSanity } from '../lib/sanity/build/pageBuildSanity';

const About = ({ aboutData, fontData }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [box, setBox] = useState('');

  useEffect(() => {
    const { aboutTitle,
            aboutDesc,
            aboutImg,
            titleDiscBox,
            relatedStyles } = aboutData[0];
    setTitle(aboutTitle);
    setDescription(aboutDesc);
    setImage(aboutImg);
    setBox(titleDiscBox);
    insertStyles(relatedStyles);
  }, [aboutData, fontData ]);

  return (
    <div className={styles.container}>
    {
      image &&
        <div className={styles.aboutImg}
             style={{ backgroundImage:`url(${urlFor(image)})`}}>
        </div>
    }
      <div className={`${styles.titleDiv} ${styles[box]}`}>
        <h1 className={styles.title}>{ title }</h1>
        <p className={styles.desc}>{ description }</p>
      </div>
    </div>
  )
};

export const getServerSideProps = async () => {
  const aboutData = await getAboutData();
  const fontData = await sanityFetch('importFont');
  await defaultDataToSanity(aboutData, 'aboutPage');
  return { props: { aboutData, fontData } };
};

export default About;