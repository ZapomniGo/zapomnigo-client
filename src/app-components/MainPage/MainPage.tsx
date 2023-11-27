// YourMainPage.tsx
import React, { useEffect, useState } from 'react';
import { Dashboard } from '../Dashboard/Dashboard';
import SetCard from '../Dashboard/SetCard';
import { MoreBtn } from '../MoreBtn/MoreBtn';

interface SetCardData {
  id: string;
  title: string;
  description: string;
  institution: string;
  image: string;
  creator_name: string;
  category: string;
}
const mockSetCards: SetCardData[] = [
  {
    id: "card9",
    title: "New Set 1",
    description: "Description of a new set",
    institution: "AUBG",
    image: "src/app-components/Navigation/logo.png",
    creator_name: "Aleks Ivanov",
    category: "explore", 
  },
  {
    id: "card1",
    title: "New Set 1",
    description: "Description of a new set",
    institution: "AUBG",
    image: "src/app-components/Navigation/logo.png",
    creator_name: "Aleks Ivanov",
    category: "recent", 
  },
  {
    id: "card1",
    title: "New Set 1",
    description: "Description of a new set",
    institution: "AUBG",
    image: "src/app-components/Navigation/logo.png",
    creator_name: "Aleks Ivanov",
    category: "recent", 
  },
  {
    id: "card1",
    title: "New Set 1",
    description: "Description of a new set",
    institution: "AUBG",
    image: "src/app-components/Navigation/logo.png",
    creator_name: "Aleks Ivanov",
    category: "recent", 
  },
  {
    id: "card1",
    title: "New Set 1",
    description: "Description of a new set",
    institution: "AUBG",
    image: "src/app-components/Navigation/logo.png",
    creator_name: "Aleks Ivanov",
    category: "recent", 
  },
  {
    id: "card1",
    title: "New Set 1",
    description: "Description of a new set",
    institution: "AUBG",
    image: "src/app-components/Navigation/logo.png",
    creator_name: "Aleks Ivanov",
    category: "recent", 
  },
  {
    id: "card1",
    title: "New Set 1",
    description: "Description of a new set",
    institution: "AUBG",
    image: "src/app-components/Navigation/logo.png",
    creator_name: "Aleks Ivanov",
    category: "recent", 
  },
  {
    id: "card1",
    title: "New Set 1",
    description: "Description of a new set",
    institution: "AUBG",
    image: "src/app-components/Navigation/logo.png",
    creator_name: "Aleks Ivanov",
    category: "recent", 
  },
  {
    id: "card1",
    title: "New Set 1",
    description: "Description of a new set",
    institution: "AUBG",
    image: "src/app-components/Navigation/logo.png",
    creator_name: "Aleks Ivanov",
    category: "recent", 
  },
  {
    id: "card1",
    title: "New Set 1",
    description: "Description of a new set",
    institution: "AUBG",
    image: "src/app-components/Navigation/logo.png",
    creator_name: "Aleks Ivanov",
    category: "recent", 
  },
  {
    id: "card1",
    title: "New Set 1",
    description: "Description of a new set",
    institution: "AUBG",
    image: "src/app-components/Navigation/logo.png",
    creator_name: "Aleks Ivanov",
    category: "recent", 
  },
  {
    id: "card1",
    title: "New Set 1",
    description: "Description of a new set",
    institution: "AUBG",
    image: "src/app-components/Navigation/logo.png",
    creator_name: "Aleks Ivanov",
    category: "recent", 
  },
  {
    id: "card1",
    title: "New Set 1",
    description: "Description of a new set",
    institution: "AUBG",
    image: "src/app-components/Navigation/logo.png",
    creator_name: "Aleks Ivanov",
    category: "recent", 
  },
  {
    id: "card1",
    title: "New Set 1",
    description: "Description of a new set",
    institution: "AUBG",
    image: "src/app-components/Navigation/logo.png",
    creator_name: "Aleks Ivanov",
    category: "recent", 
  },
  {
    id: "card1",
    title: "New Set 1",
    description: "Description of a new set",
    institution: "AUBG",
    image: "src/app-components/Navigation/logo.png",
    creator_name: "Aleks Ivanov",
    category: "recent", 
  },
  
];


const fetchSetCards = (): Promise<SetCardData[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockSetCards);
    }, 10);
  });
};


export const MainPage: React.FC = () => {
  
  const [setCards, setSetCards] = useState<SetCardData[]>([]);
  const [recentCards, setRecentCards] = useState(10);
  const [exploreCards, setExploreCards] = useState(10);
  const [selectSet, setSelectSet] = useState<string | null>(null);

  useEffect(() => {
    fetchSetCards()
      .then((data) => {
        setSetCards(data);
      })
      .catch((error) => {
        console.error("Error fetching set cards:", error);
      });
  }, []);

  const handleLoadRecent = () => {
    setRecentCards((prevRecentCards) => prevRecentCards + 10);
  };

  const handleLoadExplore = () => {
    setExploreCards((prevExploreCards) => prevExploreCards + 10);
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
        <h2 className="category-title">Recent</h2>
        <div className="sets">
          {setCards
            .filter((card) => card.category === 'recent')
            .slice(0, recentCards)
            .map((card) => (
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
        {recentCards < setCards.filter((card) => card.category === 'recent').length && (
          <MoreBtn onClick={handleLoadRecent} />
        )}
      </div>

      <div className="set-wrapper">
        <h2 className="category-title">Explore</h2>
        <div className="sets">
          {setCards
            .filter((card) => card.category === 'explore') 
            .slice(0, exploreCards) 
            .map((card) => (
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
        {exploreCards < setCards.filter((card) => card.category === 'explore').length && (
          <MoreBtn onClick={handleLoadExplore} />
        )}
      </div>
  </Dashboard>
  );
};

