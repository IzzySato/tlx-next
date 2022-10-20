import Head from 'next/head';
import useSWR from 'swr'
import Nav from './Nav';
import Footer from './Footer';
import ContactHeader from './ContactHeader';

const Layout = ({ children }) => {
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const url = '/api/businessInfo';
  const { data, error } = useSWR(url, fetcher);
  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>

  return (
    <>
    <Head>
      <meta
      name="description"
      content={data.businessInfo[0].businessDescription} />
       <title>{data.businessInfo[0].businessName}</title>
     </Head>
     <ContactHeader data={{businessInfo: data.businessInfo[0]}}/>
     <Nav/>
     <div>
      <main>
        {children}
      </main>
      <Footer data={{businessInfo: data.businessInfo[0]}}/>
    </div>
    </>
  )
};

export default Layout;