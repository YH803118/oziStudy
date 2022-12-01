import { useEffect, useState } from "react";
import { getComment } from "../api";
import CommentForm from "./CommentForm";

function CommentList({ studyId }) {
  const [comments, setComments] = useState();
  console.log(studyId);
  const commentLoad = async () => {
    setComments(await getComment(studyId));
  };

  useEffect(() => {
    commentLoad();
  }, []);
  return (
    <div className="CommentList">
      {/* {studyId} */}
      {comments &&
        comments.map((comment) => {
          return <CommentForm key={comment.id} comment={comment} />;
        })}
    </div>
  );
}

export default CommentList;
