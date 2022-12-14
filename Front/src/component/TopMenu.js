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
    setLogin(
      await getUser({ userId: loginInfo.userId, password: loginInfo.password })
    );
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
    <div className="TopMenu">
      {" "}
      <Link id="homeBtn" to="/" onClick={onLoad}>
        <img src={require("../img/logo.png")} alt="logo" width="60px" />
      </Link>
      {login2 ? (
        <div className="TopMenuItem">
          <label className="menu" htmlFor="menu">
            {sessionStorage.getItem("userId")}
          </label>
          <input id="menu" type="checkbox" />
          <ul className="myMenu">
            <li>
              <Link to="/myStudy" onClick={onMyStudy}>
                내 스터디
              </Link>
            </li>
            <li>
              <Link to="/modForm">정보 수정</Link>
            </li>
            <li>
              <Link to="" onClick={handleLogout}>
                로그아웃
              </Link>
            </li>
          </ul>
        </div>
      ) : (
        <form className="TopMenuItem" onSubmit={handleLogin}>
          <span>아이디 </span>
          <input
            type="text"
            name="userId"
            className="loginInput"
            onChange={handleChange}
          />{" "}
          | <span>비밀번호 </span>
          <input
            type="password"
            name="password"
            className="loginInput"
            onChange={handleChange}
          />{" "}
          |<button type="submit">로그인</button>|
          <Link to="/joinForm">
            <button>회원가입</button>
          </Link>
          |
        </form>
      )}
    </div>
  );
}

export default TopMenu;
