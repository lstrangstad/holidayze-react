import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { useFormik } from "formik";
import * as Yup from "yup";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    maxWidth: "450px",
    width: "350px",
  },
}));

export default function TransitionsModal(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [submit, setSubmit] = useState(false);
  const [postError, setPostError] = useState(null);
  const [success, setSuccess] = useState(null);
  const { handleChange, handleSubmit, values, touched, errors, handleBlur } =
    useFormik({
      initialValues: {
        hotel_name: props.name,
        price: props.price,
        name: "",
        date: "",
        nights: "",
        adults: "",
        children: "",
      },
      validationSchema: Yup.object().shape({
        hotel_name: Yup.string().required(),
        price: Yup.number().required(),
        name: Yup.string().required("required"),
        date: Yup.date().required("required"),
        nights: Yup.number().required("required"),
        adults: Yup.number().required("required"),
        children: Yup.number().required("required"),
      }),
      onSubmit: async (data) => {
        setSubmit(true);
        setPostError(null);

        try {
          const response = await axios.post(`${BASE_URL}/bookings`, data);
          setSuccess(true);
        } catch (err) {
          console.log("error", err);
          setPostError(err.toString());
        } finally {
          setSubmit(false);
        }
      },
    });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <button className="details__btn" type="button" onClick={handleOpen}>
        Book now
      </button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <div className="modal">
              <h2 className="modal__header">Book now at {props.name}</h2>
              <form className="modal__form" onSubmit={handleSubmit}>
                {postError && <p className="add__error error">{postError}</p>}
                {success ? (
                  <p className="modal__success success">Successfully sent</p>
                ) : null}
                <fieldset className="modal__field" disabled={submit}>
                  <input
                    className="modal__input"
                    value={props.name}
                    name="hotel_name"
                    onChange={handleChange}
                    type="hidden"
                  />
                  <input
                    className="modal__input"
                    value={props.price}
                    name="price"
                    onChange={handleChange}
                    type="hidden"
                  />
                  <div className="modal__input-box">
                    <label htmlFor="name" className="modal__label">
                      Name:{" "}
                    </label>
                    <input
                      className="modal__input"
                      type="text"
                      id="name"
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {touched.name && errors.name ? <p>{errors.name}</p> : null}
                  </div>
                  <div className="modal__input-box">
                    <label htmlFor="date" className="modal__label">
                      Arrival:{" "}
                    </label>
                    <input
                      className="modal__input"
                      id="date"
                      type="date"
                      name="date"
                      value={values.date}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {touched.date && errors.date ? <p>{errors.date}</p> : null}
                  </div>
                  <div className="modal__input-box">
                    <label htmlFor="nights" className="modal__label">
                      Nights:{" "}
                    </label>
                    <input
                      className="modal__input"
                      type="text"
                      id="nights"
                      name="nights"
                      value={values.nights}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {touched.nights && errors.nights ? (
                      <p>{errors.nights}</p>
                    ) : null}
                  </div>
                  <div className="modal__input-box">
                    <label htmlFor="adults" className="modal__label">
                      Adults:{" "}
                    </label>
                    <input
                      className="modal__input"
                      type="text"
                      id="adults"
                      name="adults"
                      value={values.adults}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {touched.adults && errors.adults ? (
                      <p>{errors.adults}</p>
                    ) : null}
                  </div>
                  <div className="modal__input-box">
                    <label htmlFor="children" className="modal__label">
                      Children:{" "}
                    </label>
                    <input
                      className="modal__input"
                      type="text"
                      id="children"
                      name="children"
                      value={values.children}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {touched.children && errors.children ? (
                      <p>{errors.children}</p>
                    ) : null}
                  </div>
                  <button type="submit" className="modal__button">
                    Send
                  </button>
                </fieldset>
              </form>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
