import { useEffect } from 'react';
import styles from '../styles/components/Header.module.css';
import BusinessInfo from './BusinessInfo';

const Header = ({ data: { businessInfo } }) => {
  return (<div className={styles.container}>
    {
      businessInfo && <BusinessInfo data={{ businessInfo }}/>
    }
  </div>)
}


export default Header;