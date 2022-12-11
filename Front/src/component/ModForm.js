import { useState, useEffect } from "react";
import { modMember } from "../api";
import FileInput from "./FileInput";
import "./ModForm.css";
import axios from "axios";

const INITIAL_VALUES = {
  password: "",
  name: "",
  email: "",
  imageUrl: null,
  imageFile: null,
};

const inputName = {
  name: "이름",
  userId: "아이디",
  password: "비밀번호",
  passwordCheck: "비밀번호 확인",
};

function ModForm() {
  const [modData, setModData] = useState(INITIAL_VALUES);
  const [user, setUser] = useState("");
  const [passConfirm, setPassConfirm] = useState(false);
  const userId = window.sessionStorage.getItem("userId");
  const userURL = `/api/members/${userId}`;
  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/members/${userId}`)
      .then((response) => {
        setUser(response.data);
      });
  }, []);

  const handleChange = (name, value) => {
    setModData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    handleChange(name, value);
  };

  const handleModify = async (e) => {
    var inputs = document.querySelectorAll(".modInput");
    for (let i = 0; i < inputs.length; i++) {
      if (inputs[i].value == "") {
        alert(`${inputName[inputs[i].name]}을 입력해주세요`);
        e.preventDefault();
        return;
      }
    }
    if (!passConfirm) {
      alert("비밀번호를 확인해 주세요!!");
      e.preventDefault();
    } else if (modData.password == user.password) {
      alert("비밀번호가 현재와 똑같습니다");
      e.preventDefault();
    } else {
      const formData = new FormData();
      formData.append("password", modData.password);
      formData.append("name", modData.name);
      formData.append("email", modData.email);
      formData.append("tag", "Front");
      if (modData.imageUrl != "") {
        formData.append("imageUrl", modData.imageUrl);
      }
      await modMember(userId, formData);
    }
  };

  const passCheck = (e) => {
    var labelFont = document.getElementById("passConfirm");

    if (e.target.value == "") labelFont.innerText = "";
    else if (e.target.value == modData.password) {
      labelFont.innerText = "비밀번호가 일치합니다.";
      setPassConfirm(true);
      labelFont.style.color = "lightGreen";
    } else {
      labelFont.innerText = "비밀번호가 일치하지 않습니다!!";
      setPassConfirm(false);
      labelFont.style.color = "red";
    }
  };
  return (
    <div id="back">
      <form
        onSubmit={handleModify}
        action="/"
        id="modForm"
        encType="multipart/form-data"
      >
        <FileInput
          name="imageUrl"
          value={modData.imageUrl}
          onChange={handleChange}
          initialPreview={user.imageUrl}
        />
        프로필 이미지 등록
        <br />
        &nbsp; 아이디{" "}
        <input
          name="userId"
          value={userId}
          onChange={handleInputChange}
          id="idInput"
          className="modInput"
          disabled="readonly"
        />
        <br />
        &nbsp; 비밀번호{" "}
        <input
          name="password"
          type="password"
          onChange={handleInputChange}
          value={modData.password}
          id="passInput"
          placeholder="새 비밀번호"
          className="modInput"
        />
        <br />
        <input
          name="passwordCheck"
          onChange={passCheck}
          className="modInput"
          placeholder="새 비밀번호 확인"
          id="passCheck"
        />
        <br />
        <label id="passConfirm"></label>
        <br />
        &nbsp; 이름{" "}
        <input
          name="name"
          onChange={handleInputChange}
          value={modData.name}
          id="nameInput"
          className="modInput"
        />
        <br />
        &nbsp; 이메일{" "}
        <input
          name="email"
          onChange={handleInputChange}
          value={modData.email}
          id="emailInput"
          className="modInput"
        />
        <br />
        <button type="submit" id="modSubmit">
          {/* <button onClick={handleModify} id="modSubmit"> */}
          수정하기
        </button>
      </form>
    </div>
  );
}

export default ModForm;
