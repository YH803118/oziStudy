function CommentForm({ comment }) {
  const { userId, content } = comment;
  console.log(comment);
  return (
    <div className="commentForm">
      {comment ? (
        <span className="writerId">{userId}</span>
      ) : (
        <span className="wirterId">내 아이디</span>
      )}
    </div>
  );
}

export default CommentForm;
