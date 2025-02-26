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
import sanitizeSet from "../../app-utils/sanitizeSet";

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
  const [filter, setFilter] = useState("&sort_by_date=true&ascending=true");
  const { id } = useParams<{ id: string }>();

  const showToast = (message, id) => {
    if (!toast.isActive(id)) {
      toast(message, {
        toastId: id,
      });
    }
  };

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
    instance
      .get(`/sets/${id}?size=2000` + filter)
      .then((response) => {
        loadFlashcards(response.data.set.flashcards);
        setTitle(response.data.set.set_name);
        setDescription(response.data.set.set_description || "");
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
    if (string === undefined) {
      return true;
    }
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
    const selectedCategory = allCategories.find(
      (cat) => cat.category_name === category.name
    );
    if (selectedCategory === undefined) {
      categoryIdRef.current = null;
      if (categoryIdRef.current === null) {
        subcategoryIdRef.current = null;
        subcategory.name = null;
      }
    } else {
      categoryIdRef.current = selectedCategory.category_id;
    }

    if (subcategory.name === "") {
      subcategoryIdRef.current = null;
    }

    if (subcategory && subcategory.name && allSubcategories.length > 0) {
      const selectedSubCategory = allSubcategories.find(
        (inst) => inst.subcategory_name === subcategory.name
      );

      if (selectedSubCategory.subcategory_id === "") {
        subcategoryIdRef.current = null;
      } else {
        subcategoryIdRef.current = selectedSubCategory.subcategory_id;
      }
    }
  }, [allCategories, subcategory, category]);

  const handleSubmit = () => {
    if (title.length === 0) {
      showToast("Оп, май пропусна заглавие", 1);
      return;
    }
    if (title.length > 100) {
      showToast("Заглавието трябва да е под 100 символа", 2);
      return;
    }
    if (description.length > 1000) {
      showToast("Описанието трябва да е под 1000 символа", 3);
      return;
    }
    //check if the flashcards are not empty
    if (flashcards.length === 0) {
      showToast("Поне една карта трябва да се въведе", 4);
      return;
    }
    //check if the flashcards are not empty
    if (flashcards.length > 2000) {
      showToast("Картите трябва да са под 2000", 5);
      return;
    }
    //check if each flashcard has a term and a description using isEmpty function
    if (flashcards.find((flashcard) => isEmpty(flashcard.term))) {
      showToast("Някоя от картите няма термин", 6);
      let problematicFlashcard = flashcards.find((flashcard) =>
        isEmpty(flashcard.term)
      );

      document
        .getElementById(problematicFlashcard.flashcard_id)
        .scrollIntoView({
          behavior: "auto",
          block: "center",
          inline: "center",
        });
      return;
    }
    if (flashcards.find((flashcard) => isEmpty(flashcard.definition))) {
      showToast("Някоя от картите няма дефиниция", 7);
      let problematicFlashcard = flashcards.find((flashcard) =>
        isEmpty(flashcard.definition)
      );
      document
        .getElementById(problematicFlashcard.flashcard_id)
        .scrollIntoView({
          behavior: "auto",
          block: "center",
          inline: "center",
        });

      return;
    }
    if (
      flashcards.find(
        (flashcard) =>
          flashcard.term.replace(/<[^>]+>/g, "").length > 10000 ||
          flashcard.definition.replace(/<[^>]+>/g, "").length > 10000
      )
    ) {
      showToast("Някоя от картите е с поле с повече от 10000 символа", 8);
      let problematicFlashcard = flashcards.find(
        (flashcard) =>
          flashcard.term.replace(/<[^>]+>/g, "").length > 10000 ||
          flashcard.definition.replace(/<[^>]+>/g, "").length > 10000
      );
      document
        .getElementById(problematicFlashcard.flashcard_id)
        .scrollIntoView({
          behavior: "auto",
          block: "center",
          inline: "center",
        });
      return;
    }
    let flashcardsFinal = sanitizeSet(flashcards);

    instance
      .put(`/sets/${id}`, {
        set_name: title,
        set_description: description,
        flashcards: flashcardsFinal,
        set_category: category.id ? category.id : categoryIdRef.current,
        set_subcategory: subcategory.id
          ? subcategory.id
          : subcategoryIdRef.current,
      })
      .then((response) => {
        showToast("Редакцията е готова", 9);
        navigate("/app/set/" + id);
        window.scrollTo(0, 0);
      })
      .catch((error) => {
        showToast("Възникна грешка", 10);
      });
  };

  const search = (query: string) => {
    if (query.term === "" && query.definition === "") {
      showToast("Няма термин или дефиниция", 11);
      return;
    }
    const shorterText =
      query.term.length <= query.definition.length
        ? query.term
        : query.definition;
    if (shorterText.length == 0) {
      shorterText =
        query.term.length >= query.definition.length
          ? query.term
          : query.definition;
    }

    if (shorterText.length > 100) {
      showToast("Терминът или дефиницията са прекалено дълги за търсене", 12);
      return;
    }

    if (
      shorterText.includes("<img") ||
      shorterText.includes("<video") ||
      shorterText.includes("<audio") ||
      shorterText.includes("<iframe")
    ) {
      //check if the other text doesn't also contain problematic tags
      const otherText =
        shorterText === query.term ? query.definition : query.term;
      if (
        otherText.includes("<img") ||
        otherText.includes("<video") ||
        otherText.includes("<audio") ||
        otherText.includes("<iframe")
      ) {
        showToast("Търсенето не е възможно", 13);
        return;
      } else {
        const url = "http://www.google.com/search?q=" + convert(otherText);
        window.open(url, "_blank");
        return;
      }
    } else {
      const url = "http://www.google.com/search?q=" + convert(shorterText);
      window.open(url, "_blank");
    }
  };
  const getSubcategories = (category_id) => {
    instance
      .get(`/categories/${category_id}/subcategories`)
      .then((response) => {
        setAllSubcategories(response.data.subcategories);
      });
  };

  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  useEffect(() => {
    if (category.name && allCategories.length > 0) {
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
  useEffect(() => {
    const selectedSubcategory = allSubcategories.find((subcategoryItem) => {
      return subcategoryItem.subcategory_name === subcategory.name;
    });

    if (selectedSubcategory) {
      const selectedSubcategoryId = selectedSubcategory.subcategory_id;
      setSubcategory({ name: subcategory.name, id: selectedSubcategoryId });
    }
  }, [allSubcategories]);

  const resetSubcategory = () => {
    setAllSubcategories([]);
  };

  return (
    <Dashboard>
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

                  {
                    selectedCategory != undefined &&
                      getSubcategories(selectedCategory.category_id);
                  }
                  setCategory({
                    name: selectedCategory
                      ? selectedCategory.category_name
                      : "",
                    id: selectedCategory ? selectedCategory.category_id : "",
                  });
                }}
              >
                <option value="">Без категория</option>
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
                <option value="">Без подкатегория</option>
                {allSubcategories.map((allSubc, index) => (
                  <option
                    key={index}
                    value={allSubc.subcategory_id}
                    selected={
                      subcategory &&
                      subcategory.name === allSubc.subcategory_name
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
                  {!isEmpty(flashcard.term) ||
                  !isEmpty(flashcard.definition) ? (
                    <>
                      <IoSearch onClick={() => search(flashcard)} />
                    </>
                  ) : (
                    ""
                  )}
                </div>
              </div>{" "}
              <div
                key={index}
                className="flashcard"
                id={flashcard.flashcard_id}
              >
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
              className="import"
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
