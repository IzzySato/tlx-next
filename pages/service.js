import styles from '../styles/pages/Service.module.css';
import React, { useState, useEffect } from 'react';
import Estimate from '../components/Estimate';
import { insertStyles } from '../Util/pageUtil';
import { sanityFetch } from '../lib/sanity/sanityFetch';
import { getServicePageData } from '../lib/sanity/data/serviceSanity';
import { defaultDataToSanity } from '../lib/sanity/build/pageBuildSanity';
import Testimonial from '../components/Testimonial';
import ServiceWithImg from '../components/ServiceWithImg';
import ServiceList from '../components/ServiceList';

const Service = ({
  servicePageData,
  fontData,
  services,
  estimateData,
  testimonialData }) => {

  const [serviceTitle, setServiceTitle] = useState('');
  const [estimateC, setEstimateC] = useState(false);
  const [testimonialC, setTestimonialC] = useState(false);
  const [isImageSlide, setIsImageSlide] = useState(false);

  useEffect(() => {
    const {
      servicePageTitle,
      relatedStyles,
      estimateComponent,
      testimonialComponent,
      imageSlide
    } = servicePageData[0];
    setServiceTitle(servicePageTitle);
    insertStyles(relatedStyles);
    setEstimateC(estimateComponent);
    setTestimonialC(testimonialComponent);
    setIsImageSlide(imageSlide);
  }, [
    servicePageData,
    fontData,
    services
  ]);

  return (
    <div className={`${styles.container} wrapper`}>
      <div className={`${styles.serviceDiv}`}>
        <h1 className={styles.serviceTitle}>{serviceTitle}</h1>
        {/* service list with image */}
        <div className={styles.serviceWithImgDiv}>
          <ServiceWithImg data={{ services, isImageSlide }} />
        </div>
        {/* service list without image */}
        <div className={styles.serviceListDiv}>
          <ServiceList data={{ services }} />
        </div>
      </div>
      {
        (testimonialC) ?
          <div className={styles.testimonialDiv}>
            <Testimonial data={{ testimonialData }} />
          </div> : ''
      }
      {
        (estimateC) ?
          <div className={styles.estimateDiv}>
            <Estimate data={{ services, estimateData }} />
          </div> : ''
      }
    </div>
  )
};

export const getServerSideProps = async () => {
  const servicePageData = await getServicePageData();
  const services = await sanityFetch('service');
  const fontData = await sanityFetch('importFont');
  const estimateData = await sanityFetch('estimate');
  const testimonialData = await sanityFetch('testimonial');
  // insert the data only first time build the app
  await defaultDataToSanity(servicePageData, 'servicePage')
  return {
    props: {
      servicePageData,
      fontData,
      services,
      estimateData,
      testimonialData
    }
  };
};

export default Service;