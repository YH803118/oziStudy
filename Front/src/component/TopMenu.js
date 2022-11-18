import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUser } from "../api";
import "./TopMenu.css";
const LOGIN_INFO = {
  userId: "",
  password: "",
};
function TopMenu() {
  const [login, setLogin] = useState(false);
  const [loginInfo, setLoginInfo] = useState(LOGIN_INFO);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLogin(
      await getUser({ userId: loginInfo.userId, password: loginInfo.password })
    );
  };

  const handleChange = (e) => {
    console.log(loginInfo);
    setLoginInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // handleLoad();
  useEffect(() => {}, []);

  return (
    <div className="TopMenu">
      {login ? (
        <div className="TopMenuItem">
          <label className="menu" htmlFor="menu">
            {loginInfo.userId}
          </label>
          <input id="menu" type="checkbox" />
          <ul className="myMenu">
            <li>
              <a href="/">내 스터디</a>
            </li>
            <li>
              <a href="/">정보 수정</a>
            </li>
            <li>
              <a href="/">로그아웃</a>
            </li>
          </ul>
        </div>
      ) : (
        <form className="TopMenuItem" onSubmit={handleLogin}>
          아이디{" "}
          <input
            type="text"
            name="userId"
            className="loginInput"
            onChange={handleChange}
          />{" "}
          | 비밀번호{" "}
          <input
            type="password"
            name="password"
            className="loginInput"
            onChange={handleChange}
          />{" "}
          | <button type="submit">로그인</button>
          <Link to="/joinForm">
            <button>회원가입</button>
          </Link>
        </form>
      )}
    </div>
  );
}

export default TopMenu;
