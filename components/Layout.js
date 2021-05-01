import Nav from "./Nav";
import Meta from "./Meta";
import Container from "react-bootstrap/Container";
import styles from '../styles/Layout.module.scss'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LayoutComponent = ({ children }) => {
  return (
    <>
      <Meta />
      <Nav />
      <ToastContainer />
      <main>
        <Container className={styles.mainContainer}>
          {children}
        </Container>
      </main>
    </>
  )
}

export default LayoutComponent