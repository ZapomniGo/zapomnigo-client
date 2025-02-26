import React, { useEffect } from "react";
import ContainerComponent from "../PageContainer/PageContainer";
import { Footer } from "../Footer/Footer";
import { useAppSelector } from "../../app-context/store";
import { BsQuestion } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { CookieComponent } from "./CookieComponent";
import { useState } from "react";
import { toast } from "react-toastify";
interface DashboardProps {
  children: React.ReactNode;
}

window.onload = () => {
  if (localStorage.getItem("access_token")) {
    return;
  }
  setTimeout(
    () => {
      toast("Добре дошъл в ЗапомниГо! Регистрирай се и създавай свои тестета!");
    },
    1000 * 60 * 2
  );
};

export const Dashboard: React.FC<DashboardProps> = ({ children }) => {
  const navigate = useNavigate();
  const navigationSliceManager = useAppSelector(
    (state) => state.navigationReducer
  );
  const [cookieConsent, setCookieConsent] = useState(false);
  useEffect(() => {
    document.title = "ЗапомниГо | Платформата, която ти помага да запомняш";
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 100);

    if (localStorage.getItem("cookieConsent") === "true") {
      setCookieConsent(true);
    }
  }, []);

  useEffect(() => {
    if (navigationSliceManager.open) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [navigationSliceManager.open]);

  return (
    <ContainerComponent open={navigationSliceManager.open}>
      <BsQuestion
        id="question-btn"
        style={{ cursor: "pointer" }}
        onClick={() =>
          window.open(
            "https://www.canva.com/design/DAF8AHeeCE8/vcm2YZIDWLnJCm0w4CfIpg/edit?utm_content=DAF8AHeeCE8&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton",
            "_blank",
            "rel=noopener noreferrer"
          )
        }
      />
      <section className="card-section">
        <div className="category">{children}</div>
      </section>
      {!cookieConsent && <CookieComponent pageType={"normal"} />}
      {/* <CookieComponent /> */}
      <Footer />
    </ContainerComponent>
  );
};

export default Dashboard;
