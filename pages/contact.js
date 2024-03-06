import styles from '../styles/pages/Contact.module.css';
import React, { useState, useEffect } from 'react';
import { urlFor } from '../sanityConfig';
import Estimate from '../components/Estimate';
import BusinessInfo from '../components/BusinessInfo';
import { sanityFetch } from '../lib/sanity/sanityFetch';
import { getContactPageData } from '../lib/sanity/data/contactSanity';
import Testimonial from '../components/Testimonial';

const Contact = ({ contactPageData,
  businessInfo,
  services,
  estimateData,
  testimonialData }) => {

  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [isEstimate, setIsEstimate] = useState(false);
  const [isTestimonial, setIsTestimonial] = useState(false);

  useEffect(() => {
    const {
      contactTitle,
      contactImg,
      estimateComponent,
      testimonialComponent } = contactPageData[0];
    setImage(contactImg);
    setTitle(contactTitle);
    setIsEstimate(estimateComponent);
    setIsTestimonial(testimonialComponent);
  }, [
    contactPageData,
    businessInfo,
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
          isTestimonial &&
          <div className={styles.testimonialDiv}>
            <Testimonial data={{ testimonialData }}/>
          </div>
        }
        {
          isEstimate && 
          <div className={styles.estimateDiv}>
            <Estimate data={ { services, estimateData } }/>
          </div>
        }
    </div>
  )
};

export const getServerSideProps = async () => {
  const services = await sanityFetch('service');
  const contactPageData = await getContactPageData();
  const businessInfo = await sanityFetch('info');
  const estimateData = await sanityFetch('estimate');
  const testimonialData = await sanityFetch('testimonial');
  return { props: { 
    contactPageData,
    businessInfo,
    services,
    estimateData,
    testimonialData
  } };
};

export default Contact;