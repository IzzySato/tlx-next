import styles from '../styles/components/ServiceList.module.css';
import React, { useState, useEffect } from 'react';
import { AiFillCheckCircle } from 'react-icons/ai';

const ServiceList = ({ data: { services } }) => {
  const [serviceData, setServiceData] = useState([]);

  useEffect(() => {
    const serviceListWithoutImg = services.filter((s) => !s.withImage)
                                          .sort((a, b) => a.order - b.order);
   setServiceData(serviceListWithoutImg);
  }, [
    services
  ]);

  return (
    <ul className={`${styles.serviceUlList}`}>
        {
          serviceData &&
          serviceData.map((s, index) =>
          <li key={ index }
              className={(s.withDescription) ? `${styles.serviceWithoutImgLi}`
              : `${styles.serviceWithoutImgLi} ${styles.serviceNoDescription}`}
              >
            <span className={styles.serviceIcons}>
              <AiFillCheckCircle/>
            </span>
            <span className={styles.serviceName}>
                  { s.serviceName }
            </span>
            <span className={styles.serviceDescriptionP}>
                  { s.serviceDesc }
            </span>
          </li>
          )
        }
    </ul>
  );
};

export default ServiceList;