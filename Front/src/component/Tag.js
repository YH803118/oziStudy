import React, { useState, useEffect } from "react";
import "./Tag.css";

const Tag = ({ onChange, tags = "" }) => {
  const [tagItem, setTagItem] = useState("");
  const [tagList, setTagList] = useState([]);
  const [load, setLoad] = useState("");

  const handleLoad = () => {
    if (tags) {
      tags.split(",").map((tag) => {
        setTagList((prev) => [...prev, tag]);
      });
    }
  };

  const onKeyPress = (e) => {
    if (e.target.value.length !== 0 && e.key === "Enter") {
      submitTagItem();
    }
  };

  const submitTagItem = () => {
    setTagList((prevItem) => [...prevItem, tagItem]);
    setTagItem("");
  };

  const deleteTagItem = (e) => {
    const deleteTagItem = e.target.getAttribute("id");
    const filteredTagList = tagList.filter(
      (tagItem) => tagItem !== deleteTagItem
    );
    setTagList(filteredTagList);
  };

  useEffect(() => {
    if (tagList.length == 0) handleLoad();
    const tagData = tagList.join(",");
    onChange("tag", tagData);
  }, [tags, tagList]);

  return (
    <>
      <div className="tagInputDiv">
        태그 입력 :{" "}
        <input
          type="text"
          onKeyPress={onKeyPress}
          onChange={(e) => setTagItem(e.target.value)}
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
                  <lable id={tag}>#</lable>
                  {tag}
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
