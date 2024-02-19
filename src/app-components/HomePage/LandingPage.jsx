import React from "react";
import { Background } from "../Forms/FormsBackground/Background";
import { useNavigate } from "react-router-dom";
import { useRef, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import Tilty from "react-tilty";
import { useState } from "react";
import { Footer } from "../Footer/Footer";
import { GoPencil } from "react-icons/go";
const HomePage = () => {
  const navigate = useNavigate();
  const [isTiltyEnabled, setIsTiltyEnabled] = useState(
    window.innerWidth > 1000
  );

  useEffect(() => {
    const handleResize = () => {
      setIsTiltyEnabled(window.innerWidth > 1000);
    };

    window.addEventListener("resize", handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  React.useEffect(() => {
    if (localStorage.getItem("access_token")) {
      navigate("/app");
    }
  }, []);

  // const hasShownToast = useRef(false);

  // useEffect(() => {
  //   if (!localStorage.getItem("accessToken")) {
  //     if (!localStorage.getItem("cookieConsent")) {
  //       toast(
  //         "С използването на сайта се съгласявате с общите условия, политиката за поверителност и политиката за бисквитки",
  //         {
  //           position: toast.POSITION.TOP_RIGHT,
  //           autoClose: 3000,
  //         }
  //       );
  //       localStorage.setItem("cookieConsent", "true");
  //     }
  //     if (localStorage.getItem("cookieConsent") !== "true") {
  //       if (!hasShownToast.current) {
  //         toast(
  //           "С използването на сайта се съгласявате с общите условия, политиката за поверителност и политиката за бисквитки",
  //           {
  //             position: toast.POSITION.TOP_RIGHT,
  //             autoClose: 3000,
  //           }
  //         );
  //         hasShownToast.current = true;
  //       }
  //     }
  //   }
  // }, []);

  return (
    <div id="mainPage">
      <ToastContainer />
      <section id="backgroundForm">
        <Background />
        <div id="center-center">
          {isTiltyEnabled ? (
            <Tilty className="tilty" glare={false} max={9} reverse={true}>
              <h1 id="header">ЗапомниГо</h1>
              <h2 id="mainSubTitle">
                Платформата, която ти помага да запомняш
              </h2>
              <center>
                {" "}
                <button onClick={() => navigate("/app")} id="look-in">
                  Разгледай
                </button>
              </center>
            </Tilty>
          ) : (
            <div className="">
              <h1 id="header">ЗапомниГо</h1>
              <h2 id="mainSubTitle">
                Платформата, която ти помага да запомняш
              </h2>
              <center>
                {" "}
                <button onClick={() => navigate("/app")} id="look-in">
                  Разгледай
                </button>
              </center>
            </div>
          )}
        </div>
      </section>
      <section>
        <div id="how-it-works">
          <div className="top-box">
            <center>
              <GoPencil />
            </center>
            Регистрирай се
          </div>
          <div className="top-box">Избери или създай тесте с флашкарти</div>
          <div className="top-box">3. Учи с различни режими</div>
        </div>
      </section>
      <Footer prop="main-footer" />
    </div>
  );
};

export default HomePage;
