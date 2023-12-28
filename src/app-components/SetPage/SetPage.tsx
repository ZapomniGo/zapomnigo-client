import Dashboard from "../Dashboard/Dashboard";
import { Flashcard } from "./Flashcard";
import { useState, useEffect } from "react";
import { MdContentCopy } from "react-icons/md";
import { FaRegLightbulb } from "react-icons/fa";
import { RiPencilLine } from "react-icons/ri";
import { FiShare2 } from "react-icons/fi";
import { PiExport } from "react-icons/pi";


//adapted for separate img tags but not used at the moment

interface FlashcardSet {
    id: string;
    title: string;
    description: string;
    creator_name: string;
    institution: string;
    category: string;
    flashcards: Flashcard[];
  }
  
  interface Flashcard {
    id: string;
    term: string;
    description: string;
    image?: string;
  }

const myFlashcardSet: FlashcardSet = {
  id: "123",
  title: "My Flashcard Set",
  description: "A set of flashcards for learning purposeskjadgh ljb kjasbfkjb fjkasb fkjbakjfbkj basfbasf earning purposeskjadgh ljb kjasbfkjb fjkasb fkjbakjfbkj basfbasf ujb kjas",
  creator_name: "John Doe",
  institution: "AUBG",
  category: "Science",
  flashcards: [
    {
      id: "1",
      term: "<p>Term 1</p>",
      description: "<p>Description 1kj hbaoihans ino;is afhao;s hgnfakljgbhkjshkjaddkhshbkjs dhou hiu hgasiuhba iks</p>",
    },
    {
      id: "2",
      term: "<p>Term 2 p;ijn ioasfi oansfoikia slkfna .k,nfa;s nfaslk nfl;kas nflkasn flka nsflkan </p>",
      description: "<p>Description 2 loremkjlasnf ljasfnb lorem fijasbk alskhd ans;ld ;kjbjkasb </p>",
      // image: "src/app-components/SetPage/test.jpg",
    },
    {
      id: "3",
      term: "<p>Term 2</p>",
      description: "<p>Description 2</p>",
    },
    {
      id: "4",
      term: "<p>Term 2</p>",
      description: "<p>Description 2 loremkjlasnf ljasfnb lorem fijasbk alskhd ans;ld ;kjbjkasb </p>",
      // image: "src/app-components/SetPage/test2.jpg",
    },
  ],
};


const fetchSetFlashcards = (): Promise<FlashcardSet> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(myFlashcardSet);
      }, 10);
    });
  };



export const SetPage = () => {
    const [flashcards, setFlashcards] = useState<FlashcardSet>();
    const [sortingOrder, setSortingOrder] = useState<string>("");

    const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      setSortingOrder(event.target.value);
    };

    const sortedFlashcards = flashcards?.flashcards.slice().sort((a, b) => {
      if (sortingOrder === "a-z") {
        return a.term.localeCompare(b.term);
      } else if (sortingOrder === "z-a") {
        return b.term.localeCompare(a.term);
      }
      return 0;
    });

    useEffect(() => {
        fetchSetFlashcards()
          .then((data) => {
            setFlashcards(data);
          })
          .catch((error) => {
            console.error("Error fetching set cards:", error);
          });
      }, []);


    return(
        <Dashboard>
          <>
            {flashcards ? (
            <div id="set-page">
                <div className="set-info">
                  <div className="set-title">
                    <h1>{flashcards.title}</h1>
                    <div className="institution">
                      <a href="#">{flashcards.institution}</a>
                    </div>
                  </div>
                  <p className="description">{flashcards.description}</p>
                  <p className="category">{flashcards.category}</p>
                  <div className="actions">
                    <a href="#" className="rotate">
                      <MdContentCopy />
                      Review
                    </a>
                    <a href="#">
                      <FaRegLightbulb />
                      Learn
                    </a>
                    <a href="#">
                      <RiPencilLine />
                      Edit
                    </a>
                    <a href="#">
                      <FiShare2 />
                      Share
                    </a>
                    <a href="#">
                      <PiExport />
                      Export
                    </a>
                  </div>
                  <p className="creator">Created by {flashcards.creator_name}</p>
                </div>
                <div className="cards-info">
                  <div className="cards-info-header">
                    <h2>Terms in this set ({flashcards.flashcards.length})</h2>
                    <select onChange={handleFilterChange}>
                      <option value="">Default</option>
                      <option value="a-z">Alphabetical(A-Z)</option>
                      <option value="z-a">Alphabetical(Z-A)</option>
                    </select>
                  </div>
                  
                  {sortedFlashcards?.map((flashcard) => (
              <Flashcard key={flashcard.id} flashcard={flashcard} />
            ))}
                </div>

            </div>
            ) : (
            <p>Loading...</p>
            )}
          </>
        </Dashboard>
    )
}