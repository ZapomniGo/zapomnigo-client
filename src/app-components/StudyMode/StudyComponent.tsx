import { useEffect, useState } from "react";
import { useParams } from "react-router";
import instance from "../../app-utils/axios";
import React from "react";

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
  const [correctDefinition, setCorrectDefinition] = useState("");
  const [shuffledDefinitions, setShuffledDefinitions] = useState<string[]>([]);

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
        setCurrentFlashcardIndex(nextIndex);
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
