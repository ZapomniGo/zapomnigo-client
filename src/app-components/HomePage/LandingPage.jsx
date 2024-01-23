import React from "react";
import { Background } from "../Forms/FormsBackground/Background";
import { useNavigate } from "react-router-dom";
const HomePage = () => {
  const navigate = useNavigate();
  React.useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/app");
    }
  }, []);
  return (
    <div id="mainPage">
      <section id="backgroundForm">
        <Background />
        <div id="center-center">
          <h1 id="header">ЗапомниГо</h1>
          <h2 id="mainSubTitle">Платформа, която ти помага да запомняш</h2>
          <center>
            {" "}
            <button onClick={() => navigate("/app")} id="look-in">
              Разгледай
            </button>
          </center>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
