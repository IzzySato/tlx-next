import styles from '../styles/pages/Index.module.css';
import React, { useState, useEffect } from 'react';
import { sanityFetch } from '../lib/sanity/sanityFetch';
import { getHomeData } from '../lib/sanity/data/homeSanity';
import Testimonial from '../components/Testimonial';
import ServiceList from '../components/ServiceList';
import Banner from '../components/Banner';

const Home = ({ homeData, services, testimonialData, globalData }) => {
  const [homeImage, setHomeImage] = useState('');
  const [title, setTitle] = useState('');
  const [isTestimonial, setIsTestimonial] = useState(false);

  useEffect(() => {
    const { homeMainImg, homeTitle, testimonialComponent } =
      homeData[0];
    setHomeImage(homeMainImg);
    setTitle(homeTitle);
    setIsTestimonial(testimonialComponent);
  }, [homeData]);

  return (
    <div className={`${styles.container} pageWrapper`}>
      {homeImage && <Banner homeImage={homeImage} />}
      {/* service list */}
      {services && services.length > 0 && (
        <div className={styles.serviceDiv}>
          <h2 className={`title ${styles.serviceTitle}`}>{title}</h2>
          <div className={styles.serviceListDiv}>
            <ServiceList data={{ services }} />
          </div>
        </div>
      )}
      {isTestimonial && (
        <div className={styles.testimonialDiv}>
          <Testimonial data={{ testimonialData }} />
        </div>
      )}
    </div>
  );
};

export const getServerSideProps = async () => {
  const homeData = await getHomeData();
  const services = await sanityFetch('service');
  const testimonialData = await sanityFetch('testimonial');
  return {
    props: {
      homeData,
      services,
      testimonialData,
    },
  };
};

export default Home;
