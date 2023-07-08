import React from "react";
import Logo from "../assets/img/argentBankLogo.png";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  return (
    <div>
      <nav className="main-nav">
        <Link to="/" className="main-nav-logo">
          <img
            className="main-nav-logo-image"
            src={Logo}
            alt="Argent Bank Logo"
          />
          <h1 className="sr-only">Argent Bank</h1>
        </Link>
        <div>
          <Link to="/sign-in" className="main-nav-item">
            <FontAwesomeIcon icon={faUserCircle} />
            Sign In
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
