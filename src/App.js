import React from "react";
import { 
	Route,
	Switch
} from "react-router-dom";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import WorldMap from "./components/WorldMap.js";
import PrivateRoute from "./components/utils/PrivateRoute.js";

import './App.css'

function App() {
  return (
    <div className="App">
      <header className="App-header">
		<Switch>
			<Route exact path="/" component={SignUp} />
			<Route path="/signin" component={SignIn} />
			<PrivateRoute path="/game" component={WorldMap} />
		</Switch>
      </header>
    </div>
  );
}

export default App;
