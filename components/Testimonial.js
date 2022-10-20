import styles from '../styles/components/Testimonial.module.css';
import React, { useState, useEffect } from 'react';
import { GiRoundStar } from 'react-icons/gi';
import { BiRightArrow, BiLeftArrow } from 'react-icons/bi';

const Testimonial = ({ data: { testimonialData } }) => {
  const [currentDeskTopNum, setCurrentDeskTopNum] = useState(0);
  const [currentMobileNum, setCurrentMobileNum] = useState(0);
  const [selectedDeskTopData, setSelectedDeskTopData] = useState([]);
  const [mobileSelectedData, setMobileSelectedData] = useState([]);

  const displayNumDeskTop = 3;
  const displayNumMobile = 1;

  const getSelectedData = (currentNum, displayNum) =>
    testimonialData.filter((d, index) => (index >= currentNum && index < (currentNum + displayNum)))

  useEffect(() => {
    setSelectedDeskTopData(getSelectedData(0, displayNumDeskTop));
    setMobileSelectedData(getSelectedData(0, displayNumMobile));
  }, []);

  const prevTestimonial = (
    currentNum,
    displayNum,
    setCurrentNum,
    setSelectedData) => {
    const newCurrentNum = currentNum - displayNum;
    setCurrentNum(newCurrentNum);
    setSelectedData(getSelectedData(newCurrentNum, displayNum));
  };

  const nextTestimonial = (
    currentNum,
    displayNum,
    setCurrentNum,
    setSelectedData) => {
    const newCurrentNum = currentNum + displayNum;
    setCurrentNum(newCurrentNum);
    setSelectedData(getSelectedData(newCurrentNum, displayNum));
  };

  return (
    <div className={`${styles.container} componentContainer`}>

      { /* desktop view desplay three testimonial */}

      <div className={`${styles.desktop} ${styles.containerDiv}`}>
        {
          (currentDeskTopNum - displayNumDeskTop >= 0) ?
            <button className={styles.leftIcon}
              onClick={() => prevTestimonial(
                currentDeskTopNum,
                displayNumDeskTop,
                setCurrentDeskTopNum,
                setSelectedDeskTopData
              )}>
              <BiLeftArrow />
            </button> : <span></span>
        }
        <ul className={`${styles.gridContainer}`}>
          {
            selectedDeskTopData &&
            selectedDeskTopData.map((data, index) => (
              <li key={index} className={styles.list}>
                <div className={styles.stars}>
                  <span>
                    <GiRoundStar />
                  </span>
                  <span>
                    <GiRoundStar />
                  </span>
                  <span>
                    <GiRoundStar />
                  </span>
                  <span>
                    <GiRoundStar />
                  </span>
                  <span>
                    <GiRoundStar />
                  </span>
                </div>
                <p className={styles.comments}>
                  &quot; {data.comments} &quot;
                </p>
                <p className={styles.name}>
                  - {data.name}
                </p>
              </li>
            ))
          }
        </ul>
        {
          (testimonialData.length > currentDeskTopNum + displayNumDeskTop) ?
            <button className={styles.rightIcon}
              onClick={() => nextTestimonial(
                currentDeskTopNum,
                displayNumDeskTop,
                setCurrentDeskTopNum,
                setSelectedDeskTopData
              )}>
              <BiRightArrow />
            </button> : <span></span>
        }
      </div>

      { /* mobile view desplay one testimonial */}

      <div className={`${styles.mobile} ${styles.containerDiv}`}>
        {
          (currentMobileNum - displayNumMobile >= 0) ?
            <button className={styles.leftIcon}
              onClick={() => prevTestimonial(
                currentMobileNum,
                displayNumMobile,
                setCurrentMobileNum,
                setMobileSelectedData
              )}>
              <BiLeftArrow />
            </button> : <span></span>
        }
        <ul className={`${styles.gridContainer}`}>
          {
            mobileSelectedData &&
            mobileSelectedData.map((data, index) => (
              <li key={index} className={styles.list}>
                <div className={styles.stars}>
                  <span>
                    <GiRoundStar />
                  </span>
                  <span>
                    <GiRoundStar />
                  </span>
                  <span>
                    <GiRoundStar />
                  </span>
                  <span>
                    <GiRoundStar />
                  </span>
                  <span>
                    <GiRoundStar />
                  </span>
                </div>
                <p className={styles.comments}>
                  &quot; {data.comments} &quot;
                </p>
                <p className={styles.name}>
                  - {data.name}
                </p>
              </li>
            ))
          }
        </ul>
        {
          (testimonialData.length > currentMobileNum + displayNumMobile) ?
            <button className={styles.rightIcon}
              onClick={() => nextTestimonial(
                currentMobileNum,
                displayNumMobile,
                setCurrentMobileNum,
                setMobileSelectedData
              )}>
              <BiRightArrow />
            </button> : <span></span>
        }
      </div>

    </div>
  )
};

export default Testimonial;