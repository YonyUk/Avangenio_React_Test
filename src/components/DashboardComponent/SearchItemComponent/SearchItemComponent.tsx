import { Theme } from '../../../globals/Themes'
import { getThemeName } from '../../../globals/Tools'
import './SearchItemComponent.css'

interface SearchItemInput {
    name: string
    index: number
    pageTheme: Theme
}

export const SearchItem = ({ name, index, pageTheme }: SearchItemInput) => {
    const theme = getThemeName(pageTheme)
    return (
        <div className={`search-item search-item-${theme}`}>
            <div className={`index index-${theme}`}>
                {index}
            </div>
            <div className={`name name-${theme}`}>
                {name}
            </div>
            <button>+</button>
        </div>
    )
}