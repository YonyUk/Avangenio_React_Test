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
    const index_text = index > 9 ? index.toString() : `0${index}`
    return (
        <div className={`category-item category-item-${theme}`}>
            {(index < 1) && <h3><small>View All</small></h3>}
            {(index > 0) && <h3><small>/{index_text}</small></h3>}
            <h2><small>{categoryName}</small></h2>
        </div>
    )
}