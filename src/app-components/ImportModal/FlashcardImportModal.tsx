import { useState } from "react";

type FlashcardImportModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onImport: (flashcards: { term: string; definition: string }[]) => void;
};

const FlashcardImportModal = (props: FlashcardImportModalProps) => {
  const [inputText, setInputText] = useState("");
  const [delimiter, setDelimiter] = useState("");
  const [delimiter2, setDelimiter2] = useState("\n");

  const handleImport = () => {
    const flashcards = inputText;
    props.onImport(flashcards, delimiter, delimiter2);
    props.onClose();
  };

  return (
    <div className={`modal ${props.isOpen ? "open" : ""}`}>
      <div className="modal-content">
        <h2>Импортирай флашкарти</h2>
        <label>
          Флашкарти (Термин{delimiter}Дефиниция):
          <p>
            <i>
              <br /> Въведи текста за импортиране по-долу. В следващите полето
              сложи разделител между термин и дефиниция на флашкарта и
              разделител между отделните флашкарти. Ако сложиш например /n това
              индикира нов ред.
            </i>
          </p>
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
        <label>
          Символ разделител между нови флашкарти:
          <input
            type="text"
            value={delimiter2}
            onChange={(e) => setDelimiter2(e.target.value)}
            placeholder="/n"
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
