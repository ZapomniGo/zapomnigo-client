enum FLASHCARD_DIRECTIONS {
  "UP",
  "DOWN",
}

type Flashcard = {
  term: string;
  definition: string;
  flashcard_id: string;
};

type SetInfo = {
  flashcards: Flashcard[];
}


export default Flashcard;
export { FLASHCARD_DIRECTIONS };
