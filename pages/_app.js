import 'bootstrap/dist/css/bootstrap.min.css';
import '@/styles/globals.scss'
import Layout from "@/components/Layout";
import '@/utils/firebase'

function MyApp({ Component, pageProps }) {
  return (
      <Layout>
        <Component {...pageProps} />
      </Layout>
    )
}

export default MyApp
