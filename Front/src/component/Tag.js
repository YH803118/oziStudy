import React, { useState, useEffect } from "react";
import "./Tag.css";

const Tag = ({ onChange, tags = "" }) => {
  const [tagItem, setTagItem] = useState("");
  const [tagList, setTagList] = useState([]);
  const [load, setLoad] = useState("");

  const handleLoad = () => {
    if (tags) {
      tags.split(",").map((tag) => {
        setTagList((prev) => [...prev, tag]); //작성자가 게시물을 수정하려할때 들어온 태그 정보를 split을 통해 태그들을 분해한다
      });
    }
  };

  const onKeyPress = (e) => {
    if (e.target.value.length !== 0 && e.key === "Enter") {
      submitTagItem(); //엔터를 눌렀을때 인풋창에 있는 내용을 tagList에 넣기 위한 함수를 실행한다
    }
  };

  const submitTagItem = () => {
    setTagList((prevItem) => [...prevItem, tagItem]); //참조형 state를 즉각 반영시키기 위해 이런식으로
    setTagItem(""); //태그를 추가하면 인풋창을 비워준다
  };

  const deleteTagItem = (e) => {
    const deleteTagItem = e.target.getAttribute("id"); //li의 id를 태그의 이름으로 설정하였고 그 값을 받아온다
    const filteredTagList = tagList.filter(
      // filter함수를 통해 해당id가 아닌것들만 걸러내어 tagList로 변경한다
      (tagItem) => tagItem !== deleteTagItem
    );
    setTagList(filteredTagList);
  };
  const handleChange = (e) => {
    setTagItem(e.target.value);
  };
  useEffect(() => {
    const tagData = tagList.join(","); //tagList가 변경될때마다 modForm의 tagData.tag의 값을 tagList의 요소들을 ,로 연결한 string으로 전달
    onChange("tag", tagData);
  }, [tagList]);

  if (tagList.length == 0) handleLoad();

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
          {tagList.map((tag) => {
            return (
              <>
                <li onClick={deleteTagItem} key={tag}>
                  <lable id={tag}>#{tag}</lable>
                  &nbsp;
                </li>
              </>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default Tag;
