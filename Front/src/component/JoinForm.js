import { useState } from "react";
import { getUserInfo, joinMember } from "../api";
import "./JoinForm.css";
import PassConfirm from "./PassConfirm";
const INITIAL_VALUES = {
  userId: "",
  password: "",
  name: "",
  email: "",
};
const inputName = {
  name: "이름",
  userId: "아이디",
  password: "비밀번호",
  passwordCheck: "비밀번호 확인",
  email: "이메일",
};
function JoinForm() {
  const [joinData, setJoinData] = useState(INITIAL_VALUES);
  const [checkPass, setCheckPass] = useState("");
  const [idConfrim, setIdConfirm] = useState(false);
  const [passConfirm, setPassConfirm] = useState(false);

  const handleChange = (e) => {
    setJoinData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleJoinSubmit = async (e) => {
    const inputs = Object.keys(joinData);
    for (let i of inputs) {
      if (joinData[i] === "") {
        alert(`${inputName[i]}을(를) 입력해주세요`);
        e.preventDefault();
        return;
      }
    }
    if (!idConfrim) {
      alert("아이디 중복체크를 해주세요!");
      e.preventDefault();
    } else if (!passConfirm) {
      alert("비밀번호를 확인해 주세요!!");
      e.preventDefault();
    } else {
      const formData = new FormData();
      formData.append("userId", joinData.userId);
      formData.append("password", joinData.password);
      formData.append("name", joinData.name);
      formData.append("email", joinData.email);
      formData.append("tag", "Front");
      formData.append("imageUrl", "");
      // let result;
      try {
        await joinMember(formData);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleOverlapCheck = async (e) => {
    e.preventDefault();
    const check = await getUserInfo(joinData.userId);
    if (check.userId) {
      setIdConfirm(false);
      alert("이미 존재하는 아이디 입니다!!");
    } else {
      setIdConfirm(true);
      alert("사용 가능한 아이디 입니다.");
    }
  };

  const passCheck = (e) => {
    setCheckPass(e.target.value);
    if (e.target.value === joinData.password) {
      setPassConfirm(true);
    } else {
      setPassConfirm(false);
    }
  };

  return (
    <div className="joinForm">
      <form onSubmit={handleJoinSubmit} id="former" action="/">
        <div className="form-floating joinInput idInput">
          <input
            type="text"
            name="id"
            onChange={handleChange}
            className="form-control"
            id="floatingPassword"
            placeholder="아이디"
          />
          <label htmlFor="floatingPassword">아이디</label>
        </div>

        <button
          type="button"
          onClick={handleOverlapCheck}
          class="btn btn-secondary"
        >
          중복확인
        </button>
        <br />
        <div className="form-floating joinInput">
          <input
            type="password"
            name="password"
            onChange={handleChange}
            className="form-control"
            id="floatingPassword"
            placeholder="비밀번호"
          />
          <label htmlFor="floatingPassword">비밀번호</label>
        </div>
        <br />
        <div className="form-floating joinInput">
          <input
            type="password"
            className="form-control"
            id="floatingPassword"
            placeholder="PasswordCheck"
            name="passwordCheck"
            onChange={passCheck}
          />
          <label htmlFor="floatingPassword">비밀번호 확인</label>
        </div>
        <br />
        {checkPass && joinData.password ? (
          <PassConfirm confirm={passConfirm} />
        ) : (
          <></>
        )}
        <br />
        <div className="form-floating joinInput">
          <input
            type="text"
            name="name"
            onChange={handleChange}
            className="form-control"
            placeholder="이름"
          />
          <label htmlFor="floatingPassword">이름</label>
        </div>
        <br />
        <div className="form-floating joinInput">
          <input
            type="email"
            name="email"
            onChange={handleChange}
            className="form-control joinInput"
            id="floatingInput"
            placeholder="이메일"
          />
          <label htmlFor="floatingInput" className="inputLabel">
            이메일
          </label>
        </div>
        <br />
        <button type="submit" className="btn btn-outline-success">
          가입하기
        </button>
      </form>
    </div>
  );
}

export default JoinForm;
