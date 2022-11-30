import { useState } from "react";
import { modMember } from "../api";
import FileInput from "./FileInput";
import "./ModForm.css";
import { useAsync } from "react-async";
import { getUserInfo } from "./StudyFormDetail";

const INITIAL_VALUES = {
  password: "",
  name: "",
  email: "",
  imageUrl: null,
};

function ModForm() {
  const [modData, setModData] = useState(INITIAL_VALUES);
  const id = window.sessionStorage.getItem("userId");
  console.log(id);

  const { data: user } = useAsync({
    promiseFn: getUserInfo,
    userId: id,
    watch: id,
  });

  console.log(user);

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
    await modMember(id, formData);
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
        아이디 : <input name="userId" value={id} onChange={handleInputChange} />
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
