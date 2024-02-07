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

  const flipCard = () => {
    isHidden ? FO.play() : FC.play();
    setIsHidden(!isHidden);
  }

  // window.addEventListener('keydown', function(event) {
  //   // Check if the right arrow key was pressed
  //   if (event.key === 'ArrowRight') {
  //     // Call the next function
  //     console.log('right')
  //     next();
  //   }
  // });

  const [isKeyPressed, setIsKeyPressed] = React.useState(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowRight' && !isKeyPressed) {
        setIsKeyPressed(true);
        next();
      }

      if(event.key === 'ArrowLeft' && !isKeyPressed){
        setIsKeyPressed(true);
        previous();
      }
    };

    const handleKeyUp = (event) => {
      if (event.key === 'ArrowRight') {
        setIsKeyPressed(false);
      }
      if (event.key === 'ArrowLeft') {
        setIsKeyPressed(false);
      }
    };
    

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    // Clean up the event listeners
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, [isKeyPressed]);

  return (
    <>
      {flashcards.length > 0 ? (
        <section id="wrapper">
          <h1 className="counter">
            {counter + 1}/{flashcards.length}
          </h1>
          <section id="card" 
            onClick={() => {
              flipCard();
            }}
          >
            <div id="front">
              <p>
                {parse(flashcards[counter].term)} 
              </p>
            </div>
            {!isHidden ? (
              <div id="back">
                <p>{parse(flashcards[counter].definition)}</p>
              </div>
            ) : null}
          </section>
          {flashcards.length > 1 && 
          <div className="arrow-left" onClick={previous}>
            <FaArrowLeft  />
          </div>
          }

          {flashcards.length > 1 && 
          <div className="arrow-right" onClick={next}>
            <FaArrowRight  />
          </div>
          }


          <center className="btnGroup">
            <MdFlipCameraAndroid
              onClick={() => {
                isHidden ? FO.play() : FC.play();
                setIsHidden(!isHidden);
              }}
            />
          </center>
          <div className="rotate-svg">
            <FaArrowRotateLeft
              id="flip-flip-icon"
              onClick={changeTermAndDefintion}
            />
          </div>
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
