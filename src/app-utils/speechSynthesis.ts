import { convert as convertToText } from "html-to-text";




if ("speechSynthesis" in window) {
  console.info("Speech synthesis supported and will be used");
}
const synthesis = window.speechSynthesis;
const speak = (text = "",language="en-US") => {
  if (!synthesis) {
    console.warn("Speech synthesis not supported");
    return;
  }
  if (!text.length) {
    return;
  }
  if (synthesis.speaking) {
    synthesis.cancel();
  }
  if (text.includes("<img" || "<video" || "<span")) {
    return;
  }
  const textToSpeech = new SpeechSynthesisUtterance(text);
  textToSpeech.text = convertToText(text);
  //textToSpeech.lang = language;
  textToSpeech.volume = 1.2;
  textToSpeech.rate = 0.8;
  textToSpeech.pitch = 0.9;
  //    textToSpeech.voice = speechSynthesis.getVoices()[0]; Use this to change voice based on language
  synthesis.speak(textToSpeech);
};
export default speak;
