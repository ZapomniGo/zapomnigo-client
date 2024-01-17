import React, { useEffect } from "react";
import ContainerComponent from "../PageContainer/PageContainer";
import { Footer } from "../Footer/Footer";
import { useAppSelector } from "../../app-context/store";
import { toast } from "react-toastify";
import { useRef } from "react";
interface DashboardProps {
  children: React.ReactNode;
}

export const Dashboard: React.FC<DashboardProps> = ({ children }) => {
  const hasShownToast = useRef(false);
  const navigationSliceManager = useAppSelector(
    (state) => state.navigationReducer
  );

  useEffect(() => {
    if (!localStorage.getItem('access_token')) {
      if (localStorage.getItem('marketingConsent') !== 'true') {
        if (!hasShownToast.current) {
          toast('С използването на сайта се съгласявате с общите условия, политиката за поверителност и политиката за бисквитки', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000,
          });
          hasShownToast.current = true;
          localStorage.setItem('marketingConsent', 'true');
        }
      }
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
      <section className="card-section">
        <div className="category">{children}</div>
      </section>
      <Footer />
    </ContainerComponent>
  );
};

export default Dashboard;
