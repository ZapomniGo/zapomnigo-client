enum FLASHCARD_DIRECTIONS {
  "UP",
  "DOWN",
}

type Flashcard = {
  term: string;
  definition: string;
  rnd: string;
};

type SetInfo = {
  flashcards: Flashcard[];
}


export default Flashcard;
export { FLASHCARD_DIRECTIONS };
