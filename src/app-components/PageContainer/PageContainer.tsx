import React from "react";
import { BackBtn } from "../BackBtn/BackBtn";

interface ContainerProps {
  open: boolean;
  children: React.ReactNode;
}

export const ContainerComponent: React.FC<ContainerProps> = ({
  open,
  children,
}) => {
  return (
    <div className={`container ${open ? "open" : "close"}`}>
      <BackBtn />
      <div className="content">{children}</div>
    </div>
  );
};

export default ContainerComponent;
