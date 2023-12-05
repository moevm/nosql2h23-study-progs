import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router";

const LogoutButton = () => {
	const navigate = useNavigate();
	const { setId } = useAuth();

	const logout = () => {
		window.localStorage.removeItem("token");
		setId(undefined);
		navigate("/");
	};

	return <button onClick={() => logout()}>Выйти</button>;
};

export default LogoutButton;
