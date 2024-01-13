import { isBackspace } from "lexical/LexicalUtils";

export const SelectSet = ({ id, title, description, institution, image, creator_name, onSelectSet, onDeselectSet, isAvb}) => {
    

    return (
        <div className="select-set">
            <div className="select-set-wrapper">
                <div className="select-set-title">
                    <h1>{title}</h1>
                </div>
                <div className="select-set-description">
                    <p>{description}</p>
                </div>
                <div className="select-set-creator">
                    <div className="image">
                        <img src={image} alt="" />
                    </div>
                    <div className="creator-name">
                        <p>
                            {creator_name}
                        </p>
                    </div>
                    {institution > 0 ? (
                        <div className="select-set-institution">
                            <a href="#">
                                {institution}
                            </a>
                        </div>
                    ): ''}
                </div>
                {isAvb === true ? (
                                        <button onClick={() => {onSelectSet(id); isAvb}}>Select Set</button>


                ) : (
                    <button onClick={() => { onDeselectSet(id); isAvb}}>Deselect Set</button>
)}
                
                </div>
        </div>
    );
}
