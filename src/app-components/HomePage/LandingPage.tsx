import React from "react";
import { Background } from "../Forms/FormsBackground/Background";
import { useNavigate } from "react-router-dom";
import { useRef, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import Tilty from "react-tilty";
import { useState } from "react";
import { Footer } from "../Footer/Footer";
import { GoPencil } from "react-icons/go";
import { IoIosArrowDown } from "react-icons/io";

import instance from "../../app-utils/axios";
import SetCard from "../SetCard/SetCard";
const HomePage = () => {
  const navigate = useNavigate();
  const [selectSet, setSelectSet] = useState(null);
  const [isTiltyEnabled, setIsTiltyEnabled] = useState(
    window.innerWidth > 1000
  );
  const [sets, setSets] = useState([]);

  useEffect(() => {
    const handleResize = () => {
      setIsTiltyEnabled(window.innerWidth > 1000);
    };

    window.addEventListener("resize", handleResize);

    instance.get("/sets?size=8").then((res) => {
      setSets(res.data.sets);
      console.log(res.data.sets);
    });

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

  const handleMouseEnter = (id: string) => {
    setSelectSet(id);
  };

  const handleMouseLeave = () => {
    setSelectSet(null);
  };
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
            <Tilty
              className="tilty"
              glare={false}
              max={isTiltyEnabled ? 9 : 0}
              reverse={true}
            >
              <h1 id="header">ЗапомниГо</h1>
              <h2 id="mainSubTitle">
                Първата платформа за дигитални флашкарти в България по БЕЛ,
                Математика, Английски и много други
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
                Първата платформа за дигитални флашкарти в България по БЕЛ,
                Математика, Английски и много други{" "}
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
        <IoIosArrowDown
          id="scroll-down-btn"
          onClick={() => {
            document.getElementById("about").scrollIntoView({
              behavior: "smooth",
              block: "center",
              inline: "center",
            });
          }}
        />
      </section>

      <section
        id="about"
        style={{ background: "linear-gradient(233deg, #fe8c00, #f83600)" }}
      >
        <Tilty glare={false} max={isTiltyEnabled ? 9 : 0} reverse={true}>
          {" "}
          <div id="demo-flashcard">
            <center>
              {" "}
              <p style={{ fontWeight: "700" }}>Какво е ЗапомниГо?</p>
            </center>
            <p>
              ЗапомниГо е платформа, която ти помага да запомняш информация по
              лесен и забавен начин. Тук можеш да създаваш флашкарти с въпроси и
              отговори, които да използваш за учене.
            </p>
          </div>
        </Tilty>
      </section>
      <section id="content">
        {sets.length > 0 ? (
          sets.map((set) => {
            return (
              <SetCard
                key={set.set_id}
                title={set.set_name}
                description={set.set_description}
                id={set.set_id}
                creator_name={set.username}
                verified={set.verified}
                category={set.category}
                subcategory={set.subcategory_name}
                image={"/logo.jpg"}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                institution={set.organization_name}
                isSelected={selectSet === set.set_id}
              />
            );
          })
        ) : (
          <div id="loading">
            <div className="loader"></div>
          </div>
        )}
        <button id="create-set" onClick={() => navigate("/app/")}>
          Разгледай още
        </button>
      </section>
      <section id="about" className="special-gradient">
        <Tilty glare={false} max={isTiltyEnabled ? 9 : 0} reverse={true}>
          {" "}
          <div id="demo-flashcard">
            <center>
              {" "}
              <p style={{ fontWeight: "700" }}>Кои сме ние?</p>
            </center>
            <p>
              Ние сме екип студенти от Американския университет в България, част
              от програмата Elevate. Нашата цел е да помогнем на учениците и
              студентите да учат по-ефективно и забавно.
            </p>
          </div>
        </Tilty>
      </section>

      <Footer prop="main-footer" />
    </div>
  );
};

export default HomePage;
