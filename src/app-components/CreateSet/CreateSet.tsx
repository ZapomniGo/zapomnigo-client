import React, { useState } from "react";
import Editor from "../RichEditor/Editor";
import Dashboard from "../Dashboard/Dashboard";
import { WithContext as ReactTags } from "react-tag-input";
import { HiOutlineDuplicate } from "react-icons/hi";
import { MdDeleteOutline } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { v4 as uuidv4 } from "uuid";

export const CreateSet = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [flashcards, setFlashcards] = useState([{ term: "", description: "" }]);

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
    //check if the title is not empty
    if (title.length === 0) {
      alert("Моля въведете заглавие");
      return;
    }
    if (title.length > 100) {
      alert("Заглавието трябва да е под 100 символа");
      return;
    }
    if (description.length > 1000) {
      alert("Описанието трябва да е под 1000 символа");
      return;
    }
    if (description.length === 0) {
      alert("Моля въведете описание");
      return;
    }
    //check if the flashcards are not empty
    if (flashcards.length === 0) {
      alert("Моля въведете поне една карта");
      return;
    }
    //check if the flashcards are not empty
    if (flashcards.length > 3000) {
      alert("Картите трябва да са под 3000");
      return;
    }
    //check if each flashcard has a term and a description
    if (
      flashcards.find(
        (flashcard) =>
          flashcard.term.replace(/<[^>]+>/g, "").length === 0 ||
          flashcard.description.replace(/<[^>]+>/g, "").length === 0
      )
    ) {
      alert("Моля попълнете всички карти");
      return;
    }
    //check if any flashcard has more than 2000 characters
    if (
      flashcards.find(
        (flashcard) =>
          flashcard.term.replace(/<[^>]+>/g, "").length > 2000 ||
          flashcard.description.replace(/<[^>]+>/g, "").length > 2000
      )
    ) {
      alert("Някоя от картите е с повече от 2000 символа");
      return;
    }
    //check if the tags are not empty
    if (tags.length === 0) {
      alert("Моля въведете категория");
      return;
    }

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
    setFlashcards(newFlashcards);
  };

  const [institutions, setInstitutions] = useState([]);

  const search = (query) => {
    let url = "http://www.google.com/search?q=" + query;
    window.open(url, "_blank");
  };

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
          <h1>Създай сет</h1>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Заглавие"
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
              <select id="categories" name="categories">
                <option value="category1">Категория 1</option>
                <option value="category2">Категория 2</option>
                <option value="category3">Категория 3</option>
              </select>
              <select id="institution" name="institution">
                <option value="institution1">Институция 1</option>
                <option value="institution2">Институция 2</option>
                <option value="institution3">Институция 3</option>
              </select>
            </div>
          </div>
          {flashcards.map((flashcard, index) => (
            <div className="flashcardWrapper">
              <div className="buttonWrapper">
                <MdDeleteOutline
                  style={{ marginBottom: "1vmax" }}
                  onClick={() => deleteFlashcard(flashcard.rnd)}
                />
                <div>
                  {flashcard.term.replace(/<[^>]+>/g, "").length ||
                  flashcard.description.replace(/<[^>]+>/g, "").length ? (
                    <HiOutlineDuplicate
                      onClick={() => duplicate(flashcard.rnd)}
                    />
                  ) : (
                    ""
                  )}
                  {flashcards.length > 1 ? (
                    <>
                      {" "}
                      <IoIosArrowUp onClick={() => push("up", flashcard.rnd)} />
                      <IoIosArrowDown
                        onClick={() => push("down", flashcard.rnd)}
                      />{" "}
                    </>
                  ) : (
                    ""
                  )}
                  {flashcard.term.replace(/<[^>]+>/g, "").length ? (
                    <IoSearch
                      onClick={() =>
                        search(flashcard.term.replace(/<[^>]+>/g, ""))
                      }
                    />
                  ) : (
                    ""
                  )}
                </div>
              </div>
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
          <button
            disabled={!flashcards.length}
            onClick={handleSubmit}
            className="submit"
          >
            Запази
          </button>
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
