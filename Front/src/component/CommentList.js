import { useEffect, useState } from "react";
import { getComment, writeComment } from "../api";
import CommentForm from "./CommentForm";

function CommentListItem({ comment }) {
  const { userId, content } = comment;

  const handleCommentDelete = () => {};

  return (
    <div className="commentForm">
      {comment && (
        <>
          <span className="writerId">{userId}</span>
          <span className="commentText">{content}</span>
          <button onClick={handleCommentDelete}>삭제</button>
          <button>수정</button>
        </>
      )}
    </div>
  );
}

function CommentList({ studyId }) {
  const [comments, setComments] = useState();
  console.log(studyId);
  const commentLoad = async () => {
    setComments(await getComment(studyId));
  };
  const handleWrite = async (commentData) => {
    if (sessionStorage.getItem("userId") == null) {
      alert("로그인 상태에서만 작성 가능합니다.");
      return;
    }
    console.log(commentData);
    const formData = new FormData();
    formData.append("studyId", studyId);
    formData.append("userId", commentData.userId);
    formData.append("password", commentData.password);
    formData.append("content", commentData.content);
    formData.append("parentCommentId", commentData.parentCommentId);

    await writeComment(formData);
    commentLoad();
  };
  useEffect(() => {
    commentLoad();
  }, []);
  return (
    <div className="CommentList">
      {/* {studyId} */}
      {comments &&
        comments.map((comment) => {
          return <CommentListItem key={comment.id} comment={comment} />;
        })}
      <CommentForm handleClick={handleWrite} />
    </div>
  );
}

export default CommentList;
