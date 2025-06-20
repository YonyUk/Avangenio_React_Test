import { Theme } from '../../globals/Themes';
import { getThemeName } from '../../globals/Tools';
import './LoginComponent.css';
import { users } from '../../database/database'
import { useState } from 'react';

interface LoginComponentInput {
    isLogin: boolean,
    pageTheme: Theme,
    loginPageSetter: (page: boolean) => void
    registerPageSetter: (page: boolean) => void
    dashboardPageSetter: (page: boolean) => void
}

export const LoginComponent = ({ isLogin, pageTheme, loginPageSetter, registerPageSetter, dashboardPageSetter }: LoginComponentInput) => {
    const class_name = getThemeName(pageTheme)
    const [logged, setLogged] = useState(false)
    const [userFound, setUserFound] = useState(false)
    const [wrongPassword, setWrongPassword] = useState(false)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const handleChangeInputValue = (event: any, setter: (value: string) => void) => {
        setter(event.target.value)
    }

    return (
        <div className={`main-frame main-frame-${class_name}`}>
            {!isLogin && <><h1>Register</h1></>}
            {isLogin && <><h1>Login</h1></>}
            <div className={`input-box input-box-${class_name}`}>
                <h3>User name</h3>
                <input type="email" name="username_email" id="u_e_Input" placeholder="username or email"
                    value={username}
                    onChange={(event) => handleChangeInputValue(event, setUsername)}
                />
                {(logged && !userFound) && <><p style={{ color: 'red' }}>No account found associated to this username or email</p></>}
                <h3>Password</h3>
                <input type="password" name="password" id="passwordInput"
                    value={password}
                    onChange={(event) => handleChangeInputValue(event, setPassword)}
                />
                {(logged && userFound && wrongPassword) && <><p style={{ color: 'red' }}>Wrong password for the given username</p></>}
                {!isLogin && <>
                    <h3>Confirm</h3>
                    <input type="password" name="password_confirm" id="p_confirm"
                        value={confirmPassword}
                        onChange={(event) => handleChangeInputValue(event, setConfirmPassword)}
                    />
                    {(password !== confirmPassword) && <><p style={{ color: 'red' }}>The passwords doesn't matchs</p></>}
                </>}

                <div className="input-buttons-box">
                    <button onClick={() => onLogin(username, password, setLogged, setUserFound, setWrongPassword, loginPageSetter, registerPageSetter, dashboardPageSetter)}>Login</button>
                    <button>Cancel</button>
                </div>
            </div>
        </div >
    )
}

const onLogin = (
    username: string,
    password: string,
    setLogged: (value: boolean) => void,
    setUserFound: (value: boolean) => void,
    setWrongPassword: (value: boolean) => void,
    setLogging: (value: boolean) => void,
    setRegister: (value: boolean) => void,
    setDashboard: (value: boolean) => void
) => {
    const user = users.find((user) => user.username === username)
    const user_found = user !== undefined
    const wrong_password = user_found ? user.password !== password : true
    setLogged(true)
    setUserFound(user_found)
    setWrongPassword(wrong_password)
    if (!wrong_password) {
        setLogging(false)
        setRegister(false)
        setDashboard(true)
    }
}