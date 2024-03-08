import styles from '../styles/pages/About.module.css';
import { urlFor } from '../sanityConfig';
import React, { useState, useEffect } from 'react';
import { sanityFetch } from '../lib/sanity/sanityFetch';
import { getAboutData } from '../lib/sanity/data/aboutSanity';
import Testimonial from '../components/Testimonial';
import Estimate from '../components/Estimate';
import Teammates from '../components/Teammates';
import { textListUl } from '../Util/textFormat';

const About = ({ aboutData, estimateData, testimonialData, services, teammate }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [box, setBox] = useState('');
  const [isEstimate, setIsEstimate] = useState(false);
  const [isTestimonial, setIsTestimonial] = useState(false);
  const [teammates, setTeammates] = useState([]);

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
    const orderedData = teammate?.sort((a, b) => a.order - b.order);
    setTeammates(orderedData);
  }, [aboutData, teammate]);

  return (
    <div className={`${styles.container} pageWrapper pb-2`}>
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
      <div className={styles.teamDiv}>
        <Teammates teammates={teammates}/>
      </div>
    </div>
  );
};

export const getServerSideProps = async () => {
  const aboutData = await getAboutData();
  const services = await sanityFetch('service');
  const estimateData = await sanityFetch('estimate');
  const testimonialData = await sanityFetch('testimonial');
  const teammate = await sanityFetch('teammate');
  return {
    props: {
      aboutData,
      estimateData,
      testimonialData,
      services,
      teammate,
    },
  };
};

export default About;
