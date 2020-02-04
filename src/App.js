import React, {useEffect} from "react";
import { 
	Route
} from "react-router-dom";
import Onboard from './components/Onboard'
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";

import './App.css'

function App() {
		
  return (
    <div className="App">
      <header className="App-header">
		<Route exact path="/" component={SignUp} />
		<Route path="/signin" component={SignIn} />
      </header>
    </div>
  );
}

export default App;
