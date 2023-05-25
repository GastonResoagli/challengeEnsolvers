import Home from "./Home/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import { Switch, Route } from "react-router-dom";
import Archived from "./components/Archived";
function App() {
	return (
		<div className="App">
			<Switch>
				<Route path="/" exact>
					<Home />
				</Route>
				<Route path="/archive" exact>
					<Archived />
				</Route>
			</Switch>
		</div>
	);
}

export default App;
