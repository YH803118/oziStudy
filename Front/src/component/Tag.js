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
  const handleChange = (e) => {
    setTagItem(e.target.value);
  };
  useEffect(() => {
    console.log(tagList);
    const tagData = tagList.join(",");
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
