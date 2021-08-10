import DeleteButton from "../components/DeleteButton";

const Enquiry = (props) => {
  const { hotel_name, name, date, nights, adults, children, price, id } = props;

  const priceTotal = price * nights;
  const param = "bookings";
  const inputDate = new Date(date);
  const night = new Date(inputDate);
  night.setDate(night.getDate() + nights);
  return (
    <div className="enquiries__container" key={id}>
      <div>
        <label className="enquiries__label">Hotel name:</label>
        <p className="enquiries__output">{hotel_name}</p>
      </div>
      <div>
        <label className="enquiries__label">Guest name:</label>
        <p className="enquiries__output">{name}</p>
      </div>
      <div>
        <label className="enquiries__label">Check-in:</label>
        <p className="enquiries__output">
          {new Date(date).toString().substring(0, 15)}
        </p>
      </div>
      <div>
        <label className="enquiries__label">Check-out:</label>
        <p className="enquiries__output">{night.toString().substring(0, 15)}</p>
      </div>
      <div>
        <label className="enquiries__label">Nights:</label>
        <p className="enquiries__output">{nights}</p>
      </div>
      <div>
        <label className="enquiries__label">Adults:</label>
        <p className="enquiries__output">{adults}</p>
      </div>
      <div>
        <label className="enquiries__label">Children:</label>
        <p className="enquiries__output">{children}</p>
      </div>
      <div>
        <label className="enquiries__label">Total price:</label>
        <p className="enquiries__output enquiries__total">{priceTotal}kr</p>
      </div>
      <div>
        <DeleteButton className={"enquiries__btn"} param={param} id={id} />
      </div>
    </div>
  );
};

export default Enquiry;
