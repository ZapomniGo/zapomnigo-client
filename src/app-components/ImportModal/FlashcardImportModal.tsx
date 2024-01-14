import { useState } from "react";

type FlashcardImportModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onImport: (flashcards: { term: string; definition: string }[]) => void;
};

const FlashcardImportModal = (props: FlashcardImportModalProps) => {
  const [inputText, setInputText] = useState("");
  const [delimiter, setDelimiter] = useState(" ");

  const handleImport = () => {
    const flashcards = inputText.split(delimiter).map((pair) => {
      const [term, definition] = pair.trim().split(/\s*[:=]\s*/);
      return { term, definition };
    });

    props.onImport(flashcards);
    props.onClose();
  };

  return (
    <div className={`modal ${props.isOpen ? "open" : ""}`}>
      <div className="modal-content">
        <h2>Импортирай флашкарти</h2>
        <label>
          Флашкарти (Термин{delimiter}Дефиниция):
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Въведи флашкарти тук..."
          />
        </label>
        <label>
          Символ разделител между термин и дефиниция:
          <input
            type="text"
            value={delimiter}
            onChange={(e) => setDelimiter(e.target.value)}
          />
        </label>
        <div className="button-container">
          <button onClick={props.onClose}>Откажи</button>
          <button onClick={handleImport}>Потвърди</button>
        </div>
      </div>
    </div>
  );
};

export default FlashcardImportModal;
