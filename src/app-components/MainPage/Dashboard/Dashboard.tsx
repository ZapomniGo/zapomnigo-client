import React, { useState, useEffect } from "react";
import SetCard from "./SetCard";

interface SetCardData {
  id: string;
  title: string;
  description: string;
  institution: string;
}

// Mock data for testing purposes
const mockSetCards: SetCardData[] = [
  {
    id: "card1",
    title: "COS2001 C++",
    description: "Description of this set of cards and it informs us about fds course",
    institution: "American University in Bulgaria"
  },
  {
    id: "card2",
    title: "Another Set",
    description: "Description of another set of cards",
    institution: "Some Institution"
  },
];

const fetchSetCards = (): Promise<SetCardData[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockSetCards);
    }, 10);
  });
};

export const Dashboard: React.FC<{ sidebarOpen: boolean }> = ({ sidebarOpen }) => {
  const [selectSet, setSelectSet] = useState<string | null>(null);
  const [setCards, setSetCards] = useState<SetCardData[]>([]);

  useEffect(() => {
    fetchSetCards()
      .then((data) => {
        setSetCards(data);
      })
      .catch((error) => {
        console.error("Error fetching set cards:", error);
      });
  }, []);

  const handleMouseEnter = (id: string) => {
    setSelectSet(id);
  };

  const handleMouseLeave = () => {
    setSelectSet(null);
  };

  return (
    <section className={`home ${sidebarOpen ? "open" : "closed"}`}>
      <div className="recent">
        <h2 className="recent-title">Recent</h2>
        <div className="recent-sets">
          {setCards.map((card) => (
            <SetCard
              key={card.id}
              id={card.id}
              title={card.title}
              description={card.description}
              institution={card.institution}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              isSelected={selectSet === card.id}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
