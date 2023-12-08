import Dashboard from "../Dashboard/Dashboard";
import { Flashcard } from "./Flashcard";
import { useState, useEffect } from "react";

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
    image: string;
  }

const myFlashcardSet: FlashcardSet = {
  id: "123",
  title: "My Flashcard Set",
  description: "A set of flashcards for learning purposes",
  creator_name: "John Doe",
  institution: "AUBG",
  category: "Science",
  flashcards: [
    {
      id: "1",
      term: "Term 1",
      description: "Description 1",
      image: "image_url_1",
    },
    {
      id: "2",
      term: "Term 2",
      description: "Description 2",
      image: "image_url_2",
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
    const [setFlashcards, setSetFlashcards] = useState<FlashcardSet>();


    useEffect(() => {
        fetchSetFlashcards()
          .then((data) => {
            setSetFlashcards(data);
          })
          .catch((error) => {
            console.error("Error fetching set cards:", error);
          });
      }, []);


    return(



        <Dashboard>
            <div id="set-page">
                {setFlashcards ? (
                <>
                    <div className="set-info">
                      <div className="set-title">
                        <h1>{setFlashcards.title}</h1>
                        <div className="institution">
                          <a href="#">{setFlashcards.institution}</a>
                        </div>
                      </div>
                      <p className="description">{setFlashcards.description}</p>
                      <p className="category">{setFlashcards.category}</p>
                      <p className="creator">{setFlashcards.creator_name}</p>
                    </div>
                </>
                ) : (
                <p>Loading...</p>
                )}
            </div>
        </Dashboard>
    )
}