import { useState } from "react"
import { Theme } from "../../../globals/Themes"
import { getThemeName } from "../../../globals/Tools"
import './PageMainViewComponent.css'
import { SearchItem } from "../SearchItemComponent/SearchItemComponent"

interface PageMainViewInput {
    pageTheme: Theme
    loginPageSetter: (page: boolean) => void
    registerPageSetter: (page: boolean) => void
    dashboardPageSetter: (page: boolean) => void
}

const updateTime = (setTime: (time: string) => void) => {
    const now = new Date().toLocaleTimeString()
    setTime(now)
}

export const PageMainView = ({ pageTheme, loginPageSetter, registerPageSetter, dashboardPageSetter }: PageMainViewInput) => {
    const theme = getThemeName(pageTheme);
    const [party_pressed, setPartyPressed] = useState("unpressed")
    const [match_pressed, setMatchPressed] = useState("unpressed")
    const [streams_pressed, setStreamPressed] = useState("unpressed")
    const [time, setTime] = useState((new Date()).toLocaleTimeString())
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
    }

    const on_match = () => {
        setMatchPressed("pressed")
        setPartyPressed("unpressed")
        setStreamPressed("unpressed")
    }

    const on_streams = () => {
        setStreamPressed("pressed")
        setMatchPressed("unpressed")
        setPartyPressed("unpressed")
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
                    <p className="paragraph-remarked"> stream party</p>
                    <p className={`normal-paragraph-${theme}`}>&nbsp;platform</p>
                </div>
                <div className={`text-box-buttons-${theme}`}>
                    <button onClick={on_create_account}>Create Account</button>
                    <button onClick={on_sign_in}>Sign in</button>
                </div>
            </div>
            <div className="welcome-page">
                <div className="clock">
                    {time}
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
                        {getGames().map((value, index) => {
                            return (
                                <SearchItem
                                    index={index + 1}
                                    name={value}
                                    pageTheme={pageTheme}
                                />
                            )
                        })}
                    </div>
                    <button>Nada</button>
                </div>
            </div>
        </div>
    )
}

const getGames = (): string[] => {
    return [
        "options1",
        "options2",
        "options3",
        "options4",
        "options5",
        "options6",
        "options7",
        "options8",
        "options9",
        "options10",
        "options11",
    ]
}