import React from "react";
import Header from "../../../components/molecules/header/main";
import Cover from "../../organisms/cover/Main/index";
import "./style.scss";
const Main = () => {
	return (
		<div className='container'>
			<Header />
			<Cover />
		</div>
	);
};

export default Main;
