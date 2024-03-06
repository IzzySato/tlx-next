import Head from 'next/head';
import Nav from './Nav';
import Footer from './Footer';
import ContactHeader from './ContactHeader';
import Loading from './Loading';
import Header from './Header';
import { useEffect, useState } from 'react';
import { globalCSSInit } from '../Util/pageUtil';

const Layout = ({ children }) => {
  const [businessData, setBusinessData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getBusinessData = async () => {
    setLoading(true);
    const res = await fetch('/api/businessInfo');
    const { businessInfo } = await res.json();
    setBusinessData(businessInfo);
    setLoading(false);
  };

  useEffect(() => {
    getBusinessData();
    globalCSSInit();
  }, []);

  return (
    <>
      {loading && <Loading />}
      {!loading && businessData.length > 0 && (
        <>
          <Head>
            <meta
              name="description"
              content={businessData[0].businessDescription}
            />
            <title>{businessData[0].businessName}</title>
            <link rel="shortcut icon" href="/images/favicon.ico" />
            <link
              rel="apple-touch-icon"
              sizes="180x180"
              href="/images/apple-touch-icon.png"
            />
            <link
              rel="icon"
              type="image/png"
              sizes="32x32"
              href="/images/favicon-32x32.png"
            />
            <link
              rel="icon"
              type="image/png"
              sizes="16x16"
              href="/images/favicon-16x16.png"
            />
          </Head>
          <ContactHeader data={{ businessInfo: businessData[0] }} />
          <div className="headerNavContainer">
            <Header data={{ businessInfo: businessData[0] }} />
            <Nav />
          </div>
          <main>{children}</main>
          <Footer data={{ businessInfo: businessData[0] }} />
        </>
      )}
    </>
  );
};

export default Layout;
