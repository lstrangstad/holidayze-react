import { Link } from "react-router-dom";

const Card = (props) => {
  const { name, image, location, price, rating, id, type } = props;

  return (
    <div className="card">
      <Link className="card__link" to={`/details/${id}`}>
        <div className="card__image-box">
          <div
            className="card__img"
            style={{ backgroundImage: `url(${image})` }}
          ></div>
        </div>
        <div className="card__content">
          <h2 className="card__name">{name}</h2>
          <p className="card__location">{location}</p>
          <div className="card__flex">
            <p className="card__price">Price: {price}kr</p>

            <div className="card__rating">
              <span className="card__number">{rating}</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card;
