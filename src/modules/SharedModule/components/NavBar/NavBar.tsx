import { useContext } from "react";
import navLogo from "../../../../assets/nav-logo.png";
import avatar from "../../../../assets/Avatar.png";
import Notification from "../../../../assets/Group.png";
import { AuthContext } from "../../../../Context/AuthContext";

const NavBar = () => {
  let { loginData } = useContext(AuthContext);
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img src={navLogo} alt="navLogo" />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">




              <li className="p-3 p-md-2 rounded-4 mx-auto position-relative d-flex flex-wrap align-items-center">
                <div className="Notification me-3">
                  <img src={Notification} alt="Notification-Bill" style={{ width: "30px" }}/>
                </div>
                <div className="vr  me-3"></div>
                <img
                  src={avatar}
                  alt=""
                  className=" me-2"
                  style={{ width: "40px" }}
                />
              </li>





              <li className="nav-item">
                <span className="fw-medium" style={{ color: "#0E382F" }}>
                  {loginData?.userName}
                </span>
                <p className="text-secondary">{loginData?.userEmail}</p>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
