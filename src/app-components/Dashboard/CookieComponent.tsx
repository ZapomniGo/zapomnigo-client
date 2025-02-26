import { useState } from "react";

export const CookieComponent: React.FC = (props) => {
  const [hide, setHide] = useState("");
  const verify = () => {
    localStorage.setItem("cookieConsent", "true");
    setHide("hide");
  };
  const nope = () => {
    localStorage.clear();
    const cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
    //redirect to a about:blank
    alert(
      "Няма как сайтът ни да функционира и да се развива без изполването на бисквитки. Ще ви пренасочим към празна страница."
    );
    window.location.href = "about:blank";
  };

  return (
    <div className={`cookie-component ${hide} ${props.pageType}`}>
      <div className="test">
        <div className="cookieComponent__content">
          <p style={{ color: "gray" }}>
            Използваме бисквитки за функционирането и подобряването на
            платформата. С продължаването на използването на сайта, се
            съгласяваш с използването на бисквитки. Научи повече:{" "}
            <a style={{ color: "gray" }} href="/app/legal/privacy-policy">
              Политика за поверителност
            </a>
            {"  "}
            <a style={{ color: "gray" }} href="/app/legal/terms-of-service">
              Общи условия
            </a>
            .
          </p>
        </div>
        <div className="cookieComponent__button">
          <button onClick={nope}>Не съм съгласен</button>
          <button onClick={verify}>Съгласен съм</button>
        </div>
      </div>
    </div>
  );
};
