import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const HeaderUser = () => {
	let navigate = useNavigate();
	return (
		<div className='header'>
			<p className='logo'>MySimple Notes</p>

			<div className='header-login'>
				{localStorage.getItem("UserData") === null ? (
					<Link to='/Login' className='link-btn'>
						Login
					</Link>
				) : (
					<a
						className='link-btn'
						href='#logout'
						onClick={() => {
							LogoutButton();
							navigate("/");
						}}
					>
						Logout
					</a>
				)}
				{localStorage.getItem("UserData") === null ? (
					<Link to='/Register' className='link-btn'>
						Register
					</Link>
				) : (
					<Link to='/' className='link-btn'>
						Home
					</Link>
				)}
			</div>
		</div>
	);
};

const LogoutButton = () => {
	Swal.fire("Success", "Logout Succsess", "success");

	localStorage.clear("UserData");
};

export default HeaderUser;
