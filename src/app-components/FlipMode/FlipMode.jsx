import React, { useEffect } from "react";
import instance from "../../app-utils/axios";
import parse from "html-react-parser";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { MdOutlineFlip } from "react-icons/md";
import { FaArrowRotateLeft } from "react-icons/fa6";
import { MdFlipCameraAndroid } from "react-icons/md";
import { FO, FC } from "../../app-utils/soundManager";
import { toast } from "react-toastify";
import { LoadingAnimation } from "../LoadingAnimation/LoadingAnimtation";
import { useState } from "react";
import { CookieComponent } from "../Dashboard/CookieComponent";
import { FaShuffle } from "react-icons/fa6";
import { BackBtn } from "../BackBtn/BackBtn";

const Flip = () => {
  const { id } = useParams();
  const [flashcards, setFlashcards] = React.useState([]);
  const [counter, setCounter] = React.useState(0);
  const [isHidden, setIsHidden] = React.useState(true);
  const [isMessageHidden, setIsMessageHidden] = React.useState(false);

  const showToast = (message, id) => {
    if (!toast.isActive(id)) {
      toast(message, {
        toastId: id,
      });
    }
  };

  const [cookieConsent, setCookieConsent] = useState(false);
  useEffect(() => {
    document.title = "ЗапомниГо | Платформата, която ти помага да запомняш";
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 100);

    if (localStorage.getItem("cookieConsent") === "true") {
      setCookieConsent(true);
    }
  }, []);

  useEffect(() => {
    instance
      .get(`/sets/${id}?page=1&size=4000`)
      .then((res) => {
        //to check if any flashcards are present in the set/set is valid
        setFlashcards(res.data.set.flashcards);
        document.title = res.data.set.set_name + " | ЗапомниГо";
      })
      .catch((error) => {
        if (error.response.status === 404) {
          window.location.href = "/app/not-found";
        }
      });
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 100);
  }, []);
  const previous = () => {
    FC.play();
    setIsHidden(true);
    if (counter > 0) {
      setCounter((prev) => prev - 1);
    } else {
      setCounter(flashcards.length - 1);
    }
  };
  const next = () => {
    FC.play();
    setIsHidden(true);
    if (counter < flashcards.length - 1) {
      setCounter((prev) => prev + 1);
    } else {
      setCounter(0);
    }
  };
  const showDefinition = () => {
    if (isHidden) {
      FO.play();
    }
    setIsHidden(false);
  };
  const hideDefinition = () => {
    if (!isHidden) {
      FO.play();
    }
    setIsHidden(true);
  };

  const changeTermAndDefintion = () => {
    showToast("Терминът и дефиницията са сменени!", 1);
    setIsHidden(true);
    setFlashcards((prev) => {
      return prev.map((flashcard) => {
        return {
          term: flashcard.definition,
          definition: flashcard.term,
        };
      });
    });
  };
  useEffect(() => {
    FC.pause();
    FO.pause();
  }, []);

  const flipCard = () => {
    isHidden ? FO.play() : FC.play();
    setIsHidden(!isHidden);
    setIsMessageHidden(true);
    localStorage.setItem("flipMessage", "true");
  };

  useEffect(() => {
    setIsMessageHidden(localStorage.getItem("flipMessage") === "true");
  }, []);

  const [isKeyPressed, setIsKeyPressed] = React.useState(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowRight" && !isKeyPressed) {
        setIsKeyPressed(true);
        next();
      }

      if (event.key === "ArrowLeft" && !isKeyPressed) {
        setIsKeyPressed(true);
        previous();
      }
      if (event.key === "ArrowDown" && !isKeyPressed) {
        showDefinition();
      }
      if (event.key === "ArrowUp" && !isKeyPressed) {
        hideDefinition();
      }
    };

    const handleKeyUp = (event) => {
      if (event.key === "ArrowRight") {
        setIsKeyPressed(false);
      }
      if (event.key === "ArrowLeft") {
        setIsKeyPressed(false);
      }
      if (event.key === "ArrowDown") {
        setIsKeyPressed(false);
      }
      if (event.key === "ArrowUp") {
        setIsKeyPressed(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    // Clean up the event listeners
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [isKeyPressed]);
  const shuffleFlashcards = () => {
    showToast("Флашкартите са разбъркани", 1);
    setFlashcards((prev) => {
      return prev.sort(() => Math.random() - 0.5);
    });
    setCounter(0);
  };
  return (
    <div className="flip_mode_container">
      <BackBtn />
      {flashcards.length > 0 ? (
        <section id="wrapper">
          <h1 className="counter">
            {counter + 1}/{flashcards.length}
          </h1>
          <section
            id="card"
            onClick={() => {
              flipCard();
            }}
          >
            <div id="front">
              <p>{parse(flashcards[counter].term)}</p>
            </div>
            {!isMessageHidden ? (
              <div className="info-message">
                <p>Натисни картата, за да я обърнеш</p>
              </div>
            ) : null}
            {/* <div className="info-message">
              <p>Натисни картата за да я обърнеш</p>
            </div> */}
            {!isHidden ? (
              <div id="back">
                <p>{parse(flashcards[counter].definition)}</p>
              </div>
            ) : null}
          </section>
          {flashcards.length > 1 && (
            <div className="arrow-left" onClick={previous}>
              <FaArrowLeft />
            </div>
          )}

          {flashcards.length > 1 && (
            <div className="arrow-right" onClick={next}>
              <FaArrowRight />
            </div>
          )}

          {/* <center className="btnGroup">
            <MdFlipCameraAndroid
              onClick={() => {
                isHidden ? FO.play() : FC.play();
                setIsHidden(!isHidden);
              }}
            />
          </center> */}
          <div className="rotate-svg">
            <FaArrowRotateLeft
              id="flip-flip-icon"
              onClick={changeTermAndDefintion}
            />
            <FaShuffle onClick={shuffleFlashcards} />
          </div>
          <div className="cookie_width">
            {!cookieConsent && <CookieComponent pageType={"flip"} />}
          </div>
        </section>
      ) : (
        <center>
          {" "}
          <h1 className="loadingBanner">Зареждане...</h1>
        </center>
      )}
    </div>
  );
};

export default Flip;
