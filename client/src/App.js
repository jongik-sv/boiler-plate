import React, {useEffect, useState} from "react";
import "./App.css";
import "dhx-suite/codebase/suite.min.css";

import { BrowserRouter as Router, Switch, Route, Link, HashRouter } from "react-router-dom";

// import { isEqual } from "lodash";
// import Sidebar from "./components/views/Sidebarold";

import LandingPage from "./components/views/LandingPage/LandingPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";
import Auth from "./hoc/auth";
import Navbar from './components/views/Sidebar/Navbar';
function App() {
  const [toolbarNav, setToolbarNav] = useState([]);
  const [activeExampleId, setActiveExample] = useState("");
  const [activeWidget, setActiveWidget] = useState("");



  // useEffect(() => {
	// 	let activeHrefPart = window.location.href.split("/").pop();
  //   let activeHrefPartCapitalize = activeHrefPart.charAt(0).toUpperCase() + activeHrefPart.slice(1);
  //   console.log(activeHrefPart, activeHrefPartCapitalize);
	// 	if (activeWidget !== activeHrefPartCapitalize) {

  //     // setActiveWidget(activeWidget.charAt(0).toUpperCase() + activeWidget.slice(1));
  //     // this.el &&
  //     //   this.el.scroll({
  //     //     top: 0,
  //     //     behavior: "smooth",
  //     //     inline: "center",
  //     //   });      
  //     setActiveWidgetWrap(activeHrefPartCapitalize);
	// 	}
  // }, []);

  // const setActiveWidgetWrap = (activeWidget) =>{
  //   setActiveWidget(activeWidget.charAt(0).toUpperCase() + activeWidget.slice(1));
  //   this.el &&
  //     this.el.scroll({
  //       top: 0,
  //       behavior: "smooth",
  //       inline: "center",
  //     });
  // };  
  

  
  // const setToolBarNavItems = (array) => {
  //   if (!isEqual(array, toolbarNav)) {
  //     setToolbarNav(array);
	// 	}
  // }
  
	// const setActiveExapmle= (id) => {
	// 	let elHash = "#" + id;
	// 	const el = this.el.querySelector(elHash);
	// 	const mainY = el.getBoundingClientRect().top + this.el.querySelector("main").scrollTop;
	// 	this.el.querySelector("main").scroll({
	// 		top: mainY - 57,
	// 		behavior: "smooth",
	// 		inline: "center",
	// 	});
	// }



  return (
    <>
      <HashRouter hashType={"slash"}> 
        <div
        className="app-screen"
        style={{ minHeight: "100vh", maxHeight: "100vh", display: "flex", overflow: "hidden" }}
        >

          <Navbar />
          <Router>

            <div>
              <Switch>
                <Route exact path="/" component={Auth(LandingPage, null)} />
                <Route exact path="/login" component={Auth(LoginPage, false)} />
                <Route exact path="/register" component={Auth(RegisterPage, false)} />
              </Switch>
            </div>
          </Router>
        </div>
      </HashRouter>   
    </>
  );
}


export default App;
