import Quill from "quill";
import ImageResize from "quill-image-resize-module-react";
import ImageCompress from "quill-image-compress";
import katex from "katex";
import "katex/dist/katex.min.css";
import Editor from "./Editor";
window.katex = katex;

Quill.register("modules/imageResize", ImageResize);
Quill.register("modules/imageCompress", ImageCompress);

const CustomUndo = () => (
  <svg viewBox="0 0 18 18">
    <polygon className="ql-fill ql-stroke" points="6 10 4 12 2 10 6 10" />
    <path
      className="ql-stroke"
      d="M8.09,13.91A4.6,4.6,0,0,0,9,14,5,5,0,1,0,4,9"
    />
  </svg>
);

// Redo button icon component for Quill editor
const CustomRedo = () => (
  <svg viewBox="0 0 18 18">
    <polygon className="ql-fill ql-stroke" points="12 10 14 12 16 10 12 10" />
    <path
      className="ql-stroke"
      d="M9.91,13.91A4.6,4.6,0,0,1,9,14a5,5,0,1,1,5-5"
    />
  </svg>
);

// Undo and redo functions for Custom Toolbar
function undoChange() {
  this.quill.history.undo();
}
function redoChange() {
  this.quill.history.redo();
}

// Add sizes to whitelist and register them
const Size = Quill.import("formats/size");
Size.whitelist = ["extra-small", "small", "medium", "large"];
Quill.register(Size, true);

// Add fonts to whitelist and register them
const Font = Quill.import("formats/font");
Font.whitelist = [
  "arial",
  "comic-sans",
  "courier-new",
  "georgia",
  "helvetica",
  "lucida",
  "roboto",
  "times-new-roman",
  "trebuchet",
  "ubuntu",
  "verdana",
  "sans-serif",
];
Quill.register(Font, true);

// Modules object for setting up the Quill editor
export const modules = (id) => ({
  toolbar: {
    container: "#" + id,
    handlers: {
      undo: undoChange,
      redo: redoChange,
    },
  },
  history: {
    delay: 500,
    maxStack: 100,
    userOnly: true,
  },
  imageResize: {
    displaySize: true,
    modules: ["Resize", "DisplaySize", "Toolbar"],
    handleStyles: {
      backgroundColor: "black",
      border: "none",
      color: "white",
      width: "16px",
      height: "16px",
      display: "block",
      opacity: 0.5,
      boxSizing: "border-box",
      transition: "",
      "border-radius": "0px",
      "box-shadow": "0 0 2px black",
    },
    toolbarStyles: {
      backgroundColor: "black",
      border: "none",
      color: "white",
      width: "24px",
      height: "24px",
      display: "block",
      opacity: 0.5,
      boxSizing: "border-box",
      transition: "",
      "border-radius": "0px",
      "box-shadow": "0 0 2px black",
    },
  },
  imageCompress: {
    quality: 0.5, // default
    maxWidth: 800, // default
    maxHeight: 800, // default
    imageType: "image/jpeg", // default
    debug: false,
  },
});

// Formats objects for setting up the Quill editor
export const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "align",
  "strike",
  "script",
  "blockquote",
  "background",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "color",
  "code-block",
  "formula",
  "video",
  "code-block",
  "imageResize",
  "imageCompress",
];

// Quill Toolbar component
export const QuillToolbar = ({ id }) => (
  <div id={id}>
    {Number(window.innerWidth) < Number(innerHeight) ? (
      <div className="ql-formats">
        <button className="ql-bold" />
        <button className="ql-italic" />
        <button className="ql-underline" />
        <button className="ql-formula" />
        <button className="ql-link" />
          <button className="ql-image" />
          <button className="ql-video" />
      </div>
    ) : (
      <>
        <span className="ql-formats">
          {/* <select className="ql-font" defaultValue="arial">
        <option value="arial">Arial</option>
        <option value="comic-sans">Comic Sans</option>
        <option value="courier-new">Courier New</option>
        <option value="georgia">Georgia</option>
        <option value="helvetica">Helvetica</option>
        <option value="lucida">Lucida</option>
        <option value="roboto">Roboto</option>
        <option value="times-new-roman">Times New Roman</option>
        <option value="trebuchet">Trebuchet</option>
        <option value="ubuntu">Ubuntu</option>
        <option value="verdana">Verdana</option>
        <option value="sans-serif">Sans Serif</option>
      </select> */}
          <select className="ql-size" defaultValue="medium">
            <option value="small">Малък</option>
            <option value="medium">Среден</option>
            <option value="large">Голям</option>
          </select>
          {/* <select className="ql-header" defaultValue="3">
        <option value="1">Заглавие</option>
        <option value="2">Подзаглавие</option>
        <option value="3">Нормален</option>
      </select> */}
        </span>
        <span className="ql-formats">
          <button className="ql-bold" />
          <button className="ql-italic" />
          <button className="ql-underline" />
          <button className="ql-strike" />
        </span>
        <span className="ql-formats">
          <button className="ql-list" value="ordered" />
          <button className="ql-list" value="bullet" />
          <button className="ql-indent" value="-1" />
          <button className="ql-indent" value="+1" />
        </span>
        <span className="ql-formats">
          <button className="ql-script" value="super" />
          <button className="ql-script" value="sub" />
          <button className="ql-blockquote" />
          <button className="ql-direction" />
        </span>
        <span className="ql-formats">
          <select className="ql-align" />
          <select className="ql-color" />
          <select className="ql-background" />
        </span>
        <span className="ql-formats">
          <button className="ql-link" />
          <button className="ql-image" />
          <button className="ql-video" />
        </span>
        <span className="ql-formats">
          <button className="ql-formula" />
          <button className="ql-code-block" />
          <button className="ql-clean" />
        </span>
        <span className="ql-formats">
          <button className="ql-undo">
            <CustomUndo />
          </button>
          <button className="ql-redo">
            <CustomRedo />
          </button>
        </span>
      </>
    )}
  </div>
);

export default QuillToolbar;
