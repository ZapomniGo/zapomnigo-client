import React, { useEffect } from "react";
import instance from "../../app-utils/axios";
import parse from "html-react-parser";
import { useParams } from "react-router-dom";
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

  useEffect(() => {
    console.log(isHidden);
  }, [isHidden]);


  return (
    <>
      {flashcards.length > 0 ? (
        <section id="wrapper">
            <h1 className="counter">
              {counter+1}/{flashcards.length}
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
            <button onClick={previous}>Предишна</button>
            <button onClick={() => setIsHidden((prev) => !prev)}>
              {isHidden ? 'Покажи' : 'Скрий'}
            </button>
            <button onClick={next}>Следваща</button>
          </center>
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
