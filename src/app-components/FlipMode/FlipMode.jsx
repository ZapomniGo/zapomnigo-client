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
    if (counter > 0) {
      setCounter((prev) => prev - 1);
    }else{
      setCounter(flashcards.length-1)
    }
  };
  const next = () => {
    if (counter < flashcards.length - 1) {
      setCounter((prev) => prev + 1);
    }else{
      setCounter(0)
    }
  };
  return (
    <>
      {flashcards.length > 0 ? (
        <section id="wrapper">
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
            <button onClick={next}>Следваща</button>
            <button onClick={() => setIsHidden((prev) => !prev)}>Покажи</button>
            <button onClick={previous}>Предишна</button>
          </center>
        </section>
      ) : (
        <h1>Няма такава тестета</h1>
      )}
    </>
  );
};

export default Flip;
