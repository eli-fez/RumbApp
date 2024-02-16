import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import toastr from "toastr";
import contactService from "../../services/contactService";
import supportSchema from "../../schemas/support/supportSchema";
import "./support.css";
import debug from "sabio-debug";

function Support() {
  const _logger = debug.extend("contact");
  const [contactus] = useState({
    RecieverEmail: "",
    RecieverName: "",
    message: "",
  });
  const handleSubmit = (values, { setSubmitting }) => {
    _logger(values);
    contactService
      .submitContact(values)
      .then((response) => {
        toastr.success("Submit success", response);
        _logger(response);
      })
      .catch((error) => {
        toastr.error("Failed to submit form", error);
        _logger(error);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <div className="container">
      <div className="row">
        <h1 className="support-h1">Got a Question?</h1>
        <h2 className="support-h2">We are here to help</h2>

        <div className="col-6 textCentered">
          <h2 className="support-h2">Contact Information</h2>
          <p className="support-textCentered">
            Phone Number: +64 (275) 7383255
          </p>
          <p className="support-textCentered">Email: rumbapp@gmail.com</p>
          <div className="image-container">
            <img
              className="supportImg"
              src="https://www.salesforce.com/content/dam/web/en_us/www/images/hub/how-to-close-the-sale/list-of-most-important-customer-service-skills-header.jpg"
              alt="customer service"
            />
          </div>
        </div>

        <div className="container gap-3 col">
          <Formik
            enableReinitialize={true}
            initialValues={contactus}
            onSubmit={handleSubmit}
            validationSchema={supportSchema}
          >
            {({ errors, touched }) => (
              <Form>
                <h2 className="support-h2">Let us know how we can help you</h2>

                <div className="form-group p-2 g-col-6">
                  <label htmlFor="RecieverEmail">Email</label>
                  <Field
                    type="email"
                    name="RecieverEmail"
                    id="RecieverEmail"
                    className={`form-control ${
                      errors.email && touched.email ? "is-invalid" : ""
                    }`}
                    placeholder="Enter your email"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
                <div className="form-group p-2 g-col-6">
                  <label htmlFor="RecieverName">Full Name</label>
                  <Field
                    type="text"
                    name="RecieverName"
                    id="RecieverName"
                    className={`form-control ${
                      errors.firstName && touched.firstName ? "is-invalid" : ""
                    }`}
                    placeholder="Enter your first name"
                  />
                  <ErrorMessage
                    name="firstName"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>
                <div className="form-group p-2 g-col-6">
                  <label htmlFor="message">Message</label>
                  <Field
                    component="textarea"
                    rows="7"
                    name="message"
                    id="message"
                    className={` text-dark form-control ${
                      errors.message && touched.message ? "is-invalid" : ""
                    }`}
                    placeholder="Type your message here..."
                  />
                  <ErrorMessage
                    name="message"
                    component="div"
                    className="invalid-feedback"
                  />
                </div>

                <button type="submit" className="submit-btn btn btn-primary">
                  Submit
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default Support;
