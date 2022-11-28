import React, { useState, useEffect } from "react";
import "./Tag.css";

const Tag = ({ onChange }) => {
  const [tagItem, setTagItem] = useState("");
  const [tagList, setTagList] = useState([]);

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
    const tagData = tagList.join(",");
    onChange("tag", tagData);
  }, [tagList]);

  return (
    <>
      <input
        type="text"
        onKeyPress={onKeyPress}
        onChange={(e) => setTagItem(e.target.value)}
        value={tagItem}
        id="tagInput"
      />

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
    </>
  );
};

export default Tag;
