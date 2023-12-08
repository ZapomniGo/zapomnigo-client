import Dashboard from "../Dashboard/Dashboard";
import { Flashcard } from "./Flashcard";
import { useState, useEffect } from "react";
import { MdContentCopy } from "react-icons/md";
import { FaRegLightbulb } from "react-icons/fa";
import { RiPencilLine } from "react-icons/ri";
import { FiShare2 } from "react-icons/fi";
import { PiExport } from "react-icons/pi";




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
  description: "A set of flashcards for learning purposes",
  creator_name: "John Doe",
  institution: "AUBG",
  category: "Science",
  flashcards: [
    {
      id: "1",
      term: "Term 1",
      description: "Description 1kj hbaoihans ino;is afhao;s hgnfakljgbhkjshkjaddkhshbkjs dhou hiu hgasiuhba iks",
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
            <>
                {setFlashcards ? (
                <div id="set-page">
                    <div className="set-info">
                      <div className="set-title">
                        <h1>{setFlashcards.title}</h1>
                        <div className="institution">
                          <a href="#">{setFlashcards.institution}</a>
                        </div>
                      </div>
                      <p className="description">{setFlashcards.description}</p>
                      <p className="category">{setFlashcards.category}</p>
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
                      <p className="creator">Created by {setFlashcards.creator_name}</p>
                    </div>
                    <div className="cards-info">
                      <h2>Terms in this set ({setFlashcards.flashcards.length})</h2>
                      {setFlashcards.flashcards.map((flashcard) => (
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