import { useEffect, useState } from "react";
import { delComment, getComment, modComment, writeComment } from "../api";
import CommentForm from "./CommentForm";
import "./Comment.css";

function CommentListItem({ comment, onDelete, onModify }) {
  const { id, userId, content } = comment;
  const [commentState, setCommentState] = useState("comment");
  const handleDelete = () => {
    onDelete(id);
  };
  const setModify = () => {
    setCommentState("modify");
  };
  const handleModify = async (commentData) => {
    setCommentState("comment");
    onModify(id, commentData);
  };
  return (
    <div className="comment">
      {commentState == "comment" ? (
        <>
          <div className="writerId">
            {userId}
            <div>
              <button onClick={handleDelete}>삭제</button>
              <button onClick={setModify}>수정</button>
            </div>
          </div>

          <div className="commentText">{content}</div>
        </>
      ) : (
        <CommentForm handleClick={handleModify} />
      )}
    </div>
  );
}

function CommentList({ studyId }) {
  const [comments, setComments] = useState();

  const commentLoad = async () => {
    setComments(await getComment(studyId));
  };
  const handleCommentDelete = (id) => {
    delComment(id);
    commentLoad();
  };

  const checkAndForm = (commentData) => {
    if (sessionStorage.getItem("userId") == null) {
      alert("로그인 상태에서만 작성 가능합니다.");
      return;
    }
    const formData = new FormData();
    formData.append("studyId", studyId);
    formData.append("userId", sessionStorage.getItem("userId"));
    // formData.append("password", commentData.password);
    formData.append("content", commentData.content);
    formData.append("parentCommentId", commentData.parentCommentId);
    return formData;
  };

  const handleWrite = async (commentData) => {
    await writeComment(checkAndForm(commentData));
    commentLoad();
  };

  const handleModify = async (id, commentData) => {
    modComment(id, checkAndForm(commentData));
    commentLoad();
  };

  useEffect(() => {
    commentLoad();
  }, []);
  return (
    <div className="CommentList">
      <hr></hr>
      {/* {studyId} */}
      {comments &&
        comments.map((comment) => {
          return (
            <CommentListItem
              key={comment.id}
              comment={comment}
              onDelete={handleCommentDelete}
              onModify={handleModify}
            />
          );
        })}
      <CommentForm handleClick={handleWrite} />
    </div>
  );
}

export default CommentList;
