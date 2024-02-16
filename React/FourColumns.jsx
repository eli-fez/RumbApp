import React, { useState, useEffect } from "react";
import { Card, Container, Col, Row } from "react-bootstrap";
import Slider from "react-slick";
import "./landingstyle.css";
import { getPaginatedVenues } from "../../services/venueService";
import debug from "sabio-debug";
import { Link } from "react-router-dom";
import toastr from "toastr";
function FourColumns() {
  const _logger = debug.extend("FourColumns");
  const [fourCols, setCols] = useState({
    data: [],
    comps: [],
  });
  useEffect(() => {
    getPaginatedVenues(0, 5).then(getVenuesSuccess).catch(getVenueError);
  }, []);

  const getVenuesSuccess = (response) => {
    _logger(response);
    let venuesArray = response.item.pagedItems;
    setCols((prevState) => {
      const venueData = { ...prevState };
      venueData.data = venuesArray;
      venueData.comps = venuesArray.map(mapACard);
      return venueData;
    });
  };
  const getVenueError = (response) => {
    toastr.error(response);
  };

  const mapACard = (aCard, index) => {
    return (
      <Col key={index}>
        <Card className="mb-3 cardshape-rumb">
          <Card.Img variant="top" className="fitimgsize-rumb" src={aCard.url} />
          <Card.Body>
            <Card.Title>{aCard.name}</Card.Title>
            <Card.Text>{aCard.description}</Card.Text>

            <Link
              to={`/venue/${aCard.id}`}
              className="btn btn-primary"
              variant="primary"
            >
              Select Venue
            </Link>
          </Card.Body>
        </Card>
      </Col>
    );
  };
  return (
    <div className="background-cards-rumb">
      <div className=" mb-3 ms-11 text-dark  ">
        <h3> Recommended For You </h3>
      </div>
      <Container>
        <div className="position-relative">
          <Slider
            dots={true}
            infinite={true}
            speed={500}
            slidesToShow={4} // Adjust the number of slides to show at a time
            slidesToScroll={1}
            className="slick-slider pb-sm-5 mb-5 slick-slider-wrapper slick-initialized"
          >
            {fourCols.comps.map((card, index) => (
              <Row key={index}>{card}</Row>
            ))}
          </Slider>
        </div>
      </Container>
    </div>
  );
}

export default FourColumns;
