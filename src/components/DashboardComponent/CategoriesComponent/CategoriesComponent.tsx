import { useState, useEffect } from 'react'
import { Theme } from '../../../globals/Themes'
import { getThemeName } from '../../../globals/Tools'
import './CategoriesComponent.css'
import { CategoryItem } from './CategoryItemComponent/CategoryItemComponent'

interface CategoriesInput {
    pageTheme: Theme
}

interface GameCategory {
    id: string,
    name: string,
    image_background: string
}

export const Categories = ({ pageTheme }: CategoriesInput) => {
    const theme = getThemeName(pageTheme)
    const [categories, setCategories] = useState<GameCategory[]>([])
    useEffect(() => {
        const fecthCategories = async () => {
            console.log(process.env.REACT_APP_RAWG_API_KEY)
            const response = await fetch(`https://api.rawg.io/api/genres?key=${process.env.REACT_APP_RAWG_API_KEY}`)
            const data = await response.json()
            setCategories(data.results)
        };
        fecthCategories()
    }, [])
    return (
        <div className='categories-section'>
            <h3>Trending Categories</h3>
            <div className={`categories categories-${theme}`}>
                {categories.map((value, index) => {
                    return (
                        <CategoryItem
                            pageTheme={pageTheme}
                            index={index + 1}
                            categoryName={value.name}
                            image_url={value.image_background}
                        />
                    )
                })}
                <CategoryItem
                    pageTheme={pageTheme}
                    index={-1}
                    categoryName='All Categories'
                    image_url=''
                />
            </div>
        </div>
    )
}