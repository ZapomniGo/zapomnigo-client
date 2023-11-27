import { FaArrowDown } from "react-icons/fa6";



export const MoreBtn = ({onClick}) => {


    return (
        <div onClick={onClick} className="load-more-btn">
          <FaArrowDown />
        </div>
      );
}

