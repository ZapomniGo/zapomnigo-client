interface setCategoryProps{
     category: string,
     category_title: string
}

export const setCategoryProps: React.FC<setCategoryProps> = ({category, category_title}) => {
    return (
        <div className={category}>
            <h2 className="category_title">{category_title}</h2>
        </div>
    )
}