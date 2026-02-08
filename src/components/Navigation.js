import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { FaCode, FaFire, FaLayerGroup, FaBook, FaHome, FaBuilding } from 'react-icons/fa';

function Navigation() {
  const location = useLocation();

  return (
    <Navbar expand="lg" variant="dark" fixed="top" className="navbar-magical">
      <Container>
        <Navbar.Brand as={Link} to="/" className="navbar-brand-magical d-flex align-items-center gap-2">
          <FaCode /> RunAlgorithms
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto gap-3">
            <Nav.Link as={Link} to="/" className={`nav-link-magical ${location.pathname === '/' ? 'active' : ''}`}>
              <FaHome className="me-1" /> Home
            </Nav.Link>
            <Nav.Link as={Link} to="/potd" className={`nav-link-magical ${location.pathname.includes('potd') ? 'active' : ''}`}>
              <FaFire className="me-1" /> Daily Challenge
            </Nav.Link>
            <Nav.Link as={Link} to="/companies" className={`nav-link-magical ${location.pathname.includes('companies') ? 'active' : ''}`}>
              <FaBuilding className="me-1" /> Companies
            </Nav.Link>
            <Nav.Link as={Link} to="/system-design" className={`nav-link-magical ${location.pathname.includes('system') ? 'active' : ''}`}>
              <FaLayerGroup className="me-1" /> System Design
            </Nav.Link>
            <Nav.Link as={Link} to="/cheatsheets" className={`nav-link-magical ${location.pathname.includes('cheat') ? 'active' : ''}`}>
              <FaBook className="me-1" /> Cheat Sheets
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
