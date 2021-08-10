import { Link } from "react-router-dom";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import TwitterIcon from "@material-ui/icons/Twitter";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer__nav">
        <li className="footer__list">
          <Link className="footer__link" to="/">
            Home
          </Link>
        </li>
        <li className="footer__list">
          <Link className="footer__link" to="/stays">
            Stays
          </Link>
        </li>
        <li className="footer__list">
          <Link className="footer__link" to="/contact">
            Contact
          </Link>
        </li>
      </div>
      <div className="footer__links">
        <a href="www.facebook.com">
          <FacebookIcon style={{ color: "white" }} />
        </a>
        <a href="www.twitter.com">
          <TwitterIcon style={{ color: "white" }} />
        </a>
        <a href="www.instagram.com">
          <InstagramIcon style={{ color: "white" }} />
        </a>
      </div>
      <div className="footer__bottom">
        <p className="footer__copy">
          Copyright &copy; 2021 Holidaze&trade;. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
