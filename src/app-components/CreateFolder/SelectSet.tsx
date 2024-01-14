
export const SelectSet = ({ id, title, description, institution, image, creator_name, onSelectSet, onDeselectSet, isAvb}) => {
    

    return (
        <div className="select-set">
            <div className="select-set-wrapper">
                <div className="select-set-title">
                    {title.length > 63 ? title.substring(0, 63) + '...' : title}
                </div>
                <div className="select-set-description">
                    {description.length > 99 ? description.substring(0, 102) + '...' : description}
                </div>
                <div className="select-set-creator">
                    <div className="image">
                        <img src="/public/logo.jpg" alt="" />
                    </div>
                    <div className="creator-name">
                        <p>
                        {creator_name.length > 16 ? creator_name.substring(0, 16) + '...' : creator_name}
                        </p>
                    </div>
                    {institution > 0 ? (
                        <div className="select-set-institution">
                            <a href="#">
                                {institution}
                            </a>
                        </div>
                    ): ''}
                                    {isAvb === true ? (
                    <button onClick={() => {onSelectSet(id); isAvb}}>Избери</button>
                ) : (
                    <button onClick={() => {onDeselectSet(id); isAvb}}>Махни</button>
                    )}        
                </div>
                </div>

        </div>
    );
}
