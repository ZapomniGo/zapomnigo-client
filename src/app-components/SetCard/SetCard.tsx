import React from "react";
import { useNavigate } from "react-router";
import { MdOutlineVerifiedUser } from "react-icons/md";

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
  subcategory,
  verified
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
      id={id}
      className={"set-card folder-card" + (isSelected ? " active" : "")}
      onMouseEnter={() => onMouseEnter(id)}
      onMouseLeave={onMouseLeave}
      onClick={() =>
        type === "folder"
          ? navigate(`/app/folder/${id}`)
          : navigate(`/app/set/${id}`)
      }
    >
      <div className={`title-options ${isSelected ? "open" : "close"}`}>
        <div
          className={`set-title ${isSelected ? "open" : "close"} folder-title `}
        >
          <div className="folder-icon">
            {icon}
          </div>
          {title.length > 38 ? title.substring(0, 38) + "..." : title}
          {verified &&                       <MdOutlineVerifiedUser
                        onClick={verified}
                        className="miniReport"
                        style={{ color: "orange" }}
                      />}

        </div>
        {/* <div className={`more-options ${isSelected ? "open" : "open"}`}>
          <SlOptionsVertical />
        </div> */}
      </div>

      <div className={`set-description  ${category ? "" : "no-category"} ${isSelected ? "open" : "close"}`}>
        {description
          ? description.length > 89
            ? description.substring(0, 89) + "..."
            : description
          : ""}
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
      {category ? (
      <div className="categories" style={{ paddingBottom: category && "10px" }}>
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
      ) : ""}
    </div>
  );
};

export default SetCard;
