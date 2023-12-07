import React from "react";
import { NavLink } from "react-router-dom";
import './ElementLink.scss';

const ElementLink = ({ to, children }: { to: string, children: string }) => {

	return <NavLink className="ElementLink" to={to}>{children}</NavLink>;
};

export default ElementLink;
