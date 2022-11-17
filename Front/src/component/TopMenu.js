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
    console.log(loginInfo);
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
          {/* <img /> 프로플사진*/}
          <button>{loginInfo.userId}</button>
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
        </form>
      )}
    </div>
  );
}

export default TopMenu;
