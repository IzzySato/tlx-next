import React from 'react';
import { BsFillTriangleFill } from 'react-icons/bs';
import styles from '../styles/components/MoveToTop.module.css'

const MoveToTop = () => {
  return (
    <a href="#" className={`${styles.moveTop} componentContainer`}>
      <span>TOP</span>
      <BsFillTriangleFill />
    </a>
  );
};

export default MoveToTop;
