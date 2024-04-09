//to do: Fix select deselect set
import Dashboard from "../Dashboard/Dashboard";
import instance from "../../app-utils/axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MoreBtn } from "../MoreBtn/MoreBtn";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { SelectSet } from "../CreateFolder/SelectSet";

export const EditFolder = (props) => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [filteredMySets, setFilteredMySets] = useState([]);
  const [filteredAllSets, setFilteredAllSets] = useState([]);
  const [filteredSelectedSets, setFilteredSelectedSets] = useState([]);
  const [shownMySets, setShownMySets] = useState([]);
  const [shownAllSets, setShownAllSets] = useState([]);
  const [totalMySetsPages, setTotalMySetsPages] = useState(1);
  const [totalAllSetsPages, setTotalAllSetsPages] = useState(1);
  const [currentPageMySets, setCurrentPageMySets] = useState(1);
  const [currentPageAllSets, setCurrentPageAllSets] = useState(1);

  //getting the token from main and checking if its null
  useEffect(() => {
    if (props.token === null) {
      navigate("/app/login");
    }
  }, [props.token]);

  //funcs for fetching sets
  const fetchMySets = async ({ currentPage = 1 }) => {
    const res = await instance.get(
      `/users/${props.token.sub}/sets?page=${currentPage}&size=5&sort_by_date=true&ascending=false`
    );
    return res.data;
  };

  const fetchAllSets = async ({ currentPage = 1 }) => {
    const res = await instance.get(
      `/sets?page=${currentPage}&size=40&sort_by_date=true&ascending=false`
    );
    setTotalAllSetsPages(res.data.total_pages);
    return res.data;
  };

  const fetchSelectedSets = async () => {
    const res = await instance.get(`/folders/${id}/sets?page=1&size=20`);
    setTotalMySetsPages(res.data.total_pages);

    return res.data;
  };

  const {
    data: mySets,
    error: errorMySets,
    isLoading: isLoadingMySets,
    refetch: refetchMySets,
  } = useQuery(
    ["mySets", currentPageMySets],
    () => fetchMySets({ currentPage: currentPageMySets }),
    {
      keepPreviousData: true,
    }
  );

  const {
    data: allSets,
    error: errorAllSets,
    isLoading: isLoadingAllSets,
    refetch: refetchAllSets,
  } = useQuery(
    ["allSets", currentPageAllSets],
    () => fetchAllSets({ currentPage: currentPageAllSets }),
    {
      keepPreviousData: true,
    }
  );

  const {
    data: selectedSets,
    error: errorSelectedSets,
    isLoading: isLoadingSelectedSets,
  } = useQuery("selectedSets", fetchSelectedSets);

  //convert fetched data to states
  useEffect(() => {
    if (typeof filteredAllSets === "undefined") {
      setFilteredAllSets(allSets?.sets);
    } else {
      setFilteredAllSets((prevSets) => [...prevSets, ...(allSets?.sets ?? [])]);
    }
    if (typeof filteredMySets === "undefined") {
      setFilteredMySets(mySets?.sets);
    } else {
      setFilteredMySets((prevSets) => [...prevSets, ...(mySets?.sets ?? [])]);
    }
    setFilteredSelectedSets(selectedSets?.sets);
  }, [selectedSets, mySets, allSets]);

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
        (set) => !newMySets.map((set) => set.set_id).includes(set.set_id)
      );

      setShownMySets(newMySets);
      setShownAllSets(newAllSets);
    }
  }, [filteredAllSets, filteredMySets, filteredSelectedSets]);

  const handleSelectSet = async (set, setType) => {
    if (setType === "mySet") {
      setFilteredSelectedSets((prevState) => [...prevState, set]);
      setFilteredMySets((prev) => prev.filter((s) => s.set_id !== set.set_id));
    }
    if (setType === "allSet") {
      setFilteredSelectedSets((prevState) => [...prevState, set]);
      setFilteredAllSets((prev) => prev.filter((s) => s.set_id !== set.set_id));
    }
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
      setCurrentPageMySets((prevPage) => prevPage + 1);
      refetchMySets();
    }
    if (setType === "allSet") {
      setCurrentPageAllSets((prevPage) => prevPage + 1);
      refetchAllSets();
    }
  };

  return (
    <Dashboard>
      {isLoadingMySets && <div>Loading...</div>}
      {isLoadingAllSets && <div>Loading...</div>}
      {isLoadingSelectedSets && <div>Loading...</div>}
      {filteredSelectedSets && (
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
            />
          ))}
        </div>
      )}
      <h1>My sets</h1>
      {shownMySets && (
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
          {currentPageMySets < totalMySetsPages && (
            <MoreBtn onClick={() => handleLoadMore("mySet")} />
          )}
        </div>
      )}
      <h1>All sets</h1>
      {shownAllSets && (
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
          {currentPageAllSets < totalAllSetsPages && (
            <MoreBtn onClick={() => handleLoadMore("allSet")} />
          )}
        </div>
      )}
    </Dashboard>
  );
};
