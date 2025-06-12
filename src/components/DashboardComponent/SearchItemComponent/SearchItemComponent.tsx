import { useEffect, useState } from 'react'
import { Theme } from '../../../globals/Themes'
import { getThemeName, TWITCH_USERS_API_URL } from '../../../globals/Tools'
import './SearchItemComponent.css'
import { ClientCredentials, StreamQueryResult, TwitchUserSearchResult } from '../../../globals/models'

interface SearchItemInput {
    index: number
    pageTheme: Theme
    stream_query_result: StreamQueryResult
    credentials: ClientCredentials
    addUserFunction: (user: TwitchUserSearchResult) => void
}

export const SearchItem = ({ addUserFunction, index, credentials, pageTheme, stream_query_result }: SearchItemInput) => {
    const theme = getThemeName(pageTheme)
    const [hover, setHover] = useState(false)
    const name = stream_query_result.user_name
    const [userData, setUserData] = useState<TwitchUserSearchResult>({
        profile_image_url: '',
        display_name: '',
        login: '',
        offline_image_url: ''
    })

    useEffect(() => {
        const fetchUserData = async () => {
            const response = await fetch(`${TWITCH_USERS_API_URL}?id=${stream_query_result.user_id}`, {
                headers: {
                    'Client-ID': `${process.env.REACT_APP_TWITCH_CLIENT_ID}`,
                    'Authorization': `Bearer ${credentials.access_token}`
                }
            })
            const data = await response.json()
            setUserData(data.data[0])
        }

        fetchUserData()
    }, [])

    return (
        <div className={`search-item search-item-${theme}`}>
            <div className={`index index-${theme}`}>
                {index}
            </div>
            <div className="user-image">
                <img src={userData?.profile_image_url} alt="loading" />
            </div>
            <div className={`name name-${theme}`} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
                {(name.length < 8 && !hover) && <><b>{name}</b></>}
                {(name.length >= 8 && !hover) && <><b>{name.substring(0, 8)}...</b></>}
                {hover && <p><b>{name}</b></p>}
            </div>
            <button onClick={() => {
                addUserFunction(userData)
            }}>+</button>
        </div>
    )
}