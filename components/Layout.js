import Head from 'next/head';
import useSWR from 'swr'
import Nav from './Nav';
import Footer from './Footer';
import ContactHeader from './ContactHeader';
import Loading from './Loading';
import Header from './Header';

const Layout = ({ children }) => {
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const url = '/api/businessInfo';
  const { data, error } = useSWR(url, fetcher);
  if (error) return <div>Failed to load</div>
  if (!data) return <Loading />

  return (
    <>
      <Head>
        <meta
          name="description"
          content={data.businessInfo[0].businessDescription} />
        <title>{data.businessInfo[0].businessName}</title>
        <link rel="shortcut icon" href="/images/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/images/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon-16x16.png" />
      </Head>
      <ContactHeader data={{ businessInfo: data.businessInfo[0] }} />
      <div className='headerNavContainer'>
        <Header data={{ businessInfo: data.businessInfo[0] }} />
        <Nav />
      </div>
      <main>
        {children}
      </main>
      <Footer data={{ businessInfo: data.businessInfo[0] }} />
    </>
  )
};

export default Layout;