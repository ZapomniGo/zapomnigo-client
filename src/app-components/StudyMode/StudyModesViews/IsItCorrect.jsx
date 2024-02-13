import React, { useEffect, useState } from "react";
import parse from "html-react-parser";

const IsItCorrect = (props) => {
  const [randomDefinition, setRandomDefinition] = useState("");
  const [randomTerm, setRandomTerm] = useState("");
  const [showTerm, setShowTerm] = useState(Math.random() > 0.5);

  useEffect(() => {
    const isRandom = Math.random() > 0.5;
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
  }, [showTerm]);

  const handleCorrectness = (isCorrect) => {};
  return (
    <div>
      {showTerm && "Верен ли е този термин?"}
      {!showTerm && "Вярна ли е тази дефиниция?"}
      {showTerm
        ? parse(props.currentFlashcardDefinition)
        : parse(props.currentFlashcardTerm)}

      {showTerm ? parse(randomTerm) : parse(randomDefinition)}
      <button onClick={() => handleCorrectness(true)}>Да</button>
      <button onClick={() => handleCorrectness(false)}>Не</button>
      <button>Не знам</button>
    </div>
  );
};

export default IsItCorrect;
