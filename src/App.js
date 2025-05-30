// import logo from './logo.svg';
// import './App.css';
import { Dashboard } from './components/DashboardComponent/DashboardComponent';
import { LoginComponent } from './components/LoginComponent/LoginComponent';
import { TopNavBar } from './components/TopNavBarComponent/TopNavBarComponent';
import { Theme } from './globals/Themes';
import { useState } from 'react';

function App() {
  const [pageTheme, setPageTheme] = useState(Theme.LIGHT);
  const [loginPage, setLoginPage] = useState(false);
  const [registerPage, setRegisterPage] = useState(false);
  const [dashboardPage, setDashboardPage] = useState(true);

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
        dashboardPage &&
        <Dashboard
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
