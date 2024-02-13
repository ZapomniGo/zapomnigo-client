import React, { useEffect } from "react";
export const ProgressBar = (props) => {
  const [progress, setProgress] = React.useState(0);
  useEffect(() => {
    let remainingProgress =
      ((props.pastFlashcardsIndexes.length - 1) /
        (props.flashcards.length * 3)) *
      100;
    if (remainingProgress < 0) remainingProgress = 0;
    if (remainingProgress > 100) remainingProgress = 100;
    setProgress(remainingProgress);
  }, [props.pastFlashcardsIndexes]);
  return (
    props.studyMode !== -1 && (
      <div id="progressBar" style={{ width: progress + "vw" }}></div>
    )
  );
};
