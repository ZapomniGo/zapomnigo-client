import { useState } from "react";
import { FaExclamationCircle } from "react-icons/fa";

type FlashcardImportModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onImport: (flashcards: { term: string; definition: string }[]) => void;
};

const FlashcardImportModal = (props: FlashcardImportModalProps) => {
  const [inputText, setInputText] = useState("");
  const [delimiter, setDelimiter] = useState("");
  const [rowDelimiter, setRowDelimiter] = useState("\n");
  const [isTermEmpty, setIsTermEmpty] = useState(false);
  const [isDefinitionEmpty, setIsDefinitionEmpty] = useState(false);

  const handleImport = () => {
    const flashcards = inputText.split(rowDelimiter).map((line) => {
      const [term, definition] =
        delimiter === "TAB"
          ? line.replace(/\t/g, delimiter).trim().split(delimiter)
          : line.trim().split(delimiter);

      if (!term || !definition) {
        setIsTermEmpty(!term);
        setIsDefinitionEmpty(!definition);
        return null;
      }

      return { term, definition };
    });

    if (flashcards.some((card) => !card)) {
      return;
    }

    if (flashcards.length > 2000) {
      alert("Cannot input more than 2000 flashcard pairs.");
      return;
    }

    setIsTermEmpty(false);
    setIsDefinitionEmpty(false);

    props.onImport(flashcards);
    props.onClose();
  };

  return (
    <div className={`modal ${props.isOpen ? "open" : null}`}>
      <div className="modal-content">
        <h2>Import Flashcards</h2>
        <label>
          Import your flashcard data.
          <label>
            Enter your data in the following manner, term[<em>delimiter</em>]
            definition. If your delimiter is a tab, please input TAB in the
            field.
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Enter flashcards here..."
            />
            {isTermEmpty && (
              <span className="validation-error" style={{ color: "red" }}>
                <FaExclamationCircle /> Term cannot be empty
              </span>
            )}
            <br />
            {isDefinitionEmpty && (
              <span className="validation-error" style={{ color: "red" }}>
                <FaExclamationCircle /> Definition cannot be empty
              </span>
            )}
          </label>
        </label>
        <label>
          Delimiter:
          <input
            type="text"
            value={delimiter}
            onChange={(e) => setDelimiter(e.target.value)}
            style={{ height: "2rem" }}
          />
        </label>
        <label>
          Row Delimiter:
          <input
            type="text"
            value={rowDelimiter}
            onChange={(e) => setRowDelimiter(e.target.value)}
            style={{ height: "2rem" }}
          />
        </label>
        <div className="button-container">
          <button onClick={props.onClose}>Cancel</button>
          <button onClick={handleImport}>OK</button>
        </div>
      </div>
    </div>
  );
};

export default FlashcardImportModal;
