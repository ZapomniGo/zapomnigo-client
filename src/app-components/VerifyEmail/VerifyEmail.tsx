import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export const VerifyEmail = () => {
  const [params] = useSearchParams();
  const [stateVerified, setStateVerified] = useState(0);
  const [text, setText] = useState("Checking with link...");
  const token = params.get("token");

  //0 is for request not sent
  //1 is for request sent
  //2 is for request completed - user verified
  //3 is for request completed - user not verified
  useEffect(() => {
    switch (stateVerified) {
      case 0:
        setText("Hmm...");
        break;
      case 1:
        setText("Checking your link...");
        break;
      case 2:
        setText("Your email is verified!");
        break;
      case 3:
        setText("Your email is not verified!");
        break;
      default:
        setText("Something went wrong");
        setText("Something went wrong");
    }
  }, [stateVerified]);
  return (
    <div>
      <section className="centerContainer">{text}</section>
    </div>
  );
};
