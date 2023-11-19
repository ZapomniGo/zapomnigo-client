import React, { useState, useEffect } from "react";
import SetCard from "./SetCard";

interface SetCardData {
  id: string;
  title: string;
  description: string;
  institution: string;
  image: string;
  creator_name: string;
}

// Mock data for testing purposes
const mockSetCards: SetCardData[] = [
  {
    id: "card1",
    title: "COS2001 C++",
    description: "Description of this set of cards and it informs us about fds course",
    institution: "AUBG",
    image: "src/app-components/MainPage/Navigation/logo.png",
    creator_name: "Aleks Ivanov"
  },
  {
    id: "card2",
    title: "COS2001 C++",
    description: "Description of this set of cards and it informs us about fds course",
    institution: "AUBG",
    image: "src/app-components/MainPage/Navigation/logo.png",
    creator_name: "Aleks Ivanov"
  },
  {
    id: "card3",
    title: "COS2001 C++",
    description: "Description of this set of cards and it informs us about fds course",
    institution: "AUBG",
    image: "src/app-components/MainPage/Navigation/logo.png",
    creator_name: "Aleks Ivanov"
  },
  {
    id: "card4",
    title: "COS2001 C++",
    description: "Description of this set of cards and it informs us about fds course",
    institution: "AUBG",
    image: "src/app-components/MainPage/Navigation/logo.png",
    creator_name: "Aleks Ivanov"
  },
  {
    id: "card5",
    title: "COS2001 C++",
    description: "Description of this set of cards and it informs us about fds course",
    institution: "AUBG",
    image: "src/app-components/MainPage/Navigation/logo.png",
    creator_name: "Aleks Ivanov"
  },
  {
    id: "card6",
    title: "COS2001 C++",
    description: "Description of this set of cards and it informs us about fds course",
    institution: "AUBG",
    image: "src/app-components/MainPage/Navigation/logo.png",
    creator_name: "Aleks Ivanov"
  },
  {
    id: "card7",
    title: "COS2001 C++",
    description: "Description of this set of cards and it informs us about fds course",
    institution: "AUBG",
    image: "src/app-components/MainPage/Navigation/logo.png",
    creator_name: "Aleks Ivanov"
  },
  {
    id: "card8",
    title: "COS2001 C++",
    description: "Description of this set of cards and it informs us about fds course",
    institution: "AUBG",
    image: "src/app-components/MainPage/Navigation/logo.png",
    creator_name: "Aleks Ivanov"
  },
];

const fetchSetCards = (): Promise<SetCardData[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockSetCards);
    }, 10);
  });
};


export const Dashboard = ({ sidebarOpen }) => {
  const [selectSet, setSelectSet] = useState<string | null>(null);
  const [setCards, setSetCards] = useState<SetCardData[]>([]);

  console.log(sidebarOpen)

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
      <div className="category">
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
                image={card.image}
                creator_name={card.creator_name}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                isSelected={selectSet === card.id}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
