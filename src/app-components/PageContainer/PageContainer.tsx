import React from 'react';

interface ContainerProps {
  open: boolean;
  children: React.ReactNode;
}

export const ContainerComponent: React.FC<ContainerProps> = ({ open, children }) => {
  return (
    <div className={`container ${open ? 'open' : 'close'}`}>
      <div className="content">
        {children}
      </div>
    </div>
  );
};

export default ContainerComponent;
