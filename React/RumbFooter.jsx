import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Container, ListGroup } from "react-bootstrap";
import Icon from "@mdi/react";
import { mdiFacebook, mdiTwitter, mdiInstagram } from "@mdi/js";

const RumbAppFooter = () => {
  return (
    <Fragment>
      <div className="pt-lg-10 pt-5 footer bg-white">
        <Container>
          <Row>
            <Col lg={4} md={6} sm={12}>
              <div className="mb-4">
                <h1 className="display-2 fw-bold mb-3 text-primary">
                  RumbApp{" "}
                </h1>

                <div className="mt-4">
                  <p>
                    If you love the nightlife, RumbApp is your best resource.
                    Just grab a group of friends and leave the rest to us!
                  </p>
                  <div className="fs-4 mt-4">
                    <Link to="#" className="mdi mdi-facebook text-muted me-2">
                      <Icon path={mdiFacebook} size={0.7} />
                    </Link>
                    <Link to="#" className="mdi mdi-twitter text-muted me-2">
                      <Icon path={mdiTwitter} size={0.7} />
                    </Link>
                    <Link to="#" className="mdi mdi-instagram text-muted ">
                      <Icon path={mdiInstagram} size={0.7} />
                    </Link>
                  </div>
                </div>
              </div>
            </Col>
            <Col lg={{ span: 2, offset: 1 }} md={3} sm={6}>
              <div className="mb-4">
                <h3 className="fw-bold mb-3">Company</h3>
                <ListGroup
                  as="ul"
                  bsPrefix="list-unstyled"
                  className="nav nav-footer flex-column nav-x-0"
                >
                  <ListGroup.Item as="li" bsPrefix=" ">
                    <Link to="/about" className="nav-link">
                      About
                    </Link>
                  </ListGroup.Item>
                  <ListGroup.Item as="li" bsPrefix=" ">
                    <Link to="#" className="nav-link">
                      Bookings
                    </Link>
                  </ListGroup.Item>
                  <ListGroup.Item as="li" bsPrefix=" ">
                    <Link to="blogs" className="nav-link">
                      Blog
                    </Link>
                  </ListGroup.Item>
                  <ListGroup.Item as="li" bsPrefix=" ">
                    <Link to="support" className="nav-link">
                      Contact
                    </Link>
                  </ListGroup.Item>
                </ListGroup>
              </div>
            </Col>
            <Col lg={2} md={3} sm={6}>
              <div className="mb-4">
                <h3 className="fw-bold mb-3">Support</h3>
                <ListGroup
                  as="ul"
                  bsPrefix="list-unstyled"
                  className="nav nav-footer flex-column nav-x-0"
                >
                  <ListGroup.Item as="li" bsPrefix=" ">
                    <Link to="support" className="nav-link">
                      Help
                    </Link>
                  </ListGroup.Item>
                  <ListGroup.Item as="li" bsPrefix=" ">
                    <Link to="faqs" className="nav-link">
                      FAQ’s
                    </Link>
                  </ListGroup.Item>
                </ListGroup>
              </div>
            </Col>
            <Col lg={3} md={12} sm={12}>
              <div className="mb-4">
                <h3 className="fw-bold mb-3">Contact Us</h3>
                <p>339 McDermott Points Hettingerhaven, NV 15283</p>
                <p className="mb-1">
                  Email: <Link to="#">info@rumbapp.la</Link>
                </p>
                <p>
                  Phone:{" "}
                  <span className="text-dark fw-semi-bold">
                    (000) 123 456 789
                  </span>
                </p>
              </div>
            </Col>
          </Row>
          <Row className="align-items-center g-0 border-top py-2 mt-6">
            <Col lg={4} md={5} sm={12}>
              <span>© 2023 RumbApp. All Rights Reserved</span>
            </Col>
            <Col
              lg={8}
              md={7}
              sm={12}
              className="d-md-flex justify-content-end"
            >
              <nav className="nav nav-footer">
                <Link className="nav-link ps-0" to="#">
                  Privacy Policy
                </Link>
                <Link className="nav-link px-2 px-md-3" to="#">
                  Cookie Notice{" "}
                </Link>
                <Link className="nav-link d-none d-lg-block" to="#">
                  Do Not Sell My Personal Information{" "}
                </Link>
                <Link className="nav-link" to="#">
                  Terms of Use
                </Link>
              </nav>
            </Col>
          </Row>
        </Container>
      </div>
    </Fragment>
  );
};
export default RumbAppFooter;
