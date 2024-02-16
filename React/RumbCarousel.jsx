import React, { useState } from "react";
import { Carousel, Image, Container, Row } from "react-bootstrap";
import "./landingstyle.css";
function CarouselRumb() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <div className="background-carousel-rumb">
      <Container>
        <Row>
          <Carousel activeIndex={index} onSelect={handleSelect}>
            <Carousel.Item>
              <Image
                className=" d-block size-img-rumb"
                src="https://hrdailyadvisor.blr.com/app/uploads/sites/3/2022/04/shutterstock_774779833.jpg"
                alt="drinks"
                text="First Slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <Image
                className=" d-block size-img-rumb "
                src="https://www.reventals.com/blog/wp-content/uploads/2017/11/party-rental-alcohol.jpg"
                alt="party people"
                text="Second Slide"
              />
            </Carousel.Item>
          </Carousel>
        </Row>
      </Container>
    </div>
  );
}
export default CarouselRumb;
