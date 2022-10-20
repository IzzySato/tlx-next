import styles from '../styles/pages/About.module.css';
import { urlFor } from '../sanityConfig';
import React, { useState, useEffect } from 'react';
import { insertStyles } from '../Util/pageUtil';
import { sanityFetch } from '../lib/sanity/sanityFetch';
import { getAboutData } from '../lib/sanity/data/aboutSanity';
import { defaultDataToSanity } from '../lib/sanity/build/pageBuildSanity';
import Testimonial from '../components/Testimonial';
import Estimate from '../components/Estimate';

const About = ({
  aboutData,
  fontData,
  estimateData,
  testimonialData,
  services
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [box, setBox] = useState('');
  const [estimateC, setEstimateC] = useState(false);
  const [testimonialC, setTestimonialC] = useState(false);

  useEffect(() => {
    const { aboutTitle,
            aboutDesc,
            aboutImg,
            titleDiscBox,
            relatedStyles,
            estimateComponent,
            testimonialComponent
          } = aboutData[0];
    setTitle(aboutTitle);
    setDescription(aboutDesc);
    setImage(aboutImg);
    setBox(titleDiscBox);
    insertStyles(relatedStyles);
    setEstimateC(estimateComponent);
    setTestimonialC(testimonialComponent);
  }, [
    aboutData,
    fontData
  ]);

  return (
    <div className={`${styles.container} pageWrapper`}>
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
      {
          (testimonialC) ?
          <div className={styles.testimonialDiv}>
            <Testimonial data={{ testimonialData }}/>
          </div> : ''
        }
        {
          (estimateC) ?
          <div className={styles.estimateDiv}>
            <Estimate data={ { services, estimateData } }/>
          </div> : ''
        }
    </div>
  )
};

export const getServerSideProps = async () => {
  const aboutData = await getAboutData();
  const fontData = await sanityFetch('importFont');
  const services = await sanityFetch('service');
  const estimateData = await sanityFetch('estimate');
  const testimonialData = await sanityFetch('testimonial');
  // insert the data only first time loaded this page
  await defaultDataToSanity(aboutData, 'aboutPage');
  return { props: { 
    aboutData,
    fontData,
    estimateData,
    testimonialData,
    services
   } };
};

export default About;