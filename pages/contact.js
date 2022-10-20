import styles from '../styles/pages/Contact.module.css';
import React, { useState, useEffect } from 'react';
import { urlFor } from '../sanityConfig';
import Estimate from '../components/Estimate';
import BusinessInfo from '../components/BusinessInfo';
import { insertStyles } from '../Util/pageUtil';
import { sanityFetch } from '../lib/sanity/sanityFetch';
import { getContactPageData } from '../lib/sanity/data/contactSanity';
import { defaultDataToSanity } from '../lib/sanity/build/pageBuildSanity';
import Testimonial from '../components/Testimonial';

const Contact = ({ contactPageData,
  businessInfo,
  fontData,
  services,
  estimateData,
  testimonialData }) => {

  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [estimateC, setEstimateC] = useState(false);
  const [testimonialC, setTestimonialC] = useState(false);

  useEffect(() => {
    const {
      contactTitle,
      contactImg,
      relatedStyles,
      estimateComponent,
      testimonialComponent } = contactPageData[0];
    setImage(contactImg);
    setTitle(contactTitle);
    insertStyles(relatedStyles);
    setEstimateC(estimateComponent);
    setTestimonialC(testimonialComponent);
  }, [
    contactPageData,
    businessInfo,
    fontData,
    services]);

  return (
    <div className={`${styles.container} pageWrapper`}>
      {
        image &&
        <div className={styles.contactImg}
             style={{ backgroundImage: `url(${urlFor(image)})`}}>
        </div>
      }
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.businessInfoContainer}>
        <BusinessInfo data={{ businessInfo: businessInfo[0] }}/>
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
  const services = await sanityFetch('service');
  const contactPageData = await getContactPageData();
  const businessInfo = await sanityFetch('info');
  const fontData = await sanityFetch('importFont');
  const estimateData = await sanityFetch('estimate');
  const testimonialData = await sanityFetch('testimonial');
    // insert the data only first time build the app
  await defaultDataToSanity(contactPageData, 'contactPage');
  return { props: { 
    contactPageData,
    businessInfo,
    fontData,
    services,
    estimateData,
    testimonialData
  } };
};

export default Contact;