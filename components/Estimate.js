import React, { useRef, useState, useEffect} from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/components/Estimate.module.css';
import ReCAPTCHA from 'react-google-recaptcha';
import { sendEmmailClient } from '../pages/api/email/emailClient';
import { recaptchaClient } from '../pages/api/recaptcha';
import Select from 'react-select';
import { insertCustomerClient } from '../pages/api/customer/customerClient';

const Estimate = ({ data: { services, estimateData } }) => {
  const [title, setTitle] = useState('');
  const [fName, setFName] = useState('');
  const [lName, setLName] = useState('');
  const [email, setEmail] = useState('');
  const [tel, setTel] = useState('');
  const [address, setAddress] = useState('');
  const [service, setService] = useState([]);
  const [comments, setComments] = useState('');
  const [readyToSendEmail, setReadyToSendEmail] = useState(false);
  const [serviceOption, setServiceOption] = useState([]);
  const [formStyle, setFormStyle] = useState('');

  const router = useRouter();
  const recaptchaRef = useRef(null);

  const recaptchaNotExist = () => {
    if(recaptchaRef.current.captcha.hasChildNodes()) {
      router.reload(window.location.pathname);
    }
  };

  useEffect(() => {
    setTitle(estimateData[0]?.title);
    setFormStyle(estimateData[0]?.formStyles);
    recaptchaNotExist();
    const options = services.filter((s) => s.addEstimateServiceList)
                            .map(({ serviceName }) => 
                               ({ value : serviceName, label: serviceName }));
    setServiceOption(options);
  }, []);

  const checkRecaptcha = async () => {
    const recaptchaValue = recaptchaRef.current.getValue();
    const res = await recaptchaClient(recaptchaValue);
    if (res.status) {
      setReadyToSendEmail(true);
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    const selectedServices = service.map(s => s.value);
    if (readyToSendEmail) {
      const res = await sendEmmailClient(
        fName,
        lName,
        email,
        tel,
        address,
        selectedServices,
        comments
        );
        await insertCustomerClient(
          fName,
          lName,
          email,
          tel,
          address,
          comments,
          selectedServices
        );
        router.push({ pathname: '/message', query: res });
    } else return;
  };

  return (
    <div className={`${styles.container} ${styles[formStyle]} componentContainer`}>
      <h3 className={styles.estimateTitle}>{title}</h3>
      <form>
        <fieldset>
          <label className={`${styles.label} ${styles.fNameLabel}`}
                  htmlFor="fName">
                  First Name:
          </label>
          <input className={styles.input}
                 id="fName"
                 type="text"
                 placeholder="John"
                 name="fName"
                 onChange={(e) => 
                  setFName(e.currentTarget.value)}/><br/>
        </fieldset>
        <fieldset>
          <label className={`${styles.label} ${styles.lNameLabel}`}
                 htmlFor="lName">
                  Last Name:
          </label>
          <input className={styles.input}
                 id="lName" type="text"
                 placeholder="Doe"
                 name="lName"
                 onChange={(e) => 
                  setLName(e.currentTarget.value)}/><br/>
        </fieldset>
        <fieldset>
          <label className={`${styles.label} ${styles.emailLabel}`}
                 htmlFor="email">
                  Email:
          </label>
          <input className={styles.input}
                 id="email"
                 type="email"
                 placeholder="example.com"
                 name="email"
                 onChange={(e) => 
                  setEmail(e.currentTarget.value)}/><br/>
        </fieldset>
        <fieldset>
          <label className={`${styles.label} ${styles.telLabel}`}
                 htmlFor="tel">
                  Phone:
          </label>
          <input className={styles.input}
                 id="tel"
                 type="tel"
                 placeholder="123 123 1234"
                 name="tel"
                 onChange={(e) => 
                  setTel(e.currentTarget.value)}/><br/>
        </fieldset>
        <fieldset>
          <label className={`${styles.label} ${styles.addressLabel}`}
                 htmlFor="address">
                  Address:
          </label>
          <input className={styles.input}
                 id="address"
                 type="text"
                 placeholder="123 main street Burnaby"
                 name="address"
                 onChange={(e) => 
                  setAddress(e.currentTarget.value)}/>
        </fieldset>
        <fieldset className={styles.serviceSelect}>
          <label className={`${styles.label} ${styles.serviceOption}`}
                 htmlFor="services">
                  Select the service:
          </label>
          <Select isMulti
                  options= { serviceOption }
                  id="select"
                  onChange={(e) => setService(e)}/>
        </fieldset>
        <fieldset className={styles.commentFieldset}>
          <label className={`${styles.label} ${styles.commentLabel}`}
                 htmlFor="comment">
                  Comments:
          </label>
          <textarea className={styles.input}
                    id="comment"
                    name="comments"
                    rows={4}
                    cols={50}
                    onChange={(e) => 
                      setComments(e.currentTarget.value)}>
          </textarea><br/>
        </fieldset>
        <div className='recaptchaDiv'>
          {
            recaptchaRef && 
            <ReCAPTCHA
            ref={ recaptchaRef }
            sitekey={ process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY }
            onChange={ checkRecaptcha }/>
          }
        </div>
        <button
          type="submit"
          className={styles.submitBtn}
          style={{opacity: `${(readyToSendEmail) ? 1 : 0.3 }`}}
          onClick={async(e) => await submit(e)}>
            Send
        </button>
      </form>
    </div>
  )
};

export default Estimate;