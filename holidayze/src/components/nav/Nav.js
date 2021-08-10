import { Link } from "react-router-dom";
import styled from "styled-components";
import Burger from "./Burger";

const Navbar = styled.nav`
  display: flex;
  width: 100%;
  height: 55px;
  border-bottom: 2px solid #e63946;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  background-color: #1d3557;
  @media (min-width: 768px) {
    padding: 0 40px;
  }
  .logo {
    padding: 15px 0;
    .logotxt {
      color: white;
      text-decoration: none;
      font-size: 20px;
      font-family: "montserrat";
      font-weight: bold;
      .logo-span {
        color: #e63946;
      }
    }
  }
`;

const Nav = () => {
  return (
    <Navbar>
      <div className="logo">
        <Link className="logotxt" to="/">
          Holi<span className="logo-span">daze</span>
        </Link>
      </div>
      <Burger />
    </Navbar>
  );
};

export default Nav;
