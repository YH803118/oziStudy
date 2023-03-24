import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUser } from "../api";
import "./TopMenu.css";
const LOGIN_INFO = {
  userId: "",
  password: "",
};
function TopMenu({ onMyStudy, onLoad, onLogin }) {
  const [login, setLogin] = useState(false);
  const [loginInfo, setLoginInfo] = useState(LOGIN_INFO);
  let sessionStorage = window.sessionStorage;
  const [login2, setLogin2] = useState(sessionStorage.getItem("userId"));

  const handleLogin = async (e) => {
    e.preventDefault();
    setLogin(await getUser({ userId: loginInfo.userId, password: loginInfo.password }));
  };

  const handleChange = (e) => {
    setLoginInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogout = () => {
    // sessionStorage.removeItem("userId");
    // onSessionClear();
    onLoad();
    sessionStorage.clear();
    setLogin(false);
    setLogin2(false);
  };

  // handleLoad();
  useEffect(() => {
    if (login) {
      sessionStorage.setItem("userId", login.userId);
      setLogin2(sessionStorage.getItem("userId"));
      sessionStorage.setItem("userInfo", login.id);
      onLogin(sessionStorage.getItem("userId"));
    }

    return () => {
      // sessionStorage.clear();
      // setLogin(false);
    };
  }, [login, sessionStorage]);

  return (
    <div className="p-3 bg-dark text-white">
      <div className="d-flex flex-wrap align-items-center justify-content-space-between containDiv ">
        <Link
          // id="homeBtn"
          className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none"
          to="/"
          onClick={onLoad}
        >
          <img src={require("../img/logo.png")} alt="logo" width="60px" />
        </Link>
        {login2 ? (
          <div className="loginMenu">
            <label className="btn btn-outline-light me-2" htmlFor="menu">
              {sessionStorage.getItem("userId")}
            </label>
            <input id="menu" type="checkbox" />
            <ul className="myMenu">
              <li>
                <Link to="/myStudy" onClick={onMyStudy}>
                  <button type="button" className="btn me-2 btn-outline-dark">
                    MyStudy
                  </button>
                </Link>
              </li>
              <li>
                <Link to="/modForm">
                  {" "}
                  <button type="button" className="btn me-2 btn-outline-dark">
                    MyInfo
                  </button>
                </Link>
              </li>
              <li>
                <Link to="" onClick={handleLogout}>
                  <button type="button" className="btn me-2 btn-outline-dark">
                    LogOut
                  </button>
                </Link>
              </li>
            </ul>
          </div>
        ) : (
          <form
            className="TopMenuItem d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start"
            onSubmit={handleLogin}
          >
            {/* <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0"> */}

            <div className="loginDiv ">
              <span className="px-2 text-white">ID</span>
              <input type="text" name="userId" className="loginInput" onChange={handleChange} />
              <span className="px-2 text-white"> Password</span>
              <input type="password" name="password" className="loginInput" onChange={handleChange} />
            </div>
            <div className="text-end">
              <button type="submit" className="btn btn-outline-light me-2">
                Login
              </button>
              <Link to="/joinForm">
                <button type="button" className="btn btn-warning">
                  Sign-up
                </button>
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default TopMenu;
