import { useState, useEffect } from "react";
import Editor from "../RichEditor/Editor";
import Dashboard from "../Dashboard/Dashboard";
import { HiOutlineDuplicate } from "react-icons/hi";
import { MdDeleteOutline, MdFlip } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { useFlashcards } from "./utils";
import { FLASHCARD_DIRECTIONS } from "./types";

export const CreateSet = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [allCategories, setAllCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [allInstitutions, setAllInstitutions] = useState([]);
  const [institution, setInstitution] = useState("");
  const {
    flashcards,
    handleMoveFlashcard,
    handleChangeFlashcard,
    handleAddFlashcard,
    handleDeleteFlashcard,
    handleDuplicateFlashcard,
    handleFlipFlashcard,
  } = useFlashcards();

  useEffect(() => {
    fetch("https://zapomnigo-server-aaea6dc84a09.herokuapp.com/v1/categories")
      .then((response) => response.json())
      .then((data) => setAllCategories(data.categories));
    fetch(
      "https://zapomnigo-server-aaea6dc84a09.herokuapp.com/v1/organizations"
    )
      .then((response) => response.json())
      .then((data) => setAllInstitutions(data.organizations));
  }, []);

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

  const handleSubmit = () => {
    const data = {
      title,
      description,
      flashcards,
      category,
      institution,
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

    console.log(data);
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
              <select
                onChange={(e) => setCategory(e.target.value)}
                defaultValue={-1}
                id="categories"
                name="categories"
              >
                <option value="-1">Без категория</option>
                {allCategories.map((category, index) => (
                  <option key={index} value={category.category_id}>
                    {category.category_name}
                  </option>
                ))}
              </select>
              <select id="institution" name="institution">
                <option value="-1">Без категория</option>
                {allInstitutions.map((institution, index) => (
                  <option key={index} value={institution.organization_id}>
                    {institution.organization_name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {flashcards.map((flashcard, index) => (
            <div className="flashcardWrapper">
              <div className="buttonWrapper">
                <MdDeleteOutline
                  onClick={() => handleDeleteFlashcard(flashcard.rnd)}
                />
                <div>
                  {flashcard.term.replace(/<[^>]+>/g, "").length ||
                  flashcard.description.replace(/<[^>]+>/g, "").length ? (
                    <HiOutlineDuplicate
                      onClick={() => handleDuplicateFlashcard(flashcard.rnd)}
                    />
                  ) : (
                    ""
                  )}
                  {flashcards.length > 1 ? (
                    <>
                      {" "}
                      <IoIosArrowUp
                        onClick={() =>
                          handleMoveFlashcard(index, FLASHCARD_DIRECTIONS.UP)
                        }
                      />
                      <IoIosArrowDown
                        onClick={() =>
                          handleMoveFlashcard(index, FLASHCARD_DIRECTIONS.DOWN)
                        }
                      />{" "}
                    </>
                  ) : (
                    ""
                  )}
                  {flashcard.term.replace(/<[^>]+>/g, "").length ||
                  flashcard.description.replace(/<[^>]+>/g, "").length ? (
                    <MdFlip
                      onClick={() => handleFlipFlashcard(flashcard.rnd)}
                    />
                  ) : (
                    ""
                  )}
                    {flashcard.term.replace(/<[^>]+>/g, "").length ? (
                    <>
                      <IoSearch
                        onClick={() =>
                          search(flashcard.term.replace(/<[^>]+>/g, ""))
                        }
                      />
                    </>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div key={index} className="flashcard">
                <Editor
                  placeholder={"Термин"}
                  value={flashcard.term}
                  onChange={(value: string) =>
                    handleChangeFlashcard(index, "term", value)
                  }
                />
                <Editor
                  placeholder={"Дефиниция"}
                  value={flashcard.description}
                  onChange={(value: string) =>
                    handleChangeFlashcard(index, "description", value)
                  }
                />
              </div>{" "}
            </div>
          ))}
          <center>
            <button onClick={handleAddFlashcard} className="add-card">
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
