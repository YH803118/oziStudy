import { useState } from "react";
import { regiStudy } from "../api";
import Tag from "./Tag";
const INITIAL_VALUES = {
  leader: sessionStorage.getItem("userId"),
  title: "",
  content: "",
  tag: "",
};

function StudyInputForm() {
  const [regiData, setRegiData] = useState(INITIAL_VALUES);
  const handleRegiSubmit = async () => {
    const formData = new FormData();
    formData.append("leader", regiData.leader);
    formData.append("title", regiData.title);
    formData.append("content", regiData.content);
    formData.append("tag", regiData.tag);

    await regiStudy(formData);
  };

  const handleChange = (e) => {
    setRegiData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <>
      <form onSubmit={handleRegiSubmit} action="/">
        제목:
        <input
          type="text"
          name="title"
          placeholder="제목"
          onChange={handleChange}
        />
        <br />
        내용:
        <br />
        <textarea
          name="content"
          rows="5"
          cols="50"
          placeholder="내용을 입력해주세요.."
          onChange={handleChange}
        />
        <br />
        모집분야 태그: <Tag />
      </form>
    </>
  );
}

export default StudyInputForm;
