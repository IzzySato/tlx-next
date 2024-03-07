import styles from '../styles/components/Footer.module.css';
import React, { useState, useEffect } from 'react';
import { urlFor } from '../sanityConfig';
import { AiFillPhone, AiOutlineMail } from 'react-icons/ai';
import { IoLocationSharp } from 'react-icons/io5';
import { BsCircleFill } from 'react-icons/bs';

const Footer = ({data: { businessInfo }}) => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [logo, setLogo] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [province, setProvince] = useState('');
  const [country, setCountry] = useState('');
  const [logoStyle, setLogoStyle] = useState('');

  useEffect(() => {
    setName(businessInfo?.businessName);
    setPhoneNumber(businessInfo?.phone);
    setEmail(businessInfo?.email);
    setLogo(businessInfo?.logo);
    setStreet(businessInfo?.street);
    setCity(businessInfo?.city);
    setProvince(businessInfo?.province);
    setCountry(businessInfo?.country);
    setLogoStyle(businessInfo?.logoStyles);
  }, [businessInfo]);

  return (
    <footer className={`${styles.footer} ${styles[logoStyle]} componentContainer`}>
      <div className={styles.gridDiv}>
        <div className={styles.logoNameDiv}>
          <div className={styles.nameDiv}>
            <h2 className={`${styles.info}
                            ${styles.companyName}`}>
                  {name}
            </h2>
          </div>
          <div className={`${styles.logoDiv} ${styles.logoDiv}`}>
            {
              logo &&
              <img alt='business logo' className={styles.logoImg} src={urlFor(logo).url()} />
            }
          </div>
        </div>
        <div className={styles.infoDiv}>
          <div className={`${styles.info} ${styles.phoneDiv}`}>
            <a className={styles.infoAnchor} href={`tel:${phoneNumber}`}>
              <span className={`${styles.phoneIcon} ${styles.icon}`}>
                <AiFillPhone />
              </span>
              <span className={styles.phone}>
                {phoneNumber}
              </span>
            </a>
          </div>
          <div className={`${styles.info} ${styles.emailDiv}`} >
            <a className={styles.infoAnchor} href={`mailto:${email}`}>
              <span className={`${styles.emailIcon} ${styles.icon}`}>
                <AiOutlineMail />
              </span>
              <span className={styles.email}>
                {email}
              </span>
            </a>
          </div>
          <div className={`${styles.info} ${styles.addressDiv}`} >
              <span className={`${styles.addressIcon} ${styles.icon}`}>
                <IoLocationSharp />
              </span>
              <div className={styles.addressInfoGrid}>
                <span className={`${styles.street} ${styles.address}`}>{street}</span>
                <span className={`${styles.city} ${styles.address}`}>{city}</span>
                <span className={styles.break}></span>
                <span className={`${styles.province} ${styles.address}`}>{province}</span>
                <span className={`${styles.country} ${styles.address}`}>{country}</span>
              </div>
          </div>
        </div>
          <div className={styles.credentials}>
            <ul>
              <li><span><BsCircleFill/></span>Certified Red Seal Electricians</li>
              <li><span><BsCircleFill/></span>Contractor Licence LEL0203972</li>
              <li><span><BsCircleFill/></span>Worksafe BC 200362807</li>
              <li><span><BsCircleFill/></span>BC Hydro Alliance member 1048</li>
              <li><span><BsCircleFill/></span>GST 752221671</li>
              <li><span><BsCircleFill/></span>Bonded</li>
              <li><span><BsCircleFill/></span>Insured</li>
            </ul>
        </div>
      </div>
      <p className='mt-1'>&copy; Copyright TLX Electric - All Rights Reserved</p>
    </footer>
  )
};

export default Footer;