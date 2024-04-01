import React from 'react';
import styles from '../../styles/components/about/Teammate.module.css';
import { textListUl } from '../../Util/textFormat';

const Teammates = ({ teammates }) => {
  return (
    <div className={`componentContainer`}>
      <h2 className={styles.teamTitle}>Our Team</h2>
      <div className={styles.grid}>
        {teammates &&
          teammates.map(
            ({ fullName, title, subTitle, description, education }) => (
              <div key={fullName} className={styles.teammateContainer}>
                <h3 className={styles.fullName}>{fullName}</h3>
                <h4 className={styles.title}>{title}</h4>
                <h5 className={styles.subTitle}>{subTitle}</h5>
                <p className={styles.description}>{textListUl(description)}</p>
                <h5 className={styles.educationTitle}>Education</h5>
                <p className={styles.education}>{textListUl(education)}</p>
              </div>
            )
          )}
      </div>
    </div>
  );
};

export default Teammates;
