import { useEffect, useState, useContext } from "react";
import { BASE_URL } from "../utils/constants";
import useAxios from "../utils/useAxios";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { useHistory } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import Enquiry from "../components/Enquiry";
import { Helmet } from "react-helmet";

const Enquiries = () => {
  const [enquiry, setEnquiry] = useState([]);
  const [loader, setLoader] = useState(true);
  const http = useAxios();
  const history = useHistory();
  const [auth] = useContext(AuthContext);
  const [filter, setFilter] = useState("");
  const [isFiltered, setIsFiltered] = useState(false);
  const param = "bookings";

  if (!auth) {
    history.push("/login");
  }

  useEffect(() => {
    const fetchEnquiries = async () => {
      try {
        const response = await http.get(`${BASE_URL}/${param}`);
        setEnquiry(response.data.reverse());
        setLoader(false);
      } catch (err) {
        console.log(err);
      }
    };
    fetchEnquiries();
  }, []);

  const handleFilter = (e) => {
    let filteredHotels = enquiry.filter((enq) => {
      return enq.name.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setFilter(filteredHotels);
    setIsFiltered(true);
  };

  return (
    <div className="enquiries">
      <Helmet>
        <title>Holidaze | Enquiries</title>
      </Helmet>
      <Link className="enquiries__link" to="/admin">
        Back
      </Link>
      <div className="enquiries__search">
        <input
          className="enquiries__input"
          type="text"
          placeholder="Search Guest..."
          onChange={handleFilter}
        />
      </div>
      {loader ? (
        <div className="loader">
          <CircularProgress style={{ placeItems: "center" }} />
        </div>
      ) : (
        <>
          {isFiltered ? (
            <>
              {filter.length !== 0 ? (
                filter.map((enq) => <Enquiry key={enq.id} {...enq} />)
              ) : (
                <div>
                  <p>Can't find person by that name...</p>
                </div>
              )}
            </>
          ) : (
            <>
              {enquiry.map((enq) => (
                <Enquiry key={enq.id} {...enq} />
              ))}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Enquiries;
