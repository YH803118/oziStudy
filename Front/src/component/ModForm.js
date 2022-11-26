import { useState } from "react";
import { modMember } from "../api";
import FileInput from "./FileInput";
import "./ModForm.css";

const INITIAL_VALUES = {
  password: "",
  name: "",
  email: "",
  imageUrl: null,
};

function ModForm({ userId, initialPreView, initailValues = INITIAL_VALUES }) {
  const [modData, setModData] = useState(initailValues);
  let sessionStorage = window.sessionStorage;
  console.log(sessionStorage.getItem("userId"));
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
    formData.append("imageUrl", modData.imageUrl);
    await modMember(sessionStorage.getItem("userId"), formData);
  };
  return (
    <>
      <form onSubmit={handleModify} action="/" id="modForm">
        프로필 이미지 등록
        <FileInput
          name="imageUrl"
          value={modData.imageUrl}
          onChange={handleChange}
          initialPreview={initialPreView}
        />
        아이디 :{" "}
        <input
          name="userId"
          value={sessionStorage.getItem("userId")}
          onChange={handleInputChange}
        />
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
    </>
  );
}

export default ModForm;
