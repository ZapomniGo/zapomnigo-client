//to do: Fix select deselect set
import Dashboard from "../Dashboard/Dashboard";
import instance from "../../app-utils/axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { SelectSet } from "./SelectSet";
import { useNavigate } from "react-router-dom";
import { MoreBtn } from "../MoreBtn/MoreBtn";
import { jwtDecode } from "jwt-decode";

export const CreateFolder = () => {
  const navigate = useNavigate();
  const showToast = (message, id) => {
    if (!toast.isActive(id)) {
      toast(message, {
        toastId: id,
      });
    }
  };

  interface Set {
    id: number;
  }

  const [allCategories, setAllCategories] = useState([]);
  // const [allInstitutions, setAllInstitutions] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [allSubcategories, setAllSubcategories] = useState([]);
  const [subcategory, setSubcategory] = useState({ name: "", id: "" });
  const [user, setUser] = useState("");

  const [folder, setFolder] = useState<{
    folder_title: string;
    folder_description: string;
    sets: Set[];
    subcategory_id: string;
    category_id: string;
  }>({
    folder_title: "",
    folder_description: "",
    sets: [],
    subcategory_id: "",
    category_id: "",
  });
  const [setCards, setSetCards] = useState([]);
  const [createdSets, setCreatedSets] = useState([]);

  const [availableSets, setAvailableSets] = useState({});
  useEffect(() => {
    document.title = "Създай папка | ЗапомниГо";
  }, []);
  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      const decodedToken = jwtDecode(localStorage.getItem("access_token"));
      const userID = decodedToken.sub;
      setUser(userID);
      instance
        .get(
          `/users/${userID}/sets?page=1&size=20&sort_by_date=true&ascending=false`
        )
        .then((response) => {
          setCreatedSets(response.data.sets);
          setTotalCeatedSetPages(response.data.total_pages);
        });
    }
    instance
      .get(
        `/sets?page=1&size=20&sort_by_date=false&ascending=true&category_id=`
      )
      .then((response) => {
        setSetCards(response.data.sets);
        setTotalAllSetPages(response.data.total_pages);
      });

    instance.get("/categories").then((response) => {
      setAllCategories(response.data.categories);
    });
  }, []);

  const handleChangeFolder = (key: string, value: string) => {
    setFolder((prevState) => ({ ...prevState, [key]: value }));
  };

  const handleSubmitFolder = () => {
    // Map over sets and return only the set_id
    const selectedSetIds = folder.sets.map((set) => set.set_id.toString());
    // Use selectedSetIds when making your request
    const folderToSubmit = { ...folder, sets: selectedSetIds };

    if (folderToSubmit.folder_title.length === 0) {
      showToast("Оп, май пропусна заглавие", 1);
      return;
    }
    if (folderToSubmit.folder_title.length > 100) {
      showToast("Заглавието трябва да е под 100 символа", 2);
      return;
    }
    if (folderToSubmit.folder_title.length > 1000) {
      showToast("Описанието трябва да е под 1000 символа", 3);
      return;
    }

    instance
      .post("/folders", folderToSubmit)
      .then((response) => {
        showToast("Добре дошъл в новата си папка", 4);
        navigate("/app/folder/" + response.data.folder_id);
        setTimeout(() => {
          window.scrollTo(0, 0);
        }, 100);
      })
      .catch((error) => {
        showToast("Възникна грешка", 5);
      });
  };

  const handleSelectSet = (set) => {
    setAvailableSets((prevSets) => ({
      ...prevSets,
      [set.set_id]: false, // Set the availability of the selected set to false
    }));

    setFolder((prevFolder) => ({
      ...prevFolder,
      sets: [...prevFolder.sets, set],
    }));
  };

  // When a set is deselected
  const handleDeselectSet = (set) => {
    setAvailableSets((prevSets) => ({
      ...prevSets,
      [set.set_id]: true, // Set the availability of the deselected set to true
    }));

    setFolder((prevFolder) => ({
      ...prevFolder,
      sets: prevFolder.sets.filter((set) => set.set_id !== set.set_id),
    }));
  };

  const unavailableSetIds = Object.keys(availableSets).filter(
    (id) => availableSets[id] === false
  );
  // const unavailableSets = setCards.filter((set) =>
  //   unavailableSetIds.includes(set.set_id.toString())
  // );
  const unavailableSets = [
    ...createdSets.filter((set) =>
      unavailableSetIds.includes(set.set_id.toString())
    ),
    ...setCards.filter((set) =>
      unavailableSetIds.includes(set.set_id.toString())
    ),
  ];

  const changeSubcategories = (category_id: string) => {
    instance
      .get(`/categories/${category_id}/subcategories`)
      .then((response) => {
        setSubcategories(response.data.subcategories);
      });
  };
  const [pageSetAll, setPageSetAll] = useState(1);
  const [totalAllSetPages, setTotalAllSetPages] = useState(1);
  const [pageSetCreated, setPageSetCreated] = useState(1);
  const [totalCreatedSetPages, setTotalCeatedSetPages] = useState(1);

  const handleLoadAllSets = () => {
    const newPageSet = pageSetAll + 1;
    setPageSetAll(newPageSet);
    instance
      .get(
        `/sets?page=${newPageSet}&size=20&sort_by_date=false&ascending=true&category_id=`
      )
      .then((response) => {
        setTotalAllSetPages(response.data.total_pages);
        const newCards = [...setCards];
        response.data.sets.forEach((card) => newCards.push(card));
        setSetCards(newCards);
      });
  };

  const handleLoadCreatedSets = () => {
    const newPageSet = pageSetCreated + 1;
    setPageSetCreated(newPageSet);
    instance
      .get(
        `/users/${user}/sets?page=${newPageSet}&size=20&sort_by_date=true&ascending=false`
      )
      .then((response) => {
        setTotalCeatedSetPages(response.data.total_pages);
        const newCards = [...createdSets];
        response.data.sets.forEach((card) => newCards.push(card));
        setCreatedSets(newCards);
      });
  };

  const resetSubcategory = () => {
    setSubcategories([]);
  };

  return (
    <Dashboard>
      <div className="create-set-wrapper">
        <div className="create-set">
          <h1>Създай папка</h1>
          <input
            type="text"
            onChange={(e) => handleChangeFolder("folder_title", e.target.value)}
            placeholder="Заглавие"
            className="title"
            minLength={1}
            maxLength={100}
          />
          <div className="other-info">
            <div className="description">
              <textarea
                onChange={(e) =>
                  handleChangeFolder("folder_description", e.target.value)
                }
                placeholder="Описание"
              />
            </div>
            <div className="tags">
              <select
                onChange={(e) => {
                  handleChangeFolder("category_id", e.target.value);
                  changeSubcategories(e.target.value);
                  resetSubcategory();
                }}
                defaultValue={""}
                id="categories"
                name="categories"
              >
                <option value="">Без категория</option>
                {allCategories.map((category, index) => (
                  <option key={index} value={category.category_id}>
                    {category.category_name}
                  </option>
                ))}
              </select>
              <select
                onChange={(e) => {
                  handleChangeFolder("subcategory_id", e.target.value);
                }}
                defaultValue=""
                id="subcategory"
                name="subcategory"
              >
                <option value="">Без подкатегория</option>
                {subcategories.map((subcategory, index) => (
                  <option key={index} value={subcategory.subcategory_id}>
                    {subcategory.subcategory_name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {unavailableSets.length > 0 && <h1>Избрани тестета</h1>}
          <div className="test">
            <div className="sets-wrapper">
              {unavailableSets.map((card) => (
                <SelectSet
                  key={card.set_id}
                  id={card.set_id}
                  title={card.set_name}
                  description={card.set_description}
                  institution={card.organization_name}
                  image={"/logo.jpg"}
                  creator_name={card.username}
                  isAvb={availableSets[card.set_id] !== false}
                  onSelectSet={() => handleSelectSet(card)}
                  onDeselectSet={() => handleDeselectSet(card)}
                  chosen={true}
                />
              ))}
              {unavailableSets.length >= 1 && (
                <div className="submition">
                  <button onClick={handleSubmitFolder}>Създай папка</button>
                </div>
              )}
            </div>
          </div>

          {createdSets.length >= 1 && <h1>Мой тестета</h1>}
          <div className="sets-wrapper">
            {createdSets
              .filter((card) => availableSets[card.set_id] !== false)
              .map((card: any) => (
                <SelectSet
                  key={card.set_id}
                  id={card.set_id}
                  title={card.set_name}
                  description={card.set_description}
                  institution={card.organization_name}
                  image={"/logo.jpg"}
                  creator_name={card.username}
                  isAvb={availableSets[card.set_id] !== false}
                  onSelectSet={() => handleSelectSet(card)}
                  onDeselectSet={() => handleDeselectSet(card)}
                />
              ))}
          </div>
          {pageSetCreated < totalCreatedSetPages && setCards.length > 0 && (
            <MoreBtn onClick={() => handleLoadCreatedSets()} />
          )}

          {setCards.length >= 1 && <h1>Други тестета</h1>}
          <div className="sets-wrapper">
            {setCards
              .filter((card) => availableSets[card.set_id] !== false)
              .map((card: any) => (
                <SelectSet
                  key={card.set_id}
                  id={card.set_id}
                  title={card.set_name}
                  description={card.set_description}
                  institution={card.organization_name}
                  image={"/logo.jpg"}
                  creator_name={card.username}
                  isAvb={availableSets[card.set_id] !== false}
                  onSelectSet={() => handleSelectSet(card)}
                  onDeselectSet={() => handleDeselectSet(card)}
                />
              ))}
          </div>
          {pageSetAll < totalAllSetPages && setCards.length > 0 && (
            <MoreBtn onClick={() => handleLoadAllSets()} />
          )}
        </div>
      </div>
    </Dashboard>
  );
};
