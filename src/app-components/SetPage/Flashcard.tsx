import React from "react";
import parse from "html-react-parser";
import speak from "../../app-utils/speechSynthesis";
interface FlashcardProps {
  flashcard: {
    id: string;
    term: string;
    definition: string;
  };
}

export const Flashcard: React.FC<FlashcardProps> = ({ flashcard }) => {
  return (
    <div id="flashcard" className={"no-image"}>
      <div className="term">
        <p onClick={() => speak(flashcard.term)}>{parse(flashcard.term)}</p>
      </div>
      <div className="description">
        <p onClick={() => speak(flashcard.definition)}>{parse(flashcard.definition)}</p>
      </div>
      {/* {flashcard.image && 
        <div className='image'>
            <img src={flashcard.image} alt={flashcard.term} />
        </div>
      } */}
    </div>
  );
};
