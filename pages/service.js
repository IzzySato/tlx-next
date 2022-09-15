import styles from '../styles/pages/Service.module.css';
import React, { useState, useEffect } from 'react';
import Estimate from '../components/Estimate';
import { insertStyles } from '../Util/pageUtil';
import { sanityFetch } from '../lib/sanity/sanityFetch';
import { getServicePageData } from '../lib/sanity/data/serviceSanity';
import { defaultDataToSanity } from '../lib/sanity/build/pageBuildSanity';
import ServiceWithImg from '../components/ServiceWithImg';
import ServiceList from '../components/ServiceList';

const Service = ( { 
  servicePageData,
  fontData,
  services,
  estimateData,
}) => {
  const [serviceTitle, setServiceTitle] = useState('');
  const [isImageSlide, setIsImageSlide] = useState(false);

  useEffect(() => {
    const { 
      servicePageTitle,
      relatedStyles,
      imageSlide
    } = servicePageData[0];
    setServiceTitle(servicePageTitle);
    insertStyles(relatedStyles);
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
      <div className={styles.estimateDiv}>
        <Estimate data={ { services, estimateData } }/>
      </div>
    </div>
  )
};

export const getServerSideProps = async () => {
  const servicePageData = await getServicePageData();
  const services = await sanityFetch('service');
  const fontData = await sanityFetch('importFont');
  const estimateData = await sanityFetch('estimate');
  await defaultDataToSanity(servicePageData, 'servicePage');
  return { props: { 
    servicePageData,
    fontData,
    services,
    estimateData,
  }};
};

export default Service;