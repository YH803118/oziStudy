import { useEffect, useState } from "react";
import { getStudy, modTable, regiStudy } from "../api";
import Tag from "./Tag";
import "./StudyInputForm.css";
import { useParams } from "react-router-dom";
const INITIAL_VALUES = {
  leader: "",
  title: "",
  content: "",
  tag: "",
};

const inputName = {
  title: "제목",
  content: "내용",
};

function StudyInputForm({ userId }) {
  const { studyId } = useParams();

  const [regiData, setRegiData] = useState(INITIAL_VALUES);

  const handleLoad = async () => {
    let study;
    if (studyId) {
      study = await getStudy(studyId);
      document.querySelector("#title").value = study.title;
      document.querySelector("textarea").value = study.content;
      setRegiData({
        ...regiData,
        leader: study.leader,
        title: study.title,
        content: study.content,
        tag: study.tag,
      });
    }
  };

  const handleRegiSubmit = async () => {
    var inputs = document.querySelectorAll(".studyInput");
    for (let i = 0; i < inputs.length; i++) {
      if (inputs[i].value == "") {
        alert(`${inputName[inputs[i].name]}을 입력해주세요`);
        return;
      }
    }
    if (regiData.tag == "") {
      alert("태그를 달아주세요!");
    } else {
      const formData = new FormData();
      formData.append("leader", userId);
      formData.append("title", regiData.title);
      formData.append("content", regiData.content);
      formData.append("tag", regiData.tag);
      formData.append("userList", userId);
      if (studyId) await modTable(studyId, formData);
      else await regiStudy(formData);
      console.log(regiData);
      document.getElementById("submit").submit();
    }
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

  useEffect(() => {
    handleLoad();
  }, []);

  return (
    <div id="backGround">
      <div id="creater">
        <form action="/" id="submit">
          제목:
          <input
            type="text"
            name="title"
            placeholder="제목"
            onChange={handleInputChange}
            id="title"
            className="studyInput"
          />
          <br />
          <p id="content">내용:</p>
          <br />
          <textarea
            name="content"
            rows="20"
            cols="70"
            placeholder="내용을 입력해주세요.."
            onChange={handleInputChange}
            className="studyInput"
          />
          <br />
          모집분야 태그:
          {regiData.tag ? (
            <Tag onChange={handleChange} tags={regiData.tag} />
          ) : (
            <Tag onChange={handleChange} />
          )}
          <br />
        </form>
        <button onClick={handleRegiSubmit} id="submitButton">
          작성하기
        </button>
      </div>
    </div>
  );
}

export default StudyInputForm;
