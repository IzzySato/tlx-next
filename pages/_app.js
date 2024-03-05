import '../styles/globals.css';
import '../styles/cssReset.css';
import Layout from '../components/Layout';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
};

export default MyApp
