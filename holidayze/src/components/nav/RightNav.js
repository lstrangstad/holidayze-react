import styled from "styled-components";
import { Link, useHistory, useLocation } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { useContext } from "react";

const Ul = styled.ul`
  list-style: none;
  display: flex;
  flex-flow: row nowrap;
  li {
    padding: 18px 20px;
  }

  .link:hover {
    border-bottom: 2px solid #e63946;
  }

  .link {
    text-decoration: none;
    color: #fff;
    font-family: "montserrat";
    font-weight: bold;
  }

  button {
    border: none;
    background: transparent;
    color: #e63946;
    font-size: 16px;
    cursor: pointer;
    font-family: "montserrat";
    font-weight: bold;
  }

  .active {
    border-bottom: 2px solid #e63946;
  }

  @media (max-width: 768px) {
    z-index: 10;
    flex-flow: column nowrap;
    background-color: #f8f9fa;
    position: fixed;
    transform: ${({ open }) => (open ? "translateX(0)" : "translateX(100%)")};
    top: 0;
    right: 0;
    height: 100vh;
    width: 300px;
    padding-top: 3.5rem;
    transition: transform 0.3s ease-in-out;
    .link {
      color: black;
    }
  }
`;

const RightNav = ({ open, setOpen }) => {
  const [auth, setAuth] = useContext(AuthContext);
  const history = useHistory();
  const location = useLocation();

  const { pathname } = location;

  const splitLocation = pathname.split("/");

  const logout = () => {
    setAuth(null);
    history.push("/");
  };
  return (
    <Ul open={open}>
      <li onClick={() => setOpen(!open)}>
        <Link
          className={splitLocation[1] === "" ? "active link" : "link"}
          to="/"
        >
          Home
        </Link>
      </li>
      <li onClick={() => setOpen(!open)}>
        <Link
          className={splitLocation[1] === "stays" ? "active link" : "link"}
          to="/stays"
        >
          Stays
        </Link>
      </li>
      <li onClick={() => setOpen(!open)}>
        <Link
          className={splitLocation[1] === "contact" ? "active link" : "link"}
          to="/contact"
        >
          Contact Us
        </Link>
      </li>
      {auth ? (
        <>
          <li onClick={() => setOpen(!open)}>
            <Link
              className={splitLocation[1] === "admin" ? "active link" : "link"}
              to="/admin"
            >
              Admin
            </Link>
          </li>
          <li onClick={() => setOpen(!open)}>
            <button onClick={logout}>Log out</button>
          </li>
        </>
      ) : (
        <li onClick={() => setOpen(!open)}>
          <Link
            className={splitLocation[1] === "login" ? "active link" : "link"}
            to="/login"
          >
            Login
          </Link>
        </li>
      )}
    </Ul>
  );
};

export default RightNav;
