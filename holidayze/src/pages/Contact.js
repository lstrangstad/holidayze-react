import { useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { contactSchema } from "../utils/schemas";
import axios from "axios";
import { Helmet } from "react-helmet";

const Contact = () => {
  const [submit, setSubmit] = useState(false);
  const [postError, setPostError] = useState(null);
  const [success, setSuccess] = useState(null);
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(contactSchema),
  });

  const onSubmit = async (values) => {
    setSubmit(true);
    setPostError(null);
    console.log(values);

    try {
      const response = await axios.post(`${BASE_URL}/contacts`, values);
      console.log(response.data);
      setSuccess(true);
    } catch (err) {
      console.log("error", err);
    } finally {
      setSubmit(false);
    }
  };

  return (
    <div className="contact">
      <Helmet>
        <title>Holidaze | Contact</title>
        <meta
          name="description"
          content="If you want or need to send us a message. All your feedback are very welcome"
        />
      </Helmet>
      <div className="contact__container">
        <div className="contact__content">
          <h1 className="contact__heading">Contact us</h1>
          <p>
            Please send us message if you have any questions, or if you have
            feedback to help us!
          </p>
        </div>

        <form className="contact__form" onSubmit={handleSubmit(onSubmit)}>
          {postError && <p className="contact__error">{postError}</p>}
          {success ? (
            <p className="contact__success success">Message sent</p>
          ) : null}
          <fieldset className="contact__field" disabled={submit}>
            <div className="contact__input-box">
              <label className="contact__label">Name: </label>
              <input className="contact__input" name="name" ref={register} />
              {errors.name && (
                <p className="contact__error">{errors.name.message}</p>
              )}
            </div>
            <div className="contact__input-box">
              <label className="contact__label">Email: </label>
              <input className="contact__input" name="email" ref={register} />
              {errors.email && (
                <p className="contact__error">{errors.email.message}</p>
              )}
            </div>
            <div className="contact__input-box">
              <label className="contact__label">Subject: </label>
              <input className="contact__input" name="subject" ref={register} />
              {errors.subject && (
                <p className="contact__error">{errors.subject.message}</p>
              )}
            </div>
            <div className="contact__input-box">
              <label className="contact__label">Message: </label>
              <textarea
                id="textarea"
                className="contact__input"
                name="message"
                ref={register}
              />
              {errors.message && (
                <p className="contact__error">{errors.message.message}</p>
              )}
            </div>
            <button className="contact__button" type="submit">
              {submit ? "Sending.." : "Send"}
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default Contact;
