import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import LandingPage from "./components/views/LandingPage/LandingPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";
import Auth from "./hoc/auth";

function App() {
  return (
    <Router>
      <div>
        {/*
        A <Switch> looks through all its children <Route>
        elements and renders the first one whose path
        matches the current URL. Use a <Switch> any time
        you have multiple routes, but you want only one
        of them to render at a time
          
        
        <Route exact path="/">
            <LandingPage />
        </Route>
        위 처럼 쓴 것을 아래처럼 바꿀 수 있다.
        <Route exact path="/" components={LandingPage} />

        // auth option
        // null --> 아무나 출입
        // true --> 로그인 유저만 출입이 가능한 페이지
        // false -->  로그인 유저는 출입 불가한 페이지
  
      */}
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
        </Switch>
      </div>
    </Router>
  );
}

// <ul>
// <li>
//   <Link to="/">Home</Link>
// </li>
// <li>
//   <Link to="/about">About</Link>
// </li>
// <li>
//   <Link to="/dashboard">Dashboard</Link>
// </li>
// </ul>
// You can think of these components as "pages"
// in your app.

export default App;
