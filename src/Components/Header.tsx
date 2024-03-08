import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

export function Header() {
  return (
    <Navbar expand="lg" data-bs-theme="dark" bg="myColor" className="navbar rounded">
        <Navbar.Brand href="/home">Movie Index</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Container fluid>
            <Nav className="flex-column">
              <Nav.Link href="/movies" className="mb-4">Movies</Nav.Link>
              <Nav.Link href="/shows" className="mb-4">Shows</Nav.Link>
              <Nav.Link href="/search" className="mb-4">Index</Nav.Link>
              <NavDropdown title="Profile" id="basic-nav-dropdown" className="mb-3">
                <NavDropdown.Item href="#action/3.1">My Movies</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Setting</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="https://github.com/Munir4545/movie-website">Github</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Container>
        </Navbar.Collapse>
      </Navbar>
  );
}
