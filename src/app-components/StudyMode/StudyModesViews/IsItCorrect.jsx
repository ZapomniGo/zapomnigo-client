import React, { useEffect, useState } from "react";
import parse from "html-react-parser";

const IsItCorrect = (props) => {
  const [selectedTerm, setSelectedTerm] = useState("");
  const [selectedDefinition, setSelectedDefinition] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [isCorrect, setIsCorrect] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  useEffect(() => {
    console.log(parse(props.currentFlashcardDefinition));
    if (props.currentFlashcardTerm && props.currentFlashcardDefinition) {
      setSelectedTerm(props.currentFlashcardTerm);
      setCorrectAnswer(props.currentFlashcardDefinition);
    }
    //set selected definition on random with 50% chance of being correct
    let random = Math.random() < 0.5;
    if (random) {
      setSelectedDefinition(props.currentFlashcardDefinition);
    } else {
      setSelectedDefinition(
        props.flashcards[Math.floor(Math.random() * props.flashcards.length)]
          .definition
      );
    }
  }, [props.pastFlascardIndexes, props.currentFlashcardTerm]);
  return (
    <div>
      <div className="flashcard">
        <p>Съвпадат ли термина и дефиницията</p>
        <div className="flashcard-term">{parse(selectedTerm)}</div>
        <div className="flashcard-definition">{parse(selectedDefinition)}</div>
      </div>
      {!isAnswered && (
        <div className="flashcard-buttons">
          <button
            onClick={() => {
              setIsAnswered(true);
              if (selectedDefinition === correctAnswer) {
                setIsCorrect(true);
                props.VerifyCorrectness(selectedDefinition, 4, false);
              } else {
                setIsCorrect(false);
                props.VerifyCorrectness(false, 4, false);
              }
            }}
          >
            Да
          </button>
          <button
            onClick={() => {
              setIsAnswered(true);
              if (selectedDefinition !== correctAnswer) {
                setIsCorrect(true);
                props.VerifyCorrectness(selectedDefinition, 4, false);
              } else {
                setIsCorrect(false);
                props.VerifyCorrectness(false, 4, false);
              }
            }}
          >
            Не
          </button>
        </div>
      )}
      {isAnswered && (
        <>
          <div className="flashcard-answer">
            {isCorrect
              ? "Правилно!"
              : "Правилната дефиниция е: " }
            {parse(correctAnswer)}
          </div>
          <button
            onClick={() => {
              if (isCorrect) {
                props.VerifyCorrectness("", 4, true, true);
              } else {
                props.VerifyCorrectness("", 4, true);
              }
              setIsAnswered(false);
            }}
          >
            Следващ
          </button>
        </>
      )}
    </div>
  );
};

export default IsItCorrect;
