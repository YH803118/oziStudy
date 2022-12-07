import { useState } from "react";
const INITIAL_VALUES = {
  // password: "",
  content: "",
  parentCommentId: "",
};
function CommentForm({ handleClick, modContent }) {
  const [commentData, setCommentData] = useState(INITIAL_VALUES);
  const handleChange = (name, value) => {
    setCommentData((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log(commentData);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    handleChange(name, value);
  };
  const onClick = () => {
    handleClick(commentData);
    setCommentData(INITIAL_VALUES);
    document.querySelector(".commentInput").value = "";
  };
  return (
    <div className="commentForm">
      <div className="commentFormTitle">
        <span id="comSpan">댓글 작성</span>
        <span id="comId">{sessionStorage.getItem("userId")}</span>
      </div>
      <textarea
        onChange={handleInputChange}
        name="content"
        className="commentInput"
        placeholder="댓글 작성"
      >
        {modContent}
      </textarea>
      <div className="commentFormBtnDiv">
        <button className="commentFormBtn" onClick={onClick}>
          댓글쓰기
        </button>
      </div>
    </div>
  );
}

export default CommentForm;
