import React from "react";
import logo from "../images/header/logo.png";
import add from "../images/header/add.png";
import login from "../images/header/login.png";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, selectIsAuth } from "../redux/slices/auth";

export const Navbar = () => {
	const dispatch = useDispatch();
	const isAuth = useSelector(selectIsAuth);
	const onClickLogout = () => {
		dispatch(logout());
		window.localStorage.removeItem("token");
	};

	return (
		<div className="menu-wrapper">
			<div className="nav">
				<div className="logo">
					<NavLink to={"/"}>
						<img src={logo} alt="Logo" width={36} height={36} />
					</NavLink>
				</div>
				<div className="centered-bar">
					<div className="flex-centered-bar">
						<input className="search-bar" placeholder="Caută" />
						{isAuth ? (
							<NavLink to={"spune"}>
								<button className="add-post-btn">
									<div className="flex-post-btn">
										<img src={add} alt="Adaugă" width={16} height={16} />
										<span>Spune</span>
									</div>
								</button>
							</NavLink>
						) : (
							<NavLink to={"register"}>
								<button className="add-post-btn">
									<div className="flex-post-btn">
										<img src={add} alt="Adaugă" width={16} height={16} />
										<span>Spune</span>
									</div>
								</button>
							</NavLink>
						)}
					</div>
				</div>
				<div className="user-info">
					<ul>
						{isAuth ? (
							<li>
								<div className="flex-auth" onClick={onClickLogout}>
									<span className="adaptive-text">Ieșire</span>
									<img
										className="login-icon"
										src={login}
										alt="Logare"
										width={16}
										height={16}
									/>
								</div>
							</li>
						) : (
							<li>
								<NavLink to={"login"} className="flex-auth">
									<span className="adaptive-text">Autentificare</span>
									<img
										className="login-icon"
										src={login}
										alt="Logare"
										width={16}
										height={16}
									/>
								</NavLink>
							</li>
						)}
					</ul>
				</div>
			</div>
		</div>
	);
};
