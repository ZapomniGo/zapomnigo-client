import React, { useState } from "react";
import Editor from "../RichEditor/Editor";
import Dashboard from "../Dashboard/Dashboard";
import { WithContext as ReactTags } from "react-tag-input";
import { v4 as uuidv4 } from 'uuid';
export const CreateSet = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [flashcards, setFlashcards] = useState([{ term: "", description: "" }]);
  const [tags, setTags] = useState([]);

  const suggestions = [
    { id: "Math", text: "Math" },
    { id: "Science", text: "Science" },
    { id: "History", text: "History" },
  ];

  const handleDelete = (i) => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  const handleAddition = (tag) => {
    if (suggestions.find((suggestion) => suggestion.id === tag.id)) {
      setTags([tag]);
    }
  };

  const handleInstitutionDelete = (i) => {
    setInstitutions(institutions.filter((institution, index) => index !== i));
  };

  const handleInstitutionAddition = (institution) => {
    if (
      institutionSuggestions.find(
        (suggestion) => suggestion.id === institution.id
      )
    ) {
      setInstitutions([institution]);
    }
  };

  const handleEditorChange = (index, field, value) => {
    setFlashcards(
      flashcards.map((flashcard, i) =>
        i === index ? { ...flashcard, [field]: value } : flashcard
      )
    );
  };

  const addFlashcard = () => {
    setFlashcards([
      ...flashcards,
      { term: "", description: "", rnd: uuidv4() },
    ]);
  };

  const handleSubmit = () => {
    const data = {
      title,
      description,
      flashcards,
      tags,
    };
    console.log(data);
  };
  const deleteFlashcard = (rnd) => {
    //delete a flaschard. to do that we delete by the rnd which is a key in the flashcard object which is unique and in an array
    //we filter the array and we return all the flashcards which have a different rnd
    setFlashcards(
      flashcards.filter((flashcard, index) => flashcard.rnd !== rnd)
    );
  };
  const duplicate = (rnd) => {
    setFlashcards([
      ...flashcards,
      flashcards.find((flashcard, index) => flashcard.rnd === rnd),
    ]);
  };
  const push = (direction, rnd) => {
    //push the flashcard up or down
    //we find the index of the flashcard we want to move
    const index = flashcards.findIndex((flashcard) => flashcard.rnd === rnd);
    //we create a new array
    const newFlashcards = [...flashcards];
    //we remove the flashcard from the array
    newFlashcards.splice(index, 1);
    //we push the flashcard up or down
    //we account for the fact that the flashcard might be the first or the last
    if (direction === "up") {
      if (index === 0) {
        newFlashcards.push(flashcards[index]);
      } else {
        newFlashcards.splice(index - 1, 0, flashcards[index]);
      }
    } else {
      if (index === flashcards.length - 1) {
        newFlashcards.unshift(flashcards[index]);
      } else {
        newFlashcards.splice(index + 1, 0, flashcards[index]);
      }
    }
    //we update the state
    setFlashcards(newFlashcards);

  };

  const [institutions, setInstitutions] = useState([]);

  const institutionSuggestions = [
    {
      id: "Institution1Institution1Institution1",
      text: "Institution1Institution1Institution1",
    },
    { id: "Institution2", text: "Institution2" },
  ];

  return (
    <Dashboard>
      <div className="create-set-wrapper">
        <div className="create-set">
          <h1>Данни за сета</h1>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Залглавие"
            className="title"
          />
          <div className="other-info">
            <div className="description">
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Описание"
              />
            </div>
            <div className="tags">
              <ReactTags
                tags={tags}
                suggestions={suggestions}
                handleDelete={handleDelete}
                handleAddition={handleAddition}
                placeholder="Категория"
              />
              <ReactTags
                tags={institutions}
                suggestions={institutionSuggestions}
                handleDelete={handleInstitutionDelete}
                handleAddition={handleInstitutionAddition}
                placeholder="Институция"
              />
            </div>
          </div>
          <h1>Флашкарти</h1>
          {flashcards.map((flashcard, index) => (
            <div className="flashcardWrapper">
              <button onClick={() => deleteFlashcard(flashcard.rnd)}>X</button>
              <button onClick={() => duplicate(flashcard.rnd)}>
                Дупликирай
              </button>
              <button onClick={() => push("up", flashcard.rnd)}>
                Премести нагоре
              </button>
              <button onClick={() => push("down", flashcard.rnd)}>
                Премести надолу
              </button>
              <button>Премести надолу</button>
              <div key={index} className="flashcard">
                <Editor
                  placeholder={"Термин"}
                  value={flashcard.term}
                  onChange={(value) => handleEditorChange(index, "term", value)}
                />
                <Editor
                  placeholder={"Дефиниция"}
                  value={flashcard.description}
                  onChange={(value) =>
                    handleEditorChange(index, "description", value)
                  }
                />
              </div>{" "}
            </div>
          ))}
          <center>
            <button onClick={addFlashcard} className="add-card">
              +
            </button>
          </center>
          <button onClick={handleSubmit} className="submit">
            Запази
          </button>
          {tags.map((tag, index) => (
            <span key={index} className="tag">
              {tag.text}
              <button onClick={() => handleDelete(index)}>x</button>
            </span>
          ))}
          {institutions.map((institution, index) => (
            <span key={index} className="institution">
              {institution.text}
              <button onClick={() => handleInstitutionDelete(index)}>
                Изтрий
              </button>
            </span>
          ))}
        </div>
      </div>
    </Dashboard>
  );
};
