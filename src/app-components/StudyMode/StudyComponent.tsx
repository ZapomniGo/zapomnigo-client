import { useEffect, useState } from "react";
import { useParams } from "react-router";
import instance from "../../app-utils/axios";
import React from "react";
import { jwtDecode } from "jwt-decode";
import parse from "html-react-parser";
import Dashboard from "../Dashboard/Dashboard";

const StudyComponent = () => {
  const [flashcards, setFlashcards] = useState({
    set_name: "",
    set_description: "",
    set_category: "",
    flashcards: [],
    username: "",
    organization: "",
  });
  const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(0);
  const [previousFlashcardIndex, setPreviousFlashcardIndex] = useState(-1);
  const [correctDefinition, setCorrectDefinition] = useState("");
  const [shuffledDefinitions, setShuffledDefinitions] = useState<string[]>([]);
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");
  const [token, setToken] = useState<string | null>(null);

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    console.log(flashcards);
  }, [flashcards]);

  useEffect(() => {
    if (id!.length === 0 || id!.length !== 26 || id!.includes(" ")) {
      setFlashcards((prevFlashcards) => ({
        ...prevFlashcards,
        set_name: "Хм, този сет не съществува",
        set_description: "Провери дали си въвел правилния линк",
        set_category: "",
        flashcards: [],
        username: "все още никого :<",
        organization: "",
      }));
      return;
    }

    instance
      .get(`/sets/${id}`)
      .then((res) => {
        setFlashcards(res.data.set);
        if (flashcards.flashcards.length > 0) {
          setCurrentFlashcardIndex(0);
          setCorrectDefinition(flashcards.flashcards[0].definition);
          shuffleDefinitions(flashcards.flashcards[0].definition);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, [id]);

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

  useEffect(() => {
    ensureDifferentFlashcard();
  }, [currentFlashcardIndex]);

  const ensureDifferentFlashcard = () => {
    let nextIndex;
    do {
      nextIndex = Math.floor(Math.random() * flashcards.flashcards.length);
    } while (nextIndex === previousFlashcardIndex);

    setCurrentFlashcardIndex(nextIndex);
  };

  const shuffleDefinitions = (correctDefinition: string) => {
    const allDefinitions = [
      ...flashcards.flashcards.map((card) => card.definition),
    ];
    const shuffled = shuffleArray([...allDefinitions, correctDefinition]);
    const selectedDefinitions = shuffled.slice(0, 4);
    setShuffledDefinitions(selectedDefinitions);
  };

  const handleAnswerButtonClick = (definition: string, isInput: boolean) => {
    if (isInput) {
      const updatedFlashcard = {
        definition: flashcards.flashcards[currentFlashcardIndex].definition,
        flashcard_id: flashcards.flashcards[currentFlashcardIndex].flashcard_id,
        notes: null,
        term: flashcards.flashcards[currentFlashcardIndex].term,
        correctness: isAnswerCorrect(definition, correctDefinition) ? 1 : 0,
        username: username,
        user_id: userId,
      };

      instance
        .put(
          `/flashcards/${flashcards.flashcards[currentFlashcardIndex].flashcard_id}/study`,
          updatedFlashcard
        )
        .catch((err) => console.error(err));

      setPreviousFlashcardIndex(currentFlashcardIndex);
      ensureDifferentFlashcard();
      setCorrectDefinition(flashcards.flashcards[nextIndex].definition);
      shuffleDefinitions(flashcards.flashcards[nextIndex].definition);
    } else {
      console.log(definition, correctDefinition);
      if (definition === correctDefinition) {
        const nextIndex = currentFlashcardIndex + 1;
        if (nextIndex < flashcards.flashcards.length) {
          const updatedFlashcard = {
            definition: flashcards.flashcards[currentFlashcardIndex].definition,
            flashcard_id:
              flashcards.flashcards[currentFlashcardIndex].flashcard_id,
            notes: null,
            term: flashcards.flashcards[currentFlashcardIndex].term,
            correctness: 1,
            username: username,
            user_id: userId,
          };

          instance
            .put(
              `/flashcards/${flashcards.flashcards[currentFlashcardIndex].flashcard_id}/study`,
              updatedFlashcard
            )
            .catch((err) => console.error(err));

          setPreviousFlashcardIndex(currentFlashcardIndex);
          ensureDifferentFlashcard();
          setCorrectDefinition(flashcards.flashcards[nextIndex].definition);
          shuffleDefinitions(flashcards.flashcards[nextIndex].definition);
        } else {
          console.log("Reached end of flashcards");
        }
      } else {
        const updatedFlashcard = {
          definition: flashcards.flashcards[currentFlashcardIndex].definition,
          flashcard_id:
            flashcards.flashcards[currentFlashcardIndex].flashcard_id,
          notes: null,
          term: flashcards.flashcards[currentFlashcardIndex].term,
          correctness: 0,
          username: username,
          user_id: userId,
        };

        instance
          .put(
            `/flashcards/${flashcards.flashcards[currentFlashcardIndex].flashcard_id}/study`,
            updatedFlashcard
          )
          .catch((err) => console.error(err));

        setPreviousFlashcardIndex(currentFlashcardIndex);
        ensureDifferentFlashcard();
        setCorrectDefinition(flashcards.flashcards[nextIndex].definition);
        shuffleDefinitions(flashcards.flashcards[nextIndex].definition);
      }
    }
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

  const shouldBeInput = (flashcards) => {
    if (!flashcards || !flashcards.set || !flashcards.flashcards) {
      return [];
    }

    const avgConfidence =
      flashcards.flashcards.reduce((sum, card) => sum + card.confidence, 0) /
      flashcards.flashcards.length;
    const result = flashcards.flashcards.map(
      (card) => card.confidence > avgConfidence
    );

    return result;
  };

  const isInput = shouldBeInput(flashcards.flashcards);

  const shuffleArrayWeighted = (flashcards) => {
    const weights = flashcards.map((card) => card.correctness);
    const adjustedWeights = weights.map((weight) => Math.exp(-weight));
    const totalWeight = adjustedWeights.reduce((acc, curr) => acc + curr, 0);
    const randomWeight = Math.random() * totalWeight;

    let cumulativeWeight = 0;
    for (let i = 0; i < flashcards.length; i++) {
      cumulativeWeight += adjustedWeights[i];
      if (randomWeight <= cumulativeWeight) {
        return i;
      }
    }
    return flashcards.length - 1;
  };

  // Levenshtein distance algorithm for string similarity (MOST LIKELY WILL CHANGE.)
  const calculateSimilarity = (str1, str2) => {
    const len1 = str1.length + 1;
    const len2 = str2.length + 1;

    const matrix = Array(len1)
      .fill(null)
      .map(() => Array(len2).fill(null));

    for (let i = 0; i < len1; i++) {
      for (let j = 0; j < len2; j++) {
        if (i === 0) {
          matrix[i][j] = j;
        } else if (j === 0) {
          matrix[i][j] = i;
        } else {
          const cost = str1.charAt(i - 1) === str2.charAt(j - 1) ? 0 : 1;
          matrix[i][j] = Math.min(
            matrix[i - 1][j] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j - 1] + cost
          );
        }
      }
    }

    const maxLen = Math.max(len1, len2);
    const distance = matrix[len1 - 1][len2 - 1];

    return 1 - distance / maxLen;
  };

  const isAnswerCorrect = (userInput, expectedAnswer) => {
    const similarity = calculateSimilarity(
      userInput.toLowerCase(),
      expectedAnswer.toLowerCase()
    );
    return expectedAnswer.length < 20 ? similarity >= 0.99 : similarity >= 0.85;
  };

  console.log(currentFlashcardIndex, "index");

  return (
    <>
      <Dashboard>
      <div className="study-component">
        <div className="study-wrapper">
        {flashcards.flashcards.length > 0 && (
          <div id="flashcard" className={"no-image-flashcard"}>
            <div className="term">
              <p className="term-text">Термин:</p>
              <h3>{parse(flashcards.flashcards[currentFlashcardIndex].term)}</h3>
            </div>
          </div>
        )}

        <div className="test">
          {flashcards.flashcards.slice(0, 4).map((flashcard, index) => (
            <div className="option" key={flashcard.flashcard_id}>
              {isInput[index] ? (
                <input
                  type="text"
                  placeholder={`Въведи дефиниция за ${flashcard.term}`}
                  onBlur={(e) => handleAnswerButtonClick(e.target.value, true)}
                />
              ) : (
                <button
                  key={index}
                  onClick={() =>
                    handleAnswerButtonClick(flashcard.definition, false)
                  }
                >
                  {parse(flashcard.definition)}
                </button>
              )}
            </div>
          ))}
          </div>
        </div>
      </div>
      </Dashboard>
    </>
  );
};

export { StudyComponent };
