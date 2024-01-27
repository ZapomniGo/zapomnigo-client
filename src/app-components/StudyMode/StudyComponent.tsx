import { useEffect, useState } from "react";
import { useParams } from "react-router";
import instance from "../../app-utils/axios";
import React from "react";
import { jwtDecode } from "jwt-decode";
import { convert } from "html-to-text";
import Dashboard from "../Dashboard/Dashboard";
//Copmonents for study mode
import MultipleChoice from "./StudyModesViews/MultipleChoice";
import FreeInput from "./StudyModesViews/FreeInput";
import LevelCheck from "./StudyModesViews/LevelCheck";
import FinishedView from "./StudyModesViews/FinishedView";
import { toast, ToastContainer } from "react-toastify";
import LearnSettings from "./utils/LearnSettings";

import defaultSetup from "./configs/defaultSetup.json";

//TODO: persists LevelCheck, FreeInput

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
  //this is the study mode -> 1 is multiple choice, 2 is free input; 0 starting; -1 is finished
  const [studyMode, setStudyMode] = useState(0);
  // set the allowed study modes
  const [allowedStudyModes, setAllowedStudyModes] = useState(
    defaultSetup.allowedModes ? defaultSetup.allowedModes : [1, 2, 3]
  );
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

    //Make sure that not all flashcards have been studied
    let allFlashcardsHaveBeenStudied = true;
    flashcardsInside.forEach((flashcard) => {
      if (Number(flashcard.seen) < defaultSetup.maxSeen) {
        allFlashcardsHaveBeenStudied = false;
      }
    });
    if (allFlashcardsHaveBeenStudied) {
      // This means that all flashcards have been studied
      EndStudyMode();
      return false;
    }

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

    // Check if there are 4 or fewer flashcards or only 1 or 2 flashcards below average confidence
    if (flashcardsInside.length <= 3 || minConfidenceCards.length <= 2) {
      minConfidenceCards = flashcardsInside;
    }

    // Select a random flashcard from those with the minimum confidence
    let randomIndex = Math.floor(Math.random() * minConfidenceCards.length);
    if (minConfidenceCards.length === 1) {
      //include all flashcards
      minConfidenceCards = flashcardsInside;
      randomIndex = Math.floor(Math.random() * minConfidenceCards.length);
    } else if (!EnsureNoRepeat(randomIndex)) {
      GeneratePrompt(flashcards);
      return false;
    }

    //Let's make sure the flashcard has not been seen too many times
    if (HasFlashcardBeenSeenTooManyTime(minConfidenceCards[randomIndex])) {
      GeneratePrompt(flashcardsInside);
      return false;
    } else if (
      //null means that all flashcards have been studied and we need to end the study mode
      HasFlashcardBeenSeenTooManyTime(minConfidenceCards[randomIndex]) == null
    ) {
      return false;
    }

    //phew, the flashcard has not been studied as last flashcard, so we can study it
    //update the past flashcards indexes to make sure we know that we have studied this flashcard
    setPastFlashcardsIndexes([...pastFlashcardsIndexes, randomIndex]);
    setCurrentFlashcardTerm(minConfidenceCards[randomIndex].term);
    setCurrentFlashcardDefinition(minConfidenceCards[randomIndex].definition);

    let choice = ChooseStudyMode(minConfidenceCards[randomIndex]);
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
    let allFlashcards = [...flashcards];
    //make sure that not all flashcards have been studied
    let allFlashcardsHaveBeenStudied = true;
    if (allFlashcards.length === 0) {
      //this means react hasn't updated the flashcards yet
      return false;
    }

    allFlashcards.forEach((flashcard) => {
      if (Number(flashcard.seen) < defaultSetup.minSeen) {
        allFlashcardsHaveBeenStudied = false;
      }
    });
    if (allFlashcardsHaveBeenStudied) {
      // This means that all flashcards have been studied
      EndStudyMode();
      return null;
    } else {
      //Finally, check the individual flashcard since we are sure that not all flashcards have been studied
      if (Number(flashcard.seen) >= 3) {
        //Remove the flashcard from the array
        let arrCopy = [...flashcards];
        console.log(arrCopy);
        arrCopy.splice(arrCopy.indexOf(flashcard), 1);
        setFlashcards(arrCopy);
        return true;
      }
      return false;
    }
  };
  //this function dyanmically chooses the study mode based on the user's performance/number of flashcards
  const ChooseStudyMode = (flashcard) => {
    //Multiple Choice is 1
    //FreeInput is 2
    //--------------
    //Evaluate answer is 3
    //If the confidence level of a flashcard is less than the average confidence
    //level of all flashcards, then we will study it in multiple choice mode, if not,
    //then we will study it in free input mode. Finally, if the length of the definition
    //it too large for either, we are going to choose evaluate mode

    let averageConfidence = 0;
    let totalConfidence = 0;
    let flashcardsCopy = [...flashcards];
    let chosenStudyMode = 0;
    flashcardsCopy.forEach((flashcard) => {
      totalConfidence += flashcard.confidence;
    });
    averageConfidence = totalConfidence / flashcardsCopy.length;
    if (averageConfidence == null || isNaN(averageConfidence)) {
      averageConfidence = 0;
    }
    if (flashcard.confidence == null) {
      flashcard.confidence = 0;
    }
    console.log("average confidence is " + averageConfidence);
    console.log("flashcard confidence is " + flashcard.confidence);
    if (
      flashcard.confidence <= averageConfidence ||
      flashcard.definition.length > 100 ||
      flashcard.term.length > 100
    ) {
      chosenStudyMode = 1;
    } else {
      if (Math.random() > 0.2) {
        chosenStudyMode = 2;
      } else {
        chosenStudyMode = 3;
      }
    }
    if (allowedStudyModes.includes(chosenStudyMode)) {
      return chosenStudyMode;
    } else {
      //check which study mode is not allowed and upgrade to the next one
      if (chosenStudyMode == 1 && allowedStudyModes.includes(1)) {
        return 1;
      } else if (chosenStudyMode == 2 && allowedStudyModes.includes(2)) {
        return 2;
      } else if (chosenStudyMode == 3 && allowedStudyModes.includes(3)) {
        return 3;
      } else if (!allowedStudyModes.includes(1) && chosenStudyMode == 1) {
        if (allowedStudyModes.includes(2)) {
          return 2;
        } else if (allowedStudyModes.includes(3)) {
          return 3;
        }
      } else if (!allowedStudyModes.includes(2) && chosenStudyMode == 2) {
        if (allowedStudyModes.includes(3)) {
          return 3;
        } else if (allowedStudyModes.includes(1)) {
          return 1;
        }
      } else if (!allowedStudyModes.includes(3) && chosenStudyMode == 3) {
        if (allowedStudyModes.includes(1)) {
          return 1;
        } else if (allowedStudyModes.includes(2)) {
          return 2;
        }
      }
    }
    if(!allowedStudyModes.length){
      return chosenStudyMode
    }
  };
  //this function will verify the correctness of the user's answer
  //
  const VerifyCorrectness = (
    answer,
    studyMode,
    submitAnswerInstantly = true
  ) => {
    let isCorrect;
    let flashcardsCopy = [...flashcards];

    if (convert(answer) == convert(currentFlashcardDefinition)) {
      isCorrect = true;
    } else {
      isCorrect = false;
    }
    if (!submitAnswerInstantly) {
      return {
        correctAnswer: currentFlashcardDefinition,
        givenAnswer: answer,
        isCorrect: isCorrect,
      };
    }
    GeneratePrompt(flashcardsCopy);

    if (isCorrect) {
      if (defaultSetup.enablePositives) {
        toast(
          defaultSetup.positives[
            Math.floor(Math.random() * defaultSetup.positives.length)
          ]
        );
      }
      //   alert("Correct!");
      InformServerAboutFlashcard(
        flashcards[pastFlashcardsIndexes[pastFlashcardsIndexes.length - 1]]
          .flashcard_id,
        1
      );
      //check if flashcard is above average confidence
      //update the seen indicator
      flashcardsCopy[
        pastFlashcardsIndexes[pastFlashcardsIndexes.length - 1]
      ].seen += 1;
      //update the correctness
      flashcardsCopy[pastFlashcardsIndexes[pastFlashcardsIndexes.length - 1]];
      setFlashcards(flashcardsCopy);
    } else {
      if (defaultSetup.enableNegatives) {
        toast(
          defaultSetup.negatives[
            Math.floor(Math.random() * defaultSetup.negatives.length)
          ]
        );
      }

      //   alert("Incorrect!");
      InformServerAboutFlashcard(
        flashcards[pastFlashcardsIndexes[pastFlashcardsIndexes.length - 1]]
          .flashcard_id,
        0
      );
      //update the correctness
      flashcardsCopy[pastFlashcardsIndexes[pastFlashcardsIndexes.length - 1]];
      //Don't go to the next flashcard if the answer is wrong
    }
  };
  //this function will inform the server about the flashcard's correctness
  const InformServerAboutFlashcard = (flashcardId, correctness) => {
    instance
      .put(`/flashcards/${flashcardId}/study`, {
        correctness: correctness,
      })
      .then((res) => {})
      .catch((err) => {
        console.error(err);
      });
  };

  const EndStudyMode = () => {
    setStudyMode(-1);
    alert("You have finished studying!");
  };

  return (
    <>
      <ToastContainer />
      <Dashboard>
        <div className="study-component">
          <div className="study-wrapper">
            {studyMode === 1 && (
              <MultipleChoice
                currentFlashcardTerm={currentFlashcardTerm}
                currentFlashcardDefinition={currentFlashcardDefinition}
                flashcards={flashcards}
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
            {studyMode === 3 && (
              <LevelCheck
                currentFlashcardTerm={currentFlashcardTerm}
                currentFlashcardDefinition={currentFlashcardDefinition}
                VerifyCorrectness={VerifyCorrectness}
              />
            )}
            {studyMode == -1 && (
              <FinishedView
                pastFlashcardsIndexes={pastFlashcardsIndexes}
                flashcards={flashcards}
              />
            )}
          </div>
          {studyMode != -1 && (
            <LearnSettings
              setAllowedModes={setAllowedStudyModes}
              allowedModes={allowedStudyModes}
            />
          )}
        </div>
      </Dashboard>
    </>
  );
};

export { StudyComponent };
