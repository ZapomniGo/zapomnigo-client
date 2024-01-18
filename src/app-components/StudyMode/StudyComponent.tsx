import { useEffect, useState } from "react";
import { useParams } from "react-router";
import instance from "../../app-utils/axios";
import React from "react";
import { jwtDecode } from "jwt-decode";
import parse from "html-react-parser";
import Dashboard from "../Dashboard/Dashboard";

const StudyComponent = () => {
  const [flashcards, setFlashcards] = useState<
    {
      confidence: number;
      definition: string;
      flashcard_id: string;
      term: string;
    }[]
  >([]);
  const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(0);
  const [previousFlashcardIndex, setPreviousFlashcardIndex] = useState(-1);
  const [correctDefinition, setCorrectDefinition] = useState("");
  const [shuffledDefinitions, setShuffledDefinitions] = useState<string[]>([]);
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const [showNextButton, setShowNextButton] = useState(false);
  const [selectedDefinition, setSelectedDefinition] = useState(null);

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id!.length === 0 || id!.length !== 26 || id!.includes(" ")) {
      return;
    }

    instance
      .get(`/sets/${id}/study`)
      .then((res) => {
        const newFlashcards = res.data.flashcards;

        if (newFlashcards.length > 0) {
          setFlashcards(newFlashcards);
          setCurrentFlashcardIndex(0);
          setCorrectDefinition(newFlashcards[0].definition);
          shuffleDefinitions(newFlashcards[0].definition);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, [id]);

  useEffect(() => {
    ensureDifferentFlashcard();
  }, [flashcards]);

  useEffect(() => {
    shuffleDefinitions(correctDefinition);
  }, [correctDefinition]);

  useEffect(() => {
    if (flashcards.length > 0 && currentFlashcardIndex < flashcards.length) {
      setCorrectDefinition(flashcards[currentFlashcardIndex].definition);
      shuffleDefinitions(flashcards[currentFlashcardIndex].definition);
    }
  }, [currentFlashcardIndex, flashcards]);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    setToken(token || null);

    if (token) {
      const decodedToken: {
        username: string;
        institution: string;
        sub: string;
      } = jwtDecode(token);
      setUsername(decodedToken.username);
      setUserId(decodedToken.sub);
    }
  }, []);

  const ensureDifferentFlashcard = () => {
    if (flashcards.length === 0) {
      return;
    }

    let nextIndex;
    do {
      nextIndex = Math.floor(Math.random() * flashcards.length);
    } while (nextIndex === previousFlashcardIndex);

    setCurrentFlashcardIndex(nextIndex);
  };

  const shuffleDefinitions = (correctDefinition: string) => {
    const allDefinitions = flashcards
      .map((card) => card.definition)
      .filter((def) => def !== correctDefinition);

    const shuffled = shuffleArray(allDefinitions.slice(0, 3));
    const randomIndex = Math.floor(Math.random() * 4);
    shuffled.splice(randomIndex, 0, correctDefinition);

    setShuffledDefinitions(shuffled);
  };

  const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  };

  const handleAnswerButtonClick = (definition: string) => {
    const isCorrect = definition === correctDefinition ? 1 : 0;
    setSelectedDefinition(definition);

    const updatedFlashcard = {
      correctness: isCorrect,
      username: username,
      user_id: userId,
    };


    if (flashcards[currentFlashcardIndex]) {
      instance
        .put(
          `/flashcards/${flashcards[currentFlashcardIndex].flashcard_id}/study`,
          updatedFlashcard
        )
        .catch((err) => console.error(err));
    }

    setShowNextButton(true);
    
  };

  const handleNextButtonClick = () => {
    const nextIndex = currentFlashcardIndex + 1;
    setPreviousFlashcardIndex(currentFlashcardIndex);
    ensureDifferentFlashcard();
    if (flashcards[nextIndex]) {
      setCorrectDefinition(flashcards[nextIndex].definition);
      shuffleDefinitions(flashcards[nextIndex].definition);
    }
    setShowNextButton(false);
    setSelectedDefinition(null);
  };

  return (
    <>
      <Dashboard>
        <div className="study-component">
          <div className="study-wrapper">
            {flashcards.length > 0 && (
              <div id="flashcard" className={"no-image-flashcard"}>
                <div className={`term `}>
                  {/* <p className="term-text">Термин:</p> */}
                  <h3>{parse(flashcards[currentFlashcardIndex].term)}</h3>
                </div>
              </div>
            )}

            <div className="answer-options">
              {shuffledDefinitions.slice(0, 4).map((definition, index) => (
                <div className={`option ${selectedDefinition && (definition === correctDefinition ? "correct" : definition === selectedDefinition ? "incorrect" : "")}`} key={index + Math.random()}>
                  <button
                    disabled={showNextButton}
                    key={index}
                    onClick={() => handleAnswerButtonClick(definition)}
                  >
                    {parse(definition)}
                  </button>
                </div>
              ))}
            </div>
            {showNextButton && (
              <button
                className="next-button"
                onClick={() => handleNextButtonClick()}
              >
                Следваща карта
              </button>
            )}
          </div>
        </div>
      </Dashboard>
    </>
  );
};

export { StudyComponent };
