import { useState } from 'react'
import { Theme } from '../../../globals/Themes'
import { getThemeName } from '../../../globals/Tools'
import './SearchItemComponent.css'

interface SearchItemInput {
    name: string
    index: number
    pageTheme: Theme
    image_url: string
}

export const SearchItem = ({ name, index, pageTheme, image_url }: SearchItemInput) => {
    const theme = getThemeName(pageTheme)
    const [hover, setHover] = useState(false)
    return (
        <div className={`search-item search-item-${theme}`} style={{ backgroundImage: `url(${image_url})` }}>
            <div className={`index index-${theme}`}>
                {index}
            </div>
            <div className={`name name-${theme}`} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
                {(name.length < 10 && !hover) && <><b>{name}</b></>}
                {(name.length > 10 && !hover) && <><b>{name.substring(0, 10)}...</b></>}
                {hover && <p><b>{name}</b></p>}
            </div>
            <button>+</button>
        </div>
    )
}