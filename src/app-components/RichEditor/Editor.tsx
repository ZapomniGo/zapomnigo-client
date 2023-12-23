import React, {useState} from 'react'
import ImageResize from "quill-image-resize-module-react";
import ImageCompress from "quill-image-compress";
import ReactQuill from './index'; 
import katex from "katex";
import "katex/dist/katex.min.css";
window.katex = katex;
import Quill from "quill";


const Editor = () => {
    Quill.register("modules/imageResize", ImageResize);
    Quill.register("modules/imageCompress", ImageCompress);
const [description, setDescription] = useState('')
  return (
    <ReactQuill
    className="sm"
    onChange={(value) => setDescription(value)}
    value={description}
    modules={{
        imageResize: {
            parchment: Quill.import("parchment"),
            modules: ["Resize", "DisplaySize"],
        },
        imageCompress: {
            quality: 0.7, // default
            maxWidth: 1000, // default
            maxHeight: 1000, // default
            imageType: "image/jpeg", // default
            debug: true, // default
        },

      toolbar: [
        [{ header: "1" }, { header: "2" }, { font: [] }],
        [{ size: [] }],
        [
          "bold",
          "italic",
          "underline",
        ],[
          "size",
          "font",
          "blockquote",
          "color",
          "strike",
          "script",
            "background",
            "code-block",
            "direction",
            "align",
            "formula",
            "video"

        ],
        [
          { list: "ordered" },
          { list: "bullet" },
          { indent: "-1" },
          { indent: "+1" },

        ],
        ["link"],
        ["image"],
                
        ["clean"],
      ],
      
    }}
  />  )
}

export default Editor