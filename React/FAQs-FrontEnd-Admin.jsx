import React, { useState, useEffect } from "react";
import { Col, Container, Row, Accordion, Button } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import toastr from "toastr";
import sabioDebug from "sabio-debug";
import faqService from "services/faqService";
import "./faqstyle.css";

const _logger = sabioDebug.extend("FaqsList");

const FaqsList = () => {
  const navigate = useNavigate();
  const [faqsState, setFaqsState] = useState([]);

  useEffect(() => {
    faqService.getAllFaqs().then(onGetFaqsSuccess).catch(onGetFaqsError);
  }, []);

  const onGetFaqsSuccess = (response) => {
    _logger("getAllFaqs was successful", response);
    const faqsArray = response.items;
    setFaqsState(faqsArray);
  };

  const onGetFaqsError = (error) => {
    _logger("getAllFaqs was unsuccessful", error);
    toastr.error("Sorry. There was an error fetching FAQs. Please try again.");
  };

  const handleEditClicked = (faq) => () => {
    navigate(`/faqaddedit/${faq.id}`, { state: faq });
  };

  const handleDeleteClicked = (faq) => () => {
    const onDeleteSuccess = (response) => {
      _logger("deleteFaq was successful", response);
      const filteredFaqs = faqsState.filter((item) => item.id !== faq.id);
      setFaqsState(filteredFaqs);
      toastr.error("Success! This FAQ has been deleted.");
      navigate("/faqslist");
    };

    faqService.deleteFaq(faq.id).then(onDeleteSuccess).catch(onDeleteError);
  };

  const onDeleteError = (error) => {
    _logger("deleteFaq was unsuccessful", error);
    toastr.error(
      "Sorry. There was an error deleting this FAQ. Please try again."
    );
  };

  const mapFaqs = () => {
    return faqsState.map((faq) => (
      <Accordion.Item key={faq.id} eventKey={faq.id}>
        <>
          <Accordion.Header className="text-fix-faq">
            {faq.question}
          </Accordion.Header>
          <Accordion.Body className="text-fix-faq">
            {faq.answer}
            <div className="mt-2 d-flex justify-content-end align-items-center">
              <Button
                type="button"
                variant="info"
                className="btn btn-secondary btn-sm me-2 faq-accordion-buttons"
                onClick={handleEditClicked(faq)}
              >
                Edit
              </Button>
              <Button
                variant="info"
                className="btn btn-secondary btn-sm faq-accordion-buttons"
                onClick={handleDeleteClicked(faq)}
              >
                Delete
              </Button>
            </div>
          </Accordion.Body>
        </>
      </Accordion.Item>
    ));
  };

  return (
    <React.Fragment>
      <Container className="py-3">
        <Row>
          <Col md={8} className="mx-auto">
            <div className="text-center mb-2">
              <h1>Frequently Asked Questions</h1>
            </div>
          </Col>
        </Row>
      </Container>
      <Container className="text-center mt-2">
        <Row>
          <Col>
            <div className="d-flex justify-content-center align-items-center">
              <Link
                to="/faqaddedit"
                type="button"
                className="btn btn-secondary"
              >
                Add New FAQ
              </Link>
            </div>
          </Col>
        </Row>
      </Container>

      <Container className="mt-4">
        <Row>
          <Col md={8} className="mx-auto">
            <Accordion className="mt-4">{mapFaqs()}</Accordion>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default FaqsList;
