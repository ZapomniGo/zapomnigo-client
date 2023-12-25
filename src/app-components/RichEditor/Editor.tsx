import React, {useState} from 'react'
import ImageResize from "quill-image-resize-module-react";
import ImageCompress from "quill-image-compress";
import ReactQuill from './index'; 
import katex from "katex";
import "katex/dist/katex.min.css";
window.katex = katex;
import Quill from "quill";
import EditorToolbar from './EditorToolbar'
import { modules, formats } from "./EditorToolbar";
import { v4 as uuidv4 } from 'uuid';


const Editor = ({ value, onChange, placeholder }) => {
  // const [id, setId] = useState(`toolbar-${Date.now()}`);
  const [id, setId] = useState(`toolbar-${uuidv4()}`);

  console.log(id)

  return (
    <div className="text-editor">
      <EditorToolbar id={id} />
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        placeholder={placeholder ? placeholder : "Напиши нещо яко!"}
        modules={modules(id)}
        formats={formats}
      />
    </div>
  );
}


export default Editor