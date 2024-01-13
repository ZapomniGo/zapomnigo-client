import React, { useEffect } from 'react';
import ContainerComponent from '../PageContainer/PageContainer';
import { Footer } from '../Footer/Footer';
import { useAppSelector } from "../../app-context/store";

interface DashboardProps {
  children: React.ReactNode;
}

export const Dashboard: React.FC<DashboardProps> = ({ children }) => {
  const navigationSliceManager = useAppSelector((state) => state.navigationReducer);

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
        <div className='category'>
            {children}
        </div>
      </section>
      <Footer />
    </ContainerComponent>
  );
};

export default Dashboard;