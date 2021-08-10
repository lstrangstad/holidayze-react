import { useState, useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import useAxios from "../utils/useAxios";
import CircularProgress from "@material-ui/core/CircularProgress";

const FetchLastMessage = () => {
  const [message, setMessage] = useState([]);
  const [Loader, setLoader] = useState(true);
  const http = useAxios();

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await http.get(`${BASE_URL}/contacts`);
        setMessage(response.data.reverse());
        setLoader(false);
      } catch (err) {
        console.log(err);
      }
    };
    fetchMessages();
  }, []);

  return (
    <div className="message">
      {Loader ? (
        <div className="loader">
          <CircularProgress style={{ placeItems: "center" }} />
        </div>
      ) : (
        <fieldset className="message__field">
          <legend className="message__heading">Last Contact Message</legend>
          {message.slice(0, 1).map((msg) => {
            return (
              <div key={msg.id}>
                <p className="message__output">
                  <span className="message__label">Sent: </span>{" "}
                  {new Date(msg.created_at).toString().substring(0, 24)}
                </p>
                <p className="message__output">
                  <span className="message__label">Name: </span> {msg.name}
                </p>
                <p className="message__output">
                  <span className="message__label">Email: </span> {msg.email}
                </p>
                <p className="message__output">
                  <span className="message__label">Subject: </span>{" "}
                  {msg.subject}
                </p>
                <p className="message__output">
                  <span className="message__label">Message: </span>
                  {msg.message}
                </p>
              </div>
            );
          })}
        </fieldset>
      )}
    </div>
  );
};

export default FetchLastMessage;
