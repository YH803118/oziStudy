import "./PassConfirm.css";

function passConfirm({ confirm }) {
  return confirm ? (
    <div className="alert alert-success alewid" role="alert">
      비밀번호가 일치합니다.
    </div>
  ) : (
    <div className="alert alert-danger alewid" role="alert">
      비밀번호가 일치하지 않습니다!
    </div>
  );
}

export default passConfirm;
