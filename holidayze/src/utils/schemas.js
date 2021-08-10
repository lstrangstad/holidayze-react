import * as yup from "yup";

export const loginSchema = yup.object().shape({
  identifier: yup.string().required("Please enter username"),
  password: yup.string().required("Please enter password"),
});

export const bookingSchema = yup.object().shape({
  hotel_name: yup.string().required(),
  price: yup.number().required(),
  name: yup.string().required("required"),
  date: yup.date().required("required"),
  nights: yup.number().required("required"),
  adults: yup.number().required("required"),
  children: yup.number().required("required"),
});

export const addSchema = yup.object().shape({
  name: yup.string().required("Please enter name of establishment"),
  description: yup
    .string()
    .required("Please enter description of establishment"),
  price: yup.number().required("Please enter price of establishment"),
  image: yup.string().required("Please enter image URL of establishment"),
  location: yup.string().required("Please enter location of establishment"),
  type: yup.string().required("Please enter type of establishment"),
  rating: yup.string().required("Please enter rating of establishment"),
});

export const contactSchema = yup.object().shape({
  name: yup.string().required("Please enter name"),
  email: yup.string().email("Invalid email").required("Please enter email"),
  subject: yup.string().required("Please enter subject"),
  message: yup.string().required("Please enter message"),
});
