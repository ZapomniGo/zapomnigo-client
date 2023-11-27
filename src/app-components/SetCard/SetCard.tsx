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
  const displayDescription = () => {
    let n = 110;
    if (description.length > n) {
        while (description[n] != ' ') {
            n -= 1;
        }
        return <p>{description.slice(0, n)}...</p>;
    }
    return <p>{description}</p>;
};
  
  return (
    <div
      className={"set-card"+(isSelected ? " active" : "")}
      onMouseEnter={() => onMouseEnter(id)}
      onMouseLeave={onMouseLeave}
    >
      <div className={`title-options ${isSelected ? "open" : "close"}`}>
        <div className={`set-title ${isSelected ? "open" : "close"}`}>{title}</div>
        {/* <div className={`more-options ${isSelected ? "open" : "open"}`}>
          <SlOptionsVertical />
        </div> */}
      </div>
      
      <div className={`set-description ${isSelected ? "open" : "close"}`}>
        {displayDescription()}
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
