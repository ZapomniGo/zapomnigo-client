import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { PlainTextPlugin } from "@lexical/react/LexicalPlainTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { $getRoot, $getSelection } from "lexical";
import { EditorState } from "lexical";
import { useEffect } from "react";

const theme = {};

const onError = (error: Error): void => {
  console.error(error);
};

export const RTEditor = () => {
  const initalConfig = {
    namespace: "RTEditor",
    theme,
    onError,
  };

  return (
    <LexicalComposer initialConfig={initalConfig}>
      <PlainTextPlugin
        contentEditable={<ContentEditable />}
        placeholder={<>Enter some text...</>}
        ErrorBoundary={LexicalErrorBoundary}
      />
      <OnChangePlugin
        onChange={(editorState) => {
          console.log(editorState);
        }}
      />
      <HistoryPlugin />
    </LexicalComposer>
  );
};
