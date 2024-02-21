import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Col, Container, Row, Accordion } from "react-bootstrap";
import "./stylefaq.css";
import faqService from "../../services/faqService.js";

function Faq() {
   const [faqsPage, setFaqsPage] = useState({
    data: [],
    comps: [],
  });
   const _logger = debug.extend("faqs");
   useEffect(() => {
    _logger("useEffect is firing");
    faqService.getAllFaqs().then(faqServiceSuccess).catch(faqServiceError);
   }, []);
    const faqServiceSuccess = (response) => {
    let aFaq = response.items;
    _logger("array", response);
    setFaqsPage((prevState) => {
      let newState = { ...prevState };

      newState.data = aFaq;
      newState.comps = aFaq.map(mapAQuestion);

      return newState;
    });
    };
   const handleCategoryClick = (event) => {
    event.preventDefault();

    let categoryToFilterBy = event.currentTarget.id;

    setFaqsPage((prevState) => {
      let newState = { ...prevState };
      _logger(newState, "preve");
      let filteredData = newState.data.filter(
        (aQuestion) => aQuestion.faqCategory.id === parseInt(categoryToFilterBy)
      );
      newState.comps = filteredData.map(mapAQuestion);

      return newState;
     });
   };

   const faqServiceError = (error) => {
    _logger("error", error);
    };

   const mapAQuestion = (aQuestion, index) => {
    return (
      <Accordion.Item eventKey={index}>
        <Accordion.Header>{aQuestion.question}</Accordion.Header>
        <Accordion.Body>{aQuestion.answer}</Accordion.Body>
      </Accordion.Item>
    );
   };

   const handleAllClick = (event) => {
    event.preventDefault();

    let categoryToFilterBy = event.currentTarget.id;

    setFaqsPage((prevState) => {
      _logger(prevState, "alll");
      const newState = { ...prevState };

      let filteredData = newState.data.filter(
        (aQuestion) => aQuestion.sortOrder === parseInt(categoryToFilterBy)
      );
      newState.comps = filteredData.map(mapAQuestion);

      return newState;
    });
    };
   return (
    <React.Fragment>
      <Container className="py-3">
        <Row>
          <Col md={8} className="mx-auto">
            <div className="text-center mb-5">
              <h1 className="display-3 fw-bold">Frequently Asked Questions</h1>
              <p className="lead">Have a question? Check out our FAQs below.</p>
            </div>
          </Col>
        </Row>
      </Container>

      <Container className="text-center mt-5">
        <Row>
          <a className="skip-link screen-reader-text" href="#Content" />
          <Col>
            <a className="faq-a-textdec " id={1} onClick={handleAllClick}>
              <h5 type="button" className="faq-h5-questbox">
                All Asked Questions{" "}
              </h5>
            </a>
          </Col>
          <Col>
            <a className="faq-a-textdec " id={3} onClick={handleCategoryClick}>
              <h5 type="button" className="faq-h5-questbox">
                Most Asked Questions{" "}
              </h5>
            </a>
          </Col>
          <Col>
            <a className="faq-a-textdec " id={2} onClick={handleCategoryClick}>
              <h5 type="button" className="faq-h5-questbox">
                General Inquires
              </h5>
            </a>
          </Col>
        </Row>
      </Container>
      <Container>
        <Accordion className="md" flush>
          {faqsPage.comps}
        </Accordion>
      </Container>
      <div className="text-center mt-5">
        <p className="fs-4">
          Need more help? Visit the <Link to="/help">Help Center</Link>.
        </p>
      </div>
    </React.Fragment>
  );
}
export default Faq;
