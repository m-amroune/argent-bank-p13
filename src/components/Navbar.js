import { useEffect } from "react";
import Logo from "../assets/img/argentBankLogo.png";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { logout, getUserProfile } from "../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";

const Navbar = () => {
  const { userInfo, userToken } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userToken) {
      dispatch(getUserProfile(userToken));
    }
  }, [userToken, dispatch]);
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
          {userInfo ? (
            <Link
              to="/"
              onClick={() => dispatch(logout())}
              className="main-nav-item"
            >
              <FontAwesomeIcon icon={faSignOutAlt} />
              Sign out
            </Link>
          ) : (
            <Link to="/sign-in" className="main-nav-item">
              <FontAwesomeIcon icon={faUserCircle} />
              Sign In
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
