import styles from '../styles/components/ContactHeader.module.css';
import React, { useState, useEffect } from 'react';
import { AiFillPhone, AiOutlineMail } from 'react-icons/ai';

const ContactHeader = ({data: { businessInfo }}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    setName(businessInfo?.businessName);
    setPhone(businessInfo?.phone);
    setEmail(businessInfo?.email);
  }, [businessInfo]);

  return (
    <div className={styles.container}>
      <h2 className={`${styles.info} ${styles.companyName}`}>{name}</h2>
      <div className={styles.info}>
        <a className={styles.infoAnchor} href={`tel:${phone}`}>
          <span className={`${styles.phoneIcon} ${styles.icon}`}>
            <AiFillPhone />
          </span>
          <span className={styles.phoneText}>{phone}</span>
        </a>
      </div>
      <div className={styles.info} >
        <a className={styles.infoAnchor} href={`mailto:${email}`}>
          <span className={`${styles.emailIcon} ${styles.icon}`}>
            <AiOutlineMail />
          </span>
          <span className={styles.emailText}>{email}</span>
        </a>
      </div>
    </div>
  )
};

export default ContactHeader;