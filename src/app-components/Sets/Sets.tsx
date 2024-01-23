import React, { useEffect, useState } from "react";
import { Dashboard } from "../Dashboard/Dashboard";
import SetCard from "../SetCard/SetCard";
import { MoreBtn } from "../MoreBtn/MoreBtn";
import instance from "../../app-utils/axios";
import { jwtDecode } from "jwt-decode";
import { FaPlus } from "react-icons/fa6";

export const Sets: React.FC = () => {
  const [setCards, setSetCards] = useState([]);
  const [recentCards, setRecentCards] = useState(10);
  // const [exploreCards, setExploreCards] = useState(10);
  const [selectSet, setSelectSet] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const token = localStorage.getItem("access_token");
  let userID = null;

  if (token) {
    const decodedToken: any = jwtDecode(token);
    userID = decodedToken.sub;
  }

  useEffect(() => {
    instance
      .get(
        `/users/${userID}/sets?page=${page}&size=20&sort_by_date=false&ascending=true`
      )
      .then((response) => {
        setTotalPages(response.data.total_pages);
        const newCards = [...setCards];
        response.data.sets.forEach((card) => newCards.push(card));
        setSetCards(newCards);
      });
  }, [page]);

  const handleLoadRecent = () => {
    setPage(page + 1);
  };

  const handleMouseEnter = (id: string) => {
    setSelectSet(id);
  };

  const handleMouseLeave = () => {
    setSelectSet(null);
  };

  return (
    <Dashboard>
      <div className="set-wrapper">
        <h2 className="category-title">Моите тестета</h2>
        <div className="sets">
          <div className="add-set set-card">
            <a href={`/create-set`}>
              <FaPlus className="single" />
            </a>
          </div>
          {setCards.map((card) => (
            <SetCard
              key={card.set_id}
              id={card.set_id}
              title={card.set_name}
              description={card.set_description}
              institution={card.organization_name}
              image={"/logo.jpg"}
              creator_name={card.username}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              isSelected={selectSet === card.set_id}
            />
          ))}
        </div>
        {page < totalPages && <MoreBtn onClick={handleLoadRecent} />}
      </div>
    </Dashboard>
  );
};
