import { Theme } from '../../globals/Themes';
import { getThemeName } from '../../globals/Tools';
import './LoginComponent.css';

interface LoginComponentInput {
    isLogin: boolean,
    pageTheme: Theme
}

export const LoginComponent = ({ isLogin, pageTheme }: LoginComponentInput) => {
    const class_name = getThemeName(pageTheme)
    return (
        <div className={`main-frame main-frame-${class_name}`}>
            {!isLogin && <><h1>Register</h1></>}
            {isLogin && <><h1>Login</h1></>}
            <div className={`input-box input-box-${class_name}`}>
                <h3>User name</h3>
                <input type="email" name="usrname_email" id="u_e_Input" placeholder="username or email" />
                <h3>Password</h3>
                <input type="password" name="password" id="passwordInput" />
                {!isLogin && <><h3>Confirm</h3><input type="password" name="password_confirm" id="p_confirm" /></>}
                <div className="input-buttons-box">
                    <button onClick={() => onLogin("Jose", "Nada")}>Login</button>
                    <button>Cancel</button>
                </div>
            </div>
        </div>
    )
}

const onLogin = (username: string, password: string) => {
    alert('No verificado')
}