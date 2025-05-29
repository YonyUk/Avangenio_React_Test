import { Theme } from '../../../../globals/Themes'
import { getThemeName } from '../../../../globals/Tools'
import './CategoryItemComponent.css'

interface CategoryItemInput {
    pageTheme: Theme
    index: number
    categoryName: string
}

export const CategoryItem = ({ pageTheme, index, categoryName }: CategoryItemInput) => {
    const theme = getThemeName(pageTheme)
    return (
        <div className={`category-item category-item-${theme}`}>
            <h3>{index}</h3>
            <h2>{categoryName}</h2>
        </div>
    )
}