import React, { Component } from "react";
import "./Register.scss";
import Button from "../../../components/atoms/button";
import { registerUserApi } from "../../../config/redux/action";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

class Register extends Component {
	state = {
		email: "",
		password: "",
	};

	handleChangeText = (e) => {
		// console.log(e.target.id);
		this.setState({
			[e.target.id]: e.target.value,
		});
	};
	handleRegisterSubmit = async () => {
		const res = await this.props
			.registerApi({
				email: this.state.email,
				password: this.state.password,
			})
			.catch((err) => err);

		if (res) {
			await Swal.fire(
				"Success",
				"Thanks you for using MyNotes",
				"success"
			);
			this.setState({
				email: "",
				password: "",
			});
			this.props.navigate("/Login");
		} else {
			await Swal.fire(
				"Error",
				"Sorry Your Email/Password is Invalid",
				"error"
			);
			this.setState({
				email: "",
				password: "",
			});
		}
	};

	render() {
		return (
			<div className='auth-container'>
				<div className='auth-card'>
					<p className='auth-title'>Register page</p>
					<input
						className='input'
						placeholder='Email'
						type='email'
						id='email'
						value={this.state.email}
						onChange={this.handleChangeText}
					></input>
					<input
						className='input'
						placeholder='Password'
						type='password'
						id='password'
						value={this.state.password}
						onChange={this.handleChangeText}
					></input>

					<Button
						onClick={this.handleRegisterSubmit}
						title='Register'
						loading={this.props.isLoading}
					/>
				</div>
				<p
					className='back-home'
					onClick={() => this.props.navigate("/")}
				>
					Back to Home
				</p>
			</div>
		);
	}
}

const RegisterPage = (props) => {
	let navigate = useNavigate();
	return <Register {...props} navigate={navigate} />;
};
const reduxState = (state) => ({
	isLoading: state.isLoading,
});

const reduxDispatch = (dispatch) => ({
	registerApi: (data) => dispatch(registerUserApi(data)),
});

export default connect(reduxState, reduxDispatch)(RegisterPage);
