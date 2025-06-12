import { useEffect, useState } from "react"
import { Theme } from "../../../globals/Themes"
import { getThemeName, TWITCH_MATCHS_API_URL, TWITCH_STREAMS_API_URL, TWITCH_TOURNAMENTS_API_URL } from "../../../globals/Tools"
import './PageMainViewComponent.css'
import { SearchItem } from "../SearchItemComponent/SearchItemComponent"
import { ClientCredentials, Game, StreamQueryResult, TwitchUserSearchResult } from "../../../globals/models"

interface PageMainViewInput {
    pageTheme: Theme
    loginPageSetter: (page: boolean) => void
    registerPageSetter: (page: boolean) => void
    dashboardPageSetter: (page: boolean) => void
    gameUpdater: () => void
    pageGame: number
    pageGameSetter: (value: number) => void
    credentials: ClientCredentials
}

const updateTime = (setTime: (time: string) => void) => {
    const now = new Date().toLocaleTimeString()
    setTime(now)
}

export const PageMainView = ({ pageTheme, credentials, pageGame, pageGameSetter, gameUpdater, loginPageSetter, registerPageSetter, dashboardPageSetter }: PageMainViewInput) => {
    const theme = getThemeName(pageTheme);
    const [party_pressed, setPartyPressed] = useState("unpressed")
    const [match_pressed, setMatchPressed] = useState("unpressed")
    const [streams_pressed, setStreamPressed] = useState("pressed")
    const [time, setTime] = useState((new Date()).toLocaleTimeString())
    const [listItems, SetListItems] = useState<StreamQueryResult[]>([])
    const [paginationCursor, setPaginationCursor] = useState('')
    const [twitchURL, setTwitchURL] = useState(`${TWITCH_STREAMS_API_URL}?game_id=21779&first=10`)
    const [usersAdded, setUserAdded] = useState<TwitchUserSearchResult[]>([])

    const fetch_streams = async () => {
        SetListItems([])
        const response = await fetch(twitchURL, {
            headers: {
                'Client-ID': `${process.env.REACT_APP_TWITCH_CLIENT_ID}`,
                'Authorization': `Bearer ${credentials.access_token}`
            }
        })
        const data = await response.json()
        SetListItems(data.data)
        setPaginationCursor(data.pagination.cursor)
        if (streams_pressed === 'pressed') {
            setTwitchURL(`${TWITCH_STREAMS_API_URL}?game_id=21779&first=10&after=${paginationCursor}`)
        } else if (match_pressed === 'pressed') {
            setTwitchURL(`${TWITCH_STREAMS_API_URL}?league_id=509658&first=10&after=${paginationCursor}`)
        } else {
            setTwitchURL(`${TWITCH_STREAMS_API_URL}?game_id=21779&first=10&type=live&after=${paginationCursor}`)
        }
    }

    useEffect(() => {
        fetch_streams()
    }, [])

    setInterval(() => updateTime(setTime), 1000)
    const on_create_account = () => {
        registerPageSetter(true)
        loginPageSetter(false)
        dashboardPageSetter(false)
    }

    const on_sign_in = () => {
        registerPageSetter(false)
        loginPageSetter(true)
        dashboardPageSetter(false)
    }

    const on_party = () => {
        setPartyPressed("pressed")
        setMatchPressed("unpressed")
        setStreamPressed("unpressed")
        setTwitchURL(`${TWITCH_STREAMS_API_URL}?game_id=21779&first=10&type=live`)
        setPaginationCursor('')
    }

    const on_match = () => {
        setMatchPressed("pressed")
        setPartyPressed("unpressed")
        setStreamPressed("unpressed")
        setTwitchURL(`${TWITCH_STREAMS_API_URL}?game_id=509658&first=10`)
        setPaginationCursor('')
    }

    const on_streams = () => {
        setStreamPressed("pressed")
        setMatchPressed("unpressed")
        setPartyPressed("unpressed")
        setTwitchURL(`${TWITCH_STREAMS_API_URL}?game_id=21779&first=10`)
        setPaginationCursor('')
    }

    const add_user = (user: TwitchUserSearchResult) => {
        setUserAdded([...usersAdded, user])
    }

    return (
        <div className={`page-main-view page-main-view-${theme}`}>
            <div className={`text-box text-box-${theme}`}>
                <h1>start</h1>
                <h1 className={`remarked-${theme}`}>streaming</h1>
                <h1>games</h1>
                <h1>differently</h1>
                <div style={{ display: "flex", flexDirection: "row" }}>
                    <p className={`normal-paragraph-${theme}`}>gamor now has&nbsp;</p>
                    <p className="paragraph-remarked"> <b>stream party</b></p>
                    <p className={`normal-paragraph-${theme}`}>&nbsp;platform</p>
                </div>
                <div className={`text-box-buttons-${theme}`}>
                    <button onClick={on_create_account}>Create Account</button>
                    <button onClick={on_sign_in}>Sign in</button>
                </div>
            </div>
            <div className="welcome-page">
                <center>
                    <div className="clock">
                        {time}
                    </div>
                </center>
                <div className="users-added">
                    {usersAdded.map((user) => {
                        return (
                            <div className="user-image-added">
                                <img src={user.profile_image_url} alt="loading" />
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="search-section">
                <h3><small>01.</small> Choose Platform</h3>
                <nav className={`search-streaming-nav-bar search-streaming-nav-bar-${theme}`}>
                    <button className={`${party_pressed}-button-${theme}`} onClick={on_party}>Party</button>
                    <button className={`${match_pressed}-button-${theme}`} onClick={on_match}>Matchs</button>
                    <button className={`${streams_pressed}-button-${theme}`} onClick={on_streams}>Streams</button>
                </nav>
                <h3><small>02.</small> Searching Game</h3>
                <div className={`container container-${theme}`}>
                    <div className={`container-filter container-filter-${theme}`}>
                        <h3>COD Warzone</h3>
                        <button>Filter</button>
                    </div>
                    <hr />
                    <div className={`options options-${theme}`}>
                        {listItems.map((value, index) => {
                            return (
                                <SearchItem
                                    index={index + 1}
                                    pageTheme={pageTheme}
                                    stream_query_result={value}
                                    credentials={credentials}
                                    addUserFunction={add_user}
                                />
                            )
                        })}
                    </div>
                    <button onClick={() => {
                        fetch_streams()
                    }}><b>Search Now</b></button>
                </div>
            </div>
        </div>
    )
}