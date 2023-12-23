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

const Editor = ({ value, onChange }) => {
  const [id, setId] = useState(`toolbar-${Date.now()}`);

  return (
    <div className="text-editor">
      <EditorToolbar id={id} />
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        placeholder={"Write something awesome..."}
        modules={modules(id)}
        formats={formats}
      />
    </div>
  );
}


export default Editor