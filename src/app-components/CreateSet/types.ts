enum FLASHCARD_DIRECTIONS {
  "UP",
  "DOWN",
}

type Flashcard = {
  term: string;
  definition: string;
  rnd: string;
};

export default Flashcard;
export { FLASHCARD_DIRECTIONS };
