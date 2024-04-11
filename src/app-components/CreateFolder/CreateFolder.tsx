//to do: Fix select deselect set
import Dashboard from "../Dashboard/Dashboard";
import instance from "../../app-utils/axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MoreBtn } from "../MoreBtn/MoreBtn";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { SelectSet } from "../CreateFolder/SelectSet";
import { useRef } from "react";

export const CreateFolder = (props) => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [filteredMySets, setFilteredMySets] = useState([]);
  const [filteredAllSets, setFilteredAllSets] = useState([]);
  const [filteredSelectedSets, setFilteredSelectedSets] = useState([]);
  const [shownMySets, setShownMySets] = useState([]);
  const [shownAllSets, setShownAllSets] = useState([]);
  const [currentFolder, setCurrentFolder] = useState();
  const [totalMySetsPages, setTotalMySetsPages] = useState(1);
  const [totalAllSetsPages, setTotalAllSetsPages] = useState(1);
  const [mySetsLoadMoreFlag, setMySetsLoadMoreFlag] = useState(false);
  const [allSetsLoadMoreFlag, setAllSetsLoadMoreFlag] = useState(false);
  const currentPageMySetsRef = useRef(1);
  const currentPageAllSetsRef = useRef(1);

  //getting the token from main and checking if its null
  useEffect(() => {
    if (props.token === null) {
      navigate("/app/login");
    }
  }, [props.token]);

  //funcs for fetching sets
  const fetchMySets = async () => {
    const res = await instance.get(
      `/users/${props.token.sub}/sets?page=${currentPageMySetsRef.current}&size=40&sort_by_date=true&ascending=false`
    );
    setTotalMySetsPages(res.data.total_pages);
    return res.data;
  };

  const fetchAllSets = async () => {
    const res = await instance.get(
      `/sets?page=${currentPageAllSetsRef.current}&size=2&sort_by_date=true&ascending=false`
    );
    setTotalAllSetsPages(res.data.total_pages);
    return res.data;
  };

  // const fetchSelectedSets = async () => {
  //   const res = await instance.get(`/folders/${id}/sets?page=1&size=2000`);
  //   return res.data;
  // };

  const {
    data: mySets,
    error: errorMySets,
    isLoading: isLoadingMySets,
    refetch: refetchMySets,
  } = useQuery(["mySets"], () => fetchMySets());

  const {
    data: allSets,
    error: errorAllSets,
    isLoading: isLoadingAllSets,
    refetch: refetchAllSets,
  } = useQuery(["allSets"], () => fetchAllSets());

  // const {
  //   data: selectedSets,
  //   error: errorSelectedSets,
  //   isLoading: isLoadingSelectedSets,
  // } = useQuery("selectedSets", fetchSelectedSets);

  //convert fetched data to states
  useEffect(() => {
    //flag check is required because of rerenders when page loads and starts duplicating sets
    if (!allSetsLoadMoreFlag) {
      setFilteredAllSets(allSets?.sets);
    }
    if (!mySetsLoadMoreFlag) {
      setFilteredMySets(mySets?.sets);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mySets, allSets]);

  //used for copying old sets with the new ones when load more is clicked
  useEffect(() => {
    if (mySetsLoadMoreFlag) {
      setFilteredMySets((prevSets) => [...prevSets, ...(mySets?.sets ?? [])]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mySets]);

  //used for copying old sets with the new ones when load more is clicked
  useEffect(() => {
    if (allSetsLoadMoreFlag) {
      setFilteredAllSets((prevSets) => [...prevSets, ...(allSets?.sets ?? [])]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allSets]);

  //remove already selected sets from mySets and allSets
  useEffect(() => {
    if (filteredSelectedSets && filteredMySets && filteredAllSets) {
      const selectedSetIds = filteredSelectedSets.map((set) => set.set_id);

      const newMySets = filteredMySets.filter(
        (set) => !selectedSetIds.includes(set.set_id)
      );

      let newAllSets = filteredAllSets.filter(
        (set) => !selectedSetIds.includes(set.set_id)
      );
      newAllSets = newAllSets.filter(
        (set) => set.username !== props.token.username
      );

      setShownMySets(newMySets);
      setShownAllSets(newAllSets);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredAllSets, filteredMySets, filteredSelectedSets]);

  const handleSelectSet = async (set, setType) => {
    if (setType === "mySet") {
      setFilteredMySets((prev) => prev.filter((s) => s.set_id !== set.set_id));
    } else if (setType === "allSet") {
      setFilteredAllSets((prev) => prev.filter((s) => s.set_id !== set.set_id));
    }
    setFilteredSelectedSets((prevState) => [...prevState, set]);
  };

  const handleDeselectSet = async (set) => {
    if (props.token.username === set.username) {
      setFilteredMySets((prevState) => [set, ...prevState]);
    } else {
      setFilteredAllSets((prevState) => [set, ...prevState]);
    }
    const newSelectedSets = filteredSelectedSets.filter(
      (s) => s.set_id !== set.set_id
    );
    setFilteredSelectedSets(newSelectedSets);
  };

  const handleLoadMore = async (setType) => {
    if (setType === "mySet") {
      currentPageMySetsRef.current += 1;
      setMySetsLoadMoreFlag(true);
      refetchMySets();
    } else if (setType === "allSet") {
      currentPageAllSetsRef.current += 1;
      setAllSetsLoadMoreFlag(true);
      refetchAllSets();
    }
  };

  const handleChangeFolder = (key: string, value: string) => {
    setCurrentFolder((prevState) => ({ ...prevState, [key]: value }));
  };

  const handleSubmitFolder = async () => {
    const selectedSetsIds = filteredSelectedSets.map((set) => set.set_id);
    const folderToSubmit = {
      folder_title: currentFolder?.folder_title,
      folder_description: currentFolder?.folder_description,
      subcategory_id: null,
      category_id: null,
      sets: selectedSetsIds,
    };

    instance
      .put(`/folders/${id}`, folderToSubmit)
      .then(() => {
        console.log("Добре дошъл в новата си папка", 4);
        // navigate("/app/folder/" + id);
      })
      .catch(() => {
        console.log("Възникна грешка", 5);
      });
  };

  useEffect(() => {
    console.log(filteredSelectedSets);
  }, [filteredSelectedSets]);

  return (
    <Dashboard>
      <div></div>
      <div className="create-set-wrapper">
        <div className="create-set">
          <h1>Редактирай папка</h1>
          <input
            type="text"
            value={currentFolder?.folder_title}
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
                value={currentFolder?.folder_description}
              />
            </div>
            {/* <div className="tags">
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
            </div> */}
          </div>
          {filteredSelectedSets.length >= 1 && <h1>Избрани тестета</h1>}
          <div className="sets-wrapper">
            {filteredSelectedSets.map((set) => (
              <SelectSet
                key={set.set_id}
                id={set.set_id}
                title={set.set_name}
                description={set.set_description}
                institution={set.subcategory_name}
                image={"/logo.jpg"}
                creator_name={set.username}
                isAvb={false}
                onDeselectSet={() => handleDeselectSet(set)}
                chosen={true}
              />
            ))}
            {filteredSelectedSets.length >= 1 && (
              <div className="submition">
                <button onClick={handleSubmitFolder}>Създай папка</button>
              </div>
            )}
          </div>

          {shownMySets.length >= 1 && <h1>Мой тестета</h1>}
          <div className="sets-wrapper">
            {shownMySets.map((set) => (
              <SelectSet
                key={set.set_id}
                id={set.set_id}
                title={set.set_name}
                description={set.set_description}
                institution={set.subcategory_name}
                image={"/logo.jpg"}
                creator_name={set.username}
                isAvb={true}
                onSelectSet={() => handleSelectSet(set, "mySet")}
              />
            ))}
          </div>
          {currentPageMySetsRef.current < totalMySetsPages && (
            <MoreBtn onClick={() => handleLoadMore("mySet")} />
          )}

          {shownAllSets.length >= 1 && <h1>Други тестета</h1>}
          <div className="sets-wrapper">
            {shownAllSets.map((set) => (
              <SelectSet
                key={set.set_id}
                id={set.set_id}
                title={set.set_name}
                description={set.set_description}
                institution={set.subcategory_name}
                image={"/logo.jpg"}
                creator_name={set.username}
                isAvb={true}
                onSelectSet={() => handleSelectSet(set, "allSet")}
              />
            ))}
          </div>
          {currentPageAllSetsRef.current < totalAllSetsPages && (
            <MoreBtn onClick={() => handleLoadMore("allSet")} />
          )}
        </div>
      </div>
    </Dashboard>
  );
};
