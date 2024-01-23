import React from "react";
import { Background } from "../Forms/FormsBackground/Background";
import { useNavigate } from "react-router-dom";
import { useRef, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

const HomePage = () => {
  const navigate = useNavigate();
  React.useEffect(() => {
    if (localStorage.getItem("access_token")) {
      navigate("/app");
    }
  }, []);

  const hasShownToast = useRef(false);

  useEffect(() => {
    if (!localStorage.getItem('accessToken')) {
      if (!localStorage.getItem('cookieConsent')) {
        toast('С използването на сайта се съгласявате с общите условия, политиката за поверителност и политиката за бисквитки', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        });
        localStorage.setItem('cookieConsent', 'true');
      }
      if (localStorage.getItem('cookieConsent') !== 'true') {
        if (!hasShownToast.current) {
          toast('С използването на сайта се съгласявате с общите условия, политиката за поверителност и политиката за бисквитки', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
          });
          hasShownToast.current = true;
        }
      }
    }
  }, []);

  return (
    <div id="mainPage">
      <ToastContainer />
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
