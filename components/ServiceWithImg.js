import styles from '../styles/components/ServiceWithImg.module.css';
import React, { useState, useEffect } from 'react';
import { urlFor } from '../sanityConfig';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';

const ServiceWithImg = ({ data: { services, isImageSlide } }) => {
  const [serviceData, setServiceData] = useState([]);

  useEffect(() => {
    const serviceListWithImg = services.filter((s) => s.withImage)
      .sort((a, b) => a.order - b.order);
    setServiceData(serviceListWithImg);
  }, [
    services,
    isImageSlide
  ]);

  const [sliderRef] = useKeenSlider(
    {
      loop: true,
    },
    [
      (slider) => {
        let timeout
        let mouseOver = false
        function clearNextTimeout() {
          clearTimeout(timeout)
        }
        function nextTimeout() {
          clearTimeout(timeout)
          if (mouseOver) return
          timeout = setTimeout(() => {
            slider.next()
          }, 3000)
        }
        slider.on("created", () => {
          slider.container.addEventListener("mouseover", () => {
            mouseOver = true
            clearNextTimeout()
          })
          slider.container.addEventListener("mouseout", () => {
            mouseOver = false
            nextTimeout()
          })
          nextTimeout()
        })
        slider.on("dragStarted", clearNextTimeout)
        slider.on("animationEnded", nextTimeout)
        slider.on("updated", nextTimeout)
      },
    ]
  )

  return (
    <div>
      <div className={(isImageSlide) ? `${styles.serviceDiv} ${styles.slideContainer}`
        : `${styles.serviceDiv} ${styles.serviceGrid}`}>
        <ul className={(serviceData.length % 2 === 0) ?
          `${styles.serviceUl} ${styles.evenServices}`
          : `${styles.serviceUl} ${styles.oddServices}`}>
          {
            serviceData &&
            serviceData.map((s, index) =>
              <li className={
                (s.withDescription) ? `` : `${styles.serviceNoDescription}`
              }
                key={index}
              >
                <div className={styles.serviceInfoDiv}>
                  <p className={styles.serviceName}>
                    {s.serviceName}
                  </p>
                  <p className={styles.serviceDescriptionP}>
                    {s.serviceDesc}
                  </p>
                </div>
                {
                  (isImageSlide) ?
                    <div ref={sliderRef} className={`keen-slider ${styles.slideDiv}`}>
                    { s.serviceImgs.map((img, imgIndex) =>
                          <div
                            key={imgIndex}
                            className={`keen-slider__slide ${styles.slide}`}
                            style={{ backgroundImage: `url(${urlFor(img)})` }}>
                          </div>
                        )}
                    </div> :
                    <div className={styles.serviceImg}
                      style={{ backgroundImage: `url(${urlFor(s.serviceImgs[0])})` }}
                    >
                    </div>
                }
              </li>
            )}
        </ul>
      </div>
    </div>
  )
};

export default ServiceWithImg;
