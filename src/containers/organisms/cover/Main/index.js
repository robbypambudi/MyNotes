import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./style.scss";

const Cover = () => {
	const currentTime = () => {
		return new Date().toLocaleTimeString();
	};
	const [timer, setTimer] = useState(currentTime());

	useEffect(() => {
		const interval = setInterval(() => setTimer(currentTime()), 1000);
		return () => clearInterval(interval);
	}, []);

	let navigate = useNavigate();
	return (
		<div className='cover'>
			<div className='title'>
				<div className='time'> {timer}</div>
				<h1>
					Hai
					<span className='underline--magical'> everyone </span>
				</h1>
				<h2>Lets take notes for your best moment in your life</h2>
			</div>

			<div className='start'>
				<h3>How to Get Started</h3>
				<div className='start-tutorial'>
					<p>Register</p>
					<p>Login</p>
					<p>Take Notes</p>
				</div>
				<div className='btn-start'>
					<button
						onClick={() => {
							navigate("/Register");
						}}
					>
						Get Started
					</button>
				</div>
			</div>
		</div>
	);
};
export default Cover;
