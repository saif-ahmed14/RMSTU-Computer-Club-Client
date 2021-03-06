import React from "react";
import { Button, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";

const Navigation = () => {
  // user destructure
  const { user, logOut, admin } = useAuth();
  return (
    <Navbar
      expand="lg"
      style={{
        backgroundColor: "#0C2340",
        boxShadow: "8px 8px 22px #9fa4b3, -8px -8px 22px",
      }}
    >
      <Container>
        <Navbar.Brand href="/" className="text-light">
          <img className="site-logo" src="https://i.ibb.co/R477c2j/Club-logo.jpg" alt="Computer Club Logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/home" className="text-light">
              Home
            </Nav.Link>
            <NavDropdown
              title="About"
              id="basic-nav-dropdown"
              className="text-light"
            >
              <NavDropdown.Item as={Link} to="/about">
                About RCC
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/rules">
                Rules and Regulation
              </NavDropdown.Item>
            </NavDropdown>

            <Nav.Link as={Link} to="/results" className="text-light">
              Results
            </Nav.Link>
            <Nav.Link as={Link} to="/events" className="text-light">
              Events
            </Nav.Link>
            <Nav.Link as={Link} to="/notice" className="text-light">
              Notice
            </Nav.Link>
            <NavDropdown
              title="Department"
              id="basic-nav-dropdown"
              className="text-light"
            >
              <NavDropdown.Item as={Link} to="/teachers">
                Teachers
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/students">
                Students
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown
              title="Executive"
              id="basic-nav-dropdown"
              className="text-light"
            >
              <NavDropdown.Item as={Link} to="/executive-panel-2021">
                2020-2021 Panel
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/2020-panel">
                2019-2020 Panel
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/2019-panel">
                2018-2019 Panel
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/2018-panel">
                2017-2018 Panel
              </NavDropdown.Item>
            </NavDropdown>
            {
              admin && <Nav.Link as={Link} to="/dashboard" className="text-light fw-bolder">
                Dashboard
              </Nav.Link>
            }

            {
              !user?.displayName ? <Nav.Link as={Link} to="/login" className="text-light">
                Login
              </Nav.Link>
                :
                <Button variant="danger" onClick={() => logOut()}>LogOut {user?.displayName}</Button>
            }

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
