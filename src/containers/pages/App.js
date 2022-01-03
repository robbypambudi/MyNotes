import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login/index";
import Register from "./Register/index";
import Dashboard from "../pages/Dashbord/index";
import { Provider } from "react-redux";
import { store } from "../../config/redux/index";
import Main from "../pages/Main/index";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
	return (
		<Provider store={store}>
			<Router>
				<Routes>
					<Route path='/' element={<Main />} />
					<Route path='/Dashboard' element={<Dashboard />} />
					<Route path='/Login' element={<Login />} />
					<Route path='/Register' element={<Register />} />
				</Routes>
			</Router>
		</Provider>
	);
}

export default App;
