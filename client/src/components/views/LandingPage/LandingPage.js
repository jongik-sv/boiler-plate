import React, { useEffect } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";

function LandingPage(props) {
  useEffect(() => {
    // LandingPage에 들어오자 마자 실행한다. 
    // class의 constructor의 역할인듯...
    axios.get("/api/hello").then((response) => console.log(response.data));
  }, []);

  // 간단해서 Redux없이 함
  const onClickHandler = () => {
    axios.get(`/api/users/logout`).then((response) => {
      if (response.data.success) {
        props.history.push("/login");
      } else {
        alert("로그아웃 하는데 실패 했습니다.");
      }
    });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <h2>시작 페이지</h2>

      <button onClick={onClickHandler}>로그아웃</button>
    </div>
  );
}

export default withRouter(LandingPage);
