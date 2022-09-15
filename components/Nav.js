import styles from '../styles/components/Nav.module.css';
import Link from 'next/link';
import React, { useState } from 'react';

const Nav = () => {
  const [navToggle, setNavToggle] = useState('none');

  const navFunc = () => 
    (navToggle === 'none') ? setNavToggle('block') : setNavToggle('none');
    const navData = [
      {
        routeName: '/',
        title: 'HOME'
      },
      {
        routeName: '/about',
        title: 'ABOUT US'
      },
      {
        routeName: '/service',
        title: 'SERVICES'
      },
      {
        routeName: '/contact',
        title: 'CONTACT US'
      }
    ];

  return(
    // hamburger menu for mobile
    <nav className={styles.nav}>
      <div className={styles.menuIcon} onClick={() => navFunc()}>
        <div className={styles.menuLine}></div>
        <div className={styles.menuLine}></div>
        <div className={styles.menuLine}></div>
      </div>
      {/* menu list */}
      <ul className={styles.ul} style={{ display: navToggle }}>
        {
          navData.map((nav, index) => 
            <li key={ index } className={ styles.li } onClick={ () => navFunc() }>
              <Link className={ styles.a }
                    id={ `${nav.routeName}` }
                    href={ nav.routeName }>
                      { nav.title }
              </Link>
            </li>
          )
        }
      </ul>
    </nav>
  );
};

export default Nav;