import React, { useEffect } from "react";
import instance from "../../app-utils/axios";
import parse from "html-react-parser";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { MdOutlineFlip } from "react-icons/md";
import { FaArrowRotateLeft } from "react-icons/fa6";
import { toast } from "react-toastify";
import { LoadingAnimation } from "../LoadingAnimation/LoadingAnimtation";

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
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const previous = () => {
    setIsHidden(true);
    if (counter > 0) {
      setCounter((prev) => prev - 1);
    } else {
      setCounter(flashcards.length - 1);
    }
  };
  const next = () => {
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
  }


  useEffect(() => {
    console.log(isHidden);
  }, [isHidden]);

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
           <MdOutlineFlip onClick={() => setIsHidden(!isHidden)} />
            {flashcards.length > 1 && <FaArrowRight onClick={next} />}
          </center>
          <FaArrowRotateLeft id="flip-flip-icon" onClick={changeTermAndDefintion}/>
        </section>
      ) : (
        <center>
          {" "}
          <LoadingAnimation />
        </center>
      )}
    </>
  );
};

export default Flip;
