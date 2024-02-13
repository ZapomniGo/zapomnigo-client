import React, { useEffect, useState } from "react";
import parse from "html-react-parser";

const IsItCorrect = (props) => {
  const [randomDefinition, setRandomDefinition] = useState("");
  const [randomTerm, setRandomTerm] = useState("");
  const [showTerm, setShowTerm] = useState(Math.random() > 0.5);
  const [isRandom, setIsRandom] = useState(Math.random() > 0.5);
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState();
  useEffect(() => {
    if (!isRandom) {
      if (showTerm) {
        setRandomTerm(props.currentFlashcardTerm);
      } else {
        setRandomDefinition(props.currentFlashcardDefinition);
      }
      return;
    }
    if (showTerm) {
      const randomTerm =
        props.flashcards[Math.floor(Math.random() * props.flashcards.length)]
          .term;
      setRandomTerm(randomTerm);
    } else {
      const randomDefinition =
        props.flashcards[Math.floor(Math.random() * props.flashcards.length)]
          .definition;
      setRandomDefinition(randomDefinition);
    }
  }, []);
  const next = () => {
    setShowAnswer(false);
    setIsRandom(Math.random() > 0.5);
    setShowTerm(Math.random() > 0.5);

    props.VerifyCorrectness(selectedAnswer, 4, true);
  };
  const handleCorrectness = (isCorrect) => {
    setSelectedAnswer(isCorrect);
    setShowAnswer(true);

    if (isCorrect === "idk") {
      props.VerifyCorrectness(false, 4, false);
      setSelectedAnswer(false);
      return;
    }

    if (isCorrect) {
      props.VerifyCorrectness(
        showTerm ? randomTerm : randomDefinition,
        4,
        false
      );
      setSelectedAnswer(showTerm ? randomTerm : randomDefinition);
    } else {
      if (isRandom) {
        props.VerifyCorrectness(
          showTerm
            ? props.currentFlashcardTerm
            : props.currentFlashcardDefinition,
          4,
          false
        );
        setSelectedAnswer(
          showTerm
            ? props.currentFlashcardTerm
            : props.currentFlashcardDefinition
        );
      } else {
        props.VerifyCorrectness(false, 4, false);
        setSelectedAnswer(false);
      }
    }
    setShowTerm(!showTerm);
  };
  return (
    <div>
      {showTerm && "Верен ли е този термин?"}
      {!showTerm && "Вярна ли е тази дефиниция?"}
      {showTerm
        ? parse(props.currentFlashcardDefinition)
        : parse(props.currentFlashcardTerm)}

      {showTerm ? parse(randomTerm) : parse(randomTerm)}
      {showAnswer ? (
        <>
          <p>
            Правилната {showTerm ? "дефиниция" : "термин"} е:
            {showTerm
              ? parse(props.currentFlashcardTerm)
              : parse(props.currentFlashcardDefinition)}
          </p>
          <button onClick={next}>Следващ</button>
        </>
      ) : (
        <div>
          <button onClick={() => handleCorrectness(true)}>Да</button>
          <button onClick={() => handleCorrectness(false)}>Не</button>
          <button onClick={() => handleCorrectness("idk")}>Не знам</button>
        </div>
      )}
    </div>
  );
};

export default IsItCorrect;
