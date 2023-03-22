import "./Bottom.css";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

function Bottom() {
  const [popMail, setPopMail] = useState(false);
  const [popAddress, setPopAddress] = useState(false);

  const ballonEffect1 = () => {
    console.log("event");
    if (popMail) setPopMail(false);
    else {
      setPopMail(true);
      setPopAddress(false);
    }
  };
  const ballonEffect2 = () => {
    if (popAddress) setPopAddress(false);
    else {
      setPopAddress(true);
      setPopMail(false);
    }
  };
  const disBallon = () => {
    setPopAddress(false);
    setPopMail(false);
  };

  useEffect(() => {}, [popMail, popAddress]);
  // const ballonEffect1 = () => {
  //   const ballon1 = document.querySelectorAll(".ballon")[0];
  //   const ballon2 = document.querySelectorAll(".ballon2")[0];
  //   ballon2.style.display = "none";

  //   ballon1.style.display = "block";
  // };

  // const ballonEffect2 = () => {
  //   const ballon1 = document.querySelectorAll(".ballon")[0];
  //   const ballon2 = document.querySelectorAll(".ballon2")[0];
  //   ballon1.style.display = "none";

  //   ballon2.style.display = "block";
  // };

  // const disBallon = () => {
  //   const ballon1 = document.querySelectorAll(".ballon")[0];
  //   const ballon2 = document.querySelectorAll(".ballon2")[0];
  //   ballon1.style.display = "none";

  //   ballon2.style.display = "none";
  // };

  return (
    <>
      <div className="footer">
        <div class="container" onMouseUp={disBallon}>
          <footer class="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
            <div class="col-md-4 d-flex align-items-center" />

            <ul class="nav col-md-4 justify-content-end list-unstyled d-flex">
              <li class="ms-3">
                <a href="https://github.com/YH803118/oziStudy" target="_black" class="text-muted">
                  <svg class="bi" width="30" height="30">
                    <FontAwesomeIcon icon={faGithub} color="black" />
                  </svg>
                </a>
              </li>
              <li class="ms-3" onClick={ballonEffect1}>
                {popMail ? (
                  <div className="popUpDiv">
                    <p className="ballon">
                      윤지섭:marrtil@naver.com
                      <br />
                      김영환:dudghks1045@naver.com
                    </p>
                  </div>
                ) : (
                  <></>
                )}
                <svg class="bi" width="30" height="30">
                  <FontAwesomeIcon icon={faEnvelope} color="#00cfd5" />
                </svg>
              </li>
              <li class="ms-3" onClick={ballonEffect2}>
                {popAddress ? (
                  <div className="popUpDiv">
                    <p className="ballon2">
                      윤지섭:010-8341-2331
                      <br />
                      김영환:010-2948-2645
                    </p>
                  </div>
                ) : (
                  <></>
                )}
                <svg class="bi" width="30" height="30">
                  <FontAwesomeIcon icon={faPhone} color="black" />
                </svg>
              </li>
            </ul>
          </footer>
        </div>
      </div>
      {/* <div id="container" onMouseUp={disBallon}>
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
            <FontAwesomeIcon icon={faEnvelope} color="#00cfd5" onClick={ballonEffect1} />
            <p className="icon-font">이메일</p>
          </div>
          <div className="icon">
            <p className="ballon2">
              윤지섭:010-8341-2331
              <br />
              김영환:010-2948-2645
            </p>
            <FontAwesomeIcon icon={faPhone} color="black" onClick={ballonEffect2} />
            <p className="icon-font">전화</p>
          </div>
        </div>
      </div> */}
    </>
  );
}

export default Bottom;
