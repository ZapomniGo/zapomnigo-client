import { useEffect, useState } from "react";
import { useParams } from "react-router";
import instance from "../../app-utils/axios";
import React from "react";
import { jwtDecode } from "jwt-decode";
import parse from "html-react-parser";
import Dashboard from "../Dashboard/Dashboard";
//Copmonents for study mode
import MultipleChoice from "./StudyModes/MultipleChoice";
import FreeInput from "./StudyModes/FreeInput";

const StudyComponent = () => {
  //original is what we get from the server
  const [originalFlashcards, setOriginalFlashcards] = useState([]);
  //flashcards is what we will be using to study -> they are going to be dynamically changed based on the user's performance
  const [flashcards, setFlashcards] = useState([]);
  //this is the current flashcard that the user is studying
  const [currentFlashcardTerm, setCurrentFlashcardTerm] = useState();
  const [currentFlashcardDefinition, setCurrentFlashcardDefinition] =
    useState();
  //this is an array with all the flashcards that the user has studied
  const [pastFlashcardsIndexes, setPastFlashcardsIndexes] = useState([]);
  //this is the study mode -> 1 is multiple choice, 2 is free input; 0 is done
  const [studyMode, setStudyMode] = useState(0);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id!.length === 0 || id!.length !== 26 || id!.includes(" ")) {
      return;
    }
    if (!localStorage.getItem("access_token")) {
      window.location.href = "/app/login";
      return;
    }
    instance
      .get(`/sets/${id}/study`)
      .then((res) => {
        const newFlashcards = res.data.flashcards;
        if (newFlashcards.length > 0) {
          let tempFlashcards = newFlashcards.map((flashcard) => {
            flashcard.seen = 0;
            return flashcard;
          });
          setFlashcards(tempFlashcards);
          setOriginalFlashcards(newFlashcards);
          GeneratePrompt(newFlashcards);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, [id]);

  //this function will generate a prompt for the user to study
  const GeneratePrompt = (flashcardsInside) => {
    // Handle case of no flashcards
    if (flashcardsInside.length === 0) return null;

    // Helper function to retrieve confidence - treating null as 0
    const getConfidence = (flashcard) => flashcard.confidence || 0;

    // Initialize minimum confidence to the first flashcard's confidence
    let minConfidence = getConfidence(flashcardsInside[0]);

    // Array to store flashcards with the minimum confidence
    let minConfidenceCards = [];

    flashcardsInside.forEach((flashcard) => {
      let confidence = getConfidence(flashcard);
      if (confidence < minConfidence) {
        // If a new minimum confidence, update and clear array
        minConfidence = confidence;
        minConfidenceCards = [flashcard];
      } else if (confidence === minConfidence || minConfidence === null) {
        // If equal to minimum confidence or minimum confidence is null, add to array. This indicates that there are multiple flashcards with the same minimum confidence or that the set hasn't been studied
        minConfidenceCards.push(flashcard);
      }
    });

    // Select a random flashcard from those with the minimum confidence
    let randomIndex = Math.floor(Math.random() * minConfidenceCards.length);
    //Let's make sure the flashcard has not been seen too many times
    HasFlashcardBeenSeenTooManyTime(minConfidenceCards[randomIndex]) &&
      GeneratePrompt(flashcardsInside);
    //if the flashcard has already been studied as last flashcard, then we need to choose another flashcard
    !EnsureNoRepeat(randomIndex) && GeneratePrompt(flashcardsInside);
    //phew, the flashcard has not been studied as last flashcard, so we can study it
    setPastFlashcardsIndexes([...pastFlashcardsIndexes, randomIndex]);
    setCurrentFlashcardTerm(minConfidenceCards[randomIndex].term);
    setCurrentFlashcardDefinition(minConfidenceCards[randomIndex].definition);
    let choice = ChooseStudyMode();
    setStudyMode(choice);
  };
  //this function makes sure the flashcards are not repeated
  const EnsureNoRepeat = (indexChosen) => {
    //if fewer than 2 flashcards have been studied, then we can study any flashcard
    if (pastFlashcardsIndexes.length < 2) {
      return true;
    }
    //if the last flashcard studied is the same as the one we are about to study, then we need to choose another flashcard
    if (
      pastFlashcardsIndexes[pastFlashcardsIndexes.length - 1] === indexChosen
    ) {
      return false;
    }
    return true;
  };
  const HasFlashcardBeenSeenTooManyTime = (flashcard) => {
    if (flashcard.seen > 3) {
      return true;
    }
    return false;
  };
  //this function dyanmically chooses the study mode based on the user's performance/number of flashcards
  const ChooseStudyMode = () => {
    //Multiple Choice is 1
    //FreeInput is 2
    //If the confidence level of a flashcard is less than the average confidence level of all flashcards, then we will study it in multiple choice mode, if not, then we will study it in free input mode
    let totalConfidence = 0;
    flashcards.forEach((flashcard) => {
      totalConfidence += flashcard.confidence;
    });
    if (!totalConfidence) {
      return 1;
    }
    let averageConfidence = totalConfidence / flashcards.length;
    if (averageConfidence === 0) {
      return 1;
    }
    flashcards.forEach((flashcard) => {
      if (flashcard.confidence < averageConfidence) {
        return 1;
      } else {
        return 2;
      }
    });
  };
  //this function will verify the correctness of the user's answer
  const VerifyCorrectness = (answer, studyMode) => {
    let flashcardsCopy = [...flashcards];

    if (answer == currentFlashcardDefinition) {
      alert("Correct!");
      InformServerAboutFlashcard(
        flashcards[pastFlashcardsIndexes[pastFlashcardsIndexes.length - 1]]
          .flashcard_id,
        1
      );
      //update the seen indicator
      flashcardsCopy[
        pastFlashcardsIndexes[pastFlashcardsIndexes.length - 1]
      ].seen += 1;
      //update the correctness
      flashcardsCopy[pastFlashcardsIndexes[pastFlashcardsIndexes.length - 1]];
      GeneratePrompt(flashcards);
    } else {
      alert("Incorrect!");
      InformServerAboutFlashcard(
        flashcards[pastFlashcardsIndexes[pastFlashcardsIndexes.length - 1]]
          .flashcard_id,
        0
      );
      //update the seen indicator
      flashcardsCopy[
        pastFlashcardsIndexes[pastFlashcardsIndexes.length - 1]
      ].seen += 1;
      //update the correctness
      flashcardsCopy[pastFlashcardsIndexes[pastFlashcardsIndexes.length - 1]];
      GeneratePrompt(flashcards);
    }
  };
  //this function will inform the server about the flashcard's correctness
  const InformServerAboutFlashcard = (flashcardId, correctness) => {
    instance
      .put(`/flashcards/${flashcardId}/study`, {
        correctness: correctness,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      <Dashboard>
        <div className="study-component">
          <div className="study-wrapper">
            {studyMode === 1 && (
              <MultipleChoice
                currentFlashcardTerm={currentFlashcardTerm}
                currentFlashcardDefinition={currentFlashcardDefinition}
                originalFlashcards={originalFlashcards}
                VerifyCorrectness={VerifyCorrectness}
              />
            )}
            {studyMode === 2 && (
              <FreeInput
                currentFlashcardTerm={currentFlashcardTerm}
                currentFlashcardDefinition={currentFlashcardDefinition}
                VerifyCorrectness={VerifyCorrectness}
              />
            )}
          </div>
        </div>
      </Dashboard>
    </>
  );
};

export { StudyComponent };
