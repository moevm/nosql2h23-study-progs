import React, { useState } from "react";

const Select = ({
	options,
	name,
	onChange,
	label
}: {
	options: string[];
	name: string;
	onChange: (paramName: string, paramValue: string) => void;
	label: string
}) => {

	return (
		<div>
			<div className="label">{label}</div>
			<select className="select" onChange={(e) => onChange(name, e.target.value)}>
				{options.map((option) => (
					<option value={option} key={option}>{option}</option>
				))}
			</select>
		</div>
	);
};

export default Select;
