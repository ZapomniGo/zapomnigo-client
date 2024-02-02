import React from "react";
import { useNavigate } from "react-router";
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
  icon: string;
  type: string;
}

const SetCard: React.FC<SetCardProps> = ({
  id,
  title,
  description,
  institution,
  image,
  creator_name,
  onMouseEnter,
  onMouseLeave,
  isSelected,
  category,
  icon,
  type,
  subcategory
}) => {
  const displayDescription = () => {
    let n = 120;
    if (description.length > n) {
      while (description[n] != " ") {
        n -= 1;
      }
      return <p>{description.slice(0, n)}...</p>;
    }
    return <p>{description}</p>;
  };
  const navigate = useNavigate();

  return (
    <div
      className={"set-card folder-card"+(isSelected ? " active" : "")}
      onMouseEnter={() => onMouseEnter(id)}
      onMouseLeave={onMouseLeave}
      onClick={() => type === "folder" ? navigate(`/app/folder/${id}`) : navigate(`/app/set/${id}`)}

      
>
      <div className={`title-options ${isSelected ? "open" : "close"}`}>
      <div className={`set-title ${isSelected ? "open" : "close"} folder-title`}>
        {icon}{title.length > 34 ? title.substring(0, 35) + '...' : title}
      </div>        
      {/* <div className={`more-options ${isSelected ? "open" : "open"}`}>
          <SlOptionsVertical />
        </div> */}
      </div>

      <div className={`set-description ${isSelected ? "open" : "close"}`}>
      {description ? (
        description.length > 99
          ? description.substring(0, 102) + "..."
          : description
      ) : (
        "" 
      )}
      </div>
      <div className={`set-creator  ${isSelected ? "open" : "close"}`}>
        <div className="image">
          <img src={image} alt="Лого" />
        </div>
        <div className="creator-name">
          <p>
            {creator_name.length > 21
              ? creator_name.substring(0, 21) + "..."
              : creator_name}
          </p>
        </div>        
      </div>
      <div className="categories" style={{paddingBottom:category && "10px"}}>

      {category ? (
          <div className={`set-category ${isSelected ? "open" : "close"}`}>
            <a className="miniLabel">
              {category.length > 40
                ? category.substring(0, 40) + "..."
                : category}
            </a>
          </div>
        ) : (
          ""
        )}
      {subcategory ? (
          <div className={`set-category ${isSelected ? "open" : "close"}`}>
            <a className="miniLabel">
              {subcategory.length > 40
                ? subcategory.substring(0, 40) + "..."
                : subcategory}
            </a>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default SetCard;
