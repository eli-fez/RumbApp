
import React from "react";
import FourColumns from "./FourColumns";
import SectionHeading from "./SectionHeading";
import CarouselRumb from "./CarouselRumb";
import CookiesBar from "./CookiesBar"
import RumbNavBar from "./RumbNavBar"
import RumbFooter from "./RumbFooter"

function LandingPage() {
  return (
    <React.Fragment>
      <
      <RumbNavBar />
      <SectionHeading />
      <CarouselRumb />
      <FourColumns />
      <CookiesBar />
      <RumbFooter />
    </React.Fragment>
  );
}

export default LandingPage;

