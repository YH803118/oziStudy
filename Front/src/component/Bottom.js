import "./Bottom.css";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function bottom() {
  return (
    <div id="container">
      <div className="container2">
        <div className="icon">
          <a href="https://github.com/YH803118/oziStudy">
            <FontAwesomeIcon icon={faGithub} color="black" />
          </a>
          <p className="icon-font">깃허브 주소</p>
        </div>
        <div className="icon">
          <FontAwesomeIcon icon={faEnvelope} color="#00cfd5" />
          <p className="icon-font">이메일</p>
        </div>
        &nbsp;
        <div className="icon">
          <FontAwesomeIcon icon={faPhone} color="black" />
          <p className="icon-font">전화</p>
        </div>
      </div>
    </div>
  );
}

export default bottom;
