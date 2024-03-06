import styles from '../styles/pages/About.module.css';
import { urlFor } from '../sanityConfig';
import React, { useState, useEffect } from 'react';
import { sanityFetch } from '../lib/sanity/sanityFetch';
import { getAboutData } from '../lib/sanity/data/aboutSanity';
import Testimonial from '../components/Testimonial';
import Estimate from '../components/Estimate';

const About = ({ aboutData, estimateData, testimonialData, services }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [box, setBox] = useState('');
  const [isEstimate, setIsEstimate] = useState(false);
  const [isTestimonial, setIsTestimonial] = useState(false);

  useEffect(() => {
    const {
      aboutTitle,
      aboutDesc,
      aboutImg,
      titleDiscBox,
      estimateComponent,
      testimonialComponent,
    } = aboutData[0];
    setTitle(aboutTitle);
    setDescription(aboutDesc);
    setImage(aboutImg);
    setBox(titleDiscBox);
    setIsEstimate(estimateComponent);
    setIsTestimonial(testimonialComponent);
  }, [aboutData]);

  return (
    <div className={`${styles.container} pageWrapper`}>
      {image && (
        <div
          className={styles.aboutImg}
          style={{ backgroundImage: `url(${urlFor(image)})` }}
        ></div>
      )}
      <div className={`${styles.titleDiv} ${styles[box]}`}>
        <h1 className={`${styles.title} headerTitle`}>{title}</h1>
        <p className={`${styles.desc} paragraph`}>{description}</p>
      </div>
      {isTestimonial && (
        <div className={styles.testimonialDiv}>
          <Testimonial data={{ testimonialData }} />
        </div>
      )}
      {isEstimate && (
        <div className={styles.estimateDiv}>
          <Estimate data={{ services, estimateData }} />
        </div>
      )}
    </div>
  );
};

export const getServerSideProps = async () => {
  const aboutData = await getAboutData();
  const services = await sanityFetch('service');
  const estimateData = await sanityFetch('estimate');
  const testimonialData = await sanityFetch('testimonial');
  return {
    props: {
      aboutData,
      estimateData,
      testimonialData,
      services,
    },
  };
};

export default About;
