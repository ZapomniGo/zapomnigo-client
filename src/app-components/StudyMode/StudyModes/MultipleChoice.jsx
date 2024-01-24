import React from "react";
import { convert } from "html-to-text";
const MultipleChoice = (props) => {
  const [answerOptions, setAnswerOptions] = React.useState([]);
  React.useEffect(() => {
    let arrCopy = [];
    //Let push 3 random definitions into the array
    for (let i = 0; i < 3; i++) {
      let randomIndex = Math.floor(
        Math.random() * props.originalFlashcards.length
      );
      arrCopy.push(props.originalFlashcards[randomIndex].definition);
      console.log(arrCopy);
    }
    //Let push the current flashcard definition into the array, i.e., the correct answer
    arrCopy.push(props.currentFlashcardDefinition);
    //Let shuffle the array
    setAnswerOptions(arrCopy.sort(() => Math.random() - 0.5));
  }, []);
  return (
    <div>
      <div>{convert(props.currentFlashcardTerm)}</div>
      <div>
        {answerOptions.map((answerOption) => {
          return (
            <button onClick={() => props.VerifyCorrectness(answerOption, 1)}>
              {convert(answerOption)}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MultipleChoice;
