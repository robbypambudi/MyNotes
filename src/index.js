import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./containers/pages/App";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById("root")
);

reportWebVitals();
