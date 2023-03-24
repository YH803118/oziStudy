import { useState, useEffect } from "react";
import { modMember } from "../api";
import FileInput from "./FileInput";
import "./ModForm.css";
import axios from "axios";
import PassConfirm from "./PassConfirm";

const INITIAL_VALUES = {
  password: "",
  name: "",
  email: "",
  imageUrl: null,
  imageFile: null,
};

const inputName = {
  password: "비밀번호",
  passwordCheck: "비밀번호 확인",
  name: "이름",
  email: "이메일",
};

function ModForm() {
  const [modData, setModData] = useState(INITIAL_VALUES);
  const [checkPass, setCheckPass] = useState("");
  const [passConfirm, setPassConfirm] = useState(false);
  const userId = window.sessionStorage.getItem("userId");
  useEffect(() => {
    axios
      .get(`https://ozitest.herokuapp.com/api/members/${userId}`) //로그인 아이디를 통해 해당 아이디 유저를 불러옴
      .then((response) => {
        setModData({ ...response.data, password: null, imageFile: null });
      });
  }, [userId]);

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
    var inputs = Object.keys(modData);
    for (let i of inputs) {
      if (modData[i] === "") {
        alert(`${inputName[i]}을 입력해주세요`);
        e.preventDefault();
        return;
      }
    }
    if (!passConfirm) {
      alert("비밀번호를 확인해 주세요!!");
      e.preventDefault();
    } else {
      const formData = new FormData();
      formData.append("password", modData.password);
      formData.append("name", modData.name);
      formData.append("email", modData.email);
      formData.append("tag", "Front");
      if (modData.imageUrl !== "") {
        formData.append("imageFile", modData.imageFile);
      }
      await modMember(userId, formData);
    }
  };

  const passCheck = (e) => {
    setCheckPass(e.target.value);
    if (e.target.value === modData.password) {
      setPassConfirm(true);
    } else {
      setPassConfirm(false);
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
          name="imageFile"
          value={modData.imageFile}
          onChange={handleChange}
          initialPreview={modData.imageUrl}
        />
        <br />
        <div>프로필 이미지 등록</div>
        <br />
        <div className="inputName">아이디</div>
        <input
          name="userId"
          value={userId}
          onChange={handleInputChange}
          id="idInput"
          className="modInput"
          disabled="readonly"
        />
        <br />
        <div className="inputName">비밀번호</div>
        <input
          name="password"
          type="password"
          onChange={handleInputChange}
          value={modData.password}
          placeholder="새 비밀번호"
          className="modInput"
        />
        <br />
        <div className="inputName"></div>
        <input
          name="passwordCheck"
          onChange={passCheck}
          className="modInput"
          placeholder="새 비밀번호 확인"
        />
        <br />
        <div id="confirmer"> </div>
        {checkPass && modData.password ? (
          <PassConfirm confirm={passConfirm} />
        ) : (
          <></>
        )}
        <br />
        <div className="inputName">이름</div>
        <input
          name="name"
          onChange={handleInputChange}
          value={modData.name}
          className="modInput"
        />
        <br />
        <div className="inputName">이메일</div>
        <input
          name="email"
          value={modData.email}
          onChange={handleInputChange}
          className="modInput"
        />
        <br />
        <button type="submit" class="btn btn-success">
          수정하기
        </button>
      </form>
    </div>
  );
}

export default ModForm;
