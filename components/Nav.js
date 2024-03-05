import Link from 'next/link';
import styles from '../styles/components/Nav.module.css';
import React, { useState } from 'react';

const Nav = () => {
  const [navToggle, setNavToggle] = useState('none');

  const mobileToggleNav = () => {
    navToggle === 'none' ? setNavToggle('block') : setNavToggle('none');
  }

  const navData = [
    {
      id: 'home',
      routeName: '/',
      title: 'HOME',
    },
    {
      id: 'about',
      routeName: '/about',
      title: 'ABOUT US',
    },
    {
      id: 'service',
      routeName: '/service',
      title: 'SERVICES',
    },
    {
      id: 'gallery',
      routeName: '/gallery',
      title: 'GALLERY',
    },
    {
      id: 'contact',
      routeName: '/contact',
      title: 'CONTACT US',
    },
  ];

  return (
    // hamburger menu for mobile
    <nav className={`${styles.nav} navContainer`}>
      <div className={styles.menuIcon} onClick={() => mobileToggleNav()}>
        <div className={styles.menuLine}></div>
        <div className={styles.menuLine}></div>
        <div className={styles.menuLine}></div>
      </div>
      {/* menu list */}
      <ul className={styles.ul} style={{ display: navToggle }}>
        {navData.map((nav, index) => (
          <li key={index} className={styles.li}>
            <Link href={nav.routeName}>{nav.title}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Nav;
