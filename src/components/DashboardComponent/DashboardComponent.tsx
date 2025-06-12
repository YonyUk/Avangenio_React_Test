import { useEffect, useState } from "react"
import { Theme } from "../../globals/Themes"
import { getThemeName } from "../../globals/Tools"
import { Categories } from "./CategoriesComponent/CategoriesComponent"
import './DashboardComponent.css'
import { PageMainView } from "./PageMainViewComponent/PageMainViewComponent"
import { ClientCredentials, Game } from "../../globals/models"

interface DashBoardInput {
    pageTheme: Theme
    credentials: ClientCredentials
    loginPageSetter: (page: boolean) => void
    registerPageSetter: (page: boolean) => void
    dashboardPageSetter: (page: boolean) => void
}

export const Dashboard = ({ pageTheme, credentials, loginPageSetter, registerPageSetter, dashboardPageSetter }: DashBoardInput) => {
    const [gameGenre, setGameGenre] = useState('puzzle')
    const [games, setGames] = useState<Game[]>([])
    const [pageGame, setPageGame] = useState(1)

    const fetchGames = async () => {
        try {
            const response = await fetch(`https://api.rawg.io/api/games?key=${process.env.REACT_APP_RAWG_API_KEY}&page_size=10&genres=${gameGenre}&page=${pageGame}`)
            const data = await response.json()
            setGames(data.results)

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchGames()
    }, [])

    return (
        <div className={`main-view main-view-${getThemeName(pageTheme)}`}>
            <PageMainView
                gameUpdater={fetchGames}
                credentials={credentials}
                pageGame={pageGame}
                pageGameSetter={setPageGame}
                pageTheme={pageTheme}
                loginPageSetter={loginPageSetter}
                registerPageSetter={registerPageSetter}
                dashboardPageSetter={dashboardPageSetter}
            />
            <Categories
                setGameGenre={(category: string) => {
                    setGameGenre(category)
                    fetchGames()
                }}
                pageTheme={pageTheme}
            />
        </div>
    )
}