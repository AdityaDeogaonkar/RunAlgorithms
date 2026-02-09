import React, { useState } from 'react';
import { Navbar, Container, Nav, Button, Dropdown } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { FaFire, FaLayerGroup, FaBook, FaHome, FaBuilding, FaGoogle, FaUserCircle, FaSun, FaMoon } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import Logo from './Logo';

function Navigation() {
  const location = useLocation();
  const { currentUser, signInWithGoogle, logout, signingOut } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [signingIn, setSigningIn] = useState(false);

  const handleSignIn = async () => {
    try {
      setSigningIn(true);
      await signInWithGoogle();
    } catch (error) {
      console.error('Sign in failed:', error);
    } finally {
      setSigningIn(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Sign out failed:', error);
    }
  };

  return (
    <Navbar expand="lg" variant="dark" fixed="top" className="navbar-magical">
      <Container>
        <Navbar.Brand as={Link} to="/" className="navbar-brand-magical">
          <Logo size={28} />
          RunAlgorithms
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

            <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
              {theme === 'dark' ? <FaSun size={16} /> : <FaMoon size={16} />}
            </button>

            {currentUser ? (
              <Dropdown align="end">
                <Dropdown.Toggle
                  variant="transparent"
                  className="d-flex align-items-center gap-2 text-light border-0 p-0 shadow-none"
                  disabled={signingOut}
                  style={{ opacity: signingOut ? 0.6 : 1 }}
                >
                  {currentUser.user_metadata?.avatar_url ? (
                    <img src={currentUser.user_metadata.avatar_url} alt="Profile" className="rounded-circle border border-secondary" width="32" height="32" />
                  ) : (
                    <FaUserCircle size={28} />
                  )}
                </Dropdown.Toggle>
                <Dropdown.Menu className="dropdown-menu-dark shadow-lg">
                  <Dropdown.Header className="text-info">{currentUser.user_metadata?.full_name || currentUser.email}</Dropdown.Header>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={handleSignOut} disabled={signingOut}>
                    {signingOut ? 'Signing out...' : 'Sign Out'}
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <Button
                onClick={handleSignIn}
                variant="outline-light"
                size="sm"
                className="d-flex align-items-center gap-2 rounded-pill px-3 btn-signin"
                disabled={signingIn}
              >
                {signingIn ? (
                  <>
                    <span className="spinner-border spinner-border-sm" role="status" />
                    Signing in...
                  </>
                ) : (
                  <>
                    <FaGoogle size={14} /> Sign In
                  </>
                )}
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
