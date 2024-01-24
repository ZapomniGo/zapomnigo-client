import React from "react";

const FreeInput = (props) => {
  const [answer, setAnswer] = React.useState("");
  return (
    <div>
      <input
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Отговор"
        type="text"
      />
      <button onClick={() => props.VerifyCorrectness(answer, 2)}>
        Провери
      </button>
    </div>
  );
};

export default FreeInput;
