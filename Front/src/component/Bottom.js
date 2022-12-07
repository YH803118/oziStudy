import "./Bottom.css";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function bottom() {
  const ballonEffect1 = () => {
    const ballon1 = document.querySelectorAll(".ballon")[0];
    const ballon2 = document.querySelectorAll(".ballon2")[0];
    ballon2.style.display = "none";

    ballon1.style.display = "block";
  };

  const ballonEffect2 = () => {
    const ballon1 = document.querySelectorAll(".ballon")[0];
    const ballon2 = document.querySelectorAll(".ballon2")[0];
    ballon1.style.display = "none";

    ballon2.style.display = "block";
  };

  const disBallon = () => {
    const ballon1 = document.querySelectorAll(".ballon")[0];
    const ballon2 = document.querySelectorAll(".ballon2")[0];
    ballon1.style.display = "none";

    ballon2.style.display = "none";
  };

  return (
    <>
      <div id="container" onMouseUp={disBallon}>
        <div className="container2">
          <div className="icon">
            <a href="https://github.com/YH803118/oziStudy">
              <FontAwesomeIcon icon={faGithub} color="black" />
            </a>
            <p className="icon-font">깃허브 주소</p>
          </div>
          <div className="icon">
            <p className="ballon">
              윤지섭:marrtil@naver.com
              <br />
              김영환:dudghks1045@naver.com
            </p>
            <FontAwesomeIcon
              icon={faEnvelope}
              color="#00cfd5"
              onClick={ballonEffect1}
            />
            <p className="icon-font">이메일</p>
          </div>
          <div className="icon">
            <p className="ballon2">
              윤지섭:010-8341-2331
              <br />
              김영환:010-2948-2645
            </p>
            <FontAwesomeIcon
              icon={faPhone}
              color="black"
              onClick={ballonEffect2}
            />
            <p className="icon-font">전화</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default bottom;
