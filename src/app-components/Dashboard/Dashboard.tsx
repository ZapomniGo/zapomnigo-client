import React, { useEffect } from "react";
import ContainerComponent from "../PageContainer/PageContainer";
import { Footer } from "../Footer/Footer";
import { useAppSelector } from "../../app-context/store";
import { BsQuestion } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { CookieComponent } from "./CookieComponent";
import { useState } from "react";
interface DashboardProps {
  children: React.ReactNode;
}

export const Dashboard: React.FC<DashboardProps> = ({ children }) => {
  const navigate = useNavigate();
  const navigationSliceManager = useAppSelector(
    (state) => state.navigationReducer
  );
  const [cookieConsent, setCookieConsent] = useState(false);
  useEffect(() => {
    document.title = "ЗапомниГо | Платформата, която ти помага да запомняш";
    window.scrollTo({ top: 0, behavior: "smooth" });

    if(localStorage.getItem('cookieConsent2') === "true") {
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
      <BsQuestion id="question-btn" onClick={() => navigate("/app/manual")} />
      <section className="card-section">
        <div className="category">{children}</div>
      </section>
      {!cookieConsent && <CookieComponent />}
      {/* <CookieComponent /> */}
      <Footer />
    </ContainerComponent>
  );
};

export default Dashboard;
