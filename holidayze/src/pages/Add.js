import { useContext, useState } from "react";
import { BASE_URL } from "../utils/constants";
import AuthContext from "../context/AuthContext";
import { useHistory, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAxios from "../utils/useAxios";
import { yupResolver } from "@hookform/resolvers/yup";
import { addSchema } from "../utils/schemas";
import { Helmet } from "react-helmet";

const Add = () => {
  const [hotel, setHotel] = useState(null);
  const [submit, setSubmit] = useState(false);
  const [postError, setPostError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [auth] = useContext(AuthContext);
  const http = useAxios();
  const history = useHistory();

  if (!auth) {
    history.push("/login");
  }

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(addSchema),
  });

  const onSubmit = async (data) => {
    setSubmit(true);
    setPostError(null);
    console.log(data);

    try {
      const response = await http.post(`${BASE_URL}/hotels`, data);
      console.log(response.data);
      setHotel(response.data);
      setSuccess(true);
    } catch (err) {
      console.log("error", err);
    } finally {
      setSubmit(false);
    }
  };

  return (
    <div className="add">
      <Helmet>
        <title>Holidaze | Add Establishment</title>
      </Helmet>
      <Link className="add__link" to="/admin">
        Back
      </Link>
      <h1 className="add__heading">Add Establishment</h1>
      <div className="add__container">
        <form className="add__form" onSubmit={handleSubmit(onSubmit)}>
          {postError && <p>{postError}</p>}
          <fieldset className="add__field" disabled={submit}>
            {success ? (
              <p className="add__success">
                Added {hotel.name} to establishments successfully!
              </p>
            ) : null}
            <div className="add__box">
              <label className="add__label">Establishment name</label>
              <input
                className="add__input"
                name="name"
                placeholder="Name..."
                ref={register}
              />
              {errors.name && (
                <p className="add__error">{errors.name.message}</p>
              )}
            </div>

            <div className="add__box">
              <label className="add__label">Description</label>
              <textarea
                className="add__input"
                name="description"
                placeholder="Description of establishment..."
                ref={register}
              />
              {errors.description && (
                <p className="add__error">{errors.description.message}</p>
              )}
            </div>
            <div className="add__box">
              <label className="add__label">Price</label>
              <input
                className="add__input"
                name="price"
                placeholder="1999 etc.."
                ref={register}
              />
              {errors.price && (
                <p className="add__error">{errors.price.message}</p>
              )}
            </div>
            <div className="add__box">
              <label className="add__label">Rating</label>
              <input
                className="add__input"
                name="rating"
                placeholder="Rating (9.5)"
                ref={register}
              />
              {errors.rating && (
                <p className="add__error">{errors.rating.message}</p>
              )}
            </div>
            <div className="add__box">
              <label className="add__label">Image</label>
              <input
                className="add__input"
                name="image"
                placeholder="Image URL..."
                ref={register}
              />
              {errors.image && (
                <p className="add__error">{errors.image.message}</p>
              )}
            </div>
            <div className="add__box">
              <label className="add__label">Location</label>
              <input
                className="add__input"
                name="location"
                placeholder="City center/Bryggen etc..."
                ref={register}
              />
              {errors.location && (
                <p className="add__error">{errors.location.message}</p>
              )}
            </div>
            <div className="add__box">
              <label className="add__label">Type</label>
              <input
                className="add__input"
                name="type"
                placeholder="Cabin etc..."
                ref={register}
              />
              {errors.type && (
                <p className="add__error">{errors.type.message}</p>
              )}
            </div>
            <button className="add__button btn" type="submit">
              {submit ? "Adding..." : "Add"}
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default Add;
