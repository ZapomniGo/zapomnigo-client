import { useState, useEffect } from "react";
import Editor from "../RichEditor/Editor";
import Dashboard from "../Dashboard/Dashboard";
import { HiOutlineDuplicate } from "react-icons/hi";
import { MdDeleteOutline, MdFlip } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { useFlashcards } from "../CreateSet/utils";
import { FLASHCARD_DIRECTIONS } from "../CreateSet/types";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import instance from "../../app-utils/axios";
import FlashcardImportModal from "../ImportModal/FlashcardImportModal";
import { useParams } from "react-router";
import { jwtDecode } from "jwt-decode";


export const EditSet = () => {
//   const jwt: { username: string; admin: boolean } = jwtDecode(
//     localStorage.getItem("access_token") || ""
//   );
// if (!jwt.admin || !localStorage.getItem("access_token")) {
//     window.location.href = "/login";
//   }
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [allCategories, setAllCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [allInstitutions, setAllInstitutions] = useState([]);
  const [institution, setInstitution] = useState("");
  const [FlashcardInfo, setFlashcardInfo] = useState([]);

  const { id } = useParams<{ id: string }>();

  const {
    flashcards,
    handleMoveFlashcard,
    handleChangeFlashcard,
    handleAddFlashcard,
    handleDeleteFlashcard,
    handleDuplicateFlashcard,
    handleFlipFlashcard,
    handleFlipAllFlashcards,
    handleOnImportFlashcards,
    loadFlashcards
  } = useFlashcards();

  useEffect(() => {
    instance.get("/categories")
      .then((response) => {
        setAllCategories(response.data.categories);
      })
    instance.get("/organizations")
    .then((response) =>{
        setAllInstitutions(response.data.organizations);
    })
    instance.get(`/sets/${id}`)
      .then((response) => {
        loadFlashcards(response.data.set.flashcards);
        setTitle(response.data.set.set_name);
        setDescription(response.data.set.set_description);
        //here i should get the ids of inst and catgeory and check in select
        setInstitution(response.data.set.organization_name);
        setCategory(response.data.set.category_name);
        console.log(response.data);
      })
  }, []);
  const isEmpty = (string: string) => {
    if (string.length === 0) {
      return true;
    }
    if (
      string.replace(/<[^>]+>/g, "").length === 0 &&
      !(
        string.includes("<img") ||
        string.includes("<video") ||
        string.includes("<audio") ||
        string.includes("<iframe")
      )
    ) {
      return true;
    }
    return false;
  };


  const handleSubmit = () => {
    if (title.length === 0) {
      toast("Моля въведете заглавие");
      return;
    }
    if (title.length > 100) {
      toast("Заглавието трябва да е под 100 символа");
      return;
    }
    if (description.length > 1000) {
      toast("Описанието трябва да е под 1000 символа");
      return;
    }
    if (description.length === 0) {
      toast("Моля въведете описание");
      return;
    }
    //check if the flashcards are not empty
    if (flashcards.length === 0) {
      toast("Моля въведете поне една карта");
      return;
    }
    //check if the flashcards are not empty
    if (flashcards.length > 3000) {
      toast("Картите трябва да са под 3000");
      return;
    }
    //check if each flashcard has a term and a description using isEmpty function
    if (flashcards.find((flashcard) => isEmpty(flashcard.term))) {
      toast("Някоя от картите няма термин");
      return;
    }
    if (flashcards.find((flashcard) => isEmpty(flashcard.definition))) {
      toast("Някоя от картите няма дефиниция");
      return;
    }
    //check if any flashcard has more than 2000 characters
    if (
      flashcards.find(
        (flashcard) =>
          flashcard.term.replace(/<[^>]+>/g, "").length > 10000 ||
          flashcard.definition.replace(/<[^>]+>/g, "").length > 10000
      )
    ) {
      toast("Някоя от картите е с поле с повече от 10000 символа");
      return;
    }
    //check if the tags are not empty
    instance
      .put(`/sets/${id}`, {
        set_name: title,
        set_description: description,
        flashcards: flashcards,
        set_category: category,
        set_institution: institution,
      })
      .then((response) => {
        toast("Това съобшение трябва да се замени с някакво друго");
        console.log(response);
        window.location.href = `/set/${id}`;
      })
      .catch((error) => {
        toast("Възникна грешка");
        console.log(error);
      });
  };

  const search = (query: string) => {
    const url = "http://www.google.com/search?q=" + query;
    window.open(url, "_blank");
  };

  useEffect(() => {
    console.log(institution);
    console.log(category);
  }
  , [institution, category]);

  return (
    <Dashboard>
      <ToastContainer />
      <div className="create-set-wrapper">
        <div className="create-set">
          <h1>Редактирай тесте</h1>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Заглавие"
            className="title"
            minLength={1}
            maxLength={100}
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
                defaultValue={""}
                id="categories"
                name="categories"
              >
                <option value="">Без категория</option>
                {allCategories.map((allCat, index) => {
                    return (
                      <option key={index} value={category.category_id} selected={allCat.category_name === category}>
                        {allCat.category_name}
                      </option>
                    );
                  })}
              </select>
              <select
                onChange={(e) => setInstitution(e.target.value)}
                defaultValue=""
                id="institution"
                name="institution"
              >
                <option value="">Без институция</option>
                {allInstitutions.map((allInst, index) => (
                  <option key={index} value={allInst.organization_id} selected={allInst.organization_name === institution}>
                    {allInst.organization_name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {flashcards.map((flashcard, index) => (
            <div className="flashcardWrapper">
              <div className="buttonWrapper">
                <MdFlip onClick={() => handleFlipAllFlashcards()} />
                {/* TODO(): Refactor styling for icons */}
                <MdDeleteOutline
                  onClick={() => handleDeleteFlashcard(flashcard.flashcard_id)}
                />
                <div>
                  {!isEmpty(flashcard.term) ||
                  !isEmpty(flashcard.definition) ? (
                    <HiOutlineDuplicate
                      onClick={() => handleDuplicateFlashcard(flashcard.flashcard_id)}
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
                  {!isEmpty(flashcard.term) ||
                  !isEmpty(flashcard.definition) ? (
                    <MdFlip
                      onClick={() => handleFlipFlashcard(flashcard.flashcard_id)}
                    />
                  ) : (
                    ""
                  )}
                  {!isEmpty(flashcard.term) ? (
                    <>
                      <IoSearch onClick={() => search(flashcard.term)} />
                    </>
                  ) : (
                    ""
                  )}
                </div>
              </div>{" "}
              <div key={index} className="flashcard">
                <Editor
                placeholder={"Term"}
                value={flashcard.term}
                onChange={(value: string) =>
                    handleChangeFlashcard(index, "term", value)
                }
                />
                <Editor
                placeholder={"Definition"}
                value={flashcard.definition}
                onChange={(value: string) =>
                    handleChangeFlashcard(index, "definition", value)
                }
                />
            </div>
            </div>
          ))}
          <center>
            <button onClick={handleAddFlashcard} className="add-card">
              +
            </button>
          </center>
          <div className="create-submition">
            <button className="submit" onClick={() => setIsModalOpen(!isModalOpen)}>Импортирай</button>
            <button
              disabled={!flashcards.length}
              onClick={handleSubmit}
              className="submit"
            >
              Запази промените
            </button>
          </div>
        </div>
      </div>
      <FlashcardImportModal
        onImport={() => handleOnImportFlashcards()}
        isOpen={isModalOpen}
        onClose={() => {
          console.log("closed");
          setIsModalOpen(false);
        }}
      />
    </Dashboard>
  );
};
