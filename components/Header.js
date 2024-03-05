import styles from '../styles/components/Header.module.css';
import BusinessInfo from './BusinessInfo';

const Header = ({ data: { businessInfo } }) => {
  return (<div className={`${styles.container} headerContainer`}>
    {
      businessInfo && <BusinessInfo data={{ businessInfo }}/>
    }
  </div>)
}


export default Header;