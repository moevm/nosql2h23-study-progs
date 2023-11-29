import React from "react";
import { NavLink } from "react-router-dom";
import './EducationElementLink.scss';

const EducationElementLink = ({ to, children }: any) => {
	return <NavLink className="EducationElementLink" to={to}>{children}</NavLink>;
};

export default EducationElementLink;
