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

const Editor = () => {
  
const [value, setValue] = useState('');
  return (
    <div className="text-editor">
    <EditorToolbar />
    <ReactQuill
      theme="snow"
      value={value}
      onChange={е => setValue(е)}
      placeholder={"Write something awesome..."}
      modules={modules}
      formats={formats}
    />
  </div>
    );
}

export default Editor