import styles from '../styles/pages/Index.module.css';
import React from 'react';
import { sanityFetch } from '../lib/sanity/sanityFetch';
import { getHomeData } from '../lib/sanity/data/homeSanity';
import Testimonial from '../components/Testimonial';
import ServiceList from '../components/ServiceList';
import Banner from '../components/Banner';
import MobileView from '../components/MobileView';
import { getAboutData } from '../lib/sanity/data/aboutSanity';

const Home = ({
  homeData,
  aboutData,
  services,
  testimonialData,
  teammate,
  gallery,
}) => {
  return (
    <div className={`${styles.container} pageWrapper`}>
      {homeData[0].homeMainImg && (
        <Banner homeImage={homeData[0].homeMainImg} />
      )}
      {/* service list */}
      {services && services.length > 0 && (
        <div className={styles.serviceDiv}>
          <h2 className={`title ${styles.serviceTitle} mb-2`}>
            {homeData[0].homeTitle}
          </h2>
          <div className={styles.serviceListDiv}>
            <ServiceList data={{ services }} />
          </div>
        </div>
      )}
      {homeData[0].testimonialComponent && (
        <div className={styles.testimonialDiv}>
          <Testimonial data={{ testimonialData }} />
        </div>
      )}
      {aboutData && teammate && (
        <div className={styles.mobileView}>
          <MobileView
            aboutData={{
              title: aboutData[0]?.aboutTitle,
              image: aboutData[0]?.aboutImg,
              desc: aboutData[0]?.aboutDesc,
              box: aboutData[0]?.titleDiscBox,
            }}
            teammates={teammate}
            galleryData={gallery}
          />
        </div>
      )}
    </div>
  );
};

export const getServerSideProps = async () => {
  const homeData = await getHomeData();
  const services = await sanityFetch('service');
  const testimonialData = await sanityFetch('testimonial');
  const aboutData = await getAboutData();
  const teammate = await sanityFetch('teammate');
  const gallery = await sanityFetch('gallery');
  return {
    props: {
      homeData,
      services,
      testimonialData,
      aboutData,
      teammate,
      gallery,
    },
  };
};

export default Home;
