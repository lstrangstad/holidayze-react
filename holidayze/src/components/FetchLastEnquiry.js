import { useState, useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import useAxios from "../utils/useAxios";
import CircularProgress from "@material-ui/core/CircularProgress";

const FetchLastEnquiry = () => {
  const [Loader, setLoader] = useState(true);
  const [enquiries, setEnquiries] = useState([]);
  const http = useAxios();

  useEffect(() => {
    const fetchEnquiries = async () => {
      try {
        const response = await http.get(`${BASE_URL}/bookings`);
        setEnquiries(response.data.reverse());
        setLoader(false);
      } catch (err) {
        console.log(err);
      }
    };
    fetchEnquiries();
  }, []);
  return (
    <div className="enquiry">
      {Loader ? (
        <div className="loader">
          <CircularProgress style={{ placeItems: "center" }} />
        </div>
      ) : (
        <fieldset className="enquiry__field">
          <legend className="enquiry__heading">Last Enquiry</legend>
          {enquiries.slice(0, 1).map((enquiry) => {
            const inputDate = new Date(enquiry.date);
            const nights = new Date(inputDate);
            nights.setDate(nights.getDate() + enquiry.nights);

            const priceTotal = enquiry.price * enquiry.nights;

            return (
              <div className="enquiry__content" key={enquiry.id}>
                <p className="enquiry__output">
                  <span className="enquiry__label">Sent: </span>
                  {new Date(enquiry.created_at).toString().substring(0, 24)}
                </p>
                <p className="enquiry__output">
                  <span className="enquiry__label">Hotel: </span>{" "}
                  {enquiry.hotel_name}
                </p>
                <p className="enquiry__output">
                  <span className="enquiry__label">Name: </span> {enquiry.name}
                </p>
                <p className="enquiry__output">
                  <span className="enquiry__label">Check-in date: </span>
                  {new Date(enquiry.date).toString().substring(0, 15)}
                </p>
                <p className="enquiry__output">
                  <span className="enquiry__label">Check-out date: </span>{" "}
                  {new Date(nights).toString().substring(0, 15)}
                </p>
                <p className="enquiry__output">
                  <span className="enquiry__label">Nights: </span>{" "}
                  {enquiry.nights}
                </p>
                <p className="enquiry__output">
                  <span className="enquiry__label">Adults: </span>{" "}
                  {enquiry.adults}
                </p>
                <p className="enquiry__output">
                  <span className="enquiry__label">Children: </span>{" "}
                  {enquiry.children}
                </p>
                <p className="enquiry__output">
                  <span className="enquiry__label">Price: </span>{" "}
                  {enquiry.price}kr
                </p>
                <p className="enquiry__total">
                  <span className="enquiry__label">Total to pay: </span>{" "}
                  {priceTotal}kr
                </p>
              </div>
            );
          })}
        </fieldset>
      )}
    </div>
  );
};

export default FetchLastEnquiry;
