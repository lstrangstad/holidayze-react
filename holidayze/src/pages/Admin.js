import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { useHistory } from "react-router-dom";
import FetchLastEnquiry from "../components/FetchLastEnquiry";
import FetchLastMessage from "../components/FetchLastMessage";
import { Helmet } from "react-helmet";

const Admin = () => {
  const history = useHistory();
  const [auth] = useContext(AuthContext);

  if (!auth) {
    history.push("/login");
  }

  return (
    <div className="admin">
      <Helmet>
        <title>Holidaze | Admin</title>
      </Helmet>
      <h1 className="admin__heading">Admin Panel</h1>
      <div className="admin__links">
        <Link className="admin__link" to="/enquiries">
          Enquiries
        </Link>
        <Link className="admin__link" to="/messages">
          Contact Messages
        </Link>
        <Link className="admin__link" to="/add">
          Add Establishment
        </Link>
      </div>
      <div className="admin__container">
        <FetchLastEnquiry />
        <FetchLastMessage />
      </div>
    </div>
  );
};

export default Admin;
