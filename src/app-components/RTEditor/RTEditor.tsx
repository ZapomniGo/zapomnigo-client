import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { AutoFocusPlugin } from "./custom-plugins/AutoFocusPlugin";
import { initialTheme } from "./theme";
import ToolbarPlugin from "./custom-plugins/ToolbarPlugin";

export const RTEditor = () => {
  const initalConfig = {
    namespace: "RTEditor",
    theme: initialTheme,
    onError: (error: Error) => {
      console.error(error);
    },
  };

  return (
    <LexicalComposer initialConfig={initalConfig}>
      <div className="editor">
        <ToolbarPlugin />
        <div className="editor__inner">
          <RichTextPlugin
            contentEditable={<ContentEditable className="editor__input" />}
            placeholder={
              <div className="editor__placeholder">Enter some text...</div>
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
          <OnChangePlugin
            onChange={(editorState) => {
              console.log(editorState);
            }}
          />
          <HistoryPlugin />
          <AutoFocusPlugin />
        </div>
      </div>
    </LexicalComposer>
  );
};
