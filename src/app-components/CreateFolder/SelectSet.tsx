import { FaMinus } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";

export const SelectSet = ({
  id,
  title,
  description,
  institution,
  image,
  creator_name,
  onSelectSet,
  onDeselectSet,
  isAvb,
  chosen,
}) => {
  return (
    <div className={chosen ? "select-set selected" : "select-set"}>
      <div className="select-set-wrapper">
        <div className="select-set-title">
          {title.length > 56 ? title.substring(0, 56) + "..." : title}
        </div>
        <div className="select-set-description">
          {description.length > 120
            ? description.substring(0, 120) + "..."
            : description}
        </div>
        <div className="select-set-creator">
          <div className="image">
            <img src={image} alt="" />
          </div>
          <div className="creator-name">
            <p>
              {creator_name.length > 25
                ? creator_name.substring(0, 25) + "..."
                : creator_name}
            </p>
          </div>
          {institution > 0 ? (
            <div className="select-set-institution">
              <a href="#">{institution}</a>
            </div>
          ) : (
            ""
          )}
          <div className="choose-btn">
            {isAvb === true ? (
              <button
                onClick={() => {
                  onSelectSet(id);
                  isAvb;
                }}
              >
                <FaPlus />
              </button>
            ) : (
              <button
                onClick={() => {
                  onDeselectSet(id);
                  isAvb;
                }}
              >
                <FaMinus />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
