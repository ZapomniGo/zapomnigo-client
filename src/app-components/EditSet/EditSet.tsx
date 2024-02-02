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
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { jwtDecode } from "jwt-decode";

export const EditSet = () => {
  useEffect(() => {
    if (!localStorage.getItem("access_token")) {
      window.location.href = "/app/login";
      return;
    }
    const jwt: { username: string; admin: boolean } = jwtDecode(
      localStorage.getItem("access_token") || ""
    );
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [allCategories, setAllCategories] = useState([]);
  const [category, setCategory] = useState({ name: "", id: "" });
  const [subcategory, setSubcategory] = useState({ name: "", id: "" });
  const [allSubcategories, setAllSubcategories] = useState([]);
  const navigate = useNavigate();
  const [allInstitutions, setAllInstitutions] = useState([]);
  const [filter, setFilter] = useState("");
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
    loadFlashcards,
  } = useFlashcards();

  useEffect(() => {
    instance.get("/categories").then((response) => {
      setAllCategories(response.data.categories);
    });
    // instance.get("/organizations").then((response) => {
    //   setAllInstitutions(response.data.organizations);
    // });
    instance.get(`/sets/${id}?size=2000` + filter).then((response) => {
      loadFlashcards(response.data.set.flashcards);
      setTitle(response.data.set.set_name);
      setDescription(response.data.set.set_description);
      setSubcategory({ name: response.data.set.subcategory_name, id: "" });
      setCategory({ name: response.data.set.category_name, id: "" });
    })
    .catch((error) => {
      if (error.response.status === 404) {
        window.location.href = "/app/not-found";
      }
    });
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

  const categoryIdRef = useRef(null);
  const subcategoryIdRef = useRef(null);

  useEffect(() => {
    if (category && category.name && allCategories.length > 0) {
      const selectedCategory = allCategories.find(
        (cat) => cat.category_name === category.name
      );
      categoryIdRef.current = selectedCategory.category_id;
    }

    if (subcategory && subcategory.name && allSubcategories.length > 0) {
      const selectedSubCategory = allSubcategories.find(
        (inst) => inst.subcategory_name === subcategory.name
      );
      console.log(selectedSubCategory)
      if (selectedSubCategory) {
        subcategoryIdRef.current = selectedSubCategory.subcategory_id;
        console.log(subcategoryIdRef.current)
      }
    }
  }, [allCategories, allSubcategories, subcategory]);

  const handleSubmit = () => {
    if (title.length === 0) {
      toast("Оп, май пропусна заглавие");
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
      toast("Оп, май пропусна описание");
      return;
    }
    //check if the flashcards are not empty
    if (flashcards.length === 0) {
      toast("Поне една карта трябва да се въведе");
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

    console.log(subcategoryIdRef.current)
    //check if the tags are not empty
    instance
      .put(`/sets/${id}`, {
        set_name: title,
        set_description: description,
        flashcards: flashcards,
        set_category: category.id ? category.id : categoryIdRef.current,
        set_subcategory: subcategoryIdRef.current,
      })
      .then((response) => {
        toast("Редакцията е готова");
        // navigate("/app/set/" + id);
        window.scrollTo(0, 0);
      })
      .catch((error) => {
        toast("Възникна грешка");
      });
  };

  const search = (query: string) => {
    const url = "http://www.google.com/search?q=" + query;
    window.open(url, "_blank");
  };

  const getSubcategories = (category_id) => {
    instance.get(`/categories/${category_id}/subcategories`).then((response) => {
      setAllSubcategories(response.data.subcategories);
      console.log(response.data.subcategories)
    });
  }

  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  useEffect(() => {
    console.log(category)
    if (category.name && allCategories.length > 0) {
      console.log("inuseeffect")
      const matchingCategory = allCategories.find(
        (cat) => cat.category_name === category.name
      );
      if (matchingCategory) {
        setSelectedCategoryId(matchingCategory.category_id);
      }
    }
  }, [category, allCategories]);
  
  useEffect(() => {
    if (selectedCategoryId) {
      getSubcategories(selectedCategoryId);
    }
  }, [selectedCategoryId]);

  const resetSubcategory = () => {
    setAllSubcategories([]);
  }
  
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
                onChange={(e) => {
                  const selectedCategory = allCategories.find(
                    (cat) => cat.category_id === e.target.value
                  );
                  resetSubcategory();
                  getSubcategories(selectedCategory.category_id);
                  setCategory({
                    name: selectedCategory
                      ? selectedCategory.category_name
                      : "",
                    id: selectedCategory ? selectedCategory.category_id : "",
                  });
                }}
              >
                <option value="">Категория</option>
                {allCategories.map((allCat, index) => (
                  <option
                    key={index}
                    value={allCat.category_id}
                    selected={
                      category && category.name === allCat.category_name
                    }
                  >
                    {allCat.category_name}
                  </option>
                ))}
              </select>

              <select
                onChange={(e) => {
                  console.log(e.target.value)
                  const selectedSubcategory = allSubcategories.find(
                    (cat) => cat.subcategory_id === e.target.value
                  );
                  setSubcategory({
                    name: selectedSubcategory
                      ? selectedSubcategory.subcategory_name
                      : "",
                    id: selectedSubcategory
                      ? selectedSubcategory.subcategory_id
                      : "",
                  });
                }}
              >
                <option value="">Подкатегория</option>
                {allSubcategories.map((allSubc, index) => (
                  <option
                    key={index}
                    value={allSubc.subcategory_id}
                    selected={
                      subcategory && subcategory.name === allSubc.subcategory_name
                    }
                  >
                    {allSubc.subcategory_name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {flashcards.map((flashcard, index) => (
            <div className="flashcardWrapper">
              <div className="buttonWrapper">
                {/* <MdFlip onClick={() => handleFlipAllFlashcards()} /> */}
                <MdDeleteOutline
                  onClick={() => handleDeleteFlashcard(flashcard.flashcard_id)}
                />
                <div>
                  {!isEmpty(flashcard.term) ||
                  !isEmpty(flashcard.definition) ? (
                    <HiOutlineDuplicate
                      onClick={() =>
                        handleDuplicateFlashcard(flashcard.flashcard_id)
                      }
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
                      onClick={() =>
                        handleFlipFlashcard(flashcard.flashcard_id)
                      }
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
                  placeholder={"Термин"}
                  value={flashcard.term}
                  onChange={(value: string) =>
                    handleChangeFlashcard(index, "term", value)
                  }
                />
                <Editor
                  placeholder={"Дефиниция"}
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
            <button
              className="submit"
              onClick={() => setIsModalOpen(!isModalOpen)}
            >
              Импортирай
            </button>
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
        onImport={handleOnImportFlashcards}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
      />
    </Dashboard>
  );
};
