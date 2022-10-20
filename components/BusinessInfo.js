import styles from '../styles/components/BusinessInfo.module.css';
import React, { useState, useEffect } from 'react';
import { urlFor } from '../sanityConfig';
import Image from 'next/image';
import { AiFillPhone, AiOutlineMail } from 'react-icons/ai';
import { IoLocationSharp } from 'react-icons/io5';

const BusinessInfo = ({ data }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [logo, setLogo] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [province, setProvince] = useState('');
  const [country, setCountry] = useState('');
  const [logoStyle, setLogoStyle] = useState('');

  useEffect(() => {
    setName(data?.businessInfo?.businessName);
    setPhone(data?.businessInfo?.phone);
    setEmail(data?.businessInfo?.email);
    setLogo(data?.businessInfo?.logo);
    setStreet(data?.businessInfo?.street);
    setCity(data?.businessInfo?.city);
    setProvince(data?.businessInfo?.province);
    setCountry(data?.businessInfo?.country);
    setLogoStyle(data?.businessInfo?.logoStyles);
  }, [data]);

  return (
    <div className={`${styles.container} componentContainer`}>
        <div className={`${styles.contactDiv} ${styles[logoStyle]}`}>
          <div className={styles.logoNameDiv}>
            <div className={`${styles.info} ${styles.businessNameDiv}`}>
              <h2 className={`${styles.info} ${styles.businessName}`}>
                {name}
              </h2>
            </div>
            <div className={`${styles.info} ${styles.logoDiv}`}>
              {
                logo &&
                <img className={styles.logoImg} src={urlFor(logo).url()} />
                // <Image
                //   loader={() => urlFor(logo)}
                //   src='logo.svg'
                //   alt='logo'
                //   width={200}
                //   height={150}
                // />
              }
            </div>
          </div>
          <div className={styles.infoDiv}>
            <div className={`${styles.info} ${styles.phoneDiv}`}>
              <a className={`${styles.infoAnchor} ${styles.phone}`} href={`tel:${phone}`}>
                <span className={`${styles.phoneIcon} ${styles.icon}`}>
                  <AiFillPhone />
                </span>
                <span>
                  {phone}
                </span>
              </a>
            </div>
            <div className={`${styles.info} ${styles.emailDiv}`} >
              <a className={`${styles.infoAnchor} ${styles.email}`} href={`mailto:${email}`}>
                <span className={`${styles.emailIcon} ${styles.icon}`}>
                  <AiOutlineMail />
                </span>
                <span>
                  {email}
                </span>
              </a>
            </div>
            <div className={`${styles.info} ${styles.addressGrid}`} >
              <span className={`${styles.addressIcon} ${styles.icon}`}>
                <IoLocationSharp />
              </span>
              <div className={styles.addressDiv}>
                <span className={`${styles.street} ${styles.address}`}>{street}</span>
                <span className={styles.streetBreak}></span>
                <span className={`${styles.city} ${styles.address}`}>{city}</span>
                <span className={styles.cityBreak}></span>
                <span className={`${styles.province} ${styles.address}`}>{province}</span>
                <span className={`${styles.country} ${styles.address}`}>{country}</span>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
};


export default BusinessInfo;
