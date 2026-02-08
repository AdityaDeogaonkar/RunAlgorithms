import React from 'react';
import { Navbar, Container, Nav, Button, Dropdown } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { FaCode, FaFire, FaLayerGroup, FaBook, FaHome, FaBuilding, FaGoogle, FaUserCircle } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

function Navigation() {
  const location = useLocation();
  const { currentUser, signInWithGoogle, logout } = useAuth();

  return (
    <Navbar expand="lg" variant="dark" fixed="top" className="navbar-magical">
      <Container>
        <Navbar.Brand as={Link} to="/" className="navbar-brand-magical d-flex align-items-center gap-2">
          <FaCode /> RunAlgorithms
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto gap-3 align-items-center">
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

            {currentUser ? (
              <Dropdown align="end">
                <Dropdown.Toggle variant="transparent" className="d-flex align-items-center gap-2 text-light border-0 p-0 shadow-none">
                  {currentUser.user_metadata?.avatar_url ? (
                    <img src={currentUser.user_metadata.avatar_url} alt="Profile" className="rounded-circle border border-secondary" width="32" height="32" />
                  ) : (
                    <FaUserCircle size={28} />
                  )}
                </Dropdown.Toggle>
                <Dropdown.Menu className="dropdown-menu-dark shadow-lg">
                  <Dropdown.Header className="text-info">{currentUser.user_metadata?.full_name || currentUser.email}</Dropdown.Header>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={logout}>Sign Out</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <Button 
                onClick={signInWithGoogle} 
                variant="outline-light" 
                size="sm" 
                className="d-flex align-items-center gap-2 rounded-pill px-3"
                style={{ borderColor: 'rgba(255,255,255,0.2)' }}
              >
                <FaGoogle size={14} /> Sign In
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
