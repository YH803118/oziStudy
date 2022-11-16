import { getUser } from "../api";
import "./TopMenu.css";

function TopMenu({ login }) {
  const user = getUser();
  console.log(user);
  return (
    <div className="TopMenu">
      {login ? (
        <div className="TopMenuItem">
          {/* <img /> 프로플사진*/}
          <button>유저이름</button>
        </div>
      ) : (
        <form className="TopMenuItem">
          아이디 <input type="text" name="loginId" className="loginInput" /> |
          비밀번호 <input type="text" name="loginPw" className="loginInput" /> |{" "}
          <button type="submit">로그인</button>
        </form>
      )}
    </div>
  );
}

export default TopMenu;
