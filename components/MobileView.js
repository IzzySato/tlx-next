import React from 'react';
import Teammates from './about/Teammates';
import AboutMain from './about/Index';
import GalleryImages from './gallery';
import MoveToTop from './MoveToTop';

const MobileView = ({ aboutData, teammates, galleryData }) => {
  return (
    <>
      <AboutMain
        image={aboutData.image}
        title={aboutData.title}
        description={aboutData.desc}
        box={aboutData.box}
      />
      <div className='mt-2'>
        <Teammates teammates={teammates} />
      </div>
      <GalleryImages data={galleryData}/>
      <MoveToTop />
    </>
  );
};

export default MobileView;
