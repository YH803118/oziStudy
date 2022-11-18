import { useState } from "react";
import { modMember } from "../api";
import FileInput from "./FileInput";

const INITIAL_VALUES = {
  userId: "",
  password: "",
  name: "",
  email: "",
  imgFile: null,
};

function modForm({ userId, initialPreView, initailValues = INITIAL_VALUES }) {
  //아직 넘겨받을걸 설정하지않아서 이렇게
  const [modData, setModData] = useState(initailValues);

  const handleChange = (e) => {
    setModData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleModify = async () => {
    const formData = new FormData();
    formData.append("userId", modData.userId);
    formData.append("password", modData.password);
    formData.append("name", modData.name);
    formData.append("email", modData.email);
    formData.append("tag", "Front");
    formData.append("imgFile", modData.imgFile);

    const result = await modMember(userId, formData);
  };
  return (
    <>
      <form onSubmit={handleModify}>
        프로필 이미지 등록
        <FileInput
          name="imgFile"
          value={modData.imgFile}
          onChange={handleChange}
          initialPreview={initialPreView}
        />
        아이디 :{" "}
        <input
          name="userId"
          onChange={handleChange}
          value={modData.userId}
          readOnly
        />
        <br />
        비밀번호 :{" "}
        <input
          name="password"
          onChange={handleChange}
          value={modData.password}
        />
        <br />
        이름 :{" "}
        <input name="name" onChange={handleChange} value={modData.name} />
        <br />
        이메일 :{" "}
        <input name="email" onChange={handleChange} value={modData.email} />
        <br />
        <button type="submit">수정하기</button>
      </form>
    </>
  );
}

export default modForm();
