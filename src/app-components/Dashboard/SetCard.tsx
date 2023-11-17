import React from "react";

interface SetCardProps {
  id: string;
  title: string;
  description: string;
  institution: string;
  onMouseEnter: (id: string) => void;
  onMouseLeave: () => void;
  isSelected: boolean;
}

const SetCard: React.FC<SetCardProps> = ({ id, title, description, institution, onMouseEnter, onMouseLeave, isSelected }) => {
  return (
    <div
      className="set-card"
      onMouseEnter={() => onMouseEnter(id)}
      onMouseLeave={onMouseLeave}
    >
      <div className="set-title">{title}</div>
      <div className={`set-description ${isSelected ? "open" : "closed"}`}>
        {description}
      </div>
      <div className={`set-institution ${isSelected ? "open" : "closed"}`}>
        {institution}
      </div>
    </div>
  );
};

export default SetCard;
