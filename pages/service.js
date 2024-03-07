import styles from '../styles/pages/Service.module.css';
import React, { useState, useEffect } from 'react';
import Estimate from '../components/Estimate';
import { sanityFetch } from '../lib/sanity/sanityFetch';
import { getServicePageData } from '../lib/sanity/data/serviceSanity';
import Testimonial from '../components/Testimonial';
import ServiceWithImg from '../components/ServiceWithImg';
import ServiceList from '../components/ServiceList';
import SupplierNetwork from '../components/SupplierNetwork';

const Service = ({
  servicePageData,
  services,
  estimateData,
  testimonialData,
  supplierNetwork,
}) => {
  const [serviceTitle, setServiceTitle] = useState('');
  const [isEstimate, setIsEstimate] = useState(false);
  const [isTestimonial, setIsTestimonial] = useState(false);
  const [isImageSlide, setIsImageSlide] = useState(false);

  useEffect(() => {
    const {
      servicePageTitle,
      estimateComponent,
      testimonialComponent,
      imageSlide,
    } = servicePageData[0];
    setServiceTitle(servicePageTitle);
    setIsEstimate(estimateComponent);
    setIsTestimonial(testimonialComponent);
    setIsImageSlide(imageSlide);
  }, [servicePageData, services]);

  return (
    <div className={`${styles.container} wrapper pageWrapper`}>
      <div className={`${styles.serviceDiv}`}>
        <h1 className={styles.serviceTitle}>{serviceTitle}</h1>
        {/* service list with image */}
        {isImageSlide && (
          <div className={styles.serviceWithImgDiv}>
            <ServiceWithImg data={{ services, isImageSlide }} />
          </div>
        )}
        {/* service list without image */}
        <div className={styles.serviceListDiv}>
          <ServiceList data={{ services }} />
        </div>
      </div>
      {supplierNetwork && (
        <div>
          <SupplierNetwork data={{ supplierNetwork }} />
        </div>
      )}
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
  const servicePageData = await getServicePageData();
  const services = await sanityFetch('service');
  const estimateData = await sanityFetch('estimate');
  const testimonialData = await sanityFetch('testimonial');
  const supplierNetwork = await sanityFetch('supplierNetwork');
  return {
    props: {
      servicePageData,
      services,
      estimateData,
      testimonialData,
      supplierNetwork,
    },
  };
};

export default Service;
