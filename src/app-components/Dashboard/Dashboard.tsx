import React, { useState, useEffect } from "react";
import SetCard from "./SetCard";
import { useAppSelector } from "../../app-context/store";

interface SetCardData {
  id: string;
  title: string;
  description: string;
  institution: string;
  image: string;
  creator_name: string;
}

// Mock data for testing purposes
// To do:create 5 pictures and randomly assign them to newly created users
const mockSetCards: SetCardData[] = [
  {
    id: "card1",
    title: "COS2001 C++",
    description: "Description of this set of cards and it informs us about fds course",
    institution: "AUBG",
    image: "src/app-components/Navigation/logo.png",
    creator_name: "Aleks Ivanov"
  },
  {
    id: "card2",
    title: "COS2001 C++",
    description: "Description of this set of cards and it informs us about fds course",
    institution: "AUBG",
    image: "src/app-components/Navigation/logo.png",
    creator_name: "Aleks Ivanov"
  },
  {
    id: "card3",
    title: "COS2001 C++",
    description: "Description of this set of cards and it informs us about fds course",
    institution: "AUBG",
    image: "src/app-components/Navigation/logo.png",
    creator_name: "Aleks Ivanov"
  },
  {
    id: "card4",
    title: "COS2001 C++",
    description: "Description of this set of cards and it informs us about fds course",
    institution: "AUBG",
    image: "src/app-components/Navigation/logo.png",
    creator_name: "Aleks Ivanov"
  },
  {
    id: "card5",
    title: "COS2001 C++",
    description: "Description of this set of cards and it informs us about fds course",
    institution: "AUBG",
    image: "src/app-components/Navigation/logo.png",
    creator_name: "Aleks Ivanov"
  },
  {
    id: "card6",
    title: "COS2001 C++",
    description: "Description of this set of cards and it informs us about fds course",
    institution: "AUBG",
    image: "src/app-components/Navigation/logo.png",
    creator_name: "Aleks Ivanov"
  },
  {
    id: "card7",
    title: "COS2001 C++",
    description: "Description of this set of cards and it informs us about fds course",
    institution: "AUBG",
    image: "src/app-components/Navigation/logo.png",
    creator_name: "Aleks Ivanov"
  },
  {
    id: "card8",
    title: "COS2001 C++",
    description: "Description of this set of cards and it informs us about fds course",
    institution: "AUBG",
    image: "src/app-components/Navigation/logo.png",
    creator_name: "Aleks Ivanov"
  },
  {
    id: "card1",
    title: "COS2001 C++",
    description: "Description of this set of cards and it informs us about fds course",
    institution: "AUBG",
    image: "src/app-components/Navigation/logo.png",
    creator_name: "Aleks Ivanov"
  },
  {
    id: "card1",
    title: "COS2001 C++",
    description: "Description of this set of cards and it informs us about fds course",
    institution: "AUBG",
    image: "src/app-components/Navigation/logo.png",
    creator_name: "Aleks Ivanov"
  },
  {
    id: "card1",
    title: "COS2001 C++",
    description: "Description of this set of cards and it informs us about fds course",
    institution: "AUBG",
    image: "src/app-components/Navigation/logo.png",
    creator_name: "Aleks Ivanov"
  },
  {
    id: "card1",
    title: "COS2001 C++",
    description: "Description of this set of cards and it informs us about fds course",
    institution: "AUBG",
    image: "src/app-components/Navigation/logo.png",
    creator_name: "Aleks Ivanov"
  },
  {
    id: "card1",
    title: "COS2001 C++",
    description: "Description of this set of cards and it informs us about fds course",
    institution: "AUBG",
    image: "src/app-components/Navigation/logo.png",
    creator_name: "Aleks Ivanov"
  },
  {
    id: "card1",
    title: "COS2001 C++",
    description: "Description of this set of cards and it informs us about fds course",
    institution: "AUBG",
    image: "src/app-components/Navigation/logo.png",
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


export const Dashboard = () => {
  const [selectSet, setSelectSet] = useState<string | null>(null);
  const [setCards, setSetCards] = useState<SetCardData[]>([]);
  const navigationSliceManager = useAppSelector((state) => state.navigationReducer);

  console.log(navigationSliceManager.open)

  useEffect(() => {
    fetchSetCards()
      .then((data) => {
        setSetCards(data);
      })
      .catch((error) => {
        console.error("Error fetching set cards:", error);
      });
  }, []);


  useEffect(() => {
    // Add/remove 'no-scroll' class to the body based on navigationSliceManager.open
    if (navigationSliceManager.open) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    // Clean up the effect
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [navigationSliceManager.open]);

  const handleMouseEnter = (id: string) => {
    setSelectSet(id);
  };

  const handleMouseLeave = () => {
    setSelectSet(null);
  };

  return (
    <section className={`home ${navigationSliceManager.open ? "open" : "close"}`}>
      {/* To do: talk about new section and decide if we need it and if yes develop pictures*/}
     {/* <div className="news">
        <div className="test"></div>
        <div className="test"></div>
        <div className="test"></div>
      </div> */}
      <div className="category">
        <div className="recent">
          <h2 className="category-title">Recent</h2>
          <div className="sets">
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
        <div className="recent">
          <h2 className="category-title">Explore</h2>
          <div className="sets">
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
