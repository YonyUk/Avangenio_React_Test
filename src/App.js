// import logo from './logo.svg';
// import './App.css';
import { Dashboard } from './components/DashboardComponent/DashboardComponent';
import { LoginComponent } from './components/LoginComponent/LoginComponent';
import { TopNavBar } from './components/TopNavBarComponent/TopNavBarComponent';
import { useEffect, useState } from 'react';
import { Theme } from './globals/Themes';
import { TWITCH_AUTH_API_URL } from './globals/Tools';
import { ClientCredentials } from './globals/models.ts'

function App() {

  const [pageTheme, setPageTheme] = useState(Theme.LIGHT);
  const [loginPage, setLoginPage] = useState(false);
  const [registerPage, setRegisterPage] = useState(false);
  const [dashboardPage, setDashboardPage] = useState(true);
  const [clientCredentials, setClientCredentials] = useState({})
  const [credentialsGot, setCredentialsGot] = useState(false)

  useEffect(() => {
    const get_gredentials = async () => {
      const response = await fetch(`${TWITCH_AUTH_API_URL}?client_id=${process.env.REACT_APP_TWITCH_CLIENT_ID}&client_secret=${process.env.REACT_APP_TWITCH_CLIENT_SECRET}&grant_type=client_credentials`,
        { method: 'POST' }
      )
      const data = await response.json()
      setClientCredentials(data)
      setCredentialsGot(true)
    }
    get_gredentials()
  }, [])

  return (
    <>
      <TopNavBar
        pageTheme={pageTheme}
        themeSetter={setPageTheme}
        loginPageSetter={setLoginPage}
        registerPageSetter={setRegisterPage}
        dashboardPageSetter={setDashboardPage}
      />
      {
        (loginPage || registerPage) &&
        <LoginComponent
          isLogin={loginPage}
          pageTheme={pageTheme}
          loginPageSetter={setLoginPage}
          registerPageSetter={setRegisterPage}
          dashboardPageSetter={setDashboardPage}
        />
      }
      {
        (dashboardPage && credentialsGot) &&
        <Dashboard
          credentials={clientCredentials}
          pageTheme={pageTheme}
          loginPageSetter={setLoginPage}
          registerPageSetter={setRegisterPage}
          dashboardPageSetter={setDashboardPage}
        />
      }
    </>
  );
}

export default App;
