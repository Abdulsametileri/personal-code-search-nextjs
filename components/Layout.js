import Nav from "./Nav";
import Meta from "./Meta";
import Container from "react-bootstrap/Container";
import styles from '../styles/Layout.module.scss'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Router from 'next/router'
import NProgress from 'nprogress'
import Head from 'next/head'
import Spacer from "@/components/Spacer";

Router.events.on('routeChangeStart', (url) => {
  NProgress.start()
})
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

const LayoutComponent = ({ children }) => {
  return (
    <>
      <Head>
        <Meta />
        <link rel='icon' href='/favicon.ico' />
        <title>Interview Preperation</title>
        <link rel="stylesheet" type="text/css" href="/nprogress.css" />
      </Head>

      <Nav />

      <ToastContainer />

      <main>
        <Container className={styles.mainContainer}>
          {children}
        </Container>
      </main>

      <Spacer bottomVal={100} />
    </>
  )
}

export default LayoutComponent