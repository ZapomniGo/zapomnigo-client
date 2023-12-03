import { FaArrowDown } from "react-icons/fa6";

type MoreBtnProps = {
  onClick: React.MouseEventHandler<HTMLDivElement>;
};

export const MoreBtn = (props: MoreBtnProps) => {
  return (
    <div className="load-more">
      <div onClick={props.onClick} className="load-more-btn">
        <FaArrowDown />
      </div>
    </div>
  );
};
