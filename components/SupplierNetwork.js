import styles from '../styles/components/SupplierNetwork.module.css';
import React from 'react';

const SupplierNetwork = ({ data: { supplierNetwork } }) => {
  return (
    <ul className={`${styles.container} componentContainer`}>
        {
          supplierNetwork.map((s, index) =>
          <li key={ index } className='mb-2'>
            <h2 className='mb-1 categoryTitle'>{s.title}</h2>
            <div>
              {
                s.names.join(', ')
              }
            </div>
          </li>
          )
        }
    </ul>
  );
};

export default SupplierNetwork;