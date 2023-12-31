import React from "react";

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
      className={"set-card"+(isSelected ? " active" : "")}
      onMouseEnter={() => onMouseEnter(id)}
      onMouseLeave={onMouseLeave}
    >
      <div className={`title-options ${isSelected ? "open" : "close"}`}>
      <div className={`set-title ${isSelected ? "open" : "close"}`}>
        {title.length > 34 ? title.substring(0, 35) + '...' : title}
      </div>        
      {/* <div className={`more-options ${isSelected ? "open" : "open"}`}>
          <SlOptionsVertical />
        </div> */}
      </div>
      
      <div className={`set-description ${isSelected ? "open" : "close"}`}>
        {description.length > 99 ? description.substring(0, 102) + '...' : description}
      </div>
      <div className={`set-creator  ${isSelected ? "open" : "close"}`}>
        <div className="image">
            <img src={image} alt="" />
        </div>
        <div className="creator-name">
            <p>
              {creator_name}
            </p>
        </div>
        <div className={`set-institution ${isSelected ? "open" : "close"}`}>
              <a href="#">
                {institution}
              </a>
        </div>
      </div>
    </div>
  );
};

export default SetCard;
