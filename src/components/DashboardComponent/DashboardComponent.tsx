import { Theme } from "../../globals/Themes"
import { getThemeName } from "../../globals/Tools"
import './DashboardComponent.css'
import { PageMainView } from "./PageMainViewComponent/PageMainViewComponent"

interface DashBoardInput {
    pageTheme: Theme
    loginPageSetter: (page: boolean) => void
    registerPageSetter: (page: boolean) => void
    dashboardPageSetter: (page: boolean) => void
}

export const Dashboard = ({ pageTheme, loginPageSetter, registerPageSetter, dashboardPageSetter }: DashBoardInput) => {
    return (
        <div className={`main-view main-view-${getThemeName(pageTheme)}`}>
            <PageMainView
                pageTheme={pageTheme}
                loginPageSetter={loginPageSetter}
                registerPageSetter={registerPageSetter}
                dashboardPageSetter={dashboardPageSetter}
            />
        </div>
    )
}