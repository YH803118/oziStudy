import React, { useState } from "react";
import "./Tag.css";

const Tag = ({ onChange, tags = [] }) => {
  const [tagItem, setTagItem] = useState("");

  const onKeyPress = (e) => {
    if (e.target.value.length !== 0 && e.key === "Enter") {
      submitTagItem(); //엔터를 눌렀을때 인풋창에 있는 내용을 tagList에 넣기 위한 함수를 실행한다
    }
  };

  const submitTagItem = () => {
    onChange("tag", [...tags, tagItem]); //참조형 state를 즉각 반영시키기 위해 이런식으로
    setTagItem(""); //태그를 추가하면 인풋창을 비워준다
  };

  const deleteTagItem = (e) => {
    const deleteTagItem = e.target.getAttribute("id"); //li의 id를 태그의 이름으로 설정하였고 그 값을 받아온다
    onChange(
      "tag",
      tags.filter(
        // filter함수를 통해 해당id가 아닌것들만 걸러내어 tagList로 변경한다
        (tagItem) => tagItem !== deleteTagItem
      )
    );
  };
  const handleChange = (e) => {
    setTagItem(e.target.value);
  };

  return (
    <>
      <div className="tagInputDiv">
        태그 입력 :{" "}
        <input
          type="text"
          onKeyPress={onKeyPress}
          onChange={handleChange}
          value={tagItem}
          id="tagInput"
        />
      </div>
      <div>
        <ul className="tag">
          {tags.length
            ? tags.map((tag) => {
                return (
                  <>
                    <li onClick={deleteTagItem} key={tag}>
                      {" "}
                      {/*li의 내용이 #요소이므로 id를 해당내용으로 하여 삭제에 사용할수있게한다  */}
                      <label id={tag}>#{tag}</label>
                      &nbsp;
                    </li>
                  </>
                );
              })
            : ""}
        </ul>
      </div>
    </>
  );
};

export default Tag;
