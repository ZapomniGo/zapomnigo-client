import Flashcard from "../app-components/CreateSet/types";
import { toast } from "react-toastify";

const isEmpty = (string: string) => {
  if (!string) return true;
  if (string.length === 0) {
    return true;
  }
  if (
    string.replace(/<[^>]+>/g, "").length === 0 &&
    !(
      string.includes("<img") ||
      string.includes("<video") ||
      string.includes("<audio") ||
      string.includes("<iframe")
    )
  ) {
    return true;
  }
  return false;
};

const submitCheck = (
  title: string,
  description: string,
  flashcards: Flashcard[]
) => {
  const emptyFlashcard = flashcards.find(
    (flashcard) => isEmpty(flashcard.term) || isEmpty(flashcard.definition)
  );

  //check if the title is not empty
  if (title.length === 0) {
    scrollToElement("titleInput");
    toast("Моля въведете заглавие");
    return false;
  }
  if (title.length > 100) {
    scrollToElement("titleInput");
    toast("Заглавието трябва да е под 100 символа");
    return false;
  }
  if (description.length > 1000) {
    scrollToElement("descriptionInput");
    toast("Описанието трябва да е под 1000 символа");
    return false;
  }
  if (description.length === 0) {
    scrollToElement("descriptionInput");
    toast("Моля въведете описание");
    return false;
  }
  //check if the flashcards are not empty
  if (flashcards.length === 0) {
    toast("Моля въведете поне една карта");
    return false;
  }
  //check if the flashcards are not empty
  if (flashcards.length > 3000) {
    toast("Картите трябва да са под 3000");
    return false;
  }
  if (emptyFlashcard) {
    scrollToElement(emptyFlashcard.flashcard_id);

    toast("Моля, попълнете празното поле на флашкартата");
    return false;
  }
  //check if any flashcard has more than 2000 characters
  if (
    flashcards.find(
      (flashcard) =>
        flashcard.term.replace(/<[^>]+>/g, "").length > 10000 ||
        flashcard.definition.replace(/<[^>]+>/g, "").length > 10000
    )
  ) {
    const flashcard = flashcards.find((flashcard) =>
      flashcard.term.replace(/<[^>]+>/g, "").length > 10000 ||
      flashcard.definition.replace(/<[^>]+>/g, "").length > 10000
        ? flashcard.flashcard_id
        : ""
    );
    scrollToElement(flashcard!.flashcard_id);
    toast("Някоя от картите е с поле с повече от 10000 символа");
    return false;
  }

  return true;
};

const scrollToElement = (id: string) => {
  const element = document.getElementById(id);
  const viewportHeight = window.innerHeight;
  const elementHeight = element?.clientHeight;
  const yOffset =
    element!.getBoundingClientRect().top +
    window.scrollY -
    (viewportHeight - elementHeight!) / 2;

  element!.setAttribute("data-border", "red-border");

  window.scrollTo({ top: yOffset, behavior: "smooth" });
};

export { isEmpty, submitCheck, scrollToElement };
