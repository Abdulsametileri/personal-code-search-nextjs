import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Link from 'next/link'

const NavComponent = () => {
  return (
    <Navbar bg="light" expand="md">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse className="justify-content-center" id="basic-navbar-nav">
        <Nav>
          <Link href="/">
            Search Code Snippets
          </Link>
          &nbsp; | &nbsp;
          <Link href="/add">
            Add Code Snippets
          </Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavComponent