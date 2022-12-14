import { useState } from "react";
import { getUserInfo, joinMember } from "../api";
import "./JoinForm.css";
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
  const [idConfrim, setIdConfirm] = useState(false);
  const [passConfirm, setPassConfirm] = useState(false);

  const handleChange = (e) => {
    setJoinData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleJoinSubmit = async (e) => {
    var inputs = document.querySelectorAll(".joinInput");
    for (let i = 0; i < inputs.length; i++) {
      if (inputs[i].value == "") {
        alert(`${inputName[inputs[i].name]}을 입력해주세요`);
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
      // console.log(result);
    }
  };

  const handleOverlapCheck = async (e) => {
    e.preventDefault();
    const check = await getUserInfo(joinData.userId);
    console.log(check.userId);
    if (check.userId) {
      setIdConfirm(false);
      alert("이미 존재하는 아이디 입니다!!");
    } else {
      setIdConfirm(true);
      alert("사용 가능한 아이디 입니다.");
    }
  };

  const passCheck = (e) => {
    var labelFont = document.getElementById("passConfirm");
    if (e.target.value == joinData.password) {
      labelFont.innerText = "비밀번호가 일치합니다.";
      setPassConfirm(true);
      labelFont.style.color = "lightGreen";
    } else if (e.target.value == "") setPassConfirm("");
    else {
      labelFont.innerText = "비밀번호가 일치하지 않습니다!!";
      setPassConfirm(false);
      labelFont.style.color = "red";
    }
  };

  return (
    <div>
      <form onSubmit={handleJoinSubmit} className="joinForm" action="/">
        <label id="idLabel">아이디</label> <br />
        <input
          name="userId"
          onChange={handleChange}
          id="idInputJ"
          className="joinInput"
        />{" "}
        <button onClick={handleOverlapCheck} id="idCheck">
          중복확인
        </button>
        <br />
        <label id="passLabel">비밀번호</label> <br />
        <input
          name="password"
          onChange={handleChange}
          id="passInputJ"
          className="joinInput"
        />
        <br />
        <input
          name="passwordCheck"
          onChange={passCheck}
          className="joinInput"
          id="passCheckJ"
        />
        <br />
        <label id="passConfirm"></label>
        <br />
        <label id="nameLabel">이름</label> <br />
        <input
          name="name"
          onChange={handleChange}
          id="nameInputJ"
          className="joinInput"
        />
        <br />
        <label id="emailLabel">이메일</label> <br />
        <input
          type="email"
          name="email"
          onChange={handleChange}
          className="joinInput"
          id="emailInputJ"
        />
        <br />
        <button type="submit" id="joinSubmit">
          가입하기
        </button>
      </form>
    </div>
  );
}

export default JoinForm;
