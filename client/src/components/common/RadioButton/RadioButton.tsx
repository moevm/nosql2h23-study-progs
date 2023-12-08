import React, { useState, useEffect } from "react";

const RadioButton = (params: {
	label: string;
	buttonName: string;
	value: string;
	isChecked: boolean;
	onChange: (value: string) => void;
}) => {

	const { label, buttonName, onChange, value, isChecked } = params;

	return (
		<div>
			<input
				type="radio"
				checked={isChecked}
				name={buttonName}
				onChange={() => onChange(value)}
				value={value}
			/>
			<div className="label">{label}</div>
		</div>
	);
};

export default RadioButton;
