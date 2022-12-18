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
        {/* <form action="/api/input" id="submit" method="post"> */}
        <form action="/" id="submit">
          <input
            type="text"
            name="title"
            placeholder="제목"
            onChange={handleInputChange}
            id="title"
          />
          <div className="tags">
            {regiData.tag ? (
              <Tag onChange={handleChange} tags={regiData.tag} />
            ) : (
              <Tag onChange={handleChange} />
            )}
          </div>
          <hr></hr>
          <textarea
            name="content"
            rows="20"
            cols="70"
            placeholder="내용을 입력해주세요.."
            onChange={handleInputChange}
            id="content"
          />
        </form>
        <button onClick={handleRegiSubmit} id="submitButton">
          작성하기
        </button>{" "}
        {/*폼 안에 버튼이 있으면 태그입력을 위해 엔터를 눌렀을때 submit이 되어버리기때문에 바깥에버튼을 두고 서브밋 역할을하는 함수를 설정*/}
      </div>
    </div>
  );
}

export default StudyInputForm;
