import { Theme } from "../../globals/Themes"
import { getThemeName } from "../../globals/Tools"
import './TopNavBarComponent.css'

interface TopNavBarInput {
    pageTheme: Theme
    themeSetter: (theme: Theme) => void
    loginPageSetter: (page: boolean) => void
    registerPageSetter: (page: boolean) => void
    dashboardPageSetter: (page: boolean) => void
}

export const TopNavBar = ({ pageTheme, themeSetter, loginPageSetter, registerPageSetter, dashboardPageSetter }: TopNavBarInput) => {
    const theme_classname = getThemeName(pageTheme);
    const on_switch_theme = () => switchPageTheme(pageTheme, themeSetter);
    const on_sigin_click = () => {
        loginPageSetter(true);
        registerPageSetter(false);
        dashboardPageSetter(false);
    }
    const on_register_click = () => {
        loginPageSetter(false);
        dashboardPageSetter(false);
        registerPageSetter(true);
    }
    const on_dashboard_click = () => {
        loginPageSetter(false);
        dashboardPageSetter(true);
        registerPageSetter(false);
    }
    return (
        <nav className={`topnavbar topnavbar-${theme_classname}`}>
            <div className="theme-box">
                <button onClick={on_switch_theme}>Switch theme</button>
                <button onClick={on_dashboard_click}>Home</button>
            </div>
            <h1>Gamor</h1>
            <div className={`login-register-box login-register-box-${theme_classname}`}>
                <button onClick={on_sigin_click}>Login</button>
                {(pageTheme === Theme.LIGHT) && <button style={{ background: "black", color: "white" }} onClick={on_register_click}>Create Account</button>}
                {(pageTheme === Theme.DARK) && <button onClick={on_register_click}>Create Account</button>}
            </div>
        </nav>
    )
}

const switchPageTheme = (currentTheme: Theme, setter: (theme_: Theme) => void) => {
    if (currentTheme === Theme.LIGHT) {
        setter(Theme.DARK);
    }
    else
        setter(Theme.LIGHT)
}