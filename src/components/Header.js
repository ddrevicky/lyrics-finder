import { Link } from "react-router-dom";
import "./Header.css";

const Header = ({ title }) => {
  return (
    <div className="header">
      <Link to="/" className="header-link">
        {title}
      </Link>
    </div>
  );
};

export default Header;
