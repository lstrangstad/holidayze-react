import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import Card from "../components/Card";
import CircularProgress from "@material-ui/core/CircularProgress";
import SelectType from "../components/SelectType";
import { Helmet } from "react-helmet";

const Stays = () => {
  const [hotels, setHotels] = useState([]);
  const [selectFilter, setSelectFilter] = useState("");
  const [loader, setLoader] = useState(true);
  const [selected, setSelected] = useState(false);

  useEffect(function () {
    const fetchHotels = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/hotels`);
        setHotels(response.data);
        setLoader(false);
      } catch (err) {
        console.log(err);
      }
    };
    fetchHotels();
  }, []);

  const options = [
    { label: "All", value: "all" },
    { label: "Hotels", value: "hotel" },
    { label: "Cabins", value: "cabin" },
    { label: "B&Bs", value: "b&b" },
  ];

  function onChangeValue(value) {
    let filteredTypes = hotels.filter((hotel) => {
      return hotel.type.toLowerCase().includes(value.value);
    });
    setSelectFilter(filteredTypes);
    if (value.value === "all") {
      setSelected(false);
    } else {
      setSelected(true);
    }
  }

  return (
    <div className="stays">
      <Helmet>
        <title>Holidaze | Stays</title>
        <meta
          name="description"
          content="Find your accommadation now, we have many from Hotels, cabins and B&B's"
        />
      </Helmet>
      <h1 className="stays__header">Our hotels</h1>
      <SelectType
        options={options}
        onChange={onChangeValue}
        type={hotels.type}
      />
      {loader ? (
        <div className="loader">
          <CircularProgress style={{ placeItems: "center" }} />
        </div>
      ) : (
        <>
          {selected ? (
            <div className="stays__container">
              {selectFilter.length !== 0 ? (
                selectFilter.map((hotel) => <Card key={hotel.id} {...hotel} />)
              ) : (
                <div>
                  <p>No Hotels is matching your search...</p>
                </div>
              )}
            </div>
          ) : (
            <div className="stays__container">
              {hotels.map((hotel) => (
                <Card key={hotel.id} {...hotel} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Stays;
