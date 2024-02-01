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
const Flip = () => {
  const { id } = useParams();
  const [flashcards, setFlashcards] = React.useState([]);
  const [counter, setCounter] = React.useState(0);
  const [isHidden, setIsHidden] = React.useState(true);
  useEffect(() => {
    instance
      .get(`/sets/${id}`)
      .then((res) => {
        //to check if any flashcards are present in the set/set is valid
        setFlashcards(res.data.set.flashcards);
      })
      .catch((error) => {
        if (error.response.status === 404) {
          window.location.href = "/app/not-found";
        }
        console.error(error);
      });
    window.scrollTo({ top: 0, behavior: "smooth" });
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
  const changeTermAndDefintion = () => {
    toast("Терминът и дефиницията са сменени!");
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

  return (
    <>
      {flashcards.length > 0 ? (
        <section id="wrapper">
          <h1 className="counter">
            {counter + 1}/{flashcards.length}
          </h1>
          <section id="card">
            <div id="front">
              <p>{parse(flashcards[counter].term)}</p>
            </div>
            {!isHidden ? (
              <div id="back">
                <p>{parse(flashcards[counter].definition)}</p>
              </div>
            ) : null}
          </section>

          <center className="btnGroup">
            {flashcards.length > 1 && <FaArrowLeft onClick={previous} />}
            <MdFlipCameraAndroid
              onClick={() => {
                isHidden ? FO.play() : FC.play();
                setIsHidden(!isHidden);
              }}
            />
            {flashcards.length > 1 && <FaArrowRight onClick={next} />}
          </center>
          <FaArrowRotateLeft
            id="flip-flip-icon"
            onClick={changeTermAndDefintion}
          />
        </section>
      ) : (
        <center>
          {" "}
          <h1 className="loadingBanner">Зареждане...</h1>
        </center>
      )}
    </>
  );
};

export default Flip;
