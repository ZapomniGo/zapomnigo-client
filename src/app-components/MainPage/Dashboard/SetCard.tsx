import React from "react";
import { SlOptionsVertical } from "react-icons/sl";

interface SetCardProps {
  id: string;
  title: string;
  description: string;
  institution: string;
  onMouseEnter: (id: string) => void;
  onMouseLeave: () => void;
  isSelected: boolean;
  image: string;
  creator_name: string;
}

const SetCard: React.FC<SetCardProps> = ({ id, title, description, institution, image, creator_name, onMouseEnter, onMouseLeave, isSelected }) => {
  return (
    <div
      className="set-card"
      onMouseEnter={() => onMouseEnter(id)}
      onMouseLeave={onMouseLeave}
    >
      <div className="title-options">
        <div className={`set-title ${isSelected ? "active" : ""}`}>{title}</div>
        {/* <div className={`more-options ${isSelected ? "open" : "open"}`}>
          <SlOptionsVertical />
        </div> */}
      </div>
      
      <div className={`set-description ${isSelected ? "open" : "closed"}`}>
        {description}
      </div>
      <div className="set-creator">
        <div className="image">
            <img src={image} alt="" />
        </div>
        <div className="creator-name">
            <p>
              {creator_name}
            </p>
        </div>
        <div className={`set-institution ${isSelected ? "open" : "closed"}`}>
              {institution}
        </div>
      </div>
    </div>
  );
};

export default SetCard;
