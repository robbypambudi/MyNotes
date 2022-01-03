import React, { Component } from "react";
import { connect } from "react-redux";
import { loginUserApi } from "../../../config/redux/action";
import Button from "../../../components/atoms/button";
import { useNavigate } from "react-router-dom";
import "./Login.scss";
import Swal from "sweetalert2";

class Login extends Component {
	changeUser = () => {
		this.props.changeUserName();
	};
	state = {
		email: "",
		password: "",
		loginFailed: false,
	};

	handleChangeText = (e) => {
		this.setState({
			[e.target.id]: e.target.value,
		});
	};

	handleLoginSubmit = async () => {
		const res = await this.props
			.loginUser({
				email: this.state.email,
				password: this.state.password,
			})
			.catch((err) => err);

		if (res) {
			// console.log("Login Success ", res);
			// Setting Local Storage
			localStorage.setItem("UserData", JSON.stringify(res));
			this.setState({
				email: "",
				password: "",
			});
			await Swal.fire("Success", "Login Succsess", "success");
			this.props.navigate("/Dashboard");
		} else {
			await Swal.fire(
				"Error",
				"Sorry Username/Password is wrong.",
				"error"
			);
			this.setState({ loginFailed: true });
		}
	};

	render() {
		return (
			<div className='auth-container'>
				<div className='auth-card'>
					<p className='auth-title'>Login page</p>
					<input
						className='input'
						placeholder='Email'
						id='email'
						onChange={this.handleChangeText}
						value={this.state.email}
						type='email'
					></input>
					<input
						className='input'
						placeholder='Password'
						id='password'
						onChange={this.handleChangeText}
						value={this.state.password}
						type='password'
					></input>

					<Button
						onClick={this.handleLoginSubmit}
						title='Login'
						loading={this.props.loading}
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

const LoginPage = (props) => {
	let navigate = useNavigate();
	// console.log(props);
	return <Login {...props} navigate={navigate} />;
};

const reduxState = (state) => ({
	loading: state.isLoading,
});

const reduxDispatch = (dispatch) => ({
	loginUser: (data) => dispatch(loginUserApi(data)),
});

export default connect(reduxState, reduxDispatch)(LoginPage);
