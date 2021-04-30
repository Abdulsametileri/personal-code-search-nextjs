import Nav from "./Nav";
import Meta from "./Meta";
import Container from "react-bootstrap/Container";
import styles from '../styles/Layout.module.scss'

const LayoutComponent = ({ children }) => {
  return (
    <>
      <Meta />
      <Nav />
      <main>
        <Container className={styles.mainContainer}>
          {children}
        </Container>
      </main>
    </>
  )
}

export default LayoutComponent