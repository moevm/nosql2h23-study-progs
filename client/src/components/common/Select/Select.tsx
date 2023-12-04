import React, { useState } from "react";

const Select = ({
	options,
	name,
	onFiltering,
	label
}: {
	options: string[];
	name: string;
	onFiltering: (paramName: string, paramValue: string) => void;
	label: string
}) => {

	const defaultValue = "Выберите пункт";

	const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		console.log(e.target.value);
		if(e.target.value !== defaultValue) {
			onFiltering(name, e.target.value);
		}
	}

	return (
		<div>
			<div className="label">{label}</div>
			<select className="select" onChange={handleChange}>
				<option defaultValue={"default"}>{defaultValue}</option>
				{options.map((option) => (
					<option value={option} key={option}>{option}</option>
				))}
			</select>
		</div>
	);
};

export default Select;
