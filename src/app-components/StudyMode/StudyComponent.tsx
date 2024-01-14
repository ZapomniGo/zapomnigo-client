import { useEffect, useState } from "react";
import { useParams } from "react-router";
import instance from "../../app-utils/axios";
import React from "react";
import { jwtDecode } from "jwt-decode";

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
  const [token, setToken] = useState<string | null>(null);

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id!.length === 0 || id!.length !== 26 || id!.includes(" ")) {
      setFlashcards({
        set_name: "Хм, този сет не съществува",
        set_description: "Провери дали си въвел правилния линк",
        set_category: "",
        flashcards: [],
        username: "все още никого :<",
        organization: "",
      });
      return;
    }

    instance
      .get(`/sets/${id}`)
      .then((res) => {
        setFlashcards(res.data.set);
      })
      .catch((err) => {
        console.error(err);
      });

    if (flashcards.flashcards.length > 0) {
      setCurrentFlashcardIndex(0);
      setCorrectDefinition(flashcards.flashcards[0].definition);
      shuffleDefinitions(flashcards.flashcards[0].definition);
    }
  }, [id, flashcards.flashcards.length]);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    setToken(token || null);

    if (token) {
      const decodedToken: { username: string; institution: string } =
        jwtDecode(token);
      setUsername(decodedToken.username);
    }
  }, []);

  useEffect(() => {
    ensureDIfferentFlashcard();
  }, [currentFlashcardIndex, flashcards.flashcards]);

  const ensureDIfferentFlashcard = () => {
    let nextIndex;
    do {
      nextIndex = Math.floor(Math.random() * flashcards.flashcards.length);
    } while (nextIndex === previousFlashcardIndex);

    setCurrentFlashcardIndex(nextIndex);
    setPreviousFlashcardIndex(nextIndex);
  };

  const shuffleDefinitions = (correctDefinition: string) => {
    const allDefinitions = [
      ...flashcards.flashcards.map((card) => card.definition),
    ];
    const shuffled = shuffleArray([...allDefinitions, correctDefinition]);
    const selectedDefinitions = shuffled.slice(0, 4);
    setShuffledDefinitions(selectedDefinitions);
  };

  const handleAnswerButtonClick = (definition: string) => {
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
        };

        instance
          .put(
            `/flashcards/${flashcards.flashcards[currentFlashcardIndex].flashcard_id}/study`,
            updatedFlashcard
          )
          .catch((err) => console.error(err));

        ensureDIfferentFlashcard();
        setCorrectDefinition(flashcards.flashcards[nextIndex].definition);
        shuffleDefinitions(flashcards.flashcards[nextIndex].definition);
      } else {
        console.log("Reached end of flashcards");
      }
    } else {
      console.log("Incorrect answer");
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
    return similarity > 0.8;
  };

  console.log(flashcards);

  return (
    <>
      <div>
        <h2>{flashcards.flashcards[currentFlashcardIndex]?.term}</h2>
        {shuffledDefinitions.map((definition, index) => (
          <button
            key={index}
            onClick={() => handleAnswerButtonClick(definition)}
          >
            {definition}
          </button>
        ))}
      </div>
    </>
  );
};

export { StudyComponent };
