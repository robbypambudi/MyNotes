import { Link } from "react-router-dom";

const Header = () => {
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
					<Link to='/Dashboard' className='link-btn'>
						Dashboard
					</Link>
				)}
			</div>
		</div>
	);
};

const LogoutButton = () => {
	localStorage.clear("UserData");
	window.location.reload(false);
};

export default Header;
