import styles from '../styles/components/Specialties.module.css';
import React, { useState, useEffect } from 'react';
import { BsCircleFill } from 'react-icons/bs';

const Specialties = ({data: { specialties }}) => {
  const [title, setTitle] = useState('');
  const [list, setList] = useState([]);

  useEffect(() => {
    setTitle(specialties?.title);
    setList(specialties?.specialtiesList);
  }, [specialties]);

  return (
    <div className={ styles.container }>
      <h1 className={ styles.title }>{title}</h1>
      <ul>
        {
          list &&
          list.map((data, index) =>
            <li key={ index } className={styles.list}>
              <span>
                <BsCircleFill />
              </span>
              <span>
                { data }
              </span>
            </li>
          )
        }
      </ul>
    </div>
  )
};

export default Specialties;