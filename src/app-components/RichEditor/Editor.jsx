
import { useState } from 'react';
import ReactQuill from './index';
import katex from "katex";
import "katex/dist/katex.min.css";

window.katex = katex;

const Editor = ({ onChange, placeholder }) => {
  const [id] = useState(`toolbar-${Date.now()}`);

  return (
    <div className="text-editor">
      <EditorToolbar id={id} />
      <ReactQuill
        theme="snow"
        onChange={onChange}
        placeholder={placeholder ? placeholder : "Напиши нещо яко!"}
        modules={modules(id)}
        formats={formats}
      />
    </div>
  );
}

export default Editor
//import Quill from "quill";
import EditorToolbar from './EditorToolbar'
import { modules, formats } from "./EditorToolbar";

const Editor = ({  onChange, placeholder }) => {
  const [id] = useState(`toolbar-${Date.now()}`);

  return (
    <div className="text-editor">
      <EditorToolbar id={id} />
      <ReactQuill
        theme="snow"
        onChange={onChange}
        placeholder={placeholder ? placeholder : "Напиши нещо яко!"}
        modules={modules(id)}
        formats={formats}
      />
    </div>
  );
}


export default Editor