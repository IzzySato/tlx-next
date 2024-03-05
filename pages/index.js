import styles from '../styles/pages/home/Index.module.css';
import React, { useState, useEffect } from 'react';
import Estimate from '../components/Estimate';
import { sanityFetch } from '../lib/sanity/sanityFetch';
import { getHomeData } from '../lib/sanity/data/homeSanity';
import Testimonial from '../components/Testimonial';
import ServiceWithImg from '../components/ServiceWithImg';
import ServiceList from '../components/ServiceList';
import Banner from './home/components/banner';

const Home = ({
  homeData,
  services,
  businessInfo,
  estimateData,
  testimonialData,
}) => {
  const [homeImage, setHomeImage] = useState('');
  const [title, setTitle] = useState('');
  const [isImageSlide, setIsImageSlide] = useState(false);
  const [estimateC, setEstimateC] = useState(false);
  const [serviceC, setServiceC] = useState(false);
  const [testimonialC, setTestimonialC] = useState(false);
  const [isServiceImages, setIsServiceImages] = useState(false);

  useEffect(() => {
    const {
      homeMainImg,
      homeTitle,
      estimateComponent,
      serviceComponent,
      testimonialComponent,
      imageSlide,
    } = homeData[0];
    setHomeImage(homeMainImg);
    setTitle(homeTitle);
    setEstimateC(estimateComponent);
    setServiceC(serviceComponent);
    setTestimonialC(testimonialComponent);
    setIsImageSlide(imageSlide);
  }, [homeData, businessInfo, estimateData]);

  useEffect(() => {
    const serviceWithImages = services.filter(({ withImage }) => withImage);
    setIsServiceImages(serviceWithImages.length > 0);
  }, [services]);

  return (
    <div className={`${styles.container} pageWrapper`}>
      {
        homeImage && <Banner homeImage={homeImage}/>
      }
      {serviceC ? (
        <div className={styles.serviceDiv}>
          <h2 className={`title ${styles.serviceTitle}`}>{title}</h2>
          {/* service list with image */}
          {isServiceImages && (
            <div className={styles.serviceWithImgDiv}>
              <ServiceWithImg data={{ services, isImageSlide }} />
            </div>
          )}
          {/* service list without image */}
          <div className={styles.serviceListDiv}>
            <ServiceList data={{ services }} />
          </div>
        </div>
      ) : (
        ''
      )}
      {testimonialC ? (
        <div className={styles.testimonialDiv}>
          <Testimonial data={{ testimonialData }} />
        </div>
      ) : (
        ''
      )}
      {estimateC ? (
        <div className={styles.estimateDiv}>
          <Estimate data={{ services, estimateData }} />
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export const getServerSideProps = async () => {
  const homeData = await getHomeData();
  const services = await sanityFetch('service');
  const businessInfo = await sanityFetch('info');
  const estimateData = await sanityFetch('estimate');
  const testimonialData = await sanityFetch('testimonial');
  return {
    props: {
      homeData,
      services,
      businessInfo,
      estimateData,
      testimonialData,
    },
  };
};

export default Home;
