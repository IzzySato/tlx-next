import styles from '../styles/pages/Home.module.css';
import React, { useState, useEffect } from 'react';
import { urlFor } from '../sanityConfig';
import Estimate from '../components/Estimate';
import BusinessInfo from '../components/BusinessInfo';
import { sanityFetch } from '../lib/sanity/sanityFetch';
import { getHomeData } from '../lib/sanity/data/homeSanity';
import { getGlobalData, globalCSSInit, insertStyles } from '../Util/pageUtil';
import { defaultDataToSanity } from '../lib/sanity/build/pageBuildSanity';
import Testimonial from '../components/Testimonial';
import ServiceWithImg from '../components/ServiceWithImg';
import ServiceList from '../components/ServiceList';

const Home = ({
  homeData,
  services,
  businessInfo,
  globalData,
  estimateData,
  testimonialData }) => {

  const [homeImage, setHomeImage] = useState('');
  const [title, setTitle] = useState('');
  const [isImageSlide, setIsImageSlide] = useState(false);
  const [estimateC, setEstimateC] = useState(false);
  const [serviceC, setServiceC] = useState(false);
  const [testimonialC, setTestimonialC] = useState(false);
  const [businessBoxStyle, setBusinessBoxStyle] = useState('');

  useEffect(() => {
    const {
      homeMainImg,
      homeTitle,
      relatedStyles,
      estimateComponent,
      serviceComponent,
      testimonialComponent,
      imageSlide,
      businessInfoBoxStyle
    } = homeData[0];

    setBusinessBoxStyle(businessInfoBoxStyle);
    setHomeImage(homeMainImg);
    setTitle(homeTitle);
    globalCSSInit(globalData);
    insertStyles(relatedStyles);
    setEstimateC(estimateComponent);
    setServiceC(serviceComponent);
    setTestimonialC(testimonialComponent);
    setIsImageSlide(imageSlide);
  }, [
    homeData,
    businessInfo,
    globalData,
    estimateData
  ]);

  return (
    <div className={`${styles.container} pageWrapper`}>
      {
        homeImage &&
        <div className={styles.imgContainer}
          style={{ backgroundImage: `url(${urlFor(homeImage)})` }}>
        </div>
      }
      <div className={(homeImage) ?
        `${styles.withImg} ${styles.businessInfoContainer} ${styles[businessBoxStyle]}`
        : `${styles.noImg} ${styles.businessInfoContainer} ${styles[businessBoxStyle]}`}>
        <BusinessInfo data={{ businessInfo: businessInfo[0] }} />
      </div>
      {
        (serviceC) ?
          <div className={styles.serviceDiv}>
            <h2 className={`title ${styles.serviceTitle}`}>{title}</h2>
            {/* service list with image */}
            <div className={styles.serviceWithImgDiv}>
              <ServiceWithImg data={{ services, isImageSlide }} />
            </div>
            {/* service list without image */}
            <div className={styles.serviceListDiv}>
              <ServiceList data={{ services }} />
            </div>
          </div>
          : ''
      }
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
  const homeData = await getHomeData();
  const services = await sanityFetch('service');
  const businessInfo = await sanityFetch('info');
  const estimateData = await sanityFetch('estimate');
  const testimonialData = await sanityFetch('testimonial');
  // insert the data only first time loaded this page
  await defaultDataToSanity(homeData, 'homePage');
  // add global data only once on landing page
  const globalData = await getGlobalData();
  return {
    props: {
      homeData,
      services,
      businessInfo,
      globalData,
      estimateData,
      testimonialData
    }
  };
};

export default Home;
