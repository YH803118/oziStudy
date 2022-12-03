import { useState } from "react";
const INITIAL_VALUES = {
  // password: "",
  content: "",
  parentCommentId: "",
};
function CommentForm({ handleClick }) {
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
      <textarea
        onChange={handleInputChange}
        name="content"
        className="commentInput"
        placeholder="댓글 작성"
      />
      <button onClick={onClick}>댓글쓰기</button>
    </div>
  );
}

export default CommentForm;
