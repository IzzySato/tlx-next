import styles from '../styles/pages/Message.module.css';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { urlFor } from '../sanityConfig';
import { sanityFetch } from '../lib/sanity/sanityFetch';

const Message = ({ businessInfo }) => {
const data = useRouter();
const { status, message } = data.query;
const [logo, setLogo] = useState('');

useEffect(() => {
  setLogo(businessInfo[0].logo);
}, [businessInfo]);

  return (
    <div className={`${styles.wrapper} pageWrapper`} >
      <div className={(status) ? `${styles.msgDiv} ${styles.success}` : `${styles.msgDiv}  ${styles.error}`}>
        <div className={styles.imgContainer}>
        {
            logo &&
            <Image
            loader={() => urlFor(logo)}
            src='logo.svg'
            alt='logo'
            width={200}
            height={200}
          />
          }
        </div>
        <div>
          <h1 className={styles.msg}>{message}</h1>
          <div className={styles.msgBtn}>
            <Link className="btn" href="/">
              Back
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
};

export const getServerSideProps = async () => {
  const businessInfo = await sanityFetch('info');
  return { props: { businessInfo } };
};

export default Message;