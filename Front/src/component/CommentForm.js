import { useState } from "react";
const INITIAL_VALUES = {
  userId: sessionStorage.getItem("userId"),
  password: "",
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
  };
  return (
    <div className="commentForm">
      <textarea onChange={handleInputChange} name="content" />
      <input type="text" name="password" onChange={handleInputChange} />
      <button onClick={onClick}>댓글쓰기</button>
    </div>
  );
}

export default CommentForm;
