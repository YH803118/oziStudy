import { useState, useEffect } from "react";
import { modMember } from "../api";
import FileInput from "./FileInput";
import "./ModForm.css";
import axios from "axios";
import { useAsync } from "react-async";

const INITIAL_VALUES = {
  password: "",
  name: "",
  email: "",
  imageUrl: null,
};

function ModForm() {
  const [modData, setModData] = useState(INITIAL_VALUES);
  const [user, setUser] = useState("");
  const userId = window.sessionStorage.getItem("userId");

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/members/${userId}`)
      .then((response) => {
        setUser(response.data);
      });
  }, []);

  console.log(user.imageUrl);

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
    console.log(modData.imageUrl);
    const formData = new FormData();
    formData.append("password", modData.password);
    formData.append("name", modData.name);
    formData.append("email", modData.email);
    formData.append("tag", "Front");
    if (modData.imageUrl != "") {
      formData.append("imageUrl", modData.imageUrl);
    }
    await modMember(userId, formData);
  };
  return (
    <div id="back">
      <div id="helper"></div>
      <form onSubmit={handleModify} action="/" id="modForm">
        프로필 이미지 등록
        <FileInput
          name="imageUrl"
          value={modData.imageUrl}
          onChange={handleChange}
          initialPreview={user.imageUrl}
        />
        아이디 :{" "}
        <input name="userId" value={userId} onChange={handleInputChange} />
        <br />
        비밀번호 :{" "}
        <input
          name="password"
          type="password"
          onChange={handleInputChange}
          value={modData.password}
        />
        <br />
        이름 :{" "}
        <input name="name" onChange={handleInputChange} value={modData.name} />
        <br />
        이메일 :{" "}
        <input
          name="email"
          onChange={handleInputChange}
          value={modData.email}
        />
        <br />
        <button type="submit">수정하기</button>
      </form>
    </div>
  );
}

export default ModForm;
