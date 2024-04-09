//to do: Fix select deselect set
import Dashboard from "../Dashboard/Dashboard";
import instance from "../../app-utils/axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { SelectSet } from "../CreateFolder/SelectSet";
import { useParams } from "react-router-dom";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { MoreBtn } from "../MoreBtn/MoreBtn";
import { jwtDecode } from "jwt-decode";
export const EditFolder = (props) => {
  const navigate = useNavigate();
  const [myFolders, setMyFolders] = useState([]);

  //getting the token from main and checking if its null
  useEffect(() => {
    console.log(props.token);
    if (props.token === null) {
      navigate("/app/login");
    }
  }, [props.token]);

  useEffect(() => {
    instance
      .get(
        `/users/${props.token.sub}/sets?page=1&size=20&sort_by_date=true&ascending=false`
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Dashboard>
      {/* <div className="create-set-wrapper">
        <div className="create-set">
          <h1>Редактирай папка</h1>
          <input
            type="text"
            value={folder.folder_title}
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
                value={folder.folder_description}
              />
            </div>
            <div className="tags">
              <select
                onChange={(e) => {
                  const selectedCategory = allCategories.find(
                    (cat) => cat.category_id === e.target.value
                  );
                  setCategory({
                    name: selectedCategory
                      ? selectedCategory.category_name
                      : "",
                    id: selectedCategory ? selectedCategory.category_id : "",
                  });
                  resetSubcategory();
                  getSubcategories(selectedCategory.category_id);
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
                <option value="">Без подкатекогия</option>
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
          {setCards.length >= 1 && <h1>Избрани тестета</h1>}
          <div className="sets-wrapper">
            {setCards.map((card) => (
              <SelectSet
                key={card.set_id}
                id={card.set_id}
                title={card.set_name}
                description={card.set_description}
                institution={card.subcategory_name}
                image={"/logo.jpg"}
                creator_name={card.username}
                isAvb={false}
                onSelectSet={() => handleSelectSet(card)}
                onDeselectSet={() => handleDeselectSet(card)}
                chosen={true}
              />
            ))}
            {setCards.length >= 1 && (
              <div className="submition">
                <button onClick={handleSubmitFolder}>Редактирай папка</button>
              </div>
            )}
          </div>

          {uniqueCreatedSets.length >= 1 && <h1>Мой тестета</h1>}
          <div className="sets-wrapper">
            {uniqueCreatedSets.map((card) => (
              <SelectSet
                key={card.set_id}
                id={card.set_id}
                title={card.set_name}
                description={card.set_description}
                institution={card.subcategory_name}
                image={"/logo.jpg"}
                creator_name={card.username}
                isAvb={true}
                onSelectSet={() => handleSelectSet(card)}
                onDeselectSet={() => handleDeselectSet(card)}
              />
            ))}
          </div>
          {pageSetCreated < totalCreatedSetPages && createdSets.length > 0 && (
            <MoreBtn onClick={() => handleLoadCreatedRecentSet()} />
          )}

          {uniqueAllSets.length >= 1 && <h1>Други тестета</h1>}
          <div className="sets-wrapper">
            {uniqueAllSets.map((card) => (
              <SelectSet
                key={card.set_id}
                id={card.set_id}
                title={card.set_name}
                description={card.set_description}
                institution={card.subcategory_name}
                image={"/logo.jpg"}
                creator_name={card.username}
                isAvb={true}
                onSelectSet={() => handleSelectSet(card)}
                onDeselectSet={() => handleDeselectSet(card)}
              />
            ))}
          </div>
          {pageAllSet < totalAllSetPages && setCards.length > 0 && (
            <MoreBtn onClick={() => handleLoadAllRecentSet()} />
          )}
        </div>
      </div> */}
    </Dashboard>
  );
};
