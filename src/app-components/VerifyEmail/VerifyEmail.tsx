import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

enum STATE_CODES {
  REQUEST_NOT_SENT = 0,
  REQUEST_SENT,
  REQUEST_USER_VERIFIED,
  REQUEST_USER_NOT_VERIFIED,
}

export const VerifyEmail = () => {
  const [params] = useSearchParams();
  const [stateVerified, setStateVerified] = useState(0);
  const [text, setText] = useState("Checking with link...");
  const token = params.get("token");

  useEffect(() => {
    switch (stateVerified) {
      case STATE_CODES.REQUEST_NOT_SENT:
        setText("Hmm...");
        break;
      case STATE_CODES.REQUEST_SENT:
        setText("Checking your link...");
        break;
      case STATE_CODES.REQUEST_USER_VERIFIED:
        setText("Your email is verified!");
        break;
      case STATE_CODES.REQUEST_USER_NOT_VERIFIED:
        setText("Your email is not verified!");
        break;
      default:
        setText("Something went wrong");
        setText("Something went wrong");
    }
  }, [stateVerified]);
  return (
    <>
      <section className="centerContainer">{text}</section>
    </>
  );
};
