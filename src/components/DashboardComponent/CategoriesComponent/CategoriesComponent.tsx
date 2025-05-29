import { Theme } from '../../../globals/Themes'
import { getThemeName } from '../../../globals/Tools'
import './CategoriesComponent.css'
import { CategoryItem } from './CategoryItemComponent/CategoryItemComponent'

interface CategoriesInput {
    pageTheme: Theme
}

export const Categories = ({ pageTheme }: CategoriesInput) => {
    const theme = getThemeName(pageTheme)
    const categories = getCategories()
    return (
        <div className={`categories categories-${theme}`}>
            {categories.map((value, index) => {
                return (
                    <CategoryItem
                        pageTheme={pageTheme}
                        index={index + 1}
                        categoryName={value}
                    />
                )
            })}
        </div>
    )
}

const getCategories = (): string[] => {
    return [
        'category1',
        'category2',
        'category3',
        'category4',
        'category5',
        'category6',
        'category7',
        'category8'
    ]
} 