import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import sabioDebug from "sabio-debug";
import FaqFormSchema from "../../schemas/faqsSchema";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import toastr from "toastr";
import lookUpService from "services/lookUpService";
import faqService from "services/faqService";
import { Container, Row, Col } from "react-bootstrap";
import "./faqstyle.css";

const _logger = sabioDebug.extend("FaqAddEdit");

const FaqAddEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [categoriesState, setCategoriesState] = useState([]);
  const location = useLocation();
  const faqsEditMode = location.state;

  const [formState, setFormState] = useState({
    question: "",
    answer: "",
    categoryId: "",
    sortOrder: 1,
  });

  useEffect(() => {
    if (faqsEditMode) {
      setFormState({
        question: faqsEditMode.question,
        answer: faqsEditMode.answer,
        categoryId: faqsEditMode.faqCategory.id,
        sortOrder: faqsEditMode.sortOrder,
        id: faqsEditMode.id,
      });
    }
  }, [faqsEditMode]);

  const handleSubmit = (values) => {
    if (values.id) {
      faqService
        .updateFaq(values.id, values)
        .then(onUpdateFaqSuccess)
        .catch(onUpdateFaqError);
    } else {
      faqService.addNewFaq(values).then(onAddFaqSuccess).catch(onAddFaqError);
    }
  };

  var onAddFaqSuccess = (response) => {
    setFormState((prevState) => {
      const updateFormState = { ...prevState };
      updateFormState.id = response.data;
      return updateFormState;
    });
    toastr.error("Success! This FAQ has been added.");
    navigate("/faqslist");
  };
  var onAddFaqError = (response) => {
    _logger(response);
    toastr.error(
      "Sorry. There was an error adding this FAQ. Please try again."
    );
  };
  var onUpdateFaqSuccess = (response) => {
    _logger(response);
    toastr.error("Success! This FAQ has been updated.");
    navigate("/faqslist");
  };
  var onUpdateFaqError = (response) => {
    _logger(response);
    toastr.error(
      "Sorry. There was an error updating this FAQ. Please try again."
    );
  };

  useEffect(() => {
    lookUpService
      .lookUp(["FAQCategories"])
      .then(onGetCategoriesSuccess)
      .catch(onGetCategoriesError);
  }, []);

  function renderCategoryOptions() {
    return categoriesState.map((category) => (
      <option key={category.value} value={category.value}>
        {category.label}
      </option>
    ));
  }

  function mapCategories(categoriesData) {
    return categoriesData.map((category) => ({
      label: category.name,
      value: category.id,
    }));
  }

  function onGetCategoriesSuccess(data) {
    const mappedCategories = mapCategories(data.item.faqCategories);
    setCategoriesState(mappedCategories);
  }

  const onGetCategoriesError = (error) => {
    _logger(error);
    toastr.error(
      "Sorry. There was an error fetching FAQ Categories. Please try again."
    );
  };

  return (
    <React.Fragment>
      <div className="col-md-8 faq-form-column-padding">
        <div className="card mb-4 faq-form-card-padding">
          <Container>
            <Row>
              <Col md={8}>
                <div className="mb-2">
                  <h1>{id ? "Edit FAQ" : "Add New FAQ"}</h1>
                </div>
              </Col>
            </Row>
          </Container>
          <Formik
            enableReinitialize={true}
            initialValues={formState}
            onSubmit={handleSubmit}
            validationSchema={FaqFormSchema}
          >
            <Container>
              <Row>
                <Col md={12}>
                  <Form>
                    <div className="mb-3">
                      <label htmlFor="question" className="form-label">
                        Question
                      </label>
                      <Field
                        as="textarea"
                        className="form-control faq-form-fields"
                        name="question"
                        id="question"
                        rows="3"
                      />
                      <ErrorMessage
                        name="question"
                        component="div"
                        className="error"
                      ></ErrorMessage>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="answer" className="form-label">
                        Answer
                      </label>
                      <Field
                        as="textarea"
                        className="form-control faq-form-fields"
                        name="answer"
                        id="answer"
                        rows="3"
                      />
                      <ErrorMessage
                        name="answer"
                        component="div"
                        className="error"
                      ></ErrorMessage>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="categoryId" className="form-label">
                        FAQ Category
                      </label>
                      <Field
                        component="select"
                        name="categoryId"
                        className="form-control faq-form-fields"
                        id="categoryId"
                      >
                        <option value="">Select...</option>
                        {renderCategoryOptions()}
                      </Field>
                      <ErrorMessage
                        name="categoryId"
                        component="div"
                        className="error"
                      ></ErrorMessage>
                    </div>
                    <div className="mb-3 faq-form-padding">
                      <button type="submit" className="btn btn-primary">
                        Submit
                      </button>
                    </div>
                  </Form>
                </Col>
              </Row>
            </Container>
          </Formik>
        </div>
      </div>
    </React.Fragment>
  );
};

export default FaqAddEdit;
