import React, { useEffect } from "react";

const IsItCorrect = (props) => {
  useEffect(() => {
    console.log("IsItCorrect", props);
  }, []);
  return <div>is it correct</div>;
};

export default IsItCorrect;
