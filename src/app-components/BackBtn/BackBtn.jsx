import { RiArrowGoBackLine } from "react-icons/ri";

export const BackBtn = () => {
  return (
    <div className="back-btn" onClick={() => window.history.back()}>
      <RiArrowGoBackLine />
    </div>
  );
};
