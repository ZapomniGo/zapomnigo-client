
import React, { useEffect, useState } from "react";
import { Dashboard } from "../Dashboard/Dashboard";
import SetCard from "../SetCard/SetCard";
import { MoreBtn } from "../MoreBtn/MoreBtn";
import instance from "../../app-utils/axios";

export const Sets: React.FC = () => {
  const [setCards, setSetCards] = useState([]);
  const [recentCards, setRecentCards] = useState(10);
  // const [exploreCards, setExploreCards] = useState(10);
  const [selectSet, setSelectSet] = useState<string | null>(null);


  useEffect(() => {
    // instance.get(`/users/${userID}/sets`).then((response) => {
    instance.get("/sets").then((response) => {
      console.log(response.data.sets);
      setSetCards(response.data.sets);
    });
  }, []);


  const handleLoadRecent = () => {
    setRecentCards((prevRecentCards) => prevRecentCards + 10);
  };

  // const handleLoadExplore = () => {
  //   setExploreCards((prevExploreCards) => prevExploreCards + 10);
  // };

  const handleMouseEnter = (id: string) => {
    setSelectSet(id);
  };

  const handleMouseLeave = () => {
    setSelectSet(null);
  };

  return (
    <Dashboard>
      <div className="set-wrapper">
        <h2 className="category-title">Разгледай</h2>
        <div className="sets">
          {setCards.map((card) => (
              
              <SetCard
                key={card.set_id}
                id={card.set_id}
                title={card.set_name}
                description={card.set_description}
                institution={card.organization_name}
                image={'src/app-components/Navigation/logo.png'}
                creator_name={card.username}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                isSelected={selectSet === card.set_id}
              />
            ))}
        </div>
        {recentCards <
          setCards.filter((card) => card.category_name === "recent").length && (
          <MoreBtn onClick={handleLoadRecent} />
        )}
      </div>
    </Dashboard>
  );
};
