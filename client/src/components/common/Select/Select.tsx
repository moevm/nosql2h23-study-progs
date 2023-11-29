import React, { useState } from "react";

const Select = ({
	options,
	onChange,
	label
}: {
	options: string[];
	onChange: (paramName: string, paramValue: string) => void;
	label: string
}) => {

	return (
		<div>
			<div className="label">{label}</div>
			<select className="select" onChange={(e) => onChange(label, e.target.value)}>
				{options.map((option) => (
					<option value={option} key={option}>{option}</option>
				))}
			</select>
		</div>
	);
};

export default Select;
