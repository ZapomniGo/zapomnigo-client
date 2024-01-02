
import React, { useState } from "react";
import { emailPattern } from "./../Forms/Registration/utils";

const VerifyEmail = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const RequestEmail = () => {
    if (email === "") {
      setError("Моля, въведете имейл");
      return;
    }
    if (!emailPattern.test(email)) {
      setError("Моля, въведете валиден имейл");
      return;
    }
    console.log(email);
  }
  return (
    <div className="verify">
      <div className="verifyContainer">
        <h1>Потвърдете имейла си</h1>
        <p>
          Проверете пощата си, би трябвало да сте получили имейл от нас.
          Проверете и спам папката. Ако все пак не сте получили, натиснете
          бутона отдолу
        </p>
        <input
          onChange={(e) => setEmail(e.value)}
          type="text"
          placeholder="Имейл"
        />
        <button onClick={RequestEmail} className="button">Изпрати отново</button>
       {error.length ? <p>{error}</p> :""}
      </div>
    </div>
  );
};

export default VerifyEmail;
