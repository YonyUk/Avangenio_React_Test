import { useState, useEffect } from 'react'
import { Theme } from '../../../globals/Themes'
import { getThemeName } from '../../../globals/Tools'
import './CategoriesComponent.css'
import { CategoryItem } from './CategoryItemComponent/CategoryItemComponent'

interface CategoriesInput {
    pageTheme: Theme
    setGameGenre: (genre: string) => void
}

interface GameCategory {
    name: string,
    slug: string,
    image_background: string
}

export const Categories = ({ pageTheme, setGameGenre }: CategoriesInput) => {
    const theme = getThemeName(pageTheme)
    const [categories, setCategories] = useState<GameCategory[]>([])
    useEffect(() => {
        const fecthCategories = async () => {
            try {
                const response = await fetch(`https://api.rawg.io/api/genres?key=${process.env.REACT_APP_RAWG_API_KEY}`)
                const data = await response.json()
                setCategories(data.results)
            } catch (error) {
                console.log(error)
            }
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
                            slug={value.slug}
                            setGameGenre={setGameGenre}
                            pageTheme={pageTheme}
                            index={index + 1}
                            categoryName={value.name}
                            image_url={value.image_background}
                        />
                    )
                })}
            </div>
        </div>
    )
}