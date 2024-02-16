import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import propTypes from "prop-types";
import "./navbarsetup.css";
import debug from "sabio-debug";

const _logger = debug.extend("RumbAppNavbar");
function RumbAppNavbar(props) {
  _logger("props", props);
  const navigate = useNavigate();
  const dashboardNav = () => {
    navigate(`/dashboard/${props.currentUser.role.toLowerCase()}`);
  };
  const home = () => {
    navigate(`/`);
  };
  return (
    <Navbar className="backgroundNavBar">
      <Container>
        <Navbar.Brand onClick={home}>RumbApp</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {props.currentUser.isLoggedIn ? (
              <>
                <Nav.Link
                  title="dashboard"
                  className="nav-link"
                  onClick={dashboardNav}
                >
                  Dashboard
                </Nav.Link>
              </>
            ) : (
              <></>
            )}
            <Link to="venues" className="nav-link">
              Venues
            </Link>
            <Link to="blogs" className="nav-link">
              Blogs
            </Link>
            <Link to="sharestory" className="nav-link">
              Share Story
            </Link>
            <Link to="podcasts" className="nav-link">
              Podcast
            </Link>
            <Link to="about" className="nav-link">
              About
            </Link>
            <Link to="faqs" className="nav-link">
              FAQ
            </Link>
          </Nav>
          {props.currentUser.isLoggedIn ? (
            <></>
          ) : (
            <Link
              type="button"
              to="/register"
              className=" btn btn-primary me-4"
              variant="outline-primary"
            >
              Sign up
            </Link>
          )}
          <>
            {props.currentUser.isLoggedIn ? (
              <Link
                type="button"
                to="/login"
                className="btn btn-warning"
                variant="outline-primary"
              >
                Logout{" "}
              </Link>
            ) : (
              <Link
                type="button"
                to="/login"
                className="btn btn-warning"
                variant="outline-primary"
              >
                Login
              </Link>
            )}
          </>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

RumbAppNavbar.propTypes = {
  currentUser: {
    id: propTypes.number.isRequired,
    roles: propTypes.string.isRequired,
    email: propTypes.string.isRequired,
    isLoggedIn: propTypes.bool.isRequired,
  },
};
export default RumbAppNavbar;
