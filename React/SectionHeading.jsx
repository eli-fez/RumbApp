import { Link } from "react-router-dom";
import React, { useState } from "react";
import { Col, Container, Row, ListGroup } from "react-bootstrap";
import Typed from "react-typed";
import Icon from "@mdi/react";
import { mdiPartyPopper, mdiMapMarker, mdiHumanQueue } from "@mdi/js";
import "./landingstyle.css";
import debug from "sabio-debug";

function SectionHeading() {
  const [colss] = useState([
    {
      id: 1,
      icon: mdiPartyPopper,
      iconSize: 1,
      description: "Nulla vitae elit libero, a pharetra.",
      smallDesc: "sit amet, consectetur",
    },
    {
      id: 2,
      icon: mdiMapMarker,
      iconSize: 1,
      description: "ectetur adipiscing elit.",
      smallDesc: "sit amet, consectetur",
    },
    {
      id: 3,
      icon: mdiHumanQueue,
      iconSize: 1,
      description: "m dolor sit amet, conse",
      smallDesc: "sit amet, consectetur",
    },
  ]);
  const _logger = debug.extend("Landing");

  const colsmapped = (columns, index) => {
    return (
      <Col key={index} xs={12} sm={4} className="mt-2 mb-md-0">
        <ListGroup.Item
          as="li"
          bsPrefix="d-flex align-items-center text-light-success fw-semi-bold lh-1 fs-7 mb-md-0"
        >
          <span className="icon-shape icon-lg rounded-circle bg-light-info text-center mb-2 me-3">
            <Icon
              path={columns.icon}
              size={columns.iconSize}
              className="text-dark-warning"
            />
          </span>

          <span className="mb-2 align-center">
            <div className="mt-3 mb-2">{columns.description}</div>
            <p>{columns.smallDesc}</p>
          </span>
        </ListGroup.Item>
      </Col>
    );
  };
  const mappingCols = colss.map((columns, index) => colsmapped(columns, index));
  _logger(mappingCols);
  return (
    <div className="background-landing-rumb">
      <Container>
        <Row className=" justify-content-center">
          <Col className="ml-5 mb-5 mt-5 text-center">
            <h2 className=" text-success display-4 fw-bold mb-1 ">
              Welcome to RumbApp
            </h2>
            <h2 className=" text-success display-5 fw-bold mb-4">
              Find locations to{" "}
              <Typed
                className="text-dark-warning"
                strings={[" Reserve", " Drink", " Enjoy"]}
                typeSpeed={60}
                backSpeed={50}
                loop
              />
            </h2>
            <p className="text-primary  text-uppercase fw-semi-bold mb-4 ls-xl">
              Well known Club Establishments and Favorited Bars with a Variety
              of Drinks and Services enjoyed by many; search for your ideal Club
              or Bar of your choice .
            </p>
            <Link
              to="/venues"
              className=" text-dark btn btn-primary me-2"
            >
              Browse Selection
            </Link>
          </Col>
        </Row>
      </Container>
      <div className="middle-foot-rumb">
        <Container>
          <Row>{mappingCols}</Row>
        </Container>
      </div>
    </div>
  );
}

export default SectionHeading;
