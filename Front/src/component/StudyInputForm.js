import { useState } from "react";
import { regiStudy } from "../api";
import Tag from "./Tag";
import "./StudyInputForm.css";
const INITIAL_VALUES = {
  leader: "",
  title: "",
  content: "",
  tag: "",
};

function StudyInputForm({ userId }) {
  const [regiData, setRegiData] = useState(INITIAL_VALUES);

  const handleRegiSubmit = async () => {
    const formData = new FormData();
    formData.append("leader", userId);
    formData.append("title", regiData.title);
    formData.append("content", regiData.content);
    formData.append("tag", regiData.tag);

    await regiStudy(formData);

    document.getElementById("submit").submit();
  };

  const handleChange = (name, value) => {
    setRegiData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    handleChange(name, value);
  };
  return (
    <>
      <form action="/" id="submit">
        제목:
        <input
          type="text"
          name="title"
          placeholder="제목"
          onChange={handleInputChange}
        />
        <br />
        내용:
        <br />
        <textarea
          name="content"
          rows="5"
          cols="50"
          placeholder="내용을 입력해주세요.."
          onChange={handleInputChange}
        />
        <br />
        모집분야 태그: <Tag onChange={handleChange} />
        <br />
      </form>
      <button onClick={handleRegiSubmit}>작성하기</button>
    </>
  );
}

export default StudyInputForm;
